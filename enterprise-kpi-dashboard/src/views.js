import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  alerts,
  apiSnippet,
  benchmarkColumns,
  benchmarks,
  currentUser,
  goalColumns,
  goals,
  kpis,
  metricColumns,
  metricRows,
  people,
  reports,
  reviews,
  revenueTrend,
  scorecardColumns,
  scorecards,
  scorecardTree,
  workspace,
} from './data.js';
import {
  emptyState,
  filterBar,
  hydrateStats,
  pageHeader,
  sheet,
  sparkline,
  statGrid,
  statusChip,
} from './ui.js';

export const viewState = {
  scorecardQuery: '',
  goalQuery: '',
};

export function renderView(route) {
  const views = {
    overview: renderOverview,
    scorecards: renderScorecards,
    scorecard: renderScorecard,
    goals: renderGoals,
    trends: renderTrends,
    teams: renderTeams,
    alerts: renderAlerts,
    reviews: renderReviews,
    benchmarks: renderBenchmarks,
    reports: renderReports,
    settings: renderSettings,
  };
  return (views[route.name] || renderOverview)(route);
}

function renderOverview() {
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
    ${statGrid(kpis.slice(0, 4), 'kpi')}
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
          title: 'Scorecards',
          action: '<eds-link href="#/scorecards" variant="subtle">All</eds-link>',
          body: '<eds-data-table id="recent-cards" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Review cadence',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Health mix',
          body: `
            <eds-meter id="health-meter" min="0" max="100" value="83" label="Portfolio health"></eds-meter>
            <eds-divider></eds-divider>
            <p class="muted mb-2">5 on track · 1 watch · 1 at risk</p>
            <div class="tag-row">
              <eds-tag label="Fulfillment" variant="danger" dismissible></eds-tag>
              <eds-tag label="Adoption" variant="warning" dismissible></eds-tag>
              <eds-tag label="NRR" variant="brand"></eds-tag>
            </div>`,
        })}
      </div>
    </section>
  `;
}

function renderScorecards() {
  return `
    ${pageHeader({
      eyebrow: 'Portfolio',
      title: 'Scorecards',
      lead: 'Six operating scorecards. Finance and Customer are green. Operations needs a recovery week.',
      actions: `
        <eds-split-button id="card-split" variant="primary" icon="plus">
          New scorecard
          <eds-menu-item slot="menu" label="New scorecard" value="card" icon="star"></eds-menu-item>
          <eds-menu-item slot="menu" label="New alert" value="alert" icon="bell"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="card-search" placeholder="Search name or owner" clearable></eds-search>
        <eds-select id="card-status" label="Status"></eds-select>
        <eds-date-range-picker id="card-dates" label="Updated"></eds-date-range-picker>
      `)}
      <div id="card-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading scorecards" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="card-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'card-empty',
        heading: 'No scorecards match',
        description: 'Clear the owner search or status filter.',
        action: '<eds-button id="reset-cards" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="card-page" page="1" per-page="6"></eds-pagination>
      </div>
    </eds-card>
  `;
}

function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: card.focus,
      title: card.name,
      lead: `Owned by ${card.owner}. ${card.kpis} metrics · updated ${card.updated}.`,
      actions: `
        <eds-button id="open-alerts" variant="secondary" icon="bell">Alerts</eds-button>
        <eds-button id="add-alert" variant="primary" icon="plus">Add alert</eds-button>
      `,
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="Metrics" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">Health</span>
                  <p class="hero-metric">${card.health}%</p>
                  ${statusChip(card.status)}
                </div>
                <eds-progress-bar value="${card.health}" max="100" label="Scorecard health" show-value></eds-progress-bar>
              </div>
              <eds-divider></eds-divider>
              <eds-data-table id="metric-table" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Notes">
              <p>${card.name} is the weekly source of truth for ${card.focus.toLowerCase()}. ${card.owner} presents in the Monday review.</p>
              <eds-textarea label="Review note" rows="4" placeholder="What moved, what is off plan, who owns the next action."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="card-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Related',
          body: `<p class="muted mb-2">Goals and alerts for this scorecard.</p>
            <eds-link href="#/goals" variant="default">Open goals</eds-link>`,
        })}
      </div>
    </section>
  `;
}

