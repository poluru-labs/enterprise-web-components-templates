import { workspace, workspaceName } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace',
      lead: 'Helix Markets catalog preferences for this browser.',
    })}
    ${sheet({
      title: 'Catalog',
      body: `<div class="stack settings-form">
        <eds-input id="ws-name" label="Workspace name" value="${workspaceName}"></eds-input>
        <eds-select id="ws-zone" label="Timezone"></eds-select>
        <eds-date-picker id="ws-freeze" label="Next catalog freeze" value="2026-09-16"></eds-date-picker>
        <eds-date-range-picker id="ws-review" label="Stewardship window" start-value="2026-09-16" end-value="2026-09-22"></eds-date-range-picker>
        <eds-time-picker id="ws-time" label="Freeze time" value="16:00"></eds-time-picker>
        <eds-number-input id="ws-sla" label="Access SLA (days)" value="2" min="1" max="10"></eds-number-input>
        <eds-slider id="ws-cert" label="Certified gold target" min="50" max="100" value="80" show-value></eds-slider>
        <eds-switch id="ws-mail" label="Email the CDO on failing critical rules" checked></eds-switch>
        <eds-button-group>
          <eds-button id="save-settings" variant="primary" icon="save">Save</eds-button>
          <eds-button id="density-comfy" variant="secondary">Comfortable</eds-button>
          <eds-button id="density-compact" variant="tertiary">Compact</eds-button>
        </eds-button-group>
        <p class="muted" id="settings-status">${workspace.period} · ${workspace.timezone}</p>
      </div>`,
    })}
  `;
}

export function hydrateSettings(root) {
  const zone = root.querySelector('#ws-zone');
  if (zone) {
    zone.options = [
      { label: 'America / Chicago', value: 'chicago' },
      { label: 'America / New York', value: 'ny' },
      { label: 'Europe / London', value: 'london' },
    ];
    zone.value = 'chicago';
  }
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    const status = root.querySelector('#settings-status');
    if (status) status.textContent = 'Preferences saved in this browser.';
  });
  root.querySelector('#density-comfy')?.addEventListener('eds-click', () => document.documentElement.style.setProperty('--eds-space-4', '1rem'));
  root.querySelector('#density-compact')?.addEventListener('eds-click', () => document.documentElement.style.setProperty('--eds-space-4', '0.7rem'));
}
