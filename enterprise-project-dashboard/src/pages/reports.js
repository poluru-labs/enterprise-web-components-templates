import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { apiSnippet, reports } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Exports',
      title: 'Reports',
      lead: 'Burndown, capacity, risks, and time — download or pipe through the API.',
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="card-grid cols-2">
          ${reports
            .map(
              (item) => `
            <content-card>
              <div slot="header" class="section-title">
                <h2>${item.name}</h2>
                <eds-badge label="${item.format}" variant="neutral" pill></eds-badge>
              </div>
              <p class="muted">Owner ${item.owner} · ${item.updated}</p>
              <eds-button-group>
                <eds-button class="export-csv" variant="secondary" icon="download" data-name="${item.name}">CSV</eds-button>
                <eds-button class="export-pdf" variant="primary" icon="file" data-name="${item.name}">PDF</eds-button>
              </eds-button-group>
            </content-card>`,
            )
            .join('')}
        </div>
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Project API',
          body: `<eds-code-snippet id="api-snippet" language="json"></eds-code-snippet>
            <eds-file-upload class="mt-3" label="Upload a CSV export" accept=".csv,.xlsx" hint="Used for capacity imports."></eds-file-upload>`,
        })}
      </div>
    </div>
  `;
}

export function hydrateReports(root) {
  const snippet = root.querySelector('#api-snippet');
  if (snippet) snippet.code = apiSnippet;
  root.querySelectorAll('.export-csv, .export-pdf').forEach((button) => {
    button.addEventListener('eds-click', () => {
      showToast({ message: `${button.dataset.name} queued`, variant: 'success' });
    });
  });
}
