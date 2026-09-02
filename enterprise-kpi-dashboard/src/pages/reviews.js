import { reviews } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';
import { showToast } from '@poluru-labs/enterprise-design-system-wc';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Cadence',
      title: 'Reviews',
      lead: 'The weekly ritual. Board pack freezes Thursday at 16:00 Chicago.',
    })}
    <section class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'This week',
          body: '<eds-timeline id="review-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Next session',
          body: `
            <eds-date-picker id="review-day" label="Date"></eds-date-picker>
            <eds-time-picker class="mt-3" id="review-time" label="Start"></eds-time-picker>
            <eds-checkbox class="mt-3" id="review-board" label="Include board appendix" checked></eds-checkbox>
            <eds-button class="mt-3" id="schedule-review" variant="primary">Hold the slot</eds-button>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateReviews(root) {
  const timeline = root.querySelector('#review-timeline');
  if (timeline) timeline.items = reviews;
  root.querySelector('#schedule-review')?.addEventListener('eds-click', () => {
    showToast({ message: 'Review held on the calendar', variant: 'success' });
  });
}
