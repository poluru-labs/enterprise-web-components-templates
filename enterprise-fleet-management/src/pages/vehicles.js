import { vehicles } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, vehicleGrid } from '../components/widgets.js';

export function renderVehicles() {
  return `
    ${pageHeader({
      eyebrow: 'Units',
      title: 'Vehicles',
      lead: `${vehicles.length} units on the Poluru Yards book. Filter by yard, type, or status, then open a card.`,
      actions: '<eds-button id="vehicles-add" variant="primary" icon="plus">Assign vehicle</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="vh-search" placeholder="Filter units" clearable></eds-search>
      <eds-select id="vh-status" label="Status"></eds-select>
      <eds-select id="vh-yard" label="Yard"></eds-select>
    `)}
    <div id="vh-grid"></div>
    <eds-empty-state id="vh-empty" hidden heading="No matches" description="Try another unit, driver, or yard." icon="search"></eds-empty-state>
  `;
}

export function hydrateVehicles(root) {
  const grid = root.querySelector('#vh-grid');
  const empty = root.querySelector('#vh-empty');
  const search = root.querySelector('#vh-search');
  const status = root.querySelector('#vh-status');
  const yard = root.querySelector('#vh-yard');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'On route', value: 'on_route' },
      { label: 'Assigned', value: 'assigned' },
      { label: 'Yard', value: 'yard' },
      { label: 'In shop', value: 'in_shop' },
      { label: 'Inspection due', value: 'inspection_due' },
    ];
    status.value = '';
  }
  if (yard) {
    yard.options = [
      { label: 'All yards', value: '' },
      { label: 'Austin', value: 'Austin' },
      { label: 'Dallas', value: 'Dallas' },
    ];
    yard.value = '';
  }

  const paint = () => {
    let hits = searchRecords(vehicles, search?.value ?? '', ['unit', 'make', 'type', 'driver', 'yard']);
    const statusValue = status?.value;
    const yardValue = yard?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (yardValue && yardValue !== 'All yards') hits = hits.filter((item) => item.yard === yardValue);
    if (grid) grid.innerHTML = hits.length ? vehicleGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  yard?.addEventListener('eds-change', paint);
  root.querySelector('#vehicles-add')?.addEventListener('eds-click', () => document.querySelector('#assign-modal')?.show());
}
