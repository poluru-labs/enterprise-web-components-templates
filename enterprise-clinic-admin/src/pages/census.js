import { rooms } from '../data/index.js';
import { cardGrid, pageHeader, statusChip } from '../components/widgets.js';

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Floor',
      title: 'Census',
      lead: 'Exam rooms, turnover, and lobby flow. Keep occupancy visible without walking the hall.',
    })}
    ${cardGrid(
      rooms.map(
        (room) => `
        <halo-content-card stretch class="halo-census-card">
          <div class="halo-census-head">
            <h2>${room.name}</h2>
            ${statusChip(room.status)}
          </div>
          <p class="halo-census-patient">${room.patient}</p>
          <p class="halo-muted">${room.provider}</p>
          <div class="halo-occupancy">
            <span style="width:${room.occupancy}%"></span>
          </div>
          <small>${room.eta}</small>
        </halo-content-card>`,
      ),
    )}
  `;
}

export function hydrate() {}
