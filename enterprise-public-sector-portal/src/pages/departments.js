import { departmentColumns, departments, orgTree, people } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export function renderDepartments() {
  return `
    ${pageHeader({
      eyebrow: 'Leads',
      title: 'Departments',
      lead: 'Eight desks. Public works holds 64 open 311. Parks is at 96% SLA. Finance is on the Q3 close.',
    })}
    <eds-card padded>
      <eds-data-table id="dp-table" sortable striped></eds-data-table>
    </eds-card>
    <div class="card-grid cols-2 mt-3">
      ${departments
        .map(
          (item) => `
        <content-card>
          <div class="person-card">
            <eds-avatar name="${item.lead}" size="md"></eds-avatar>
            <div>
              <strong>${item.name}</strong>
              <p class="muted mb-1">${item.lead} · ${item.staff} staff</p>
              ${statusChip(item.sla >= 90 ? 'On track' : item.sla >= 80 ? 'Watch' : 'Overdue')}
            </div>
          </div>
          <p class="muted mt-3 mb-1">${item.focus} · ${formatCurrency(item.budget)}</p>
          <eds-progress-bar class="mt-2" value="${item.sla}" max="100" label="${item.sla}% SLA" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Org tree',
          body: '<eds-tree-view id="org-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Desk load',
          body: `
            <div class="card-grid cols-2">
              ${people
                .slice(1, 9)
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

export function hydrateDepartments(root) {
  const table = root.querySelector('#dp-table');
  if (table) {
    table.columns = departmentColumns;
    table.rows = departments.map((item) => ({
      ...item,
      sla: `${item.sla}%`,
      used: `${item.used}%`,
    }));
  }
  const tree = root.querySelector('#org-tree');
  if (tree) {
    tree.items = orgTree;
    tree.expandedIds = { field: true, desk: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
}
