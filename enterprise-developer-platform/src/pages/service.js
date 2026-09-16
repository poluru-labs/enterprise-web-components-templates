import { activity, deployments, endpoints, services } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderService(route) {
  const item = services.find((entry) => entry.id === route.id) ?? services[0];
  const sloPct = Math.round(item.slo);
  const latencyScore = Math.max(0, Math.min(100, Math.round((200 - item.p95) / 2)));
  return `
    ${pageHeader({
      eyebrow: `${item.code} · ${item.env}`,
      title: item.name,
      lead: `${item.stack} · ${item.squad}. Owner ${item.owner}. Version ${item.version}.`,
      actions: `
        <eds-button id="open-health" variant="secondary" icon="check">Health</eds-button>
        <eds-button id="run-deploy" variant="primary" icon="plus">Ship</eds-button>
      `,
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="Run" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">SLO</span>
                  <p class="hero-metric">${sloPct}%</p>
                  ${statusChip(item.status)}
                </div>
                <eds-progress-bar value="${sloPct}" max="100" label="Service SLO" show-value></eds-progress-bar>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-sm-6">
                  <eds-meter value="${latencyScore}" min="0" max="100" low="40" high="70" optimum="90" label="P95 ${item.p95}ms" show-value></eds-meter>
                </div>
                <div class="col-sm-6">
                  <eds-meter value="${sloPct}" min="0" max="100" low="90" high="99" optimum="99.9" label="Budget" show-value></eds-meter>
                </div>
              </div>
              <eds-divider class="my-3"></eds-divider>
              <eds-data-table id="svc-steps" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Routes">
              <p class="muted">${item.name} sits on ${item.env}. Version ${item.version}.</p>
              <eds-textarea class="mt-3" label="Runbook note" rows="4" placeholder="Pager, rollback, and who owns the next ship."></eds-textarea>
            </eds-tab>
            <eds-tab label="Release">
              <p class="muted mb-2">${item.status} · ${item.version}.</p>
              <eds-stepper id="svc-run-steps"></eds-stepper>
              <eds-checkbox class="mt-3" label="Page Sahana Poluru if error budget slips under 70%" checked></eds-checkbox>
            </eds-tab>
            <eds-tab label="Notes">
              <p>${item.name} sits with ${item.owner}. Squad ${item.squad}.</p>
              <eds-textarea label="Owner note" rows="4" placeholder="What shipped this morning, who owns the next action."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="svc-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Env',
          body: `
            <p class="mb-1"><strong>${item.env}</strong></p>
            <p class="muted mb-2">${item.owner} · ${item.stack}</p>
            <eds-link href="#/environments" variant="default">Open environments</eds-link>`,
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        ${sheet({
          title: 'Activity',
          body: '<eds-timeline id="svc-activity"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Plan',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Outcome" open>
                Hold the SLO, keep p95 under 200ms, and ship behind a canary.
              </eds-accordion-item>
              <eds-accordion-item heading="Risks">
                ${item.status === 'Watch' || item.status === 'Failed' ? 'Error budget and the last failed ship are the two items that move the clock.' : 'Freeze on 2 Oct and sandbox key age are the items that move the clock.'}
              </eds-accordion-item>
              <eds-accordion-item heading="Next 48 hours">
                Confirm the next version, check the error budget, and stamp the owner page.
              </eds-accordion-item>
            </eds-accordion>
            <div class="mt-3">
              <eds-rating value="${item.status === 'Healthy' ? 5 : item.status === 'Watch' || item.status === 'Rolling' ? 3 : 2}" readonly size="sm"></eds-rating>
              <p class="muted mb-0 mt-1">House score from the last walkthrough.</p>
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateService(root, route) {
  const item = services.find((entry) => entry.id === route.id) ?? services[0];
  const facts = root.querySelector('#svc-facts');
  if (facts) {
    facts.items = [
      { term: 'Code', description: item.code },
      { term: 'Owner', description: item.owner },
      { term: 'Env', description: item.env },
      { term: 'Stack', description: item.stack },
      { term: 'Squad', description: item.squad },
      { term: 'Version', description: item.version },
      { term: 'P95', description: `${item.p95}ms` },
      { term: 'SLO', description: `${item.slo}%` },
    ];
  }
  const table = root.querySelector('#svc-steps');
  if (table) {
    table.columns = [
      { key: 'step', label: 'Step' },
      { key: 'state', label: 'State' },
    ];
    table.rows = [
      { step: 'Build', state: 'Done' },
      { step: 'Stage', state: item.status === 'Failed' ? 'Failed' : 'Done' },
      { step: 'Canary', state: item.status === 'Rolling' ? 'Now' : item.env === 'Production' ? 'Done' : 'Next' },
      { step: 'Prod', state: item.env === 'Production' && item.status === 'Healthy' ? 'Done' : 'Next' },
    ];
  }
  const steps = root.querySelector('#svc-run-steps');
  if (steps) {
    steps.steps = [{ label: 'Build' }, { label: 'Stage' }, { label: 'Canary' }, { label: 'Prod' }];
    steps.current = item.status === 'Failed' ? 1 : item.status === 'Rolling' ? 2 : item.env === 'Production' ? 3 : 1;
  }
  const timeline = root.querySelector('#svc-activity');
  if (timeline) {
    const ships = deployments.filter((entry) => entry.serviceId === item.id).length;
    const routes = endpoints.filter((entry) => entry.serviceId === item.id).length;
    timeline.items = activity
      .filter(
        (entry) =>
          entry.description.includes(item.owner.split(' ')[0]) ||
          entry.label.toLowerCase().includes(item.name.split(' ')[0].toLowerCase()),
      )
      .slice(0, 4);
    if (!timeline.items.length) timeline.items = activity.slice(0, 4);
    timeline.items = [
      { label: `${ships} deploys on the train`, description: `${routes} routes · ${item.version}`, timestamp: '16 Sep', icon: 'plus', status: 'Done' },
      ...timeline.items,
    ].slice(0, 5);
  }
  root.querySelector('#open-health')?.addEventListener('eds-click', () => {
    window.location.hash = '#/health';
  });
  root.querySelector('#run-deploy')?.addEventListener('eds-click', () => document.querySelector('#deploy-modal')?.show());
}
