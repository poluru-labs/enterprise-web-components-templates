import { accounts, driverColumns, healthDrivers, healthTree, people } from '../data/index.js';
import { accountGrid, healthMix, pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderHealth() {
  const risk = accounts.filter((item) => item.status === 'At risk' || item.status === 'Watch');
  return `
    ${pageHeader({
      eyebrow: 'Scores',
      title: 'Health',
      lead: 'Portfolio score 84. Lattice is red. Fold and Pine sit in watch. Drivers are product, support, adoption, and relationship.',
      actions: `
        <eds-popover heading="Score bands">
          <eds-button slot="trigger" variant="tertiary" icon="info">Bands</eds-button>
          <p class="mb-0">Healthy is 80 and up. Watch is 65–79. At risk is below 65.</p>
        </eds-popover>
        <eds-button id="health-play" variant="primary" icon="file">Recovery play</eds-button>
      `,
    })}
    <eds-alert variant="danger" title="Lattice Energy" message="Health 58. Support CSAT and adoption are the two drivers below target. Hana Poluru owns the save plan."></eds-alert>
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
          body: healthMix(accounts),
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Watch and risk</h2>
        <eds-link href="#/accounts" variant="subtle">Book</eds-link>
      </div>
      ${accountGrid(risk)}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Book tree',
          body: '<eds-tree-view id="health-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'CSM load',
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
                      <p class="muted mb-1">${person.role} · ${person.book} accounts</p>
                      ${statusChip(person.score >= 80 ? 'Healthy' : 'Watch')}
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

export function hydrateHealth(root) {
  const table = root.querySelector('#driver-table');
  if (table) {
    table.columns = driverColumns;
    table.rows = healthDrivers;
  }
  const tree = root.querySelector('#health-tree');
  if (tree) {
    tree.items = healthTree;
    tree.expandedIds = { book: true, motion: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#health-play')?.addEventListener('eds-click', () => document.querySelector('#play-modal')?.show());
}
