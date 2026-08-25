import { showToast, todayISO } from '@poluru-labs/enterprise-design-system-wc';
import {
  activity,
  company,
  currentUser,
  customerColumns,
  customers,
  invoiceColumns,
  invoiceLines,
  invoices,
  invoiceTimeline,
  kpis,
  paymentColumns,
  paymentKpis,
  payments,
  planCards,
  reports,
  revenueMonths,
  subscriptionColumns,
  subscriptions,
} from './data.js';
import { bars, chartPanel, emptyState, filterBar, formSection, hydrateStats, pageHeader, sparkline, statGrid } from './ui.js';

export const viewState = {
  invoiceQuery: '',
  invoiceStatus: 'all',
  paymentQuery: '',
  subStatus: 'all',
  customerQuery: '',
};

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
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Revenue trend',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: sparkline(revenueMonths, 'Monthly revenue for the last twelve months') + '<p class="muted mb-0 mt-2">Recognized revenue, net of refunds. August is in progress.</p>',
        })}
      </div>
      <div class="col-lg-4">
        ${chartPanel({
          title: 'Payment outcomes',
          body: bars([88, 7, 3, 2], 'Collected, pending, failed, refunded') + '<p class="muted mb-0 mt-2">88% collected · 7% pending · 3% failed · 2% refunded</p>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        <section class="sheet">
          <div class="section-title">
            <h2>Recent invoices</h2>
            <eds-link href="#/invoices" variant="subtle">View ledger</eds-link>
          </div>
          <eds-data-table id="recent-invoices" compact striped></eds-data-table>
        </section>
      </div>
      <div class="col-lg-5">
        <section class="sheet">
          <div class="section-title"><h2>Payment activity</h2></div>
          <eds-timeline id="pay-activity"></eds-timeline>
          <eds-divider label="growth" spacing="md"></eds-divider>
          <p class="muted mb-1">Subscriptions net +14 this month. Trial conversion is 41% on Starter.</p>
          <eds-progress-bar value="41" max="100" label="Trial conversion" show-value></eds-progress-bar>
        </section>
      </div>
    </section>
  `;
}

export function renderInvoices() {
  return `
    ${pageHeader({
      eyebrow: 'Receivables',
      title: 'Invoices',
      lead: 'Issue, collect, and age every invoice from a single ledger.',
      actions: `
        <eds-button id="bulk-remind" variant="secondary" icon="mail">Remind overdue</eds-button>
        <eds-button id="export-invoices" variant="tertiary" icon="download">Export CSV</eds-button>
        <eds-button id="new-invoice" variant="primary" icon="plus">New invoice</eds-button>
      `,
    })}
    <section class="sheet">
      ${filterBar(`
        <eds-search id="invoice-search" placeholder="Search ID or customer" clearable></eds-search>
        <eds-segmented-control id="invoice-status"></eds-segmented-control>
        <eds-date-range-picker id="invoice-dates" label="Issue dates"></eds-date-range-picker>
      `)}
      <div id="invoice-loading" class="stack mt-3" hidden>
        <eds-spinner size="md" label="Loading ledger" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <div id="invoice-table-wrap" class="mt-3">
        <eds-data-table id="invoice-table" sortable striped compact></eds-data-table>
        <p id="invoice-count" class="muted mt-3 mb-0"></p>
      </div>
      ${emptyState({
        id: 'invoice-empty',
        heading: 'No invoices match',
        description: 'Clear status or search a customer name.',
        action: '<eds-button id="reset-invoices" slot="actions" variant="primary">Reset filters</eds-button>',
      })}
    </section>
  `;
}

export function renderInvoiceDetail(id) {
  const invoice = invoices.find((item) => item.id === id) ?? invoices[0];
  const customer = customers.find((item) => item.id === invoice.customerId);
  const lines = invoiceLines[invoice.id] ?? [
    { item: `${customer?.plan ?? 'Plan'} · August 2026`, qty: 1, rate: invoice.amount, total: invoice.amount },
  ];
  return `
    ${pageHeader({
      eyebrow: 'Invoice',
      title: invoice.id,
      lead: `${invoice.customer} · issued ${invoice.issued} · due ${invoice.due}`,
      actions: `
        <eds-button id="inv-pdf" variant="secondary" icon="download">Download PDF</eds-button>
        <eds-button id="inv-remind" variant="secondary" icon="mail">Send reminder</eds-button>
        <eds-button id="inv-paid" variant="primary" icon="check">Mark as paid</eds-button>
        <eds-button id="inv-dupe" variant="tertiary" icon="copy">Duplicate</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-8">
        <section class="sheet">
          <div class="invoice-hero mb-3">
            <span class="kicker">Amount due</span>
            <strong>${invoice.amount}</strong>
            <div>${badgeHtml(invoice.status)} · ${invoice.method}</div>
          </div>
          <table class="line-table">
            <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead>
            <tbody>
              ${lines.map((line) => `<tr><td>${line.item}</td><td>${line.qty}</td><td>${line.rate}</td><td>${line.total}</td></tr>`).join('')}
            </tbody>
          </table>
          <eds-description-list id="inv-totals" class="mt-3"></eds-description-list>
          <p class="muted mt-3 mb-0">Payment terms ${company.terms}. Late fees accrue after day 15. Notes: please remit to the Austin lockbox or ACH instructions on the hosted invoice.</p>
        </section>
      </div>
      <div class="col-lg-4">
        <section class="sheet">
          <div class="section-title"><h2>Customer</h2></div>
          <p class="mb-1"><strong>${customer?.company}</strong></p>
          <p class="muted mb-1">${customer?.contact} · ${customer?.email}</p>
          <p class="muted">${customer?.address}</p>
          <eds-link href="#/customer/${customer?.id}" variant="default">Open profile</eds-link>
        </section>
        <section class="sheet mt-3">
          <div class="section-title"><h2>Audit timeline</h2></div>
          <eds-timeline id="inv-timeline"></eds-timeline>
        </section>
      </div>
    </div>
  `;
}

function badgeHtml(status) {
  const map = {
    Paid: 'success',
    Overdue: 'danger',
    Pending: 'warning',
    Draft: 'neutral',
    Cancelled: 'neutral',
  };
  return `<eds-badge label="${status}" variant="${map[status] ?? 'neutral'}" pill></eds-badge>`;
}

export function renderPayments() {
  return `
    ${pageHeader({
      eyebrow: 'Cash',
      title: 'Payments',
      lead: 'Transaction-level ledger for captures, retries, refunds, and disputes.',
      actions: `<eds-button id="record-payment" variant="primary" icon="plus">Record payment</eds-button>`,
    })}
    ${statGrid(paymentKpis, 'paykpi')}
    <section class="sheet mt-3">
      ${filterBar(`
        <eds-search id="pay-search" placeholder="Search customer or transaction" clearable></eds-search>
        <eds-select id="pay-method" label="Method"></eds-select>
        <eds-select id="pay-status" label="Status"></eds-select>
        <eds-date-range-picker id="pay-dates" label="Settled"></eds-date-range-picker>
      `)}
      <div class="mt-3">
        <eds-data-table id="pay-table" sortable striped compact></eds-data-table>
      </div>
    </section>
    <div class="row g-3 mt-1">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'Method mix',
          body: `
            <div class="region-mix">
              <div><div class="d-flex justify-content-between"><strong>Cards</strong><span>61%</span></div><div class="region-track"><span style="width:61%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>ACH</strong><span>27%</span></div><div class="region-track"><span style="width:27%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Wire</strong><span>12%</span></div><div class="region-track"><span style="width:12%"></span></div></div>
            </div>
          `,
        })}
      </div>
      <div class="col-lg-6">
        <section class="sheet">
          <div class="section-title"><h2>Exceptions</h2></div>
          <eds-alert variant="danger" title="Dispute open" message="Lumen Health INV-2839 · $18,200 wire is in review with the originating bank."></eds-alert>
          <eds-alert class="mt-2" variant="warning" title="ACH return" message="Nimbus Retail INV-2840 failed with R01. Next retry 26 Aug."></eds-alert>
        </section>
      </div>
    </div>
  `;
}

export function renderSubscriptions() {
  return `
    ${pageHeader({
      eyebrow: 'Recurring',
      title: 'Subscriptions',
      lead: 'Plans, trials, renewals, and lifecycle movement across the book.',
    })}
    ${statGrid(planCards, 'plan')}
    <section class="sheet mt-3">
      ${filterBar(`<eds-segmented-control id="sub-status"></eds-segmented-control>`)}
      <div class="mt-3">
        <eds-data-table id="sub-table" sortable striped compact></eds-data-table>
      </div>
    </section>
    <div class="row g-3 mt-1">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'Lifecycle',
          body: bars([72, 11, 8, 9], 'Active, trial, past due, cancelled') + '<p class="muted mt-2 mb-0">72% active · 11% trial · 8% past due · 9% cancelled</p>',
        })}
      </div>
      <div class="col-lg-6">
        <section class="sheet">
          <div class="section-title"><h2>This week</h2></div>
          <eds-list id="sub-moves" divided></eds-list>
        </section>
      </div>
    </div>
  `;
}

export function renderCustomers() {
  return `
    ${pageHeader({
      eyebrow: 'Accounts',
      title: 'Customers',
      lead: 'Companies, plans, lifetime value, and open balances.',
      actions: `<eds-button id="add-customer" variant="primary" icon="plus">Add customer</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="cus-search" placeholder="Search company or contact" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="cus-table" sortable striped compact></eds-data-table>
      </div>
      <p class="muted mt-3 mb-0">Select a row, then open the profile from the command toast — or use #/customer/cus_harbor.</p>
    </section>
  `;
}

export function renderCustomerDetail(id) {
  const customer = customers.find((item) => item.id === id) ?? customers[0];
  const history = invoices.filter((item) => item.customerId === customer.id);
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
    <div class="row g-3">
      <div class="col-lg-4">
        <section class="sheet">
          <eds-avatar name="${customer.contact}" size="lg"></eds-avatar>
          <p class="mt-2 mb-1"><strong>${customer.contact}</strong></p>
          <p class="muted">${customer.address}</p>
          <eds-description-list id="cus-facts"></eds-description-list>
        </section>
      </div>
      <div class="col-lg-8">
        <section class="sheet">
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
        </section>
      </div>
    </div>
  `;
}

export function renderAnalytics() {
  return `
    ${pageHeader({
      eyebrow: 'Executive',
      title: 'Revenue analytics',
      lead: 'MRR, ARR, expansion, refunds, and plan mix — styled for board packs.',
    })}
    <div class="row g-3">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Revenue by month',
          action: '<eds-badge label="Net" variant="brand" pill></eds-badge>',
          body: sparkline(revenueMonths, 'Net revenue by month'),
        })}
      </div>
      <div class="col-lg-4">
        ${chartPanel({
          title: 'By plan',
          body: `
            <div class="region-mix">
              <div><div class="d-flex justify-content-between"><strong>Enterprise</strong><span>$36.6k MRR</span></div><div class="region-track"><span style="width:44%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Scale</strong><span>$15.2k</span></div><div class="region-track"><span style="width:28%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Growth</strong><span>$11.0k</span></div><div class="region-track"><span style="width:18%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Starter</strong><span>$3.6k</span></div><div class="region-track"><span style="width:10%"></span></div></div>
            </div>
          `,
        })}
      </div>
    </div>
    <div class="row g-3 mt-1">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'By region',
          body: bars([46, 31, 23], 'Americas, EMEA, APAC') + '<p class="muted mt-2 mb-0">Americas 46% · EMEA 31% · APAC 23%</p>',
        })}
      </div>
      <div class="col-lg-6">
        <section class="sheet">
          <div class="section-title"><h2>Movement</h2></div>
          <eds-description-list id="rev-move"></eds-description-list>
        </section>
      </div>
    </div>
  `;
}

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Close',
      title: 'Reports',
      lead: 'Aging, reconciliation, retention, and tax — exportable for finance review.',
    })}
    <div class="row g-3">
      ${reports
        .map(
          (item, index) => `
        <div class="col-lg-6">
          <section class="sheet">
            <span class="kicker">Report ${index + 1}</span>
            <h2 class="mt-2">${item.name}</h2>
            <p class="muted">${item.description}</p>
            <p class="muted">Owner ${item.owner} · ${item.updated}</p>
            <div class="inline-actions">
              <eds-button class="export-csv" variant="secondary" icon="download" data-name="${item.name}">CSV</eds-button>
              <eds-button class="export-pdf" variant="primary" icon="file" data-name="${item.name}">PDF</eds-button>
            </div>
          </section>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Configuration',
      title: 'Billing settings',
      lead: 'Company profile, tax, templates, terms, currency, gateways, and notices.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${formSection({
          title: 'Company billing profile',
          body: `
            <eds-input label="Legal name" value="${company.name}" icon="edit"></eds-input>
            <eds-textarea label="Billing address" rows="3" value="${company.address}"></eds-textarea>
            <eds-input label="Tax ID" value="${company.taxId}"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Tax & currency',
          body: `
            <eds-select id="currency" label="Default currency"></eds-select>
            <eds-switch label="Collect sales tax automatically" checked></eds-switch>
            <eds-switch label="Show VAT ID on invoices" checked></eds-switch>
            <eds-input label="Default tax rate" value="8.25%"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Invoice template',
          body: `
            <eds-input label="From display name" value="Northshore Cloud"></eds-input>
            <eds-select id="terms" label="Default payment terms"></eds-select>
            <eds-textarea label="Footer" rows="3" value="Thank you for building with Northshore. Questions: billing@northshore.example"></eds-textarea>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Gateways & notifications',
          body: `
            <eds-status variant="success" label="Stripe connected" pulse></eds-status>
            <eds-status variant="success" label="ACH via Plaid" ></eds-status>
            <eds-switch class="mt-2" label="Email customers when invoices are issued" checked></eds-switch>
            <eds-switch label="Slack #revops on failed payments" checked></eds-switch>
            <eds-switch label="Dunning sequence (3 reminders)" checked></eds-switch>
            <eds-button id="save-settings" variant="primary" icon="save">Save configuration</eds-button>
          `,
        })}
      </div>
    </div>
  `;
}

export function renderView(route) {
  if (route.name === 'invoice') return renderInvoiceDetail(route.id);
  if (route.name === 'customer') return renderCustomerDetail(route.id);
  const pages = {
    overview: renderOverview,
    invoices: renderInvoices,
    payments: renderPayments,
    subscriptions: renderSubscriptions,
    customers: renderCustomers,
    analytics: renderAnalytics,
    reports: renderReports,
    settings: renderSettings,
  };
  return (pages[route.name] ?? renderOverview)();
}

function filteredInvoices() {
  const query = viewState.invoiceQuery.trim().toLowerCase();
  return invoices.filter((row) => {
    const statusOk = viewState.invoiceStatus === 'all' || row.status.toLowerCase() === viewState.invoiceStatus;
    const queryOk = !query || `${row.id} ${row.customer}`.toLowerCase().includes(query);
    return statusOk && queryOk;
  });
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) {
    hydrateStats(root, kpis, 'kpi');
    const table = root.querySelector('#recent-invoices');
    if (table) {
      table.columns = invoiceColumns.filter((col) => col.key !== 'method');
      table.rows = invoices.slice(0, 5);
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

  if (route.name === 'invoices') {
    const paint = () => {
      const rows = filteredInvoices();
      const table = root.querySelector('#invoice-table');
      const empty = root.querySelector('#invoice-empty');
      const wrap = root.querySelector('#invoice-table-wrap');
      if (table) {
        table.columns = invoiceColumns;
        table.rows = rows;
      }
      const count = root.querySelector('#invoice-count');
      if (count) count.textContent = `${rows.length} invoices · click a row in the preview drawer`;
      const none = rows.length === 0;
      if (empty) empty.hidden = !none;
      if (wrap) wrap.hidden = none;
    };
    const seg = root.querySelector('#invoice-status');
    if (seg) {
      seg.options = [
        { label: 'All', value: 'all' },
        { label: 'Paid', value: 'paid' },
        { label: 'Pending', value: 'pending' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Draft', value: 'draft' },
        { label: 'Cancelled', value: 'cancelled' },
      ];
      seg.value = viewState.invoiceStatus;
      seg.addEventListener('eds-change', (event) => {
        viewState.invoiceStatus = (event.detail?.value ?? event.target.value).toLowerCase();
        paint();
      });
    }
    const dates = root.querySelector('#invoice-dates');
    if (dates) {
      dates.startValue = todayISO();
      dates.endValue = todayISO();
    }
    paint();
    root.querySelector('#invoice-search')?.addEventListener('eds-input', (event) => {
      viewState.invoiceQuery = event.detail?.value ?? event.target.value ?? '';
      paint();
    });
    root.querySelector('#reset-invoices')?.addEventListener('eds-click', () => {
      viewState.invoiceQuery = '';
      viewState.invoiceStatus = 'all';
      paint();
    });
    root.querySelector('#new-invoice')?.addEventListener('eds-click', () => {
      document.querySelector('#create-modal')?.show();
    });
    root.querySelector('#export-invoices')?.addEventListener('eds-click', () => {
      showToast({ message: 'Invoice CSV exported', variant: 'success' });
    });
    root.querySelector('#bulk-remind')?.addEventListener('eds-click', () => {
      showToast({ message: 'Reminders queued for overdue invoices', variant: 'success' });
    });
    root.querySelector('#invoice-table')?.addEventListener('click', () => {
      document.querySelector('#preview-drawer')?.show();
    });
  }

  if (route.name === 'invoice') {
    const totals = root.querySelector('#inv-totals');
    if (totals) {
      totals.items = [
        { term: 'Subtotal', description: '$18,400' },
        { term: 'Discount', description: '$0' },
        { term: 'Tax', description: 'Included' },
        { term: 'Amount due', description: invoices.find((item) => item.id === route.id)?.amount ?? '$18,400' },
      ];
    }
    const timeline = root.querySelector('#inv-timeline');
    if (timeline) timeline.items = invoiceTimeline;
    root.querySelector('#inv-pdf')?.addEventListener('eds-click', () => showToast({ message: 'PDF downloaded', variant: 'success' }));
    root.querySelector('#inv-remind')?.addEventListener('eds-click', () => showToast({ message: 'Reminder sent', variant: 'success' }));
    root.querySelector('#inv-paid')?.addEventListener('eds-click', () => showToast({ message: 'Marked as paid', variant: 'success' }));
    root.querySelector('#inv-dupe')?.addEventListener('eds-click', () => showToast({ message: 'Draft duplicate created', variant: 'info' }));
  }

  if (route.name === 'payments') {
    hydrateStats(root, paymentKpis, 'paykpi');
    const table = root.querySelector('#pay-table');
    if (table) {
      table.columns = paymentColumns;
      table.rows = payments;
    }
    const method = root.querySelector('#pay-method');
    if (method) method.options = [{ label: 'All methods', value: '' }, { label: 'Card', value: 'card' }, { label: 'ACH', value: 'ach' }, { label: 'Wire', value: 'wire' }];
    const status = root.querySelector('#pay-status');
    if (status) status.options = [{ label: 'All statuses', value: '' }, { label: 'Collected', value: 'collected' }, { label: 'Failed', value: 'failed' }, { label: 'Refunded', value: 'refunded' }, { label: 'Disputed', value: 'disputed' }];
    const dates = root.querySelector('#pay-dates');
    if (dates) {
      dates.startValue = todayISO();
      dates.endValue = todayISO();
    }
    root.querySelector('#record-payment')?.addEventListener('eds-click', () => document.querySelector('#create-modal')?.show());
    root.querySelector('#pay-search')?.addEventListener('eds-input', (event) => {
      const query = (event.detail?.value ?? '').toLowerCase();
      if (table) table.rows = payments.filter((row) => `${row.customer} ${row.id}`.toLowerCase().includes(query));
    });
  }

  if (route.name === 'subscriptions') {
    hydrateStats(root, planCards, 'plan');
    const table = root.querySelector('#sub-table');
    const paint = () => {
      if (!table) return;
      table.columns = subscriptionColumns;
      table.rows =
        viewState.subStatus === 'all'
          ? subscriptions
          : subscriptions.filter((row) => row.status.toLowerCase() === viewState.subStatus);
    };
    const seg = root.querySelector('#sub-status');
    if (seg) {
      seg.options = [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Past due', value: 'past due' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Trial', value: 'trial' },
      ];
      seg.value = 'all';
      seg.addEventListener('eds-change', (event) => {
        viewState.subStatus = (event.detail?.value ?? 'all').toLowerCase();
        paint();
      });
    }
    paint();
    const list = root.querySelector('#sub-moves');
    if (list) {
      list.items = [
        { label: 'Kite Studio entered trial', description: 'Starter · 14 days', icon: 'star' },
        { label: 'Nimbus Retail past due', description: 'Scale · ACH return', icon: 'alert-triangle' },
        { label: 'Harbor & Co. renewed', description: 'Enterprise annual', icon: 'check' },
      ];
    }
  }

  if (route.name === 'customers') {
    const table = root.querySelector('#cus-table');
    const paint = (query = '') => {
      if (!table) return;
      table.columns = customerColumns;
      table.rows = customerRows().filter((row) => `${row.company} ${row.contact}`.toLowerCase().includes(query.toLowerCase()));
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

  if (route.name === 'customer') {
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

  if (route.name === 'analytics') {
    const move = root.querySelector('#rev-move');
    if (move) {
      move.items = [
        { term: 'MRR', description: '$186.4k' },
        { term: 'ARR', description: '$2.24M' },
        { term: 'New / expansion', description: '+$12.6k' },
        { term: 'Churned', description: '-$3.1k' },
        { term: 'Refunds', description: '$1.24k' },
        { term: 'Net new', description: '+$9.5k' },
      ];
      move.columns = 2;
    }
  }

  if (route.name === 'reports') {
    root.querySelectorAll('.export-csv, .export-pdf').forEach((button) => {
      button.addEventListener('eds-click', () => {
        showToast({ message: `${button.dataset.name} ${button.classList.contains('export-pdf') ? 'PDF' : 'CSV'} ready`, variant: 'success' });
      });
    });
  }

  if (route.name === 'settings') {
    const currency = root.querySelector('#currency');
    if (currency) {
      currency.options = [
        { label: 'USD', value: 'usd' },
        { label: 'EUR', value: 'eur' },
        { label: 'GBP', value: 'gbp' },
        { label: 'INR', value: 'inr' },
      ];
      currency.value = 'usd';
    }
    const terms = root.querySelector('#terms');
    if (terms) {
      terms.options = [
        { label: 'Due on receipt', value: '0' },
        { label: 'Net 15', value: '15' },
        { label: 'Net 30', value: '30' },
      ];
      terms.value = '15';
    }
    root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
      showToast({ message: 'Billing configuration saved', variant: 'success' });
    });
  }
}
