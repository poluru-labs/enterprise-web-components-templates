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

export function renderLeads() {
  return `
    ${pageHeader({
      eyebrow: 'Inbound',
      title: 'Leads',
      lead: 'Score, qualify, and convert marketing leads into opportunities.',
      actions: `
        <eds-button id="import-leads" variant="secondary" icon="upload">Import</eds-button>
        <eds-button id="add-lead" variant="primary" icon="plus">Add lead</eds-button>
      `,
    })}
    <section class="sheet">
      ${filterBar(`
        <eds-search id="lead-search" placeholder="Search name or company" clearable></eds-search>
        <eds-segmented-control id="lead-status"></eds-segmented-control>
      `)}
      <div class="mt-3">
        <eds-data-table id="lead-table" sortable striped compact></eds-data-table>
        <p id="lead-count" class="muted mt-3 mb-0"></p>
      </div>
    </section>
  `;
}

