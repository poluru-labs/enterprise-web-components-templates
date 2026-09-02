import { orgGroups } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderOrg() {
  const groups = orgGroups();
  return `
    ${pageHeader({
      eyebrow: 'Structure',
      title: 'Org chart',
      lead: `${groups.length} departments · simple card view of reporting groups across Poluru People.`,
      actions: '<eds-button id="export-org" variant="secondary" icon="download">Export</eds-button>',
    })}
    <section class="card-grid cols-2" aria-label="Departments">
      ${groups
        .map(
          (group) => `
        <content-card href="#/people">
          <div slot="header" class="section-title">
            <h2>${group.name}</h2>
            <eds-badge label="${group.count}" variant="brand" pill></eds-badge>
          </div>
          <p class="muted mb-2">Lead · ${group.lead}</p>
          <div class="org-members">
            ${group.members
              .slice(0, 6)
              .map((m) => `<eds-avatar name="${m.name}" size="sm" title="${m.title}"></eds-avatar>`)
              .join('')}
            ${group.count > 6 ? `<eds-badge label="+${group.count - 6}" variant="neutral" pill></eds-badge>` : ''}
          </div>
          <div slot="footer" class="tag-row">
            ${group.members
              .filter((m) => m.status === 'on_leave')
              .slice(0, 2)
              .map((m) => statusChip('on_leave'))
              .join('') || '<span class="muted">All active this week</span>'}
          </div>
        </content-card>`,
        )
        .join('')}
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'Reporting lines',
        body: '<eds-tree id="org-tree"></eds-tree>',
      })}
    </section>
  `;
}

export function hydrateOrg(root) {
  const groups = orgGroups();
  const tree = root.querySelector('#org-tree');
  if (tree) {
    tree.items = groups.map((group) => ({
      label: group.name,
      description: `${group.count} · ${group.lead}`,
      children: group.members.slice(0, 4).map((m) => ({
        label: m.name,
        description: m.title,
      })),
    }));
  }
  root.querySelector('#export-org')?.addEventListener('eds-click', () => {
    window.location.hash = '#/settings';
  });
}
