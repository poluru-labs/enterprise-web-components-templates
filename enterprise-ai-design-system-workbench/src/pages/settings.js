import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workbench preferences',
      lead: 'Publishing rules, Figma sync, and notification defaults for Polaris Guild.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Publishing',
        body: `
          <div class="stack">
            <eds-input label="Guild name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="gate-level" label="Release channel"></eds-select>
            <eds-switch label="Require token council for breaking changes" checked></eds-switch>
            <eds-switch label="Sync Figma on tag publish" checked></eds-switch>
            <eds-slider label="Min doc score to ship" min="80" max="100" value="92" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #design-system" checked></eds-checkbox>
            <eds-checkbox label="Email — component stewards" checked></eds-checkbox>
            <eds-checkbox label="Weekly digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Change alerts" name="sev-filter" value="amber">
              <eds-radio value="green" label="All requests"></eds-radio>
              <eds-radio value="amber" label="Review and blocking"></eds-radio>
              <eds-radio value="red" label="Blocking only"></eds-radio>
            </eds-radio-group>
            <eds-button variant="primary">Save preferences</eds-button>
          </div>
        `,
      })}
    </div>
    ${sheet({
      title: 'Package registry',
      body: `
        <eds-code-snippet id="settings-snippet" language="bash"></eds-code-snippet>
        <eds-file-upload label="Import token bundle" accept=".json,.css"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const gate = root.querySelector('#gate-level');
  if (gate) {
    gate.options = [
      { label: 'Stable — npm latest', value: 'stable' },
      { label: 'Beta — @next tag', value: 'beta' },
      { label: 'Internal — GitHub packages', value: 'internal' },
    ];
    gate.value = 'stable';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `npm view @poluru-labs/enterprise-design-system-wc version
npm install @poluru-labs/enterprise-design-system-wc@latest`;
  }
}
