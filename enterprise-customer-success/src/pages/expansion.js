import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { expansion, expansionColumns } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  expandQuery: '',
};

export function renderExpansion() {
  const total = expansion.reduce((sum, item) => sum + item.amount, 0);
  return `
    ${pageHeader({
      eyebrow: 'Attach',
      title: 'Expansion',
      lead: `${formatCurrency(total)} open. Brightwell seats are in commit. Lumen module and Harbor APAC are next.`,
      actions: `<eds-button id="expand-add" variant="primary" icon="plus">New opportunity</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="expand-search" placeholder="Search account or type" clearable></eds-search>
        <eds-select id="expand-type" label="Type"></eds-select>
        <eds-select id="expand-stage" label="Stage"></eds-select>
      `)}
      <eds-data-table id="expand-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'expand-empty',
        heading: 'No opportunities match',
        description: 'Clear type or stage to see the full pipeline.',
        action: '<eds-button id="reset-expand" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${expansion
        .map(
          (item) => `
        <content-card href="#/account/${item.accountId}">
          <div slot="header" class="section-title">
            <h2>${item.account}</h2>
            ${statusChip(item.stage)}
          </div>
          <div class="tag-row mb-2">
            <eds-tag label="${item.type}" variant="brand"></eds-tag>
            <eds-tag label="${item.owner}" variant="neutral"></eds-tag>
          </div>
          <p class="hero-metric" style="font-size:1.4rem">${formatCurrency(item.amount)}</p>
          <p class="muted mb-0">${item.note}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Why these deals',
        body: `
          <eds-accordion>
            <eds-accordion-item heading="Seat attach" open>
              Brightwell and Northline are above 85% utilization. Nikhil Poluru runs the seat play.
            </eds-accordion-item>
            <eds-accordion-item heading="Module">
              Lumen wants analytics for EMEA plants. Rivermark wants SSO plus audit.
            </eds-accordion-item>
            <eds-accordion-item heading="Region">
              Harbor asked for a Singapore workspace after the APAC desk stood up.
            </eds-accordion-item>
          </eds-accordion>`,
      })}
    </section>
  `;
}

export function hydrateExpansion(root) {
  const table = root.querySelector('#expand-table');
  const empty = root.querySelector('#expand-empty');
  const type = root.querySelector('#expand-type');
  const stage = root.querySelector('#expand-stage');
  if (type) {
    type.options = [
      { label: 'All types', value: 'all' },
      { label: 'Seats', value: 'Seats' },
      { label: 'Module', value: 'Module' },
      { label: 'Region', value: 'Region' },
      { label: 'Multi-year', value: 'Multi-year' },
    ];
    type.value = 'all';
  }
  if (stage) {
    stage.options = [
      { label: 'All stages', value: 'all' },
      { label: 'Discover', value: 'Discover' },
      { label: 'Qualify', value: 'Qualify' },
      { label: 'Propose', value: 'Propose' },
      { label: 'Commit', value: 'Commit' },
    ];
    stage.value = 'all';
  }
  const paint = () => {
    const query = viewState.expandQuery.toLowerCase();
    const rows = expansion
      .filter((item) => `${item.account} ${item.type} ${item.owner}`.toLowerCase().includes(query))
      .filter((item) => (type?.value || 'all') === 'all' || item.type === type.value)
      .filter((item) => (stage?.value || 'all') === 'all' || item.stage === stage.value)
      .map((item) => ({
        ...item,
        amount: formatCurrency(item.amount),
      }));
    if (table) {
      table.columns = expansionColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#expand-search')?.addEventListener('eds-input', (event) => {
    viewState.expandQuery = event.detail?.value ?? '';
    paint();
  });
  type?.addEventListener('eds-change', paint);
  stage?.addEventListener('eds-change', paint);
  root.querySelector('#reset-expand')?.addEventListener('eds-click', () => {
    viewState.expandQuery = '';
    if (type) type.value = 'all';
    if (stage) stage.value = 'all';
    paint();
  });
  root.querySelector('#expand-add')?.addEventListener('eds-click', () => {
    showToast({ message: 'Open an account to log expansion', variant: 'info' });
    window.location.hash = '#/accounts';
  });
}
