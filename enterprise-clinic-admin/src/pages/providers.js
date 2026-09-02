import { providerColumns, providers } from '../data/index.js';
import { cardGrid, pageHeader, statusChip } from '../components/widgets.js';

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Care team',
      title: 'Providers',
      lead: 'Who is on the floor, which rooms they own, and how full their day is.',
    })}
    ${cardGrid(
      providers.map(
        (item) => `
        <halo-content-card stretch class="halo-provider-card">
          <div class="halo-provider-top">
            <eds-avatar name="${item.name}" size="md"></eds-avatar>
            <div>
              <h2>${item.name}</h2>
              <p class="halo-muted mb-0">${item.role}</p>
            </div>
            ${statusChip(item.status)}
          </div>
          <dl class="halo-fact-row">
            <div><dt>Panel</dt><dd>${item.panel}</dd></div>
            <div><dt>Today</dt><dd>${item.today} visits</dd></div>
            <div><dt>Rooms</dt><dd>${item.rooms}</dd></div>
          </dl>
          <p class="halo-muted mb-0">Next · ${item.next}</p>
        </halo-content-card>`,
      ),
      'col-md-6 col-xl-4',
    )}
    <halo-content-card class="mt-3">
      <eds-data-table id="prv-table" sortable striped compact></eds-data-table>
    </halo-content-card>
  `;
}

export function hydrate(root) {
  const table = root.querySelector('#prv-table');
  if (table) {
    table.columns = providerColumns;
    table.rows = providers;
  }
}
