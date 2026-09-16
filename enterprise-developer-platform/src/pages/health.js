import { endpointColumns, endpoints, latencyTrend, people, policies, services } from '../data/index.js';
import { healthMix, pageHeader, sheet, sparkline, statusChip } from '../components/widgets.js';

export function renderHealth() {
  const watch = endpoints.filter((item) => item.status === 'Watch' || item.status === 'Failed');
  return `
    ${pageHeader({
      eyebrow: 'SLO',
      title: 'Health',
      lead: 'P95 is 118ms against a 200ms SLO. Billing invoice is the lag. Travel book is failed in staging.',
      actions: `
        <eds-popover heading="Bands">
          <eds-button slot="trigger" variant="tertiary" icon="info">Bands</eds-button>
          <p class="mb-0">Healthy is inside SLO. Watch is inside 24 hours of burning the budget. Failed is a rollback.</p>
        </eds-popover>
        <eds-button id="hl-deploy" variant="primary" icon="plus">Ship</eds-button>
      `,
    })}
    <eds-alert variant="warning" title="Billing error budget is 62%" message="POST /v1/invoice p95 is 186ms. Arjun Poluru owns the ledger."></eds-alert>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Routes',
          body: '<eds-data-table id="hl-table" sortable striped></eds-data-table>',
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Mix',
          body: healthMix(services),
        })}
      </div>
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'P95 trend',
        action: '<eds-badge label="T12W" variant="brand" pill></eds-badge>',
        body: `${sparkline(latencyTrend, 'Trailing twelve weeks of platform p95')}
          <p class="muted mb-0 mt-2">House moved from 164ms to 118ms over twelve weeks. Auth and mesh pulled the line.</p>`,
      })}
    </section>
    <div class="card-grid mt-3">
      ${endpoints
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.route}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.service} · ${item.owner}</p>
          <eds-progress-bar value="${Math.min(item.slo, 100)}" max="100" label="${item.p95}ms · ${item.errors}% errors" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Watch',
          body: `
            <p class="muted">${watch.length} route${watch.length === 1 ? '' : 's'} under the band.</p>
            <eds-list id="hl-watch" divided></eds-list>`,
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Desk load',
          body: `
            <div class="card-grid cols-2">
              ${people
                .filter((person) => person.squad === 'Platform' || person.squad === 'Money')
                .map(
                  (person) => `
                <content-card>
                  <div class="person-card">
                    <eds-avatar name="${person.name}" size="md"></eds-avatar>
                    <div>
                      <strong>${person.name}</strong>
                      <p class="muted mb-1">${person.role} · ${person.book}</p>
                      ${statusChip(person.score >= 85 ? 'On track' : 'Watch')}
                    </div>
                  </div>
                  <eds-progress-bar class="mt-3" value="${person.score}" max="100" label="${person.score}" show-value></eds-progress-bar>
                </content-card>`,
                )
                .join('')}
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      ${sheet({
        title: 'House rules',
        body: `
          <div class="card-grid cols-2">
            ${policies
              .map(
                (item) => `
              <content-card>
                <div slot="header" class="section-title">
                  <h2>${item.name}</h2>
                  ${statusChip(item.status)}
                </div>
                <p class="muted mb-0">${item.trigger} · ${item.owner} · ${item.steps} steps</p>
              </content-card>`,
              )
              .join('')}
          </div>`,
      })}
    </section>
  `;
}

export function hydrateHealth(root) {
  const table = root.querySelector('#hl-table');
  if (table) {
    table.columns = endpointColumns;
    table.rows = endpoints.map((item) => ({
      ...item,
      p95: `${item.p95}ms`,
      errors: `${item.errors}%`,
      slo: `${item.slo}%`,
    }));
  }
  const watch = root.querySelector('#hl-watch');
  if (watch) {
    watch.items = endpoints
      .filter((item) => item.status === 'Watch' || item.status === 'Failed')
      .map((item) => ({
        label: `${item.route} · ${item.p95}ms`,
        description: `${item.service} · ${item.owner}`,
        icon: 'alert-triangle',
        href: '#/health',
      }));
  }
  root.querySelector('#hl-deploy')?.addEventListener('eds-click', () => document.querySelector('#deploy-modal')?.show());
}
