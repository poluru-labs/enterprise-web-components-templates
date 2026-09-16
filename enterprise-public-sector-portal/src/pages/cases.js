import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { caseColumns, cases } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';

export const viewState = {
  caseQuery: '',
};

export function renderCases() {
  const open = cases.filter((item) => item.status !== 'Closed');
  return `
    ${pageHeader({
      eyebrow: 'Docket',
      title: 'Cases',
      lead: `${open.length} open. Noise at 6 Dock is on the board today. Housing vacancy hearing is 18 Sep.`,
      actions: `<eds-button id="cs-hearing" variant="primary" icon="plus">Set hearing</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="cs-search" placeholder="Search title or owner" clearable></eds-search>
        <eds-select id="cs-type" label="Type"></eds-select>
        <eds-select id="cs-status" label="Status"></eds-select>
      `)}
      <eds-data-table id="cs-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'cs-empty',
        heading: 'No cases match',
        description: 'Clear type or status to see the docket.',
        action: '<eds-button id="reset-cs" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${cases
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.code}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.title}</p>
          <div class="tag-row mb-2">
            <eds-tag label="${item.type}" variant="brand"></eds-tag>
            <eds-tag label="${item.ward}" variant="neutral"></eds-tag>
          </div>
          <p class="muted mb-0">${item.owner} · hearing ${item.hearing}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Board',
        body: `
          <eds-accordion>
            <eds-accordion-item heading="Today" open>
              Repeat noise at 6 Dock. Rohan Poluru presents. Mira Poluru chairs.
            </eds-accordion-item>
            <eds-accordion-item heading="18 Sep">
              Housing vacancy at 14 Elm. Sahana Poluru owns the file.
            </eds-accordion-item>
            <eds-accordion-item heading="22–24 Sep">
              Illegal dump alley 9 and the cafe license renewal.
            </eds-accordion-item>
          </eds-accordion>`,
      })}
    </section>
  `;
}

export function hydrateCases(root) {
  const table = root.querySelector('#cs-table');
  const empty = root.querySelector('#cs-empty');
  const type = root.querySelector('#cs-type');
  const status = root.querySelector('#cs-status');
  if (type) {
    type.options = [
      { label: 'All types', value: 'all' },
      { label: 'Housing', value: 'Housing' },
      { label: 'Code', value: 'Code' },
      { label: 'Licensing', value: 'Licensing' },
      { label: 'Sanitation', value: 'Sanitation' },
    ];
    type.value = 'all';
  }
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'Open', value: 'Open' },
      { label: 'In progress', value: 'In progress' },
      { label: 'Hearing', value: 'Hearing' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Closed', value: 'Closed' },
    ];
    status.value = 'all';
  }
  const paint = () => {
    const query = viewState.caseQuery.toLowerCase();
    const rows = cases
      .filter((item) => `${item.title} ${item.owner} ${item.code}`.toLowerCase().includes(query))
      .filter((item) => (type?.value || 'all') === 'all' || item.type === type.value)
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value);
    if (table) {
      table.columns = caseColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#cs-search')?.addEventListener('eds-input', (event) => {
    viewState.caseQuery = event.detail?.value ?? '';
    paint();
  });
  type?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-cs')?.addEventListener('eds-click', () => {
    viewState.caseQuery = '';
    if (type) type.value = 'all';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#cs-hearing')?.addEventListener('eds-click', () => document.querySelector('#hearing-modal')?.show());
  table?.addEventListener('click', () => {
    showToast({ message: 'Open the hearing modal to set a date', variant: 'info' });
  });
}
