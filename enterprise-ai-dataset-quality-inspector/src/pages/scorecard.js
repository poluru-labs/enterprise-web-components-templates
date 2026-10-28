import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Dataset',
      title: card.name,
      lead: `${card.focus} · steward ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Scan report</eds-button>
        <eds-button variant="primary" icon="settings">Rule profile</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Quality score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Dataset score" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis.toLocaleString()} rows · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Certification readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Steward</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Data steward</p>
          </div>
        </div>
        <eds-divider label="Checks"></eds-divider>
        <div class="inline-actions" id="audit-tags"></div>
      </content-card>
    </div>
    ${sheet({
      title: 'Rule results',
      body: '<eds-data-table id="audit-metrics" zebra></eds-data-table>',
    })}
    ${sheet({
      title: 'Evidence',
      body: `
        <eds-tabs id="audit-tabs">
          <eds-tab label="Profile">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Schema">
            <eds-accordion>
              <eds-accordion-item heading="Contract" open>
                Approved column types and nullability vs v4.2.
              </eds-accordion-item>
              <eds-accordion-item heading="Lineage">
                Upstream source and refresh cadence on file.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Ops">
            <p class="muted">Partition stats, PII scan results, and scan duration.</p>
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
    tags.innerHTML = ['Completeness', 'Uniqueness', 'Schema', 'Freshness', 'PII']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `{
  "dataset": "${card.id}",
  "quality_score": ${card.health},
  "steward": "${card.owner}",
  "rows": ${card.kpis}
}`;
  }
}
