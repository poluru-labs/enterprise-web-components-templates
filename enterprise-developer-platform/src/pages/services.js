import { serviceColumns, services } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';

export const viewState = {
  serviceQuery: '',
};

export function renderServices() {
  return `
    ${pageHeader({
      eyebrow: 'Catalog',
      title: 'Services',
      lead: 'Eleven on the board. Auth gateway is the spine. Billing ledger is on watch. Travel book failed in staging.',
      actions: `
        <eds-split-button id="svc-split" variant="primary" icon="plus" label="New service">
          <eds-menu-item label="New service" value="service" icon="folder"></eds-menu-item>
          <eds-menu-item label="Ship a deploy" value="deploy" icon="check"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-toolbar bordered class="mb-3">
      <div class="tag-row" slot="start">
        <eds-tag label="Healthy 7" variant="brand"></eds-tag>
        <eds-tag label="Watch 2" variant="neutral"></eds-tag>
        <eds-tag label="Rolling 1" variant="neutral"></eds-tag>
        <eds-tag label="Failed 1" variant="neutral"></eds-tag>
      </div>
      <eds-button id="open-filters" slot="end" variant="tertiary" icon="filter">Filters</eds-button>
    </eds-toolbar>
    <eds-card padded>
      ${filterBar(`
        <eds-search id="svc-search" placeholder="Search name or owner" clearable></eds-search>
        <eds-select id="svc-status" label="Status"></eds-select>
        <eds-select id="svc-stack" label="Stack"></eds-select>
        <eds-date-range-picker id="svc-dates" label="Shipped"></eds-date-range-picker>
      `)}
      <div id="svc-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading services" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="svc-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'svc-empty',
        heading: 'No services match',
        description: 'Clear the owner search or status filter.',
        action: '<eds-button id="reset-svc" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="svc-page" page="1" per-page="10"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateServices(root) {
  const table = root.querySelector('#svc-table');
  const empty = root.querySelector('#svc-empty');
  const status = root.querySelector('#svc-status');
  const stack = root.querySelector('#svc-stack');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Healthy', value: 'Healthy' },
      { label: 'Watch', value: 'Watch' },
      { label: 'Rolling', value: 'Rolling' },
      { label: 'Failed', value: 'Failed' },
    ];
    status.value = 'all';
  }
  if (stack) {
    stack.options = [
      { label: 'All stacks', value: 'all' },
      ...[...new Set(services.map((item) => item.stack))].map((label) => ({ label, value: label })),
    ];
    stack.value = 'all';
  }
  const paint = () => {
    const query = viewState.serviceQuery.toLowerCase();
    const rows = services
      .filter((item) => `${item.name} ${item.owner} ${item.code} ${item.env}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (stack?.value || 'all') === 'all' || item.stack === stack.value)
      .map((item) => ({ ...item, p95: `${item.p95}ms` }));
    if (table) {
      table.columns = serviceColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#svc-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#svc-search')?.addEventListener('eds-input', (event) => {
    viewState.serviceQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  stack?.addEventListener('eds-change', paint);
  root.querySelector('#reset-svc')?.addEventListener('eds-click', () => {
    viewState.serviceQuery = '';
    if (status) status.value = 'all';
    if (stack) stack.value = 'all';
    paint();
  });
  root.querySelector('#svc-split')?.addEventListener('eds-click', () => document.querySelector('#service-modal')?.show());
  root.querySelector('#svc-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'deploy') document.querySelector('#deploy-modal')?.show();
    else document.querySelector('#service-modal')?.show();
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  table?.addEventListener('click', () => {
    window.location.hash = '#/service/svc_auth';
  });
}
