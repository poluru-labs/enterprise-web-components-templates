import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { orgColumns, organizations } from '../data/index.js';
import { emptyState, filterBar, pageHeader } from '../components/widgets.js';
import { viewState } from './state.js';

export function renderOrganizations() {
  return `
    ${pageHeader({
      eyebrow: 'Tenants',
      title: 'Organizations',
      lead: '848 workspaces on Poluru Cloud. Create, impersonate, or adjust seats without leaving the directory.',
      actions: `
        <eds-split-button id="org-split" label="New organization" variant="primary" icon="plus">
          <eds-menu-item label="Create organization" value="create" icon="plus"></eds-menu-item>
          <eds-menu-item label="Invite owner" value="invite" icon="mail"></eds-menu-item>
          <eds-menu-item label="Import CSV" value="import" icon="upload"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    ${filterBar(`
      <eds-search id="org-search" placeholder="Filter by name or owner" clearable></eds-search>
      <eds-select id="org-plan" label="Plan"></eds-select>
      <eds-tag label="Healthy" variant="success" dismissible></eds-tag>
      <eds-tag label="EMEA" variant="brand" dismissible></eds-tag>
    `)}
    <eds-card padded>
      <eds-data-table id="org-table" sortable striped></eds-data-table>
      ${emptyState({ id: 'org-empty', heading: 'No organizations', description: 'Try a different name or clear the plan filter.' })}
      <div class="table-foot">
        <eds-pagination id="org-page" page="1" page-size="8" total="8"></eds-pagination>
      </div>
    </eds-card>
  `;
}

export function hydrateOrganizations(root) {
  const table = root.querySelector('#org-table');
  const empty = root.querySelector('#org-empty');
  const plan = root.querySelector('#org-plan');
  if (plan) {
    plan.options = [
      { label: 'All plans', value: 'all' },
      { label: 'Starter', value: 'Starter' },
      { label: 'Growth', value: 'Growth' },
      { label: 'Enterprise', value: 'Enterprise' },
    ];
    plan.value = 'all';
  }
  const paint = () => {
    const query = viewState.orgQuery.toLowerCase();
    const planValue = plan?.value || 'all';
    const rows = organizations
      .filter((item) => `${item.name} ${item.owner}`.toLowerCase().includes(query))
      .filter((item) => planValue === 'all' || item.plan === planValue)
      .map((item) => ({
        name: item.name,
        plan: item.plan,
        seats: item.seats,
        owner: item.owner,
        region: item.region,
        status: item.status,
        mrr: item.mrr,
        id: item.id,
      }));
    if (table) {
      table.columns = orgColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
    const pager = root.querySelector('#org-page');
    if (pager) pager.total = Math.max(rows.length, 1);
  };
  paint();
  root.querySelector('#org-search')?.addEventListener('eds-input', (event) => {
    viewState.orgQuery = event.detail?.value ?? '';
    paint();
  });
  plan?.addEventListener('eds-change', paint);
  root.querySelector('#org-split')?.addEventListener('eds-click', () => document.querySelector('#org-modal')?.show());
  root.querySelector('#org-split')?.addEventListener('eds-select', (event) => {
    if (event.detail?.value === 'invite') document.querySelector('#invite-modal')?.show();
    else if (event.detail?.value === 'import') showToast({ message: 'CSV import queued', variant: 'info' });
    else document.querySelector('#org-modal')?.show();
  });
  table?.addEventListener('click', () => {
    window.location.hash = '#/org/org_harbor';
  });
  root.querySelectorAll('eds-tag').forEach((tag) => {
    tag.addEventListener('eds-dismiss', () => tag.remove());
  });
}
