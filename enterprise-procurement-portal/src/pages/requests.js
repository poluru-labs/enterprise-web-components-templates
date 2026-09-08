import { requests } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, requestGrid } from '../components/widgets.js';

export function renderRequests() {
  return `
    ${pageHeader({
      eyebrow: 'Purchase requests',
      title: 'Requests',
      lead: `${requests.length} PRs on the board. Filter by requester, category, or status, then open a card.`,
      actions: '<eds-button id="requests-add" variant="primary" icon="plus">New request</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="pr-search" placeholder="Filter requests" clearable></eds-search>
      <eds-select id="pr-status" label="Status"></eds-select>
      <eds-select id="pr-category" label="Category"></eds-select>
    `)}
    <div id="pr-grid"></div>
    <eds-empty-state id="pr-empty" hidden heading="No matches" description="Try another title, requester, or status." icon="search"></eds-empty-state>
  `;
}

export function hydrateRequests(root) {
  const grid = root.querySelector('#pr-grid');
  const empty = root.querySelector('#pr-empty');
  const search = root.querySelector('#pr-search');
  const status = root.querySelector('#pr-status');
  const category = root.querySelector('#pr-category');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Draft', value: 'draft' },
      { label: 'Pending', value: 'pending' },
      { label: 'Approved', value: 'approved' },
      { label: 'Ordered', value: 'ordered' },
      { label: 'Received', value: 'received' },
      { label: 'Rejected', value: 'rejected' },
    ];
  }
  if (category) {
    category.options = [
      { label: 'All categories', value: '' },
      ...[...new Set(requests.map((item) => item.category))].map((value) => ({ label: value, value })),
    ];
  }

  const paint = () => {
    let hits = searchRecords(requests, search?.value ?? '', ['number', 'title', 'requester', 'supplier', 'category']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (category?.value) hits = hits.filter((item) => item.category === category.value);
    if (grid) grid.innerHTML = hits.length ? requestGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  category?.addEventListener('eds-change', paint);
  root.querySelector('#requests-add')?.addEventListener('eds-click', () => document.querySelector('#request-modal')?.show());
}
