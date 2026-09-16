import { people, renewalColumns, renewals } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  renewalQuery: '',
};

export function renderRenewals() {
  const total = renewals.reduce((sum, item) => sum + item.arr, 0);
  return `
    ${pageHeader({
      eyebrow: '90 days',
      title: 'Renewals',
      lead: `${formatCurrency(total)} in the window. Fold Paper is six days out. Lattice is the only negotiate that is red.`,
      actions: `<eds-button id="renew-play" variant="primary" icon="file">90-day play</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="renew-search" placeholder="Search account or owner" clearable></eds-search>
        <eds-autocomplete id="renew-owner" label="Owner" placeholder="Poluru teammate"></eds-autocomplete>
        <eds-segmented-control id="renew-risk"></eds-segmented-control>
      `)}
      <eds-data-table id="renew-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'renew-empty',
        heading: 'No renewals match',
        description: 'Clear search or risk to see the 90-day book.',
        action: '<eds-button id="reset-renew" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${renewals
        .slice(0, 6)
        .map(
          (item) => `
        <content-card href="#/account/${item.accountId}">
          <div slot="header" class="section-title">
            <h2>${item.account}</h2>
            ${statusChip(item.risk)}
          </div>
          <p class="muted mb-2">${item.owner} · ${item.stage} · ${item.close}</p>
          <p class="hero-metric" style="font-size:1.4rem">${formatCurrency(item.arr)}</p>
          <eds-progress-bar value="${item.probability}" max="100" label="${item.probability}% win" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Hold a date',
          body: `
            <eds-date-picker id="renew-day" label="Close target"></eds-date-picker>
            <eds-time-picker class="mt-3" id="renew-time" label="Call"></eds-time-picker>
            <eds-checkbox class="mt-3" id="renew-exec" label="Include exec sponsor" checked></eds-checkbox>
            <eds-button class="mt-3" id="hold-renew" variant="primary">Hold the slot</eds-button>`,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Stages',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Commit" open>
                Harbor and Fold. Legal is in review. Rohan Poluru owns signature.
              </eds-accordion-item>
              <eds-accordion-item heading="Negotiate">
                Lattice wants a support SLA addendum before 30 Sep.
              </eds-accordion-item>
              <eds-accordion-item heading="Forecast">
                Lumen and Brightwell are on the November board pack.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateRenewals(root) {
  const table = root.querySelector('#renew-table');
  const empty = root.querySelector('#renew-empty');
  const risk = root.querySelector('#renew-risk');
  const owner = root.querySelector('#renew-owner');
  if (risk) {
    risk.options = [
      { label: 'All', value: 'all' },
      { label: 'Healthy', value: 'Healthy' },
      { label: 'Watch', value: 'Watch' },
      { label: 'At risk', value: 'At risk' },
    ];
    risk.value = 'all';
  }
  if (owner) owner.options = people.map((item) => ({ label: item.name, value: item.name }));
  const paint = () => {
    const query = viewState.renewalQuery.toLowerCase();
    const rows = renewals
      .filter((item) => `${item.account} ${item.owner}`.toLowerCase().includes(query))
      .filter((item) => (risk?.value || 'all') === 'all' || item.risk === risk.value)
      .map((item) => ({
        ...item,
        arr: formatCurrency(item.arr),
        probability: `${item.probability}%`,
      }));
    if (table) {
      table.columns = renewalColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#renew-search')?.addEventListener('eds-input', (event) => {
    viewState.renewalQuery = event.detail?.value ?? '';
    paint();
  });
  risk?.addEventListener('eds-change', paint);
  root.querySelector('#reset-renew')?.addEventListener('eds-click', () => {
    viewState.renewalQuery = '';
    if (risk) risk.value = 'all';
    paint();
  });
  root.querySelector('#renew-play')?.addEventListener('eds-click', () => document.querySelector('#play-modal')?.show());
  root.querySelector('#hold-renew')?.addEventListener('eds-click', () => {
    import('@poluru-labs/enterprise-design-system-wc').then(({ showToast }) => {
      showToast({ message: 'Renewal slot held', variant: 'success' });
    });
  });
}
