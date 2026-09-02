import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { suppliers } from '../data/index.js';
import { cardGrid, pageHeader, statusChip } from '../components/widgets.js';

export function renderSuppliers() {
  const cards = suppliers.map(
    (supplier) => `
      <content-card>
        <div slot="header" class="section-title">
          <h2>${supplier.name}</h2>
          ${statusChip(supplier.status)}
        </div>
        <p class="muted mb-2">${supplier.category} · lead time ${supplier.leadTime}</p>
        <eds-rating value="${supplier.rating}" allow-half readonly size="sm"></eds-rating>
      </content-card>`,
  );

  return `
    ${pageHeader({
      eyebrow: 'Vendors',
      title: 'Suppliers',
      lead: 'Eight active suppliers. Ferrotech Components and BrightPath Solar are on watch for lead time.',
      actions: `<eds-button id="supplier-add" variant="primary" icon="plus">New supplier</eds-button>`,
    })}
    ${cardGrid(cards, 4)}
  `;
}

export function hydrateSuppliers(root) {
  root.querySelector('#supplier-add')?.addEventListener('eds-click', () => {
    showToast({ message: 'Supplier intake form opened', variant: 'info' });
  });
}
