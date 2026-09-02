import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { currentUser, overviewMetrics, queues, tickets, workspace } from '../data/index.js';
import { formatAge } from '../lib/format.js';
import { hydrateStats, pageHeader, queueGrid, sheet, sparkline, statGrid } from '../components/widgets.js';

const responseTrend = [48, 46, 44, 45, 43, 42, 41, 42, 40, 41, 42, 42];

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Support pulse',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. ${overviewMetrics[0].value} open tickets. Infrastructure queue needs attention.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-create" variant="primary" icon="plus">Create ticket</eds-button>
        <eds-button id="qa-tickets" variant="secondary" icon="ticket">Tickets</eds-button>
      `,
    })}
    <eds-alert id="ops-alert" variant="warning" dismissible title="Infrastructure at risk" message="Two SLA breaches in the infra queue. Dev Poluru is leading recovery."></eds-alert>
    ${statGrid(overviewMetrics, 'metric')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'First response trend',
          action: '<eds-badge label="Shift B" variant="brand" pill></eds-badge>',
          body: `${sparkline(responseTrend, 'First response minutes over the last 12 intervals')}
            <p class="muted mb-0 mt-2">42m average first response. Target is 60m. Billing portal login loop is the top driver.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'SLA attainment',
          action: '<eds-status label="91%" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="sla-ring" value="91" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="6" max="248" label="6 breached of 248 open" show-value></eds-progress-bar>
              <p class="muted mb-0">Six tickets need escalation before shift handoff at 8 PM.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Queues & teams</h2>
        <eds-link href="#/teams" variant="subtle">All agents</eds-link>
      </div>
      ${queueGrid(queues)}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs attention',
          action: '<eds-link href="#/tickets" variant="subtle">Tickets</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Priority tickets',
          action: '<eds-link href="#/tickets" variant="subtle">View all</eds-link>',
          body: '<eds-data-table id="priority-table" compact striped></eds-data-table>',
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, overviewMetrics, 'metric');
  const period = root.querySelector('#dash-period');
  if (period) {
    period.options = [
      { label: 'Shift', value: 'shift' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
    ];
    period.value = 'shift';
  }
  const watch = root.querySelector('#watch-list');
  if (watch) {
    watch.items = tickets
      .filter((item) => item.sla === 'Breached' || item.sla === 'At risk')
      .slice(0, 4)
      .map((item) => ({
        label: `${item.id} · ${item.summary}`,
        description: `${item.assignee} · ${item.priority}`,
        icon: 'alert-triangle',
        href: `#/tickets/${item.id}`,
      }));
  }
  const table = root.querySelector('#priority-table');
  if (table) {
    table.columns = [
      { key: 'id', label: 'Ticket' },
      { key: 'summary', label: 'Summary' },
      { key: 'priority', label: 'Priority' },
      { key: 'sla', label: 'SLA' },
    ];
    table.rows = tickets
      .filter((item) => item.priority === 'Critical' || item.priority === 'High')
      .slice(0, 5)
      .map((item) => ({
        id: item.id,
        summary: item.summary,
        priority: item.priority,
        sla: item.sla,
      }));
  }
  root.querySelector('#qa-create')?.addEventListener('eds-click', () => document.querySelector('#ticket-modal')?.show());
  root.querySelector('#qa-tickets')?.addEventListener('eds-click', () => {
    window.location.hash = '#/tickets';
  });
  root.querySelector('#ops-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Infrastructure reminder dismissed', variant: 'info' });
  });
  table?.addEventListener('click', () => {
    window.location.hash = '#/tickets/HD-4821';
  });
}
