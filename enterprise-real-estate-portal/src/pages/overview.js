import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  currentUser,
  leases,
  noiTrend,
  overviewStats,
  properties,
  workOrders,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, sheet, propertyGrid, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const hotWork = workOrders.filter((item) => ['open', 'in_progress'].includes(item.status)).slice(0, 4);
  const notice = leases.filter((item) => ['notice', 'expired'].includes(item.status));
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Homes desk',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Subra Poluru still has Harborwell at 95%. Mira Poluru’s notice at Alder 4C is the one to fill this week.`,
      actions: `
        <eds-button id="qa-wo" variant="primary" icon="plus">Log request</eds-button>
        <eds-button id="qa-leases" variant="secondary" icon="file">Leases</eds-button>
      `,
    })}
    <eds-alert id="cedar-alert" variant="warning" dismissible title="Cedar Yard on watch" message="Two industrial bays are dark. Subra Poluru will not list Bay 4 until the dock leak is closed."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'NOI this year',
          action: '<eds-badge label="$18.2M TTM" variant="brand" pill></eds-badge>',
          body: `${sparkline(noiTrend, 'Trailing twelve month NOI in millions')}
            <p class="muted mb-0 mt-2">Maya Poluru holds the book. Lotline and Harborwell still carry the rent roll.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Portfolio leased',
          action: '<eds-status label="93% leased" variant="success" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="occ-ring" value="93" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="93" max="100" label="486 of 522 units occupied" show-value></eds-progress-bar>
              <p class="muted mb-0">Leela Poluru watches notice units Fridays.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Active assets</h2>
        <eds-link href="#/properties" variant="subtle">Board</eds-link>
      </div>
      ${propertyGrid(properties.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Open work',
          action: '<eds-link href="#/maintenance" variant="subtle">Queue</eds-link>',
          body: hotWork
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.type} · ${item.title}</strong>
                <p class="muted mb-0">${item.property} · ${item.reporter}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Lease watch',
          action: '<eds-link href="#/leases" variant="subtle">Roll</eds-link>',
          body: notice
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.tenant} · ${item.unit}</strong>
                <p class="muted mb-0">${item.property} · ends ${item.end}</p>
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
  root.querySelector('#qa-wo')?.addEventListener('eds-click', () => document.querySelector('#wo-modal')?.show());
  root.querySelector('#qa-leases')?.addEventListener('eds-click', () => {
    window.location.hash = '#/leases';
  });
  root.querySelector('#cedar-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Cedar stays on the board', variant: 'info' });
  });
}
