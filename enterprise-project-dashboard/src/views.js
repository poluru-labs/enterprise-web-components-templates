import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  activity,
  apiSnippet,
  boardColumns,
  currentUser,
  gantt,
  kpis,
  people,
  projectColumns,
  projects,
  reports,
  risks,
  sprints,
  taskColumns,
  tasks,
  timeColumns,
  timesheets,
  throughput,
  workspace,
  workspaceTree,
} from './data.js';
import {
  emptyState,
  filterBar,
  hydrateStats,
  pageHeader,
  sheet,
  sparkline,
  statGrid,
  statusChip,
  statusFor,
} from './ui.js';

export const viewState = {
  projectQuery: '',
  taskQuery: '',
  taskStatus: 'all',
};

export function renderView(route) {
  const views = {
    overview: renderOverview,
    projects: renderProjects,
    project: renderProject,
    board: renderBoard,
    timeline: renderTimeline,
    tasks: renderTasks,
    sprints: renderSprints,
    team: renderTeam,
    risks: renderRisks,
    time: renderTime,
    reports: renderReports,
    settings: renderSettings,
  };
  return (views[route.name] || renderOverview)(route);
}

function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: `${workspace.sprint}`,
      title: 'Delivery pulse',
      lead: `Good evening, ${currentUser.name.split(' ')[0]}. Harbor is in review, Nimbus needs a retry queue, and Sprint 24 is 92% complete.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-task" variant="primary" icon="plus">New task</eds-button>
        <eds-button id="qa-board" variant="secondary" icon="star">Open board</eds-button>
      `,
    })}
    <eds-alert id="risk-alert" variant="warning" dismissible title="One amber dependency" message="Nimbus Inventory missed two nightly SKU syncs. Nikhil Poluru opened a retry queue for Sprint 25."></eds-alert>
    ${statGrid(kpis.slice(0, 4), 'kpi')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Throughput',
          action: '<eds-badge label="12 sprints" variant="brand" pill></eds-badge>',
          body: `${sparkline(throughput, 'Story points completed per sprint')}
            <p class="muted mb-0 mt-2">71 points last sprint. Quality held while Harbor checkout moved into review.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Sprint 24',
          action: '<eds-status label="Active" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="sprint-ring" value="92" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="24" max="26" label="24 of 26 points" show-value></eds-progress-bar>
              <p class="muted mb-0">Closes Friday. Two points sit in review with Kavya Poluru.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/risks" variant="subtle">Risks</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Projects',
          action: '<eds-link href="#/projects" variant="subtle">All</eds-link>',
          body: '<eds-data-table id="recent-projects" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Recent activity',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Capacity',
          body: `
            <eds-meter id="cap-meter" min="0" max="100" value="76" label="Studio booked"></eds-meter>
            <eds-divider></eds-divider>
            <p class="muted mb-2">Platform 85% · Experience 70% · Field 60%</p>
            <div class="tag-row">
              <eds-tag label="Legal wait" variant="warning" dismissible></eds-tag>
              <eds-tag label="SKU feed" variant="danger" dismissible></eds-tag>
              <eds-tag label="a11y review" variant="brand"></eds-tag>
            </div>`,
        })}
      </div>
    </section>
  `;
}

function renderProjects() {
  return `
    ${pageHeader({
      eyebrow: 'Portfolio',
      title: 'Projects',
      lead: 'Six live engagements across Harbor, Lumen, Nimbus, Brightline, Oak, and Fieldline.',
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
      <div id="project-loading" class="stack" hidden>
        <eds-spinner size="md" label="Loading portfolio" show-label></eds-spinner>
        <eds-skeleton variant="text" lines="4"></eds-skeleton>
      </div>
      <eds-data-table id="project-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'project-empty',
        heading: 'No projects match',
        description: 'Clear the owner search or status filter.',
        action: '<eds-button id="reset-projects" slot="actions" variant="primary">Reset</eds-button>',
      })}
      <div class="table-foot">
        <eds-pagination id="project-page" page="1" per-page="6"></eds-pagination>
      </div>
    </eds-card>
  `;
}

function renderProject(route) {
  const project = projects.find((item) => item.id === route.id) ?? projects[0];
  const related = tasks.filter((item) => item.project === project.name);
  return `
    ${pageHeader({
      eyebrow: project.client,
      title: project.name,
      lead: `Owned by ${project.owner}. ${project.squad} squad · ${project.type} · due ${project.due}.`,
      actions: `
        <eds-button id="open-board" variant="secondary" icon="star">Board</eds-button>
        <eds-button id="add-task" variant="primary" icon="plus">Add task</eds-button>
      `,
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="Plan" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">Health</span>
                  <p class="hero-metric">${project.health}%</p>
                  ${statusChip(project.status)}
                </div>
                <eds-progress-bar value="${project.health}" max="100" label="Delivery health" show-value></eds-progress-bar>
              </div>
              <eds-divider></eds-divider>
              <eds-data-table id="project-tasks" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Notes">
              <p>Scope is the ${project.client} ${project.type.toLowerCase()} workstream. Risks and dependencies live on the register. ${project.owner} holds the weekly with Fieldline.</p>
              <eds-textarea label="Standup note" rows="4" placeholder="What moved, what is stuck, who needs a look."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="project-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Related',
          body: `<p class="muted">${related.length} open cards on this project.</p>
            <eds-link href="#/board" variant="default">Open the board</eds-link>`,
        })}
      </div>
    </section>
  `;
}

