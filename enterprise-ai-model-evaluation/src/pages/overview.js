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
      eyebrow: 'Meridian Analytics',
      title: 'Model evaluation dashboard',
      lead: 'Holdout metrics, drift checks, fairness gates, and promotion readiness across the model portfolio.',
      actions: `
        <eds-button variant="secondary" icon="download">Export eval run</eds-button>
        <eds-button variant="primary" icon="plus">Schedule evaluation</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Model portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Pass rate trend',
        body: `
          ${sparkline(revenueTrend, 'Evaluation pass rate over twelve windows')}
          <eds-alert variant="info" title="${openFindings} findings open" dismissible>
            Mira Poluru triages blocking findings daily. Promotion requires zero red gates.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Models in window',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review calendar', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Gates">
      <content-card>
        <div slot="header" class="section-title"><h2>Release 7.3 gates</h2>${statusChip('Watch')}</div>
        <eds-description-list id="gate-focus"></eds-description-list>
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
  const focus = root.querySelector('#gate-focus');
  if (focus) {
    focus.items = [
      { term: 'Holdout cut', description: '2026-10-20 · Hana Poluru' },
      { term: 'Min AUC', description: '0.90 portfolio weighted' },
      { term: 'Blocking models', description: 'Fraud detector · 2 findings' },
      { term: 'Sign-off', description: 'Luca Poluru · 22 Nov 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Churn scorer 7.3.2', description: 'Kavya Poluru · pass · shadow OK', icon: 'check' },
      { label: 'Fraud detector 7.3.1', description: 'Anika Poluru · fail · precision', icon: 'alert-triangle' },
      { label: 'Credit risk recal', description: 'Arjun Poluru · watch · drift', icon: 'alert-triangle' },
      { label: 'Ticket triage', description: 'Sahana Poluru · pass · latency OK', icon: 'check' },
    ];
  }
}
