import { assets, columnsByAsset, qualityRules, apiSnippet } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderAsset(route) {
  const asset = assets.find((item) => item.id === route.id) || assets[0];
  const columns = columnsByAsset[asset.id] || columnsByAsset.ast_accounts;
  const rules = qualityRules.filter((item) => item.asset === asset.name);
  return `
    ${pageHeader({
      eyebrow: asset.domain,
      title: asset.name,
      lead: asset.purpose,
      actions: `
        <eds-button variant="secondary" icon="lock" id="request-this">Request access</eds-button>
        <eds-button variant="primary" icon="star" id="certify-this">Certify</eds-button>
      `,
    })}
    <eds-alert variant="${asset.status === 'Failing' ? 'danger' : 'success'}" title="${asset.status}" message="${asset.owner} is the named owner. Steward ${asset.steward}."></eds-alert>
    <div class="triple mt-4">
      ${sheet({ title: 'Quality', body: `<eds-circular-progress value="${asset.quality}" max="100" show-value></eds-circular-progress><p class="muted mt-4">${asset.quality}% of published rules passing.</p>` })}
      ${sheet({ title: 'Freshness', body: `<eds-meter value="${asset.sla === 'On time' ? 96 : 68}" min="0" max="100" low="70" high="90" optimum="95" label="SLA" show-value></eds-meter><p class="muted mt-4">Last load ${asset.freshness} ago · ${asset.sla}.</p>` })}
      ${sheet({ title: 'Coverage', body: `<eds-stat value="${asset.classified}" label="Classified columns" hint="${asset.rows} rows"></eds-stat><div class="tag-row mt-4">${statusChip(asset.status)}<eds-tag label="${asset.type}"></eds-tag><eds-tag label="${asset.system}" variant="neutral"></eds-tag></div>` })}
    </div>
    <eds-tabs>
      <eds-tab label="Columns" active>
        ${sheet({
          title: 'Column register',
          body: `<eds-description-list id="asset-meta" columns="3" compact></eds-description-list>
            <eds-divider label="columns"></eds-divider>
            <eds-data-table id="column-table" sortable></eds-data-table>`,
        })}
      </eds-tab>
      <eds-tab label="Rules">
        ${sheet({
          title: 'Published rules',
          body: '<eds-data-table id="asset-rules" sortable></eds-data-table>',
        })}
      </eds-tab>
      <eds-tab label="Contract">
        ${sheet({
          title: 'Catalog contract',
          body: '<eds-code-snippet id="asset-code" language="json" label="GET asset"></eds-code-snippet>',
        })}
      </eds-tab>
    </eds-tabs>
  `;
}

export function hydrateAsset(root, route) {
  const asset = assets.find((item) => item.id === route.id) || assets[0];
  const meta = root.querySelector('#asset-meta');
  if (meta) {
    meta.items = [
      { term: 'Owner', description: asset.owner },
      { term: 'Steward', description: asset.steward },
      { term: 'System', description: asset.system },
      { term: 'Domain', description: asset.domain },
      { term: 'Rows', description: asset.rows },
      { term: 'Updated', description: asset.updated },
    ];
  }
  const columns = columnsByAsset[asset.id] || columnsByAsset.ast_accounts;
  const table = root.querySelector('#column-table');
  if (table) {
    table.columns = [
      { key: 'name', label: 'Column', sortable: true },
      { key: 'type', label: 'Type' },
      { key: 'classif', label: 'Classification' },
      { key: 'rule', label: 'Rule' },
      { key: 'status', label: 'Status' },
    ];
    table.rows = columns;
  }
  const ruleTable = root.querySelector('#asset-rules');
  if (ruleTable) {
    ruleTable.columns = [
      { key: 'name', label: 'Rule' },
      { key: 'score', label: 'Score' },
      { key: 'status', label: 'Status' },
      { key: 'owner', label: 'Owner' },
    ];
    const rules = qualityRules.filter((item) => item.asset === asset.name);
    ruleTable.rows = rules.length ? rules : qualityRules.slice(0, 3);
  }
  const snippet = root.querySelector('#asset-code');
  if (snippet) {
    snippet.code = apiSnippet
      .replaceAll('ast_accounts', asset.id)
      .replace('core.customer.accounts', asset.name)
      .replace('Priya Poluru', asset.owner);
  }
  root.querySelector('#request-this')?.addEventListener('eds-click', () => document.querySelector('#access-modal')?.show());
  root.querySelector('#certify-this')?.addEventListener('eds-click', () => document.querySelector('#certify-modal')?.show());
}
