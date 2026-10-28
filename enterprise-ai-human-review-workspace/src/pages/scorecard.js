import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Queue',
      title: card.name,
      lead: `${card.focus} · lead ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Ops report</eds-button>
        <eds-button variant="primary" icon="settings">Open rubric</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Quality score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Queue health" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis.toLocaleString()} pending · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Calibration readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Lead</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Queue lead</p>
          </div>
        </div>
        <eds-divider label="Signals"></eds-divider>
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
          <eds-tab label="Queue">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Rubric">
            <eds-accordion>
              <eds-accordion-item heading="SLA" open>
                Target turnaround and escalation thresholds.
              </eds-accordion-item>
              <eds-accordion-item heading="Calibration">
                Gold-set items and agreement floor for cycle 14.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Ops">
            <p class="muted">Reviewer roster, shift coverage, and appeal rates.</p>
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
    tags.innerHTML = ['SLA', 'Agreement', 'Rework', 'Calibration', 'Appeals']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `{
  "queue": "${card.id}",
  "quality_score": ${card.health},
  "lead": "${card.owner}",
  "pending": ${card.kpis}
}`;
  }
}
