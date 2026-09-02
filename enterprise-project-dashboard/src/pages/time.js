import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { timeColumns, timesheets } from '../data/index.js';
import { filterBar, pageHeader } from '../components/widgets.js';

export function renderTime() {
  return `
    ${pageHeader({
      eyebrow: 'Week of 1 Sep',
      title: 'Time',
      lead: 'Hours by person and project. Submit before Friday 16:00 Chicago.',
      actions: `<eds-button id="log-time" variant="primary" icon="plus">Log hours</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-date-picker id="time-day" label="Day"></eds-date-picker>
        <eds-time-picker id="time-from" label="From"></eds-time-picker>
        <eds-number-input id="time-hours" label="Hours" value="6" min="0" max="12" step="0.5"></eds-number-input>
        <eds-checkbox id="time-billable" label="Billable" checked></eds-checkbox>
      `)}
      <eds-data-table id="time-table" striped compact></eds-data-table>
    </eds-card>
  `;
}

export function hydrateTime(root) {
  const table = root.querySelector('#time-table');
  if (table) {
    table.columns = timeColumns;
    table.rows = timesheets.map((row) => ({ ...row }));
  }
  root.querySelector('#log-time')?.addEventListener('eds-click', () => {
    showToast({ message: '6 hours logged to Harbor Checkout', variant: 'success' });
  });
}
