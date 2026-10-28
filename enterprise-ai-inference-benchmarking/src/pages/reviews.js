import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Regression triage, capacity council, and harness workshops.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Capacity checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Harness" open>
            Full harness v3 pass on every blocking workload.
          </eds-accordion-item>
          <eds-accordion-item heading="Headroom">
            Compute and autoscale within finance-approved bounds.
          </eds-accordion-item>
          <eds-accordion-item heading="Sign-off">
            Anika Poluru attestation and zero red regressions.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
