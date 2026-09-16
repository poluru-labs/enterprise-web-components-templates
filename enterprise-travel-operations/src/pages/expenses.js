import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { expenseColumns, expenses, spendDrivers, unusedTickets } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  expenseQuery: '',
};

export function renderExpenses() {
  const posted = expenses.reduce((sum, item) => sum + item.amount, 0);
  const unused = unusedTickets.reduce((sum, item) => sum + item.value, 0);
  return `
    ${pageHeader({
      eyebrow: 'Spend',
      title: 'Expenses',
      lead: `${formatCurrency(posted)} on the open book. ${formatCurrency(unused)} in unused tickets. Luca’s UA coupon expires 4 Oct.`,
      actions: `<eds-button id="exp-add" variant="primary" icon="plus">Add receipt</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="exp-search" placeholder="Search traveler or category" clearable></eds-search>
        <eds-select id="exp-cat" label="Category"></eds-select>
        <eds-select id="exp-status" label="Status"></eds-select>
      `)}
      <eds-data-table id="exp-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'exp-empty',
        heading: 'No expenses match',
        description: 'Clear category or status to see the full book.',
        action: '<eds-button id="reset-exp" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <section class="row g-3 mt-3 stretch">
      <div class="col-lg-7">
        ${sheet({
          title: 'Category vs plan',
          body: '<eds-data-table id="driver-table" sortable striped></eds-data-table>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Unused tickets',
          action: `<eds-badge label="${formatCurrency(unused)}" variant="brand" pill></eds-badge>`,
          body: unusedTickets
            .map(
              (item) => `
            <div class="section-title mb-2">
              <div>
                <strong>${item.traveler}</strong>
                <p class="muted mb-0">${item.coupon} · expires ${item.expires}</p>
              </div>
              ${statusChip(item.expires.includes('Oct') ? 'Watch' : 'Cleared')}
            </div>`,
            )
            .join(''),
        })}
      </div>
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'Receipts',
        body: `
          <eds-file-upload label="Upload a receipt" accept=".pdf,.png,.jpg,.csv" hint="Used for meals, hotels, and unused ticket recovery."></eds-file-upload>
          <eds-list class="mt-3" id="exp-list" divided></eds-list>`,
      })}
    </section>
  `;
}

export function hydrateExpenses(root) {
  const table = root.querySelector('#exp-table');
  const empty = root.querySelector('#exp-empty');
  const cat = root.querySelector('#exp-cat');
  const status = root.querySelector('#exp-status');
  if (cat) {
    cat.options = [
      { label: 'All categories', value: 'all' },
      { label: 'Air', value: 'Air' },
      { label: 'Hotel', value: 'Hotel' },
      { label: 'Meals', value: 'Meals' },
    ];
    cat.value = 'all';
  }
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Posted', value: 'Posted' },
      { label: 'Submitted', value: 'Submitted' },
      { label: 'Held', value: 'Held' },
      { label: 'Reimbursed', value: 'Reimbursed' },
    ];
    status.value = 'all';
  }
  const paint = () => {
    const query = viewState.expenseQuery.toLowerCase();
    const rows = expenses
      .filter((item) => `${item.traveler} ${item.category}`.toLowerCase().includes(query))
      .filter((item) => (cat?.value || 'all') === 'all' || item.category === cat.value)
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        ...item,
        amount: formatCurrency(item.amount),
      }));
    if (table) {
      table.columns = expenseColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  const drivers = root.querySelector('#driver-table');
  if (drivers) {
    drivers.columns = [
      { key: 'metric', label: 'Category', sortable: true },
      { key: 'actual', label: 'Actual' },
      { key: 'target', label: 'Target' },
      { key: 'variance', label: 'Variance' },
      { key: 'status', label: 'Status' },
    ];
    drivers.rows = spendDrivers;
  }
  const list = root.querySelector('#exp-list');
  if (list) {
    list.items = expenses.slice(0, 5).map((item) => ({
      label: `${item.traveler} · ${item.category}`,
      description: `${formatCurrency(item.amount)} · ${item.status}`,
      icon: 'file',
    }));
  }
  root.querySelector('#exp-search')?.addEventListener('eds-input', (event) => {
    viewState.expenseQuery = event.detail?.value ?? '';
    paint();
  });
  cat?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-exp')?.addEventListener('eds-click', () => {
    viewState.expenseQuery = '';
    if (cat) cat.value = 'all';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#exp-add')?.addEventListener('eds-click', () => {
    showToast({ message: 'Open a trip to attach a receipt', variant: 'info' });
    window.location.hash = '#/trips';
  });
}
