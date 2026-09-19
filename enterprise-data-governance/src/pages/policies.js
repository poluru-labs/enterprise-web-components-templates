import { policies } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderPolicies() {
  return `
    ${pageHeader({
      eyebrow: 'Policies',
      title: 'What gold must satisfy',
      lead: 'Named owners, masking, access SLAs, and lineage on certified assets.',
    })}
    <div class="card-grid">
      ${policies
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.name}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.scope}</p>
          <p class="asset-meta">${item.owner} · Updated ${item.updated}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    ${sheet({
      title: 'How policies apply',
      body: `<eds-accordion>
        <eds-accordion-item heading="Named owner required">
          <p>Mira Poluru will not certify a gold asset without a living owner and a steward.</p>
        </eds-accordion-item>
        <eds-accordion-item heading="PII masking">
          <p>Anika Poluru requires masked copies of PII columns in every environment below production.</p>
        </eds-accordion-item>
        <eds-accordion-item heading="Access SLA">
          <p>Rohan Poluru measures read requests against two business days. Exceptions go to Mira Poluru.</p>
        </eds-accordion-item>
      </eds-accordion>`,
    })}
  `;
}

export function hydratePolicies() {}
