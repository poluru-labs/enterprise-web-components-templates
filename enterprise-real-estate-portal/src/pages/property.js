import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { leases, properties, workOrders } from '../data/index.js';
import { formatCurrency, formatPercent } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { statusLabel } from '../lib/status.js';

export function renderProperty(route) {
  const item = properties.find((entry) => entry.id === route.id) || properties[0];
  return `
    ${pageHeader({
      eyebrow: item.code,
      title: item.name,
      lead: `${item.city} · ${statusLabel(item.type)}. ${item.pm} on site. ${formatPercent(item.occupancy, 0)} leased.`,
      actions: `
        <eds-button id="pr-wo" variant="primary" icon="plus">Log request</eds-button>
        <eds-button id="pr-leases" variant="secondary" icon="file">Leases</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Asset',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>Code</dt><dd>${item.code}</dd></div>
              <div><dt>Type</dt><dd>${statusLabel(item.type)}</dd></div>
              <div><dt>Manager</dt><dd>${item.pm}</dd></div>
              <div><dt>Units</dt><dd>${item.units}</dd></div>
              <div><dt>Occupied</dt><dd>${item.occupied}</dd></div>
              <div><dt>Occupancy</dt><dd>${formatPercent(item.occupancy, 0)}</dd></div>
              <div><dt>NOI</dt><dd>${formatCurrency(item.noi)}</dd></div>
              <div><dt>Asking</dt><dd>${formatCurrency(item.rent)}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru’s desk holds the packet. Subra Poluru owns the pad on multifamily.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'On this asset',
          body: '<eds-timeline id="pr-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydrateProperty(root, route) {
  const item = properties.find((entry) => entry.id === route.id) || properties[0];
  const siteLeases = leases.filter((entry) => entry.property === item.name).slice(0, 2);
  const siteWork = workOrders.filter((entry) => entry.property === item.name).slice(0, 2);
  const timeline = root.querySelector('#pr-timeline');
  if (timeline) {
    timeline.items = [
      { label: `${item.occupancy}% leased`, description: item.pm, timestamp: 'Today', icon: 'check' },
      ...siteLeases.map((entry) => ({
        label: `${entry.tenant} · ${entry.unit}`,
        description: entry.manager,
        timestamp: entry.end,
        icon: 'file',
      })),
      ...siteWork.map((entry) => ({
        label: entry.title,
        description: entry.reporter,
        timestamp: entry.date,
        icon: 'clock',
      })),
    ];
  }
  root.querySelector('#pr-wo')?.addEventListener('eds-click', () => document.querySelector('#wo-modal')?.show());
  root.querySelector('#pr-leases')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} opened on the roll`, variant: 'info' });
    window.location.hash = '#/leases';
  });
}
