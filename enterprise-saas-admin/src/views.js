import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  apiKeySnippet,
  auditColumns,
  auditLog,
  currentUser,
  flags,
  incidents,
  kpis,
  memberColumns,
  members,
  orgColumns,
  organizations,
  plans,
  subscriptionColumns,
  subscriptions,
  usageMeters,
  usageMonths,
  workspaceName,
  workspaceTree,
} from './data.js';
import { emptyState, filterBar, hydrateStats, pageHeader, sheet, sparkline, statGrid, statusFor } from './ui.js';

export const viewState = {
  orgQuery: '',
  memberQuery: '',
  inviteStep: 0,
};

export function renderView(route) {
  const views = {
    overview: renderOverview,
    organizations: renderOrganizations,
    org: renderOrg,
    members: renderMembers,
    plans: renderPlans,
    flags: renderFlags,
    usage: renderUsage,
    incidents: renderIncidents,
    audit: renderAudit,
    settings: renderSettings,
  };
  return (views[route.name] || renderOverview)(route);
}

function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: `${workspaceName} · live`,
      title: 'Overview',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Seats, flags, and uptime for the control plane.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-invite" variant="primary" icon="plus">Invite</eds-button>
        <eds-button id="qa-flag" variant="secondary" icon="filter">New flag</eds-button>
      `,
    })}
    <eds-alert id="maint-alert" variant="warning" dismissible title="Maintenance window" message="Database failover is scheduled for 30 Aug, 02:00–02:40 UTC. Writes will pause for under a minute."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Recurring revenue',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(usageMonths, 'Monthly recurring revenue in thousands')}
            <p class="muted mb-0 mt-2">August is in progress at $186k. Net new $22.4k from Lumen Health and Fold Paper Co.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Uptime',
          action: '<eds-status label="Operational" variant="success" pulse></eds-status>',
          body: `
            <div class="uptime-block">
              <eds-circular-progress id="uptime-ring" value="99.98" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <p class="muted mb-0">30-day SLO 99.9%. Auth latency in EMEA is the only watch item.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Need attention',
          action: '<eds-link href="#/incidents" variant="subtle">Incidents</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent organizations',
          action: '<eds-link href="#/organizations" variant="subtle">All</eds-link>',
          body: '<eds-data-table id="recent-orgs" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Control plane activity',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Seat utilization',
          body: `
            <eds-meter label="Contracted seats" value="82" min="0" max="100" low="50" high="85" optimum="70" show-value></eds-meter>
            <eds-progress-bar class="mt-3" label="API quota" value="74" show-value></eds-progress-bar>
            <eds-progress-bar class="mt-3" label="Storage" value="46" show-value></eds-progress-bar>`,
        })}
      </div>
    </section>
  `;
}

function renderOrganizations() {
  return `
    ${pageHeader({
      eyebrow: 'Tenants',
      title: 'Organizations',
      lead: '842 workspaces on Poluru Cloud. Create, impersonate, or adjust seats without leaving the directory.',
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
        <eds-pagination id="org-page" page="1" page-size="6" total="6"></eds-pagination>
      </div>
    </eds-card>
  `;
}

function renderOrg(route) {
  const org = organizations.find((item) => item.id === route.id) ?? organizations[0];
  return `
    ${pageHeader({
      eyebrow: org.region,
      title: org.name,
      lead: `${org.plan} · ${org.seats} seats · owned by ${org.owner}.`,
      actions: `
        <eds-button id="impersonate-btn" variant="secondary" icon="eye">Impersonate</eds-button>
        <eds-button id="org-invite" variant="primary" icon="plus">Invite</eds-button>
      `,
    })}
    <section class="row g-3">
      <div class="col-lg-8">
        <eds-card padded>
          <div slot="header" class="section-title">
            <h2>Workspace</h2>
            <eds-status label="${org.status}" variant="${statusFor(org.status)}"></eds-status>
          </div>
          <eds-description-list id="org-facts" columns="3" compact></eds-description-list>
          <eds-tabs class="mt-3">
            <eds-tab label="Members" active>
              <eds-data-table id="org-members" compact></eds-data-table>
            </eds-tab>
            <eds-tab label="Usage">
              <eds-meter label="Seats" value="80" show-value></eds-meter>
              <eds-progress-bar class="mt-3" label="API" value="61" show-value></eds-progress-bar>
            </eds-tab>
            <eds-tab label="Flags">
              <eds-list id="org-flags" divided></eds-list>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Health',
          body: `
            <div class="health-block">
              <eds-rating id="org-health" value="${org.health}" allow-half readonly></eds-rating>
              <p class="muted mb-0 mt-2">Scored from seat fill, payment health, and support load.</p>
            </div>`,
        })}
        ${sheet({
          title: 'Services',
          body: '<eds-tree-view id="org-tree"></eds-tree-view>',
        })}
      </div>
    </section>
  `;
}

function renderMembers() {
  return `
    ${pageHeader({
      eyebrow: 'Access',
      title: 'Members',
      lead: '12,480 active seats. Invite a Poluru teammate, change a role, or suspend access.',
      actions: `<eds-button id="invite-member" variant="primary" icon="plus">Invite member</eds-button>`,
    })}
    ${filterBar(`
      <eds-search id="member-search" placeholder="Name or email" clearable></eds-search>
      <eds-select id="member-role" label="Role"></eds-select>
      <eds-select id="member-status" label="Status"></eds-select>
    `)}
    <section class="row g-3">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-data-table id="member-table" sortable striped></eds-data-table>
          ${emptyState({ id: 'member-empty', heading: 'No members', description: 'No one matches this filter.' })}
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Seat pack',
          body: `
            <eds-meter label="Used" value="82" show-value></eds-meter>
            <p class="muted mt-3 mb-2">Pending invites</p>
            <eds-list id="pending-invites" divided></eds-list>`,
        })}
      </div>
    </section>
  `;
}

function renderPlans() {
  return `
    ${pageHeader({
      eyebrow: 'Billing',
      title: 'Plans',
      lead: 'Starter, Growth, and Enterprise. Change a subscription or open a custom quote.',
      actions: `
        <eds-split-button id="plan-split" label="New quote" variant="primary" icon="star">
          <eds-menu-item label="Growth upgrade" value="growth"></eds-menu-item>
          <eds-menu-item label="Enterprise quote" value="enterprise"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <section class="row g-3 mb-3">
      ${plans
        .map(
          (plan) => `
        <div class="col-md-4">
          <eds-card class="plan-card" padded elevated>
            <div slot="header">
              <span class="kicker">${plan.orgs} orgs</span>
              <h2>${plan.name}</h2>
            </div>
            <p class="plan-price">${plan.price}<small>/mo</small></p>
            <p class="muted">${plan.seats}</p>
            <p>${plan.features}</p>
            <div slot="footer">
              <eds-button class="plan-pick" variant="${plan.name === 'Enterprise' ? 'primary' : 'secondary'}" data-plan="${plan.name}">Select</eds-button>
            </div>
          </eds-card>
        </div>`,
        )
        .join('')}
    </section>
    ${sheet({
      title: 'Subscriptions',
      body: '<eds-data-table id="sub-table" sortable striped></eds-data-table>',
    })}
  `;
}

function renderFlags() {
  return `
    ${pageHeader({
      eyebrow: 'Release',
      title: 'Feature flags',
      lead: 'Percentage rollouts, environment targeting, and kill switches. All names in this workspace end with Poluru as owners.',
      actions: `<eds-button id="new-flag" variant="primary" icon="plus">New flag</eds-button>`,
    })}
    <div class="flag-grid">
      ${flags
        .map(
          (flag, index) => `
        <eds-card class="flag-card" padded>
          <div slot="header" class="section-title">
            <div>
              <h2>${flag.name}</h2>
              <p class="muted mb-0"><code>${flag.key}</code></p>
            </div>
            <eds-status label="${flag.status}" variant="${statusFor(flag.status)}"></eds-status>
          </div>
          <eds-switch id="flag-switch-${index}" label="${flag.rollout > 0 ? 'Enabled' : 'Disabled'}" ${flag.rollout > 0 ? 'checked' : ''}></eds-switch>
          <eds-slider id="flag-rollout-${index}" class="mt-3" label="Rollout" min="0" max="100" step="1" value="${flag.rollout}" show-value></eds-slider>
          <p class="muted mb-0 mt-2">${flag.owner} · ${flag.env}</p>
        </eds-card>`,
        )
        .join('')}
    </div>
  `;
}

function renderUsage() {
  return `
    ${pageHeader({
      eyebrow: 'Meters',
      title: 'Usage',
      lead: 'API, seats, storage, and realtime. Adjust the window to compare the last cycle.',
      actions: `<eds-date-range-picker id="usage-range" label="Window"></eds-date-range-picker>`,
    })}
    <section class="row g-3">
      ${usageMeters
        .map(
          (meter, index) => `
        <div class="col-md-6 col-xl-3">
          <eds-card padded>
            <eds-stat id="use-${index}"></eds-stat>
            <eds-progress-bar class="mt-3" value="${meter.value}" show-value></eds-progress-bar>
          </eds-card>
        </div>`,
        )
        .join('')}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'API calls',
          action: '<eds-badge label="Millions" variant="neutral" pill></eds-badge>',
          body: sparkline(usageMonths, 'API volume trend'),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Quota remaining',
          body: `
            <eds-circular-progress value="26" size="120" show-value></eds-circular-progress>
            <p class="muted mt-3 mb-0">26% of the Enterprise API pack remains this cycle.</p>`,
        })}
      </div>
    </section>
  `;
}

function renderIncidents() {
  return `
    ${pageHeader({
      eyebrow: 'Reliability',
      title: 'Incidents',
      lead: 'Auth latency is the open watch. Everything else is green.',
      actions: `<eds-button id="new-incident" variant="primary" icon="alert-triangle">Open incident</eds-button>`,
    })}
    <section class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Timeline',
          body: '<eds-timeline id="incident-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Status',
          body: `
            <div class="stack">
              <eds-status label="API" variant="success"></eds-status>
              <eds-status label="Auth" variant="warning" pulse></eds-status>
              <eds-status label="Billing" variant="success"></eds-status>
              <eds-status label="Flags" variant="success"></eds-status>
            </div>
            <eds-divider label="Next window" spacing="lg"></eds-divider>
            <eds-date-picker id="maint-date" label="Maintenance date" value="2026-08-30"></eds-date-picker>
            <eds-time-picker id="maint-time" class="mt-3" label="Start" value="02:00"></eds-time-picker>
            <eds-button id="save-window" class="mt-3" variant="secondary">Save window</eds-button>`,
        })}
      </div>
    </section>
  `;
}

function renderAudit() {
  return `
    ${pageHeader({
      eyebrow: 'Security',
      title: 'Audit log',
      lead: 'Every admin action in Poluru Cloud. Filter by actor or export a pack.',
      actions: `
        <eds-button-group>
          <eds-button id="export-csv" variant="secondary" icon="download">CSV</eds-button>
          <eds-button id="export-json" variant="secondary" icon="file">JSON</eds-button>
        </eds-button-group>
      `,
    })}
    ${filterBar(`
      <eds-autocomplete id="audit-actor" label="Actor" placeholder="Search a Poluru admin"></eds-autocomplete>
      <eds-combobox id="audit-action" label="Action" placeholder="Choose an action"></eds-combobox>
    `)}
    <eds-card padded>
      <eds-data-table id="audit-table" sortable striped compact></eds-data-table>
    </eds-card>
    <eds-card class="mt-3" padded>
      <div slot="header"><h2>Latest event</h2></div>
      <eds-code-snippet id="audit-snippet" language="json" label="Audit payload"></eds-code-snippet>
    </eds-card>
  `;
}

function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: workspaceName,
      title: 'Settings',
      lead: 'SSO, API keys, webhooks, and workspace density. Changes apply to every Poluru Cloud tenant.',
      actions: `<eds-button id="save-settings" variant="primary" icon="save">Save</eds-button>`,
    })}
    <section class="row g-3">
      <div class="col-lg-7">
        <eds-card padded>
          <eds-accordion single>
            <eds-accordion-item heading="Workspace" open>
              <div class="stack">
                <eds-input label="Workspace name" value="${workspaceName}" icon="folder"></eds-input>
                <eds-input label="Support email" type="email" value="hello@polurulabs.example" icon="mail"></eds-input>
                <eds-select id="density" label="Density"></eds-select>
                <eds-checkbox label="Show impersonation in the header" checked></eds-checkbox>
              </div>
            </eds-accordion-item>
            <eds-accordion-item heading="SSO and SCIM">
              <div class="stack">
                <eds-switch id="sso-switch" label="Require SSO for staff" checked></eds-switch>
                <eds-switch id="scim-switch" label="SCIM provisioning"></eds-switch>
                <eds-input label="Entity ID" value="https://helio.example/sso" icon="link"></eds-input>
              </div>
            </eds-accordion-item>
            <eds-accordion-item heading="API keys">
              <eds-code-snippet id="key-snippet" language="bash" label="Live secret"></eds-code-snippet>
              <eds-button id="rotate-key" class="mt-3" variant="secondary" icon="refresh">Rotate</eds-button>
            </eds-accordion-item>
            <eds-accordion-item heading="Webhooks">
              <eds-file-upload id="hook-upload" label="Signing certificate" hint="PEM up to 2 MB" accept=".pem,.crt"></eds-file-upload>
            </eds-accordion-item>
          </eds-accordion>
        </eds-card>
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Sensitive actions',
          body: `
            <p class="muted">Confirm with the staff PIN before rotating keys or impersonating an org.</p>
            <eds-pin-input id="staff-pin" length="4" type="number" label="Staff PIN"></eds-pin-input>
            <eds-divider spacing="lg"></eds-divider>
            <eds-number-input id="session-hours" label="Session hours" value="8" min="1" max="24"></eds-number-input>
            <eds-textarea class="mt-3" label="Status page note" rows="3" placeholder="Optional note for customers."></eds-textarea>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) {
    hydrateStats(root, kpis, 'kpi');
    const period = root.querySelector('#dash-period');
    if (period) {
      period.options = [
        { label: '30d', value: '30d' },
        { label: '90d', value: '90d' },
        { label: '12m', value: '12m' },
      ];
      period.value = '30d';
    }
    const watch = root.querySelector('#watch-list');
    if (watch) {
      watch.items = [
        { label: 'Nimbus Retail past due', description: 'Arjun Poluru · $4.2k', icon: 'warning', href: '#/org/org_nimbus' },
        { label: 'Auth latency EMEA', description: 'p95 820ms', icon: 'alert-triangle', href: '#/incidents' },
        { label: 'Oak & Pine near cap', description: 'Sahana Poluru · 9/10 seats', icon: 'user', href: '#/org/org_oak' },
      ];
    }
    const recent = root.querySelector('#recent-orgs');
    if (recent) {
      recent.columns = orgColumns.filter((col) => ['name', 'plan', 'owner', 'status'].includes(col.key));
      recent.rows = organizations.slice(0, 4).map((item) => ({
        name: item.name,
        plan: item.plan,
        owner: item.owner,
        status: item.status,
      }));
    }
    const timeline = root.querySelector('#overview-timeline');
    if (timeline) timeline.items = incidents;
    root.querySelector('#qa-invite')?.addEventListener('eds-click', () => document.querySelector('#invite-modal')?.show());
    root.querySelector('#qa-flag')?.addEventListener('eds-click', () => document.querySelector('#flag-modal')?.show());
    root.querySelector('#maint-alert')?.addEventListener('eds-dismiss', () => {
      showToast({ message: 'Maintenance reminder dismissed', variant: 'info' });
    });
    recent?.addEventListener('click', () => {
      window.location.hash = '#/org/org_harbor';
    });
  }

  if (route.name === 'organizations') {
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

  if (route.name === 'org') {
    const org = organizations.find((item) => item.id === route.id) ?? organizations[0];
    const facts = root.querySelector('#org-facts');
    if (facts) {
      facts.items = [
        { term: 'Owner', description: org.owner },
        { term: 'Plan', description: org.plan },
        { term: 'MRR', description: org.mrr },
        { term: 'SSO', description: org.sso },
        { term: 'Created', description: org.created },
        { term: 'Seats', description: org.seats },
      ];
    }
    const memberTable = root.querySelector('#org-members');
    if (memberTable) {
      memberTable.columns = memberColumns.filter((col) => ['name', 'role', 'status'].includes(col.key));
      memberTable.rows = members.filter((item) => item.org === org.name).slice(0, 5);
    }
    const flagList = root.querySelector('#org-flags');
    if (flagList) {
      flagList.items = flags.slice(0, 4).map((item) => ({
        label: item.name,
        description: `${item.rollout}% · ${item.status}`,
        icon: item.rollout > 0 ? 'check' : 'x',
      }));
    }
    const tree = root.querySelector('#org-tree');
    if (tree) {
      tree.items = workspaceTree;
      tree.expandedIds = { prod: true, staging: true };
    }
    root.querySelector('#impersonate-btn')?.addEventListener('eds-click', () => {
      showToast({ message: `Viewing ${org.name} as ${currentUser.name}`, variant: 'warning' });
    });
    root.querySelector('#org-invite')?.addEventListener('eds-click', () => document.querySelector('#invite-modal')?.show());
  }

  if (route.name === 'members') {
    const table = root.querySelector('#member-table');
    const role = root.querySelector('#member-role');
    const status = root.querySelector('#member-status');
    if (role) {
      role.options = [
        { label: 'All roles', value: 'all' },
        { label: 'Owner', value: 'Owner' },
        { label: 'Admin', value: 'Admin' },
        { label: 'Billing', value: 'Billing' },
        { label: 'Member', value: 'Member' },
        { label: 'Support', value: 'Support' },
      ];
      role.value = 'all';
    }
    if (status) {
      status.options = [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'Active' },
        { label: 'Invited', value: 'Invited' },
        { label: 'Suspended', value: 'Suspended' },
      ];
      status.value = 'all';
    }
    const paint = () => {
      const query = viewState.memberQuery.toLowerCase();
      const rows = members
        .filter((item) => `${item.name} ${item.email}`.toLowerCase().includes(query))
        .filter((item) => (role?.value || 'all') === 'all' || item.role === role.value)
        .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value);
      if (table) {
        table.columns = memberColumns;
        table.rows = rows;
      }
      const empty = root.querySelector('#member-empty');
      if (empty) empty.hidden = rows.length > 0;
    };
    paint();
    root.querySelector('#member-search')?.addEventListener('eds-input', (event) => {
      viewState.memberQuery = event.detail?.value ?? '';
      paint();
    });
    role?.addEventListener('eds-change', paint);
    status?.addEventListener('eds-change', paint);
    const pending = root.querySelector('#pending-invites');
    if (pending) {
      pending.items = members
        .filter((item) => item.status === 'Invited')
        .map((item) => ({ label: item.name, description: item.org, icon: 'mail' }));
    }
    root.querySelector('#invite-member')?.addEventListener('eds-click', () => document.querySelector('#invite-modal')?.show());
  }

  if (route.name === 'plans') {
    const table = root.querySelector('#sub-table');
    if (table) {
      table.columns = subscriptionColumns;
      table.rows = subscriptions;
    }
    root.querySelector('#plan-split')?.addEventListener('eds-click', () => {
      showToast({ message: 'Quote opened for Growth', variant: 'info' });
    });
    root.querySelector('#plan-split')?.addEventListener('eds-select', (event) => {
      showToast({ message: `${event.detail?.label} started`, variant: 'success' });
    });
    root.querySelectorAll('.plan-pick').forEach((button) => {
      button.addEventListener('eds-click', () => {
        showToast({ message: `${button.dataset.plan} selected`, variant: 'success' });
      });
    });
  }

  if (route.name === 'flags') {
    flags.forEach((flag, index) => {
      const toggle = root.querySelector(`#flag-switch-${index}`);
      const slider = root.querySelector(`#flag-rollout-${index}`);
      toggle?.addEventListener('eds-change', (event) => {
        const on = Boolean(event.detail?.checked ?? toggle.checked);
        showToast({ message: `${flag.name} ${on ? 'enabled' : 'disabled'}`, variant: on ? 'success' : 'warning' });
      });
      slider?.addEventListener('eds-change', (event) => {
        showToast({ message: `${flag.name} at ${event.detail?.value ?? slider.value}%`, variant: 'info' });
      });
    });
    root.querySelector('#new-flag')?.addEventListener('eds-click', () => document.querySelector('#flag-modal')?.show());
  }

  if (route.name === 'usage') {
    hydrateStats(
      root,
      usageMeters.map((item) => ({
        label: item.label,
        value: `${item.value}%`,
        hint: item.hint,
        trend: 'up',
        trendValue: '+2.1%',
      })),
      'use',
    );
  }

  if (route.name === 'incidents') {
    const timeline = root.querySelector('#incident-timeline');
    if (timeline) timeline.items = incidents;
    root.querySelector('#new-incident')?.addEventListener('eds-click', () => document.querySelector('#incident-modal')?.show());
    root.querySelector('#save-window')?.addEventListener('eds-click', () => {
      showToast({ message: 'Maintenance window saved', variant: 'success' });
    });
  }

  if (route.name === 'audit') {
    const table = root.querySelector('#audit-table');
    if (table) {
      table.columns = auditColumns;
      table.rows = auditLog;
    }
    const actor = root.querySelector('#audit-actor');
    if (actor) actor.suggestions = [...new Set(auditLog.map((item) => item.actor))];
    const action = root.querySelector('#audit-action');
    if (action) {
      action.options = [
        { label: 'Enabled flag', value: 'flag' },
        { label: 'Invited member', value: 'invite' },
        { label: 'Impersonated org', value: 'impersonate' },
        { label: 'Rotated API key', value: 'key' },
      ];
    }
    const snippet = root.querySelector('#audit-snippet');
    if (snippet) {
      snippet.code = JSON.stringify(auditLog[0], null, 2);
    }
    root.querySelector('#export-csv')?.addEventListener('eds-click', () => {
      showToast({ message: 'Audit CSV ready', variant: 'success' });
    });
    root.querySelector('#export-json')?.addEventListener('eds-click', () => {
      showToast({ message: 'Audit JSON ready', variant: 'success' });
    });
  }

  if (route.name === 'settings') {
    const density = root.querySelector('#density');
    if (density) {
      density.options = [
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Compact', value: 'compact' },
      ];
      density.value = 'comfortable';
    }
    const snippet = root.querySelector('#key-snippet');
    if (snippet) snippet.code = apiKeySnippet;
    root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
      showToast({ message: 'Settings saved', variant: 'success' });
    });
    root.querySelector('#rotate-key')?.addEventListener('eds-click', () => {
      showToast({ message: 'Live key rotated', variant: 'warning' });
    });
    root.querySelector('#staff-pin')?.addEventListener('eds-complete', () => {
      showToast({ message: 'PIN confirmed', variant: 'success' });
    });
  }
}