function renderGoals() {
  return `
    ${pageHeader({
      eyebrow: 'OKRs',
      title: 'Goals',
      lead: 'Company goals for Q3 and year end. Fulfillment is the stretch that is slipping.',
      actions: `<eds-button id="goal-add" variant="primary" icon="plus">New goal</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="goal-search" placeholder="Search goal or owner" clearable></eds-search>
        <eds-autocomplete id="goal-owner" label="Owner" placeholder="Poluru teammate"></eds-autocomplete>
        <eds-segmented-control id="goal-status"></eds-segmented-control>
      `)}
      <eds-data-table id="goal-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'goal-empty',
        heading: 'No goals match',
        description: 'Clear search or status to see the company set.',
        action: '<eds-button id="reset-goals" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="row g-3 mt-1">
      ${goals
        .slice(0, 3)
        .map(
          (goal) => `
        <div class="col-lg-4">
          <eds-card padded>
            <div class="section-title">
              <h2>${goal.name}</h2>
              ${statusChip(goal.status)}
            </div>
            <p class="muted">${goal.owner} · ${goal.scorecard}</p>
            <eds-progress-bar value="${goal.progress}" max="100" label="${goal.progress}%" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderTrends() {
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

function renderTeams() {
  return `
    ${pageHeader({
      eyebrow: 'Owners',
      title: 'Teams',
      lead: 'Every scorecard owner is a Poluru. Scores are this week’s health, not a performance grade.',
    })}
    <div class="row g-3">
      ${people
        .map(
          (person) => `
        <div class="col-md-6 col-xl-4">
          <eds-card padded>
            <div class="person-card">
              <eds-avatar name="${person.name}" size="md"></eds-avatar>
              <div>
                <strong>${person.name}</strong>
                <p class="muted mb-1">${person.role} · ${person.squad}</p>
                <eds-rating value="${person.rating}" readonly size="sm"></eds-rating>
              </div>
            </div>
            <eds-progress-bar class="mt-3" value="${person.score}" max="100" label="${person.score} health" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderAlerts() {
  return `
    ${pageHeader({
      eyebrow: 'Thresholds',
      title: 'Alerts',
      lead: 'One red fulfillment breach, two amber watches, and a recovered NPS dip.',
      actions: `<eds-button id="alert-add" variant="primary" icon="plus">New alert</eds-button>`,
    })}
    <eds-alert variant="danger" title="Fulfillment SLA" message="Two regional hubs missed same-day cut-off. Rohan Poluru owns the recovery."></eds-alert>
    <div class="stack mt-3">
      ${alerts
        .map(
          (item) => `
        <eds-card padded>
          <div class="section-title">
            <h2>${item.title}</h2>
            ${statusChip(item.severity)}
          </div>
          <p class="muted mb-2">${item.scorecard} · ${item.owner} · since ${item.since}</p>
          <p class="mb-0">${item.note}</p>
        </eds-card>`,
        )
        .join('')}
    </div>
  `;
}

function renderReviews() {
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

function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Peers',
      title: 'Benchmarks',
      lead: 'Clearline versus the peer median. Fulfillment is the only lagging line.',
    })}
    <eds-card padded>
      <eds-data-table id="bench-table" sortable striped></eds-data-table>
    </eds-card>
  `;
}

function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Exports',
      title: 'Reports',
      lead: 'Board pack, scorecards, goals, and peer set — download or call the API.',
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${reports
          .map(
            (item) => `
          <eds-card padded class="mb-3">
            <div class="section-title">
              <h2>${item.name}</h2>
              <eds-badge label="${item.format}" variant="neutral" pill></eds-badge>
            </div>
            <p class="muted">Owner ${item.owner} · ${item.updated}</p>
            <eds-button-group>
              <eds-button class="export-csv" variant="secondary" icon="download" data-name="${item.name}">CSV</eds-button>
              <eds-button class="export-pdf" variant="primary" icon="file" data-name="${item.name}">PDF</eds-button>
            </eds-button-group>
          </eds-card>`,
          )
          .join('')}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Scorecard API',
          body: `<eds-code-snippet id="api-snippet" language="json"></eds-code-snippet>
            <eds-file-upload class="mt-3" label="Upload a CSV import" accept=".csv,.xlsx" hint="Used for peer benchmarks."></eds-file-upload>`,
        })}
      </div>
    </div>
  `;
}

