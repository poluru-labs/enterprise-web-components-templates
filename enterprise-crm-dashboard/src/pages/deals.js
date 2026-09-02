import {
  accountColumns,
  accounts,
  activities,
  activityColumns,
  activityFeed,
  agenda,
  atRisk,
  contactColumns,
  contacts,
  currentUser,
  dealColumns,
  deals,
  forecast,
  funnel,
  insights,
  kpis,
  leadColumns,
  leads,
  pipelineMonths,
  reports,
  sourceMix,
  stages,
  teamBoard,
  workspaceName,
} from '../data/index.js';
import {
  bars,
  chartPanel,
  dashCell,
  dashGrid,
  emptyState,
  filterBar,
  formSection,
  money,
  pageHeader,
  ring,
  sparkline,
  statGrid,
  statusChip,
} from '../components/widgets.js';
import { viewState } from './state.js';

export function renderDeals() {
  return `
    ${pageHeader({
      eyebrow: 'Opportunities',
      title: 'Deals',
      lead: 'Every open and closed opportunity, with saved views for the week.',
      actions: `
        <eds-button id="export-deals" variant="tertiary" icon="download">Export CSV</eds-button>
        <eds-button id="new-deal" variant="primary" icon="plus">New deal</eds-button>
      `,
    })}
    <section class="sheet">
      ${filterBar(`
        <eds-search id="deal-search" placeholder="Search deal or account" clearable></eds-search>
        <eds-segmented-control id="deal-view"></eds-segmented-control>
      `)}
      <div id="deal-table-wrap" class="mt-3">
        <eds-data-table id="deal-table" sortable striped compact></eds-data-table>
        <p id="deal-count" class="muted mt-3 mb-0"></p>
      </div>
      ${emptyState({
        id: 'deal-empty',
        heading: 'No deals match',
        description: 'Clear the view or search another account.',
        action: '<eds-button id="reset-deals" slot="actions" variant="primary">Reset filters</eds-button>',
      })}
    </section>
  `;
}

export function renderDealDetail(id) {
  const deal = deals.find((item) => item.id === id) ?? deals[0];
  const account = accounts.find((item) => item.id === deal.accountId);
  return `
    ${pageHeader({
      eyebrow: 'Deal',
      title: deal.name,
      lead: `${deal.account} · ${deal.value} · close ${deal.close}`,
      actions: `
        <eds-button id="deal-activity" variant="secondary" icon="calendar">Log activity</eds-button>
        <eds-button id="deal-advance" variant="primary" icon="check">Advance stage</eds-button>
      `,
    })}
    ${dashGrid([
      dashCell(
        `
        <section class="sheet">
          <div class="deal-hero mb-3">
            <span class="kicker">Amount</span>
            <strong>${deal.value}</strong>
            <div>${statusChip(deal.stage)} · ${deal.probability}% · ${deal.source}</div>
          </div>
          <eds-progress-bar value="${deal.probability}" max="100" label="Win probability" show-value></eds-progress-bar>
          <eds-description-list id="deal-facts" class="mt-3"></eds-description-list>
          <p class="muted mt-3 mb-0">Next step: ${deal.next}. Owner ${deal.owner}.</p>
        </section>
        <section class="sheet">
          <div class="section-title"><h2>Buying committee</h2></div>
          <eds-data-table id="deal-contacts" compact striped></eds-data-table>
        </section>`,
        8,
      ),
      dashCell(
        `
        <section class="sheet">
          <div class="section-title"><h2>Account</h2></div>
          <p class="mb-1"><strong>${account?.name ?? deal.account}</strong></p>
          <p class="muted mb-1">${account?.industry ?? '—'} · ${account?.region ?? '—'}</p>
          <p class="muted">Health ${account?.health ?? '—'} · ARR ${account?.arr ?? '—'}</p>
          <eds-link href="#/account/${deal.accountId}" variant="default">Open account</eds-link>
        </section>
        <section class="sheet">
          <div class="section-title"><h2>Timeline</h2></div>
          <eds-timeline id="deal-timeline"></eds-timeline>
        </section>`,
        4,
      ),
    ])}
  `;
}

