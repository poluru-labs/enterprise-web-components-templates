import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { currentUser, flags, memberColumns, members, organizations, workspaceTree } from '../data/index.js';
import { pageHeader, sheet, statusFor } from '../components/widgets.js';

export function renderOrgDetail(route) {
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
    <section class="row g-3 stretch-grid">
      <div class="col-lg-8">
        <eds-card padded class="sheet">
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

export function hydrateOrgDetail(root, route) {
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
