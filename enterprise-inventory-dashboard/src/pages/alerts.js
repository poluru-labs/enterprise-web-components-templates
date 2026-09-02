import { alerts } from '../data/index.js';
import { pageHeader, statusChip } from '../components/widgets.js';

export function renderAlerts() {
  return `
    ${pageHeader({
      eyebrow: 'Thresholds',
      title: 'Alerts',
      lead: 'Four red reorder breaches, three amber watches, and one resolved cycle-count variance.',
      actions: `<eds-button id="alert-add" variant="primary" icon="plus">New alert</eds-button>`,
    })}
    <eds-alert variant="danger" title="Reorder point breach" message="Insulated bottle, LED headlamp, and solar charger are below reorder point. Meera Poluru and Devansh Poluru own replenishment."></eds-alert>
    <div class="card-grid cols-2 mt-3">
      ${alerts
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.title}</h2>
            ${statusChip(item.severity)}
          </div>
          <p class="muted mb-2">${item.location} · ${item.owner} · since ${item.since}</p>
          <p class="mb-0">${item.note}</p>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateAlerts(root) {
  root.querySelector('#alert-add')?.addEventListener('eds-click', () => document.querySelector('#order-modal')?.show());
}
