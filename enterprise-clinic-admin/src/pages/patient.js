import { appointmentColumns, appointments, meds, patients } from '../data/index.js';
import { cardGrid, pageHeader, snapshotCard } from '../components/widgets.js';

export function render(route) {
  const patient = patients.find((item) => item.id === route.id) ?? patients[0];
  const medList = meds[patient.id] ?? [];
  const related = patients.filter((item) => item.id !== patient.id).slice(0, 4);
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
    <div class="row g-3 halo-equal-row">
      <div class="col-lg-6">
        <halo-content-card stretch>
          <eds-avatar name="${patient.name}" size="lg"></eds-avatar>
          <p class="mt-2 mb-1"><strong>${patient.name}</strong></p>
          <p class="halo-muted">${patient.email}<br>${patient.phone}</p>
          <eds-description-list id="pt-facts"></eds-description-list>
        </halo-content-card>
      </div>
      <div class="col-lg-6">
        <halo-content-card stretch title="Allergies & conditions">
          <p class="mb-2"><strong>Allergies</strong></p>
          <p class="halo-muted">${patient.allergies}</p>
          <p class="mb-2"><strong>Conditions</strong></p>
          <p class="halo-muted mb-0">${patient.conditions}</p>
        </halo-content-card>
      </div>
      <div class="col-lg-6">
        <halo-content-card stretch>
          <eds-tabs>
            <eds-tab label="Visits" active>
              <eds-data-table id="pt-visits" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Medications">
              <ul class="halo-quiet-list">
                ${medList.map((item) => `<li>${item}</li>`).join('') || '<li>No active medications</li>'}
              </ul>
            </eds-tab>
          </eds-tabs>
        </halo-content-card>
      </div>
      <div class="col-lg-6">
        <halo-content-card stretch title="Coverage">
          <p class="mb-1"><strong>${patient.coverage}</strong></p>
          <p class="halo-muted mb-0">Eligibility last verified 29 Aug 2026. Copay $25 for established visits.</p>
        </halo-content-card>
      </div>
    </div>
    <div class="halo-section-title mt-4">
      <h2>Same-day panel</h2>
    </div>
    ${cardGrid(
      related.map((item) =>
        snapshotCard({
          title: item.name,
          hint: `${item.mrn} · ${item.pcp} · ${item.status}`,
          href: `#/patient/${item.id}`,
          tone: item.status,
        }),
      ),
    )}
  `;
}

export function hydrate(root, route) {
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
