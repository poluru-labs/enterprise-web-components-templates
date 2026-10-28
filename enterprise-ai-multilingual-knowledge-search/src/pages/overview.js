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
      eyebrow: 'Horizon Global',
      title: 'Multilingual search dashboard',
      lead: 'Locale indexes, glossaries, labeled queries, and translation parity across knowledge packs.',
      actions: `
        <eds-button variant="secondary" icon="download">Export wave report</eds-button>
        <eds-button variant="primary" icon="plus">Run query suite</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Locale portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-wave precision trend',
        body: `
          ${sparkline(revenueTrend, 'Precision@5 over twelve index waves')}
          <eds-alert variant="info" title="${openGaps} gaps open" dismissible>
            Mira Poluru triages daily. Locale launch requires zero red packs.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority locales',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Wave focus">
      <content-card>
        <div slot="header" class="section-title"><h2>Wave 9 gates</h2>${statusChip('Watch')}</div>
        <eds-description-list id="cycle-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest evaluations</h2></div>
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
      { term: 'Query suite', description: 'Wave 9 · 620 labeled queries' },
      { term: 'Min precision@5', description: '90% weighted across locales' },
      { term: 'Blocking', description: 'es-MX · Sales · red gate' },
      { term: 'Glossary freeze', description: 'Nikhil Poluru · 12 Dec 2026' },
    ];
  }
  const runs = root.querySelector('#run-list');
  if (runs) {
    runs.items = [
      { label: 'en-US · Support', description: 'Priya Poluru · pass · 96%', icon: 'check' },
      { label: 'es-MX · Sales', description: 'Kavya Poluru · fail · precision', icon: 'alert-triangle' },
      { label: 'ja-JP · Policy', description: 'Dev Poluru · watch · keigo', icon: 'alert-triangle' },
      { label: 'de-DE · Product', description: 'Anika Poluru · pass · 93%', icon: 'check' },
    ];
  }
}
