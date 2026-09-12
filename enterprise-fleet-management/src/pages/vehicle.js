import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { inspections, vehicles, workOrders } from '../data/index.js';
import { formatNumber } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderVehicle(route) {
  const item = vehicles.find((entry) => entry.id === route.id) || vehicles[0];
  return `
    ${pageHeader({
      eyebrow: item.unit,
      title: item.make,
      lead: `${item.driver === '—' ? 'Unassigned' : item.driver} · ${item.yard} yard · ${formatNumber(item.miles)} miles. Next service ${item.nextService}.`,
      actions: `
        <eds-button id="vh-assign" variant="primary" icon="plus">Assign</eds-button>
        <eds-button id="vh-shop" variant="secondary" icon="check">Open shop</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Unit',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>Unit</dt><dd>${item.unit}</dd></div>
              <div><dt>Type</dt><dd>${item.type}</dd></div>
              <div><dt>Yard</dt><dd>${item.yard}</dd></div>
              <div><dt>Driver</dt><dd>${item.driver}</dd></div>
              <div><dt>Miles</dt><dd>${formatNumber(item.miles)}</dd></div>
              <div><dt>Fuel</dt><dd>${item.fuel}%</dd></div>
              <div><dt>VIN</dt><dd>${item.vin}</dd></div>
              <div><dt>Next service</dt><dd>${item.nextService}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru’s desk holds the packet. Subra Poluru owns the bay if the unit is in shop.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'History',
          body: '<eds-timeline id="vh-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydrateVehicle(root, route) {
  const item = vehicles.find((entry) => entry.id === route.id) || vehicles[0];
  const work = workOrders.filter((entry) => entry.vehicle === item.unit);
  const checks = inspections.filter((entry) => entry.vehicle === item.unit);
  const timeline = root.querySelector('#vh-timeline');
  if (timeline) {
    timeline.items = [
      { label: item.driver === '—' ? 'In the yard' : `Assigned to ${item.driver}`, description: item.yard, timestamp: 'Today', icon: 'user' },
      ...work.slice(0, 2).map((entry) => ({
        label: entry.title,
        description: `${entry.owner} · ${entry.shop}`,
        timestamp: entry.due,
        icon: 'check',
      })),
      ...checks.slice(0, 1).map((entry) => ({
        label: entry.type,
        description: entry.inspector,
        timestamp: entry.due,
        icon: 'file',
      })),
    ];
  }
  root.querySelector('#vh-assign')?.addEventListener('eds-click', () => document.querySelector('#assign-modal')?.show());
  root.querySelector('#vh-shop')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.unit} sent to Subra Poluru (demo)`, variant: 'info' });
    window.location.hash = '#/maintenance';
  });
}
