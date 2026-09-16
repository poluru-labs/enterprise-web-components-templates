import { destTree, people, policies, riskColumns, risks, trips } from '../data/index.js';
import { pageHeader, sheet, statusChip, tripGrid, tripMix } from '../components/widgets.js';

export function renderRisk() {
  const hot = trips.filter((item) => item.risk === 'Elevated' || item.risk === 'Watch');
  return `
    ${pageHeader({
      eyebrow: 'Duty of care',
      title: 'Risk',
      lead: 'Lagos is elevated. Paris and Mumbai sit on watch. Check-in rate is 96% after the 06:40 ping from Hana Poluru.',
      actions: `
        <eds-popover heading="Bands">
          <eds-button slot="trigger" variant="tertiary" icon="info">Bands</eds-button>
          <p class="mb-0">Cleared is standard. Watch is disruption. Elevated is a restricted country with eight-hour check-ins.</p>
        </eds-popover>
        <eds-button id="risk-policy" variant="primary" icon="file">Exception</eds-button>
      `,
    })}
    <eds-alert variant="danger" title="Lagos elevated" message="Hana Poluru. Movement only with the armored transfer. Last check-in 06:40 CDT. Nikhil Poluru owns the brief."></eds-alert>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Advisories',
          body: '<eds-data-table id="risk-table" sortable striped></eds-data-table>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Mix',
          body: tripMix(trips),
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Watch and elevated</h2>
        <eds-link href="#/trips" variant="subtle">Trips</eds-link>
      </div>
      ${tripGrid(hot)}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Book tree',
          body: '<eds-tree-view id="risk-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Desk load',
          body: `
            <div class="card-grid cols-2">
              ${people
                .slice(0, 6)
                .map(
                  (person) => `
                <content-card>
                  <div class="person-card">
                    <eds-avatar name="${person.name}" size="md"></eds-avatar>
                    <div>
                      <strong>${person.name}</strong>
                      <p class="muted mb-1">${person.role} · ${person.book} trips</p>
                      ${statusChip(person.score >= 80 ? 'Cleared' : 'Watch')}
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
        title: 'Policies in force',
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
                <p class="muted mb-3">${item.owner} · ${item.trips} trip${item.trips === 1 ? '' : 's'} · ${item.steps} steps</p>
                <eds-progress-bar value="${item.status === 'Draft' ? 20 : 72}" max="100" label="${item.status === 'Draft' ? 'Draft' : 'In use'}" show-value></eds-progress-bar>
              </content-card>`,
              )
              .join('')}
          </div>`,
      })}
    </section>
  `;
}

export function hydrateRisk(root) {
  const table = root.querySelector('#risk-table');
  if (table) {
    table.columns = riskColumns;
    table.rows = risks;
  }
  const tree = root.querySelector('#risk-tree');
  if (tree) {
    tree.items = destTree;
    tree.expandedIds = { live: true, ahead: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#risk-policy')?.addEventListener('eds-click', () => document.querySelector('#policy-modal')?.show());
}
