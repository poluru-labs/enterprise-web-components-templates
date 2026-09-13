import { fraudFlags } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';
import { severityTone, statusLabel } from '../lib/status.js';

export function renderFraud() {
  return `
    ${pageHeader({
      eyebrow: 'SIU',
      title: 'Fraud flags',
      lead: `Nikhil Poluru’s book. Duplicate photos, lapses, late notice, and related vendors.`,
    })}
    ${filterBar(`
      <eds-search id="fr-search" placeholder="Filter flags" clearable></eds-search>
      <eds-select id="fr-status" label="Status"></eds-select>
    `)}
    <div id="fr-table"></div>
    <eds-empty-state id="fr-empty" hidden heading="No matches" description="Try a claim, title, or reporter." icon="search"></eds-empty-state>
  `;
}

export function hydrateFraud(root) {
  const table = root.querySelector('#fr-table');
  const empty = root.querySelector('#fr-empty');
  const search = root.querySelector('#fr-search');
  const status = root.querySelector('#fr-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Watch', value: 'watch' },
      { label: 'Closed', value: 'closed' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(fraudFlags, search?.value ?? '', ['claim', 'title', 'property', 'reporter']);
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
      <table class="flag-table">
        <thead>
          <tr><th>Claim</th><th>Flag</th><th>File</th><th>Reporter</th><th>Date</th><th>Severity</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.claim}</td>
              <td>${item.title}</td>
              <td>${item.property}</td>
              <td>${item.reporter}</td>
              <td>${item.date}</td>
              <td><eds-badge label="${statusLabel(item.severity)}" variant="${severityTone(item.severity)}" pill></eds-badge></td>
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
}
