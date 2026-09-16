import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { cadence, currentUser, kpis, spendTrend, trips, workspace } from '../data/index.js';
import { cadenceList, hydrateStats, pageHeader, sheet, sparkline, statGrid, tripGrid, tripMix } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Board pulse',
      lead: `Good morning, ${currentUser.name.split(' ')[0]}. Two travelers are live. Hana Poluru is in Lagos on an elevated brief. Four approvals sit in queue, two past SLA.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-trip" variant="primary" icon="plus">New trip</eds-button>
        <eds-button id="qa-policy" variant="secondary" icon="file">Exception</eds-button>
      `,
    })}
    <eds-alert id="risk-alert" variant="warning" dismissible title="Hana Poluru is in Lagos" message="Elevated duty of care. Last check-in 06:40 CDT. Movement only with the armored transfer. Nikhil Poluru owns the brief."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'MTD spend',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(spendTrend, 'Trailing twelve months of travel spend')}
            <p class="muted mb-0 mt-2">${formatCurrency(184000)} year to date against a ${formatCurrency(200000)} plan. Air is the bulk. Unused tickets sit at ${formatCurrency(12400)}.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Duty of care',
          action: '<eds-status label="Live" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="checkin-ring" value="96" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-meter value="96" min="0" max="100" low="80" high="90" optimum="95" label="Check-in rate" show-value></eds-meter>
              <p class="muted mb-0">Hana and Kavya both pinged this morning. Paris and Mumbai sit on watch.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Live and next</h2>
        <eds-link href="#/trips" variant="subtle">All</eds-link>
      </div>
      ${tripGrid(trips.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/approvals" variant="subtle">Approvals</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Open book',
          action: '<eds-link href="#/trips" variant="subtle">Trips</eds-link>',
          body: '<eds-data-table id="recent-trips" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'This week',
          action: `
            <div class="inline-actions">
              <eds-badge label="Week 12" variant="brand" pill></eds-badge>
              <eds-link href="#/itineraries" variant="subtle">Legs</eds-link>
            </div>`,
          body: cadenceList(cadence),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Risk mix',
          action: '<eds-link href="#/risk" variant="subtle">Risk</eds-link>',
          body: tripMix(trips),
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis, 'kpi');
  const period = root.querySelector('#dash-period');
  if (period) {
    period.options = [
      { label: 'Week', value: 'week' },
      { label: 'Q3', value: 'q3' },
      { label: 'FY26', value: 'fy' },
    ];
    period.value = 'q3';
  }
  const watch = root.querySelector('#watch-list');
  if (watch) {
    watch.items = [
      { label: 'Hana Poluru · Lagos', description: 'Nikhil Poluru · elevated', icon: 'alert-triangle', href: '#/trip/tr_lagos' },
      { label: 'Berlin hotel SLA', description: 'Elena Poluru · overdue', icon: 'clock', href: '#/approvals' },
      { label: 'SIN extra night', description: 'Arjun Poluru · $620', icon: 'file', href: '#/approvals' },
      { label: 'Unused UA 220', description: 'Luca Poluru · expires 4 Oct', icon: 'folder', href: '#/expenses' },
    ];
  }
  const recent = root.querySelector('#recent-trips');
  if (recent) {
    recent.columns = [
      { key: 'code', label: 'Trip' },
      { key: 'traveler', label: 'Traveler' },
      { key: 'city', label: 'City' },
      { key: 'status', label: 'Status' },
    ];
    recent.rows = trips.slice(0, 5).map((item) => ({
      code: item.code,
      traveler: item.traveler,
      city: item.city,
      status: item.status,
    }));
  }
  recent?.addEventListener('click', () => {
    window.location.hash = '#/trip/tr_lagos';
  });
  watch?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#qa-trip')?.addEventListener('eds-click', () => document.querySelector('#trip-modal')?.show());
  root.querySelector('#qa-policy')?.addEventListener('eds-click', () => document.querySelector('#policy-modal')?.show());
  root.querySelector('#risk-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Lagos reminder dismissed', variant: 'info' });
  });
}
