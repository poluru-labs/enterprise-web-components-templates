import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { reports } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Exports',
      title: 'Reports',
      lead: 'Shift summaries, SLA registers, and workload exports for Poluru Support.',
      actions: '<eds-button id="report-run" variant="primary" icon="download">Run report</eds-button>',
    })}
    <eds-card padded>
      <eds-data-table id="report-table" compact striped></eds-data-table>
    </eds-card>
    <section class="row g-3 mt-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Scheduled exports',
          body: '<eds-list id="scheduled-reports" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Quick export',
          body: `
            <eds-select id="report-type" label="Report type"></eds-select>
            <eds-date-picker id="report-from" label="From" class="mt-3"></eds-date-picker>
            <eds-date-picker id="report-to" label="To" class="mt-3"></eds-date-picker>
            <eds-button id="quick-export" variant="secondary" icon="download" class="mt-3">Export</eds-button>
          `,
        })}
      </div>
    </section>
  `;
}

export function hydrateReports(root) {
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
  const scheduled = root.querySelector('#scheduled-reports');
  if (scheduled) {
    scheduled.items = [
      { label: 'Daily shift summary', description: 'Elena Poluru · 8 PM', icon: 'clock' },
      { label: 'Weekly SLA register', description: 'Tara Poluru · Mondays', icon: 'file' },
      { label: 'CSAT trend pack', description: 'Nila Poluru · Fridays', icon: 'download' },
    ];
  }
  const reportType = root.querySelector('#report-type');
  if (reportType) {
    reportType.options = [
      { label: 'Shift summary', value: 'shift' },
      { label: 'SLA breach register', value: 'sla' },
      { label: 'Agent workload', value: 'workload' },
    ];
    reportType.value = 'shift';
  }
  root.querySelector('#report-run')?.addEventListener('eds-click', () => {
    showToast({ message: 'Report queued for generation', variant: 'success' });
  });
  root.querySelector('#quick-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Export started', variant: 'info' });
  });
}
