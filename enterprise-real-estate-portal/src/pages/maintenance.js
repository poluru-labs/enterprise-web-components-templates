import { workOrders } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, workGrid } from '../components/widgets.js';

export function renderMaintenance() {
  return `
    ${pageHeader({
      eyebrow: 'Ops',
      title: 'Maintenance',
      lead: `Nikhil Poluru’s queue. ${workOrders.length} requests on the book. Filter, then open a card.`,
      actions: '<eds-button id="wo-add" variant="primary" icon="plus">Log request</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="wo-search" placeholder="Filter work orders" clearable></eds-search>
      <eds-select id="wo-status" label="Status"></eds-select>
    `)}
    <div id="wo-grid"></div>
    <eds-empty-state id="wo-empty" hidden heading="No matches" description="Try a property, trade, or reporter." icon="search"></eds-empty-state>
  `;
}

export function hydrateMaintenance(root) {
  const grid = root.querySelector('#wo-grid');
  const empty = root.querySelector('#wo-empty');
  const search = root.querySelector('#wo-search');
  const status = root.querySelector('#wo-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'In progress', value: 'in_progress' },
      { label: 'Scheduled', value: 'scheduled' },
      { label: 'Closed', value: 'closed' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(workOrders, search?.value ?? '', ['property', 'unit', 'type', 'title', 'reporter']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (grid) grid.innerHTML = hits.length ? workGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#wo-add')?.addEventListener('eds-click', () => document.querySelector('#wo-modal')?.show());
}
