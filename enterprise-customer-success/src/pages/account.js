import { accounts, activity, expansion, onboarding, renewals } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export function renderAccount(route) {
  const account = accounts.find((item) => item.id === route.id) ?? accounts[0];
  const renewal = renewals.find((item) => item.accountId === account.id);
  const onboard = onboarding.find((item) => item.accountId === account.id);
  const expand = expansion.filter((item) => item.accountId === account.id);
  return `
    ${pageHeader({
      eyebrow: `${account.region} · ${account.plan}`,
      title: account.name,
      lead: `CSM ${account.csm}. ${formatCurrency(account.arr)} ARR · renews ${account.renews}.`,
      actions: `
        <eds-button id="open-health" variant="secondary" icon="star">Health</eds-button>
        <eds-button id="run-play" variant="primary" icon="file">Run playbook</eds-button>
      `,
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-8">
        <eds-card padded>
          <eds-tabs>
            <eds-tab label="Health" active>
              <div class="project-hero">
                <div>
                  <span class="kicker">Score</span>
                  <p class="hero-metric">${account.health}</p>
                  ${statusChip(account.status)}
                </div>
                <eds-progress-bar value="${account.health}" max="100" label="Account health" show-value></eds-progress-bar>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-sm-6">
                  <eds-meter value="${account.product}" min="0" max="100" low="65" high="80" optimum="90" label="Product" show-value></eds-meter>
                </div>
                <div class="col-sm-6">
                  <eds-meter value="${account.support}" min="0" max="100" low="65" high="80" optimum="90" label="Support" show-value></eds-meter>
                </div>
                <div class="col-sm-6">
                  <eds-meter value="${account.adoption}" min="0" max="100" low="65" high="80" optimum="90" label="Adoption" show-value></eds-meter>
                </div>
                <div class="col-sm-6">
                  <eds-meter value="${account.relationship}" min="0" max="100" low="65" high="80" optimum="90" label="Relationship" show-value></eds-meter>
                </div>
              </div>
              <eds-divider class="my-3"></eds-divider>
              <eds-data-table id="driver-table" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Renewal">
              <p class="muted">${renewal ? `${formatCurrency(renewal.arr)} · ${renewal.stage} · ${renewal.probability}% win · ${renewal.owner}` : 'No renewal in the next 90 days.'}</p>
              ${renewal ? `<eds-progress-bar value="${renewal.probability}" max="100" label="Win probability" show-value></eds-progress-bar>` : ''}
              <eds-textarea class="mt-3" label="Renewal note" rows="4" placeholder="What the buyer needs before signature."></eds-textarea>
            </eds-tab>
            <eds-tab label="Onboarding">
              ${
                onboard
                  ? `<p class="muted mb-2">${onboard.milestone} · ${onboard.status} · target ${onboard.target}</p>
                     <eds-stepper id="acct-steps"></eds-stepper>
                     <eds-progress-bar class="mt-3" value="${onboard.progress}" max="100" label="${onboard.progress}%" show-value></eds-progress-bar>`
                  : '<p class="muted mb-0">Live. First value already recorded.</p>'
              }
            </eds-tab>
            <eds-tab label="Notes">
              <p>${account.name} is in ${account.stage.toLowerCase()}. Last QBR ${account.lastQbr}. Next ${account.nextQbr}.</p>
              <eds-textarea label="CSM note" rows="4" placeholder="What moved this week, who owns the next action."></eds-textarea>
            </eds-tab>
          </eds-tabs>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Facts',
          body: '<eds-description-list id="acct-facts"></eds-description-list>',
        })}
        ${sheet({
          title: 'Expansion',
          body: expand.length
            ? expand
                .map(
                  (item) => `
                <p class="mb-1"><strong>${item.type}</strong> · ${formatCurrency(item.amount)}</p>
                <p class="muted mb-2">${item.stage} · ${item.close}</p>`,
                )
                .join('') + '<eds-link href="#/expansion" variant="default">Open pipeline</eds-link>'
            : '<p class="muted mb-0">No open expansion.</p>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        ${sheet({
          title: 'Activity',
          body: '<eds-timeline id="acct-activity"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Success plan',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Outcomes" open>
                Hold NRR above 110% and land the next QBR with a named exec sponsor.
              </eds-accordion-item>
              <eds-accordion-item heading="Risks">
                Support backlog and delayed SSO are the two items that move health.
              </eds-accordion-item>
              <eds-accordion-item heading="Next 30 days">
                Close the open tickets, finish training, and lock the renewal date.
              </eds-accordion-item>
            </eds-accordion>
            <div class="mt-3">
              <eds-rating value="4" readonly size="sm"></eds-rating>
              <p class="muted mb-0 mt-1">Relationship strength from the last QBR.</p>
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateAccount(root, route) {
  const account = accounts.find((item) => item.id === route.id) ?? accounts[0];
  const onboard = onboarding.find((item) => item.accountId === account.id);
  const facts = root.querySelector('#acct-facts');
  if (facts) {
    facts.items = [
      { term: 'CSM', description: account.csm },
      { term: 'Segment', description: account.segment },
      { term: 'ARR', description: formatCurrency(account.arr) },
      { term: 'NRR', description: `${account.nrr}%` },
      { term: 'Seats', description: String(account.seats) },
      { term: 'Region', description: account.region },
      { term: 'NPS', description: account.nps ? String(account.nps) : 'Pending' },
      { term: 'Next QBR', description: account.nextQbr },
    ];
  }
  const table = root.querySelector('#driver-table');
  if (table) {
    table.columns = [
      { key: 'driver', label: 'Driver' },
      { key: 'score', label: 'Score' },
    ];
    table.rows = [
      { driver: 'Product', score: account.product },
      { driver: 'Support', score: account.support },
      { driver: 'Adoption', score: account.adoption },
      { driver: 'Relationship', score: account.relationship },
    ];
  }
  const steps = root.querySelector('#acct-steps');
  if (steps && onboard) {
    steps.steps = onboard.steps.map((label) => ({ label }));
    steps.current = onboard.current;
  }
  const timeline = root.querySelector('#acct-activity');
  if (timeline) {
    timeline.items = activity.filter((item) => item.description.includes(account.csm.split(' ')[0]) || item.label.includes(account.name.split(' ')[0])).slice(0, 4);
    if (!timeline.items.length) timeline.items = activity.slice(0, 4);
  }
  root.querySelector('#open-health')?.addEventListener('eds-click', () => {
    window.location.hash = '#/health';
  });
  root.querySelector('#run-play')?.addEventListener('eds-click', () => document.querySelector('#play-modal')?.show());
}
