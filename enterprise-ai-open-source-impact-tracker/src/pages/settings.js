import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Catalog packs, board gates, and notifications for Harbor Commons Program.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default catalog"></eds-select>
            <eds-switch label="Block board readout on red exceptions" checked></eds-switch>
            <eds-switch label="Require legal sign-off on new licenses" checked></eds-switch>
            <eds-slider label="Minimum impact score" min="70" max="100" value="85" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #harbor-commons" checked></eds-checkbox>
            <eds-checkbox label="Email — project maintainers" checked></eds-checkbox>
            <eds-checkbox label="Weekly digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Exception alerts" name="sev-filter" value="amber">
              <eds-radio value="green" label="All severities"></eds-radio>
              <eds-radio value="amber" label="Review and blocking"></eds-radio>
              <eds-radio value="red" label="Blocking only"></eds-radio>
            </eds-radio-group>
            <eds-button variant="primary">Save preferences</eds-button>
          </div>
        `,
      })}
    </div>
    ${sheet({
      title: 'API',
      body: `
        <eds-code-snippet id="settings-snippet" language="bash"></eds-code-snippet>
        <eds-file-upload label="Import catalog pack" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Catalog v2 — standard', value: 'v2' },
      { label: 'Catalog v2 — export extended', value: 'v2exp' },
      { label: 'Smoke — 24 rules', value: 'smoke' },
    ];
    profile.value = 'v2';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer bcn_live_****" \\
  https://api.harbor.example/v1/projects?quarter=4`;
  }
}
