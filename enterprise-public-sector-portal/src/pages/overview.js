import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { cadence, currentUser, kpis, requests, slaTrend, workspace } from '../data/index.js';
import { cadenceList, hydrateStats, pageHeader, requestGrid, sheet, slaMix, sparkline, statGrid } from '../components/widgets.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'City pulse',
      lead: `Good morning, ${currentUser.name.split(' ')[0]}. 142 open 311. Ward 3 missed pickup is past SLA. Harbor garage permit is day 11. Noise board sits this afternoon.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-request" variant="primary" icon="plus">New request</eds-button>
        <eds-button id="qa-hearing" variant="secondary" icon="file">Hearing</eds-button>
      `,
    })}
    <eds-alert id="risk-alert" variant="warning" dismissible title="Ward 3 missed pickup is overdue" message="311-1851 opened 9 Sep. Luca Poluru owns sanitation. The 5-day close was 14 Sep."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'SLA met',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(slaTrend, 'Trailing twelve months of 311 SLA')}
            <p class="muted mb-0 mt-2">91% year to date against a 90% floor. Public works is the dip. Parks holds at 96%.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Desk load',
          action: '<eds-status label="Live" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="sla-ring" value="91" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-meter value="91" min="0" max="100" low="80" high="90" optimum="95" label="City SLA" show-value></eds-meter>
              <p class="muted mb-0">12 of 142 are past the 5-day close. Elena Poluru owns the desk.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Live requests</h2>
        <eds-link href="#/requests" variant="subtle">All</eds-link>
      </div>
      ${requestGrid(requests.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/requests" variant="subtle">311</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Open board',
          action: '<eds-link href="#/permits" variant="subtle">Permits</eds-link>',
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
              <eds-link href="#/cases" variant="subtle">Cases</eds-link>
            </div>`,
          body: cadenceList(cadence),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'SLA mix',
          action: '<eds-link href="#/service" variant="subtle">Service</eds-link>',
          body: slaMix(requests),
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
      { label: 'Missed pickup Ward 3', description: 'Luca Poluru · overdue', icon: 'alert-triangle', href: '#/request/rq_trash' },
      { label: 'Harbor garage BLD-442', description: 'Kavya Poluru · day 11', icon: 'clock', href: '#/permits' },
      { label: 'Noise hearing 6 Dock', description: 'Rohan Poluru · today', icon: 'folder', href: '#/cases' },
      { label: 'Pothole Oak Street', description: 'Hana Poluru · due 17 Sep', icon: 'bell', href: '#/request/rq_pothole' },
    ];
  }
  const recent = root.querySelector('#recent-board');
  if (recent) {
    recent.columns = [
      { key: 'code', label: 'ID' },
      { key: 'title', label: 'Item' },
      { key: 'owner', label: 'Owner' },
      { key: 'status', label: 'Status' },
    ];
    recent.rows = requests.slice(0, 5).map((item) => ({
      code: item.code,
      title: item.title,
      owner: item.owner,
      status: item.status,
    }));
  }
  recent?.addEventListener('click', () => {
    window.location.hash = '#/request/rq_pothole';
  });
  watch?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#qa-request')?.addEventListener('eds-click', () => document.querySelector('#request-modal')?.show());
  root.querySelector('#qa-hearing')?.addEventListener('eds-click', () => document.querySelector('#hearing-modal')?.show());
  root.querySelector('#risk-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Pickup reminder dismissed', variant: 'info' });
  });
}
