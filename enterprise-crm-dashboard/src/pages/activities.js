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

export function renderActivities() {
  return `
    ${pageHeader({
      eyebrow: 'Cadence',
      title: 'Activities',
      lead: 'Calls, meetings, emails, and tasks that keep the book moving.',
      actions: `<eds-button id="log-activity" variant="primary" icon="plus">Log activity</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="activity-search" placeholder="Search title or person" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="activity-table" sortable striped compact></eds-data-table>
      </div>
    </section>
    ${dashGrid([
      dashCell(
        chartPanel({
          title: 'Mix this week',
          body: bars([40, 28, 22, 10], 'Calls, meetings, emails, tasks') + '<p class="muted mt-2 mb-0">40% calls · 28% meetings · 22% email · 10% tasks</p>',
        }),
        6,
      ),
      dashCell(
        `
        <section class="sheet">
          <div class="section-title"><h2>Due today</h2></div>
          <eds-list id="due-list" divided></eds-list>
        </section>`,
        6,
      ),
    ])}
  `;
}

