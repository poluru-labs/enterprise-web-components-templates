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

export function renderSearch() {
  return `
    ${pageHeader({
      eyebrow: 'Records',
      title: 'Search',
      lead: 'Find deals, accounts, contacts, and leads across the workspace.',
      actions: '<eds-button id="search-cmd" variant="secondary" icon="search">Command palette</eds-button>',
    })}
    <section class="sheet">
      ${filterBar('<eds-search id="global-record-search" placeholder="Search name, account, or owner" clearable></eds-search>')}
      <p id="search-meta" class="muted mt-3 mb-2"></p>
      <div id="search-results" class="search-results"></div>
      ${emptyState({
        id: 'search-empty',
        heading: 'No records match',
        description: 'Try another keyword or open the command palette with ⌘K.',
        action: '<eds-button id="search-reset" slot="actions" variant="primary">Clear search</eds-button>',
      })}
    </section>
  `;
}

