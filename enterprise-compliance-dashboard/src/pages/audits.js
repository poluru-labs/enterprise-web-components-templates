import { audits } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { auditGrid, filterBar, pageHeader } from '../components/widgets.js';

export function renderAudits() {
  return `
    ${pageHeader({
      eyebrow: 'Fieldwork',
      title: 'Audits',
      lead: 'Priya Poluru holds SOC 2. Alder Advisory arrives 18 Sep. ISO surveillance follows in October.',
    })}
    ${filterBar(`
      <eds-search id="aud-search" placeholder="Filter audits" clearable></eds-search>
      <eds-select id="aud-status" label="Status"></eds-select>
    `)}
    <div id="aud-grid"></div>
    <eds-empty-state id="aud-empty" hidden heading="No matches" description="Try an auditor or framework." icon="search"></eds-empty-state>
  `;
}

export function hydrateAudits(root) {
  const grid = root.querySelector('#aud-grid');
  const empty = root.querySelector('#aud-empty');
  const search = root.querySelector('#aud-search');
  const status = root.querySelector('#aud-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Ready', value: 'ready' },
      { label: 'In progress', value: 'in_progress' },
      { label: 'Watch', value: 'watch' },
      { label: 'Scheduled', value: 'scheduled' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(audits, search?.value ?? '', ['name', 'auditor', 'owner', 'framework']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = hits.length ? auditGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
