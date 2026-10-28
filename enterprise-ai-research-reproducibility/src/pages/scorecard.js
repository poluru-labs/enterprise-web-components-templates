import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Study',
      title: card.name,
      lead: `${card.focus} · PI ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Replication report</eds-button>
        <eds-button variant="primary" icon="settings">View artifacts</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Replication score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Study score" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis} runs logged · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Sign-off readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>PI</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Principal investigator</p>
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
          <eds-tab label="Artifacts">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Protocol">
            <eds-accordion>
              <eds-accordion-item heading="Preregistration" open>
                Steps and outcomes locked before data collection.
              </eds-accordion-item>
              <eds-accordion-item heading="Environment">
                Container digest and dependency lockfiles on file.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Ops">
            <p class="muted">Rerun history, reviewer notes, and hash manifests for this study.</p>
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
    tags.innerHTML = ['Artifacts', 'Protocol', 'Environment', 'Blinding', 'Rerun']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `{
  "study": "${card.id}",
  "replication_score": ${card.health},
  "pi": "${card.owner}",
  "protocol": "v2.4"
}`;
  }
}
