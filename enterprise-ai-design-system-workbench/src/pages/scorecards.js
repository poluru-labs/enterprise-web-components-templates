import { scorecardColumns, scorecards } from '../data/index.js';
import { filterBar, pageHeader, sheet } from '../components/widgets.js';

export function renderScorecards() {
  return `
    ${pageHeader({
      eyebrow: 'Catalog',
      title: 'Component library',
      lead: 'Stable web components with owners, variant counts, and documentation scores.',
      actions: '<eds-button variant="primary" icon="plus">Add component</eds-button>',
    })}
    ${sheet({
      title: 'All components',
      body: `
        ${filterBar(`
          <eds-search id="audit-search" placeholder="Filter components" clearable style="min-width:14rem"></eds-search>
          <eds-select id="audit-status" label="Status" style="min-width:10rem"></eds-select>
        `)}
        <eds-data-table id="audit-table" zebra sticky-header></eds-data-table>
      `,
    })}
  `;
}

export function hydrateScorecards(root) {
  const table = root.querySelector('#audit-table');
  if (table) {
    table.columns = scorecardColumns;
    table.rows = scorecards.map((row) => ({
      ...row,
      health: `${row.health}%`,
    }));
  }
  const status = root.querySelector('#audit-status');
  if (status) {
    status.options = [
      { label: 'Any status', value: 'all' },
      { label: 'On track', value: 'on' },
      { label: 'Watch', value: 'watch' },
      { label: 'At risk', value: 'risk' },
    ];
    status.value = 'all';
  }
  const search = root.querySelector('#audit-search');
  search?.addEventListener('eds-change', (event) => {
    const query = String(event.detail?.value ?? '').toLowerCase();
    if (!table) return;
    table.rows = scorecards
      .filter((row) => `${row.name} ${row.owner} ${row.focus}`.toLowerCase().includes(query))
      .map((row) => ({ ...row, health: `${row.health}%` }));
  });
}