function renderBoard() {
  return `
    ${pageHeader({
      eyebrow: 'Sprint 24',
      title: 'Board',
      lead: 'Harbor, Lumen, and Brightline cards in flight. Drag is visual only in this demo.',
      actions: `
        <eds-button-group>
          <eds-button id="board-filter" variant="secondary" icon="filter">Filter</eds-button>
          <eds-button id="board-add" variant="primary" icon="plus">Card</eds-button>
        </eds-button-group>
      `,
    })}
    <div class="board-grid">
      ${boardColumns
        .map((column) => {
          const cards = tasks.filter((item) => item.column === column.id);
          return `
            <section class="board-col">
              <header>
                <h2>${column.label}</h2>
                <eds-badge label="${cards.length}" variant="neutral" pill></eds-badge>
              </header>
              ${cards
                .map(
                  (card) => `
                <article class="board-card">
                  <div class="board-card-top">
                    ${statusChip(card.status)}
                    <eds-avatar name="${card.owner}" size="xs"></eds-avatar>
                  </div>
                  <strong>${card.title}</strong>
                  <span>${card.project} · ${card.points} pts · ${card.due}</span>
                </article>`,
                )
                .join('')}
            </section>`;
        })
        .join('')}
    </div>
  `;
}

function renderTimeline() {
  return `
    ${pageHeader({
      eyebrow: 'Roadmap',
      title: 'Timeline',
      lead: 'Aug through November. Harbor lands first; Fieldline Mobile runs longest.',
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        ${sheet({
          title: 'Delivery calendar',
          body: `
            <div class="gantt" role="img" aria-label="Project timeline">
              ${gantt
                .map(
                  (row) => `
                <div class="gantt-row">
                  <span>${row.name}</span>
                  <div class="gantt-track">
                    <i class="tone-${row.tone}" style="margin-left:${row.start}%;width:${row.width}%"></i>
                  </div>
                </div>`,
                )
                .join('')}
            </div>`,
        })}
        ${sheet({
          title: 'Milestones',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="September" open>
                Harbor checkout live, Nimbus retry queue, Lumen consent copy.
              </eds-accordion-item>
              <eds-accordion-item heading="October">
                Brightline tokens v2 and Oak storefront templates.
              </eds-accordion-item>
              <eds-accordion-item heading="November">
                Fieldline Mobile 1.8 and App Store review.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Portfolio tree',
          body: '<eds-tree-view id="timeline-tree"></eds-tree-view>',
        })}
      </div>
    </section>
  `;
}

function renderTasks() {
  return `
    ${pageHeader({
      eyebrow: 'Backlog',
      title: 'Tasks',
      lead: 'Filter by owner, status, or project. Assign work without leaving the ledger.',
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
  `;
}

