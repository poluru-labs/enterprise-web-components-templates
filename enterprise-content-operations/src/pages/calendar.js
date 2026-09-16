import { pieces, weekSlots } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, pieceGrid, sheet, statusChip } from '../components/widgets.js';
import { statusLabel } from '../lib/status.js';

export function renderCalendar() {
  return `
    ${pageHeader({
      eyebrow: 'Planning',
      title: 'Calendar',
      lead: `${pieces.length} pieces on the Fieldline week. Filter by desk or status, then open a card.`,
      actions: '<eds-button id="cal-add" variant="primary" icon="plus">New piece</eds-button>',
    })}
    <eds-toolbar bordered class="mb-3">
      <eds-segmented-control id="cal-view" slot="start"></eds-segmented-control>
      <eds-date-picker id="cal-date" slot="center" label="Week of" value="2026-09-15"></eds-date-picker>
      <eds-tag slot="end" label="Copy is hot" variant="warning" icon="alert-triangle"></eds-tag>
    </eds-toolbar>
    ${filterBar(`
      <eds-search id="cal-search" placeholder="Filter pieces" clearable></eds-search>
      <eds-select id="cal-status" label="Status"></eds-select>
      <eds-select id="cal-desk" label="Desk"></eds-select>
    `)}
    <eds-tabs id="cal-tabs" selected-index="0">
      <eds-tab label="Board" active>
        <div id="cal-grid" class="mt-3"></div>
        <eds-empty-state id="cal-empty" hidden heading="No matches" description="Try a headline, desk, or owner." icon="search"></eds-empty-state>
      </eds-tab>
      <eds-tab label="Slots">
        <div class="mt-3">
          ${sheet({
            title: 'This week',
            action: '<eds-badge label="8 slots" variant="brand" pill></eds-badge>',
            body: `
              <table class="slot-table">
                <thead>
                  <tr><th>Day</th><th>Slot</th><th>Piece</th><th>Owner</th><th>Status</th></tr>
                </thead>
                <tbody>
                  ${weekSlots
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.day}</td>
                      <td>${item.slot}</td>
                      <td>${item.piece}</td>
                      <td>${item.owner}</td>
                      <td>${statusChip(item.status)}</td>
                    </tr>`,
                    )
                    .join('')}
                </tbody>
              </table>`,
          })}
        </div>
      </eds-tab>
    </eds-tabs>
  `;
}

export function hydrateCalendar(root) {
  const grid = root.querySelector('#cal-grid');
  const empty = root.querySelector('#cal-empty');
  const search = root.querySelector('#cal-search');
  const status = root.querySelector('#cal-status');
  const desk = root.querySelector('#cal-desk');
  const segmented = root.querySelector('#cal-view');

  if (segmented) {
    segmented.options = [
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
    ];
    segmented.value = 'week';
  }

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Draft', value: 'draft' },
      { label: 'Copy', value: 'copy' },
      { label: 'In review', value: 'in_review' },
      { label: 'Approved', value: 'approved' },
      { label: 'Scheduled', value: 'scheduled' },
      { label: 'Published', value: 'published' },
    ];
    status.value = '';
  }
  if (desk) {
    desk.options = [
      { label: 'All desks', value: '' },
      ...[...new Set(pieces.map((item) => item.desk))].map((value) => ({
        label: statusLabel(value),
        value,
      })),
    ];
    desk.value = '';
  }

  const paint = () => {
    let hits = searchRecords(pieces, search?.value ?? '', ['code', 'title', 'desk', 'owner', 'author']);
    const statusValue = status?.value;
    const deskValue = desk?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (deskValue && deskValue !== 'All desks') hits = hits.filter((item) => item.desk === deskValue);
    if (grid) grid.innerHTML = hits.length ? pieceGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  desk?.addEventListener('eds-change', paint);
  root.querySelector('#cal-add')?.addEventListener('eds-click', () => document.querySelector('#piece-modal')?.show());
}
