import { people } from '../data/index.js';
import { padToEven, pageHeader } from '../components/widgets.js';

export function renderTeam() {
  const roster = padToEven(people, [4, 6, 8, 12]);
  return `
    ${pageHeader({
      eyebrow: 'People',
      title: 'Team',
      lead: 'Everyone on the roster is a Poluru. Capacity is booked through Sprint 35.',
    })}
    <div class="card-grid cols-4">
      ${roster
        .map(
          (person) => `
        <content-card>
          <div class="person-card">
            <eds-avatar name="${person.name}" size="md"></eds-avatar>
            <div>
              <strong>${person.name}</strong>
              <p class="muted mb-1">${person.role} · ${person.squad}</p>
              <eds-rating value="${person.rating}" readonly size="sm"></eds-rating>
            </div>
          </div>
          <eds-progress-bar class="mt-3" value="${person.capacity}" max="100" label="${person.capacity}% booked" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateTeam() {}