function renderSprints() {
  return `
    ${pageHeader({
      eyebrow: 'Cadence',
      title: 'Sprints',
      lead: 'Two-week delivery slices. Sprint 24 closes Friday; 25 is in planning.',
    })}
    <div class="row g-3">
      ${sprints
        .map(
          (sprint, index) => `
        <div class="col-lg-6">
          <eds-card padded>
            <div class="section-title">
              <h2>${sprint.name}</h2>
              ${statusChip(sprint.status)}
            </div>
            <p class="muted">${sprint.range} · ${sprint.focus}</p>
            <eds-progress-bar value="${sprint.done}" max="${sprint.planned}" label="${sprint.done} / ${sprint.planned} points" show-value></eds-progress-bar>
            ${index === 2 ? '<eds-circular-progress class="mt-3" value="92" max="100" size="96" stroke-width="7" show-value></eds-circular-progress>' : ''}
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderTeam() {
  return `
    ${pageHeader({
      eyebrow: 'People',
      title: 'Team',
      lead: 'Everyone on the roster is a Poluru. Capacity is booked through Sprint 25.',
    })}
    <div class="row g-3">
      ${people
        .map(
          (person) => `
        <div class="col-md-6 col-xl-4">
          <eds-card padded>
            <div class="person-card">
              <eds-avatar name="${person.name}" size="md"></eds-avatar>
              <div>
                <strong>${person.name}</strong>
                <p class="muted mb-1">${person.role} · ${person.squad}</p>
                <eds-rating value="${person.rating}" readonly size="sm"></eds-rating>
              </div>
            </div>
            <eds-progress-bar class="mt-3" value="${person.capacity}" max="100" label="${person.capacity}% booked" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

function renderRisks() {
  return `
    ${pageHeader({
      eyebrow: 'Register',
      title: 'Risks',
      lead: 'One red vendor feed, two amber reviews, and a green design cover plan.',
    })}
    <eds-alert variant="danger" title="Nimbus SKU feed" message="Nightly sync missed twice. Retry queue is the mitigation owned by Nikhil Poluru."></eds-alert>
    <div class="stack mt-3">
      ${risks
        .map(
          (risk) => `
        <eds-card padded>
          <div class="section-title">
            <h2>${risk.title}</h2>
            ${statusChip(risk.severity)}
          </div>
          <p class="muted mb-2">${risk.project} · ${risk.owner} · due ${risk.due}</p>
          <p class="mb-0">${risk.note}</p>
        </eds-card>`,
        )
        .join('')}
    </div>
  `;
}

function renderTime() {
  return `
    ${pageHeader({
      eyebrow: 'Week of 25 Aug',
      title: 'Time',
      lead: 'Hours by person and project. Submit before Friday 16:00 Chicago.',
      actions: `<eds-button id="log-time" variant="primary" icon="plus">Log hours</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-date-picker id="time-day" label="Day"></eds-date-picker>
        <eds-time-picker id="time-from" label="From"></eds-time-picker>
        <eds-number-input id="time-hours" label="Hours" value="6" min="0" max="12" step="0.5"></eds-number-input>
        <eds-checkbox id="time-billable" label="Billable" checked></eds-checkbox>
      `)}
      <eds-data-table id="time-table" striped compact></eds-data-table>
    </eds-card>
  `;
}

function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Exports',
      title: 'Reports',
      lead: 'Burndown, capacity, risks, and time — download or pipe through the API.',
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${reports
          .map(
            (item) => `
          <eds-card padded class="mb-3">
            <div class="section-title">
              <h2>${item.name}</h2>
              <eds-badge label="${item.format}" variant="neutral" pill></eds-badge>
            </div>
            <p class="muted">Owner ${item.owner} · ${item.updated}</p>
            <eds-button-group>
              <eds-button class="export-csv" variant="secondary" icon="download" data-name="${item.name}">CSV</eds-button>
              <eds-button class="export-pdf" variant="primary" icon="file" data-name="${item.name}">PDF</eds-button>
            </eds-button-group>
          </eds-card>`,
          )
          .join('')}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Project API',
          body: `<eds-code-snippet id="api-snippet" language="json"></eds-code-snippet>
            <eds-file-upload class="mt-3" label="Upload a CSV export" accept=".csv,.xlsx" hint="Used for capacity imports."></eds-file-upload>`,
        })}
      </div>
    </div>
  `;
}

function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Studio profile, density, notifications, and delivery defaults.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Studio profile',
          body: `
            <eds-input label="Workspace" value="${workspace.name}" icon="folder"></eds-input>
            <eds-input class="mt-3" label="Timezone" value="${workspace.timezone}"></eds-input>
            <eds-select id="set-region" label="Region"></eds-select>
            <eds-slider class="mt-3" id="wip-limit" label="WIP limit" min="3" max="12" value="6" show-value></eds-slider>
            <eds-switch class="mt-3" label="Require estimates on new tasks" checked></eds-switch>
            <eds-switch class="mt-3" label="Friday time reminders" checked></eds-switch>`,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Preferences',
          body: `
            <eds-radio-group id="density" label="Density" name="density" value="comfortable">
              <eds-radio value="comfortable" label="Comfortable"></eds-radio>
              <eds-radio value="compact" label="Compact"></eds-radio>
            </eds-radio-group>
            <eds-pin-input class="mt-3" id="staff-pin" length="4" type="number" label="Staff PIN"></eds-pin-input>
            <p class="muted mt-3 mb-1">Shortcut to jump anywhere</p>
            <eds-kbd keys="⌘K"></eds-kbd>
            <div class="mt-3">
              <eds-button id="save-settings" variant="primary" icon="check">Save</eds-button>
            </div>`,
        })}
      </div>
    </div>
  `;
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) {
    hydrateStats(root, kpis.slice(0, 4), 'kpi');
    const period = root.querySelector('#dash-period');
    if (period) {
      period.options = [
        { label: 'Sprint', value: 'sprint' },
        { label: '30d', value: '30d' },
        { label: 'Q3', value: 'q3' },
      ];
      period.value = 'sprint';
    }
    const watch = root.querySelector('#watch-list');
    if (watch) {
      watch.items = [
        { label: 'SKU feed downtime', description: 'Nikhil Poluru · Nimbus', icon: 'alert-triangle', href: '#/risks' },
        { label: 'Cart accessibility', description: 'Kavya Poluru · Harbor', icon: 'eye', href: '#/board' },
        { label: 'Consent copy', description: 'Elena Poluru · Lumen', icon: 'file', href: '#/project/prj_lumen' },
      ];
    }
    const recent = root.querySelector('#recent-projects');
    if (recent) {
      recent.columns = projectColumns.filter((col) => ['name', 'owner', 'status', 'due'].includes(col.key));
      recent.rows = projects.slice(0, 4).map((item) => ({
        name: item.name,
        owner: item.owner,
        status: item.status,
        due: item.due,
      }));
    }
    const timeline = root.querySelector('#overview-timeline');
    if (timeline) timeline.items = activity;
    root.querySelector('#qa-task')?.addEventListener('eds-click', () => document.querySelector('#task-modal')?.show());
    root.querySelector('#qa-board')?.addEventListener('eds-click', () => {
      window.location.hash = '#/board';
    });
    root.querySelector('#risk-alert')?.addEventListener('eds-dismiss', () => {
      showToast({ message: 'Risk reminder dismissed', variant: 'info' });
    });
    recent?.addEventListener('click', () => {
      window.location.hash = '#/project/prj_harbor';
    });
    root.querySelectorAll('eds-tag').forEach((tag) => {
      tag.addEventListener('eds-dismiss', () => tag.remove());
    });
  }

  if (route.name === 'projects') {
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

  if (route.name === 'project') {
    const project = projects.find((item) => item.id === route.id) ?? projects[0];
    const facts = root.querySelector('#project-facts');
    if (facts) {
      facts.items = [
        { term: 'Owner', description: project.owner },
        { term: 'Client', description: project.client },
        { term: 'Squad', description: project.squad },
        { term: 'Type', description: project.type },
        { term: 'Budget', description: `${project.spent} of ${project.budget}` },
        { term: 'Due', description: project.due },
      ];
    }
    const table = root.querySelector('#project-tasks');
    if (table) {
      table.columns = taskColumns.filter((col) => ['title', 'owner', 'status', 'due'].includes(col.key));
      table.rows = tasks.filter((item) => item.project === project.name);
    }
    root.querySelector('#open-board')?.addEventListener('eds-click', () => {
      window.location.hash = '#/board';
    });
    root.querySelector('#add-task')?.addEventListener('eds-click', () => document.querySelector('#task-modal')?.show());
  }

  if (route.name === 'board') {
    root.querySelector('#board-add')?.addEventListener('eds-click', () => document.querySelector('#task-modal')?.show());
    root.querySelector('#board-filter')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
  }

  if (route.name === 'timeline') {
    const tree = root.querySelector('#timeline-tree');
    if (tree) {
      tree.items = workspaceTree;
      tree.expandedIds = { delivery: true, craft: true, field: true };
    }
    tree?.addEventListener('eds-select', (event) => {
      const href = event.detail?.item?.href ?? event.detail?.href;
      if (href) window.location.hash = href;
    });
  }

  if (route.name === 'tasks') {
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
      const rows = tasks.filter((item) => `${item.title} ${item.owner} ${item.project}`.toLowerCase().includes(query)).filter((item) => {
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

  if (route.name === 'time') {
    const table = root.querySelector('#time-table');
    if (table) {
      table.columns = timeColumns;
      table.rows = timesheets.map((row) => ({
        ...row,
      }));
    }
    root.querySelector('#log-time')?.addEventListener('eds-click', () => {
      showToast({ message: '6 hours logged to Harbor Checkout', variant: 'success' });
    });
  }

  if (route.name === 'reports') {
    const snippet = root.querySelector('#api-snippet');
    if (snippet) snippet.code = apiSnippet;
    root.querySelectorAll('.export-csv, .export-pdf').forEach((button) => {
      button.addEventListener('eds-click', () => {
        showToast({ message: `${button.dataset.name} queued`, variant: 'success' });
      });
    });
  }

  if (route.name === 'settings') {
    const region = root.querySelector('#set-region');
    if (region) {
      region.options = [
        { label: 'Americas', value: 'americas' },
        { label: 'EMEA', value: 'emea' },
        { label: 'APAC', value: 'apac' },
      ];
      region.value = 'americas';
    }
    root.querySelector('#density')?.addEventListener('eds-change', (event) => {
      const value = event.detail?.value ?? 'comfortable';
      setDensity(value);
      showToast({ message: `Density set to ${value}`, variant: 'info' });
    });
    root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
      showToast({ message: 'Workspace settings saved', variant: 'success' });
    });
  }
}
