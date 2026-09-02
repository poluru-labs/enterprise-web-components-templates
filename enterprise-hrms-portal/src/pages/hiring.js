import { openReqs, openRolesCount, reqs } from '../data/index.js';
import { formatDate } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, reqGrid } from '../components/widgets.js';

export function renderHiring() {
  return `
    ${pageHeader({
      eyebrow: 'Pipeline',
      title: 'Hiring',
      lead: `${openReqs().length} open reqs · ${openRolesCount()} roles · time-to-hire 34 days.`,
      actions: '<eds-button id="new-req" variant="primary" icon="plus">New req</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="hiring-search" placeholder="Filter requisitions" clearable></eds-search>
      <eds-select id="hiring-dept" label="Department"></eds-select>
    `)}
    <div id="hiring-grid"></div>
    <eds-empty-state id="hiring-empty" hidden heading="No reqs match" description="Try another title or department." icon="search"></eds-empty-state>
    <section class="mt-3">
      <eds-card padded>
        <h2>Pipeline summary</h2>
        <eds-data-table id="hiring-table" compact striped class="mt-2"></eds-data-table>
      </eds-card>
    </section>
  `;
}

export function hydrateHiring(root) {
  const grid = root.querySelector('#hiring-grid');
  const empty = root.querySelector('#hiring-empty');
  const search = root.querySelector('#hiring-search');
  const dept = root.querySelector('#hiring-dept');

  if (dept) {
    dept.options = [
      { label: 'All departments', value: '' },
      ...[...new Set(reqs.map((r) => r.department))].map((d) => ({ label: d, value: d })),
    ];
  }

  const paint = () => {
    const query = search?.value ?? '';
    let hits = searchRecords(reqs, query, ['title', 'department', 'location', 'hiringManager', 'recruiter']);
    const deptVal = dept?.value;
    if (deptVal) hits = hits.filter((r) => r.department === deptVal);
    if (grid) grid.innerHTML = hits.length ? reqGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  dept?.addEventListener('eds-change', paint);

  const table = root.querySelector('#hiring-table');
  if (table) {
    table.columns = [
      { key: 'title', label: 'Role' },
      { key: 'department', label: 'Department' },
      { key: 'openings', label: 'Openings' },
      { key: 'status', label: 'Status' },
      { key: 'posted', label: 'Posted' },
      { key: 'manager', label: 'Hiring manager' },
    ];
    table.rows = reqs.map((req) => ({
      title: req.title,
      department: req.department,
      openings: req.openings,
      status: req.status,
      posted: formatDate(req.posted),
      manager: req.hiringManager,
    }));
  }

  root.querySelector('#new-req')?.addEventListener('eds-click', () => {
    window.location.hash = '#/settings';
  });
}
