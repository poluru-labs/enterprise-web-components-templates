import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { inspections } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderInspections() {
  return `
    ${pageHeader({
      eyebrow: 'Compliance',
      title: 'Inspections',
      lead: `Ishaan Poluru’s queue. DOT annuals, pre-trips, and post-repair stamps for Poluru Yards.`,
      actions: '<eds-button id="ins-pass" variant="primary" icon="check">Pass selected</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="ins-search" placeholder="Filter inspections" clearable></eds-search>
      <eds-select id="ins-status" label="Status"></eds-select>
    `)}
    <div id="ins-table"></div>
    <eds-empty-state id="ins-empty" hidden heading="No matches" description="Try a unit, inspector, or type." icon="search"></eds-empty-state>
  `;
}

export function hydrateInspections(root) {
  const table = root.querySelector('#ins-table');
  const empty = root.querySelector('#ins-empty');
  const search = root.querySelector('#ins-search');
  const status = root.querySelector('#ins-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Due', value: 'due' },
      { label: 'Scheduled', value: 'scheduled' },
      { label: 'Passed', value: 'passed' },
      { label: 'In shop', value: 'in_shop' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(inspections, search?.value ?? '', ['vehicle', 'inspector', 'type', 'notes']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
    if (!table) return;
    if (!hits.length) {
      table.innerHTML = '';
      return;
    }
    table.innerHTML = `
      <table class="inspect-table">
        <thead>
          <tr><th>Unit</th><th>Type</th><th>Inspector</th><th>Due</th><th>Result</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.vehicle}</td>
              <td>${item.type}</td>
              <td>${item.inspector}</td>
              <td>${item.due}</td>
              <td>${item.result}</td>
              <td>${statusChip(item.status)}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    `;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#ins-pass')?.addEventListener('eds-click', () => {
    showToast({ message: 'Inspection passed (demo)', variant: 'success' });
  });
}
