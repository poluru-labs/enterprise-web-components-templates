import { people, venueColumns, venues, venueTree } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderVenues() {
  return `
    ${pageHeader({
      eyebrow: 'Rooms',
      title: 'Venues',
      lead: 'Eleven rooms. Hall A, Green Room, and Press nook are live. River Room holds Harbor Product Day.',
    })}
    <eds-card padded>
      <eds-data-table id="vn-table" sortable striped></eds-data-table>
    </eds-card>
    <div class="card-grid cols-2 mt-3">
      ${venues
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.name}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-1">Floor ${item.floor} · ${item.seats} seats</p>
          <p class="muted mb-2">${item.today}</p>
          <eds-progress-bar value="${item.status === 'Open' ? 8 : item.status === 'Hold' ? 36 : item.status === 'Booked' ? 72 : 92}" max="100" label="${item.av}" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Room tree',
          body: '<eds-tree-view id="venue-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Desk load',
          body: `
            <div class="card-grid cols-2">
              ${people
                .filter((person) => ['Venues', 'AV', 'Desk', 'Ops'].includes(person.squad))
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

export function hydrateVenues(root) {
  const table = root.querySelector('#vn-table');
  if (table) {
    table.columns = venueColumns;
    table.rows = venues;
  }
  const tree = root.querySelector('#venue-tree');
  if (tree) {
    tree.items = venueTree;
    tree.expandedIds = { live: true, ahead: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
}
