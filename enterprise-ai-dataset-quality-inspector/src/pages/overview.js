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
      eyebrow: 'Cedar Data Trust',
      title: 'Dataset quality dashboard',
      lead: 'Ruleset scans, completeness, schema contracts, freshness, and certification status.',
      actions: `
        <eds-button variant="secondary" icon="download">Export batch report</eds-button>
        <eds-button variant="primary" icon="plus">Run full scan</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Dataset portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-batch quality trend',
        body: `
          ${sparkline(revenueTrend, 'Overall quality score over twelve batches')}
          <eds-alert variant="info" title="${openFindings} findings open" dismissible>
            Mira Poluru triages daily. Certification requires zero red datasets.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority datasets',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Batch focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Batch 18 gates</h2>${statusChip('Watch')}</div>
        <eds-description-list id="cycle-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest scans</h2></div>
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
      { term: 'Ruleset', description: 'v4.2 · 48 standard rules' },
      { term: 'Min quality', description: '90% weighted across datasets' },
      { term: 'Blocking', description: 'Product catalog · schema' },
      { term: 'Cert freeze', description: 'Anika Poluru · 8 Dec 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'Payment ledger', description: 'Kavya Poluru · pass · 97%', icon: 'check' },
      { label: 'Product catalog', description: 'Dev Poluru · fail · schema', icon: 'alert-triangle' },
      { label: 'Order facts', description: 'Arjun Poluru · watch · dupes', icon: 'alert-triangle' },
      { label: 'Customer dimension', description: 'Priya Poluru · pass · 95%', icon: 'check' },
    ];
  }
}
