import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  approvals,
  currentUser,
  locales,
  overviewStats,
  pieces,
  shipTrend,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, sheet, pieceGrid, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const waiting = approvals.filter((item) => ['in_review', 'hold', 'copy'].includes(item.status)).slice(0, 4);
  const flying = locales.filter((item) => ['translation', 'copy', 'draft'].includes(item.status)).slice(0, 4);
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Editorial desk',
      lead: `Good evening, ${currentUser.name.split(' ')[0]}. Kavya Poluru still has Harborwell in copy. Asha Poluru needs Quill before 10.`,
      actions: `
        <eds-button id="qa-piece" variant="primary" icon="plus">New piece</eds-button>
        <eds-button id="qa-approvals" variant="secondary" icon="check">Approvals</eds-button>
      `,
    })}
    <eds-alert id="quill-alert" variant="warning" dismissible title="Quill is in review" message="Asha Poluru holds LM-331. Arjun Poluru stays off the pad until legal clears the fire photos."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Ships this year',
          action: '<eds-badge label="26 live" variant="brand" pill></eds-badge>',
          body: `${sparkline(shipTrend, 'Pieces shipped this year')}
            <p class="muted mb-0 mt-2">Rohan Poluru holds the home slot. Stride went at 06:00. Quill is next if Asha Poluru signs.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'On time',
          action: '<eds-status label="On slot" variant="success" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="slot-ring" value="74" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="74" max="100" label="74% of slots hit this week" show-value></eds-progress-bar>
              <eds-meter value="74" min="0" max="100" low="50" high="80" optimum="90" label="Slot health" show-value></eds-meter>
              <p class="muted mb-0">Dev Poluru clears the 06:00 window.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Open pieces</h2>
        <eds-link href="#/calendar" variant="subtle">Week</eds-link>
      </div>
      ${pieceGrid(pieces.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Approvals',
          action: '<eds-link href="#/approvals" variant="subtle">Queue</eds-link>',
          body: waiting
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.piece} · ${item.title}</strong>
                <p class="muted mb-0">${item.reviewer} · ${item.date}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Locales',
          action: '<eds-link href="#/locales" variant="subtle">Packs</eds-link>',
          body: flying
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.code} · ${item.piece}</strong>
                <p class="muted mb-0">${item.owner} · ${item.coverage}%</p>
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
  root.querySelector('#qa-piece')?.addEventListener('eds-click', () => document.querySelector('#piece-modal')?.show());
  root.querySelector('#qa-approvals')?.addEventListener('eds-click', () => {
    window.location.hash = '#/approvals';
  });
  root.querySelector('#quill-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Quill stays on Asha Poluru’s queue', variant: 'info' });
  });
}
