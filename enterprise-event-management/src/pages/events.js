import { eventColumns, events } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';

export const viewState = {
  eventQuery: '',
};

export function renderEvents() {
  return `
    ${pageHeader({
      eyebrow: 'Book',
      title: 'Events',
      lead: 'Eight on the book. Northline Summit is live in Hall A. Harbor Product Day loads in on 24 Sep.',
      actions: `
        <eds-split-button id="ev-split" variant="primary" icon="plus" label="New event">
          <eds-menu-item label="New event" value="event" icon="folder"></eds-menu-item>
          <eds-menu-item label="Check in guest" value="checkin" icon="check"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-toolbar bordered class="mb-3">
      <div class="tag-row" slot="start">
        <eds-tag label="Live 1" variant="brand"></eds-tag>
        <eds-tag label="Upcoming 3" variant="neutral"></eds-tag>
        <eds-tag label="Pending 1" variant="neutral"></eds-tag>
        <eds-tag label="Complete 2" variant="neutral"></eds-tag>
      </div>
      <eds-button id="open-filters" slot="end" variant="tertiary" icon="filter">Filters</eds-button>
    </eds-toolbar>
    <eds-card padded>
      ${filterBar(`
        <eds-search id="ev-search" placeholder="Search name or owner" clearable></eds-search>
        <eds-select id="ev-status" label="Status"></eds-select>
        <eds-select id="ev-type" label="Type"></eds-select>
        <eds-date-range-picker id="ev-dates" label="Dates"></eds-date-range-picker>
      `)}
      <div id="ev-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading events" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="ev-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'ev-empty',
        heading: 'No events match',
        description: 'Clear the owner search or status filter.',
        action: '<eds-button id="reset-ev" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="ev-page" page="1" per-page="10"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateEvents(root) {
  const table = root.querySelector('#ev-table');
  const empty = root.querySelector('#ev-empty');
  const status = root.querySelector('#ev-status');
  const type = root.querySelector('#ev-type');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Live', value: 'Live' },
      { label: 'Upcoming', value: 'Upcoming' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Complete', value: 'Complete' },
      { label: 'Draft', value: 'Draft' },
    ];
    status.value = 'all';
  }
  if (type) {
    type.options = [
      { label: 'All types', value: 'all' },
      ...[...new Set(events.map((item) => item.type))].map((label) => ({ label, value: label })),
    ];
    type.value = 'all';
  }
  const paint = () => {
    const query = viewState.eventQuery.toLowerCase();
    const rows = events
      .filter((item) => `${item.name} ${item.owner} ${item.code} ${item.venue}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (type?.value || 'all') === 'all' || item.type === type.value);
    if (table) {
      table.columns = eventColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#ev-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#ev-search')?.addEventListener('eds-input', (event) => {
    viewState.eventQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  type?.addEventListener('eds-change', paint);
  root.querySelector('#reset-ev')?.addEventListener('eds-click', () => {
    viewState.eventQuery = '';
    if (status) status.value = 'all';
    if (type) type.value = 'all';
    paint();
  });
  root.querySelector('#ev-split')?.addEventListener('eds-click', () => document.querySelector('#event-modal')?.show());
  root.querySelector('#ev-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'checkin') document.querySelector('#checkin-modal')?.show();
    else document.querySelector('#event-modal')?.show();
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  table?.addEventListener('click', () => {
    window.location.hash = '#/event/ev_north';
  });
}
