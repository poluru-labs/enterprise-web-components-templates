import { assetColumns, assets, catalogTree } from '../data/index.js';
import { assetGrid, emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderCatalog() {
  return `
    ${pageHeader({
      eyebrow: 'Catalog',
      title: 'Production assets',
      lead: 'Tables, streams, and views with a named owner and a published status.',
      actions: `
        <eds-button variant="secondary" icon="filter" id="open-filters">Filters</eds-button>
        <eds-button variant="primary" icon="plus" id="register-asset">Register asset</eds-button>
      `,
    })}
    ${filterBar(`
      <eds-search id="catalog-search" placeholder="Find an asset, owner, or domain" clearable></eds-search>
      <eds-select id="catalog-domain" label="Domain"></eds-select>
      <eds-select id="catalog-status" label="Status"></eds-select>
      <eds-segmented-control id="catalog-view"></eds-segmented-control>
    `)}
    <eds-alert variant="info" title="Catalog freeze today" message="Kavya Poluru locks the production snapshot at 16:00. Register new gold assets before then."></eds-alert>
    <div class="split mt-4">
      ${sheet({
        title: 'Domains',
        body: '<eds-tree-view id="domain-tree"></eds-tree-view>',
      })}
      <div>
        <div id="catalog-table-wrap">
          ${sheet({
            title: 'Asset register',
            body: `<eds-data-table id="catalog-table" sortable></eds-data-table>
              ${emptyState({ id: 'catalog-empty', heading: 'No assets match', description: 'Clear search or choose another domain.' })}`,
          })}
        </div>
        <div id="catalog-cards" hidden></div>
      </div>
    </div>
  `;
}

export function hydrateCatalog(root) {
  const domain = root.querySelector('#catalog-domain');
  const status = root.querySelector('#catalog-status');
  const search = root.querySelector('#catalog-search');
  const view = root.querySelector('#catalog-view');
  const tree = root.querySelector('#domain-tree');
  const table = root.querySelector('#catalog-table');

  if (domain) {
    const domains = ['All domains', ...new Set(assets.map((item) => item.domain))];
    domain.options = domains.map((item) => ({ label: item, value: item }));
    domain.value = 'All domains';
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
    tree.expandedIds = { customer: true, finance: true, risk: true, run: true };
  }

  const paint = () => {
    const query = (search?.value || '').toLowerCase();
    const domainValue = domain?.value || 'All domains';
    const statusValue = status?.value || 'All statuses';
    const rows = assets.filter((item) => {
      const hay = `${item.name} ${item.owner} ${item.domain} ${item.purpose}`.toLowerCase();
      const domainOk = domainValue === 'All domains' || item.domain === domainValue;
      const statusOk = statusValue === 'All statuses' || item.status === statusValue;
      return hay.includes(query) && domainOk && statusOk;
    });
    if (table) {
      table.columns = assetColumns;
      table.rows = rows.map((item) => ({
        name: item.name,
        type: item.type,
        domain: item.domain,
        owner: item.owner,
        status: item.status,
        quality: `${item.quality}%`,
        updated: item.updated,
        href: `#/asset/${item.id}`,
      }));
    }
    const cards = root.querySelector('#catalog-cards');
    if (cards) cards.innerHTML = assetGrid(rows);
    const empty = root.querySelector('#catalog-empty');
    if (empty) empty.hidden = rows.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  domain?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  view?.addEventListener('eds-change', (event) => {
    const mode = event.detail?.value || view.value;
    root.querySelector('#catalog-table-wrap').hidden = mode === 'cards';
    root.querySelector('#catalog-cards').hidden = mode !== 'cards';
  });
  table?.addEventListener('eds-row-activate', (event) => {
    const row = event.detail?.row;
    if (row?.href) window.location.hash = row.href;
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  root.querySelector('#register-asset')?.addEventListener('eds-click', () => document.querySelector('#asset-modal')?.show());
}
