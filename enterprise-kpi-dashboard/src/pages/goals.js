import { goalColumns, goals, people } from '../data/index.js';
import { emptyState, filterBar, pageHeader, statusChip } from '../components/widgets.js';

export const viewState = {
  goalQuery: '',
};

export function renderGoals() {
  return `
    ${pageHeader({
      eyebrow: 'OKRs',
      title: 'Goals',
      lead: 'Company goals for Q3 and year end. Fulfillment is the stretch that is slipping.',
      actions: `<eds-button id="goal-add" variant="primary" icon="plus">New goal</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="goal-search" placeholder="Search goal or owner" clearable></eds-search>
        <eds-autocomplete id="goal-owner" label="Owner" placeholder="Poluru teammate"></eds-autocomplete>
        <eds-segmented-control id="goal-status"></eds-segmented-control>
      `)}
      <eds-data-table id="goal-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'goal-empty',
        heading: 'No goals match',
        description: 'Clear search or status to see the company set.',
        action: '<eds-button id="reset-goals" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${goals
        .slice(0, 8)
        .map(
          (goal) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${goal.name}</h2>
            ${statusChip(goal.status)}
          </div>
          <p class="muted">${goal.owner} · ${goal.scorecard}</p>
          <eds-progress-bar value="${goal.progress}" max="100" label="${goal.progress}%" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateGoals(root) {
  const table = root.querySelector('#goal-table');
  const empty = root.querySelector('#goal-empty');
  const status = root.querySelector('#goal-status');
  const owner = root.querySelector('#goal-owner');
  if (status) {
    status.options = [
      { label: 'All', value: 'all' },
      { label: 'On track', value: 'On track' },
      { label: 'Watch', value: 'Watch' },
      { label: 'At risk', value: 'At risk' },
    ];
    status.value = 'all';
  }
  if (owner) owner.options = people.map((item) => ({ label: item.name, value: item.name }));
  const paint = () => {
    const query = viewState.goalQuery.toLowerCase();
    const rows = goals
      .filter((item) => `${item.name} ${item.owner}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        ...item,
        progress: `${item.progress}%`,
      }));
    if (table) {
      table.columns = goalColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#goal-search')?.addEventListener('eds-input', (event) => {
    viewState.goalQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-goals')?.addEventListener('eds-click', () => {
    viewState.goalQuery = '';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#goal-add')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.show());
}
