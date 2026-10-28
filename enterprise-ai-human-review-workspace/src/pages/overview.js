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
  const openEsc = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Summit Review Board',
      title: 'Review operations dashboard',
      lead: 'Queues, rubrics, calibration, SLA adherence, and reviewer agreement.',
      actions: `
        <eds-button variant="secondary" icon="download">Export cycle report</eds-button>
        <eds-button variant="primary" icon="plus">Assign calibration</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Queue portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-cycle agreement trend',
        body: `
          ${sparkline(revenueTrend, 'Inter-rater agreement over twelve cycles')}
          <eds-alert variant="info" title="${openEsc} escalations open" dismissible>
            Mira Poluru runs standup daily. Cycle sign-off requires zero red queues.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority queues',
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
        <div slot="header" class="section-title"><h2>Latest decisions</h2></div>
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
      { term: 'Rubric', description: 'v3.1 · calibrated gold set' },
      { term: 'Min agreement', description: '92% across active queues' },
      { term: 'Blocking', description: 'Refund disputes · SLA' },
      { term: 'Freeze', description: 'Dev Poluru · 19 Nov 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Claims adjudication', description: 'Priya Poluru · on SLA · 95%', icon: 'check' },
      { label: 'Refund disputes', description: 'Kavya Poluru · breach · backlog', icon: 'alert-triangle' },
      { label: 'Publisher submissions', description: 'Sahana Poluru · watch · agreement', icon: 'alert-triangle' },
      { label: 'Access requests', description: 'Nikhil Poluru · cleared · 97%', icon: 'check' },
    ];
  }
}
