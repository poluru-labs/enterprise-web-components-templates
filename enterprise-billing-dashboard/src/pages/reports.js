import { reports } from '../data/index.js';
import { cardGrid, contentCard, pageHeader } from '../components/widgets.js';
import { showToast } from '@poluru-labs/enterprise-design-system-wc';

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Close',
      title: 'Reports',
      lead: 'Aging, reconciliation, retention, and tax — eight equal packs for finance review.',
    })}
    ${cardGrid(
      reports.map(
        (item, index) => contentCard({
          title: item.name,
          action: `<eds-badge label="Report ${index + 1}" variant="brand" pill></eds-badge>`,
          body: `
            <p class="muted">${item.description}</p>
            <p class="muted mb-0">Owner ${item.owner} · ${item.updated}</p>
            <div class="inline-actions">
              <eds-button class="export-csv" variant="secondary" icon="download" data-name="${item.name}">CSV</eds-button>
              <eds-button class="export-pdf" variant="primary" icon="file" data-name="${item.name}">PDF</eds-button>
            </div>
          `,
        }),
      ),
      'col-sm-6 col-xl-3',
    )}
  `;
}

export function hydrateReports(root) {
  root.querySelectorAll('.export-csv, .export-pdf').forEach((button) => {
    button.addEventListener('eds-click', () => {
      showToast({ message: `${button.dataset.name} ${button.classList.contains('export-pdf') ? 'PDF' : 'CSV'} ready`, variant: 'success' });
    });
  });
}
