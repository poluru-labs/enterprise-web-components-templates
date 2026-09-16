import { tripColumns, trips } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  tripQuery: '',
};

export function renderTrips() {
  return `
    ${pageHeader({
      eyebrow: 'Book',
      title: 'Trips',
      lead: 'Ten trips on the board. Hana and Kavya are live. Sahana Berlin is still pending hotel cap.',
      actions: `
        <eds-split-button id="trip-split" variant="primary" icon="plus">
          New trip
          <eds-menu-item slot="menu" label="New trip" value="trip" icon="folder"></eds-menu-item>
          <eds-menu-item slot="menu" label="File exception" value="policy" icon="file"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-toolbar bordered class="mb-3">
      <div class="tag-row" slot="start">
        <eds-tag label="In trip 2" variant="brand"></eds-tag>
        <eds-tag label="Booked 4" variant="neutral"></eds-tag>
        <eds-tag label="Pending 1" variant="neutral"></eds-tag>
        <eds-tag label="Complete 2" variant="neutral"></eds-tag>
      </div>
      <eds-button id="open-filters" slot="end" variant="tertiary" icon="filter">Filters</eds-button>
    </eds-toolbar>
    <eds-card padded>
      ${filterBar(`
        <eds-search id="trip-search" placeholder="Search traveler or city" clearable></eds-search>
        <eds-select id="trip-status" label="Status"></eds-select>
        <eds-select id="trip-risk" label="Risk"></eds-select>
        <eds-date-range-picker id="trip-dates" label="Depart"></eds-date-range-picker>
      `)}
      <div id="trip-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading trips" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="trip-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'trip-empty',
        heading: 'No trips match',
        description: 'Clear the traveler search or status filter.',
        action: '<eds-button id="reset-trips" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="trip-page" page="1" per-page="10"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateTrips(root) {
  const table = root.querySelector('#trip-table');
  const empty = root.querySelector('#trip-empty');
  const status = root.querySelector('#trip-status');
  const risk = root.querySelector('#trip-risk');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'In trip', value: 'In trip' },
      { label: 'Booked', value: 'Booked' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Complete', value: 'Complete' },
    ];
    status.value = 'all';
  }
  if (risk) {
    risk.options = [
      { label: 'All risk', value: 'all' },
      { label: 'Cleared', value: 'Cleared' },
      { label: 'Watch', value: 'Watch' },
      { label: 'Elevated', value: 'Elevated' },
    ];
    risk.value = 'all';
  }
  const paint = () => {
    const query = viewState.tripQuery.toLowerCase();
    const rows = trips
      .filter((item) => `${item.traveler} ${item.city} ${item.code}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (risk?.value || 'all') === 'all' || item.risk === risk.value)
      .map((item) => ({
        code: item.code,
        traveler: item.traveler,
        city: item.city,
        status: item.status,
        risk: item.risk,
        cost: formatCurrency(item.cost),
        depart: item.depart,
        id: item.id,
      }));
    if (table) {
      table.columns = tripColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#trip-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#trip-search')?.addEventListener('eds-input', (event) => {
    viewState.tripQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  risk?.addEventListener('eds-change', paint);
  root.querySelector('#reset-trips')?.addEventListener('eds-click', () => {
    viewState.tripQuery = '';
    if (status) status.value = 'all';
    if (risk) risk.value = 'all';
    paint();
  });
  root.querySelector('#trip-split')?.addEventListener('eds-click', () => document.querySelector('#trip-modal')?.show());
  root.querySelector('#trip-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'policy') document.querySelector('#policy-modal')?.show();
    else document.querySelector('#trip-modal')?.show();
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  table?.addEventListener('click', () => {
    window.location.hash = '#/trip/tr_lagos';
  });
}