function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Company profile, density, and how Signal behaves when the sidebar is closed.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Company profile',
          body: `
            <eds-input label="Workspace" value="${workspace.name}" icon="folder"></eds-input>
            <eds-input class="mt-3" label="Timezone" value="${workspace.timezone}"></eds-input>
            <eds-select id="set-region" label="Region"></eds-select>
            <eds-slider class="mt-3" id="alert-band" label="Amber band (%)" min="5" max="20" value="8" show-value></eds-slider>
            <eds-switch class="mt-3" label="Start in full width" checked></eds-switch>
            <eds-switch class="mt-3" label="Friday review reminder" checked></eds-switch>`,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Preferences',
          body: `
            <eds-radio-group id="density" label="Density" name="density" value="comfortable">
              <eds-radio value="comfortable" label="Comfortable"></eds-radio>
              <eds-radio value="compact" label="Compact"></eds-radio>
            </eds-radio-group>
            <eds-pin-input class="mt-3" id="staff-pin" length="4" type="number" label="Staff PIN"></eds-pin-input>
            <p class="muted mt-3 mb-1">Jump to a scorecard</p>
            <eds-kbd keys="⌘K"></eds-kbd>
            <div class="mt-3">
              <eds-button id="save-settings" variant="primary" icon="check">Save</eds-button>
            </div>`,
        })}
      </div>
    </div>
  `;
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) {
    hydrateStats(root, kpis.slice(0, 4), 'kpi');
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
      ];
    }
    const recent = root.querySelector('#recent-cards');
    if (recent) {
      recent.columns = scorecardColumns.filter((col) => ['name', 'owner', 'status', 'health'].includes(col.key));
      recent.rows = scorecards.slice(0, 4).map((item) => ({
        name: item.name,
        owner: item.owner,
        status: item.status,
        health: `${item.health}%`,
      }));
    }
    const timeline = root.querySelector('#overview-timeline');
    if (timeline) timeline.items = reviews;
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
    root.querySelectorAll('eds-tag').forEach((tag) => {
      tag.addEventListener('eds-dismiss', () => tag.remove());
    });
  }

  if (route.name === 'scorecards') {
    const table = root.querySelector('#card-table');
    const empty = root.querySelector('#card-empty');
    const status = root.querySelector('#card-status');
    if (status) {
      status.options = [
        { label: 'All statuses', value: 'all' },
        { label: 'On track', value: 'On track' },
        { label: 'Watch', value: 'Watch' },
        { label: 'At risk', value: 'At risk' },
      ];
      status.value = 'all';
    }
    const paint = () => {
      const query = viewState.scorecardQuery.toLowerCase();
      const rows = scorecards
        .filter((item) => `${item.name} ${item.owner}`.toLowerCase().includes(query))
        .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
        .map((item) => ({
          name: item.name,
          owner: item.owner,
          status: item.status,
          health: `${item.health}%`,
          kpis: item.kpis,
          updated: item.updated,
          id: item.id,
        }));
      if (table) {
        table.columns = scorecardColumns;
        table.rows = rows;
      }
      if (empty) empty.hidden = rows.length > 0;
      const pager = root.querySelector('#card-page');
      if (pager) pager.total = Math.max(rows.length, 1);
    };
    paint();
    root.querySelector('#card-search')?.addEventListener('eds-input', (event) => {
      viewState.scorecardQuery = event.detail?.value ?? '';
      paint();
    });
    status?.addEventListener('eds-change', paint);
    root.querySelector('#reset-cards')?.addEventListener('eds-click', () => {
      viewState.scorecardQuery = '';
      if (status) status.value = 'all';
      paint();
    });
    root.querySelector('#card-split')?.addEventListener('eds-click', () => document.querySelector('#scorecard-modal')?.show());
    root.querySelector('#card-split')?.addEventListener('eds-select', (event) => {
      if (event.detail?.value === 'alert') document.querySelector('#alert-modal')?.show();
      else document.querySelector('#scorecard-modal')?.show();
    });
    table?.addEventListener('click', () => {
      window.location.hash = '#/scorecard/sc_finance';
    });
  }

  if (route.name === 'scorecard') {
    const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
    const facts = root.querySelector('#card-facts');
    if (facts) {
      facts.items = [
        { term: 'Owner', description: card.owner },
        { term: 'Focus', description: card.focus },
        { term: 'Metrics', description: String(card.kpis) },
        { term: 'Updated', description: card.updated },
        { term: 'Status', description: card.status },
        { term: 'Health', description: `${card.health}%` },
      ];
    }
    const table = root.querySelector('#metric-table');
    if (table) {
      table.columns = metricColumns;
      table.rows = metricRows;
    }
    root.querySelector('#open-alerts')?.addEventListener('eds-click', () => {
      window.location.hash = '#/alerts';
    });
    root.querySelector('#add-alert')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.show());
  }

  if (route.name === 'goals') {
    const table = root.querySelector('#goal-table');
    const empty = root.querySelector('#goal-empty');
    const status = root.querySelector('#goal-status');
    const owner = root.querySelector('#goal-owner');
    if (status) {
      status.options = [
        { label: 'All', value: 'all' },
        { label: 'On track', value: 'On track' },
        { label: 'Watch', value: 'Watch' },
        { label: 'At risk', value: 'At risk' },
      ];
      status.value = 'all';
    }
    if (owner) owner.options = people.map((item) => ({ label: item.name, value: item.name }));
    const paint = () => {
      const query = viewState.goalQuery.toLowerCase();
      const rows = goals
        .filter((item) => `${item.name} ${item.owner}`.toLowerCase().includes(query))
        .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
        .map((item) => ({
          ...item,
          progress: `${item.progress}%`,
        }));
      if (table) {
        table.columns = goalColumns;
        table.rows = rows;
      }
      if (empty) empty.hidden = rows.length > 0;
    };
    paint();
    root.querySelector('#goal-search')?.addEventListener('eds-input', (event) => {
      viewState.goalQuery = event.detail?.value ?? '';
      paint();
    });
    status?.addEventListener('eds-change', paint);
    root.querySelector('#reset-goals')?.addEventListener('eds-click', () => {
      viewState.goalQuery = '';
      if (status) status.value = 'all';
      paint();
    });
    root.querySelector('#goal-add')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.show());
  }

  if (route.name === 'trends') {
    const tree = root.querySelector('#trend-tree');
    if (tree) {
      tree.items = scorecardTree;
      tree.expandedIds = { company: true, run: true };
    }
    tree?.addEventListener('eds-select', (event) => {
      const href = event.detail?.item?.href ?? event.detail?.href;
      if (href) window.location.hash = href;
    });
  }

  if (route.name === 'alerts') {
    root.querySelector('#alert-add')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.show());
  }

  if (route.name === 'reviews') {
    const timeline = root.querySelector('#review-timeline');
    if (timeline) timeline.items = reviews;
    root.querySelector('#schedule-review')?.addEventListener('eds-click', () => {
      showToast({ message: 'Review held on the calendar', variant: 'success' });
    });
  }

  if (route.name === 'benchmarks') {
    const table = root.querySelector('#bench-table');
    if (table) {
      table.columns = benchmarkColumns;
      table.rows = benchmarks;
    }
  }

  if (route.name === 'reports') {
    const snippet = root.querySelector('#api-snippet');
    if (snippet) snippet.code = apiSnippet;
    root.querySelectorAll('.export-csv, .export-pdf').forEach((button) => {
      button.addEventListener('eds-click', () => {
        showToast({ message: `${button.dataset.name} queued`, variant: 'success' });
      });
    });
  }

  if (route.name === 'settings') {
    const region = root.querySelector('#set-region');
    if (region) {
      region.options = [
        { label: 'Americas', value: 'americas' },
        { label: 'EMEA', value: 'emea' },
        { label: 'APAC', value: 'apac' },
      ];
      region.value = 'americas';
    }
    root.querySelector('#density')?.addEventListener('eds-change', (event) => {
      const value = event.detail?.value ?? 'comfortable';
      setDensity(value);
      showToast({ message: `Density set to ${value}`, variant: 'info' });
    });
    root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
      showToast({ message: 'Workspace settings saved', variant: 'success' });
    });
  }
}
