import { properties } from '../data/index.js';
import { formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';
import { statusLabel } from '../lib/status.js';

export function renderOccupancy() {
  return `
    ${pageHeader({
      eyebrow: 'Units',
      title: 'Occupancy',
      lead: `Leela Poluru’s board. Occupied, vacant, and notice across Austin, Dallas, Houston, and the coast.`,
    })}
    ${filterBar(`
      <eds-search id="oc-search" placeholder="Filter assets" clearable></eds-search>
      <eds-select id="oc-status" label="Status"></eds-select>
    `)}
    <div id="oc-table"></div>
    <eds-empty-state id="oc-empty" hidden heading="No matches" description="Try a property, city, or PM." icon="search"></eds-empty-state>
  `;
}

export function hydrateOccupancy(root) {
  const table = root.querySelector('#oc-table');
  const empty = root.querySelector('#oc-empty');
  const search = root.querySelector('#oc-search');
  const status = root.querySelector('#oc-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Leased', value: 'leased' },
      { label: 'Watch', value: 'watch' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(properties, search?.value ?? '', ['name', 'code', 'city', 'pm', 'type']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
    if (!table) return;
    if (!hits.length) {
      table.innerHTML = '';
      return;
    }
    table.innerHTML = `
      <table class="occ-table">
        <thead>
          <tr><th>Asset</th><th>Type</th><th>Units</th><th>Occupied</th><th>Vacant</th><th>Rate</th><th>PM</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.name}</td>
              <td>${statusLabel(item.type)}</td>
              <td>${item.units}</td>
              <td>${item.occupied}</td>
              <td>${item.units - item.occupied}</td>
              <td>${formatPercent(item.occupancy, 0)}</td>
              <td>${item.pm}</td>
              <td>${statusChip(item.status)}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    `;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
