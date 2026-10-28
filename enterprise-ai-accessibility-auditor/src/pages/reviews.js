import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Reviews',
      title: 'Manual review calendar',
      lead: 'Walkthroughs, VPAT checkpoints, and standards syncs across Harbor Digital.',
    })}
    ${sheet({ title: 'Upcoming and recent', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Checklist template',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Keyboard" open>
            Tab order, focus visibility, escape routes, and skip links.
          </eds-accordion-item>
          <eds-accordion-item heading="Screen reader">
            Landmarks, headings, live regions, and form labels.
          </eds-accordion-item>
          <eds-accordion-item heading="Visual">
            Contrast, reflow, text spacing, and non-color cues.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
