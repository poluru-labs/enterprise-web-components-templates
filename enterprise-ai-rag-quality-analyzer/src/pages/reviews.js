import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Triage, citation audits, and index promotion for cycle 12.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Index promotion checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Suite" open>
            Query suite v3 pass on frozen gold labels.
          </eds-accordion-item>
          <eds-accordion-item heading="Index">
            Chunk coverage and freshness within SLO.
          </eds-accordion-item>
          <eds-accordion-item heading="Sign-off">
            Content owner attestation and zero red gates.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
