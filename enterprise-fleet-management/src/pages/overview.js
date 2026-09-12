import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  currentUser,
  overviewStats,
  vehicles,
  workOrders,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid, statusChip, vehicleGrid } from '../components/widgets.js';
import { fuelTrend } from '../data/index.js';

export function renderOverview() {
  const stats = overviewStats();
  const shop = workOrders.filter((item) => ['in_shop', 'due', 'parts_hold'].includes(item.status));
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Yard desk',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Subra Poluru still has ORB-412 on the drums. Ishaan Poluru wants ORB-851 in the bay before tomorrow’s DOT stamp.`,
      actions: `
        <eds-button id="qa-assign" variant="primary" icon="plus">Assign vehicle</eds-button>
        <eds-button id="qa-shop" variant="secondary" icon="check">Open shop</eds-button>
      `,
    })}
    <eds-alert id="shop-alert" variant="warning" dismissible title="Shop hold" message="ORB-412 is in Dallas bay 2. Subra Poluru will not release it until the brake drums are on."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Fuel this month',
          action: '<eds-badge label="4,512 gal" variant="brand" pill></eds-badge>',
          body: `${sparkline(fuelTrend, 'Monthly gallons')}
            <p class="muted mb-0 mt-2">Priya Poluru flags anything over 50 gallons on a single ticket. ORB-740 hit 62.8 last night.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Tank average',
          action: '<eds-status label="Stable" variant="success" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="fuel-ring" value="68" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="68" max="100" label="68% across the book" show-value></eds-progress-bar>
              <p class="muted mb-0">Austin sits fuller than Dallas. Subbu Poluru wants 70% by shift change.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Units in motion</h2>
        <eds-link href="#/vehicles" variant="subtle">Board</eds-link>
      </div>
      ${vehicleGrid(vehicles.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Shop board',
          action: '<eds-link href="#/maintenance" variant="subtle">Work</eds-link>',
          body: shop
            .map(
              (item) => `
            <div class="work-row">
              <div>
                <strong>${item.vehicle} · ${item.title}</strong>
                <p class="muted mb-0">${item.owner} · ${item.shop} · due ${item.due}</p>
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
          action: '<eds-link href="#/inspections" variant="subtle">Inspections</eds-link>',
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
      { label: 'Kavya Poluru rolled ORB-104', description: 'Austin gate · pre-trip passed', timestamp: '06:42', icon: 'check' },
      { label: 'Maya Poluru on ORB-509', description: 'North loop · 6.1 hours', timestamp: '07:08', icon: 'user' },
      { label: 'Subra Poluru held ORB-412', description: 'Dallas bay 2 · drums', timestamp: '08:15', icon: 'alert-triangle' },
      { label: 'Ishaan Poluru queued ORB-851', description: 'DOT annual tomorrow', timestamp: '09:02', icon: 'clock' },
    ];
  }
  root.querySelector('#qa-assign')?.addEventListener('eds-click', () => document.querySelector('#assign-modal')?.show());
  root.querySelector('#qa-shop')?.addEventListener('eds-click', () => {
    window.location.hash = '#/maintenance';
  });
  root.querySelector('#shop-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Shop hold stays on the board', variant: 'info' });
  });
}
