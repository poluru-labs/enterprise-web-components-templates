import { claims } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, claimGrid } from '../components/widgets.js';

export function renderClaims() {
  return `
    ${pageHeader({
      eyebrow: 'Intake',
      title: 'Claims',
      lead: `${claims.length} files on the Poluru Cover book. Filter by city, line, or status, then open a card.`,
      actions: '<eds-button id="cl-add" variant="primary" icon="plus">Log claim</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="cl-search" placeholder="Filter claims" clearable></eds-search>
      <eds-select id="cl-status" label="Status"></eds-select>
      <eds-select id="cl-city" label="City"></eds-select>
    `)}
    <div id="cl-grid"></div>
    <eds-empty-state id="cl-empty" hidden heading="No matches" description="Try a claim, city, or adjuster." icon="search"></eds-empty-state>
  `;
}

export function hydrateClaims(root) {
  const grid = root.querySelector('#cl-grid');
  const empty = root.querySelector('#cl-empty');
  const search = root.querySelector('#cl-search');
  const status = root.querySelector('#cl-status');
  const city = root.querySelector('#cl-city');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'SIU', value: 'siu' },
      { label: 'Watch', value: 'watch' },
      { label: 'Ready', value: 'ready' },
    ];
    status.value = '';
  }
  if (city) {
    city.options = [
      { label: 'All cities', value: '' },
      ...[...new Set(claims.map((item) => item.city))].map((value) => ({ label: value, value })),
    ];
    city.value = '';
  }

  const paint = () => {
    let hits = searchRecords(claims, search?.value ?? '', ['code', 'title', 'city', 'adjuster', 'insured', 'line']);
    const statusValue = status?.value;
    const cityValue = city?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (cityValue && cityValue !== 'All cities') hits = hits.filter((item) => item.city === cityValue);
    if (grid) grid.innerHTML = hits.length ? claimGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  city?.addEventListener('eds-change', paint);
  root.querySelector('#cl-add')?.addEventListener('eds-click', () => document.querySelector('#claim-modal')?.show());
}
