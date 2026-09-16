import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { cadence, sessions } from '../data/index.js';
import { cadenceList, pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderSchedule() {
  const live = sessions.filter((item) => item.status === 'Live' || item.status === 'Next');
  return `
    ${pageHeader({
      eyebrow: 'Run of show',
      title: 'Schedule',
      lead: `${sessions.length} sessions on the board. ${live.length} live or next. Welcome is in Hall A until 09:30.`,
      actions: `<eds-button id="ss-hold" variant="primary" icon="clock">Hold a slot</eds-button>`,
    })}
    <eds-card padded>
      <eds-data-table id="ss-table" sortable striped></eds-data-table>
    </eds-card>
    <div class="card-grid mt-3">
      ${sessions
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.title}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-1">${item.start} – ${item.end} · ${item.room}</p>
          <p class="muted mb-0">${item.speaker}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-7">
        ${sheet({
          title: 'Today',
          action: '<eds-badge label="16 Sep" variant="brand" pill></eds-badge>',
          body: cadenceList(
            sessions
              .filter((item) => item.eventId === 'ev_north')
              .map((item) => ({
                label: item.title,
                description: `${item.start}–${item.end} · ${item.speaker} · ${item.room}`,
                timestamp: '16 Sep',
                status: item.status,
              })),
          ),
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'House clock',
          body: cadenceList(cadence),
        })}
      </div>
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'Hold a slot',
        body: `
          <div class="row g-3">
            <div class="col-md-4">
              <eds-date-picker id="ss-day" label="Day"></eds-date-picker>
            </div>
            <div class="col-md-4">
              <eds-time-picker id="ss-time" label="Start"></eds-time-picker>
            </div>
            <div class="col-md-4">
              <eds-select id="ss-room" label="Room"></eds-select>
            </div>
          </div>
          <eds-button class="mt-3" id="save-slot" variant="primary">Hold</eds-button>`,
      })}
    </section>
  `;
}

export function hydrateSchedule(root) {
  const table = root.querySelector('#ss-table');
  if (table) {
    table.columns = [
      { key: 'start', label: 'Start', sortable: true },
      { key: 'end', label: 'End' },
      { key: 'title', label: 'Session' },
      { key: 'room', label: 'Room' },
      { key: 'speaker', label: 'Speaker' },
      { key: 'status', label: 'Status' },
    ];
    table.rows = sessions;
  }
  const room = root.querySelector('#ss-room');
  if (room) {
    room.options = [...new Set(sessions.map((item) => item.room))].map((label) => ({ label, value: label }));
    room.value = 'Hall A';
  }
  root.querySelector('#ss-hold')?.addEventListener('eds-click', () => {
    root.querySelector('#ss-day')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  root.querySelector('#save-slot')?.addEventListener('eds-click', () => {
    showToast({ message: 'Slot held on the board', variant: 'success' });
  });
}
