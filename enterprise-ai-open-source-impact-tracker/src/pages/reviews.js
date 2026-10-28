import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Exception triage, legal review, and maintainer community sessions.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Board readout checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Catalog" open>
            Full catalog v2 scan on every blocking project.
          </eds-accordion-item>
          <eds-accordion-item heading="Impact">
            Contributions and adopter growth within program targets.
          </eds-accordion-item>
          <eds-accordion-item heading="Sign-off">
            Anika Poluru attestation and zero red exceptions.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
