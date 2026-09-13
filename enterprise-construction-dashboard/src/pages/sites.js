import { sites } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, siteGrid } from '../components/widgets.js';

export function renderSites() {
  return `
    ${pageHeader({
      eyebrow: 'Work',
      title: 'Job sites',
      lead: `${sites.length} jobs on the Poluru Builds book. Filter by city, phase, or status, then open a card.`,
      actions: '<eds-button id="sites-rfi" variant="primary" icon="plus">Log RFI</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="st-search" placeholder="Filter sites" clearable></eds-search>
      <eds-select id="st-status" label="Status"></eds-select>
      <eds-select id="st-city" label="City"></eds-select>
    `)}
    <div id="st-grid"></div>
    <eds-empty-state id="st-empty" hidden heading="No matches" description="Try another job, city, or PM." icon="search"></eds-empty-state>
  `;
}

export function hydrateSites(root) {
  const grid = root.querySelector('#st-grid');
  const empty = root.querySelector('#st-empty');
  const search = root.querySelector('#st-search');
  const status = root.querySelector('#st-status');
  const city = root.querySelector('#st-city');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'On track', value: 'on_track' },
      { label: 'Watch', value: 'watch' },
      { label: 'At risk', value: 'at_risk' },
    ];
    status.value = '';
  }
  if (city) {
    city.options = [
      { label: 'All cities', value: '' },
      ...[...new Set(sites.map((item) => item.city))].map((value) => ({ label: value, value })),
    ];
    city.value = '';
  }

  const paint = () => {
    let hits = searchRecords(sites, search?.value ?? '', ['name', 'code', 'city', 'pm', 'super']);
    const statusValue = status?.value;
    const cityValue = city?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (cityValue && cityValue !== 'All cities') hits = hits.filter((item) => item.city === cityValue);
    if (grid) grid.innerHTML = hits.length ? siteGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  city?.addEventListener('eds-change', paint);
  root.querySelector('#sites-rfi')?.addEventListener('eds-click', () => document.querySelector('#rfi-modal')?.show());
}
