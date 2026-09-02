import {
  scorecardColumns,
  scorecards,
} from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';

export const viewState = {
  scorecardQuery: '',
};

export function renderScorecards() {
  return `
    ${pageHeader({
      eyebrow: 'Portfolio',
      title: 'Scorecards',
      lead: 'Eight operating scorecards. Finance and Customer are green. Operations needs a recovery week.',
      actions: `
        <eds-split-button id="card-split" variant="primary" icon="plus">
          New scorecard
          <eds-menu-item slot="menu" label="New scorecard" value="card" icon="star"></eds-menu-item>
          <eds-menu-item slot="menu" label="New alert" value="alert" icon="bell"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="card-search" placeholder="Search name or owner" clearable></eds-search>
        <eds-select id="card-status" label="Status"></eds-select>
        <eds-date-range-picker id="card-dates" label="Updated"></eds-date-range-picker>
      `)}
      <div id="card-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading scorecards" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="card-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'card-empty',
        heading: 'No scorecards match',
        description: 'Clear the owner search or status filter.',
        action: '<eds-button id="reset-cards" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="card-page" page="1" per-page="8"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateScorecards(root) {
  const table = root.querySelector('#card-table');
  const empty = root.querySelector('#card-empty');
  const status = root.querySelector('#card-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'On track', value: 'On track' },
      { label: 'Watch', value: 'Watch' },
      { label: 'At risk', value: 'At risk' },
    ];
    status.value = 'all';
  }
  const paint = () => {
    const query = viewState.scorecardQuery.toLowerCase();
    const rows = scorecards
      .filter((item) => `${item.name} ${item.owner}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        name: item.name,
        owner: item.owner,
        status: item.status,
        health: `${item.health}%`,
        kpis: item.kpis,
        updated: item.updated,
        id: item.id,
      }));
    if (table) {
      table.columns = scorecardColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#card-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#card-search')?.addEventListener('eds-input', (event) => {
    viewState.scorecardQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-cards')?.addEventListener('eds-click', () => {
    viewState.scorecardQuery = '';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#card-split')?.addEventListener('eds-click', () => document.querySelector('#scorecard-modal')?.show());
  root.querySelector('#card-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'alert') document.querySelector('#alert-modal')?.show();
    else document.querySelector('#scorecard-modal')?.show();
  });
  table?.addEventListener('click', () => {
    window.location.hash = '#/scorecard/sc_finance';
  });
}
