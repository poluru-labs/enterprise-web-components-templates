import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Standups, gate reviews, and release sign-offs for eval window 4.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Promotion checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Holdout" open>
            Metrics computed on frozen holdout with signed manifest.
          </eds-accordion-item>
          <eds-accordion-item heading="Shadow">
            Production agreement and latency within SLO for 72 hours.
          </eds-accordion-item>
          <eds-accordion-item heading="Governance">
            Model card updated and fairness attestation on file.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
