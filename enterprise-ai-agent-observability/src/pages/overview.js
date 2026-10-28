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
  const openIncidents = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Summit Platform',
      title: 'Run observability dashboard',
      lead: 'Workflow runs, trace coverage, SLO burn, and service health across production surfaces.',
      actions: `
        <eds-button variant="secondary" icon="download">Export week report</eds-button>
        <eds-button variant="primary" icon="plus">Schedule drill</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Service portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-week success trend',
        body: `
          ${sparkline(revenueTrend, 'Run success rate over twelve weeks')}
          <eds-alert variant="info" title="${openIncidents} incidents open" dismissible>
            Mira Poluru reviews the queue daily. Customer-facing SLOs require zero red services.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority services',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Release focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Release 2026.10</h2>${statusChip('Watch')}</div>
        <eds-description-list id="cycle-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest runs</h2></div>
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
      { term: 'Change window', description: 'Week 43 · deploy train Tue/Thu' },
      { term: 'Min run success', description: '99.0% portfolio weighted' },
      { term: 'Blocking', description: 'Inventory sync · error budget' },
      { term: 'Freeze', description: 'Luca Poluru · 14 Nov 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Payment orchestration', description: 'Arjun Poluru · success · 98%', icon: 'check' },
      { label: 'Inventory sync', description: 'Luca Poluru · fail · locks', icon: 'alert-triangle' },
      { label: 'Order fulfillment', description: 'Priya Poluru · watch · p95', icon: 'alert-triangle' },
      { label: 'Identity sync', description: 'Nikhil Poluru · success · 99%', icon: 'check' },
    ];
  }
}
