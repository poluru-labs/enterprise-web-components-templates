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
  const openFailures = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Nexus UI',
      title: 'Component testing dashboard',
      lead: 'Pass rates, open failures, and coverage across the design system component lab.',
      actions: `
        <eds-button variant="secondary" icon="download">Export run</eds-button>
        <eds-button variant="primary" icon="plus">Queue test run</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Component portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-build pass rate',
        body: `
          ${sparkline(revenueTrend, 'Suite pass rate over the last twelve builds')}
          <eds-alert variant="info" title="${openFailures} failures need triage" dismissible>
            Mira Poluru hosts triage daily at 10:00. P1 specs block release 4.2 until cleared.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Components under test',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Lab calendar', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Quick signals">
      <content-card>
        <div slot="header" class="section-title"><h2>Release 4.2 focus</h2>${statusChip('Watch')}</div>
        <eds-description-list id="release-focus"></eds-description-list>
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
  const focus = root.querySelector('#release-focus');
  if (focus) {
    focus.items = [
      { term: 'Target branch', description: 'release/4.2' },
      { term: 'CI owner', description: 'Arjun Poluru' },
      { term: 'Blocking failures', description: '3 P1 · Modal, Data table, Upload' },
      { term: 'Visual diffs pending', description: '11 snapshots · Priya Poluru' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Nightly suite', description: 'Build 9184 · 96.8% pass · 26 Oct', icon: 'check' },
      { label: 'Modal interaction pack', description: 'Kavya Poluru · 2 failures', icon: 'alert-triangle' },
      { label: 'Chromatic visual', description: 'Priya Poluru · 11 diffs', icon: 'eye' },
      { label: 'Cross-browser matrix', description: 'Sahana Poluru · 98.2% pass', icon: 'check' },
    ];
  }
}
