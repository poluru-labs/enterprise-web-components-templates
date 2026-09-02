import { productHistoryColumns, productHistoryRows, products } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderProduct(route) {
  const item = products.find((entry) => entry.id === route.id) ?? products[0];
  return `
    ${pageHeader({
      eyebrow: item.category,
      title: item.name,
      lead: `SKU ${item.sku} · stored at ${item.warehouse}. Last counted ${item.updated}.`,
      actions: `
        <eds-button id="open-alerts" variant="secondary" icon="bell">Alerts</eds-button>
        <eds-button id="reorder-sku" variant="primary" icon="plus">Create reorder</eds-button>
      `,
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="Stock" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">On hand</span>
                  <p class="hero-metric">${item.quantity.toLocaleString()}</p>
                  ${statusChip(item.status)}
                </div>
                <eds-progress-bar value="${Math.min(item.quantity, item.reorder * 2)}" max="${item.reorder * 2}" label="Reorder point ${item.reorder}" show-value></eds-progress-bar>
              </div>
              <eds-divider></eds-divider>
              <eds-data-table id="product-history" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Notes">
              <p>${item.name} is sourced through the ${item.category.toLowerCase()} category. Reorders route through Farhan Poluru's procurement queue.</p>
              <eds-textarea label="Stock note" rows="4" placeholder="What changed, what is off plan, who owns the next action."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="product-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Related',
          body: `<p class="muted mb-2">Purchase orders and alerts for this SKU.</p>
            <eds-link href="#/orders" variant="default">Open purchase orders</eds-link>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateProduct(root, route) {
  const item = products.find((entry) => entry.id === route.id) ?? products[0];
  const facts = root.querySelector('#product-facts');
  if (facts) {
    facts.items = [
      { term: 'Warehouse', description: item.warehouse },
      { term: 'Category', description: item.category },
      { term: 'On hand', description: item.quantity.toLocaleString() },
      { term: 'Reorder point', description: String(item.reorder) },
      { term: 'Status', description: item.status },
      { term: 'Updated', description: item.updated },
    ];
  }
  const table = root.querySelector('#product-history');
  if (table) {
    table.columns = productHistoryColumns;
    table.rows = productHistoryRows;
  }
  root.querySelector('#open-alerts')?.addEventListener('eds-click', () => {
    window.location.hash = '#/alerts';
  });
  root.querySelector('#reorder-sku')?.addEventListener('eds-click', () => document.querySelector('#order-modal')?.show());
}
