import { assetColumns, assets, catalogTree } from '../data/index.js';
import { assetGrid, emptyState, filterBar, pageHeader, sheet } from '../components/widgets.js';

export function renderAssets() {
  return `
    ${pageHeader({
      eyebrow: 'CMDB',
      title: 'Assets',
      lead: 'Servers, clusters, databases, and SaaS tenants with a named owner.',
      actions: `
        <eds-button variant="secondary" icon="filter" id="open-filters">Filters</eds-button>
        <eds-button variant="primary" icon="plus" id="register-asset">Register asset</eds-button>
      `,
    })}
    <div class="toolbar-wrap">
      <eds-toolbar bordered>
        <div slot="start">${filterBar(`
          <eds-search id="asset-search" placeholder="Find a CI, owner, or site" clearable></eds-search>
          <eds-select id="asset-site" label="Site"></eds-select>
          <eds-select id="asset-status" label="Status"></eds-select>
        `)}</div>
        <div slot="end">
          <eds-segmented-control id="asset-view"></eds-segmented-control>
        </div>
      </eds-toolbar>
    </div>
    <eds-alert variant="info" title="CAB freeze at 16:00" message="Kavya Poluru locks production changes at 16:00 CT. Register new CIs before then."></eds-alert>
    <div class="split mt-4">
      ${sheet({
        title: 'Sites',
        body: '<eds-tree-view id="site-tree"></eds-tree-view>',
      })}
      <div>
        <div id="asset-table-wrap">
          ${sheet({
            title: 'Configuration items',
            body: `<eds-data-table id="asset-table" sortable></eds-data-table>
              ${emptyState({ id: 'asset-empty', heading: 'No assets match', description: 'Clear search or choose another site.' })}
              <div class="mt-4"><eds-pagination id="asset-page" page="1" page-size="8" total="${assets.length}"></eds-pagination></div>`,
          })}
        </div>
        <div id="asset-cards" hidden></div>
      </div>
    </div>
  `;
}

export function hydrateAssets(root) {
  const site = root.querySelector('#asset-site');
  const status = root.querySelector('#asset-status');
  const search = root.querySelector('#asset-search');
  const view = root.querySelector('#asset-view');
  const tree = root.querySelector('#site-tree');
  const table = root.querySelector('#asset-table');
  const pager = root.querySelector('#asset-page');

  if (site) {
    const sites = ['All sites', ...new Set(assets.map((item) => item.site))];
    site.options = sites.map((item) => ({ label: item, value: item }));
    site.value = 'All sites';
  }
  if (status) {
    const statuses = ['All statuses', ...new Set(assets.map((item) => item.status))];
    status.options = statuses.map((item) => ({ label: item, value: item }));
    status.value = 'All statuses';
  }
  if (view) {
    view.options = [
      { label: 'Table', value: 'table', icon: 'file' },
      { label: 'Cards', value: 'cards', icon: 'folder' },
    ];
    view.value = 'table';
  }
  if (tree) {
    tree.items = catalogTree;
    tree.expandedIds = { prod: true, corp: true, dr: true };
  }

  const paint = () => {
    const query = (search?.value || '').toLowerCase();
    const siteValue = site?.value || 'All sites';
    const statusValue = status?.value || 'All statuses';
    const rows = assets.filter((item) => {
      const hay = `${item.name} ${item.owner} ${item.site} ${item.purpose}`.toLowerCase();
      const siteOk = siteValue === 'All sites' || item.site === siteValue;
      const statusOk = statusValue === 'All statuses' || item.status === statusValue;
      return hay.includes(query) && siteOk && statusOk;
    });
    if (table) {
      table.columns = assetColumns;
      table.rows = rows.map((item) => ({
        name: item.name,
        type: item.type,
        site: item.site,
        owner: item.owner,
        status: item.status,
        health: `${item.health}%`,
        updated: item.updated,
        href: `#/asset/${item.id}`,
      }));
    }
    if (pager) pager.total = rows.length;
    const cards = root.querySelector('#asset-cards');
    if (cards) cards.innerHTML = assetGrid(rows);
    const empty = root.querySelector('#asset-empty');
    if (empty) empty.hidden = rows.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  site?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  view?.addEventListener('eds-change', (event) => {
    const mode = event.detail?.value || view.value;
    root.querySelector('#asset-table-wrap').hidden = mode === 'cards';
    root.querySelector('#asset-cards').hidden = mode !== 'cards';
  });
  table?.addEventListener('eds-row-activate', (event) => {
    const row = event.detail?.row;
    if (row?.href) window.location.hash = row.href;
  });
  tree?.addEventListener('eds-select', (event) => {
    const id = event.detail?.id;
    const map = { chicago: 'Chicago', dallas: 'Dallas', phoenix: 'Phoenix', ashburn: 'Ashburn', austin: 'Austin', saas: 'SaaS' };
    if (site && map[id]) {
      site.value = map[id];
      paint();
    }
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  root.querySelector('#register-asset')?.addEventListener('eds-click', () => document.querySelector('#asset-modal')?.show());
}
