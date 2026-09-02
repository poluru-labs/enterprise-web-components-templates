import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { ticketColumns, tickets } from '../data/index.js';
import { formatAge } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { emptyState, filterBar, pageHeader, ticketTableMarkup } from '../components/widgets.js';

export function renderTickets() {
  return `
    ${pageHeader({
      eyebrow: 'Queue',
      title: 'Tickets',
      lead: 'Filter by priority, status, and assignee. Click a row to open the ticket detail view.',
      actions: `
        <eds-button id="tickets-create" variant="primary" icon="plus">Create ticket</eds-button>
        <eds-button id="tickets-export" variant="secondary" icon="download">Export</eds-button>
      `,
    })}
    ${filterBar(`
      <eds-search id="ticket-search" placeholder="Search tickets, requesters, summaries" clearable></eds-search>
      <eds-select id="filter-priority" label="Priority"></eds-select>
      <eds-select id="filter-status" label="Status"></eds-select>
      <eds-button id="open-filters" variant="tertiary" icon="filter">More filters</eds-button>
    `)}
    <eds-card padded>
      ${ticketTableMarkup()}
      ${emptyState({ id: 'ticket-empty', heading: 'No tickets match', description: 'Try clearing filters or broadening your search.' })}
    </eds-card>
  `;
}

export function hydrateTickets(root) {
  const table = root.querySelector('#ticket-table');
  const empty = root.querySelector('#ticket-empty');
  const priority = root.querySelector('#filter-priority');
  const status = root.querySelector('#filter-status');
  const search = root.querySelector('#ticket-search');

  if (priority) {
    priority.options = [
      { label: 'All priorities', value: '' },
      { label: 'Critical', value: 'Critical' },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' },
    ];
  }
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'Open' },
      { label: 'In progress', value: 'In progress' },
      { label: 'Waiting', value: 'Waiting' },
      { label: 'Resolved', value: 'Resolved' },
    ];
  }

  const paint = () => {
    let rows = [...tickets];
    const query = search?.value ?? '';
    rows = searchRecords(rows, query, ['id', 'summary', 'requester', 'assignee', 'queue']);
    if (priority?.value) rows = rows.filter((item) => item.priority === priority.value);
    if (status?.value) rows = rows.filter((item) => item.status === status.value);

    if (table) {
      table.columns = ticketColumns;
      table.rows = rows.map((item) => ({
        id: item.id,
        summary: item.summary,
        requester: item.requester,
        assignee: item.assignee,
        priority: item.priority,
        status: item.status,
        sla: item.sla,
        age: formatAge(item.ageMinutes),
      }));
    }
    if (empty) empty.hidden = rows.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  priority?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);

  table?.addEventListener('eds-row-click', (event) => {
    const id = event.detail?.row?.id;
    if (id) window.location.hash = `#/tickets/${id}`;
  });

  root.querySelector('#tickets-create')?.addEventListener('eds-click', () => document.querySelector('#ticket-modal')?.show());
  root.querySelector('#tickets-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Ticket export queued', variant: 'success' });
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
}
