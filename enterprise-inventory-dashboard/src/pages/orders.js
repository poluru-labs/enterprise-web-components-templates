import { orderColumns, purchaseOrders, warehouses } from '../data/index.js';
import { cardGrid, emptyState, filterBar, pageHeader, statusChip } from '../components/widgets.js';
import { viewState } from './state.js';

export function renderOrders() {
  const cards = purchaseOrders.slice(0, 8).map(
    (order) => `
      <content-card>
        <div slot="header" class="section-title">
          <h2>${order.id.toUpperCase()}</h2>
          ${statusChip(order.status)}
        </div>
        <p class="muted">${order.supplier} · ${order.warehouse}</p>
        <p class="muted mb-2">ETA ${order.eta} · ${order.total}</p>
        <eds-progress-bar value="${order.items}" max="15" label="${order.items} line items" show-value></eds-progress-bar>
      </content-card>`,
  );

  return `
    ${pageHeader({
      eyebrow: 'Procurement',
      title: 'Purchase orders',
      lead: 'Thirty-six open orders. Ferrotech Components is the one delayed shipment.',
      actions: `<eds-button id="order-add" variant="primary" icon="plus">New purchase order</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="order-search" placeholder="Search order or supplier" clearable></eds-search>
        <eds-autocomplete id="order-warehouse" label="Warehouse" placeholder="Any warehouse"></eds-autocomplete>
        <eds-segmented-control id="order-status"></eds-segmented-control>
      `)}
      <eds-data-table id="order-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'order-empty',
        heading: 'No purchase orders match',
        description: 'Clear search or status to see every open order.',
        action: '<eds-button id="reset-orders" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    ${cardGrid(cards, 4)}
  `;
}

export function hydrateOrders(root) {
  const table = root.querySelector('#order-table');
  const empty = root.querySelector('#order-empty');
  const status = root.querySelector('#order-status');
  const warehouse = root.querySelector('#order-warehouse');
  if (status) {
    status.options = [
      { label: 'All', value: 'all' },
      { label: 'Draft', value: 'Draft' },
      { label: 'Confirmed', value: 'Confirmed' },
      { label: 'In transit', value: 'In transit' },
      { label: 'Delayed', value: 'Delayed' },
    ];
    status.value = 'all';
  }
  if (warehouse) warehouse.options = warehouses.map((site) => ({ label: site.name, value: site.name }));
  const paint = () => {
    const query = viewState.orderQuery.toLowerCase();
    const rows = purchaseOrders
      .filter((item) => `${item.id} ${item.supplier}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({ ...item, id: item.id.toUpperCase() }));
    if (table) {
      table.columns = orderColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#order-search')?.addEventListener('eds-input', (event) => {
    viewState.orderQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-orders')?.addEventListener('eds-click', () => {
    viewState.orderQuery = '';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#order-add')?.addEventListener('eds-click', () => document.querySelector('#order-modal')?.show());
}
