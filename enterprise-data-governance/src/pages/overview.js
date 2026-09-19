import {
  assets,
  kpis,
  metricColumns,
  metricRows,
  qualityTrend,
  reviews,
} from '../data/index.js';
import { cadenceList, healthMix, hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderOverview() {
  const certified = assets.filter((item) => item.status === 'Certified').slice(0, 4);
  return `
    <section class="hero">
      <div>
        <span class="kicker">Helix Markets · production catalog</span>
        <h1>Know what you hold.<br>Prove who owns it.</h1>
        <p>Catalog, ownership, lineage, quality rules, classifications, and access requests — in one workspace. No guesswork on gold data.</p>
        <div class="inline-actions">
          <eds-button variant="primary" icon="folder" data-go="#/catalog">Browse catalog</eds-button>
          <eds-button variant="secondary" icon="lock" id="hero-access">Request access</eds-button>
        </div>
      </div>
      <div class="hero-panel">
        <div>
          <span class="kicker">Certified gold</span>
          <strong>84%</strong>
          <p>of production assets have a named owner, passing rules, and a published label.</p>
        </div>
        <div class="hero-metrics">
          <div><span>Named owners</span><b>97%</b></div>
          <div><span>Open requests</span><b>18</b></div>
          <div><span>Rules passing</span><b>91.4%</b></div>
          <div><span>Open issues</span><b>7</b></div>
        </div>
      </div>
    </section>
    ${pageHeader({
      eyebrow: 'Today',
      title: 'Catalog pulse',
      lead: 'Coverage, quality, and access for Helix Markets as of 16 Sep 2026.',
      actions: `
        <eds-button variant="tertiary" icon="download" id="export-overview">Export</eds-button>
        <eds-split-button id="overview-create" variant="primary" icon="plus" label="Register asset">
          <eds-menu-item label="Register asset" value="asset"></eds-menu-item>
          <eds-menu-item label="Add quality rule" value="rule"></eds-menu-item>
          <eds-menu-item label="Request access" value="access"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    ${statGrid(kpis.slice(0, 4))}
    <div class="split">
      ${sheet({
        title: 'Quality trend',
        action: '<eds-badge label="12 weeks" variant="neutral" pill></eds-badge>',
        body: `${sparkline(qualityTrend, 'Rules passing rose from 82% to 91.4%')}<p class="muted">Passing rate across 155 published checks.</p>`,
      })}
      ${sheet({
        title: 'Catalog mix',
        body: healthMix(assets),
      })}
    </div>
    <div class="split">
      ${sheet({
        title: 'Certified this week',
        action: '<eds-link href="#/catalog">Open catalog</eds-link>',
        body: `<eds-list id="certified-list" divided></eds-list>
          <div class="tag-row mt-4">${certified.map((item) => `<eds-tag label="${item.domain}" variant="brand"></eds-tag>`).join('')}</div>`,
      })}
      ${sheet({
        title: 'Cadence',
        body: cadenceList(reviews),
      })}
    </div>
    ${sheet({
      title: 'Stewardship scorecard',
      body: '<eds-data-table id="metric-table" sortable></eds-data-table>',
    })}
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis.slice(0, 4));
  const list = root.querySelector('#certified-list');
  if (list) {
    list.items = assets
      .filter((item) => item.status === 'Certified')
      .slice(0, 4)
      .map((item) => ({
        label: item.name,
        description: `${item.owner} · ${item.quality}% quality`,
        icon: 'check-circle',
        href: `#/asset/${item.id}`,
      }));
  }
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
  root.querySelector('#hero-access')?.addEventListener('eds-click', () => document.querySelector('#access-modal')?.show());
  root.querySelector('#export-overview')?.addEventListener('eds-click', () => document.querySelector('#export-overview')?.dispatchEvent(new CustomEvent('verity-export', { bubbles: true })));
  root.querySelector('#overview-create')?.addEventListener('eds-select', (event) => {
    const value = event.detail?.value;
    if (value === 'asset') document.querySelector('#asset-modal')?.show();
    if (value === 'rule') document.querySelector('#rule-modal')?.show();
    if (value === 'access') document.querySelector('#access-modal')?.show();
  });
}
