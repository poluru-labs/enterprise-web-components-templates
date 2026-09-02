import { projects, projectColumns } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';
import { viewState } from './state.js';

export function renderProjects() {
  return `
    ${pageHeader({
      eyebrow: 'Portfolio',
      title: 'Projects',
      lead: 'Eight live engagements across Harbor, Lumen, Nimbus, Brightline, Oak, Cedar, River, and Fieldline.',
      actions: `
        <eds-split-button id="proj-split" variant="primary" icon="plus">
          New project
          <eds-menu-item slot="menu" label="New project" value="project" icon="folder"></eds-menu-item>
          <eds-menu-item slot="menu" label="New task" value="task" icon="check"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="project-search" placeholder="Search project or owner" clearable></eds-search>
        <eds-select id="project-status" label="Status"></eds-select>
        <eds-date-range-picker id="project-dates" label="Due window"></eds-date-range-picker>
      `)}
      <eds-data-table id="project-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'project-empty',
        heading: 'No projects match',
        description: 'Clear the owner search or status filter.',
        action: '<eds-button id="reset-projects" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="project-page" page="1" per-page="8"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateProjects(root) {
  const table = root.querySelector('#project-table');
  const empty = root.querySelector('#project-empty');
  const status = root.querySelector('#project-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'On track', value: 'On track' },
      { label: 'Watch', value: 'Watch' },
      { label: 'At risk', value: 'At risk' },
    ];
    status.value = 'all';
  }
  const paint = () => {
    const query = viewState.projectQuery.toLowerCase();
    const rows = projects
      .filter((item) => `${item.name} ${item.owner} ${item.client}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        name: item.name,
        client: item.client,
        owner: item.owner,
        status: item.status,
        health: `${item.health}%`,
        due: item.due,
        budget: item.budget,
        id: item.id,
      }));
    if (table) {
      table.columns = projectColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#project-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#project-search')?.addEventListener('eds-input', (event) => {
    viewState.projectQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-projects')?.addEventListener('eds-click', () => {
    viewState.projectQuery = '';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#proj-split')?.addEventListener('eds-click', () => document.querySelector('#project-modal')?.show());
  root.querySelector('#proj-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'task') document.querySelector('#task-modal')?.show();
    else document.querySelector('#project-modal')?.show();
  });
  table?.addEventListener('click', () => {
    window.location.hash = '#/project/prj_harbor';
  });
}
