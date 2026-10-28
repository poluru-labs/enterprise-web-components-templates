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
      eyebrow: 'Harbor Digital',
      title: 'Accessibility dashboard',
      lead: 'Track WCAG coverage, open issues, and audit health across public and product surfaces.',
      actions: `
        <eds-button variant="secondary" icon="download">Export summary</eds-button>
        <eds-button variant="primary" icon="plus">Schedule audit</eds-button>
      `,
    })}
    ${statGrid(kpis)}
    <div class="overview-grid">
      ${sheet({ title: 'Audit portfolio', body: healthMix(scorecards) })}
      ${sheet({
        title: 'Twelve-week score trend',
        body: `
          ${sparkline(revenueTrend, 'WCAG compliance score over twelve weeks')}
          <eds-alert variant="info" title="${openIssues} issues need review" dismissible>
            Triage is led by Mira Poluru every Monday. Critical items route to squad owners within one business day.
          </eds-alert>
        `,
      })}
    </div>
    ${sheet({
      title: 'Active audits',
      action: '<eds-link href="#/scorecards">View all</eds-link>',
      body: scorecardGrid(scorecards.slice(0, 4)),
    })}
    ${sheet({ title: 'Review cadence', body: cadenceList(reviews) })}
    <section class="split-grid" aria-label="Quick standards">
      <content-card>
        <div slot="header" class="section-title"><h2>WCAG 2.2 focus</h2>${statusChip('On track')}</div>
        <eds-description-list id="wcag-focus"></eds-description-list>
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
  const focus = root.querySelector('#wcag-focus');
  if (focus) {
    focus.items = [
      { term: 'Target level', description: 'WCAG 2.2 AA' },
      { term: 'Primary owner', description: 'Mira Poluru' },
      { term: 'Next VPAT', description: 'Customer portal · 12 Nov 2026' },
      { term: 'Manual coverage', description: '18 flows this quarter' },
    ];
  }
  const scans = root.querySelector('#scan-list');
  if (scans) {
    scans.items = [
      { label: 'Marketing site', description: 'Luca Poluru · 412 pages · 96% pass', icon: 'check' },
      { label: 'Customer portal', description: 'Sahana Poluru · 286 pages · 82% pass', icon: 'alert-triangle' },
      { label: 'Mobile checkout', description: 'Rohan Poluru · 64 screens · 68% pass', icon: 'alert-triangle' },
      { label: 'Design system docs', description: 'Dev Poluru · 128 examples · 98% pass', icon: 'check' },
    ];
  }
}
