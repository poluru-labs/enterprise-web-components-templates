import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { currentUser, kpis, revenueTrend, reviews, scorecards, workspace } from '../data/index.js';
import { cadenceList, healthMix, hydrateStats, pageHeader, scorecardGrid, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Company pulse',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Revenue is ahead of plan. Fulfillment is the only red scorecard.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-alert" variant="primary" icon="plus">New alert</eds-button>
        <eds-button id="qa-scorecards" variant="secondary" icon="star">Scorecards</eds-button>
      `,
    })}
    <eds-alert id="ops-alert" variant="warning" dismissible title="Operations is red" message="Fulfillment SLA is 95.4% against a 98% target. Rohan Poluru opened a hub recovery plan for next week."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Revenue',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(revenueTrend, 'Trailing twelve months of revenue')}
            <p class="muted mb-0 mt-2">$18.4M year to date. Q3 plan is $19.2M. Expansion from Harbor and Lumen is the lift.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Plan attainment',
          action: '<eds-status label="Ahead" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="plan-ring" value="96" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="18.4" max="19.2" label="$18.4M of $19.2M" show-value></eds-progress-bar>
              <p class="muted mb-0">Nine days left in the quarter. Cash conversion is the watch.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Scorecards</h2>
        <eds-link href="#/scorecards" variant="subtle">All</eds-link>
      </div>
      ${scorecardGrid(scorecards.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/alerts" variant="subtle">Alerts</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent scorecards',
          action: '<eds-link href="#/scorecards" variant="subtle">Portfolio</eds-link>',
          body: '<eds-data-table id="recent-cards" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Review cadence',
          action: `
            <div class="inline-actions">
              <eds-badge label="This week" variant="brand" pill></eds-badge>
              <eds-link href="#/reviews" variant="subtle">All</eds-link>
            </div>`,
          body: cadenceList(reviews),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Health mix',
          action: '<eds-link href="#/scorecards" variant="subtle">Scorecards</eds-link>',
          body: healthMix(scorecards),
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis, 'kpi');
  const period = root.querySelector('#dash-period');
  if (period) {
    period.options = [
      { label: 'Week', value: 'week' },
      { label: 'Q3', value: 'q3' },
      { label: 'FY26', value: 'fy' },
    ];
    period.value = 'q3';
  }
  const watch = root.querySelector('#watch-list');
  if (watch) {
    watch.items = [
      { label: 'Fulfillment SLA', description: 'Rohan Poluru · Operations', icon: 'alert-triangle', href: '#/alerts' },
      { label: '1.8 adoption', description: 'Nikhil Poluru · Product', icon: 'eye', href: '#/scorecard/sc_product' },
      { label: 'Board pack', description: 'Mira Poluru · Thursday', icon: 'file', href: '#/reviews' },
      { label: 'SOC 2 evidence', description: 'Anika Poluru · Security', icon: 'folder', href: '#/alerts' },
    ];
  }
  const recent = root.querySelector('#recent-cards');
  if (recent) {
    recent.columns = [
      { key: 'name', label: 'Scorecard' },
      { key: 'owner', label: 'Owner' },
      { key: 'status', label: 'Status' },
      { key: 'health', label: 'Health' },
    ];
    recent.rows = scorecards.slice(0, 4).map((item) => ({
      name: item.name,
      owner: item.owner,
      status: item.status,
      health: `${item.health}%`,
    }));
  }
  root.querySelector('#qa-alert')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.show());
  root.querySelector('#qa-scorecards')?.addEventListener('eds-click', () => {
    window.location.hash = '#/scorecards';
  });
  root.querySelector('#ops-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Operations reminder dismissed', variant: 'info' });
  });
  recent?.addEventListener('click', () => {
    window.location.hash = '#/scorecard/sc_finance';
  });
}
