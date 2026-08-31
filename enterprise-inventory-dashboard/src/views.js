import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  alerts,
  apiSnippet,
  currentUser,
  kpis,
  orderColumns,
  people,
  productColumns,
  productHistoryColumns,
  productHistoryRows,
  products,
  purchaseOrders,
  reports,
  reviews,
  stockTrend,
  suppliers,
  warehouseTree,
  warehouses,
  workspace,
} from './data.js';
import { emptyState, filterBar, hydrateStats, pageHeader, sheet, sparkline, statGrid, statusChip } from './ui.js';

export const viewState = {
  productQuery: '',
  orderQuery: '',
};

export function renderView(route) {
  const views = {
    overview: renderOverview,
    inventory: renderInventory,
    product: renderProduct,
    orders: renderOrders,
    warehouses: renderWarehouses,
    suppliers: renderSuppliers,
    team: renderTeam,
    alerts: renderAlerts,
    reports: renderReports,
    settings: renderSettings,
  };
  return (views[route.name] || renderOverview)(route);
}

function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Inventory pulse',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Fulfillment is ahead of plan. Dallas South needs a reorder review.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-po" variant="primary" icon="plus">New purchase order</eds-button>
        <eds-button id="qa-inventory" variant="secondary" icon="folder">Inventory</eds-button>
      `,
    })}
    <eds-alert id="stock-alert" variant="warning" dismissible title="Two SKUs below reorder point" message="Insulated bottle and LED headlamp are low at Dallas South. Meera Poluru opened a replenishment request."></eds-alert>
    ${statGrid(kpis.slice(0, 4), 'kpi')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Stock on hand',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(stockTrend, 'Trailing twelve months of stock on hand')}
            <p class="muted mb-0 mt-2">28,640 units on hand across six warehouses. Peak-season buffer target is 30,000.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Fulfillment health',
          action: '<eds-status label="Ahead of plan" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="fulfillment-ring" value="96.7" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="96.7" max="100" label="Same-day dispatch rate" show-value></eds-progress-bar>
              <p class="muted mb-0">Nine days left in the cycle. Dallas South capacity is the watch item.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/alerts" variant="subtle">Alerts</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Open purchase orders',
          action: '<eds-link href="#/orders" variant="subtle">All</eds-link>',
          body: '<eds-data-table id="recent-orders" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Review cadence',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Warehouse capacity',
          body: `
            <eds-meter id="capacity-meter" min="0" max="100" value="78" label="Network capacity used"></eds-meter>
            <eds-divider></eds-divider>
            <p class="muted mb-2">4 on track · 2 watch · 0 at risk</p>
            <div class="tag-row">
              <eds-tag label="Dallas South" variant="warning" dismissible></eds-tag>
              <eds-tag label="Seattle North" variant="warning" dismissible></eds-tag>
              <eds-tag label="Chicago Central" variant="brand"></eds-tag>
            </div>`,
        })}
      </div>
    </section>
  `;
}

function renderInventory() {
  return `
    ${pageHeader({
      eyebrow: 'Catalog',
      title: 'Inventory',
      lead: 'Every SKU across six warehouses. Dallas South carries the most low-stock risk this week.',
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
        <eds-pagination id="product-page" page="1" per-page="6"></eds-pagination>
      </div>
    </eds-card>
  `;
}

