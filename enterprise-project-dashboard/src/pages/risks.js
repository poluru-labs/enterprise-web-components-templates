import { risks } from '../data/index.js';
import { pageHeader, statusChip } from '../components/widgets.js';

export function renderRisks() {
  return `
    ${pageHeader({
      eyebrow: 'Register',
      title: 'Risks',
      lead: 'One red vendor feed, three amber reviews, and two green mitigation plans.',
    })}
    <eds-alert variant="danger" title="Nimbus SKU feed" message="Nightly sync missed twice. Retry queue is the mitigation owned by Nikhil Poluru."></eds-alert>
    <div class="card-grid cols-2 mt-3">
      ${risks
        .map(
          (risk) => `
        <content-card href="#/risks">
          <div slot="header" class="section-title">
            <h2>${risk.title}</h2>
            ${statusChip(risk.severity)}
          </div>
          <p class="muted mb-2">${risk.project} · ${risk.owner} · due ${risk.due}</p>
          <p class="mb-0">${risk.note}</p>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateRisks() {}
