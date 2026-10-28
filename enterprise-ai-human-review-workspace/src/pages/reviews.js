import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Standups, rubric council, and calibration sessions.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Cycle sign-off',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Calibration" open>
            Gold-set agreement above floor for every active queue.
          </eds-accordion-item>
          <eds-accordion-item heading="SLA">
            No queue past breach threshold for 48 hours.
          </eds-accordion-item>
          <eds-accordion-item heading="Attestation">
            Dev Poluru rubric sign-off and zero red escalations.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
