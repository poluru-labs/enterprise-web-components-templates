import { changeColumns, changes } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet } from '../components/widgets.js';

export function renderChanges() {
  return `
    ${pageHeader({
      eyebrow: 'CAB',
      title: 'Change requests',
      lead: 'Normal and standard changes with a named implementer and a freeze window.',
      actions: `
        <eds-button variant="secondary" icon="calendar" id="sched-maint">Maintenance</eds-button>
        <eds-button variant="primary" icon="plus" id="submit-change">Submit change</eds-button>
      `,
    })}
    ${filterBar(`
      <eds-search id="chg-search" placeholder="Find a change, CI, or owner" clearable></eds-search>
      <eds-select id="chg-status" label="Status"></eds-select>
      <eds-select id="chg-risk" label="Risk"></eds-select>
    `)}
    <eds-alert variant="info" title="Three windows tonight" message="CHG-2201 Dallas ledger, CHG-2198 west edge certs, and a carry-over on EKS nodes. Kavya Poluru locks CAB at 16:00."></eds-alert>
    <div class="mt-4">
      ${sheet({
        title: 'Change board',
        body: `<eds-data-table id="chg-table" sortable striped></eds-data-table>
          ${emptyState({ id: 'chg-empty', heading: 'No changes match', description: 'Clear search or pick another status.' })}`,
      })}
    </div>
  `;
}

export function hydrateChanges(root) {
  const search = root.querySelector('#chg-search');
  const status = root.querySelector('#chg-status');
  const risk = root.querySelector('#chg-risk');
  const table = root.querySelector('#chg-table');

  if (status) {
    const values = ['All statuses', ...new Set(changes.map((item) => item.status))];
    status.options = values.map((item) => ({ label: item, value: item }));
    status.value = 'All statuses';
  }
  if (risk) {
    const values = ['All risk', ...new Set(changes.map((item) => item.risk))];
    risk.options = values.map((item) => ({ label: item, value: item }));
    risk.value = 'All risk';
  }

  const paint = () => {
    const query = (search?.value || '').toLowerCase();
    const statusValue = status?.value || 'All statuses';
    const riskValue = risk?.value || 'All risk';
    const rows = changes.filter((item) => {
      const hay = `${item.id} ${item.title} ${item.owner} ${item.ci}`.toLowerCase();
      const statusOk = statusValue === 'All statuses' || item.status === statusValue;
      const riskOk = riskValue === 'All risk' || item.risk === riskValue;
      return hay.includes(query) && statusOk && riskOk;
    });
    if (table) {
      table.columns = changeColumns;
      table.rows = rows.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        status: item.status,
        owner: item.owner,
        window: item.window,
        risk: item.risk,
        href: `#/change/${item.id}`,
      }));
    }
    const empty = root.querySelector('#chg-empty');
    if (empty) empty.hidden = rows.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  risk?.addEventListener('eds-change', paint);
  table?.addEventListener('eds-row-activate', (event) => {
    const row = event.detail?.row;
    if (row?.href) window.location.hash = row.href;
  });
  root.querySelector('#submit-change')?.addEventListener('eds-click', () => document.querySelector('#change-modal')?.show());
  root.querySelector('#sched-maint')?.addEventListener('eds-click', () => document.querySelector('#maint-modal')?.show());
}
