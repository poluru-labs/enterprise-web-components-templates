import { activity, events, registrations, sessions, speakers } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderEvent(route) {
  const item = events.find((entry) => entry.id === route.id) ?? events[0];
  const fill = Math.round((item.registered / item.capacity) * 100);
  const check = item.registered ? Math.round((item.checkIn / item.registered) * 100) : 0;
  return `
    ${pageHeader({
      eyebrow: `${item.code} · ${item.venue}`,
      title: item.name,
      lead: `${item.type} · ${item.track}. Owner ${item.owner}. ${item.start} – ${item.end}.`,
      actions: `
        <eds-button id="open-schedule" variant="secondary" icon="clock">Schedule</eds-button>
        <eds-button id="run-checkin" variant="primary" icon="check">Check in</eds-button>
      `,
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="House" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">Fill</span>
                  <p class="hero-metric">${fill}%</p>
                  ${statusChip(item.status)}
                </div>
                <eds-progress-bar value="${fill}" max="100" label="Registered of capacity" show-value></eds-progress-bar>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-sm-6">
                  <eds-meter value="${check}" min="0" max="100" low="50" high="75" optimum="90" label="Check-in" show-value></eds-meter>
                </div>
                <div class="col-sm-6">
                  <eds-meter value="${fill}" min="0" max="100" low="40" high="80" optimum="90" label="Capacity" show-value></eds-meter>
                </div>
              </div>
              <eds-divider class="my-3"></eds-divider>
              <eds-data-table id="ev-steps" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Guests">
              <p class="muted">${item.registered} registered · ${item.checkIn} checked in · ${item.capacity} seats in ${item.venue}.</p>
              <eds-textarea class="mt-3" label="Desk note" rows="4" placeholder="Waitlist, plus-ones, and badge reprints."></eds-textarea>
            </eds-tab>
            <eds-tab label="Run of show">
              <p class="muted mb-2">${item.status} · ${item.start} – ${item.end}.</p>
              <eds-stepper id="ev-run-steps"></eds-stepper>
              <eds-checkbox class="mt-3" label="Page Elena Poluru if Foyer B slips under 60%" checked></eds-checkbox>
            </eds-tab>
            <eds-tab label="Notes">
              <p>${item.name} sits with ${item.owner}. Track ${item.track}.</p>
              <eds-textarea label="Producer note" rows="4" placeholder="What moved this morning, who owns the next action."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="ev-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Room',
          body: `
            <p class="mb-1"><strong>${item.venue}</strong></p>
            <p class="muted mb-2">${item.owner} · ${item.type}</p>
            <eds-link href="#/venues" variant="default">Open venues</eds-link>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        ${sheet({
          title: 'Activity',
          body: '<eds-timeline id="ev-activity"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Plan',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Outcome" open>
                Fill the room, keep check-in over 80%, and close the sponsor booths on time.
              </eds-accordion-item>
              <eds-accordion-item heading="Risks">
                ${item.status === 'Live' ? 'Foyer B printer and three pending speaker trips are the two items that move the clock.' : 'Room hold, AV kit, and speaker travel are the items that move the clock.'}
              </eds-accordion-item>
              <eds-accordion-item heading="Next 48 hours">
                Confirm the next session, reprint jammed badges, and stamp the sponsor booths.
              </eds-accordion-item>
            </eds-accordion>
            <div class="mt-3">
              <eds-rating value="${item.status === 'Complete' ? 5 : item.status === 'Live' ? 4 : 3}" readonly size="sm"></eds-rating>
              <p class="muted mb-0 mt-1">House score from the last walkthrough.</p>
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateEvent(root, route) {
  const item = events.find((entry) => entry.id === route.id) ?? events[0];
  const facts = root.querySelector('#ev-facts');
  if (facts) {
    facts.items = [
      { term: 'Code', description: item.code },
      { term: 'Owner', description: item.owner },
      { term: 'Venue', description: item.venue },
      { term: 'Type', description: item.type },
      { term: 'Track', description: item.track },
      { term: 'Registered', description: String(item.registered) },
      { term: 'Check-in', description: String(item.checkIn) },
      { term: 'Dates', description: `${item.start} – ${item.end}` },
    ];
  }
  const table = root.querySelector('#ev-steps');
  if (table) {
    table.columns = [
      { key: 'step', label: 'Step' },
      { key: 'state', label: 'State' },
    ];
    table.rows = [
      { step: 'Hold', state: 'Done' },
      { step: 'Register', state: item.status === 'Draft' ? 'Now' : 'Done' },
      { step: 'Doors', state: item.status === 'Live' || item.status === 'Complete' ? 'Done' : 'Next' },
      { step: 'Close', state: item.status === 'Complete' ? 'Done' : 'Next' },
    ];
  }
  const steps = root.querySelector('#ev-run-steps');
  if (steps) {
    steps.steps = [{ label: 'Hold' }, { label: 'Load-in' }, { label: 'Doors' }, { label: 'Close' }];
    steps.current = item.status === 'Complete' ? 3 : item.status === 'Live' ? 2 : item.status === 'Upcoming' ? 1 : 0;
  }
  const timeline = root.querySelector('#ev-activity');
  if (timeline) {
    const guests = registrations.filter((entry) => entry.eventId === item.id).length;
    const talks = speakers.filter((entry) => entry.eventId === item.id).length;
    const slots = sessions.filter((entry) => entry.eventId === item.id).length;
    timeline.items = activity
      .filter(
        (entry) =>
          entry.description.includes(item.owner.split(' ')[0]) ||
          entry.label.toLowerCase().includes(item.name.split(' ')[0].toLowerCase()),
      )
      .slice(0, 4);
    if (!timeline.items.length) timeline.items = activity.slice(0, 4);
    if (guests || talks || slots) {
      timeline.items = [
        { label: `${guests} guests on the list`, description: `${talks} speakers · ${slots} sessions`, timestamp: item.start, icon: 'user', status: 'Done' },
        ...timeline.items,
      ].slice(0, 5);
    }
  }
  root.querySelector('#open-schedule')?.addEventListener('eds-click', () => {
    window.location.hash = '#/schedule';
  });
  root.querySelector('#run-checkin')?.addEventListener('eds-click', () => document.querySelector('#checkin-modal')?.show());
}
