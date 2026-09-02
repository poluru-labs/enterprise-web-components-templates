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

export function renderForecast() {
  return `
    ${pageHeader({
      eyebrow: 'Quota',
      title: 'Forecast',
      lead: `Commit, best case, and remaining gap for ${currentUser.name} this quarter.`,
    })}
    ${statGrid(forecast, 'fc')}
    ${dashGrid([
      dashCell(
        chartPanel({
          title: 'Coverage vs quota',
          body:
            sparkline([0.72, 0.78, 0.81, 0.88, 0.94, 1.02, 1.1, 1.18, 1.22, 1.31, 1.36, 1.4], 'Pipeline coverage ratio') +
            '<p class="muted mb-0 mt-2">Coverage climbed from 0.72× to 1.4× as Harbor and Fieldwork entered late stage.</p>',
        }),
        8,
      ),
      dashCell(
        chartPanel({
          title: 'Category mix',
          body: `
            <div class="mix">
              <div><div class="d-flex justify-content-between"><strong>Commit</strong><span>$936k</span></div><div class="mix-track"><span style="width:78%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Best case</strong><span>$1.18M</span></div><div class="mix-track"><span style="width:98%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Pipeline</strong><span>$1.64M</span></div><div class="mix-track"><span style="width:100%"></span></div></div>
            </div>
          `,
        }),
        4,
      ),
    ])}
  `;
}

