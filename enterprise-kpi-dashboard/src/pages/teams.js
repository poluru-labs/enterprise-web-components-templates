import { people } from '../data/index.js';
import { pageHeader } from '../components/widgets.js';

export function renderTeams() {
  return `
    ${pageHeader({
      eyebrow: 'Owners',
      title: 'Teams',
      lead: 'Every scorecard owner is a Poluru. Scores are this week’s health, not a performance grade.',
    })}
    <div class="card-grid cols-4">
      ${people
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
          <eds-progress-bar class="mt-3" value="${person.score}" max="100" label="${person.score} health" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateTeams() {}
