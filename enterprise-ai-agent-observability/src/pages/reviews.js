import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Incident reviews, SLO checkpoints, and release sign-offs for week 43.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Release checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Runs" open>
            Canary success above 99.5% for 24 hours.
          </eds-accordion-item>
          <eds-accordion-item heading="Traces">
            No gaps on critical workflow paths.
          </eds-accordion-item>
          <eds-accordion-item heading="Sign-off">
            Elena Poluru attestation and zero red SLOs.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
