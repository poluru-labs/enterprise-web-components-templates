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

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'RevOps',
      title: 'Reports',
      lead: 'Coverage, conversion, win/loss, and activity — ready for the weekly forecast call.',
    })}
    <div class="card-grid card-grid--6">
      ${reports
        .map(
          (item, index) => `
          <lyra-content-card>
            <span class="kicker">Report ${index + 1}</span>
            <h2 class="mt-2">${item.name}</h2>
            <p class="muted">${item.description}</p>
            <p class="muted">Owner ${item.owner} · ${item.updated}</p>
            <div class="inline-actions">
              <eds-button class="export-csv" variant="secondary" icon="download" data-name="${item.name}">CSV</eds-button>
              <eds-button class="export-pdf" variant="primary" icon="file" data-name="${item.name}">PDF</eds-button>
            </div>
          </lyra-content-card>`,
        )
        .join('')}
    </div>
  `;
}

