import { alerts, kpis, revenueTrend, reviews, scorecards } from '../data/index.js';
import {
  cadenceList,
  healthMix,
  hydrateStats,
  pageHeader,
  sheet,
  scorecardGrid,
  sparkline,
  statGrid,
  statusChip,
} from '../components/widgets.js';

export function renderOverview() {
  const openRegressions = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Summit Platform Lab',
      title: 'Runtime benchmark dashboard',
      lead: 'Harness runs, latency percentiles, throughput, SLO scores, and capacity review readiness.',
      actions: `
        <eds-button variant="secondary" icon="download">Export cycle report</eds-button>
        <eds-button variant="primary" icon="plus">Run harness sweep</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Workload portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-cycle SLO trend',
        body: `
          ${sparkline(revenueTrend, 'Weighted SLO pass rate over twelve cycles')}
          <eds-alert variant="info" title="${openRegressions} regressions open" dismissible>
            Mira Poluru triages daily. Capacity review requires zero red workloads on the block list.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority workloads',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Cycle focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Cycle 14 gates</h2>${statusChip('Watch')}</div>
        <eds-description-list id="cycle-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest harness runs</h2></div>
        <eds-list id="run-list" divided></eds-list>
      </content-card>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis);
  const focus = root.querySelector('#cycle-focus');
  if (focus) {
    focus.items = [
      { term: 'Harness', description: 'v3 · 48 traffic scenarios' },
      { term: 'Min SLO score', description: '90% weighted across workloads' },
      { term: 'Blocking', description: 'Search ranking · p99 cap' },
      { term: 'Capacity review', description: 'Anika Poluru · 28 Nov 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Token validation edge', description: 'Nikhil Poluru · pass · 97%', icon: 'check' },
      { label: 'Search ranking API', description: 'Priya Poluru · fail · p99', icon: 'alert-triangle' },
      { label: 'Real-time scoring', description: 'Arjun Poluru · watch · queue', icon: 'alert-triangle' },
      { label: 'Batch pricing engine', description: 'Kavya Poluru · pass · 94%', icon: 'check' },
    ];
  }
}
