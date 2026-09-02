import { people } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, personGrid } from '../components/widgets.js';

export function renderPeople() {
  return `
    ${pageHeader({
      eyebrow: 'Directory',
      title: 'People',
      lead: `${people.length} teammates across Poluru People. Filter by name, title, or department.`,
      actions: '<eds-button id="people-add" variant="primary" icon="plus">Add employee</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="people-search" placeholder="Filter directory" clearable></eds-search>
      <eds-select id="people-dept" label="Department"></eds-select>
      <eds-select id="people-status" label="Status"></eds-select>
    `)}
    <div id="people-grid"></div>
    <eds-empty-state id="people-empty" hidden heading="No matches" description="Try another name or department." icon="search"></eds-empty-state>
  `;
}

export function hydratePeople(root) {
  const grid = root.querySelector('#people-grid');
  const empty = root.querySelector('#people-empty');
  const search = root.querySelector('#people-search');
  const dept = root.querySelector('#people-dept');
  const status = root.querySelector('#people-status');

  if (dept) {
    dept.options = [
      { label: 'All departments', value: '' },
      ...[...new Set(people.map((p) => p.department))].map((d) => ({ label: d, value: d })),
    ];
  }
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'On leave', value: 'on_leave' },
    ];
  }

  const paint = () => {
    const query = search?.value ?? '';
    let hits = searchRecords(people, query, ['name', 'title', 'department', 'location', 'email']);
    const deptVal = dept?.value;
    const statusVal = status?.value;
    if (deptVal) hits = hits.filter((p) => p.department === deptVal);
    if (statusVal) hits = hits.filter((p) => p.status === statusVal);
    if (grid) grid.innerHTML = hits.length ? personGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  dept?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#people-add')?.addEventListener('eds-click', () => document.querySelector('#employee-modal')?.show());
}
