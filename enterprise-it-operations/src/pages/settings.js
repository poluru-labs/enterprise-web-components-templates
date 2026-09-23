import { setDensity } from '@poluru-labs/enterprise-design-system-wc';
import { workspace, workspaceName } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Northline Systems preferences for this browser.',
    })}
    ${sheet({
      title: 'Operations desk',
      body: `<div class="stack settings-form">
        <eds-input id="ws-name" label="Workspace name" value="${workspaceName}"></eds-input>
        <eds-select id="ws-zone" label="Timezone"></eds-select>
        <eds-date-picker id="ws-cab" label="Next CAB lock" value="2026-09-16"></eds-date-picker>
        <eds-date-range-picker id="ws-week" label="Ops week" start-value="2026-09-14" end-value="2026-09-20"></eds-date-range-picker>
        <eds-time-picker id="ws-time" label="CAB time" value="16:00"></eds-time-picker>
        <eds-number-input id="ws-sla" label="P1 restore (minutes)" value="60" min="15" max="240"></eds-number-input>
        <eds-slider id="ws-slo" label="Composite SLO target" min="90" max="100" step="1" value="99" show-value></eds-slider>
        <eds-switch id="ws-mail" label="Email Mira Poluru on every P1" checked></eds-switch>
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
  root.querySelector('#density-comfy')?.addEventListener('eds-click', () => setDensity('comfortable'));
  root.querySelector('#density-compact')?.addEventListener('eds-click', () => setDensity('compact'));
}
