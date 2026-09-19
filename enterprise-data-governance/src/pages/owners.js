import { people } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderOwners() {
  return `
    ${pageHeader({
      eyebrow: 'Ownership',
      title: 'Named owners and stewards',
      lead: 'Every gold asset has a person who answers for it. Coverage is 97% this week.',
      actions: `<eds-button variant="primary" icon="user" id="assign-owner">Assign owner</eds-button>`,
    })}
    <div class="people-grid">
      ${people
        .map(
          (person) => `
        <content-card>
          <div class="person-card">
            <div class="person-head">
              <eds-avatar name="${person.name}" size="md"></eds-avatar>
              <div>
                <strong>${person.name}</strong>
                <small>${person.role}</small>
              </div>
              ${statusChip(person.score >= 90 ? 'Certified' : 'Watch')}
            </div>
            <eds-rating value="${person.rating}" max="5" readonly size="sm"></eds-rating>
            <eds-progress-bar value="${person.score}" max="100" label="${person.score}% stewardship" show-value></eds-progress-bar>
            <p class="asset-meta">${person.squad} · ${person.assets} assets</p>
          </div>
        </content-card>`,
        )
        .join('')}
    </div>
    ${sheet({
      title: 'Coverage',
      body: `<eds-description-list id="owner-meta" columns="3"></eds-description-list>
        <eds-accordion class="mt-4">
          <eds-accordion-item heading="What a named owner signs">
            <p>The owner confirms purpose, classification, and a steward. Gold assets cannot stay certified without a living owner.</p>
          </eds-accordion-item>
          <eds-accordion-item heading="When coverage drops">
            <p>If an owner leaves, the steward holds the asset in watch until Mira Poluru names a replacement.</p>
          </eds-accordion-item>
        </eds-accordion>`,
    })}
  `;
}

export function hydrateOwners(root) {
  const meta = root.querySelector('#owner-meta');
  if (meta) {
    meta.items = [
      { term: 'People', description: String(people.length) },
      { term: 'Average score', description: `${Math.round(people.reduce((sum, item) => sum + item.score, 0) / people.length)}%` },
      { term: 'Assets covered', description: String(people.reduce((sum, item) => sum + item.assets, 0)) },
    ];
  }
  root.querySelector('#assign-owner')?.addEventListener('eds-click', () => document.querySelector('#owner-modal')?.show());
}
