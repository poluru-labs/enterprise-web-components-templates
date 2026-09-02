import { people, taskColumns, tasks } from '../data/index.js';
import { emptyState, filterBar, pageHeader, taskGrid } from '../components/widgets.js';
import { viewState } from './state.js';

export function renderTasks() {
  return `
    ${pageHeader({
      eyebrow: 'Backlog',
      title: 'Tasks',
      lead: 'Filter by owner, status, or project. Fourteen cards across the sprint backlog.',
      actions: `<eds-button id="task-add" variant="primary" icon="plus">New task</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="task-search" placeholder="Search title or owner" clearable></eds-search>
        <eds-autocomplete id="task-owner-filter" label="Owner" placeholder="Poluru teammate"></eds-autocomplete>
        <eds-segmented-control id="task-status"></eds-segmented-control>
      `)}
      <eds-data-table id="task-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'task-empty',
        heading: 'No tasks match',
        description: 'Clear search or status to see the sprint backlog.',
        action: '<eds-button id="reset-tasks" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <section class="mt-3">
      ${taskGrid(tasks.slice(0, 6))}
    </section>
  `;
}

export function hydrateTasks(root) {
  const table = root.querySelector('#task-table');
  const empty = root.querySelector('#task-empty');
  const status = root.querySelector('#task-status');
  const owner = root.querySelector('#task-owner-filter');
  if (status) {
    status.options = [
      { label: 'All', value: 'all' },
      { label: 'To do', value: 'To do' },
      { label: 'Doing', value: 'In progress' },
      { label: 'Review', value: 'Review' },
      { label: 'Done', value: 'Done' },
    ];
    status.value = viewState.taskStatus;
  }
  if (owner) {
    owner.options = people.map((item) => ({ label: item.name, value: item.id }));
  }
  const paint = () => {
    const query = viewState.taskQuery.toLowerCase();
    const rows = tasks
      .filter((item) => `${item.title} ${item.owner} ${item.project}`.toLowerCase().includes(query))
      .filter((item) => {
        const value = status?.value || 'all';
        return value === 'all' || item.status === value;
      });
    if (table) {
      table.columns = taskColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#task-search')?.addEventListener('eds-input', (event) => {
    viewState.taskQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', (event) => {
    viewState.taskStatus = event.detail?.value ?? status.value;
    paint();
  });
  root.querySelector('#reset-tasks')?.addEventListener('eds-click', () => {
    viewState.taskQuery = '';
    viewState.taskStatus = 'all';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#task-add')?.addEventListener('eds-click', () => document.querySelector('#task-modal')?.show());
}
