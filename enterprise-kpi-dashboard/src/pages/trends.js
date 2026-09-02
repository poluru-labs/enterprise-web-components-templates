import { revenueTrend, scorecardTree } from '../data/index.js';
import { pageHeader, sheet, sparkline } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'History',
      title: 'Trends',
      lead: 'Twelve-month revenue, plus the operating tree. Open a scorecard from the tree.',
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        ${sheet({
          title: 'Revenue trajectory',
          body: `${sparkline(revenueTrend, 'Monthly revenue')}
            <p class="muted mb-0 mt-2">Steady climb from $12.8M. No month went backwards this fiscal year.</p>`,
        })}
        ${sheet({
          title: 'What changed',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="July" open>
                NRR crossed 115%. Harbor expansion added $640k.
              </eds-accordion-item>
              <eds-accordion-item heading="August">
                Fulfillment slipped two points. Product 1.8 shipped; adoption is slow.
              </eds-accordion-item>
              <eds-accordion-item heading="September outlook">
                Board pack freezes Thursday. Recovery plan for hubs is the only red item.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Scorecard tree',
          body: '<eds-tree-view id="trend-tree"></eds-tree-view>',
        })}
      </div>
    </section>
  `;
}

export function hydrateTrends(root) {
  const tree = root.querySelector('#trend-tree');
  if (tree) {
    tree.items = scorecardTree;
    tree.expandedIds = { company: true, run: true, platform: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
}
