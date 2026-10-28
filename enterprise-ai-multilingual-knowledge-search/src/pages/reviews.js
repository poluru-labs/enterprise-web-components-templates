import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Gap triage, glossary council, and locale launch sign-offs.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Launch checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Index" open>
            Articles indexed with correct locale tags and charset.
          </eds-accordion-item>
          <eds-accordion-item heading="Glossary">
            Term diffs approved against en-US master.
          </eds-accordion-item>
          <eds-accordion-item heading="Sign-off">
            Rohan Poluru query suite pass and zero red gaps.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
