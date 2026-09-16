import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { schedule } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderSchedule() {
  return `
    ${pageHeader({
      eyebrow: 'Slots',
      title: 'Schedule',
      lead: `Dev Poluru and Rohan Poluru hold the 06:00 window. Eight ships on the Fieldline week.`,
      actions: '<eds-button id="sch-export" variant="secondary" icon="download">Export</eds-button>',
    })}
    ${filterBar(`
      <eds-date-range-picker id="sch-range" label="Window" start-value="2026-09-14" end-value="2026-09-21"></eds-date-range-picker>
      <eds-time-picker id="sch-time" label="Default slot" value="06:00"></eds-time-picker>
      <eds-search id="sch-search" placeholder="Filter slots" clearable></eds-search>
      <eds-select id="sch-status" label="Status"></eds-select>
    `)}
    ${sheet({
      title: 'Publish window',
      body: `
        <div id="sch-table"></div>
        <eds-empty-state id="sch-empty" hidden heading="No matches" description="Try a piece, channel, or owner." icon="search"></eds-empty-state>
        <eds-pagination id="sch-page" class="mt-3" page="1" page-size="8" total="8"></eds-pagination>`,
    })}
  `;
}

export function hydrateSchedule(root) {
  const table = root.querySelector('#sch-table');
  const empty = root.querySelector('#sch-empty');
  const search = root.querySelector('#sch-search');
  const status = root.querySelector('#sch-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Published', value: 'published' },
      { label: 'Scheduled', value: 'scheduled' },
      { label: 'Approved', value: 'approved' },
      { label: 'Hold', value: 'hold' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(schedule, search?.value ?? '', ['piece', 'title', 'channel', 'owner', 'slot']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
    const pager = root.querySelector('#sch-page');
    if (pager) pager.total = hits.length;
    if (!table) return;
    if (!hits.length) {
      table.innerHTML = '';
      return;
    }
    table.innerHTML = `
      <table class="sch-table">
        <thead>
          <tr><th>Piece</th><th>Headline</th><th>Slot</th><th>Channel</th><th>Owner</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.piece}</td>
              <td>${item.title}</td>
              <td>${item.slot}</td>
              <td>${item.channel}</td>
              <td>${item.owner}</td>
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
  root.querySelector('#sch-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Schedule export is a demo in this template', variant: 'info' });
  });
}
