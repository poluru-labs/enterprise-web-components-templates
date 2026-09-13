import { schedule } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderSchedule() {
  return `
    ${pageHeader({
      eyebrow: 'Planning',
      title: 'Schedule',
      lead: `Leela Poluru’s calendar. Near-term activities across Austin, Dallas, Houston, and the coast.`,
    })}
    ${filterBar(`
      <eds-search id="sc-search" placeholder="Filter activities" clearable></eds-search>
      <eds-select id="sc-status" label="Status"></eds-select>
    `)}
    <div id="sc-table"></div>
    <eds-empty-state id="sc-empty" hidden heading="No matches" description="Try a job, activity, or owner." icon="search"></eds-empty-state>
  `;
}

export function hydrateSchedule(root) {
  const table = root.querySelector('#sc-table');
  const empty = root.querySelector('#sc-empty');
  const search = root.querySelector('#sc-search');
  const status = root.querySelector('#sc-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'On track', value: 'on_track' },
      { label: 'Watch', value: 'watch' },
      { label: 'At risk', value: 'at_risk' },
      { label: 'Scheduled', value: 'scheduled' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(schedule, search?.value ?? '', ['site', 'activity', 'owner']);
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
      <table class="sched-table">
        <thead>
          <tr><th>Job</th><th>Activity</th><th>Start</th><th>Finish</th><th>Owner</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.site}</td>
              <td>${item.activity}</td>
              <td>${item.start}</td>
              <td>${item.finish}</td>
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
}
