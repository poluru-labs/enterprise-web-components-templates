import { activity, expenses, legs, trips } from '../data/index.js';
import { legList, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export function renderTrip(route) {
  const trip = trips.find((item) => item.id === route.id) ?? trips[0];
  const tripLegs = legs.filter((item) => item.tripId === trip.id);
  const tripSpend = expenses.filter((item) => item.tripId === trip.id);
  return `
    ${pageHeader({
      eyebrow: `${trip.code} · ${trip.region}`,
      title: `${trip.city}`,
      lead: `${trip.traveler}. ${trip.origin} to ${trip.dest}. ${trip.depart} – ${trip.return}.`,
      actions: `
        <eds-button id="open-risk" variant="secondary" icon="alert-triangle">Risk</eds-button>
        <eds-button id="run-policy" variant="primary" icon="file">Exception</eds-button>
      `,
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="Itinerary" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">Route</span>
                  <p class="hero-metric">${trip.origin} → ${trip.dest}</p>
                  ${statusChip(trip.status)}
                </div>
                <eds-progress-bar value="${trip.status === 'Complete' ? 100 : trip.status === 'In trip' ? 62 : 28}" max="100" label="Trip progress" show-value></eds-progress-bar>
              </div>
              ${tripLegs.length ? legList(tripLegs) : '<p class="muted mb-0">No segments on file yet.</p>'}
            </eds-tab>
            <eds-tab label="Spend">
              <p class="muted">${formatCurrency(trip.cost)} booked · ${trip.policy} · ${trip.cabin}</p>
              <eds-data-table id="trip-spend" compact striped></eds-data-table>
              <eds-textarea class="mt-3" label="Desk note" rows="4" placeholder="What the auditor needs before reimbursement."></eds-textarea>
            </eds-tab>
            <eds-tab label="Duty of care">
              <p class="muted mb-2">Last check-in ${trip.checkIn}. Risk ${trip.risk}.</p>
              <eds-meter value="${trip.risk === 'Elevated' ? 38 : trip.risk === 'Watch' ? 64 : 92}" min="0" max="100" low="50" high="75" optimum="90" label="Care score" show-value></eds-meter>
              <eds-checkbox class="mt-3" label="Ping Nikhil Poluru if check-in slips eight hours" checked></eds-checkbox>
            </eds-tab>
            <eds-tab label="Notes">
              <p>${trip.traveler} is in ${trip.city} for ${trip.purpose.toLowerCase()}. Hotel ${trip.hotel}.</p>
              <eds-textarea label="Ops note" rows="4" placeholder="What moved this week, who owns the next action."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="trip-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Policy',
          body: `
            <p class="mb-1"><strong>${trip.policy}</strong></p>
            <p class="muted mb-2">${trip.cabin} · manager ${trip.manager}</p>
            <eds-link href="#/approvals" variant="default">Open approvals</eds-link>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        ${sheet({
          title: 'Activity',
          body: '<eds-timeline id="trip-activity"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Plan',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Purpose" open>
                ${trip.purpose}. Keep the itinerary inside the city cap unless an exception is on file.
              </eds-accordion-item>
              <eds-accordion-item heading="Risks">
                ${trip.risk === 'Elevated' ? 'Restricted country. Use only the approved transfer and keep eight-hour check-ins.' : trip.risk === 'Watch' ? 'Local disruption on the inbound. Hold a backup flight.' : 'Standard duty of care. Check in on arrival and departure.'}
              </eds-accordion-item>
              <eds-accordion-item heading="Next 48 hours">
                Confirm the hotel, file receipts, and keep the desk on the return flight.
              </eds-accordion-item>
            </eds-accordion>
            <div class="mt-3">
              <eds-rating value="${trip.risk === 'Elevated' ? 2 : 4}" readonly size="sm"></eds-rating>
              <p class="muted mb-0 mt-1">Comfort of the last desk review.</p>
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateTrip(root, route) {
  const trip = trips.find((item) => item.id === route.id) ?? trips[0];
  const tripSpend = expenses.filter((item) => item.tripId === trip.id);
  const facts = root.querySelector('#trip-facts');
  if (facts) {
    facts.items = [
      { term: 'Traveler', description: trip.traveler },
      { term: 'Code', description: trip.code },
      { term: 'Cost', description: formatCurrency(trip.cost) },
      { term: 'Hotel', description: trip.hotel },
      { term: 'Cabin', description: trip.cabin },
      { term: 'Manager', description: trip.manager },
      { term: 'Check-in', description: trip.checkIn },
      { term: 'Return', description: trip.return },
    ];
  }
  const table = root.querySelector('#trip-spend');
  if (table) {
    table.columns = [
      { key: 'category', label: 'Category' },
      { key: 'amount', label: 'Amount' },
      { key: 'status', label: 'Status' },
    ];
    table.rows = tripSpend.length
      ? tripSpend.map((item) => ({
          category: item.category,
          amount: formatCurrency(item.amount),
          status: item.status,
        }))
      : [{ category: 'Air', amount: formatCurrency(trip.cost), status: 'Posted' }];
  }
  const timeline = root.querySelector('#trip-activity');
  if (timeline) {
    timeline.items = activity
      .filter((item) => item.description.includes(trip.traveler.split(' ')[0]) || item.label.toLowerCase().includes(trip.city.toLowerCase()))
      .slice(0, 4);
    if (!timeline.items.length) timeline.items = activity.slice(0, 4);
  }
  root.querySelector('#open-risk')?.addEventListener('eds-click', () => {
    window.location.hash = '#/risk';
  });
  root.querySelector('#run-policy')?.addEventListener('eds-click', () => document.querySelector('#policy-modal')?.show());
}
