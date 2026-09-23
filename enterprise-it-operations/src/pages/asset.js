import { apiSnippet, assets } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderAsset(route) {
  const asset = assets.find((item) => item.id === route.id) || assets[0];
  return `
    ${pageHeader({
      eyebrow: `${asset.site} · ${asset.env}`,
      title: asset.name,
      lead: asset.purpose,
      actions: `
        <eds-button variant="secondary" icon="alert-triangle" id="raise-on-ci">Raise incident</eds-button>
        <eds-button variant="primary" icon="edit" id="change-on-ci">Submit change</eds-button>
      `,
    })}
    <eds-alert variant="${asset.status === 'Degraded' ? 'warning' : asset.status === 'Healthy' ? 'success' : 'info'}" title="${asset.status}" message="${asset.owner} owns this CI. Last inventory ${asset.updated}."></eds-alert>
    <div class="triple mt-4">
      ${sheet({ title: 'Health', body: `<eds-circular-progress value="${asset.health}" max="100" show-value></eds-circular-progress><p class="muted mt-4">${asset.health}% composite from CPU, disk, and probe checks.</p>` })}
      ${sheet({ title: 'Capacity', body: `<eds-meter value="${asset.health}" min="0" max="100" low="70" high="90" optimum="95" label="Headroom" show-value></eds-meter><p class="muted mt-4">${asset.ip} · ${asset.os}</p>` })}
      ${sheet({ title: 'Class', body: `<eds-stat value="${asset.type}" label="${asset.class}" hint="${asset.env}"></eds-stat><div class="tag-row mt-4">${statusChip(asset.status)}<eds-tag label="${asset.site}"></eds-tag><eds-tag label="${asset.env}" variant="neutral"></eds-tag></div>` })}
    </div>
    <eds-tabs>
      <eds-tab label="Record" active>
        ${sheet({
          title: 'CMDB record',
          body: `<eds-description-list id="asset-meta" columns="3" compact></eds-description-list>
            <eds-divider label="contract"></eds-divider>
            <eds-code-snippet id="asset-code" language="json" label="GET CI"></eds-code-snippet>`,
        })}
      </eds-tab>
      <eds-tab label="Related">
        ${sheet({
          title: 'Open work',
          body: `<eds-list id="asset-related" divided></eds-list>
            <eds-accordion class="mt-4">
              <eds-accordion-item heading="Runbook">
                <p>Page ${asset.owner}. Check probe history, then fail over if restore SLA is inside 30 minutes.</p>
              </eds-accordion-item>
              <eds-accordion-item heading="Dependencies">
                <p>Identity depends on this broker. Payments and HRIS use the same token path.</p>
              </eds-accordion-item>
            </eds-accordion>`,
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
      { term: 'Site', description: asset.site },
      { term: 'Environment', description: asset.env },
      { term: 'Type', description: asset.type },
      { term: 'Address', description: asset.ip },
      { term: 'Updated', description: asset.updated },
    ];
  }
  const related = root.querySelector('#asset-related');
  if (related) {
    related.items = [
      { label: 'INC-10482', description: 'SSO broker timeouts', icon: 'alert-triangle', href: '#/incident/INC-10482' },
      { label: 'CHG-2201', description: 'Dallas ledger expansion', icon: 'edit', href: '#/change/CHG-2201' },
    ];
  }
  const snippet = root.querySelector('#asset-code');
  if (snippet) {
    snippet.code = apiSnippet
      .replaceAll('ci_sso', asset.id)
      .replace('id-sso-prod-01', asset.name)
      .replace('72', String(asset.health))
      .replace('Elena Poluru', asset.owner);
  }
  root.querySelector('#raise-on-ci')?.addEventListener('eds-click', () => document.querySelector('#raise-modal')?.show());
  root.querySelector('#change-on-ci')?.addEventListener('eds-click', () => document.querySelector('#change-modal')?.show());
}
