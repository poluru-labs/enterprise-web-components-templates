import { getPerson, leaveForPerson } from '../data/index.js';
import { formatDate } from '../lib/format.js';
import { statusLabel } from '../lib/status.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderPersonDetail(route) {
  const person = getPerson(route.id);
  if (!person) {
    return `
      ${pageHeader({ eyebrow: 'Person', title: 'Not found', lead: 'This teammate record could not be loaded.' })}
      <eds-empty-state heading="Person not found" description="Return to the directory and pick another profile." icon="user">
        <eds-button href="#/people" variant="primary">Back to people</eds-button>
      </eds-empty-state>
    `;
  }
  const leaveRows = leaveForPerson(person.id);
  return `
    ${pageHeader({
      eyebrow: person.department,
      title: person.name,
      lead: `${person.title} · ${person.location} · ${person.employmentType}`,
      actions: `
        <eds-button id="edit-person" variant="secondary" icon="edit">Edit</eds-button>
        <eds-button id="back-people" variant="tertiary" icon="arrow-left">Directory</eds-button>
      `,
    })}
    <section class="row g-3">
      <div class="col-lg-4">
        ${sheet({
          title: 'Profile',
          body: `
            <div class="person-card">
              <eds-avatar name="${person.name}" size="lg"></eds-avatar>
              <div class="meta">
                <strong>${person.title}</strong>
                <span class="muted">${person.email}</span>
                <span class="muted">${person.pronouns || '—'}</span>
                ${statusChip(person.status)}
              </div>
            </div>
            <eds-divider class="my-3"></eds-divider>
            <eds-description-list id="person-meta"></eds-description-list>`,
        })}
      </div>
      <div class="col-lg-8">
        ${sheet({
          title: 'Leave history',
          action: '<eds-link href="#/leave" variant="subtle">Calendar</eds-link>',
          body: leaveRows.length
            ? `<eds-data-table id="person-leave" compact striped></eds-data-table>`
            : '<p class="muted mb-0">No leave on file.</p>',
        })}
        ${sheet({
          title: 'Learning',
          body: `
            <eds-meter id="learning-meter" min="0" max="40" value="${person.learningHours}" label="${person.learningHours} learning hours"></eds-meter>
            <p class="muted mt-2 mb-0">Target 20h per quarter · ${person.learningHours >= 20 ? 'On track' : 'Needs attention'}</p>`,
        })}
      </div>
    </section>
  `;
}

export function hydratePersonDetail(root, route) {
  const person = getPerson(route.id);
  if (!person) return;

  const meta = root.querySelector('#person-meta');
  if (meta) {
    meta.items = [
      { term: 'Manager', description: person.manager || '—' },
      { term: 'Start date', description: formatDate(person.startDate) },
      { term: 'PTO balance', description: `${person.ptoBalance} days` },
      { term: 'Department', description: person.department },
      { term: 'Location', description: person.location },
    ];
  }

  const leaveRows = leaveForPerson(person.id);
  const table = root.querySelector('#person-leave');
  if (table && leaveRows.length) {
    table.columns = [
      { key: 'type', label: 'Type' },
      { key: 'start', label: 'Start' },
      { key: 'end', label: 'End' },
      { key: 'status', label: 'Status' },
      { key: 'note', label: 'Note' },
    ];
    table.rows = leaveRows.map((row) => ({
      type: row.type,
      start: formatDate(row.start),
      end: formatDate(row.end),
      status: statusLabel(row.status),
      note: row.note,
    }));
  }

  root.querySelector('#back-people')?.addEventListener('eds-click', () => {
    window.location.hash = '#/people';
  });
  root.querySelector('#edit-person')?.addEventListener('eds-click', () => {
    window.location.hash = '#/settings';
  });
}
