import { registrationColumns, registrations } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';

export const viewState = {
  guestQuery: '',
};

export function renderRegistrations() {
  return `
    ${pageHeader({
      eyebrow: 'Desk',
      title: 'Registrations',
      lead: '1,284 guests on the book. 976 badges printed. Sahana Poluru is waitlisted for the health briefing.',
      actions: `<eds-button id="rg-checkin" variant="primary" icon="check">Check in</eds-button>`,
    })}
    <eds-toolbar bordered class="mb-3">
      <div class="tag-row" slot="start">
        <eds-tag label="Checked in 5" variant="brand"></eds-tag>
        <eds-tag label="Registered 5" variant="neutral"></eds-tag>
        <eds-tag label="Waitlist 1" variant="neutral"></eds-tag>
        <eds-tag label="Attended 1" variant="neutral"></eds-tag>
      </div>
    </eds-toolbar>
    <eds-card padded>
      ${filterBar(`
        <eds-search id="rg-search" placeholder="Search guest or event" clearable></eds-search>
        <eds-select id="rg-status" label="Status"></eds-select>
        <eds-select id="rg-ticket" label="Ticket"></eds-select>
      `)}
      <eds-data-table id="rg-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'rg-empty',
        heading: 'No guests match',
        description: 'Clear search or ticket type to see the desk.',
        action: '<eds-button id="reset-rg" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
  `;
}

export function hydrateRegistrations(root) {
  const table = root.querySelector('#rg-table');
  const empty = root.querySelector('#rg-empty');
  const status = root.querySelector('#rg-status');
  const ticket = root.querySelector('#rg-ticket');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Checked in', value: 'Checked in' },
      { label: 'Registered', value: 'Registered' },
      { label: 'Waitlist', value: 'Waitlist' },
      { label: 'Attended', value: 'Attended' },
    ];
    status.value = 'all';
  }
  if (ticket) {
    ticket.options = [
      { label: 'All tickets', value: 'all' },
      ...[...new Set(registrations.map((item) => item.ticket))].map((label) => ({ label, value: label })),
    ];
    ticket.value = 'all';
  }
  const paint = () => {
    const query = viewState.guestQuery.toLowerCase();
    const rows = registrations
      .filter((item) => `${item.name} ${item.event} ${item.org} ${item.seat}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (ticket?.value || 'all') === 'all' || item.ticket === ticket.value);
    if (table) {
      table.columns = registrationColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#rg-search')?.addEventListener('eds-input', (event) => {
    viewState.guestQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  ticket?.addEventListener('eds-change', paint);
  root.querySelector('#reset-rg')?.addEventListener('eds-click', () => {
    viewState.guestQuery = '';
    if (status) status.value = 'all';
    if (ticket) ticket.value = 'all';
    paint();
  });
  root.querySelector('#rg-checkin')?.addEventListener('eds-click', () => document.querySelector('#checkin-modal')?.show());
}
