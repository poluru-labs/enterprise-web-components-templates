import { planCards, subscriptionColumns, subscriptions, upcomingRenewals } from '../data/index.js';
import { bars, cardGrid, chartPanel, contentCard, filterBar, hydrateStats, pageHeader, statGrid } from '../components/widgets.js';

export const subViewState = { subStatus: 'all' };

export function renderSubscriptions() {
  return `
    ${pageHeader({
      eyebrow: 'Recurring',
      title: 'Subscriptions',
      lead: 'Plans, trials, renewals, and lifecycle movement across the book.',
    })}
    ${statGrid(planCards, 'plan')}
    <section class="sheet mt-3">
      ${filterBar(`<eds-segmented-control id="sub-status"></eds-segmented-control>`)}
      <div class="mt-3">
        <eds-data-table id="sub-table" sortable striped compact></eds-data-table>
      </div>
    </section>
    <div class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'Lifecycle',
          body: bars([72, 11, 8, 9], 'Active, trial, past due, cancelled') + '<p class="muted mt-2 mb-0">72% active · 11% trial · 8% past due · 9% cancelled</p>',
        })}
      </div>
      <div class="col-lg-6">
        ${contentCard({
          title: 'This week',
          body: '<eds-list id="sub-moves" divided></eds-list>',
        })}
      </div>
    </div>
    <h2 class="section-kicker">Upcoming renewals</h2>
    ${cardGrid(
      upcomingRenewals.map(
        (item) => contentCard({
          title: item.customer,
          body: `
            <p class="muted mb-1">${item.plan} · renews ${item.renews}</p>
            <p class="ledger-amount mb-0">${item.mrr} MRR</p>
          `,
        }),
      ),
    )}
  `;
}

export function hydrateSubscriptions(root) {
  hydrateStats(root, planCards, 'plan');
  const table = root.querySelector('#sub-table');
  const paint = () => {
    if (!table) return;
    table.columns = subscriptionColumns;
    table.rows =
      subViewState.subStatus === 'all'
        ? subscriptions
        : subscriptions.filter((row) => row.status.toLowerCase() === subViewState.subStatus);
  };
  const seg = root.querySelector('#sub-status');
  if (seg) {
    seg.options = [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Past due', value: 'past due' },
      { label: 'Cancelled', value: 'cancelled' },
      { label: 'Trial', value: 'trial' },
    ];
    seg.value = 'all';
    seg.addEventListener('eds-change', (event) => {
      subViewState.subStatus = (event.detail?.value ?? 'all').toLowerCase();
      paint();
    });
  }
  paint();
  const list = root.querySelector('#sub-moves');
  if (list) {
    list.items = [
      { label: 'Kite Studio entered trial', description: 'Starter · 14 days', icon: 'star' },
      { label: 'Nimbus Retail past due', description: 'Scale · ACH return', icon: 'alert-triangle' },
      { label: 'Harbor & Co. renewed', description: 'Enterprise annual', icon: 'check' },
      { label: 'Cedar Analytics upgraded', description: 'Scale · +$960 MRR', icon: 'graph-up' },
    ];
  }
}
