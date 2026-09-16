import { activity, requests } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderRequest(route) {
  const item = requests.find((entry) => entry.id === route.id) ?? requests[0];
  const progress = item.status === 'Complete' ? 100 : item.status === 'In progress' ? 58 : item.status === 'Pending' ? 24 : 18;
  return `
    ${pageHeader({
      eyebrow: `${item.code} · ${item.ward}`,
      title: item.title,
      lead: `${item.department}. Owner ${item.owner}. Opened ${item.opened} · due ${item.due}.`,
      actions: `
        <eds-button id="open-service" variant="secondary" icon="check">Service</eds-button>
        <eds-button id="set-hearing" variant="primary" icon="file">Hearing</eds-button>
      `,
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="Work" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">Age</span>
                  <p class="hero-metric">${item.age}d</p>
                  ${statusChip(item.status)}
                </div>
                <eds-progress-bar value="${progress}" max="100" label="Work progress" show-value></eds-progress-bar>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-sm-6">
                  <eds-meter value="${item.sla === 'Overdue' ? 28 : item.sla === 'Watch' ? 62 : 88}" min="0" max="100" low="50" high="75" optimum="90" label="SLA" show-value></eds-meter>
                </div>
                <div class="col-sm-6">
                  <eds-meter value="${item.priority === 'High' ? 86 : item.priority === 'Medium' ? 54 : 28}" min="0" max="100" low="40" high="70" optimum="50" label="Priority" show-value></eds-meter>
                </div>
              </div>
              <eds-divider class="my-3"></eds-divider>
              <eds-data-table id="rq-steps" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Location">
              <p class="muted">${item.ward} · ${item.channel}. Crew notes go here before close.</p>
              <eds-textarea class="mt-3" label="Field note" rows="4" placeholder="What the crew saw on site."></eds-textarea>
            </eds-tab>
            <eds-tab label="SLA">
              <p class="muted mb-2">${item.sla} · due ${item.due}.</p>
              <eds-stepper id="rq-sla-steps"></eds-stepper>
              <eds-checkbox class="mt-3" label="Page Elena Poluru if this slips one more day" checked></eds-checkbox>
            </eds-tab>
            <eds-tab label="Notes">
              <p>${item.title} sits with ${item.department}. Channel ${item.channel}.</p>
              <eds-textarea label="Desk note" rows="4" placeholder="What moved this week, who owns the next action."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="rq-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Route',
          body: `
            <p class="mb-1"><strong>${item.department}</strong></p>
            <p class="muted mb-2">${item.owner} · ${item.priority}</p>
            <eds-link href="#/departments" variant="default">Open departments</eds-link>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        ${sheet({
          title: 'Activity',
          body: '<eds-timeline id="rq-activity"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Plan',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Outcome" open>
                Close inside the 5-day SLA or file a delay with the 311 desk.
              </eds-accordion-item>
              <eds-accordion-item heading="Risks">
                ${item.sla === 'Overdue' ? 'Already past the close date. Crew needs a same-day slot.' : 'Weather and crew load are the two items that move the clock.'}
              </eds-accordion-item>
              <eds-accordion-item heading="Next 48 hours">
                Confirm the crew, update the resident, and stamp the close.
              </eds-accordion-item>
            </eds-accordion>
            <div class="mt-3">
              <eds-rating value="${item.sla === 'Overdue' ? 2 : 4}" readonly size="sm"></eds-rating>
              <p class="muted mb-0 mt-1">Resident follow-up from the last call.</p>
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateRequest(root, route) {
  const item = requests.find((entry) => entry.id === route.id) ?? requests[0];
  const facts = root.querySelector('#rq-facts');
  if (facts) {
    facts.items = [
      { term: 'Code', description: item.code },
      { term: 'Owner', description: item.owner },
      { term: 'Department', description: item.department },
      { term: 'Ward', description: item.ward },
      { term: 'Channel', description: item.channel },
      { term: 'Priority', description: item.priority },
      { term: 'Opened', description: item.opened },
      { term: 'Due', description: item.due },
    ];
  }
  const table = root.querySelector('#rq-steps');
  if (table) {
    table.columns = [
      { key: 'step', label: 'Step' },
      { key: 'state', label: 'State' },
    ];
    table.rows = [
      { step: 'Intake', state: 'Done' },
      { step: 'Route', state: 'Done' },
      { step: 'Crew', state: item.status === 'Open' ? 'Now' : 'Done' },
      { step: 'Close', state: item.status === 'Complete' ? 'Done' : 'Next' },
    ];
  }
  const steps = root.querySelector('#rq-sla-steps');
  if (steps) {
    steps.steps = [{ label: 'Open' }, { label: 'Assigned' }, { label: 'On site' }, { label: 'Close' }];
    steps.current = item.status === 'Complete' ? 3 : item.status === 'In progress' ? 2 : 1;
  }
  const timeline = root.querySelector('#rq-activity');
  if (timeline) {
    timeline.items = activity
      .filter((entry) => entry.description.includes(item.owner.split(' ')[0]) || entry.label.toLowerCase().includes(item.title.split(' ')[0].toLowerCase()))
      .slice(0, 4);
    if (!timeline.items.length) timeline.items = activity.slice(0, 4);
  }
  root.querySelector('#open-service')?.addEventListener('eds-click', () => {
    window.location.hash = '#/service';
  });
  root.querySelector('#set-hearing')?.addEventListener('eds-click', () => document.querySelector('#hearing-modal')?.show());
}
