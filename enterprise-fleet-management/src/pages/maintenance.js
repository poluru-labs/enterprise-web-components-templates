import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { workOrders } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, workGrid } from '../components/widgets.js';

export function renderMaintenance() {
  return `
    ${pageHeader({
      eyebrow: 'Shop',
      title: 'Maintenance',
      lead: `Subra Poluru’s board. ${workOrders.length} work orders across Austin and Dallas bays.`,
      actions: '<eds-button id="wo-complete" variant="primary" icon="check">Mark complete</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="wo-search" placeholder="Filter work orders" clearable></eds-search>
      <eds-select id="wo-status" label="Status"></eds-select>
    `)}
    <div id="wo-grid"></div>
    <eds-empty-state id="wo-empty" hidden heading="No matches" description="Try a unit, bay, or owner." icon="search"></eds-empty-state>
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
      { label: 'In shop', value: 'in_shop' },
      { label: 'Scheduled', value: 'scheduled' },
      { label: 'Parts hold', value: 'parts_hold' },
      { label: 'Due', value: 'due' },
      { label: 'Complete', value: 'complete' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(workOrders, search?.value ?? '', ['vehicle', 'title', 'shop', 'owner']);
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
  root.querySelector('#wo-complete')?.addEventListener('eds-click', () => {
    showToast({ message: 'Work order marked complete (demo)', variant: 'success' });
  });
}
