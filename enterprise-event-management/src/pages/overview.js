import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { attendTrend, cadence, currentUser, events, kpis, workspace } from '../data/index.js';
import { cadenceList, eventGrid, houseMix, hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'House pulse',
      lead: `Good morning, ${currentUser.name.split(' ')[0]}. Northline Summit is live in Hall A. Foyer B check-in is at 57%. Three speakers still need travel.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-event" variant="primary" icon="plus">New event</eds-button>
        <eds-button id="qa-checkin" variant="secondary" icon="check">Check in</eds-button>
      `,
    })}
    <eds-alert id="risk-alert" variant="warning" dismissible title="Foyer B check-in is lagging" message="Printer 2 jammed at 08:41. Elena Poluru owns the desk. 200 of 350 scanned."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Check-in',
          action: '<eds-badge label="T12W" variant="brand" pill></eds-badge>',
          body: `${sparkline(attendTrend, 'Trailing twelve weeks of house check-in')}
            <p class="muted mb-0 mt-2">76% of 1,284 guests are in. Target is 80% by lunch. Foyer A is ahead; Foyer B is the drag.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'House load',
          action: '<eds-status label="Live" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="fill-ring" value="76" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-meter value="76" min="0" max="100" low="60" high="80" optimum="90" label="Check-in" show-value></eds-meter>
              <p class="muted mb-0">512 of 640 Summit guests have badges. Elena Poluru owns the desk.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Live book</h2>
        <eds-link href="#/events" variant="subtle">All</eds-link>
      </div>
      ${eventGrid(events.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/attendance" variant="subtle">Gates</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Open book',
          action: '<eds-link href="#/schedule" variant="subtle">Schedule</eds-link>',
          body: '<eds-data-table id="recent-board" compact striped></eds-data-table>',
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
              <eds-link href="#/schedule" variant="subtle">Sessions</eds-link>
            </div>`,
          body: cadenceList(cadence),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'House mix',
          action: '<eds-link href="#/events" variant="subtle">Events</eds-link>',
          body: houseMix(events),
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
      { label: 'Foyer B printer jam', description: 'Elena Poluru · 57% scanned', icon: 'alert-triangle', href: '#/attendance' },
      { label: 'Speaker travel pending', description: 'Sahana Poluru · 3 names', icon: 'clock', href: '#/speakers' },
      { label: 'Brightwell dinner hold', description: 'Arjun Poluru · Oak Lounge', icon: 'folder', href: '#/event/ev_bright' },
      { label: 'Kavya pipeline talk', description: 'Hall A · 10:15', icon: 'star', href: '#/schedule' },
    ];
  }
  const recent = root.querySelector('#recent-board');
  if (recent) {
    recent.columns = [
      { key: 'code', label: 'ID' },
      { key: 'name', label: 'Event' },
      { key: 'owner', label: 'Owner' },
      { key: 'status', label: 'Status' },
    ];
    recent.rows = events.slice(0, 5).map((item) => ({
      code: item.code,
      name: item.name,
      owner: item.owner,
      status: item.status,
    }));
  }
  recent?.addEventListener('click', () => {
    window.location.hash = '#/event/ev_north';
  });
  watch?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#qa-event')?.addEventListener('eds-click', () => document.querySelector('#event-modal')?.show());
  root.querySelector('#qa-checkin')?.addEventListener('eds-click', () => document.querySelector('#checkin-modal')?.show());
  root.querySelector('#risk-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Check-in reminder dismissed', variant: 'info' });
  });
}
