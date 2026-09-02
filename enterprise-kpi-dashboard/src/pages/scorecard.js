import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
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

export function hydrateScorecard(root, route) {
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
