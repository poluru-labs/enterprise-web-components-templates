import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Finding triage, certification council, and schema workshops.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Certification checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Scan" open>
            Full ruleset v4.2 pass on latest partition.
          </eds-accordion-item>
          <eds-accordion-item heading="Controls">
            PII and referential checks within policy.
          </eds-accordion-item>
          <eds-accordion-item heading="Sign-off">
            Anika Poluru attestation and zero red findings.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
