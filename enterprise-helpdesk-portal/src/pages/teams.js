import { agents } from '../data/index.js';
import { pageHeader } from '../components/widgets.js';

export function renderTeams() {
  return `
    ${pageHeader({
      eyebrow: 'Roster',
      title: 'Teams',
      lead: 'Every agent is a Poluru. Active counts are open tickets assigned this shift.',
    })}
    <div class="card-grid cols-4">
      ${agents
        .map(
          (person) => `
        <content-card>
          <div class="person-card">
            <eds-avatar name="${person.name}" size="md"></eds-avatar>
            <div>
              <strong>${person.name}</strong>
              <p class="muted mb-1">${person.role} · ${person.squad}</p>
              <eds-badge label="${person.status}" variant="${person.status === 'Online' ? 'success' : person.status === 'Away' ? 'warning' : 'neutral'}" pill></eds-badge>
            </div>
          </div>
          <eds-progress-bar class="mt-3" value="${person.active}" max="20" label="${person.active} active tickets" show-value></eds-progress-bar>
          <p class="muted mb-0 mt-2">CSAT ${person.csat}</p>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateTeams() {}
