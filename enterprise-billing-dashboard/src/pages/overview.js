import { activity, collectionsWatch, invoiceColumns, invoices, kpis, revenueMonths } from '../data/index.js';
import { badgeHtml, bars, cardGrid, chartPanel, contentCard, hydrateStats, pageHeader, sparkline, statGrid } from '../components/widgets.js';
import { showToast } from '@poluru-labs/enterprise-design-system-wc';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: 'Revenue operations',
      title: 'Overview',
      lead: 'Collections, recurring revenue, and subscription health for Northshore Cloud.',
      actions: `
        <eds-button id="qa-invoice" variant="primary" icon="plus">Create invoice</eds-button>
        <eds-button id="qa-payment" variant="secondary" icon="check">Record payment</eds-button>
        <eds-button id="qa-customer" variant="tertiary" icon="user">Add customer</eds-button>
        <eds-button id="qa-export" variant="tertiary" icon="download">Export report</eds-button>
      `,
    })}
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Revenue trend',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: sparkline(revenueMonths, 'Monthly revenue for the last twelve months') + '<p class="muted mb-0 mt-2">Recognized revenue, net of refunds. September is in progress.</p>',
        })}
      </div>
      <div class="col-lg-4">
        ${chartPanel({
          title: 'Payment outcomes',
          body: bars([88, 7, 3, 2], 'Collected, pending, failed, refunded') + '<p class="muted mb-0 mt-2">88% collected · 7% pending · 3% failed · 2% refunded</p>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-6">
        ${contentCard({
          title: 'Recent invoices',
          action: '<eds-link href="#/invoices" variant="subtle">View ledger</eds-link>',
          body: '<eds-data-table id="recent-invoices" compact striped></eds-data-table>',
        })}
      </div>
      <div class="col-lg-6">
        ${contentCard({
          title: 'Payment activity',
          body: `
            <eds-timeline id="pay-activity"></eds-timeline>
            <eds-divider label="growth" spacing="md"></eds-divider>
            <p class="muted mb-1">Subscriptions net +14 this month. Trial conversion is 41% on Starter.</p>
            <eds-progress-bar value="41" max="100" label="Trial conversion" show-value></eds-progress-bar>
          `,
        })}
      </div>
    </section>
    <h2 class="section-kicker">Collections watch</h2>
    ${cardGrid(
      collectionsWatch.map(
        (item) => contentCard({
          title: item.title,
          action: badgeHtml(item.tone),
          body: `
            <p class="ledger-amount mb-1">${item.amount}</p>
            <p class="muted mb-0">${item.hint}</p>
            <div class="inline-actions">
              <eds-link href="${item.href}" variant="default">Open</eds-link>
            </div>
          `,
        }),
      ),
    )}
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis, 'kpi');
  const table = root.querySelector('#recent-invoices');
  if (table) {
    table.columns = invoiceColumns.filter((col) => col.key !== 'method');
    table.rows = invoices.slice(0, 6);
  }
  const timeline = root.querySelector('#pay-activity');
  if (timeline) timeline.items = activity;
  root.querySelector('#qa-invoice')?.addEventListener('eds-click', () => {
    window.location.hash = '#/invoices';
    showToast({ message: 'Open the ledger to draft', variant: 'info' });
  });
  root.querySelector('#qa-payment')?.addEventListener('eds-click', () => {
    window.location.hash = '#/payments';
  });
  root.querySelector('#qa-customer')?.addEventListener('eds-click', () => {
    window.location.hash = '#/customers';
  });
  root.querySelector('#qa-export')?.addEventListener('eds-click', () => {
    window.location.hash = '#/reports';
  });
}
