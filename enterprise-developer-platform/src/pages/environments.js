import { environmentColumns, environments, envTree, people } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderEnvironments() {
  return `
    ${pageHeader({
      eyebrow: 'Clusters',
      title: 'Environments',
      lead: 'Five clusters. Production and Edge freeze on 2 Oct. Sandbox keys are stale.',
    })}
    <eds-card padded>
      <eds-data-table id="env-table" sortable striped></eds-data-table>
    </eds-card>
    <div class="card-grid cols-2 mt-3">
      ${environments
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.name}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-1">${item.region} · ${item.cluster}</p>
          <p class="muted mb-2">${item.services} services · freeze ${item.freeze}</p>
          <eds-progress-bar value="${item.status === 'Open' ? 28 : item.status === 'Watch' ? 54 : 88}" max="100" label="${item.owner}" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Env tree',
          body: '<eds-tree-view id="env-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Desk load',
          body: `
            <div class="card-grid cols-2">
              ${people
                .filter((person) => ['Edge', 'Platform', 'Identity', 'Data'].includes(person.squad))
                .map(
                  (person) => `
                <content-card>
                  <div class="person-card">
                    <eds-avatar name="${person.name}" size="md"></eds-avatar>
                    <div>
                      <strong>${person.name}</strong>
                      <p class="muted mb-1">${person.role}</p>
                      ${statusChip(person.score >= 85 ? 'On track' : 'Watch')}
                    </div>
                  </div>
                  <eds-progress-bar class="mt-3" value="${person.score}" max="100" label="${person.score}" show-value></eds-progress-bar>
                </content-card>`,
                )
                .join('')}
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateEnvironments(root) {
  const table = root.querySelector('#env-table');
  if (table) {
    table.columns = environmentColumns;
    table.rows = environments;
  }
  const tree = root.querySelector('#env-tree');
  if (tree) {
    tree.items = envTree;
    tree.expandedIds = { live: true, hold: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
}
