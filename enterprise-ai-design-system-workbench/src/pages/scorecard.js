import { metricColumns, metricRows, scorecards } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderScorecard(route) {
  const card = scorecards.find((item) => item.id === route.id) ?? scorecards[0];
  return `
    ${pageHeader({
      eyebrow: 'Component',
      title: card.name,
      lead: `${card.focus} · stewarded by ${card.owner}`,
      actions: `
        <eds-button variant="secondary" icon="download">Download spec</eds-button>
        <eds-button variant="primary" icon="external-link">Open in Storybook</eds-button>
      `,
    })}
    <div class="detail-hero">
      <content-card>
        <div slot="header" class="section-title">
          <h2>Documentation score</h2>
          ${statusChip(card.status)}
        </div>
        <eds-progress-bar value="${card.health}" max="100" label="Doc completeness" show-value></eds-progress-bar>
        <p class="muted mb-2">${card.kpis} variants · Updated ${card.updated}</p>
        <eds-meter value="${card.health}" min="0" max="100" label="Readiness"></eds-meter>
      </content-card>
      <content-card>
        <div slot="header" class="section-title"><h2>Steward</h2></div>
        <div class="inline-actions">
          <eds-avatar name="${card.owner}" size="md"></eds-avatar>
          <div>
            <strong>${card.owner}</strong>
            <p class="muted mb-0">Component owner</p>
          </div>
        </div>
        <eds-divider label="Tags"></eds-divider>
        <div class="inline-actions" id="audit-tags"></div>
      </content-card>
    </div>
    ${sheet({
      title: 'Metrics',
      body: '<eds-data-table id="audit-metrics" zebra></eds-data-table>',
    })}
    ${sheet({
      title: 'Usage',
      body: `
        <eds-tabs id="audit-tabs">
          <eds-tab label="Install">
            <eds-code-snippet id="audit-snippet" language="bash"></eds-code-snippet>
          </eds-tab>
          <eds-tab label="Anatomy">
            <eds-accordion>
              <eds-accordion-item heading="Slots" open>
                Document default, header, footer, and media slots for this component.
              </eds-accordion-item>
              <eds-accordion-item heading="States">
                Default, hover, focus, disabled, and loading variants.
              </eds-accordion-item>
            </eds-accordion>
          </eds-tab>
          <eds-tab label="Tokens">
            <p class="muted">Maps to semantic color, spacing, and motion tokens from the foundation set.</p>
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
    tags.innerHTML = ['Stable', 'Forms', 'Keyboard', 'Themeable', 'Docs']
      .map((label) => `<eds-tag label="${label}" variant="brand"></eds-tag>`)
      .join('');
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) {
    snippet.code = `npm install @poluru-labs/enterprise-design-system-wc

import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';`;
  }
}
