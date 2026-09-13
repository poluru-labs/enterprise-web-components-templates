import { subcontractors } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, subGrid } from '../components/widgets.js';

export function renderSubs() {
  return `
    ${pageHeader({
      eyebrow: 'Trades',
      title: 'Subcontractors',
      lead: `${subcontractors.length} firms on the Poluru Builds buyout. Scores, trades, and job assignments.`,
    })}
    ${filterBar(`
      <eds-search id="sub-search" placeholder="Filter trades" clearable></eds-search>
      <eds-select id="sub-status" label="Status"></eds-select>
    `)}
    <div id="sub-grid"></div>
    <eds-empty-state id="sub-empty" hidden heading="No matches" description="Try a firm, trade, or job." icon="search"></eds-empty-state>
  `;
}

export function hydrateSubs(root) {
  const grid = root.querySelector('#sub-grid');
  const empty = root.querySelector('#sub-empty');
  const search = root.querySelector('#sub-search');
  const status = root.querySelector('#sub-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'Watch', value: 'watch' },
      { label: 'Punch', value: 'punch' },
      { label: 'Mobilizing', value: 'mobilizing' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(subcontractors, search?.value ?? '', ['name', 'trade', 'site', 'contact']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (grid) grid.innerHTML = hits.length ? subGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
