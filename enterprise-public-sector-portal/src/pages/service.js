import { driverColumns, orgTree, people, policies, requests, serviceDrivers } from '../data/index.js';
import { pageHeader, requestGrid, sheet, slaMix, statusChip } from '../components/widgets.js';

export function renderService() {
  const hot = requests.filter((item) => item.sla === 'Overdue' || item.sla === 'Watch');
  return `
    ${pageHeader({
      eyebrow: 'Delivery',
      title: 'Service',
      lead: 'City SLA 91%. First response 6.4 hours. Permit clock is a day long. 12 inspections sit on Nikhil Poluru’s board today.',
      actions: `
        <eds-popover heading="Bands">
          <eds-button slot="trigger" variant="tertiary" icon="info">Bands</eds-button>
          <p class="mb-0">On track is inside the SLA. Watch is inside 24 hours of the due date. Overdue is past close.</p>
        </eds-popover>
        <eds-button id="svc-request" variant="primary" icon="plus">New request</eds-button>
      `,
    })}
    <eds-alert variant="danger" title="Ward 3 missed pickup" message="311-1851 is two days past the 5-day close. Luca Poluru owns sanitation."></eds-alert>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Drivers',
          body: '<eds-data-table id="driver-table" sortable striped></eds-data-table>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Mix',
          body: slaMix(requests),
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Watch and overdue</h2>
        <eds-link href="#/requests" variant="subtle">311</eds-link>
      </div>
      ${requestGrid(hot)}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Org tree',
          body: '<eds-tree-view id="svc-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Desk load',
          body: `
            <div class="card-grid cols-2">
              ${people
                .slice(1, 7)
                .map(
                  (person) => `
                <content-card>
                  <div class="person-card">
                    <eds-avatar name="${person.name}" size="md"></eds-avatar>
                    <div>
                      <strong>${person.name}</strong>
                      <p class="muted mb-1">${person.role} · ${person.book} open</p>
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
    <section class="mt-3">
      ${sheet({
        title: 'Service rules',
        body: `
          <div class="card-grid cols-2">
            ${policies
              .map(
                (item) => `
              <content-card>
                <div slot="header" class="section-title">
                  <h2>${item.name}</h2>
                  ${statusChip(item.status)}
                </div>
                <p class="muted mb-2">${item.trigger}</p>
                <p class="muted mb-3">${item.owner} · ${item.items} item${item.items === 1 ? '' : 's'} · ${item.steps} steps</p>
                <eds-progress-bar value="${item.status === 'Draft' ? 20 : 72}" max="100" label="${item.status === 'Draft' ? 'Draft' : 'In use'}" show-value></eds-progress-bar>
              </content-card>`,
              )
              .join('')}
          </div>`,
      })}
    </section>
  `;
}

export function hydrateService(root) {
  const table = root.querySelector('#driver-table');
  if (table) {
    table.columns = driverColumns;
    table.rows = serviceDrivers;
  }
  const tree = root.querySelector('#svc-tree');
  if (tree) {
    tree.items = orgTree;
    tree.expandedIds = { field: true, desk: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#svc-request')?.addEventListener('eds-click', () => document.querySelector('#request-modal')?.show());
}
