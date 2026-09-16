import { travelerColumns, travelers } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  travelerQuery: '',
};

export function renderTravelers() {
  return `
    ${pageHeader({
      eyebrow: 'People',
      title: 'Travelers',
      lead: 'Twelve Poluru teammates on the roster. Two are live. Luca’s unused UA coupon expires 4 Oct.',
      actions: `<eds-button id="traveler-add" variant="primary" icon="plus">Add traveler</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="tv-search" placeholder="Search name or role" clearable></eds-search>
        <eds-select id="tv-region" label="Region"></eds-select>
        <eds-select id="tv-status" label="Status"></eds-select>
      `)}
      <eds-data-table id="tv-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'tv-empty',
        heading: 'No travelers match',
        description: 'Clear region or status to see the full roster.',
        action: '<eds-button id="reset-tv" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid cols-2 mt-3">
      ${travelers
        .slice(1, 9)
        .map(
          (person) => `
        <content-card>
          <div class="person-card">
            <eds-avatar name="${person.name}" size="md"></eds-avatar>
            <div>
              <strong>${person.name}</strong>
              <p class="muted mb-1">${person.role} · ${person.region}</p>
              ${statusChip(person.status)}
            </div>
          </div>
          <p class="muted mt-3 mb-1">${person.passport} · ${person.policy}</p>
          <eds-progress-bar value="${person.risk === 'Elevated' ? 38 : person.risk === 'Watch' ? 64 : 90}" max="100" label="${person.risk}" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Passports',
        body: `
          <eds-accordion>
            <eds-accordion-item heading="Expiring" open>
              Luca Poluru US passport expires 2026. Desk will reissue before the next long-haul.
            </eds-accordion-item>
            <eds-accordion-item heading="Restricted">
              Hana Poluru is on the restricted-country list until the Lagos brief closes.
            </eds-accordion-item>
            <eds-accordion-item heading="Exec">
              Mira, Arjun, Priya, and Rohan sit on the exec cabin rule for flights over eight hours.
            </eds-accordion-item>
          </eds-accordion>`,
      })}
    </section>
  `;
}

export function hydrateTravelers(root) {
  const table = root.querySelector('#tv-table');
  const empty = root.querySelector('#tv-empty');
  const region = root.querySelector('#tv-region');
  const status = root.querySelector('#tv-status');
  if (region) {
    region.options = [
      { label: 'All regions', value: 'all' },
      { label: 'Americas', value: 'Americas' },
      { label: 'EMEA', value: 'EMEA' },
      { label: 'APAC', value: 'APAC' },
    ];
    region.value = 'all';
  }
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'In trip', value: 'In trip' },
      { label: 'Booked', value: 'Booked' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Home', value: 'Home' },
    ];
    status.value = 'all';
  }
  const paint = () => {
    const query = viewState.travelerQuery.toLowerCase();
    const rows = travelers
      .filter((item) => `${item.name} ${item.role}`.toLowerCase().includes(query))
      .filter((item) => (region?.value || 'all') === 'all' || item.region === region.value)
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        ...item,
        spend: formatCurrency(item.spend),
      }));
    if (table) {
      table.columns = travelerColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#tv-search')?.addEventListener('eds-input', (event) => {
    viewState.travelerQuery = event.detail?.value ?? '';
    paint();
  });
  region?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-tv')?.addEventListener('eds-click', () => {
    viewState.travelerQuery = '';
    if (region) region.value = 'all';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#traveler-add')?.addEventListener('eds-click', () => document.querySelector('#trip-modal')?.show());
}
