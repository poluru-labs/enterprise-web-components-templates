import { bars, cardGrid, chartPanel, contentCard, pageHeader, sparkline } from '../components/widgets.js';
import { analyticsPulse, revenueMonths } from '../data/index.js';

export function renderAnalytics() {
  return `
    ${pageHeader({
      eyebrow: 'Executive',
      title: 'Revenue analytics',
      lead: 'MRR, ARR, expansion, refunds, and plan mix — styled for board packs.',
    })}
    ${cardGrid(
      analyticsPulse.map(
        (item) => contentCard({
          title: item.label,
          body: `<p class="ledger-amount mb-1">${item.value}</p><p class="muted mb-0">${item.hint}</p>`,
        }),
      ),
    )}
    <div class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Revenue by month',
          action: '<eds-badge label="Net" variant="brand" pill></eds-badge>',
          body: sparkline(revenueMonths, 'Net revenue by month'),
        })}
      </div>
      <div class="col-lg-4">
        ${chartPanel({
          title: 'By plan',
          body: `
            <div class="region-mix">
              <div><div class="d-flex justify-content-between"><strong>Enterprise</strong><span>$36.6k MRR</span></div><div class="region-track"><span style="width:44%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Scale</strong><span>$15.2k</span></div><div class="region-track"><span style="width:28%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Growth</strong><span>$11.0k</span></div><div class="region-track"><span style="width:18%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Starter</strong><span>$3.6k</span></div><div class="region-track"><span style="width:10%"></span></div></div>
            </div>
          `,
        })}
      </div>
    </div>
    <div class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'By region',
          body: bars([46, 31, 23], 'Americas, EMEA, APAC') + '<p class="muted mt-2 mb-0">Americas 46% · EMEA 31% · APAC 23%</p>',
        })}
      </div>
      <div class="col-lg-6">
        ${contentCard({
          title: 'Movement',
          body: '<eds-description-list id="rev-move"></eds-description-list>',
        })}
      </div>
    </div>
  `;
}

export function hydrateAnalytics(root) {
  const move = root.querySelector('#rev-move');
  if (move) {
    move.items = [
      { term: 'MRR', description: '$186.4k' },
      { term: 'ARR', description: '$2.24M' },
      { term: 'New / expansion', description: '+$12.6k' },
      { term: 'Churned', description: '-$3.1k' },
      { term: 'Refunds', description: '$1.24k' },
      { term: 'Net new', description: '+$9.5k' },
    ];
    move.columns = 2;
  }
}
