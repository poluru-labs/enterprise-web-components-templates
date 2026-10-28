import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Gap triage, independent reruns, and cohort sign-offs.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Sign-off checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Artifacts" open>
            Hashes match registered bundle on every rerun.
          </eds-accordion-item>
          <eds-accordion-item heading="Protocol">
            Logged steps align with preregistered protocol v2.4.
          </eds-accordion-item>
          <eds-accordion-item heading="Attestation">
            Sahana Poluru review and zero red gaps.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
