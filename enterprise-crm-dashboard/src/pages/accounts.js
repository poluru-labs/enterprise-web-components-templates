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

export function renderAccounts() {
  return `
    ${pageHeader({
      eyebrow: 'Companies',
      title: 'Accounts',
      lead: 'Customer and prospect companies, health, and next steps.',
      actions: `<eds-button id="add-account" variant="primary" icon="plus">Add account</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="account-search" placeholder="Search account or owner" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="account-table" sortable striped compact></eds-data-table>
      </div>
    </section>
  `;
}

export function renderAccountDetail(id) {
  const account = accounts.find((item) => item.id === id) ?? accounts[0];
  return `
    ${pageHeader({
      eyebrow: 'Account',
      title: account.name,
      lead: `${account.industry} · ${account.region} · ${account.employees} employees`,
      actions: `
        <eds-button id="acc-deal" variant="primary" icon="plus">New deal</eds-button>
        <eds-button id="acc-note" variant="secondary" icon="edit">Add note</eds-button>
      `,
    })}
    ${dashGrid([
      dashCell(
        `
        <section class="sheet">
          <p class="mb-1">${statusChip(account.health)}</p>
          <eds-description-list id="acc-facts"></eds-description-list>
        </section>`,
        4,
      ),
      dashCell(
        `
        <section class="sheet">
          <eds-tabs>
            <eds-tab label="Deals" active>
              <eds-data-table id="acc-deals" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Contacts">
              <eds-data-table id="acc-contacts" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Activity">
              <eds-timeline id="acc-activity"></eds-timeline>
            </eds-tab>
          </eds-tabs>
        </section>`,
        8,
      ),
    ])}
  `;
}

