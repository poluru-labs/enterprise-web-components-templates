import { customerColumns, customers } from '../data/index.js';
import { badgeHtml, cardGrid, contentCard, filterBar, pageHeader } from '../components/widgets.js';
import { searchRecords } from '../lib/search.js';

function customerRows() {
  return customers.map((item) => ({
    company: item.company,
    contact: item.contact,
    plan: item.plan,
    ltv: item.ltv,
    invoices: item.invoices,
    outstanding: item.outstanding,
    status: item.status,
    id: item.id,
  }));
}

export function renderCustomers() {
  return `
    ${pageHeader({
      eyebrow: 'Accounts',
      title: 'Customers',
      lead: 'Companies, plans, lifetime value, and open balances.',
      actions: `<eds-button id="add-customer" variant="primary" icon="plus">Add customer</eds-button>`,
    })}
    ${cardGrid(
      customers.slice(0, 8).map(
        (item) => contentCard({
          title: item.company,
          action: badgeHtml(item.status),
          body: `
            <p class="muted mb-1">${item.contact} · ${item.plan}</p>
            <p class="ledger-amount mb-1">${item.ltv}</p>
            <p class="muted mb-0">Outstanding ${item.outstanding} · ${item.invoices} invoices</p>
            <div class="inline-actions">
              <eds-link href="#/customer/${item.id}" variant="default">Open profile</eds-link>
            </div>
          `,
        }),
      ),
    )}
    <section class="sheet mt-3">
      ${filterBar(`<eds-search id="cus-search" placeholder="Search company or contact" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="cus-table" sortable striped compact></eds-data-table>
      </div>
      <p class="muted mt-3 mb-0">Select a row to open the customer profile, or search from the ledger ribbon.</p>
    </section>
  `;
}

export function hydrateCustomers(root) {
  const table = root.querySelector('#cus-table');
  const paint = (query = '') => {
    if (!table) return;
    table.columns = customerColumns;
    table.rows = searchRecords(customerRows(), query, ['company', 'contact', 'plan', 'status']);
  };
  paint();
  root.querySelector('#cus-search')?.addEventListener('eds-input', (event) => {
    paint(event.detail?.value ?? '');
  });
  root.querySelector('#add-customer')?.addEventListener('eds-click', () => document.querySelector('#create-modal')?.show());
  table?.addEventListener('click', () => {
    window.location.hash = '#/customer/cus_harbor';
  });
}
