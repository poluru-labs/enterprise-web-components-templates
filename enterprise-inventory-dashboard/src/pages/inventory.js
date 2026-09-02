import { productColumns, products, warehouses } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';
import { viewState } from './state.js';

export function renderInventory() {
  return `
    ${pageHeader({
      eyebrow: 'Catalog',
      title: 'Inventory',
      lead: 'Twelve SKUs across eight warehouses. Dallas South carries the most low-stock risk this week.',
      actions: `
        <eds-split-button id="product-split" variant="primary" icon="plus">
          New SKU
          <eds-menu-item slot="menu" label="New SKU" value="sku" icon="folder"></eds-menu-item>
          <eds-menu-item slot="menu" label="New alert" value="alert" icon="bell"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="product-search" placeholder="Search SKU or item name" clearable></eds-search>
        <eds-select id="product-status" label="Status"></eds-select>
        <eds-select id="product-warehouse" label="Warehouse"></eds-select>
        <eds-date-range-picker id="product-dates" label="Updated"></eds-date-range-picker>
      `)}
      <div id="product-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading inventory" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="product-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'product-empty',
        heading: 'No SKUs match',
        description: 'Clear the search or warehouse filter.',
        action: '<eds-button id="reset-products" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="product-page" page="1" per-page="8"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateInventory(root) {
  const table = root.querySelector('#product-table');
  const empty = root.querySelector('#product-empty');
  const status = root.querySelector('#product-status');
  const warehouse = root.querySelector('#product-warehouse');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'In stock', value: 'In stock' },
      { label: 'Low stock', value: 'Low stock' },
      { label: 'Backordered', value: 'Backordered' },
    ];
    status.value = 'all';
  }
  if (warehouse) {
    warehouse.options = [
      { label: 'All warehouses', value: 'all' },
      ...warehouses.map((site) => ({ label: site.name, value: site.name })),
    ];
    warehouse.value = 'all';
  }
  const paint = () => {
    const query = viewState.productQuery.toLowerCase();
    const rows = products
      .filter((item) => `${item.sku} ${item.name}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (warehouse?.value || 'all') === 'all' || item.warehouse === warehouse.value)
      .map((item) => ({
        sku: item.sku,
        name: item.name,
        category: item.category,
        warehouse: item.warehouse,
        quantity: item.quantity.toLocaleString(),
        status: item.status,
        updated: item.updated,
        id: item.id,
      }));
    if (table) {
      table.columns = productColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#product-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#product-search')?.addEventListener('eds-input', (event) => {
    viewState.productQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  warehouse?.addEventListener('eds-change', paint);
  root.querySelector('#reset-products')?.addEventListener('eds-click', () => {
    viewState.productQuery = '';
    if (status) status.value = 'all';
    if (warehouse) warehouse.value = 'all';
    paint();
  });
  root.querySelector('#product-split')?.addEventListener('eds-click', () => document.querySelector('#sku-modal')?.show());
  root.querySelector('#product-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'alert') document.querySelector('#order-modal')?.show();
    else document.querySelector('#sku-modal')?.show();
  });
  table?.addEventListener('click', () => {
    window.location.hash = '#/product/sku_002';
  });
}
