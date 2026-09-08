import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  currentUser,
  overviewStats,
  pendingApprovals,
  requests,
  spendTrend,
  workspace,
} from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { hydrateStats, pageHeader, requestGrid, sheet, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const pending = pendingApprovals();
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Buy desk',
      lead: `Good evening, ${currentUser.name.split(' ')[0]}. ${pending.length} approvals sit with finance or legal. Cedar’s facilities blanket expires 20 Sep.`,
      actions: `
        <eds-button id="qa-request" variant="primary" icon="plus">New request</eds-button>
        <eds-button id="qa-approvals" variant="secondary" icon="check">Approvals</eds-button>
      `,
    })}
    <eds-alert id="expiry-alert" variant="warning" dismissible title="Contract expiring" message="Cedar facilities blanket renews 20 Sep. Nikhil Poluru should rebid or extend before Friday."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Spend this year',
          action: '<eds-badge label="$1.24M YTD" variant="brand" pill></eds-badge>',
          body: `${sparkline(spendTrend, 'Year to date spend in thousands')}
            <p class="muted mb-0 mt-2">Cloud and IT hardware still take half the book. Subbu Poluru reviews the rest on Fridays.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Budget remaining',
          action: '<eds-status label="On plan" variant="success" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="budget-ring" value="26" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="26" max="100" label="26% of $4.80M FY26" show-value></eds-progress-bar>
              <p class="muted mb-0">$3.56M left. Books close with Priya Poluru.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Open requests</h2>
        <eds-link href="#/requests" variant="subtle">Board</eds-link>
      </div>
      ${requestGrid(requests.filter((item) => ['pending', 'approved', 'ordered', 'draft'].includes(item.status)).slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Waiting on a signature',
          action: '<eds-link href="#/approvals" variant="subtle">Queue</eds-link>',
          body: pending
            .map(
              (item) => `
            <div class="approval-row">
              <div>
                <strong>${item.title}</strong>
                <p class="muted mb-0">${item.owner} · ${formatCurrency(item.amount)} · ${item.waiting}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent activity',
          action: '<eds-link href="#/spend" variant="subtle">Spend</eds-link>',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, overviewStats(), 'stat');
  const timeline = root.querySelector('#overview-timeline');
  if (timeline) {
    timeline.items = [
      { label: 'PR-1042 sent to Arjun Poluru', description: 'Laptop fleet · $48,200', timestamp: '3 Sep', icon: 'clock' },
      { label: 'Helio Cloud seats approved', description: 'Dev Poluru · order next', timestamp: '2 Sep', icon: 'check' },
      { label: 'Design licenses received', description: 'Kavya Poluru · Quill Software', timestamp: '1 Sep', icon: 'folder' },
      { label: 'Austin millwork rejected', description: 'Use the Cedar bid on file', timestamp: '29 Aug', icon: 'alert-triangle' },
    ];
  }
  root.querySelector('#qa-request')?.addEventListener('eds-click', () => document.querySelector('#request-modal')?.show());
  root.querySelector('#qa-approvals')?.addEventListener('eds-click', () => {
    window.location.hash = '#/approvals';
  });
  root.querySelector('#expiry-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Expiry reminder dismissed', variant: 'info' });
  });
}
