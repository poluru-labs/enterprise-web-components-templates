import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  activity,
  capacity,
  currentUser,
  kpis,
  people,
  projectColumns,
  projects,
  throughput,
  workspace,
} from '../data/index.js';
import {
  activityList,
  capacityMix,
  hydrateStats,
  pageHeader,
  projectGrid,
  sheet,
  sparkline,
  statGrid,
} from '../components/widgets.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.sprint,
      title: 'Delivery pulse',
      lead: `Good evening, ${currentUser.name.split(' ')[0]}. Harbor is in review, Nimbus needs a retry queue, and Sprint 34 is 79% complete with four days left.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-task" variant="primary" icon="plus">New task</eds-button>
        <eds-button id="qa-board" variant="secondary" icon="star">Open board</eds-button>
      `,
    })}
    <eds-alert id="risk-alert" variant="warning" dismissible title="Two amber dependencies" message="Nimbus Inventory missed two nightly SKU syncs. Cedar data residency is in legal review."></eds-alert>
    ${statGrid(kpis.slice(0, 4), 'kpi')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Throughput',
          action: '<eds-badge label="14 sprints" variant="brand" pill></eds-badge>',
          body: `${sparkline(throughput, 'Story points completed per sprint')}
            <p class="muted mb-0 mt-2">78 points last sprint. Quality held while Harbor checkout moved into review.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Sprint 34',
          action: '<eds-status label="Active" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="sprint-ring" value="79" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="22" max="28" label="22 of 28 points" show-value></eds-progress-bar>
              <p class="muted mb-0">Closes Friday. Four days left with Kavya Poluru on review.</p>
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
    <section class="mt-3">
      ${projectGrid(projects.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Recent activity',
          action: `
            <div class="inline-actions">
              <eds-badge label="Sprint 34" variant="brand" pill></eds-badge>
              <eds-link href="#/board" variant="subtle">Board</eds-link>
            </div>`,
          body: activityList(activity),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Capacity',
          action: '<eds-link href="#/team" variant="subtle">Team</eds-link>',
          body: capacityMix(people, capacity),
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
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
      { label: 'Cedar data residency', description: 'Sahana Poluru · legal', icon: 'file', href: '#/risks' },
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
}
