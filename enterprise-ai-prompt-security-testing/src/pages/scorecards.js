import { scorecardColumns, scorecards } from '../data/index.js';
import { filterBar, pageHeader, sheet } from '../components/widgets.js';

export function renderScorecards() {
  return `
    ${pageHeader({
      eyebrow: 'Catalog',
      title: 'Registered surfaces',
      lead: 'APIs, forms, and webhooks with owners, probe counts, and pass scores.',
      actions: '<eds-button variant="primary" icon="plus">Register surface</eds-button>',
    })}
    ${sheet({
      title: 'All surfaces',
      body: `
        ${filterBar(`
          <eds-search id="audit-search" placeholder="Filter surfaces" clearable style="min-width:14rem"></eds-search>
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
      kpis: row.kpis.toLocaleString(),
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
      .map((row) => ({ ...row, health: `${row.health}%`, kpis: row.kpis.toLocaleString() }));
  });
}
