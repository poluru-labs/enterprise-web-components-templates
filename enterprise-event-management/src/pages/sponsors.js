import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { people, sponsorColumns, sponsors } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  sponsorQuery: '',
};

export function renderSponsors() {
  const live = sponsors.filter((item) => item.status === 'Live' || item.status === 'Confirmed');
  return `
    ${pageHeader({
      eyebrow: 'Book',
      title: 'Sponsors',
      lead: `${formatCurrency(186000)} on the book. Harbor and Brightwell lead the foyer. ${live.length} logos live or confirmed.`,
      actions: `<eds-button id="spn-add" variant="primary" icon="plus">Add logo</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="spn-search" placeholder="Search sponsor or owner" clearable></eds-search>
        <eds-autocomplete id="spn-owner" label="Owner" placeholder="Poluru teammate"></eds-autocomplete>
        <eds-segmented-control id="spn-status"></eds-segmented-control>
      `)}
      <eds-data-table id="spn-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'spn-empty',
        heading: 'No sponsors match',
        description: 'Clear search or status to see the book.',
        action: '<eds-button id="reset-spn" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${sponsors
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.name}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.tier} · ${item.event}</p>
          <p class="hero-metric" style="font-size:1.4rem">${formatCurrency(item.amount)}</p>
          <p class="muted mb-0">${item.owner} · booth ${item.booth}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Booth live',
          body: `
            <eds-date-picker id="spn-day" label="Go live"></eds-date-picker>
            <eds-time-picker class="mt-3" id="spn-time" label="Doors minus"></eds-time-picker>
            <eds-checkbox class="mt-3" id="spn-foyer" label="Foyer A kit" checked></eds-checkbox>
            <eds-button class="mt-3" id="hold-spn" variant="primary">Hold the kit</eds-button>`,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Tiers',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Title" open>
                Harbor & Co. and Brightwell Bank own the foyer.
              </eds-accordion-item>
              <eds-accordion-item heading="Gold">
                Lumen Forge, Alder Health, and Lattice Energy.
              </eds-accordion-item>
              <eds-accordion-item heading="Community">
                Fold Paper, Fieldwork Studio, and Pine & Copper.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateSponsors(root) {
  const table = root.querySelector('#spn-table');
  const empty = root.querySelector('#spn-empty');
  const status = root.querySelector('#spn-status');
  const owner = root.querySelector('#spn-owner');
  if (status) {
    status.options = [
      { label: 'All', value: 'all' },
      { label: 'Live', value: 'Live' },
      { label: 'Confirmed', value: 'Confirmed' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Watch', value: 'Watch' },
    ];
    status.value = 'all';
  }
  if (owner) owner.options = people.map((item) => ({ label: item.name, value: item.name }));
  const paint = () => {
    const query = viewState.sponsorQuery.toLowerCase();
    const rows = sponsors
      .filter((item) => `${item.name} ${item.owner} ${item.tier} ${item.event}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        ...item,
        amount: formatCurrency(item.amount),
      }));
    if (table) {
      table.columns = sponsorColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#spn-search')?.addEventListener('eds-input', (event) => {
    viewState.sponsorQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-spn')?.addEventListener('eds-click', () => {
    viewState.sponsorQuery = '';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#spn-add')?.addEventListener('eds-click', () => {
    showToast({ message: 'Sponsor kit opened', variant: 'info' });
  });
  root.querySelector('#hold-spn')?.addEventListener('eds-click', () => {
    showToast({ message: 'Booth kit held', variant: 'success' });
  });
}
