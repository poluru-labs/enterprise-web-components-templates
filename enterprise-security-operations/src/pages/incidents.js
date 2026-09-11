import { incidents } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, itemGrid, pageHeader } from '../components/widgets.js';

export function renderIncidents() {
  return `
    ${pageHeader({
      eyebrow: 'Response',
      title: 'Incidents',
      lead: 'Maya Poluru commands the desk. Ishaan Poluru holds endpoint. Arjun Poluru owns the exposed key.',
      actions: '<eds-button id="inc-add" variant="primary" icon="plus">Open incident</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="inc-search" placeholder="Filter incidents" clearable></eds-search>
      <eds-select id="inc-status" label="Status"></eds-select>
      <eds-select id="inc-severity" label="Severity"></eds-select>
    `)}
    <div id="inc-grid"></div>
    <eds-empty-state id="inc-empty" hidden heading="No matches" description="Try a code, owner, or queue." icon="search"></eds-empty-state>
  `;
}

export function hydrateIncidents(root) {
  const grid = root.querySelector('#inc-grid');
  const empty = root.querySelector('#inc-empty');
  const search = root.querySelector('#inc-search');
  const status = root.querySelector('#inc-status');
  const severity = root.querySelector('#inc-severity');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'Investigating', value: 'investigating' },
      { label: 'Contained', value: 'contained' },
      { label: 'Watch', value: 'watch' },
      { label: 'Closed', value: 'closed' },
    ];
  }
  if (severity) {
    severity.options = [
      { label: 'All severities', value: '' },
      { label: 'Critical', value: 'critical' },
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(incidents, search?.value ?? '', ['code', 'title', 'owner', 'queue', 'playbook']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (severity?.value) hits = hits.filter((item) => item.severity === severity.value);
    if (grid) grid.innerHTML = hits.length ? itemGrid(hits, (item) => `#/incident/${item.id}`) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  severity?.addEventListener('eds-change', paint);
  root.querySelector('#inc-add')?.addEventListener('eds-click', () => document.querySelector('#incident-modal')?.show());
}
