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

export function renderPipeline() {
  const columns = stages
    .map((stage) => {
      const cards = deals.filter((deal) => deal.stage === stage);
      const total = cards.reduce((sum, deal) => sum + deal.amount, 0);
      return `
        <section class="kanban-col" data-stage="${stage}">
          <header>
            <div>
              <h2>${stage}</h2>
              <p>${cards.length} · ${money(total)}</p>
            </div>
            <eds-badge label="${cards.length}" variant="${stage === 'Closed won' ? 'success' : 'brand'}" pill></eds-badge>
          </header>
          <div class="kanban-list" data-drop="${stage}">
            ${cards
              .map(
                (deal) => `
              <article class="kanban-card" draggable="true" data-id="${deal.id}">
                <a href="#/deal/${deal.id}">${deal.name}</a>
                <p>${deal.account}</p>
                <div class="kanban-meta">
                  <strong>${deal.value}</strong>
                  <span>${deal.probability}%</span>
                </div>
                <small>${deal.owner} · ${deal.close}</small>
              </article>`,
              )
              .join('')}
          </div>
        </section>`;
    })
    .join('');

  return `
    ${pageHeader({
      eyebrow: 'Board',
      title: 'Pipeline',
      lead: 'Drag deals between stages. Weighted pipeline and next steps stay in view.',
      actions: `
        <eds-button id="pipe-focus" variant="secondary" icon="filter">My deals</eds-button>
        <eds-button id="pipe-deal" variant="primary" icon="plus">New deal</eds-button>
      `,
    })}
    <div class="kanban" id="kanban">${columns}</div>
  `;
}

