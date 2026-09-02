import { usageMeters, usageMonths } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline } from '../components/widgets.js';

export function renderUsage() {
  return `
    ${pageHeader({
      eyebrow: 'Meters',
      title: 'Usage',
      lead: 'API, seats, storage, and realtime. Adjust the window to compare the last cycle.',
      actions: `<eds-date-range-picker id="usage-range" label="Window"></eds-date-range-picker>`,
    })}
    <section class="row g-3 stretch-grid">
      ${usageMeters
        .map(
          (meter, index) => `
        <div class="col-md-6 col-xl-3">
          <eds-card padded class="sheet">
            <eds-stat id="use-${index}"></eds-stat>
            <eds-progress-bar class="mt-3" value="${meter.value}" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </section>
    <section class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-8">
        ${sheet({
          title: 'API calls',
          action: '<eds-badge label="Millions" variant="neutral" pill></eds-badge>',
          body: sparkline(usageMonths, 'API volume trend'),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Quota remaining',
          body: `
            <eds-circular-progress value="26" size="120" show-value></eds-circular-progress>
            <p class="muted mt-3 mb-0">26% of the Enterprise API pack remains this cycle.</p>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateUsage(root) {
  hydrateStats(
    root,
    usageMeters.map((item) => ({
      label: item.label,
      value: `${item.value}%`,
      hint: item.hint,
      trend: 'up',
      trendValue: '+2.1%',
    })),
    'use',
  );
}
