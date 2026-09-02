import { todayISO } from '@poluru-labs/enterprise-design-system-wc';
import { paymentColumns, paymentExceptions, paymentKpis, payments } from '../data/index.js';
import { cardGrid, contentCard, filterBar, hydrateStats, pageHeader, statGrid } from '../components/widgets.js';
import { searchRecords } from '../lib/search.js';

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
    ${cardGrid(
      paymentExceptions.map(
        (item) => contentCard({
          title: item.title,
          body: `<eds-alert variant="${item.variant}" title="${item.title}" message="${item.message}"></eds-alert>`,
        }),
      ),
    )}
    ${cardGrid(
      [
        { label: 'Cards', value: '61%', hint: 'Visa, Mastercard, Amex · fastest settlement' },
        { label: 'ACH', value: '27%', hint: 'Bank of the Lake and Summit Bank returns sit here' },
        { label: 'Wire', value: '12%', hint: 'Enterprise invoices above $10k' },
        { label: 'Average ticket', value: '$2,860', hint: 'Successful captures in August' },
      ].map(
        (item) => contentCard({
          title: item.label,
          body: `<p class="ledger-amount mb-1">${item.value}</p><p class="muted mb-0">${item.hint}</p>`,
        }),
      ),
    )}
  `;
}

export function hydratePayments(root) {
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
    const query = event.detail?.value ?? '';
    if (table) table.rows = searchRecords(payments, query, ['customer', 'id', 'invoice', 'status']);
  });
}
