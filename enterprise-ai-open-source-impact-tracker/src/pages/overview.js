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
  const openExceptions = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Harbor Commons Program',
      title: 'Open source impact dashboard',
      lead: 'Contributions, maintainer time, license compliance, downstream adoption, and board readiness.',
      actions: `
        <eds-button variant="secondary" icon="download">Export quarter report</eds-button>
        <eds-button variant="primary" icon="plus">Run catalog scan</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Project portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-quarter impact trend',
        body: `
          ${sparkline(revenueTrend, 'Weighted program impact score over twelve quarters')}
          <eds-alert variant="info" title="${openExceptions} exceptions open" dismissible>
            Mira Poluru triages weekly. Board readout requires zero red projects on the block list.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority projects',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Quarter focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Quarter 4 gates</h2>${statusChip('Watch')}</div>
        <eds-description-list id="cycle-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest catalog scans</h2></div>
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
      { term: 'Catalog', description: 'v2 · 26 tracked projects' },
      { term: 'Min impact score', description: '85% weighted across portfolio' },
      { term: 'Blocking', description: 'Data connector · upstream' },
      { term: 'Board readout', description: 'Anika Poluru · 12 Dec 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Platform SDK', description: 'Nikhil Poluru · pass · 94%', icon: 'check' },
      { label: 'Data connector library', description: 'Dev Poluru · fail · stale', icon: 'alert-triangle' },
      { label: 'Developer CLI', description: 'Luca Poluru · watch · license', icon: 'alert-triangle' },
      { label: 'Enterprise UI kit', description: 'Priya Poluru · pass · 91%', icon: 'check' },
    ];
  }
}
