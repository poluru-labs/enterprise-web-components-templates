import { policies } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, policyGrid } from '../components/widgets.js';

export function renderPolicies() {
  return `
    ${pageHeader({
      eyebrow: 'Register',
      title: 'Policies',
      lead: `${policies.length} living documents. Kavya Poluru owns the register; Anika Poluru holds privacy.`,
      actions: '<eds-button id="policies-add" variant="primary" icon="plus">New policy</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="pol-search" placeholder="Filter policies" clearable></eds-search>
      <eds-select id="pol-status" label="Status"></eds-select>
      <eds-select id="pol-framework" label="Framework"></eds-select>
    `)}
    <div id="pol-grid"></div>
    <eds-empty-state id="pol-empty" hidden heading="No matches" description="Try another title, owner, or framework." icon="search"></eds-empty-state>
  `;
}

export function hydratePolicies(root) {
  const grid = root.querySelector('#pol-grid');
  const empty = root.querySelector('#pol-empty');
  const search = root.querySelector('#pol-search');
  const status = root.querySelector('#pol-status');
  const framework = root.querySelector('#pol-framework');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Published', value: 'published' },
      { label: 'In review', value: 'in_review' },
      { label: 'Watch', value: 'watch' },
      { label: 'Draft', value: 'draft' },
    ];
  }
  if (framework) {
    framework.options = [
      { label: 'All frameworks', value: '' },
      ...[...new Set(policies.map((item) => item.framework))].map((value) => ({ label: value, value })),
    ];
  }

  const paint = () => {
    let hits = searchRecords(policies, search?.value ?? '', ['code', 'name', 'owner', 'framework']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (framework?.value) hits = hits.filter((item) => item.framework === framework.value);
    if (grid) grid.innerHTML = hits.length ? policyGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  framework?.addEventListener('eds-change', paint);
  root.querySelector('#policies-add')?.addEventListener('eds-click', () => document.querySelector('#policy-modal')?.show());
}
