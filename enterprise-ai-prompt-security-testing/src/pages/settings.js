import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Corpus packs, release gates, and notifications for Harbor Secure QA.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default corpus"></eds-select>
            <eds-switch label="Block release on red findings" checked></eds-switch>
            <eds-switch label="Require regression recheck on merge" checked></eds-switch>
            <eds-slider label="Minimum pass score" min="70" max="100" value="88" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #secure-qa" checked></eds-checkbox>
            <eds-checkbox label="Email — surface owners" checked></eds-checkbox>
            <eds-checkbox label="Daily digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Finding alerts" name="sev-filter" value="amber">
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
        <eds-file-upload label="Import corpus pack" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Corpus v5 — standard', value: 'v5' },
      { label: 'Corpus v5 — webhook extended', value: 'v5wh' },
      { label: 'Smoke — 48 probes', value: 'smoke' },
    ];
    profile.value = 'v5';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer sel_live_****" \\
  https://api.harbor.example/v1/surfaces?sprint=22`;
  }
}
