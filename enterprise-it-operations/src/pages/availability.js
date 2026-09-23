import { availabilityTrend, services } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid, statusChip } from '../components/widgets.js';

const sloKpis = [
  { label: 'Composite SLO', value: '99.94%', hint: 'Six published services', trend: 'flat', trendValue: 'Hold' },
  { label: 'Error budget', value: '72%', hint: 'Identity remaining', trend: 'down', trendValue: '−6 pts' },
  { label: 'In service', value: '5 / 6', hint: 'VDI on watch', trend: 'flat', trendValue: 'Watch' },
  { label: 'Status page', value: '1', hint: 'Identity degraded', trend: 'down', trendValue: 'P1' },
];

export function renderAvailability() {
  return `
    ${pageHeader({
      eyebrow: 'SLOs',
      title: 'Service availability',
      lead: 'Published services, error budgets, and the live status of Identity, Payments, Email, VPN, HRIS, and VDI.',
      actions: `<eds-link href="#/services">Open catalog</eds-link>`,
    })}
    ${statGrid(sloKpis, 'slo')}
    <div class="split">
      ${sheet({
        title: 'Availability, 12 weeks',
        action: '<eds-badge label="99.94%" variant="success" pill></eds-badge>',
        body: sparkline(availabilityTrend, 'Service availability'),
      })}
      ${sheet({
        title: 'Identity error budget',
        body: `<eds-circular-progress value="72" max="100" show-value></eds-circular-progress>
          <p class="muted mt-4">Elena Poluru owns Identity. The P1 on id-sso-prod-01 is burning budget this window.</p>`,
      })}
    </div>
    <section class="slo-grid" aria-label="Services">
      ${services
        .map(
          (item) => `
        <content-card href="#/services">
          <div class="slo-card">
            <div class="section-title">
              <h2>${item.name}</h2>
              ${statusChip(item.status)}
            </div>
            <eds-stat value="${item.actual}%" label="vs ${item.slo}% SLO" hint="${item.owner}"></eds-stat>
            <eds-progress-bar value="${item.budget}" max="100" label="${item.budget}% budget left" show-value></eds-progress-bar>
          </div>
        </content-card>`,
        )
        .join('')}
    </section>
  `;
}

export function hydrateAvailability(root) {
  hydrateStats(root, sloKpis, 'slo');
}
