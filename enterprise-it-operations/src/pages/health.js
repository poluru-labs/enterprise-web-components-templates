import { healthTrend, sites } from '../data/index.js';
import { healthMap, hydrateStats, pageHeader, sheet, sparkline, statGrid, statusChip } from '../components/widgets.js';

const siteKpis = sites.slice(0, 4).map((site) => ({
  label: site.name,
  value: `${site.health}%`,
  hint: site.owner,
  trend: site.status === 'Healthy' ? 'up' : 'down',
  trendValue: site.status,
}));

export function renderHealth() {
  return `
    ${pageHeader({
      eyebrow: 'Estate',
      title: 'Infrastructure health',
      lead: 'Five sites, live probes, and capacity. Dallas is watching disk ahead of tonight’s window.',
      actions: `
        <eds-button variant="secondary" icon="refresh" id="poll-health">Poll now</eds-button>
        <eds-button variant="primary" icon="calendar" id="sched-maint">Schedule window</eds-button>
      `,
    })}
    ${statGrid(siteKpis, 'site')}
    <div class="split">
      ${sheet({
        title: 'Composite, 12 weeks',
        action: '<eds-badge label="96.4%" variant="success" pill></eds-badge>',
        body: `${sparkline(healthTrend, 'Estate health')}
          <div class="inline-actions mt-4">
            <eds-spinner id="health-spin" size="sm" label="Polling" hidden></eds-spinner>
            <eds-skeleton id="health-skel" width="12rem" height="0.7rem" hidden></eds-skeleton>
            <span class="muted" id="poll-stamp">Last poll 14:38 CT</span>
          </div>`,
      })}
      ${sheet({
        title: 'Sites',
        body: healthMap(),
      })}
    </div>
    <div class="card-grid">
      ${sites
        .map(
          (site) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${site.name}</h2>
            ${statusChip(site.status)}
          </div>
          <p class="muted mb-3">${site.owner}</p>
          <div class="stack">
            <eds-progress-bar value="${site.cpu}" max="100" label="CPU ${site.cpu}%" show-value></eds-progress-bar>
            <eds-progress-bar value="${site.mem}" max="100" label="Memory ${site.mem}%" show-value></eds-progress-bar>
            <eds-meter value="${site.disk}" min="0" max="100" low="70" high="85" optimum="50" label="Disk" show-value></eds-meter>
          </div>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateHealth(root) {
  hydrateStats(root, siteKpis, 'site');
  root.querySelector('#sched-maint')?.addEventListener('eds-click', () => document.querySelector('#maint-modal')?.show());
  root.querySelector('#poll-health')?.addEventListener('eds-click', () => {
    const spin = root.querySelector('#health-spin');
    const skel = root.querySelector('#health-skel');
    const stamp = root.querySelector('#poll-stamp');
    if (spin) spin.hidden = false;
    if (skel) skel.hidden = false;
    window.setTimeout(() => {
      if (spin) spin.hidden = true;
      if (skel) skel.hidden = true;
      if (stamp) stamp.textContent = 'Last poll 14:41 CT';
    }, 700);
  });
}
