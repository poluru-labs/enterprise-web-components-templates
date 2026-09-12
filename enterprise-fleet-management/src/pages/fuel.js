import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { fuelLogs, fuelTrend } from '../data/index.js';
import { formatCurrency, formatNumber } from '../lib/format.js';
import { pageHeader, sheet, sparkline } from '../components/widgets.js';

export function renderFuel() {
  const gallons = fuelLogs.reduce((sum, item) => sum + item.gallons, 0);
  const spend = fuelLogs.reduce((sum, item) => sum + item.cost, 0);
  return `
    ${pageHeader({
      eyebrow: 'Tanks',
      title: 'Fuel',
      lead: `Priya Poluru’s book. ${formatNumber(gallons)} gallons and ${formatCurrency(spend)} on the last eight tickets.`,
      actions: '<eds-button id="fuel-export" variant="secondary" icon="download">Export</eds-button>',
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        ${sheet({
          title: 'Gallons by week',
          action: '<eds-badge label="YTD" variant="brand" pill></eds-badge>',
          body: `${sparkline(fuelTrend, 'Weekly gallons')}
            <p class="muted mb-0 mt-2">Linehaul still takes the heavy tickets. Subbu Poluru reviews anything over 50 gallons.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Exceptions',
          body: `
            <div class="work-row"><div><strong>ORB-740</strong><p class="muted mb-0">Rohan Poluru · 62.8 gal</p></div><eds-badge label="Watch" variant="warning" pill></eds-badge></div>
            <div class="work-row"><div><strong>ORB-218</strong><p class="muted mb-0">Arjun Poluru · 34.2 gal</p></div><eds-badge label="OK" variant="success" pill></eds-badge></div>
            <div class="work-row"><div><strong>ORB-412</strong><p class="muted mb-0">Shop fill · 8.2 gal</p></div><eds-badge label="Shop" variant="info" pill></eds-badge></div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'Recent tickets',
        body: `
          <table class="fuel-table">
            <thead>
              <tr><th>When</th><th>Unit</th><th>Driver</th><th>Gallons</th><th>Cost</th><th>MPG</th><th>Yard</th></tr>
            </thead>
            <tbody>
              ${fuelLogs
                .map(
                  (item) => `
                <tr>
                  <td>${item.when}</td>
                  <td>${item.vehicle}</td>
                  <td>${item.driver}</td>
                  <td>${item.gallons}</td>
                  <td>${formatCurrency(item.cost)}</td>
                  <td>${item.mpg}</td>
                  <td>${item.yard}</td>
                </tr>`,
                )
                .join('')}
            </tbody>
          </table>`,
      })}
    </section>
  `;
}

export function hydrateFuel(root) {
  root.querySelector('#fuel-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Fuel export is a demo in this template', variant: 'info' });
  });
}
