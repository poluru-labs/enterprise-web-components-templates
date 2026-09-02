import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  currentUser,
  kpis,
  orderColumns,
  purchaseOrders,
  reviews,
  stockTrend,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid, cadenceList } from '../components/widgets.js';

export function renderOverview() {
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
    <eds-alert id="stock-alert" variant="warning" dismissible title="Three SKUs below reorder point" message="Insulated bottle, LED headlamp, and solar charger are low. Meera and Devansh opened replenishment requests."></eds-alert>
    ${statGrid(kpis.slice(0, 4), 'kpi')}
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Stock on hand',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(stockTrend, 'Trailing twelve months of stock on hand')}
            <p class="muted mb-0 mt-2">28,640 units on hand across eight warehouses. Peak-season buffer target is 30,000.</p>`,
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
              <p class="muted mb-0">Nine days left in the cycle. Dock 2 clears in ~18 minutes.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch">
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
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Review cadence',
          action: `
            <div class="inline-actions">
              <eds-badge label="This week" variant="brand" pill></eds-badge>
              <eds-link href="#/reports" variant="subtle">Reports</eds-link>
            </div>`,
          body: cadenceList(reviews),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Warehouse capacity',
          body: `
            <eds-meter id="capacity-meter" min="0" max="100" value="78" label="Network capacity used"></eds-meter>
            <eds-divider></eds-divider>
            <p class="muted mb-2">6 on track · 2 watch · 0 at risk</p>
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

export function hydrateOverview(root) {
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
      { label: 'Solar charger low stock', description: 'Devansh Poluru · Seattle North', icon: 'alert-triangle', href: '#/alerts' },
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
