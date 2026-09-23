import { incidentColumns, incidents } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet } from '../components/widgets.js';
import { severityTone } from '../lib/status.js';

export function renderIncidents() {
  return `
    ${pageHeader({
      eyebrow: 'Queue',
      title: 'Incidents',
      lead: 'Open, mitigated, and resolved tickets with restore SLAs.',
      actions: `
        <eds-button variant="secondary" icon="filter" id="open-filters">Filters</eds-button>
        <eds-button variant="primary" icon="plus" id="raise-incident">Raise incident</eds-button>
      `,
    })}
    ${filterBar(`
      <eds-search id="inc-search" placeholder="Find an incident, service, or owner" clearable></eds-search>
      <eds-select id="inc-sev" label="Severity"></eds-select>
      <eds-select id="inc-status" label="Status"></eds-select>
    `)}
    <eds-alert variant="danger" title="Major incident open" message="INC-10482 · Identity SSO. Arjun Poluru commanding. Sahana Poluru is primary on-call."></eds-alert>
    <div class="mt-4">
      ${sheet({
        title: 'Incident register',
        body: `<eds-data-table id="inc-table" sortable striped></eds-data-table>
          ${emptyState({ id: 'inc-empty', heading: 'No incidents match', description: 'Clear search or change severity.' })}`,
      })}
    </div>
  `;
}

export function hydrateIncidents(root) {
  const search = root.querySelector('#inc-search');
  const sev = root.querySelector('#inc-sev');
  const status = root.querySelector('#inc-status');
  const table = root.querySelector('#inc-table');

  if (sev) {
    const values = ['All severities', ...new Set(incidents.map((item) => item.severity))];
    sev.options = values.map((item) => ({ label: item, value: item }));
    sev.value = 'All severities';
  }
  if (status) {
    const values = ['All statuses', ...new Set(incidents.map((item) => item.status))];
    status.options = values.map((item) => ({ label: item, value: item }));
    status.value = 'All statuses';
  }

  const paint = () => {
    const query = (search?.value || '').toLowerCase();
    const sevValue = sev?.value || 'All severities';
    const statusValue = status?.value || 'All statuses';
    const rows = incidents.filter((item) => {
      const hay = `${item.id} ${item.title} ${item.owner} ${item.service}`.toLowerCase();
      const sevOk = sevValue === 'All severities' || item.severity === sevValue;
      const statusOk = statusValue === 'All statuses' || item.status === statusValue;
      return hay.includes(query) && sevOk && statusOk;
    });
    if (table) {
      table.columns = incidentColumns;
      table.rows = rows.map((item) => ({
        id: item.id,
        title: item.title,
        severity: item.severity,
        status: item.status,
        owner: item.owner,
        since: item.since,
        sla: item.sla,
        href: `#/incident/${item.id}`,
      }));
    }
    const empty = root.querySelector('#inc-empty');
    if (empty) empty.hidden = rows.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  sev?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  table?.addEventListener('eds-row-activate', (event) => {
    const row = event.detail?.row;
    if (row?.href) window.location.hash = row.href;
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  root.querySelector('#raise-incident')?.addEventListener('eds-click', () => document.querySelector('#raise-modal')?.show());
}
