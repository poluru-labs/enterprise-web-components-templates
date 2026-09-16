import { requestColumns, requests } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';

export const viewState = {
  requestQuery: '',
};

export function renderRequests() {
  return `
    ${pageHeader({
      eyebrow: '311',
      title: 'Requests',
      lead: 'Ten flagged tickets. Ward 3 missed pickup is overdue. Oak Street pothole is due 17 Sep.',
      actions: `
        <eds-split-button id="rq-split" variant="primary" icon="plus">
          New request
          <eds-menu-item slot="menu" label="New request" value="request" icon="bell"></eds-menu-item>
          <eds-menu-item slot="menu" label="Set hearing" value="hearing" icon="file"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-toolbar bordered class="mb-3">
      <div class="tag-row" slot="start">
        <eds-tag label="Open 4" variant="brand"></eds-tag>
        <eds-tag label="In progress 3" variant="neutral"></eds-tag>
        <eds-tag label="Pending 1" variant="neutral"></eds-tag>
        <eds-tag label="Complete 2" variant="neutral"></eds-tag>
      </div>
      <eds-button id="open-filters" slot="end" variant="tertiary" icon="filter">Filters</eds-button>
    </eds-toolbar>
    <eds-card padded>
      ${filterBar(`
        <eds-search id="rq-search" placeholder="Search title or owner" clearable></eds-search>
        <eds-select id="rq-status" label="Status"></eds-select>
        <eds-select id="rq-dept" label="Department"></eds-select>
        <eds-date-range-picker id="rq-dates" label="Opened"></eds-date-range-picker>
      `)}
      <div id="rq-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading requests" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="rq-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'rq-empty',
        heading: 'No requests match',
        description: 'Clear the owner search or status filter.',
        action: '<eds-button id="reset-rq" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="rq-page" page="1" per-page="10"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateRequests(root) {
  const table = root.querySelector('#rq-table');
  const empty = root.querySelector('#rq-empty');
  const status = root.querySelector('#rq-status');
  const dept = root.querySelector('#rq-dept');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Open', value: 'Open' },
      { label: 'In progress', value: 'In progress' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Complete', value: 'Complete' },
    ];
    status.value = 'all';
  }
  if (dept) {
    dept.options = [
      { label: 'All departments', value: 'all' },
      ...[...new Set(requests.map((item) => item.department))].map((label) => ({ label, value: label })),
    ];
    dept.value = 'all';
  }
  const paint = () => {
    const query = viewState.requestQuery.toLowerCase();
    const rows = requests
      .filter((item) => `${item.title} ${item.owner} ${item.code}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (dept?.value || 'all') === 'all' || item.department === dept.value);
    if (table) {
      table.columns = requestColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#rq-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#rq-search')?.addEventListener('eds-input', (event) => {
    viewState.requestQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  dept?.addEventListener('eds-change', paint);
  root.querySelector('#reset-rq')?.addEventListener('eds-click', () => {
    viewState.requestQuery = '';
    if (status) status.value = 'all';
    if (dept) dept.value = 'all';
    paint();
  });
  root.querySelector('#rq-split')?.addEventListener('eds-click', () => document.querySelector('#request-modal')?.show());
  root.querySelector('#rq-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'hearing') document.querySelector('#hearing-modal')?.show();
    else document.querySelector('#request-modal')?.show();
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  table?.addEventListener('click', () => {
    window.location.hash = '#/request/rq_pothole';
  });
}
