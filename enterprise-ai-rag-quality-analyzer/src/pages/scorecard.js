import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Collection',
      title: card.name,
      lead: `${card.focus} · owned by ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Quality report</eds-button>
        <eds-button variant="primary" icon="settings">Run suite</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Quality score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Collection score" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis} labeled queries · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Index readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Owner</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Content owner</p>
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
          <eds-tab label="Index">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Review">
            <eds-accordion>
              <eds-accordion-item heading="Recall" open>
                Gold passages appear in top-k retrieved segments.
              </eds-accordion-item>
              <eds-accordion-item heading="Citations">
                Answer spans align with source offsets in the corpus.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Ops">
            <p class="muted">Chunk counts, freshness, and query latency for this collection.</p>
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
    tags.innerHTML = ['Recall', 'Citations', 'Chunks', 'Freshness', 'Latency']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `{
  "collection": "${card.id}",
  "quality_score": ${card.health},
  "owner": "${card.owner}",
  "query_suite": "v3"
}`;
  }
}
