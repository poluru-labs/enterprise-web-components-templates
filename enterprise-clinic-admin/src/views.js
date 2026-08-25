import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  activity,
  appointmentColumns,
  appointments,
  boardHours,
  boardRooms,
  clinic,
  kpis,
  meds,
  messages,
  orderColumns,
  orders,
  patientColumns,
  patients,
  providerColumns,
  providers,
  rooms,
  visitNotes,
  volumeWeeks,
  waitMinutes,
} from './data.js';
import {
  bars,
  chartPanel,
  emptyState,
  filterBar,
  formSection,
  hydrateStats,
  pageHeader,
  ring,
  sparkline,
  statGrid,
  statusChip,
} from './ui.js';

export const viewState = {
  appointmentQuery: '',
  appointmentStatus: 'all',
  patientQuery: '',
  orderStatus: 'all',
  messageQueue: 'all',
};

function hourIndex(time) {
  return boardHours.findIndex((hour) => time.startsWith(hour.slice(0, 2)));
}

function boardCell(room, hour) {
  const visit = appointments.find((item) => item.room === room && hourIndex(item.time) === boardHours.indexOf(hour));
  if (!visit) return '<div class="slot-empty">Open</div>';
  const tone = visit.status.replace(/\s+/g, '-').toLowerCase();
  return `
    <a class="slot-chip tone-${tone}" href="#/visit/${visit.id}">
      <strong>${visit.time}</strong>
      <span>${visit.patient}</span>
      <small>${visit.type}</small>
    </a>
  `;
}

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: 'Tuesday, 25 August 2026',
      title: 'Clinic pulse',
      lead: 'Riverside Family Medicine is running a full book. Capacity is healthy and three patients still need outreach.',
      actions: `
        <eds-button id="qa-book" variant="primary" icon="plus">Book visit</eds-button>
        <eds-button id="qa-checkin" variant="secondary" icon="check">Check in</eds-button>
        <eds-button id="qa-inbox" variant="tertiary" icon="mail">Inbox</eds-button>
      `,
    })}
    <section class="hero-panel">
      <div class="hero-copy">
        <span class="kicker">Today’s floor</span>
        <h2>Calm, on time, and nearly full.</h2>
        <p>18 patients already seen. Next open in-person slot is 16:20 in Exam 2. Telehealth A is held for Dr. Samir Poluru at 15:00.</p>
        <div class="hero-pills">
          <span>Lobby wait 11 min</span>
          <span>4 labs to review</span>
          <span>3 no-show risks</span>
        </div>
      </div>
      ${ring(82, 'Room use')}
    </section>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Wait time through the morning',
          action: '<eds-badge label="Minutes" variant="brand" pill></eds-badge>',
          body: sparkline(waitMinutes, 'Average lobby wait in minutes') + '<p class="muted mb-0 mt-2">Door-to-room time dropped after 10:00 once Exam 2 turned over.</p>',
        })}
      </div>
      <div class="col-lg-4">
        <section class="sheet">
          <div class="section-title"><h2>Live activity</h2></div>
          <eds-timeline id="floor-activity"></eds-timeline>
        </section>
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        <section class="sheet">
          <div class="section-title">
            <h2>Next on the board</h2>
            <eds-link href="#/schedule" variant="subtle">Open schedule</eds-link>
          </div>
          <eds-data-table id="upcoming-table" compact striped></eds-data-table>
        </section>
      </div>
      <div class="col-lg-5">
        <section class="sheet">
          <div class="section-title"><h2>Needs attention</h2></div>
          <eds-alert variant="danger" title="Critical A1C" message="Luis Poluru 9.4%. Same-day review with Dr. Marcus Poluru is still open."></eds-alert>
          <eds-alert class="mt-2" variant="warning" title="No-show risk" message="Leila Poluru has not confirmed the 10:20 urgent slot."></eds-alert>
          <eds-alert class="mt-2" variant="info" title="Refill waiting" message="Maya Poluru requested albuterol. Chart is already open in Exam 1."></eds-alert>
        </section>
      </div>
    </section>
  `;
}

export function renderSchedule() {
  return `
    ${pageHeader({
      eyebrow: 'Today',
      title: 'Schedule',
      lead: 'Room board for 25 August. Book, check in, or open a visit without leaving the floor view.',
      actions: `
        <eds-button id="print-board" variant="tertiary" icon="download">Print board</eds-button>
        <eds-button id="book-visit" variant="primary" icon="plus">Book visit</eds-button>
      `,
    })}
    <section class="sheet">
      ${filterBar(`
        <eds-search id="apt-search" placeholder="Search patient or provider" clearable></eds-search>
        <eds-segmented-control id="apt-status"></eds-segmented-control>
      `)}
      <div class="day-board mt-3" role="table" aria-label="Room schedule">
        <div class="board-corner">Time</div>
        ${boardRooms.map((room) => `<div class="board-head">${room}</div>`).join('')}
        ${boardHours
          .map(
            (hour) => `
            <div class="board-time">${hour}</div>
            ${boardRooms.map((room) => `<div class="board-cell">${boardCell(room, hour)}</div>`).join('')}
          `,
          )
          .join('')}
      </div>
    </section>
    <section class="sheet mt-3">
      <div class="section-title"><h2>All visits</h2></div>
      <div id="apt-table-wrap">
        <eds-data-table id="apt-table" sortable striped compact></eds-data-table>
        <p id="apt-count" class="muted mt-3 mb-0"></p>
      </div>
      ${emptyState({
        id: 'apt-empty',
        heading: 'No visits match',
        description: 'Clear status or search another name.',
        action: '<eds-button id="reset-apts" slot="actions" variant="primary">Reset filters</eds-button>',
      })}
    </section>
  `;
}

export function renderVisit(id) {
  const visit = appointments.find((item) => item.id === id) ?? appointments[0];
  const patient = patients.find((item) => item.id === visit.patientId);
  const notes = visitNotes[visit.id] ?? {
    reason: visit.type,
    vitals: [
      { term: 'BP', description: '—' },
      { term: 'HR', description: '—' },
      { term: 'Temp', description: '—' },
    ],
    timeline: [
      { title: 'Scheduled', description: `${visit.mode} · ${visit.room}`, timestamp: visit.time, status: 'current' },
      { title: 'Arrived', description: 'Waiting for check-in', timestamp: '—', status: 'upcoming' },
    ],
  };
  return `
    ${pageHeader({
      eyebrow: 'Visit',
      title: `${visit.patient}`,
      lead: `${visit.time}–${visit.end} · ${visit.provider} · ${visit.room}`,
      actions: `
        <eds-button id="visit-checkin" variant="secondary" icon="check">Check in</eds-button>
        <eds-button id="visit-room" variant="primary" icon="plus">Room patient</eds-button>
        <eds-button id="visit-chart" variant="tertiary" icon="user">Open chart</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-8">
        <section class="sheet">
          <div class="visit-hero">
            <div>
              <span class="kicker">${visit.type}</span>
              <h2>${notes.reason}</h2>
              <p class="muted mb-0">${visit.mode} · ${statusChip(visit.status)}</p>
            </div>
            <div class="visit-meta">
              <span>${visit.time}</span>
              <small>${visit.end} end</small>
            </div>
          </div>
          <eds-description-list id="visit-vitals" class="mt-3"></eds-description-list>
          <p class="muted mt-3 mb-0">Allergies ${patient?.allergies ?? 'NKDA'}. Conditions ${patient?.conditions ?? '—'}. Coverage ${patient?.coverage ?? '—'}.</p>
        </section>
      </div>
      <div class="col-lg-4">
        <section class="sheet">
          <div class="section-title"><h2>Patient</h2></div>
          <p class="mb-1"><strong>${patient?.name}</strong></p>
          <p class="muted mb-1">${patient?.mrn} · ${patient?.age} · ${patient?.sex}</p>
          <p class="muted">${patient?.phone}</p>
          <eds-link href="#/patient/${patient?.id}" variant="default">Open full chart</eds-link>
        </section>
        <section class="sheet mt-3">
          <div class="section-title"><h2>Visit flow</h2></div>
          <eds-timeline id="visit-flow"></eds-timeline>
        </section>
      </div>
    </div>
  `;
}

export function renderPatients() {
  return `
    ${pageHeader({
      eyebrow: 'Directory',
      title: 'Patients',
      lead: 'Active panel for Riverside Family Medicine. Search a name or MRN, then open the chart.',
      actions: `<eds-button id="add-patient" variant="primary" icon="plus">Register patient</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="pt-search" placeholder="Search name, MRN, or PCP" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="pt-table" sortable striped compact></eds-data-table>
      </div>
      ${emptyState({
        id: 'pt-empty',
        heading: 'No patients match',
        description: 'Try another name or MRN.',
      })}
      <p id="pt-count" class="muted mt-3 mb-0"></p>
    </section>
  `;
}

export function renderPatient(id) {
  const patient = patients.find((item) => item.id === id) ?? patients[0];
  const medList = meds[patient.id] ?? [];
  return `
    ${pageHeader({
      eyebrow: patient.mrn,
      title: patient.name,
      lead: `${patient.age} years · ${patient.sex} · PCP ${patient.pcp}`,
      actions: `
        <eds-button id="pt-book" variant="primary" icon="plus">Book visit</eds-button>
        <eds-button id="pt-message" variant="secondary" icon="mail">Message</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-4">
        <section class="sheet">
          <eds-avatar name="${patient.name}" size="lg"></eds-avatar>
          <p class="mt-2 mb-1"><strong>${patient.name}</strong></p>
          <p class="muted">${patient.email}<br>${patient.phone}</p>
          <eds-description-list id="pt-facts"></eds-description-list>
        </section>
        <section class="sheet mt-3">
          <div class="section-title"><h2>Allergies</h2></div>
          <p class="mb-0">${patient.allergies}</p>
        </section>
      </div>
      <div class="col-lg-8">
        <section class="sheet">
          <eds-tabs>
            <eds-tab label="Visits" active>
              <eds-data-table id="pt-visits" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Medications">
              <ul class="quiet-list">
                ${medList.map((item) => `<li>${item}</li>`).join('') || '<li>No active medications</li>'}
              </ul>
            </eds-tab>
            <eds-tab label="Conditions">
              <p class="mb-0">${patient.conditions}</p>
            </eds-tab>
            <eds-tab label="Coverage">
              <p class="mb-1"><strong>${patient.coverage}</strong></p>
              <p class="muted mb-0">Eligibility last verified 22 Aug 2026. Copay $25 for established visits.</p>
            </eds-tab>
          </eds-tabs>
        </section>
      </div>
    </div>
  `;
}

export function renderProviders() {
  return `
    ${pageHeader({
      eyebrow: 'Care team',
      title: 'Providers',
      lead: 'Who is on the floor, which rooms they own, and how full their day is.',
    })}
    <div class="provider-grid">
      ${providers
        .map(
          (item) => `
        <article class="provider-card">
          <div class="provider-top">
            <eds-avatar name="${item.name}" size="md"></eds-avatar>
            <div>
              <h2>${item.name}</h2>
              <p class="muted mb-0">${item.role}</p>
            </div>
            ${statusChip(item.status)}
          </div>
          <dl class="fact-row">
            <div><dt>Panel</dt><dd>${item.panel}</dd></div>
            <div><dt>Today</dt><dd>${item.today} visits</dd></div>
            <div><dt>Rooms</dt><dd>${item.rooms}</dd></div>
          </dl>
          <p class="muted mb-0">Next · ${item.next}</p>
        </article>`,
        )
        .join('')}
    </div>
    <section class="sheet mt-3">
      <eds-data-table id="prv-table" sortable striped compact></eds-data-table>
    </section>
  `;
}

export function renderCensus() {
  return `
    ${pageHeader({
      eyebrow: 'Floor',
      title: 'Census',
      lead: 'Exam rooms, turnover, and lobby flow. Keep occupancy visible without walking the hall.',
    })}
    <div class="census-grid">
      ${rooms
        .map(
          (room) => `
        <article class="census-card">
          <div class="census-head">
            <h2>${room.name}</h2>
            ${statusChip(room.status)}
          </div>
          <p class="census-patient">${room.patient}</p>
          <p class="muted">${room.provider}</p>
          <div class="occupancy">
            <span style="width:${room.occupancy}%"></span>
          </div>
          <small>${room.eta}</small>
        </article>`,
        )
        .join('')}
    </div>
  `;
}

export function renderOrders() {
  return `
    ${pageHeader({
      eyebrow: 'Diagnostics',
      title: 'Orders',
      lead: 'Labs and procedures from collection through clinician review.',
      actions: `<eds-button id="new-order" variant="primary" icon="plus">New order</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-segmented-control id="order-status"></eds-segmented-control>`)}
      <div class="mt-3">
        <eds-data-table id="order-table" sortable striped compact></eds-data-table>
      </div>
    </section>
    <div class="row g-3 mt-1">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'Pipeline',
          body: bars([18, 22, 31, 29], 'Pending, collected, in progress, resulted') + '<p class="muted mt-2 mb-0">18% pending · 22% collected · 31% in progress · 29% resulted</p>',
        })}
      </div>
      <div class="col-lg-6">
        <section class="sheet">
          <div class="section-title"><h2>Review queue</h2></div>
          <eds-list id="order-review" divided></eds-list>
        </section>
      </div>
    </div>
  `;
}

export function renderMessages() {
  return `
    ${pageHeader({
      eyebrow: 'Inbox',
      title: 'Messages',
      lead: 'Refills, results, referrals, and front-desk notes in one clinical queue.',
    })}
    <section class="sheet">
      ${filterBar(`<eds-segmented-control id="msg-queue"></eds-segmented-control>`)}
      <div class="message-list mt-3" id="message-list"></div>
    </section>
  `;
}

export function renderInsights() {
  return `
    ${pageHeader({
      eyebrow: 'Operations',
      title: 'Insights',
      lead: 'Visit volume, wait time, no-shows, and panel growth for the last twelve weeks.',
    })}
    <div class="row g-3">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Weekly visit volume',
          action: '<eds-badge label="T12W" variant="brand" pill></eds-badge>',
          body: sparkline(volumeWeeks, 'Completed visits by week'),
        })}
      </div>
      <div class="col-lg-4">
        ${chartPanel({
          title: 'Visit mix',
          body: `
            <div class="mix">
              <div><div class="d-flex justify-content-between"><strong>Follow-up</strong><span>44%</span></div><div class="mix-track"><span style="width:44%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>New / consult</strong><span>18%</span></div><div class="mix-track"><span style="width:18%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Pediatrics</strong><span>21%</span></div><div class="mix-track"><span style="width:21%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Telehealth</strong><span>17%</span></div><div class="mix-track"><span style="width:17%"></span></div></div>
            </div>
          `,
        })}
      </div>
    </div>
    <div class="row g-3 mt-1">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'Access',
          body: bars([76, 14, 7, 3], 'Kept, cancelled, no-show, late') + '<p class="muted mt-2 mb-0">76% kept · 14% cancelled · 7% no-show · 3% late</p>',
        })}
      </div>
      <div class="col-lg-6">
        <section class="sheet">
          <div class="section-title"><h2>Snapshot</h2></div>
          <eds-description-list id="insight-facts"></eds-description-list>
        </section>
      </div>
    </div>
  `;
}

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Configuration',
      title: 'Clinic settings',
      lead: 'Identity, hours, rooms, and how Halo notifies the floor.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${formSection({
          title: 'Practice profile',
          body: `
            <eds-input label="Clinic name" value="${clinic.name}" icon="edit"></eds-input>
            <eds-textarea label="Address" rows="3" value="${clinic.address}"></eds-textarea>
            <eds-input label="Main phone" value="${clinic.phone}"></eds-input>
            <eds-input label="Group NPI" value="${clinic.npi}"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Hours & access',
          body: `
            <eds-input label="Published hours" value="${clinic.hours}"></eds-input>
            <eds-select id="tz" label="Timezone"></eds-select>
            <eds-switch label="Same-day online booking" checked></eds-switch>
            <eds-switch label="Telehealth by default for follow-ups"></eds-switch>
            <eds-input label="Default visit length" value="30 minutes"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Floor notifications',
          body: `
            <eds-switch label="Ping MA when a patient checks in" checked></eds-switch>
            <eds-switch label="Flag wait time over 20 minutes" checked></eds-switch>
            <eds-switch label="Critical lab banners on overview" checked></eds-switch>
            <eds-switch label="Evening no-show SMS" checked></eds-switch>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Privacy',
          body: `
            <eds-status variant="success" label="Audit log enabled" pulse></eds-status>
            <eds-switch class="mt-2" label="Break-the-glass for restricted charts" checked></eds-switch>
            <eds-switch label="Auto-timeout after 8 minutes idle" checked></eds-switch>
            <eds-button id="save-settings" variant="primary" icon="save">Save clinic settings</eds-button>
          `,
        })}
      </div>
    </div>
  `;
}

export function renderView(route) {
  if (route.name === 'visit') return renderVisit(route.id);
  if (route.name === 'patient') return renderPatient(route.id);
  const pages = {
    overview: renderOverview,
    schedule: renderSchedule,
    patients: renderPatients,
    providers: renderProviders,
    census: renderCensus,
    orders: renderOrders,
    messages: renderMessages,
    insights: renderInsights,
    settings: renderSettings,
  };
  return (pages[route.name] ?? renderOverview)();
}

function filteredAppointments() {
  const query = viewState.appointmentQuery.trim().toLowerCase();
  return appointments.filter((row) => {
    const statusOk = viewState.appointmentStatus === 'all' || row.status.toLowerCase() === viewState.appointmentStatus;
    const queryOk = !query || `${row.patient} ${row.provider} ${row.room}`.toLowerCase().includes(query);
    return statusOk && queryOk;
  });
}

function paintMessages(root) {
  const list = root.querySelector('#message-list');
  if (!list) return;
  const rows =
    viewState.messageQueue === 'all'
      ? messages
      : messages.filter((item) => item.queue.toLowerCase() === viewState.messageQueue);
  list.innerHTML = rows
    .map(
      (item) => `
      <article class="message-row ${item.unread ? 'is-unread' : ''}">
        <div>
          <strong>${item.from}</strong>
          <span>${item.subject}</span>
          <p>${item.preview}</p>
        </div>
        <aside>
          <eds-badge label="${item.queue}" variant="${item.unread ? 'brand' : 'neutral'}" pill></eds-badge>
          <small>${item.time}</small>
        </aside>
      </article>`,
    )
    .join('');
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) {
    hydrateStats(root, kpis, 'kpi');
    const table = root.querySelector('#upcoming-table');
    if (table) {
      table.columns = appointmentColumns.filter((col) => !['mode'].includes(col.key));
      table.rows = appointments.filter((item) => item.status !== 'Completed' && item.status !== 'In visit').slice(0, 6);
    }
    const timeline = root.querySelector('#floor-activity');
    if (timeline) timeline.items = activity;
    root.querySelector('#qa-book')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.show());
    root.querySelector('#qa-checkin')?.addEventListener('eds-click', () => {
      window.location.hash = '#/schedule';
    });
    root.querySelector('#qa-inbox')?.addEventListener('eds-click', () => {
      window.location.hash = '#/messages';
    });
  }

  if (route.name === 'schedule') {
    const paint = () => {
      const rows = filteredAppointments();
      const table = root.querySelector('#apt-table');
      const empty = root.querySelector('#apt-empty');
      const wrap = root.querySelector('#apt-table-wrap');
      if (table) {
        table.columns = appointmentColumns;
        table.rows = rows;
      }
      const count = root.querySelector('#apt-count');
      if (count) count.textContent = `${rows.length} visits · select a row to open the visit`;
      const none = rows.length === 0;
      if (empty) empty.hidden = !none;
      if (wrap) wrap.hidden = none;
    };
    const seg = root.querySelector('#apt-status');
    if (seg) {
      seg.options = [
        { label: 'All', value: 'all' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Waiting', value: 'waiting' },
        { label: 'In visit', value: 'in visit' },
        { label: 'Completed', value: 'completed' },
      ];
      seg.value = viewState.appointmentStatus;
      seg.addEventListener('eds-change', (event) => {
        viewState.appointmentStatus = (event.detail?.value ?? event.target.value).toLowerCase();
        paint();
      });
    }
    paint();
    root.querySelector('#apt-search')?.addEventListener('eds-input', (event) => {
      viewState.appointmentQuery = event.detail?.value ?? event.target.value ?? '';
      paint();
    });
    root.querySelector('#reset-apts')?.addEventListener('eds-click', () => {
      viewState.appointmentQuery = '';
      viewState.appointmentStatus = 'all';
      paint();
    });
    root.querySelector('#book-visit')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.show());
    root.querySelector('#print-board')?.addEventListener('eds-click', () => {
      showToast({ message: 'Board sent to the front-desk printer', variant: 'success' });
    });
    root.querySelector('#apt-table')?.addEventListener('click', () => {
      window.location.hash = '#/visit/apt_1041';
    });
  }

  if (route.name === 'visit') {
    const visit = appointments.find((item) => item.id === route.id) ?? appointments[0];
    const notes = visitNotes[visit.id];
    const vitals = root.querySelector('#visit-vitals');
    if (vitals) {
      vitals.items = notes?.vitals ?? [
        { term: 'Reason', description: visit.type },
        { term: 'Mode', description: visit.mode },
        { term: 'Room', description: visit.room },
      ];
      vitals.columns = 3;
    }
    const flow = root.querySelector('#visit-flow');
    if (flow) flow.items = notes?.timeline ?? activity;
    root.querySelector('#visit-checkin')?.addEventListener('eds-click', () => {
      showToast({ message: `${visit.patient} checked in`, variant: 'success' });
    });
    root.querySelector('#visit-room')?.addEventListener('eds-click', () => {
      showToast({ message: `Roomed in ${visit.room}`, variant: 'success' });
    });
    root.querySelector('#visit-chart')?.addEventListener('eds-click', () => {
      window.location.hash = `#/patient/${visit.patientId}`;
    });
  }

  if (route.name === 'patients') {
    const table = root.querySelector('#pt-table');
    const empty = root.querySelector('#pt-empty');
    const paint = (query = viewState.patientQuery) => {
      viewState.patientQuery = query;
      const rows = patients
        .map((item) => ({
          name: item.name,
          mrn: item.mrn,
          age: item.age,
          pcp: item.pcp,
          coverage: item.coverage,
          lastVisit: item.lastVisit,
          status: item.status,
          id: item.id,
        }))
        .filter((row) => `${row.name} ${row.mrn} ${row.pcp}`.toLowerCase().includes(query.toLowerCase()));
      if (table) {
        table.columns = patientColumns;
        table.rows = rows;
      }
      const count = root.querySelector('#pt-count');
      if (count) count.textContent = `${rows.length} patients in view`;
      if (empty) empty.hidden = rows.length > 0;
    };
    paint();
    root.querySelector('#pt-search')?.addEventListener('eds-input', (event) => {
      paint(event.detail?.value ?? '');
    });
    root.querySelector('#add-patient')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.show());
    table?.addEventListener('click', () => {
      window.location.hash = '#/patient/pt_maya';
    });
  }

  if (route.name === 'patient') {
    const patient = patients.find((item) => item.id === route.id) ?? patients[0];
    const facts = root.querySelector('#pt-facts');
    if (facts) {
      facts.items = [
        { term: 'MRN', description: patient.mrn },
        { term: 'DOB', description: patient.dob },
        { term: 'PCP', description: patient.pcp },
        { term: 'Coverage', description: patient.coverage },
        { term: 'Last visit', description: patient.lastVisit },
      ];
    }
    const table = root.querySelector('#pt-visits');
    if (table) {
      table.columns = appointmentColumns.filter((col) => ['time', 'type', 'provider', 'room', 'status'].includes(col.key));
      table.rows = appointments.filter((item) => item.patientId === patient.id);
    }
    root.querySelector('#pt-book')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.show());
    root.querySelector('#pt-message')?.addEventListener('eds-click', () => {
      window.location.hash = '#/messages';
    });
  }

  if (route.name === 'providers') {
    const table = root.querySelector('#prv-table');
    if (table) {
      table.columns = providerColumns;
      table.rows = providers;
    }
  }

  if (route.name === 'orders') {
    const table = root.querySelector('#order-table');
    const paint = () => {
      if (!table) return;
      table.columns = orderColumns;
      table.rows =
        viewState.orderStatus === 'all'
          ? orders
          : orders.filter((row) => row.status.toLowerCase() === viewState.orderStatus);
    };
    const seg = root.querySelector('#order-status');
    if (seg) {
      seg.options = [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Collected', value: 'collected' },
        { label: 'In progress', value: 'in progress' },
        { label: 'Resulted', value: 'resulted' },
        { label: 'Review', value: 'review' },
      ];
      seg.value = viewState.orderStatus;
      seg.addEventListener('eds-change', (event) => {
        viewState.orderStatus = (event.detail?.value ?? 'all').toLowerCase();
        paint();
      });
    }
    paint();
    const list = root.querySelector('#order-review');
    if (list) {
      list.items = orders
        .filter((item) => item.status === 'Review' || item.status === 'Resulted')
        .map((item) => ({ label: item.test, description: `${item.patient} · ${item.id}`, icon: 'star' }));
    }
    root.querySelector('#new-order')?.addEventListener('eds-click', () => {
      showToast({ message: 'Order ticket opened for the current chart', variant: 'info' });
    });
  }

  if (route.name === 'messages') {
    const seg = root.querySelector('#msg-queue');
    if (seg) {
      seg.options = [
        { label: 'All', value: 'all' },
        { label: 'Refills', value: 'refills' },
        { label: 'Results', value: 'results' },
        { label: 'Clinical', value: 'clinical' },
        { label: 'Referrals', value: 'referrals' },
      ];
      seg.value = viewState.messageQueue;
      seg.addEventListener('eds-change', (event) => {
        viewState.messageQueue = (event.detail?.value ?? 'all').toLowerCase();
        paintMessages(root);
      });
    }
    paintMessages(root);
    root.querySelector('#message-list')?.addEventListener('click', (event) => {
      const row = event.target.closest('.message-row');
      if (!row) return;
      document.querySelector('#message-drawer')?.show();
    });
  }

  if (route.name === 'insights') {
    const facts = root.querySelector('#insight-facts');
    if (facts) {
      facts.items = [
        { term: 'Kept rate', description: '76%' },
        { term: 'No-show', description: '7%' },
        { term: 'Avg wait', description: '11 min' },
        { term: 'Same-day fill', description: '64%' },
        { term: 'Telehealth', description: '17%' },
        { term: 'Panel growth', description: '+8.5%' },
      ];
      facts.columns = 2;
    }
  }

  if (route.name === 'settings') {
    const tz = root.querySelector('#tz');
    if (tz) {
      tz.options = [
        { label: 'America / Chicago', value: 'chicago' },
        { label: 'America / New York', value: 'ny' },
        { label: 'America / Denver', value: 'denver' },
        { label: 'America / Los Angeles', value: 'la' },
      ];
      tz.value = 'chicago';
    }
    root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
      showToast({ message: 'Clinic settings saved', variant: 'success' });
    });
  }
}
