import { apiSnippet, metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Surface',
      title: card.name,
      lead: `${card.focus} · owner ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Probe report</eds-button>
        <eds-button variant="primary" icon="settings">Corpus profile</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Pass score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Surface pass score" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis.toLocaleString()} probes · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Release gate readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Owner</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Surface owner</p>
          </div>
        </div>
        <eds-divider label="Controls"></eds-divider>
        <div class="inline-actions" id="audit-tags"></div>
      </content-card>
    </div>
    ${sheet({
      title: 'Gate metrics',
      body: '<eds-data-table id="audit-metrics" zebra></eds-data-table>',
    })}
    ${sheet({
      title: 'Evidence',
      body: `
        <eds-tabs id="audit-tabs">
          <eds-tab label="Summary">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Policy">
            <eds-accordion>
              <eds-accordion-item heading="Allowlist" open>
                Approved fields, headers, and content types for this surface.
              </eds-accordion-item>
              <eds-accordion-item heading="Boundaries">
                Max length, nesting depth, and encoding rules on file.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Ops">
            <p class="muted">Last corpus run, block logs, and mean response time under probe load.</p>
          </eds-tab>
        </eds-tabs>
      `,
    })}
  `;
}

export function hydrateScorecard(root, route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  const metrics = root.querySelector('#audit-metrics');
  if (metrics) {
    metrics.columns = metricColumns;
    metrics.rows = metricRows;
  }
  const tags = root.querySelector('#audit-tags');
  if (tags) {
    tags.innerHTML = ['Encoding', 'Allowlist', 'Replay', 'Headers', 'Sanitize']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = apiSnippet;
  }
}
