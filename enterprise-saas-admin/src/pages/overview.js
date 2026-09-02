import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { currentUser, incidents, kpis, orgColumns, organizations, usageMonths, workspaceName } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: `${workspaceName} · live`,
      title: 'Overview',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Seats, flags, and uptime for the control plane.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-invite" variant="primary" icon="plus">Invite</eds-button>
        <eds-button id="qa-flag" variant="secondary" icon="filter">New flag</eds-button>
      `,
    })}
    <eds-alert id="maint-alert" variant="warning" dismissible title="Maintenance window" message="Database failover is scheduled for 30 Aug, 02:00–02:40 UTC. Writes will pause for under a minute."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-8">
        ${sheet({
          title: 'Recurring revenue',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(usageMonths, 'Monthly recurring revenue in thousands')}
            <p class="muted mb-0 mt-2">September is in progress at $186k. Net new $22.4k from Lumen Health and Cedar Analytics.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Uptime',
          action: '<eds-status label="Operational" variant="success" pulse></eds-status>',
          body: `
            <div class="uptime-block">
              <eds-circular-progress id="uptime-ring" value="99.98" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <p class="muted mb-0">30-day SLO 99.9%. Auth latency in EMEA is the only watch item.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-5">
        ${sheet({
          title: 'Need attention',
          action: '<eds-link href="#/incidents" variant="subtle">Incidents</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent organizations',
          action: '<eds-link href="#/organizations" variant="subtle">All</eds-link>',
          body: '<eds-data-table id="recent-orgs" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-8">
        ${sheet({
          title: 'Control plane activity',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Seat utilization',
          body: `
            <eds-meter label="Contracted seats" value="84" min="0" max="100" low="50" high="85" optimum="70" show-value></eds-meter>
            <eds-progress-bar class="mt-3" label="API quota" value="74" show-value></eds-progress-bar>
            <eds-progress-bar class="mt-3" label="Storage" value="46" show-value></eds-progress-bar>`,
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
      { label: '30d', value: '30d' },
      { label: '90d', value: '90d' },
      { label: '12m', value: '12m' },
    ];
    period.value = '30d';
  }
  const watch = root.querySelector('#watch-list');
  if (watch) {
    watch.items = [
      { label: 'Nimbus Retail past due', description: 'Arjun Poluru · $4.2k', icon: 'warning', href: '#/org/org_nimbus' },
      { label: 'Auth latency EMEA', description: 'p95 820ms', icon: 'alert-triangle', href: '#/incidents' },
      { label: 'Oak & Pine near cap', description: 'Sahana Poluru · 9/10 seats', icon: 'user', href: '#/org/org_oak' },
    ];
  }
  const recent = root.querySelector('#recent-orgs');
  if (recent) {
    recent.columns = orgColumns.filter((col) => ['name', 'plan', 'owner', 'status'].includes(col.key));
    recent.rows = organizations.slice(0, 4).map((item) => ({
      name: item.name,
      plan: item.plan,
      owner: item.owner,
      status: item.status,
    }));
  }
  const timeline = root.querySelector('#overview-timeline');
  if (timeline) timeline.items = incidents;
  root.querySelector('#qa-invite')?.addEventListener('eds-click', () => document.querySelector('#invite-modal')?.show());
  root.querySelector('#qa-flag')?.addEventListener('eds-click', () => document.querySelector('#flag-modal')?.show());
  root.querySelector('#maint-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Maintenance reminder dismissed', variant: 'info' });
  });
  recent?.addEventListener('click', () => {
    window.location.hash = '#/org/org_harbor';
  });
}
