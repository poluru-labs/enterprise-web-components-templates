import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Service',
      title: card.name,
      lead: `${card.focus} · owned by ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Run report</eds-button>
        <eds-button variant="primary" icon="settings">View traces</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Health score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Service health" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis} runs / day · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="SLO readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Owner</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Service owner</p>
          </div>
        </div>
        <eds-divider label="Signals"></eds-divider>
        <div class="inline-actions" id="audit-tags"></div>
      </content-card>
    </div>
    ${sheet({
      title: 'SLO metrics',
      body: '<eds-data-table id="audit-metrics" zebra></eds-data-table>',
    })}
    ${sheet({
      title: 'Evidence',
      body: `
        <eds-tabs id="audit-tabs">
          <eds-tab label="Runs">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Traces">
            <eds-accordion>
              <eds-accordion-item heading="Completeness" open>
                Every step emits a span with parent run id.
              </eds-accordion-item>
              <eds-accordion-item heading="Latency">
                p95 measured orchestrator to terminal state.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Ops">
            <p class="muted">Queue depth, retry counts, and DLQ age for this service.</p>
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
    tags.innerHTML = ['Runs', 'Traces', 'SLO', 'DLQ', 'Latency']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `{
  "service": "${card.id}",
  "health_score": ${card.health},
  "owner": "${card.owner}",
  "success_rate_7d": 0.992
}`;
  }
}
