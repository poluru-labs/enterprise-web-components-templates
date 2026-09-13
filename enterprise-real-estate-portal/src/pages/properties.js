import { properties } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, propertyGrid } from '../components/widgets.js';

export function renderProperties() {
  return `
    ${pageHeader({
      eyebrow: 'Assets',
      title: 'Properties',
      lead: `${properties.length} assets on the Poluru Homes book. Filter by city, type, or status, then open a card.`,
      actions: '<eds-button id="prop-wo" variant="primary" icon="plus">Log request</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="pr-search" placeholder="Filter properties" clearable></eds-search>
      <eds-select id="pr-status" label="Status"></eds-select>
      <eds-select id="pr-city" label="City"></eds-select>
    `)}
    <div id="pr-grid"></div>
    <eds-empty-state id="pr-empty" hidden heading="No matches" description="Try another asset, city, or PM." icon="search"></eds-empty-state>
  `;
}

export function hydrateProperties(root) {
  const grid = root.querySelector('#pr-grid');
  const empty = root.querySelector('#pr-empty');
  const search = root.querySelector('#pr-search');
  const status = root.querySelector('#pr-status');
  const city = root.querySelector('#pr-city');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Leased', value: 'leased' },
      { label: 'Watch', value: 'watch' },
    ];
    status.value = '';
  }
  if (city) {
    city.options = [
      { label: 'All cities', value: '' },
      ...[...new Set(properties.map((item) => item.city))].map((value) => ({ label: value, value })),
    ];
    city.value = '';
  }

  const paint = () => {
    let hits = searchRecords(properties, search?.value ?? '', ['name', 'code', 'city', 'pm', 'type']);
    const statusValue = status?.value;
    const cityValue = city?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (cityValue && cityValue !== 'All cities') hits = hits.filter((item) => item.city === cityValue);
    if (grid) grid.innerHTML = hits.length ? propertyGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  city?.addEventListener('eds-change', paint);
  root.querySelector('#prop-wo')?.addEventListener('eds-click', () => document.querySelector('#wo-modal')?.show());
}
