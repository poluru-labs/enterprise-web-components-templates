import { leases } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderLeases() {
  return `
    ${pageHeader({
      eyebrow: 'Roll',
      title: 'Leases',
      lead: `Kavya Poluru’s desk. ${leases.length} files on the book. Filter, then walk a row.`,
    })}
    ${filterBar(`
      <eds-search id="ls-search" placeholder="Filter leases" clearable></eds-search>
      <eds-select id="ls-status" label="Status"></eds-select>
    `)}
    <div id="ls-table"></div>
    <eds-empty-state id="ls-empty" hidden heading="No matches" description="Try a tenant, unit, or property." icon="search"></eds-empty-state>
  `;
}

export function hydrateLeases(root) {
  const table = root.querySelector('#ls-table');
  const empty = root.querySelector('#ls-empty');
  const search = root.querySelector('#ls-search');
  const status = root.querySelector('#ls-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'Notice', value: 'notice' },
      { label: 'Expired', value: 'expired' },
      { label: 'Draft', value: 'draft' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(leases, search?.value ?? '', ['property', 'unit', 'tenant', 'manager']);
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
      <table class="lease-table">
        <thead>
          <tr><th>Property</th><th>Unit</th><th>Tenant</th><th>End</th><th>Rent</th><th>Manager</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.property}</td>
              <td>${item.unit}</td>
              <td>${item.tenant}</td>
              <td>${item.end}</td>
              <td>${formatCurrency(item.rent)}</td>
              <td>${item.manager}</td>
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
