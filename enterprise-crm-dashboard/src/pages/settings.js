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

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Team, pipeline stages, notifications, and forecast categories.',
    })}
    ${dashGrid([
      dashCell(
        formSection({
          title: 'Workspace',
          body: `
            <eds-input label="Workspace name" value="${workspaceName}" icon="edit"></eds-input>
            <eds-input label="Fiscal year" value="FY26"></eds-input>
            <eds-select id="currency" label="Currency"></eds-select>
          `,
        }),
        6,
      ),
      dashCell(
        formSection({
          title: 'Pipeline',
          body: `
            <eds-switch label="Require next step on every open deal" checked></eds-switch>
            <eds-switch label="Warn when a deal is idle 14 days" checked></eds-switch>
            <eds-switch label="Auto-create follow-up after a meeting" checked></eds-switch>
            <eds-input label="Default cycle length" value="45 days"></eds-input>
          `,
        }),
        6,
      ),
      dashCell(
        formSection({
          title: 'Notifications',
          body: `
            <eds-switch label="Daily digest of due activities" checked></eds-switch>
            <eds-switch label="Slack #revenue on closed-won" checked></eds-switch>
            <eds-switch label="Alert owner when a champion goes quiet" checked></eds-switch>
            <eds-button id="save-settings" variant="primary" icon="save">Save settings</eds-button>
          `,
        }),
        6,
      ),
      dashCell(
        formSection({
          title: 'You',
          body: `
            <eds-input label="Name" value="${currentUser.name}"></eds-input>
            <eds-input label="Role" value="${currentUser.role}"></eds-input>
            <eds-input label="Quota" value="${currentUser.quota}"></eds-input>
          `,
        }),
        6,
      ),
    ])}
  `;
}

