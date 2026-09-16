import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { cadence, currentUser, kpis, latencyTrend, services, workspace } from '../data/index.js';
import { cadenceList, healthMix, hydrateStats, pageHeader, serviceGrid, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Platform pulse',
      lead: `Good morning, ${currentUser.name.split(' ')[0]}. Auth gateway 1.8.4 is live. Billing error budget is 62%. Travel book 0.4.8 failed in staging.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-service" variant="primary" icon="plus">New service</eds-button>
        <eds-button id="qa-deploy" variant="secondary" icon="check">Ship</eds-button>
      `,
    })}
    <eds-alert id="risk-alert" variant="warning" dismissible title="Billing error budget is 62%" message="POST /v1/invoice p95 is 186ms. Arjun Poluru owns the ledger. Freeze is 2 Oct."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'P95 latency',
          action: '<eds-badge label="T12W" variant="brand" pill></eds-badge>',
          body: `${sparkline(latencyTrend, 'Trailing twelve weeks of platform p95')}
            <p class="muted mb-0 mt-2">118ms against a 200ms SLO. Auth and mesh pulled the line down. Billing is the lag.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Error budget',
          action: '<eds-status label="Live" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="slo-ring" value="84" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-meter value="84" min="0" max="100" low="70" high="85" optimum="95" label="Budget left" show-value></eds-meter>
              <p class="muted mb-0">Sahana Poluru pages under 70%. Billing is the only watch.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Live catalog</h2>
        <eds-link href="#/services" variant="subtle">All</eds-link>
      </div>
      ${serviceGrid(services.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/health" variant="subtle">Health</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Open board',
          action: '<eds-link href="#/deployments" variant="subtle">Deploys</eds-link>',
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
              <eds-link href="#/deployments" variant="subtle">Train</eds-link>
            </div>`,
          body: cadenceList(cadence),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Health mix',
          action: '<eds-link href="#/services" variant="subtle">Services</eds-link>',
          body: healthMix(services),
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
      { label: 'Billing invoice p95', description: 'Arjun Poluru · 186ms', icon: 'alert-triangle', href: '#/health' },
      { label: 'Travel book failed', description: 'Priya Poluru · 0.4.8', icon: 'clock', href: '#/deployments' },
      { label: 'Sandbox keys stale', description: 'Hana Poluru · 3 services', icon: 'folder', href: '#/environments' },
      { label: 'Pulse 0.7.1 rolling', description: 'Kavya Poluru · staging', icon: 'star', href: '#/service/svc_pulse' },
    ];
  }
  const recent = root.querySelector('#recent-board');
  if (recent) {
    recent.columns = [
      { key: 'code', label: 'ID' },
      { key: 'name', label: 'Service' },
      { key: 'owner', label: 'Owner' },
      { key: 'status', label: 'Status' },
    ];
    recent.rows = services.slice(0, 5).map((item) => ({
      code: item.code,
      name: item.name,
      owner: item.owner,
      status: item.status,
    }));
  }
  recent?.addEventListener('click', () => {
    window.location.hash = '#/service/svc_auth';
  });
  watch?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#qa-service')?.addEventListener('eds-click', () => document.querySelector('#service-modal')?.show());
  root.querySelector('#qa-deploy')?.addEventListener('eds-click', () => document.querySelector('#deploy-modal')?.show());
  root.querySelector('#risk-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Budget reminder dismissed', variant: 'info' });
  });
}
