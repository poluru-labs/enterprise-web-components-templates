import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Lab reviews',
      lead: 'Triage sessions, baseline approvals, and release checkpoints for Nexus UI.',
    })}
    ${sheet({ title: 'Schedule', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Run checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Pre-merge" open>
            Unit and interaction specs green on the PR branch.
          </eds-accordion-item>
          <eds-accordion-item heading="Visual">
            Chromatic diff reviewed or baseline updated with owner sign-off.
          </eds-accordion-item>
          <eds-accordion-item heading="Release">
            Zero P1 failures and flake rate under 2% for 48 hours.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
