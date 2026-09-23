import {
  assets,
  healthTrend,
  incidents,
  kpis,
  metricColumns,
  metricRows,
  reviews,
} from '../data/index.js';
import { cadenceList, healthMix, hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';
import { severityTone } from '../lib/status.js';

export function renderOverview() {
  const open = incidents.filter((item) => item.status !== 'Resolved').slice(0, 4);
  return `
    <section class="hero">
      <div>
        <span class="kicker">Northline Systems · live operations</span>
        <h1>Know what is down.<br>Know what is changing.</h1>
        <p>Assets, incidents, change requests, infrastructure health, and service availability — with a named Poluru owner on every record.</p>
        <div class="inline-actions">
          <eds-button variant="primary" icon="alert-triangle" data-go="#/incidents">Open queue</eds-button>
          <eds-button variant="secondary" icon="plus" id="hero-raise">Raise incident</eds-button>
        </div>
      </div>
      <div class="hero-panel">
        <div>
          <span class="kicker">Estate health</span>
          <strong>96%</strong>
          <p>Five sites in the CMDB. Dallas is in a watch state ahead of tonight’s ledger window.</p>
        </div>
        <div class="hero-metrics">
          <div><span>Open P1</span><b>1</b></div>
          <div><span>Changes tonight</span><b>3</b></div>
          <div><span>SLO hold</span><b>99.94%</b></div>
          <div><span>On call</span><b>Sahana</b></div>
        </div>
      </div>
    </section>
    ${pageHeader({
      eyebrow: 'Today',
      title: 'Operations pulse',
      lead: 'Northline Systems as of 16 Sep 2026, 14:41 CT.',
      actions: `
        <eds-button variant="tertiary" icon="download" id="export-overview">Export</eds-button>
        <eds-split-button id="overview-create" variant="primary" icon="plus" label="Raise incident">
          <eds-menu-item label="Raise incident" value="raise"></eds-menu-item>
          <eds-menu-item label="Submit change" value="change"></eds-menu-item>
          <eds-menu-item label="Register asset" value="asset"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    ${statGrid(kpis.slice(0, 4))}
    <eds-alert variant="warning" title="P1 on Identity" message="INC-10482 · SSO broker timeouts. Arjun Poluru is on the bridge. 38 minutes left on the restore SLA."></eds-alert>
    <div class="split mt-4">
      ${sheet({
        title: 'Estate health, 12 weeks',
        action: '<eds-badge label="96.4%" variant="brand" pill></eds-badge>',
        body: `${sparkline(healthTrend, 'Estate health rose from 91.2% to 96.4%')}<p class="muted">Composite of five sites and 412 configuration items.</p>`,
      })}
      ${sheet({
        title: 'CI mix',
        body: healthMix(assets),
      })}
    </div>
    <div class="split">
      ${sheet({
        title: 'Open queue',
        action: '<eds-link href="#/incidents">All incidents</eds-link>',
        body: `<div class="stack">${open
          .map(
            (item) => `
          <div class="person-head">
            <div>
              <strong><a href="#/incident/${item.id}">${item.id}</a> · ${item.title}</strong>
              <small class="asset-meta">${item.owner} · ${item.since} · ${item.sla}</small>
            </div>
            <eds-badge label="${item.severity}" variant="${severityTone(item.severity)}" pill></eds-badge>
          </div>`,
          )
          .join('')}</div>`,
      })}
      ${sheet({
        title: 'Cadence',
        body: cadenceList(reviews),
      })}
    </div>
    ${sheet({
      title: 'Control scorecard',
      body: '<eds-data-table id="metric-table" sortable></eds-data-table>',
    })}
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis.slice(0, 4));
  const table = root.querySelector('#metric-table');
  if (table) {
    table.columns = metricColumns;
    table.rows = metricRows;
  }
  root.querySelectorAll('[data-go]').forEach((button) => {
    button.addEventListener('eds-click', () => {
      window.location.hash = button.getAttribute('data-go');
    });
  });
  root.querySelector('#hero-raise')?.addEventListener('eds-click', () => document.querySelector('#raise-modal')?.show());
  root.querySelector('#export-overview')?.addEventListener('eds-click', () => {
    document.querySelector('#export-overview')?.dispatchEvent(new CustomEvent('techstar-export', { bubbles: true }));
  });
  root.querySelector('#overview-create')?.addEventListener('eds-select', (event) => {
    const value = event.detail?.value;
    if (value === 'raise') document.querySelector('#raise-modal')?.show();
    if (value === 'change') document.querySelector('#change-modal')?.show();
    if (value === 'asset') document.querySelector('#asset-modal')?.show();
  });
}
