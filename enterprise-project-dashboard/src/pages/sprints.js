import { sprints } from '../data/index.js';
import { pageHeader, statusChip } from '../components/widgets.js';

export function renderSprints() {
  return `
    ${pageHeader({
      eyebrow: 'Cadence',
      title: 'Sprints',
      lead: 'Two-week delivery slices. Sprint 34 closes Friday with four days left; 35 is in planning.',
    })}
    <div class="card-grid cols-2">
      ${sprints
        .map(
          (sprint, index) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${sprint.name}</h2>
            ${statusChip(sprint.status)}
          </div>
          <p class="muted">${sprint.range} · ${sprint.focus}</p>
          <eds-progress-bar value="${sprint.done}" max="${sprint.planned}" label="${sprint.done} / ${sprint.planned} points" show-value></eds-progress-bar>
          ${index === 2 ? '<eds-circular-progress class="mt-3" value="79" max="100" size="96" stroke-width="7" show-value></eds-circular-progress>' : ''}
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateSprints() {}
