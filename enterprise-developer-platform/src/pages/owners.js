import { people, services } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderOwners() {
  return `
    ${pageHeader({
      eyebrow: 'Coverage',
      title: 'Owners',
      lead: 'Ten people on the map. Every live service has a page. Dev and Elena Poluru are on-call.',
    })}
    <eds-card padded>
      <eds-data-table id="ow-table" sortable striped></eds-data-table>
    </eds-card>
    <div class="card-grid cols-2 mt-3">
      ${people
        .map(
          (person) => `
        <content-card>
          <div class="person-card">
            <eds-avatar name="${person.name}" size="md"></eds-avatar>
            <div>
              <strong>${person.name}</strong>
              <p class="muted mb-1">${person.role} · ${person.squad}</p>
              ${statusChip(person.score >= 85 ? 'On track' : 'Watch')}
            </div>
          </div>
          <p class="muted mt-3 mb-1">${person.book} on the book</p>
          <eds-rating value="${person.rating}" readonly size="sm"></eds-rating>
          <eds-progress-bar class="mt-2" value="${person.score}" max="100" label="${person.score}" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Service map',
        body: `
          <div class="card-grid cols-2">
            ${services
              .map(
                (item) => `
              <content-card href="#/service/${item.id}">
                <div slot="header" class="section-title">
                  <h2>${item.name}</h2>
                  ${statusChip(item.status)}
                </div>
                <p class="muted mb-0">${item.owner} · ${item.squad} · ${item.env}</p>
              </content-card>`,
              )
              .join('')}
          </div>`,
      })}
    </section>
  `;
}

export function hydrateOwners(root) {
  const table = root.querySelector('#ow-table');
  if (table) {
    table.columns = [
      { key: 'name', label: 'Owner', sortable: true },
      { key: 'role', label: 'Role' },
      { key: 'squad', label: 'Squad' },
      { key: 'book', label: 'Book' },
      { key: 'score', label: 'Score' },
    ];
    table.rows = people;
  }
}
