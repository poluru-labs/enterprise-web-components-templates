import { accountColumns, accounts } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  accountQuery: '',
};

export function renderAccounts() {
  return `
    ${pageHeader({
      eyebrow: 'Book',
      title: 'Accounts',
      lead: 'Ten logos. Brightwell and Harbor are the strongest. Lattice needs a recovery week before 30 Sep.',
      actions: `
        <eds-split-button id="acct-split" variant="primary" icon="plus">
          New account
          <eds-menu-item slot="menu" label="New account" value="account" icon="folder"></eds-menu-item>
          <eds-menu-item slot="menu" label="Run playbook" value="play" icon="file"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-toolbar bordered class="mb-3">
      <div class="tag-row" slot="start">
        <eds-tag label="Enterprise 6" variant="brand"></eds-tag>
        <eds-tag label="Mid-market 2" variant="neutral"></eds-tag>
        <eds-tag label="SMB 2" variant="neutral"></eds-tag>
      </div>
      <eds-button id="open-filters" slot="end" variant="tertiary" icon="filter">Filters</eds-button>
    </eds-toolbar>
    <eds-card padded>
      ${filterBar(`
        <eds-search id="acct-search" placeholder="Search name or CSM" clearable></eds-search>
        <eds-select id="acct-status" label="Status"></eds-select>
        <eds-select id="acct-segment" label="Segment"></eds-select>
        <eds-date-range-picker id="acct-dates" label="Renews"></eds-date-range-picker>
      `)}
      <div id="acct-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading accounts" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="acct-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'acct-empty',
        heading: 'No accounts match',
        description: 'Clear the CSM search or status filter.',
        action: '<eds-button id="reset-accts" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="acct-page" page="1" per-page="10"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateAccounts(root) {
  const table = root.querySelector('#acct-table');
  const empty = root.querySelector('#acct-empty');
  const status = root.querySelector('#acct-status');
  const segment = root.querySelector('#acct-segment');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Healthy', value: 'Healthy' },
      { label: 'Watch', value: 'Watch' },
      { label: 'At risk', value: 'At risk' },
      { label: 'Onboarding', value: 'Onboarding' },
    ];
    status.value = 'all';
  }
  if (segment) {
    segment.options = [
      { label: 'All segments', value: 'all' },
      { label: 'Enterprise', value: 'Enterprise' },
      { label: 'Mid-market', value: 'Mid-market' },
      { label: 'SMB', value: 'SMB' },
    ];
    segment.value = 'all';
  }
  const paint = () => {
    const query = viewState.accountQuery.toLowerCase();
    const rows = accounts
      .filter((item) => `${item.name} ${item.csm}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (segment?.value || 'all') === 'all' || item.segment === segment.value)
      .map((item) => ({
        name: item.name,
        csm: item.csm,
        segment: item.segment,
        status: item.status,
        health: item.health,
        arr: formatCurrency(item.arr),
        renews: item.renews,
        id: item.id,
      }));
    if (table) {
      table.columns = accountColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#acct-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#acct-search')?.addEventListener('eds-input', (event) => {
    viewState.accountQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  segment?.addEventListener('eds-change', paint);
  root.querySelector('#reset-accts')?.addEventListener('eds-click', () => {
    viewState.accountQuery = '';
    if (status) status.value = 'all';
    if (segment) segment.value = 'all';
    paint();
  });
  root.querySelector('#acct-split')?.addEventListener('eds-click', () => document.querySelector('#account-modal')?.show());
  root.querySelector('#acct-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'play') document.querySelector('#play-modal')?.show();
    else document.querySelector('#account-modal')?.show();
  });
  root.querySelector('#open-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  table?.addEventListener('click', () => {
    window.location.hash = '#/account/ac_harbor';
  });
}
