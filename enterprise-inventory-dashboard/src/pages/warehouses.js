import { stockTrend, warehouseTree, warehouses } from '../data/index.js';
import { cardGrid, pageHeader, sheet, sparkline, statusChip } from '../components/widgets.js';

export function renderWarehouses() {
  const cards = warehouses.map(
    (site) => `
      <content-card href="#/warehouses">
        <div slot="header" class="section-title">
          <h2>${site.name}</h2>
          ${statusChip(site.status)}
        </div>
        <p class="muted mb-2">${site.location} · ${site.manager}</p>
        <p class="muted mb-2">${site.skus.toLocaleString()} SKUs</p>
        <eds-progress-bar value="${site.capacityUsed}" max="${site.capacityTotal}" label="${site.capacityUsed}% capacity" show-value></eds-progress-bar>
      </content-card>`,
  );

  return `
    ${pageHeader({
      eyebrow: 'Network',
      title: 'Warehouses',
      lead: 'Eight fulfillment sites. Dallas South and Seattle North are running above 85% capacity.',
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Capacity trend',
          body: `${sparkline(stockTrend, 'Monthly stock on hand')}
            <p class="muted mb-0 mt-2">Steady growth from 21.2K to 28.6K units. Minneapolis and Portland came online in August.</p>`,
        })}
        ${sheet({
          title: 'What changed',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="July" open>
                Phoenix Hub came online with 1,260 SKUs of overflow capacity.
              </eds-accordion-item>
              <eds-accordion-item heading="August">
                Dallas South crossed 90% capacity; three SKUs went low stock. Minneapolis and Portland opened.
              </eds-accordion-item>
              <eds-accordion-item heading="September outlook">
                Cycle count freezes Thursday. Seattle overflow routes to Phoenix Hub. Dock 2 queue clears in ~18 min.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Network tree',
          body: '<eds-tree-view id="warehouse-tree"></eds-tree-view>',
        })}
      </div>
    </section>
    ${cardGrid(cards, 4)}
  `;
}

export function hydrateWarehouses(root) {
  const tree = root.querySelector('#warehouse-tree');
  if (tree) {
    tree.items = warehouseTree;
    tree.expandedIds = { central: true, coastal: true, south: true };
  }
  tree?.addEventListener('eds-select', () => {
    window.location.hash = '#/warehouses';
  });
}
