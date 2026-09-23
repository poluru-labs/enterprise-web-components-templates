import { services } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderServices() {
  return `
    ${pageHeader({
      eyebrow: 'Catalog',
      title: 'Services',
      lead: 'The six services TechStar publishes to the business, each with a named owner and a live SLO.',
    })}
    <div class="card-grid">
      ${services
        .map(
          (item) => `
        <content-card href="#/availability">
          <div slot="header" class="section-title">
            <h2>${item.name}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.owner} · ${item.ci}</p>
          <eds-progress-bar value="${item.budget}" max="100" label="${item.actual}% vs ${item.slo}% SLO" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    ${sheet({
      title: 'Ownership',
      body: `<eds-description-list id="svc-meta" columns="3"></eds-description-list>
        <eds-divider label="note"></eds-divider>
        <p class="muted">A service stays in the catalog only while it has a living owner, a restore SLA, and a CI in the CMDB.</p>`,
    })}
  `;
}

export function hydrateServices(root) {
  const meta = root.querySelector('#svc-meta');
  if (meta) {
    meta.items = services.map((item) => ({ term: item.name, description: item.owner }));
  }
}
