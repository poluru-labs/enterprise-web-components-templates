import { people } from '../data/index.js';
import { cardGrid, pageHeader } from '../components/widgets.js';

export function renderTeam() {
  const cards = people.map(
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
  );

  return `
    ${pageHeader({
      eyebrow: 'Owners',
      title: 'Team',
      lead: "Every warehouse and procurement lead is a Poluru. Scores reflect this week's operational health.",
    })}
    ${cardGrid(cards, 4)}
  `;
}

export function hydrateTeam() {}
