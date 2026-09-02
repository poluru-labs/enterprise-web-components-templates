import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { apiSnippet, reports, reviews } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Exports',
      title: 'Reports',
      lead: 'Standard exports for stock snapshots, reorder points, supplier scorecards, and dock logs.',
      actions: `<eds-button id="report-add" variant="primary" icon="plus">New report</eds-button>`,
    })}
    <eds-card padded>
      <eds-data-table id="report-table" striped></eds-data-table>
    </eds-card>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-7">
        ${sheet({
          title: 'This week',
          body: '<eds-timeline id="review-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Inventory API',
          body: `<eds-code-snippet id="api-snippet" language="json"></eds-code-snippet>
            <eds-file-upload class="mt-3" label="Upload a CSV import" accept=".csv,.xlsx" hint="Used for bulk SKU updates."></eds-file-upload>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Next cycle count',
          body: `
            <eds-date-picker id="review-day" label="Date"></eds-date-picker>
            <eds-time-picker class="mt-3" id="review-time" label="Start"></eds-time-picker>
            <eds-checkbox class="mt-3" id="review-board" label="Include supplier appendix" checked></eds-checkbox>
            <eds-button class="mt-3" id="schedule-review" variant="primary">Hold the slot</eds-button>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateReports(root) {
  const snippet = root.querySelector('#api-snippet');
  if (snippet) snippet.code = apiSnippet;
  root.querySelector('#schedule-review')?.addEventListener('eds-click', () => {
    showToast({ message: 'Cycle count held on the calendar', variant: 'success' });
  });
  const timeline = root.querySelector('#review-timeline');
  if (timeline) timeline.items = reviews;
  const table = root.querySelector('#report-table');
  if (table) {
    table.columns = [
      { key: 'name', label: 'Report', sortable: true },
      { key: 'owner', label: 'Owner' },
      { key: 'updated', label: 'Updated' },
      { key: 'format', label: 'Format' },
    ];
    table.rows = reports;
  }
}
