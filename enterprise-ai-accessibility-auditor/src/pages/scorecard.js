import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Audit detail',
      title: card.name,
      lead: `${card.focus} · owned by ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Export</eds-button>
        <eds-button variant="primary" icon="eye">Run scan</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Health summary</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="WCAG score" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis} automated checks · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Compliance meter"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Owner</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Primary reviewer for remediation</p>
          </div>
        </div>
        <eds-divider label="Checks"></eds-divider>
        <div class="inline-actions" id="audit-tags"></div>
      </content-card>
    </div>
    ${sheet({
      title: 'Metrics',
      body: '<eds-data-table id="audit-metrics" zebra></eds-data-table>',
    })}
    ${sheet({
      title: 'Evidence',
      body: `
        <eds-tabs id="audit-tabs">
          <eds-tab label="Automated">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Manual">
            <eds-accordion>
              <eds-accordion-item heading="Keyboard notes" open>
                Tab order verified on primary flows. One trap remains in checkout drawer.
              </eds-accordion-item>
              <eds-accordion-item heading="Contrast notes">
                Secondary text on slate backgrounds needs token refresh to meet 4.5:1.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="API">
            <p class="muted">Use the Beacon API to pull the latest scan payloads for this surface.</p>
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
    tags.innerHTML = ['Keyboard', 'Contrast', 'Forms', 'Structure', 'Media']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `{
  "audit": "${card.id}",
  "score": ${card.health},
  "owner": "${card.owner}",
  "wcag": "2.2 AA"
}`;
  }
}
