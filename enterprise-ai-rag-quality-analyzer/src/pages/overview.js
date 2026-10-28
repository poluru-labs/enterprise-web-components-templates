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
  const openIssues = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Atlas Knowledge',
      title: 'Retrieval quality dashboard',
      lead: 'Query suites, citation checks, recall gates, and index health across knowledge collections.',
      actions: `
        <eds-button variant="secondary" icon="download">Export cycle report</eds-button>
        <eds-button variant="primary" icon="plus">Run quality suite</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Collection portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-cycle quality trend',
        body: `
          ${sparkline(revenueTrend, 'Overall quality score over twelve cycles')}
          <eds-alert variant="info" title="${openIssues} issues open" dismissible>
            Mira Poluru triages daily. Index promotion requires zero red collection gates.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority collections',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Cycle focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Cycle 12 gates</h2>${statusChip('Watch')}</div>
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
      { term: 'Query suite', description: 'v3 · 842 labeled queries' },
      { term: 'Min recall@5', description: '85% portfolio weighted' },
      { term: 'Blocking', description: 'Sales playbooks · 1 red gate' },
      { term: 'Index freeze', description: 'Nikhil Poluru · 19 Nov 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Support articles', description: 'Sahana Poluru · pass · 95%', icon: 'check' },
      { label: 'Sales playbooks', description: 'Kavya Poluru · fail · recall', icon: 'alert-triangle' },
      { label: 'Product docs', description: 'Dev Poluru · watch · overlap', icon: 'alert-triangle' },
      { label: 'Engineering runbooks', description: 'Luca Poluru · pass · 97%', icon: 'check' },
    ];
  }
}
