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
  const openGaps = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Harbor Research',
      title: 'Reproducibility dashboard',
      lead: 'Protocol adherence, artifact hashes, independent reruns, and cohort progress.',
      actions: `
        <eds-button variant="secondary" icon="download">Export cohort report</eds-button>
        <eds-button variant="primary" icon="plus">Schedule rerun</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Study portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-cohort replication trend',
        body: `
          ${sparkline(revenueTrend, 'Replication success rate over twelve cohorts')}
          <eds-alert variant="info" title="${openGaps} gaps open" dismissible>
            Mira Poluru triages daily. Publication sign-off requires zero red studies.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority studies',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Cohort focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Cohort 7 gates</h2>${statusChip('Watch')}</div>
        <eds-description-list id="cycle-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest reruns</h2></div>
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
      { term: 'Protocol', description: 'v2.4 · preregistered steps' },
      { term: 'Min replication', description: '85% weighted across studies' },
      { term: 'Blocking', description: 'Cognitive battery · scripts' },
      { term: 'Window close', description: 'Arjun Poluru · 21 Nov 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Cardio metabolomics', description: 'Priya Poluru · pass · 94%', icon: 'check' },
      { label: 'Cognitive battery RCT', description: 'Dev Poluru · blocked · scripts', icon: 'alert-triangle' },
      { label: 'Soil microbiome trial', description: 'Luca Poluru · watch · env', icon: 'alert-triangle' },
      { label: 'Materials stress test', description: 'Nikhil Poluru · pass · 96%', icon: 'check' },
    ];
  }
}
