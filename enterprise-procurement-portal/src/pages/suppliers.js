import { suppliers } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { formatCurrency } from '../lib/format.js';
import { filterBar, pageHeader, sheet, supplierGrid } from '../components/widgets.js';

export function renderSuppliers() {
  return `
    ${pageHeader({
      eyebrow: 'Vendor book',
      title: 'Suppliers',
      lead: 'Ishaan Poluru keeps scores honest. Compare lead time and price index before Maya Poluru awards the lane.',
    })}
    ${filterBar(`
      <eds-search id="sup-search" placeholder="Filter suppliers" clearable></eds-search>
      <eds-select id="sup-status" label="Status"></eds-select>
    `)}
    <div id="sup-grid" class="mb-3"></div>
    ${sheet({
      title: 'Quote comparison · laptop fleet',
      action: '<eds-badge label="PR-1042" variant="info" pill></eds-badge>',
      body: `
        <div class="ql-table-wrap">
          <table class="compare-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Quote</th>
                <th>Lead</th>
                <th>Score</th>
                <th>Index</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              ${suppliers
                .slice(0, 4)
                .map(
                  (item) => `
                <tr>
                  <td><strong>${item.name}</strong></td>
                  <td>${formatCurrency(item.quote)}</td>
                  <td>${item.lead}</td>
                  <td>${item.score}</td>
                  <td>${item.priceIndex}</td>
                  <td>${item.owner}</td>
                </tr>`,
                )
                .join('')}
            </tbody>
          </table>
        </div>
        <p class="muted mb-0 mt-2">Northline Hardware wins on score and lead. Cedar is cheaper on chairs, not laptops.</p>`,
    })}
  `;
}

export function hydrateSuppliers(root) {
  const grid = root.querySelector('#sup-grid');
  const search = root.querySelector('#sup-search');
  const status = root.querySelector('#sup-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Preferred', value: 'preferred' },
      { label: 'Active', value: 'active' },
      { label: 'Watch', value: 'watch' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(suppliers, search?.value ?? '', ['name', 'category', 'owner', 'notes']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = supplierGrid(hits);
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
