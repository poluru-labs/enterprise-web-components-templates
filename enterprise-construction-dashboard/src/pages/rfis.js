import { rfis } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, rfiGrid } from '../components/widgets.js';

export function renderRfis() {
  return `
    ${pageHeader({
      eyebrow: 'Questions',
      title: 'RFIs',
      lead: `Ishaan Poluru’s queue. ${rfis.length} questions on the book. Filter, then open a card.`,
      actions: '<eds-button id="rfi-add" variant="primary" icon="plus">Log RFI</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="rfi-search" placeholder="Filter RFIs" clearable></eds-search>
      <eds-select id="rfi-status" label="Status"></eds-select>
    `)}
    <div id="rfi-grid"></div>
    <eds-empty-state id="rfi-empty" hidden heading="No matches" description="Try a number, job, or author." icon="search"></eds-empty-state>
  `;
}

export function hydrateRfis(root) {
  const grid = root.querySelector('#rfi-grid');
  const empty = root.querySelector('#rfi-empty');
  const search = root.querySelector('#rfi-search');
  const status = root.querySelector('#rfi-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Answered', value: 'answered' },
      { label: 'Overdue', value: 'overdue' },
      { label: 'Closed', value: 'closed' },
      { label: 'Draft', value: 'draft' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(rfis, search?.value ?? '', ['number', 'title', 'site', 'author', 'to']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (grid) grid.innerHTML = hits.length ? rfiGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#rfi-add')?.addEventListener('eds-click', () => document.querySelector('#rfi-modal')?.show());
}
