import { projects, taskColumns, tasks } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderProject(route) {
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

export function hydrateProject(root, route) {
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
