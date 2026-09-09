import { controls } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { controlGrid, filterBar, pageHeader } from '../components/widgets.js';

export function renderControls() {
  return `
    ${pageHeader({
      eyebrow: 'Mapping',
      title: 'Controls',
      lead: 'Maya Poluru owns access. Dev Poluru owns detection. Two GDPR rows still show as gaps.',
    })}
    ${filterBar(`
      <eds-search id="ctl-search" placeholder="Filter controls" clearable></eds-search>
      <eds-select id="ctl-status" label="Status"></eds-select>
      <eds-select id="ctl-framework" label="Framework"></eds-select>
    `)}
    <div id="ctl-grid"></div>
    <eds-empty-state id="ctl-empty" hidden heading="No matches" description="Try a control code or owner." icon="search"></eds-empty-state>
  `;
}

export function hydrateControls(root) {
  const grid = root.querySelector('#ctl-grid');
  const empty = root.querySelector('#ctl-empty');
  const search = root.querySelector('#ctl-search');
  const status = root.querySelector('#ctl-status');
  const framework = root.querySelector('#ctl-framework');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Mapped', value: 'mapped' },
      { label: 'Watch', value: 'watch' },
      { label: 'Gap', value: 'gap' },
    ];
  }
  if (framework) {
    framework.options = [
      { label: 'All frameworks', value: '' },
      ...[...new Set(controls.map((item) => item.framework))].map((value) => ({ label: value, value })),
    ];
  }

  const paint = () => {
    let hits = searchRecords(controls, search?.value ?? '', ['code', 'name', 'owner', 'framework']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (framework?.value) hits = hits.filter((item) => item.framework === framework.value);
    if (grid) grid.innerHTML = hits.length ? controlGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  framework?.addEventListener('eds-change', paint);
}
