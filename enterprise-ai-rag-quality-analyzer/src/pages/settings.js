import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Query suites, quality gates, and notifications for Atlas Knowledge.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default suite"></eds-select>
            <eds-switch label="Block index promotion on red issues" checked></eds-switch>
            <eds-switch label="Require citation audit sample" checked></eds-switch>
            <eds-slider label="Minimum recall@5" min="70" max="100" value="85" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #retrieval-quality" checked></eds-checkbox>
            <eds-checkbox label="Email — collection owners" checked></eds-checkbox>
            <eds-checkbox label="Daily digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Issue alerts" name="sev-filter" value="amber">
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
        <eds-file-upload label="Import query suite" accept=".json,.csv"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Suite v3 — standard', value: 'v3' },
      { label: 'Suite v3.1 — expanded', value: 'v31' },
      { label: 'Smoke — 50 queries', value: 'smoke' },
    ];
    profile.value = 'v3';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer anc_live_****" \\
  https://api.atlas.example/v1/quality?cycle=12`;
  }
}
