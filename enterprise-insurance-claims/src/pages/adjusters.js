import { adjusters } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, adjusterGrid } from '../components/widgets.js';

export function renderAdjusters() {
  return `
    ${pageHeader({
      eyebrow: 'Bench',
      title: 'Adjusters',
      lead: `${adjusters.length} people on the Poluru Cover bench. Scores, open files, and desk or field.`,
    })}
    ${filterBar(`
      <eds-search id="adj-search" placeholder="Filter adjusters" clearable></eds-search>
      <eds-select id="adj-status" label="Status"></eds-select>
    `)}
    <div id="adj-grid"></div>
    <eds-empty-state id="adj-empty" hidden heading="No matches" description="Try a name, city, or role." icon="search"></eds-empty-state>
  `;
}

export function hydrateAdjusters(root) {
  const grid = root.querySelector('#adj-grid');
  const empty = root.querySelector('#adj-empty');
  const search = root.querySelector('#adj-search');
  const status = root.querySelector('#adj-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Field', value: 'field' },
      { label: 'Desk', value: 'desk' },
      { label: 'SIU', value: 'siu' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(adjusters, search?.value ?? '', ['name', 'role', 'city']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (grid) grid.innerHTML = hits.length ? adjusterGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
