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
  const openChanges = alerts.filter((item) => item.severity !== 'Green').length;
  return `
    ${pageHeader({
      eyebrow: 'Polaris Guild',
      title: 'Design system workbench',
      lead: 'Components, tokens, patterns, and release readiness for enterprise-design-system-wc.',
      actions: `
        <eds-button variant="secondary" icon="download">Export catalog</eds-button>
        <eds-button variant="primary" icon="plus">Propose change</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Component portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Adoption trend',
        body: `
          ${sparkline(revenueTrend, 'Squad adoption over the last twelve sprints')}
          <eds-alert variant="info" title="${openChanges} open change requests" dismissible>
            Token council meets Tuesdays. Mira Poluru publishes decisions within one business day.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Featured components',
      action: '<eds-link href="#/scorecards">View catalog</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Guild calendar', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Foundation">
      <content-card>
        <div slot="header" class="section-title"><h2>EDS 1.2 focus</h2>${statusChip('On track')}</div>
        <eds-description-list id="release-focus"></eds-description-list>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Recent updates</h2></div>
        <eds-list id="update-list" divided></eds-list>
      </content-card>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis);
  const focus = root.querySelector('#release-focus');
  if (focus) {
    focus.items = [
      { term: 'Release', description: 'enterprise-design-system-wc 1.2' },
      { term: 'Token freeze', description: '18 Nov 2026' },
      { term: 'Steward', description: 'Anika Poluru' },
      { term: 'Blocking change', description: 'Date picker week start · Luca Poluru' },
    ];
  }
  const updates = root.querySelector('#update-list');
  if (updates) {
    updates.items = [
      { label: 'Modal size tokens', description: 'Kavya Poluru · Approved 24 Oct', icon: 'check' },
      { label: 'Button tertiary rename', description: 'Dev Poluru · In review', icon: 'edit' },
      { label: 'Card footer guidance', description: 'Hana Poluru · Docs merged', icon: 'check' },
      { label: 'Density migration guide', description: 'Hana Poluru · Draft ready', icon: 'download' },
    ];
  }
}