function renderProduct(route) {
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
    <section class="row g-3">
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

function renderOrders() {
  return `
    ${pageHeader({
      eyebrow: 'Procurement',
      title: 'Purchase orders',
      lead: 'Thirty-two open orders. Ferrotech Components is the one delayed shipment.',
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
    <div class="row g-3 mt-1">
      ${purchaseOrders
        .slice(0, 3)
        .map(
          (order) => `
        <div class="col-lg-4">
          <eds-card padded>
            <div class="section-title">
              <h2>${order.id.toUpperCase()}</h2>
              ${statusChip(order.status)}
            </div>
            <p class="muted">${order.supplier} · ${order.warehouse}</p>
            <eds-progress-bar value="${order.items}" max="15" label="${order.items} line items" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderWarehouses() {
  return `
    ${pageHeader({
      eyebrow: 'Network',
      title: 'Warehouses',
      lead: 'Six fulfillment sites. Dallas South and Seattle North are running above 85% capacity.',
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        ${sheet({
          title: 'Capacity trend',
          body: `${sparkline(stockTrend, 'Monthly stock on hand')}
            <p class="muted mb-0 mt-2">Steady growth from 21.2K to 28.6K units. No warehouse went backwards this fiscal year.</p>`,
        })}
        ${sheet({
          title: 'What changed',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="July" open>
                Phoenix Hub came online with 1,260 SKUs of overflow capacity.
              </eds-accordion-item>
              <eds-accordion-item heading="August">
                Dallas South crossed 90% capacity; two SKUs went low stock.
              </eds-accordion-item>
              <eds-accordion-item heading="September outlook">
                Cycle count freezes Thursday. Seattle overflow routes to Phoenix Hub.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Network tree',
          body: '<eds-tree-view id="warehouse-tree"></eds-tree-view>',
        })}
      </div>
    </section>
    <div class="row g-3 mt-1">
      ${warehouses
        .map(
          (site) => `
        <div class="col-md-6 col-xl-4">
          <eds-card padded>
            <div class="section-title">
              <h2>${site.name}</h2>
              ${statusChip(site.status)}
            </div>
            <p class="muted mb-2">${site.location} · ${site.manager} · ${site.skus.toLocaleString()} SKUs</p>
            <eds-progress-bar value="${site.capacityUsed}" max="${site.capacityTotal}" label="${site.capacityUsed}% capacity" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderSuppliers() {
  return `
    ${pageHeader({
      eyebrow: 'Vendors',
      title: 'Suppliers',
      lead: 'Five active suppliers. Ferrotech Components is on watch for lead time.',
      actions: `<eds-button id="supplier-add" variant="primary" icon="plus">New supplier</eds-button>`,
    })}
    <div class="row g-3">
      ${suppliers
        .map(
          (supplier) => `
        <div class="col-md-6 col-xl-4">
          <eds-card padded>
            <div class="section-title">
              <h2>${supplier.name}</h2>
              ${statusChip(supplier.status)}
            </div>
            <p class="muted mb-2">${supplier.category} · lead time ${supplier.leadTime}</p>
            <eds-rating value="${supplier.rating}" allow-half readonly size="sm"></eds-rating>
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderTeam() {
  return `
    ${pageHeader({
      eyebrow: 'Owners',
      title: 'Team',
      lead: 'Every warehouse and procurement lead is a Poluru. Scores reflect this week’s operational health.',
    })}
    <div class="row g-3">
      ${people
        .map(
          (person) => `
        <div class="col-md-6 col-xl-4">
          <eds-card padded>
            <div class="person-card">
              <eds-avatar name="${person.name}" size="md"></eds-avatar>
              <div>
                <strong>${person.name}</strong>
                <p class="muted mb-1">${person.role} · ${person.squad}</p>
                <eds-rating value="${person.rating}" readonly size="sm"></eds-rating>
              </div>
            </div>
            <eds-progress-bar class="mt-3" value="${person.score}" max="100" label="${person.score} health" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderAlerts() {
  return `
    ${pageHeader({
      eyebrow: 'Thresholds',
      title: 'Alerts',
      lead: 'Two red reorder breaches, two amber watches, and one resolved cycle-count variance.',
      actions: `<eds-button id="alert-add" variant="primary" icon="plus">New alert</eds-button>`,
    })}
    <eds-alert variant="danger" title="Reorder point breach" message="Insulated bottle and LED headlamp are below reorder point at Dallas South. Meera Poluru owns the replenishment."></eds-alert>
    <div class="stack mt-3">
      ${alerts
        .map(
          (item) => `
        <eds-card padded>
          <div class="section-title">
            <h2>${item.title}</h2>
            ${statusChip(item.severity)}
          </div>
          <p class="muted mb-2">${item.location} · ${item.owner} · since ${item.since}</p>
          <p class="mb-0">${item.note}</p>
        </eds-card>`,
        )
        .join('')}
    </div>
  `;
}

function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Exports',
      title: 'Reports',
      lead: 'Standard exports for stock snapshots, reorder points, and supplier scorecards.',
      actions: `<eds-button id="report-add" variant="primary" icon="plus">New report</eds-button>`,
    })}
    <eds-card padded>
      <eds-data-table id="report-table" striped></eds-data-table>
    </eds-card>
    <div class="row g-3 mt-1">
      <div class="col-lg-7">
        ${sheet({
          title: 'This week',
          body: '<eds-timeline id="review-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Inventory API',
          body: `<eds-code-snippet id="api-snippet" language="json"></eds-code-snippet>
            <eds-file-upload class="mt-3" label="Upload a CSV import" accept=".csv,.xlsx" hint="Used for bulk SKU updates."></eds-file-upload>`,
        })}
      </div>
    </div>
    <div class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Next cycle count',
          body: `
            <eds-date-picker id="review-day" label="Date"></eds-date-picker>
            <eds-time-picker class="mt-3" id="review-time" label="Start"></eds-time-picker>
            <eds-checkbox class="mt-3" id="review-board" label="Include supplier appendix" checked></eds-checkbox>
            <eds-button class="mt-3" id="schedule-review" variant="primary">Hold the slot</eds-button>`,
        })}
      </div>
    </div>
  `;
}

function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Preferences for Poluru Supply Co. Changes apply to this workspace only.',
    })}
    <section class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'General',
          body: `
            <div class="stack">
              <eds-input label="Workspace name" value="Poluru Supply Co." icon="folder"></eds-input>
              <eds-select id="settings-timezone" label="Timezone"></eds-select>
              <eds-switch label="Low-stock email alerts" checked></eds-switch>
              <eds-switch label="Weekly stock snapshot"></eds-switch>
              <eds-slider id="settings-buffer" label="Peak-season buffer" min="0" max="100" value="20" show-value></eds-slider>
            </div>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Security',
          body: `
            <div class="stack">
              <eds-pin-input id="settings-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
              <eds-radio-group id="settings-role" label="Default role" name="settings-role" value="ops">
                <eds-radio value="ops" label="Operations"></eds-radio>
                <eds-radio value="viewer" label="Viewer"></eds-radio>
              </eds-radio-group>
              <eds-button id="save-settings" variant="primary">Save changes</eds-button>
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) {
    hydrateStats(root, kpis.slice(0, 4), 'kpi');
    const period = root.querySelector('#dash-period');
    if (period) {
      period.options = [
        { label: 'Week', value: 'week' },
        { label: 'Q3', value: 'q3' },
        { label: 'FY26', value: 'fy' },
      ];
      period.value = 'q3';
    }
    const watch = root.querySelector('#watch-list');
    if (watch) {
      watch.items = [
        { label: 'Bottle below reorder point', description: 'Meera Poluru · Dallas South', icon: 'alert-triangle', href: '#/alerts' },
        { label: 'Headlamp critically low', description: 'Meera Poluru · Dallas South', icon: 'alert-triangle', href: '#/alerts' },
        { label: 'Cycle count due Monday', description: 'Aditi Poluru · 08:00', icon: 'clock', href: '#/reports' },
      ];
    }
    const recent = root.querySelector('#recent-orders');
    if (recent) {
      recent.columns = orderColumns.filter((col) => ['id', 'supplier', 'status', 'eta'].includes(col.key));
      recent.rows = purchaseOrders.slice(0, 4).map((item) => ({
        id: item.id.toUpperCase(),
        supplier: item.supplier,
        status: item.status,
        eta: item.eta,
      }));
    }
    const timeline = root.querySelector('#overview-timeline');
    if (timeline) timeline.items = reviews;
    root.querySelector('#qa-po')?.addEventListener('eds-click', () => document.querySelector('#order-modal')?.show());
    root.querySelector('#qa-inventory')?.addEventListener('eds-click', () => {
      window.location.hash = '#/inventory';
    });
    root.querySelector('#stock-alert')?.addEventListener('eds-dismiss', () => {
      showToast({ message: 'Reorder reminder dismissed', variant: 'info' });
    });
    recent?.addEventListener('click', () => {
      window.location.hash = '#/orders';
    });
    root.querySelectorAll('eds-tag').forEach((tag) => {
      tag.addEventListener('eds-dismiss', () => tag.remove());
    });
  }

  if (route.name === 'inventory') {
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

  if (route.name === 'product') {
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

  if (route.name === 'orders') {
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

  if (route.name === 'warehouses') {
    const tree = root.querySelector('#warehouse-tree');
    if (tree) {
      tree.items = warehouseTree;
      tree.expandedIds = { central: true, coastal: true, south: true };
    }
    tree?.addEventListener('eds-select', () => {
      window.location.hash = '#/warehouses';
    });
  }

  if (route.name === 'suppliers') {
    root.querySelector('#supplier-add')?.addEventListener('eds-click', () => {
      showToast({ message: 'Supplier intake form opened', variant: 'info' });
    });
  }

  if (route.name === 'alerts') {
    root.querySelector('#alert-add')?.addEventListener('eds-click', () => document.querySelector('#order-modal')?.show());
  }

  if (route.name === 'reports') {
    const snippet = root.querySelector('#api-snippet');
    if (snippet) snippet.code = apiSnippet;
    root.querySelector('#schedule-review')?.addEventListener('eds-click', () => {
      showToast({ message: 'Cycle count held on the calendar', variant: 'success' });
    });
    const timeline = root.querySelector('#review-timeline');
    if (timeline) timeline.items = reviews;
    const table = root.querySelector('#report-table');
    if (table) {
      table.columns = [
        { key: 'name', label: 'Report', sortable: true },
        { key: 'owner', label: 'Owner' },
        { key: 'updated', label: 'Updated' },
        { key: 'format', label: 'Format' },
      ];
      table.rows = reports;
    }
  }

  if (route.name === 'settings') {
    const timezone = root.querySelector('#settings-timezone');
    if (timezone) {
      timezone.options = [
        { label: 'America / Chicago', value: 'chicago' },
        { label: 'America / Denver', value: 'denver' },
        { label: 'America / Los Angeles', value: 'la' },
      ];
      timezone.value = 'chicago';
    }
    root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
      showToast({ message: 'Workspace settings saved', variant: 'success' });
    });
  }
}
