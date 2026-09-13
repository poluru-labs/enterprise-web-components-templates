import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { safetyReports } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderSafety() {
  return `
    ${pageHeader({
      eyebrow: 'EHS',
      title: 'Safety reports',
      lead: `Nikhil Poluru’s book. Inspections, toolbox talks, near misses, and incidents.`,
      actions: '<eds-button id="sf-close" variant="primary" icon="check">Close selected</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="sf-search" placeholder="Filter reports" clearable></eds-search>
      <eds-select id="sf-status" label="Status"></eds-select>
    `)}
    <div id="sf-table"></div>
    <eds-empty-state id="sf-empty" hidden heading="No matches" description="Try a job, type, or reporter." icon="search"></eds-empty-state>
  `;
}

export function hydrateSafety(root) {
  const table = root.querySelector('#sf-table');
  const empty = root.querySelector('#sf-empty');
  const search = root.querySelector('#sf-search');
  const status = root.querySelector('#sf-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Watch', value: 'watch' },
      { label: 'Closed', value: 'closed' },
      { label: 'Scheduled', value: 'scheduled' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(safetyReports, search?.value ?? '', ['site', 'type', 'reporter', 'notes']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
    if (!table) return;
    if (!hits.length) {
      table.innerHTML = '';
      return;
    }
    table.innerHTML = `
      <table class="safety-table">
        <thead>
          <tr><th>Date</th><th>Job</th><th>Type</th><th>Reporter</th><th>Notes</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.date}</td>
              <td>${item.site}</td>
              <td>${item.type}</td>
              <td>${item.reporter}</td>
              <td>${item.notes}</td>
              <td>${statusChip(item.status)}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    `;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#sf-close')?.addEventListener('eds-click', () => {
    showToast({ message: 'Report closed (demo)', variant: 'success' });
  });
}
