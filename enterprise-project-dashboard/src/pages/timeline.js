import { gantt, workspaceTree } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderTimeline() {
  return `
    ${pageHeader({
      eyebrow: 'Roadmap',
      title: 'Timeline',
      lead: 'August through November. Harbor and Cedar land first; Fieldline Mobile runs longest.',
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        ${sheet({
          title: 'Delivery calendar',
          body: `
            <div class="gantt" role="img" aria-label="Project timeline">
              ${gantt
                .map(
                  (row) => `
                <div class="gantt-row">
                  <span>${row.name}</span>
                  <div class="gantt-track">
                    <i class="tone-${row.tone}" style="margin-left:${row.start}%;width:${row.width}%"></i>
                  </div>
                </div>`,
                )
                .join('')}
            </div>`,
        })}
        ${sheet({
          title: 'Milestones',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="September" open>
                Harbor checkout live, Nimbus retry queue, Cedar ETL, Lumen consent copy.
              </eds-accordion-item>
              <eds-accordion-item heading="October">
                Brightline tokens v2, Oak storefront templates, River audit exports.
              </eds-accordion-item>
              <eds-accordion-item heading="November">
                Fieldline Mobile 1.8 and App Store review.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Portfolio tree',
          body: '<eds-tree-view id="timeline-tree"></eds-tree-view>',
        })}
      </div>
    </section>
  `;
}

export function hydrateTimeline(root) {
  const tree = root.querySelector('#timeline-tree');
  if (tree) {
    tree.items = workspaceTree;
    tree.expandedIds = { delivery: true, craft: true, field: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
}
