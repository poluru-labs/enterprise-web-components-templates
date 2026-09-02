import { todayISO, showToast } from '@poluru-labs/enterprise-design-system-wc';
import { invoiceColumns, invoices } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';
import { searchRecords } from '../lib/search.js';

export const invoiceViewState = {
  invoiceQuery: '',
  invoiceStatus: 'all',
};

function filteredInvoices() {
  const byStatus =
    invoiceViewState.invoiceStatus === 'all'
      ? invoices
      : invoices.filter((row) => row.status.toLowerCase() === invoiceViewState.invoiceStatus);
  return searchRecords(byStatus, invoiceViewState.invoiceQuery, ['id', 'customer', 'status']);
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

export function hydrateInvoices(root) {
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
    if (count) count.textContent = `${rows.length} invoices · click a row for preview`;
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
    seg.value = invoiceViewState.invoiceStatus;
    seg.addEventListener('eds-change', (event) => {
      invoiceViewState.invoiceStatus = (event.detail?.value ?? event.target.value).toLowerCase();
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
    invoiceViewState.invoiceQuery = event.detail?.value ?? event.target.value ?? '';
    paint();
  });
  root.querySelector('#reset-invoices')?.addEventListener('eds-click', () => {
    invoiceViewState.invoiceQuery = '';
    invoiceViewState.invoiceStatus = 'all';
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
