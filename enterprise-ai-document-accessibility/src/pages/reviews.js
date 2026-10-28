import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Reviews',
      title: 'Review calendar',
      lead: 'Triage, screen reader walkthroughs, and VPAT milestones.',
    })}
    ${sheet({ title: 'Schedule', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Manual checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Structure" open>
            Tags, bookmarks, language, and title metadata.
          </eds-accordion-item>
          <eds-accordion-item heading="Content">
            Headings, lists, tables, and link text in context.
          </eds-accordion-item>
          <eds-accordion-item heading="Non-text">
            Figure alt text, chart descriptions, and decorative artifacts.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
