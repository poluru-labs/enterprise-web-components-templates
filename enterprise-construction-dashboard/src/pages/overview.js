import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  currentUser,
  overviewStats,
  rfis,
  safetyReports,
  sites,
  spendTrend,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, sheet, siteGrid, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const hot = rfis.filter((item) => ['open', 'overdue'].includes(item.status)).slice(0, 4);
  const safety = safetyReports.filter((item) => ['open', 'watch'].includes(item.status));
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Jobs desk',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Subra Poluru still has Cedar Yard on tilt-wall. Ishaan Poluru needs RFI-429 off Flare before the podium pour.`,
      actions: `
        <eds-button id="qa-rfi" variant="primary" icon="plus">Log RFI</eds-button>
        <eds-button id="qa-safety" variant="secondary" icon="check">Safety</eds-button>
      `,
    })}
    <eds-alert id="cedar-alert" variant="warning" dismissible title="Cedar Yard at risk" message="Tilt-wall is slipping. Subra Poluru will not pour until the tag-line near miss is closed."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Spend this year',
          action: '<eds-badge label="$61.5M YTD" variant="brand" pill></eds-badge>',
          body: `${sparkline(spendTrend, 'Year to date spend in millions')}
            <p class="muted mb-0 mt-2">Arjun Poluru holds the book. Harborwell and Flare still take the heavy draws.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Budget remaining',
          action: '<eds-status label="On plan" variant="success" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="budget-ring" value="40" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="40" max="100" label="40% of $153.7M approved" show-value></eds-progress-bar>
              <p class="muted mb-0">$92.1M left. Priya Poluru reviews change orders Fridays.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Active sites</h2>
        <eds-link href="#/sites" variant="subtle">Board</eds-link>
      </div>
      ${siteGrid(sites.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Open RFIs',
          action: '<eds-link href="#/rfis" variant="subtle">Queue</eds-link>',
          body: hot
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.number} · ${item.title}</strong>
                <p class="muted mb-0">${item.site} · ${item.author} · due ${item.due}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Safety watch',
          action: '<eds-link href="#/safety" variant="subtle">Reports</eds-link>',
          body: safety
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.type} · ${item.site}</strong>
                <p class="muted mb-0">${item.reporter} · ${item.date}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, overviewStats(), 'stat');
  root.querySelector('#qa-rfi')?.addEventListener('eds-click', () => document.querySelector('#rfi-modal')?.show());
  root.querySelector('#qa-safety')?.addEventListener('eds-click', () => {
    window.location.hash = '#/safety';
  });
  root.querySelector('#cedar-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Cedar stay on the board', variant: 'info' });
  });
}
