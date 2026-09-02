import { alerts } from '../data/index.js';
import { pageHeader, statusChip } from '../components/widgets.js';

export function renderAlerts() {
  return `
    ${pageHeader({
      eyebrow: 'Thresholds',
      title: 'Alerts',
      lead: 'One red fulfillment breach, three amber watches, and a recovered NPS dip.',
      actions: `<eds-button id="alert-add" variant="primary" icon="plus">New alert</eds-button>`,
    })}
    <eds-alert variant="danger" title="Fulfillment SLA" message="Two regional hubs missed same-day cut-off. Rohan Poluru owns the recovery."></eds-alert>
    <div class="card-grid cols-2 mt-3">
      ${alerts
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.title}</h2>
            ${statusChip(item.severity)}
          </div>
          <p class="muted mb-2">${item.scorecard} · ${item.owner} · since ${item.since}</p>
          <p class="mb-0">${item.note}</p>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateAlerts(root) {
  root.querySelector('#alert-add')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.show());
}
