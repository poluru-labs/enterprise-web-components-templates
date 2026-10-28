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
  const openFindings = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Harbor Secure QA',
      title: 'Input security dashboard',
      lead: 'Probe suites, inbound block rates, corpus coverage, and release-gate readiness across tested surfaces.',
      actions: `
        <eds-button variant="secondary" icon="download">Export sprint report</eds-button>
        <eds-button variant="primary" icon="plus">Run corpus sweep</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Surface portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-sprint pass trend',
        body: `
          ${sparkline(revenueTrend, 'Weighted probe pass rate over twelve sprints')}
          <eds-alert variant="info" title="${openFindings} findings open" dismissible>
            Mira Poluru triages daily. Release gate requires zero red findings on blocking surfaces.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority surfaces',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Sprint focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Sprint 22 gates</h2>${statusChip('Watch')}</div>
        <eds-description-list id="cycle-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest probe runs</h2></div>
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
      { term: 'Corpus', description: 'v5 · 312 standard probes' },
      { term: 'Min pass score', description: '88% weighted across surfaces' },
      { term: 'Blocking', description: 'Partner webhooks · replay' },
      { term: 'Gate readout', description: 'Anika Poluru · 21 Nov 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Authentication service', description: 'Nikhil Poluru · pass · 96%', icon: 'check' },
      { label: 'Partner webhooks', description: 'Dev Poluru · fail · replay', icon: 'alert-triangle' },
      { label: 'Checkout API', description: 'Arjun Poluru · watch · unicode', icon: 'alert-triangle' },
      { label: 'Document upload', description: 'Sahana Poluru · pass · 94%', icon: 'check' },
    ];
  }
}
