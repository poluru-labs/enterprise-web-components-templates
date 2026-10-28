import { apiSnippet, metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Project',
      title: card.name,
      lead: `${card.focus} · maintainer ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Impact report</eds-button>
        <eds-button variant="primary" icon="settings">Catalog profile</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Impact score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Project impact score" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis.toLocaleString()} contributions · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Board readout readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Maintainer</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Primary maintainer</p>
          </div>
        </div>
        <eds-divider label="Policy"></eds-divider>
        <div class="inline-actions" id="audit-tags"></div>
      </content-card>
    </div>
    ${sheet({
      title: 'Program metrics',
      body: '<eds-data-table id="audit-metrics" zebra></eds-data-table>',
    })}
    ${sheet({
      title: 'Evidence',
      body: `
        <eds-tabs id="audit-tabs">
          <eds-tab label="Summary">
            <eds-code-snippet id="audit-snippet" language="json"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="License">
            <eds-accordion>
              <eds-accordion-item heading="Allowlist" open>
                SPDX identifiers, category, and legal review status.
              </eds-accordion-item>
              <eds-accordion-item heading="Upstream">
                Fork point, release cadence, and security advisory feed.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Community">
            <p class="muted">Contributor list, office hours, and downstream adopter repos.</p>
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
    tags.innerHTML = ['SPDX', 'Export', 'Contributions', 'Adopters', 'Scan']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = apiSnippet;
  }
}
