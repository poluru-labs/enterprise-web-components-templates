import { evidence } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { evidenceGrid, filterBar, pageHeader } from '../components/widgets.js';

export function renderEvidence() {
  return `
    ${pageHeader({
      eyebrow: 'Locker',
      title: 'Evidence',
      lead: 'Leela Poluru files the packs. Privileged-access exceptions are the stale item Alder will ask about first.',
    })}
    ${filterBar(`
      <eds-search id="ev-search" placeholder="Filter evidence" clearable></eds-search>
      <eds-select id="ev-status" label="Status"></eds-select>
    `)}
    <div id="ev-grid"></div>
    <eds-empty-state id="ev-empty" hidden heading="No matches" description="Try a control code or owner." icon="search"></eds-empty-state>
  `;
}

export function hydrateEvidence(root) {
  const grid = root.querySelector('#ev-grid');
  const empty = root.querySelector('#ev-empty');
  const search = root.querySelector('#ev-search');
  const status = root.querySelector('#ev-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Current', value: 'current' },
      { label: 'In review', value: 'in_review' },
      { label: 'Watch', value: 'watch' },
      { label: 'Gap', value: 'gap' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(evidence, search?.value ?? '', ['name', 'control', 'owner', 'type']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = hits.length ? evidenceGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
