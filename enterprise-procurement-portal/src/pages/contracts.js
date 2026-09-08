import { contracts } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, contractGrid, pageHeader } from '../components/widgets.js';

export function renderContracts() {
  return `
    ${pageHeader({
      eyebrow: 'Legal',
      title: 'Contracts',
      lead: 'Anika Poluru holds the MSAs. Cedar’s facilities blanket is the one that actually expires this month.',
    })}
    ${filterBar(`
      <eds-search id="ct-search" placeholder="Filter contracts" clearable></eds-search>
      <eds-select id="ct-status" label="Status"></eds-select>
    `)}
    <div id="ct-grid"></div>
    <eds-empty-state id="ct-empty" hidden heading="No matches" description="Try a supplier or owner." icon="search"></eds-empty-state>
  `;
}

export function hydrateContracts(root) {
  const grid = root.querySelector('#ct-grid');
  const empty = root.querySelector('#ct-empty');
  const search = root.querySelector('#ct-search');
  const status = root.querySelector('#ct-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'In review', value: 'in_review' },
      { label: 'Expiring', value: 'expiring' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(contracts, search?.value ?? '', ['name', 'supplier', 'owner']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = hits.length ? contractGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
