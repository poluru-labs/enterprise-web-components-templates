import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Guild rituals',
      lead: 'Token council, critiques, office hours, and release checkpoints.',
    })}
    ${sheet({ title: 'Schedule', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Contribution checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Proposal" open>
            Figma spec, API sketch, and migration notes attached to the change request.
          </eds-accordion-item>
          <eds-accordion-item heading="Implementation">
            Web component, tests, and Storybook stories in enterprise-design-system-wc.
          </eds-accordion-item>
          <eds-accordion-item heading="Publish">
            Changelog, token diff, and adoption announcement from Rohan Poluru.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
