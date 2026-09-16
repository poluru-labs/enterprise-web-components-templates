import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { people, permitColumns, permits } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  permitQuery: '',
};

export function renderPermits() {
  const review = permits.filter((item) => item.status === 'In review' || item.status === 'Pending');
  return `
    ${pageHeader({
      eyebrow: 'Review clock',
      title: 'Permits',
      lead: `${review.length} in the clock. Harbor garage is day 11. Riverfest hearing is 24 Sep.`,
      actions: `<eds-button id="pm-inspect" variant="primary" icon="check">Schedule inspection</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="pm-search" placeholder="Search site or type" clearable></eds-search>
        <eds-autocomplete id="pm-inspector" label="Inspector" placeholder="Poluru teammate"></eds-autocomplete>
        <eds-segmented-control id="pm-status"></eds-segmented-control>
      `)}
      <eds-data-table id="pm-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'pm-empty',
        heading: 'No permits match',
        description: 'Clear search or status to see the clock.',
        action: '<eds-button id="reset-pm" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${permits
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.code}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.type} · ${item.site}</p>
          <p class="hero-metric" style="font-size:1.4rem">${formatCurrency(item.fee)}</p>
          <p class="muted mb-0">${item.inspector} · ${item.sla} · ${item.applicant}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Hold an inspection',
          body: `
            <eds-date-picker id="pm-day" label="Inspect on"></eds-date-picker>
            <eds-time-picker class="mt-3" id="pm-time" label="Window"></eds-time-picker>
            <eds-checkbox class="mt-3" id="pm-same" label="Same-week slot" checked></eds-checkbox>
            <eds-button class="mt-3" id="hold-pm" variant="primary">Hold the slot</eds-button>`,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Clock',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="In review" open>
                Harbor garage, film waterfront, and Harbor Inn sign. Kavya Poluru owns the 10-day clock.
              </eds-accordion-item>
              <eds-accordion-item heading="Hearings">
                Riverfest is 24 Sep. Film is 18 Sep.
              </eds-accordion-item>
              <eds-accordion-item heading="Issued">
                Community pool and the Oak Street fiber trench are in the field.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
    </section>
  `;
}

export function hydratePermits(root) {
  const table = root.querySelector('#pm-table');
  const empty = root.querySelector('#pm-empty');
  const status = root.querySelector('#pm-status');
  const inspector = root.querySelector('#pm-inspector');
  if (status) {
    status.options = [
      { label: 'All', value: 'all' },
      { label: 'In review', value: 'In review' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Issued', value: 'Issued' },
    ];
    status.value = 'all';
  }
  if (inspector) inspector.options = people.map((item) => ({ label: item.name, value: item.name }));
  const paint = () => {
    const query = viewState.permitQuery.toLowerCase();
    const rows = permits
      .filter((item) => `${item.site} ${item.type} ${item.code} ${item.applicant}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        ...item,
        fee: formatCurrency(item.fee),
      }));
    if (table) {
      table.columns = permitColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#pm-search')?.addEventListener('eds-input', (event) => {
    viewState.permitQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-pm')?.addEventListener('eds-click', () => {
    viewState.permitQuery = '';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#pm-inspect')?.addEventListener('eds-click', () => {
    showToast({ message: 'Inspection window opened', variant: 'info' });
  });
  root.querySelector('#hold-pm')?.addEventListener('eds-click', () => {
    showToast({ message: 'Inspection slot held', variant: 'success' });
  });
}
