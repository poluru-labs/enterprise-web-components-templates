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
      eyebrow: 'Summit Publishing',
      title: 'Document accessibility',
      lead: 'PDF/UA checks, reading order, alt text, and remediation across the document portfolio.',
      actions: `
        <eds-button variant="secondary" icon="download">Export summary</eds-button>
        <eds-button variant="primary" icon="plus">Upload document</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Document portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-week score trend',
        body: `
          ${sparkline(revenueTrend, 'Portfolio accessibility score over twelve weeks')}
          <eds-alert variant="info" title="${openIssues} issues need review" dismissible>
            Mira Poluru triages every Monday. Critical document issues block CMS publish until cleared.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Priority documents',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Standards">
      <content-card>
        <div slot="header" class="section-title"><h2>PDF/UA focus</h2>${statusChip('On track')}</div>
        <eds-description-list id="doc-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Latest scans</h2></div>
        <eds-list id="scan-list" divided></eds-list>
      </content-card>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis);
  const focus = root.querySelector('#doc-focus');
  if (focus) {
    focus.items = [
      { term: 'Target', description: 'PDF/UA-1 + WCAG 2.2 AA' },
      { term: 'Lead reviewer', description: 'Mira Poluru' },
      { term: 'Next VPAT bundle', description: '20 Nov 2026' },
      { term: 'Blocking docs', description: 'Board pack · Benefits guide' },
    ];
  }
  const scans = root.querySelector('#scan-list');
  if (scans) {
    scans.items = [
      { label: 'Employee handbook', description: 'Priya Poluru · 96% · Tagged', icon: 'check' },
      { label: 'Board pack Q3', description: 'Sahana Poluru · 78% · Charts', icon: 'alert-triangle' },
      { label: 'Benefits guide', description: 'Elena Poluru · 67% · Tables', icon: 'alert-triangle' },
      { label: 'Onboarding kit', description: 'Luca Poluru · 95% · Links OK', icon: 'check' },
    ];
  }
}
