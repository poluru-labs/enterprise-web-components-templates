import { policies } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderPolicies() {
  return `
    ${pageHeader({
      eyebrow: 'Coverage',
      title: 'Policies',
      lead: `Maya Poluru’s book. Verify in-force coverage before Subra Poluru inspects.`,
    })}
    ${filterBar(`
      <eds-search id="pol-search" placeholder="Filter policies" clearable></eds-search>
      <eds-select id="pol-status" label="Status"></eds-select>
    `)}
    <div id="pol-table"></div>
    <eds-empty-state id="pol-empty" hidden heading="No matches" description="Try a number, insured, or line." icon="search"></eds-empty-state>
  `;
}

export function hydratePolicies(root) {
  const table = root.querySelector('#pol-table');
  const empty = root.querySelector('#pol-empty');
  const search = root.querySelector('#pol-search');
  const status = root.querySelector('#pol-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Verified', value: 'verified' },
      { label: 'Pending', value: 'pending' },
      { label: 'Lapsed', value: 'lapsed' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(policies, search?.value ?? '', ['number', 'insured', 'line', 'city', 'owner']);
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
      <table class="pol-table">
        <thead>
          <tr><th>Policy</th><th>Insured</th><th>Line</th><th>City</th><th>Premium</th><th>Owner</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.number}</td>
              <td>${item.insured}</td>
              <td>${item.line}</td>
              <td>${item.city}</td>
              <td>${formatCurrency(item.premium)}</td>
              <td>${item.owner}</td>
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
