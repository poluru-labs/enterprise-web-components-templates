import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Model',
      title: card.name,
      lead: `${card.focus} · owned by ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Model card</eds-button>
        <eds-button variant="primary" icon="settings">Run evaluation</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Evaluation score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Eval score" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis} metrics tracked · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Promotion readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Owner</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Model owner</p>
          </div>
        </div>
        <eds-divider label="Suites"></eds-divider>
        <div class="inline-actions" id="audit-tags"></div>
      </content-card>
    </div>
    ${sheet({
      title: 'Gate metrics',
      body: '<eds-data-table id="audit-metrics" zebra></eds-data-table>',
    })}
    ${sheet({
      title: 'Artifacts',
      body: `
        <eds-tabs id="audit-tabs">
          <eds-tab label="Holdout">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Checks">
            <eds-accordion>
              <eds-accordion-item heading="Performance" open>
                AUC, precision@k, and calibration on frozen holdout.
              </eds-accordion-item>
              <eds-accordion-item heading="Fairness">
                Segment parity and threshold stability across cohorts.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Ops">
            <p class="muted">Latency, throughput, and shadow agreement vs production.</p>
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
    tags.innerHTML = ['Holdout', 'Shadow', 'Drift', 'Fairness', 'Latency']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `{
  "model": "${card.id}",
  "eval_score": ${card.health},
  "owner": "${card.owner}",
  "holdout": "2026-10-20"
}`;
  }
}
