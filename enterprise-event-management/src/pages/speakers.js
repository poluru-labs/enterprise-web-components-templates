import { speakerColumns, speakers } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';

export const viewState = {
  speakerQuery: '',
};

export function renderSpeakers() {
  const pending = speakers.filter((item) => item.status === 'Pending');
  return `
    ${pageHeader({
      eyebrow: 'Program',
      title: 'Speakers',
      lead: `${speakers.length} on the grid. Mira Poluru is on stage. ${pending.length} still pending travel.`,
      actions: `<eds-button id="sp-confirm" variant="primary" icon="check">Confirm travel</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="sp-search" placeholder="Search speaker or talk" clearable></eds-search>
        <eds-select id="sp-status" label="Status"></eds-select>
        <eds-select id="sp-event" label="Event"></eds-select>
      `)}
      <eds-data-table id="sp-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'sp-empty',
        heading: 'No speakers match',
        description: 'Clear search or event to see the grid.',
        action: '<eds-button id="reset-sp" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid cols-2 mt-3">
      ${speakers
        .map(
          (item) => `
        <content-card>
          <div class="person-card">
            <eds-avatar name="${item.name}" size="md"></eds-avatar>
            <div>
              <strong>${item.name}</strong>
              <p class="muted mb-1">${item.talk}</p>
              ${statusChip(item.status)}
            </div>
          </div>
          <p class="muted mt-3 mb-1">${item.event} · ${item.slot} · ${item.room}</p>
          <eds-rating value="${item.rating}" readonly size="sm"></eds-rating>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Travel',
        body: `
          <eds-accordion>
            <eds-accordion-item heading="On stage" open>
              Mira Poluru · Welcome and house rules · Hall A 09:00.
            </eds-accordion-item>
            <eds-accordion-item heading="Pending">
              Nikhil Poluru, Sahana Poluru, and Dev Poluru still need flights.
            </eds-accordion-item>
            <eds-accordion-item heading="Green room">
              Sixteen seats held. Sahana Poluru owns the wrangle.
            </eds-accordion-item>
          </eds-accordion>`,
      })}
    </section>
  `;
}

export function hydrateSpeakers(root) {
  const table = root.querySelector('#sp-table');
  const empty = root.querySelector('#sp-empty');
  const status = root.querySelector('#sp-status');
  const event = root.querySelector('#sp-event');
  if (status) {
    status.options = [
      { label: 'All statuses', value: 'all' },
      { label: 'On stage', value: 'On stage' },
      { label: 'Confirmed', value: 'Confirmed' },
      { label: 'Pending', value: 'Pending' },
    ];
    status.value = 'all';
  }
  if (event) {
    event.options = [
      { label: 'All events', value: 'all' },
      ...[...new Set(speakers.map((item) => item.event))].map((label) => ({ label, value: label })),
    ];
    event.value = 'all';
  }
  const paint = () => {
    const query = viewState.speakerQuery.toLowerCase();
    const rows = speakers
      .filter((item) => `${item.name} ${item.talk} ${item.room}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .filter((item) => (event?.value || 'all') === 'all' || item.event === event.value);
    if (table) {
      table.columns = speakerColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#sp-search')?.addEventListener('eds-input', (event) => {
    viewState.speakerQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  event?.addEventListener('eds-change', paint);
  root.querySelector('#reset-sp')?.addEventListener('eds-click', () => {
    viewState.speakerQuery = '';
    if (status) status.value = 'all';
    if (event) event.value = 'all';
    paint();
  });
  root.querySelector('#sp-confirm')?.addEventListener('eds-click', () => {
    window.location.hash = '#/schedule';
  });
}
