import { qualityColumns, qualityRules } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderQuality() {
  const failing = qualityRules.filter((item) => item.status === 'Failing' || item.status === 'Watch');
  return `
    ${pageHeader({
      eyebrow: 'Quality',
      title: 'Published rules',
      lead: '155 checks on gold assets. 91.4% passing. Two critical rules need owners today.',
      actions: `<eds-button variant="primary" icon="plus" id="add-rule">Add rule</eds-button>`,
    })}
    <div class="triple">
      ${sheet({ title: 'Passing', body: '<eds-stat id="q-pass"></eds-stat>' })}
      ${sheet({ title: 'Watch', body: '<eds-stat id="q-watch"></eds-stat>' })}
      ${sheet({ title: 'Failing', body: '<eds-stat id="q-fail"></eds-stat>' })}
    </div>
    ${sheet({
      title: 'Needs a steward',
      body: `<div class="stack">${failing
        .map(
          (item) => `
        <div class="person-head">
          <div>
            <strong>${item.name}</strong>
            <small class="asset-meta">${item.asset} · ${item.owner}</small>
          </div>
          ${statusChip(item.status)}
        </div>`,
        )
        .join('')}</div>`,
    })}
    ${sheet({
      title: 'Rule register',
      body: `<eds-toolbar bordered>
          <eds-search id="rule-search" placeholder="Find a rule" clearable></eds-search>
        </eds-toolbar>
        <eds-data-table id="rule-table" sortable></eds-data-table>
        <eds-pagination id="rule-page" page-size="6"></eds-pagination>`,
    })}
  `;
}

export function hydrateQuality(root) {
  Object.assign(root.querySelector('#q-pass') ?? {}, { label: 'Passing', value: '142', hint: 'of 155 checks', trend: 'up', trendValue: '+4' });
  Object.assign(root.querySelector('#q-watch') ?? {}, { label: 'Watch', value: '11', hint: 'Need a rerun', trend: 'flat', trendValue: 'Hold' });
  Object.assign(root.querySelector('#q-fail') ?? {}, { label: 'Failing', value: '2', hint: 'Critical path', trend: 'down', trendValue: '−1' });
  const table = root.querySelector('#rule-table');
  const search = root.querySelector('#rule-search');
  const page = root.querySelector('#rule-page');
  let query = '';
  let current = 1;
  const paint = () => {
    const rows = qualityRules.filter((item) => `${item.name} ${item.asset} ${item.owner}`.toLowerCase().includes(query));
    const start = (current - 1) * 6;
    if (table) {
      table.columns = qualityColumns;
      table.rows = rows.slice(start, start + 6);
    }
    if (page) {
      page.total = rows.length;
      page.page = current;
    }
  };
  paint();
  search?.addEventListener('eds-input', (event) => {
    query = (event.detail?.value || '').toLowerCase();
    current = 1;
    paint();
  });
  page?.addEventListener('eds-change', (event) => {
    current = event.detail?.page || 1;
    paint();
  });
  root.querySelector('#add-rule')?.addEventListener('eds-click', () => document.querySelector('#rule-modal')?.show());
}
