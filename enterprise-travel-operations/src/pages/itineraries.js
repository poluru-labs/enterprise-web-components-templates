import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { destTree, legs, trips } from '../data/index.js';
import { legList, pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderItineraries() {
  const live = trips.filter((item) => item.status === 'In trip' || item.status === 'Booked');
  return `
    ${pageHeader({
      eyebrow: 'Legs',
      title: 'Itineraries',
      lead: 'Hana is in house in Lagos. Kavya returns LHR on 18 Sep. Paris inbound sits on a strike watch.',
      actions: `<eds-button id="itin-export" variant="primary" icon="download">Export PNR</eds-button>`,
    })}
    <div class="card-grid cols-2">
      ${live
        .map((trip) => {
          const tripLegs = legs.filter((item) => item.tripId === trip.id);
          return `
            <content-card href="#/trip/${trip.id}">
              <div slot="header" class="section-title">
                <h2>${trip.city}</h2>
                ${statusChip(trip.status)}
              </div>
              <p class="muted mb-2">${trip.traveler} · ${trip.origin} → ${trip.dest}</p>
              ${tripLegs.length ? legList(tripLegs) : '<p class="muted mb-0">No segments yet.</p>'}
            </content-card>`;
        })
        .join('')}
    </div>
    <section class="row g-3 mt-3 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Destinations',
          body: '<eds-tree-view id="dest-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Change a leg',
          body: `
            <eds-date-picker id="leg-day" label="New depart"></eds-date-picker>
            <eds-time-picker class="mt-3" id="leg-time" label="Depart time"></eds-time-picker>
            <eds-select class="mt-3" id="leg-trip" label="Trip"></eds-select>
            <eds-button class="mt-3" id="save-leg" variant="primary">Hold change</eds-button>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateItineraries(root) {
  const tree = root.querySelector('#dest-tree');
  if (tree) {
    tree.items = destTree;
    tree.expandedIds = { live: true, ahead: true };
  }
  tree?.addEventListener('eds-select', (event) => {
    const href = event.detail?.item?.href ?? event.detail?.href;
    if (href) window.location.hash = href;
  });
  const pick = root.querySelector('#leg-trip');
  if (pick) {
    pick.options = trips.map((item) => ({ label: `${item.traveler} · ${item.city}`, value: item.id }));
    pick.value = 'tr_paris';
  }
  root.querySelector('#itin-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'PNR export queued', variant: 'success' });
  });
  root.querySelector('#save-leg')?.addEventListener('eds-click', () => {
    showToast({ message: 'Leg change held with the desk', variant: 'success' });
  });
}
