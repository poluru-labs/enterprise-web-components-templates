import { attendance, attendanceColumns, attendTrend, events, people, policies } from '../data/index.js';
import { houseMix, pageHeader, sheet, sparkline, statusChip } from '../components/widgets.js';

export function renderAttendance() {
  const watch = attendance.filter((item) => item.status === 'Watch');
  return `
    ${pageHeader({
      eyebrow: 'Gates',
      title: 'Attendance',
      lead: '76% of 1,284 guests are in. Foyer B is the lag. Fold breakfast closed at 91%.',
      actions: `
        <eds-popover heading="Bands">
          <eds-button slot="trigger" variant="tertiary" icon="info">Bands</eds-button>
          <p class="mb-0">On track is over 80%. Watch is under 60% an hour after doors. Complete is a closed gate.</p>
        </eds-popover>
        <eds-button id="at-checkin" variant="primary" icon="check">Check in</eds-button>
      `,
    })}
    <eds-alert variant="warning" title="Foyer B is at 57%" message="Printer 2 jammed. Elena Poluru owns the desk. 200 of 350 scanned."></eds-alert>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Gates',
          body: '<eds-data-table id="at-table" sortable striped></eds-data-table>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Mix',
          body: houseMix(events),
        })}
      </div>
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'Check-in trend',
        action: '<eds-badge label="T12W" variant="brand" pill></eds-badge>',
        body: `${sparkline(attendTrend, 'Trailing twelve weeks of house check-in')}
          <p class="muted mb-0 mt-2">House moved from 42% to 76% over twelve weeks. Summit day 1 is the spike.</p>`,
      })}
    </section>
    <div class="card-grid mt-3">
      ${attendance
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.gate}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.event} · ${item.owner}</p>
          <eds-progress-bar value="${item.rate}" max="100" label="${item.scanned} of ${item.capacity}" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Watch',
          body: `
            <p class="muted">${watch.length} gate${watch.length === 1 ? '' : 's'} under the band.</p>
            <eds-list id="at-watch" divided></eds-list>`,
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Desk load',
          body: `
            <div class="card-grid cols-2">
              ${people
                .filter((person) => person.squad === 'Desk' || person.squad === 'Venues')
                .map(
                  (person) => `
                <content-card>
                  <div class="person-card">
                    <eds-avatar name="${person.name}" size="md"></eds-avatar>
                    <div>
                      <strong>${person.name}</strong>
                      <p class="muted mb-1">${person.role} · ${person.book}</p>
                      ${statusChip(person.score >= 85 ? 'On track' : 'Watch')}
                    </div>
                  </div>
                  <eds-progress-bar class="mt-3" value="${person.score}" max="100" label="${person.score}" show-value></eds-progress-bar>
                </content-card>`,
                )
                .join('')}
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'House rules',
        body: `
          <div class="card-grid cols-2">
            ${policies
              .map(
                (item) => `
              <content-card>
                <div slot="header" class="section-title">
                  <h2>${item.name}</h2>
                  ${statusChip(item.status)}
                </div>
                <p class="muted mb-0">${item.trigger} · ${item.owner} · ${item.steps} steps</p>
              </content-card>`,
              )
              .join('')}
          </div>`,
      })}
    </section>
  `;
}

export function hydrateAttendance(root) {
  const table = root.querySelector('#at-table');
  if (table) {
    table.columns = attendanceColumns;
    table.rows = attendance.map((item) => ({
      ...item,
      rate: `${item.rate}%`,
    }));
  }
  const watch = root.querySelector('#at-watch');
  if (watch) {
    watch.items = attendance
      .filter((item) => item.status === 'Watch')
      .map((item) => ({
        label: `${item.gate} · ${item.rate}%`,
        description: `${item.event} · ${item.owner}`,
        icon: 'alert-triangle',
        href: '#/attendance',
      }));
  }
  root.querySelector('#at-checkin')?.addEventListener('eds-click', () => document.querySelector('#checkin-modal')?.show());
}
