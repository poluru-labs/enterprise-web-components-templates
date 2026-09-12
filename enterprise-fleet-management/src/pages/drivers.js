import { drivers } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { driverGrid, filterBar, pageHeader } from '../components/widgets.js';

export function renderDrivers() {
  return `
    ${pageHeader({
      eyebrow: 'People',
      title: 'Drivers',
      lead: `${drivers.length} drivers on the Poluru Yards roster. Assignments, hours, and license class.`,
      actions: '<eds-button id="drv-assign" variant="primary" icon="plus">Assign vehicle</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="drv-search" placeholder="Filter drivers" clearable></eds-search>
      <eds-select id="drv-status" label="Status"></eds-select>
      <eds-select id="drv-yard" label="Yard"></eds-select>
    `)}
    <div id="drv-grid"></div>
    <eds-empty-state id="drv-empty" hidden heading="No matches" description="Try a name, yard, or license." icon="search"></eds-empty-state>
  `;
}

export function hydrateDrivers(root) {
  const grid = root.querySelector('#drv-grid');
  const empty = root.querySelector('#drv-empty');
  const search = root.querySelector('#drv-search');
  const status = root.querySelector('#drv-status');
  const yard = root.querySelector('#drv-yard');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'On route', value: 'on_route' },
      { label: 'Assigned', value: 'assigned' },
      { label: 'Idle', value: 'idle' },
      { label: 'Off duty', value: 'off_duty' },
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
    let hits = searchRecords(drivers, search?.value ?? '', ['name', 'vehicle', 'license', 'yard']);
    const statusValue = status?.value;
    const yardValue = yard?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (yardValue && yardValue !== 'All yards') hits = hits.filter((item) => item.yard === yardValue);
    if (grid) grid.innerHTML = hits.length ? driverGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  yard?.addEventListener('eds-change', paint);
  root.querySelector('#drv-assign')?.addEventListener('eds-click', () => document.querySelector('#assign-modal')?.show());
}
