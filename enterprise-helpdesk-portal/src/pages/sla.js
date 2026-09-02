import { slaColumns, slaPolicies } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderSla() {
  return `
    ${pageHeader({
      eyebrow: 'Targets',
      title: 'SLA policies',
      lead: 'First response and resolution targets by priority. Breach rates are trailing 30 days.',
      actions: '<eds-button id="sla-edit" variant="secondary" icon="settings">Edit policies</eds-button>',
    })}
    <eds-card padded>
      <eds-data-table id="sla-table" compact striped></eds-data-table>
    </eds-card>
    <section class="row g-3 mt-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Breach watchlist',
          body: `
            <eds-list id="breach-list" divided></eds-list>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Policy notes',
          body: `
            <eds-alert variant="info" title="VIP override" message="VIP customer policy applies to Harbor and Lumen accounts automatically."></eds-alert>
            <p class="muted mb-0 mt-2">EMEA overnight policy uses Priya Poluru's squad calendar for business hours.</p>
          `,
        })}
      </div>
    </section>
  `;
}

export function hydrateSla(root) {
  const table = root.querySelector('#sla-table');
  if (table) {
    table.columns = slaColumns;
    table.rows = slaPolicies.map((item) => ({
      name: item.name,
      priority: item.priority,
      firstResponse: item.firstResponse,
      resolution: item.resolution,
      breachRate: item.breachRate,
      status: item.status,
    }));
  }
  const list = root.querySelector('#breach-list');
  if (list) {
    list.items = slaPolicies
      .filter((item) => item.status !== 'Healthy')
      .map((item) => ({
        label: item.name,
        description: `${item.breachRate} breach rate · ${item.firstResponse} first response`,
        icon: 'clock',
      }));
  }
  root.querySelector('#sla-edit')?.addEventListener('eds-click', () => {
    window.location.hash = '#/settings';
  });
}
