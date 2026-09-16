import { deploymentColumns, deployments } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';

export const viewState = {
  deployQuery: '',
};

export function renderDeployments() {
  const live = deployments.filter((item) => item.status === 'Live' || item.status === 'Rolling');
  return `
    ${pageHeader({
      eyebrow: 'Train',
      title: 'Deployments',
      lead: `${deployments.length} on the board. ${live.length} live or rolling. Travel book 0.4.8 failed in staging.`,
      actions: `<eds-button id="dep-ship" variant="primary" icon="plus">Ship</eds-button>`,
    })}
    <eds-toolbar bordered class="mb-3">
      <div class="tag-row" slot="start">
        <eds-tag label="Live 5" variant="brand"></eds-tag>
        <eds-tag label="Rolling 1" variant="neutral"></eds-tag>
        <eds-tag label="Failed 1" variant="neutral"></eds-tag>
        <eds-tag label="Complete 2" variant="neutral"></eds-tag>
      </div>
    </eds-toolbar>
    <eds-card padded>
      ${filterBar(`
        <eds-search id="dep-search" placeholder="Search service or owner" clearable></eds-search>
        <eds-select id="dep-status" label="Status"></eds-select>
        <eds-select id="dep-env" label="Env"></eds-select>
      `)}
      <eds-data-table id="dep-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'dep-empty',
        heading: 'No deploys match',
        description: 'Clear search or env to see the train.',
        action: '<eds-button id="reset-dep" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${deployments
        .slice(0, 8)
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.service}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-1">${item.version} · ${item.env}</p>
          <p class="muted mb-0">${item.by} · ${item.started} · ${item.duration}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Train',
        body: `
          <eds-accordion>
            <eds-accordion-item heading="Today" open>
              Edge mesh 2.1.0 and Auth 1.8.4 are live. Pulse is rolling. Travel book failed.
            </eds-accordion-item>
            <eds-accordion-item heading="Yesterday">
              Check-in desk 1.2.6 and Civic 311 1.0.3.
            </eds-accordion-item>
            <eds-accordion-item heading="Freeze">
              Production freeze starts 2 Oct. Rohan Poluru owns the train.
            </eds-accordion-item>
          </eds-accordion>`,
      })}
    </section>
  `;
}

export function hydrateDeployments(root) {
  const table = root.querySelector('#dep-table');
  const empty = root.querySelector('#dep-empty');
  const status = root.querySelector('#dep-status');
  const env = root.querySelector('#dep-env');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Live', value: 'Live' },
      { label: 'Rolling', value: 'Rolling' },
      { label: 'Watch', value: 'Watch' },
      { label: 'Failed', value: 'Failed' },
      { label: 'Complete', value: 'Complete' },
    ];
    status.value = 'all';
  }
  if (env) {
    env.options = [
      { label: 'All envs', value: 'all' },
      ...[...new Set(deployments.map((item) => item.env))].map((label) => ({ label, value: label })),
    ];
    env.value = 'all';
  }
  const paint = () => {
    const query = viewState.deployQuery.toLowerCase();
    const rows = deployments
      .filter((item) => `${item.service} ${item.by} ${item.version}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (env?.value || 'all') === 'all' || item.env === env.value);
    if (table) {
      table.columns = deploymentColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#dep-search')?.addEventListener('eds-input', (event) => {
    viewState.deployQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  env?.addEventListener('eds-change', paint);
  root.querySelector('#reset-dep')?.addEventListener('eds-click', () => {
    viewState.deployQuery = '';
    if (status) status.value = 'all';
    if (env) env.value = 'all';
    paint();
  });
  root.querySelector('#dep-ship')?.addEventListener('eds-click', () => document.querySelector('#deploy-modal')?.show());
}
