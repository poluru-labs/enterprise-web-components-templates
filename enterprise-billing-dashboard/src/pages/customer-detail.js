import { activity, customers, invoiceColumns, invoices } from '../data/index.js';
import { badgeHtml, cardGrid, contentCard, pageHeader } from '../components/widgets.js';

export function renderCustomerDetail(id) {
  const customer = customers.find((item) => item.id === id) ?? customers[0];
  const related = [];
  const seen = new Set();
  for (const item of [...invoices.filter((row) => row.customerId === customer.id), ...invoices]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    related.push(item);
    if (related.length === 4) break;
  }
  return `
    ${pageHeader({
      eyebrow: 'Customer',
      title: customer.company,
      lead: `${customer.contact} · ${customer.email} · ${customer.plan}`,
      actions: `
        <eds-button id="cus-invoice" variant="primary" icon="plus">New invoice</eds-button>
        <eds-button id="cus-note" variant="secondary" icon="edit">Add note</eds-button>
      `,
    })}
    <div class="row g-3 stretch-grid">
      <div class="col-lg-4">
        ${contentCard({
          title: '',
          body: `
            <eds-avatar name="${customer.contact}" size="lg"></eds-avatar>
            <p class="mt-2 mb-1"><strong>${customer.contact}</strong></p>
            <p class="muted">${customer.address}</p>
            <eds-description-list id="cus-facts"></eds-description-list>
          `,
        })}
      </div>
      <div class="col-lg-8">
        ${contentCard({
          title: 'Billing profile',
          body: `
            <eds-tabs>
              <eds-tab label="Billing history" active>
                <eds-data-table id="cus-invoices" compact striped></eds-data-table>
              </eds-tab>
              <eds-tab label="Payment methods">
                <p class="mb-1"><strong>${customer.method}</strong></p>
                <p class="muted mb-0">Default for automatic collection. Backup method is not on file.</p>
              </eds-tab>
              <eds-tab label="Notes">
                <eds-textarea label="Internal note" rows="4" placeholder="Collections context, legal entity changes, or tax exemptions."></eds-textarea>
                <eds-button class="mt-3" variant="secondary" icon="save">Save note</eds-button>
              </eds-tab>
              <eds-tab label="Activity">
                <eds-timeline id="cus-activity"></eds-timeline>
              </eds-tab>
            </eds-tabs>
          `,
        })}
      </div>
    </div>
    <h2 class="section-kicker">Open and recent invoices</h2>
    ${cardGrid(
      related.map((item) =>
        contentCard({
          title: item.id,
          action: badgeHtml(item.status),
          body: `
            <p class="muted mb-1">Issued ${item.issued} · due ${item.due}</p>
            <p class="ledger-amount mb-0">${item.amount}</p>
            <div class="inline-actions">
              <eds-link href="#/invoice/${item.id}" variant="default">Open invoice</eds-link>
            </div>
          `,
        }),
      ),
    )}
  `;
}

export function hydrateCustomerDetail(root, route) {
  const customer = customers.find((item) => item.id === route.id) ?? customers[0];
  const facts = root.querySelector('#cus-facts');
  if (facts) {
    facts.items = [
      { term: 'Plan', description: customer.plan },
      { term: 'LTV', description: customer.ltv },
      { term: 'Outstanding', description: customer.outstanding },
      { term: 'Status', description: customer.status },
      { term: 'Method', description: customer.method },
    ];
  }
  const table = root.querySelector('#cus-invoices');
  if (table) {
    table.columns = invoiceColumns.filter((col) => ['id', 'issued', 'amount', 'status'].includes(col.key));
    table.rows = invoices.filter((item) => item.customerId === customer.id);
  }
  const timeline = root.querySelector('#cus-activity');
  if (timeline) timeline.items = activity;
  root.querySelector('#cus-invoice')?.addEventListener('eds-click', () => {
    window.location.hash = '#/invoices';
  });
}
