import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { appointments, patients, visitNotes, activity } from '../data/index.js';
import { cardGrid, pageHeader, snapshotCard, statusChip } from '../components/widgets.js';

export function render(route) {
  const visit = appointments.find((item) => item.id === route.id) ?? appointments[0];
  const patient = patients.find((item) => item.id === visit.patientId);
  const related = appointments.filter((item) => item.id !== visit.id).slice(0, 4);
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
    <div class="row g-3 halo-equal-row">
      <div class="col-lg-6">
        <halo-content-card stretch>
          <div class="halo-visit-hero">
            <div>
              <span class="halo-kicker">${visit.type}</span>
              <h2>${notes.reason}</h2>
              <p class="halo-muted mb-0">${visit.mode} · ${statusChip(visit.status)}</p>
            </div>
            <div class="halo-visit-meta">
              <span>${visit.time}</span>
              <small>${visit.end} end</small>
            </div>
          </div>
          <eds-description-list id="visit-vitals" class="mt-3"></eds-description-list>
          <p class="halo-muted mt-3 mb-0">Allergies ${patient?.allergies ?? 'NKDA'}. Conditions ${patient?.conditions ?? '—'}. Coverage ${patient?.coverage ?? '—'}.</p>
        </halo-content-card>
      </div>
      <div class="col-lg-6">
        <halo-content-card stretch title="Patient">
          <p class="mb-1"><strong>${patient?.name}</strong></p>
          <p class="halo-muted mb-1">${patient?.mrn} · ${patient?.age} · ${patient?.sex}</p>
          <p class="halo-muted">${patient?.phone}</p>
          <div class="halo-card-actions">
            <eds-link href="#/patient/${patient?.id}" variant="default">Open full chart</eds-link>
          </div>
        </halo-content-card>
      </div>
      <div class="col-lg-6">
        <halo-content-card stretch title="Visit flow">
          <eds-timeline id="visit-flow"></eds-timeline>
        </halo-content-card>
      </div>
      <div class="col-lg-6">
        <halo-content-card stretch title="Coverage">
          <p class="mb-1"><strong>${patient?.coverage ?? '—'}</strong></p>
          <p class="halo-muted mb-0">Eligibility last verified 29 Aug 2026. Copay $25 for established visits.</p>
        </halo-content-card>
      </div>
    </div>
    <div class="halo-section-title mt-4">
      <h2>Also on the board</h2>
    </div>
    ${cardGrid(
      related.map((item) =>
        snapshotCard({
          title: item.patient,
          hint: `${item.time} · ${item.room} · ${item.type}`,
          href: `#/visit/${item.id}`,
          tone: item.status,
        }),
      ),
    )}
  `;
}

export function hydrate(root, route) {
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
