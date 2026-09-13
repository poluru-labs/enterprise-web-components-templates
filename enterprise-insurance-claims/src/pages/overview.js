import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  claims,
  currentUser,
  fraudFlags,
  overviewStats,
  paidTrend,
  settlements,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, sheet, claimGrid, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const hotFlags = fraudFlags.filter((item) => ['open', 'watch'].includes(item.status)).slice(0, 4);
  const ready = settlements.filter((item) => ['paid', 'reserved'].includes(item.status)).slice(0, 4);
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Claims desk',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Subra Poluru still has Harborwell photos. Nikhil Poluru will not release Quill fire until the duplicate shots are closed.`,
      actions: `
        <eds-button id="qa-claim" variant="primary" icon="plus">Log claim</eds-button>
        <eds-button id="qa-fraud" variant="secondary" icon="star">Fraud</eds-button>
      `,
    })}
    <eds-alert id="quill-alert" variant="warning" dismissible title="Quill fire in SIU" message="Duplicate scene photos. Nikhil Poluru holds the file. Subra Poluru stays off the pad."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Reserves this year',
          action: '<eds-badge label="$4.8M book" variant="brand" pill></eds-badge>',
          body: `${sparkline(paidTrend, 'Year to date reserves in millions')}
            <p class="muted mb-0 mt-2">Arjun Poluru holds the book. Quill and Nimbus still take the heavy holds.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Cycle time',
          action: '<eds-status label="On SLA" variant="success" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="sla-ring" value="72" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="72" max="100" label="72% of files inside 30 days" show-value></eds-progress-bar>
              <p class="muted mb-0">Leela Poluru clears intake before noon.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Open files</h2>
        <eds-link href="#/claims" variant="subtle">Board</eds-link>
      </div>
      ${claimGrid(claims.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Fraud watch',
          action: '<eds-link href="#/fraud" variant="subtle">SIU</eds-link>',
          body: hotFlags
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.claim} · ${item.title}</strong>
                <p class="muted mb-0">${item.reporter} · ${item.date}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Settlements',
          action: '<eds-link href="#/settlements" variant="subtle">Payables</eds-link>',
          body: ready
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.claim} · ${item.insured}</strong>
                <p class="muted mb-0">${item.owner} · reserved $${item.reserved.toLocaleString()}</p>
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
  root.querySelector('#qa-claim')?.addEventListener('eds-click', () => document.querySelector('#claim-modal')?.show());
  root.querySelector('#qa-fraud')?.addEventListener('eds-click', () => {
    window.location.hash = '#/fraud';
  });
  root.querySelector('#quill-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Quill stays on the SIU board', variant: 'info' });
  });
}
