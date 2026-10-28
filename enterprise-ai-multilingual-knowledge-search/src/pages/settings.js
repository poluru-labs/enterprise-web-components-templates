import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Query suites, quality gates, and notifications for Horizon Global.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default query suite"></eds-select>
            <eds-switch label="Block locale launch on red gaps" checked></eds-switch>
            <eds-switch label="Require glossary sign-off" checked></eds-switch>
            <eds-slider label="Minimum precision@5" min="70" max="100" value="90" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #global-search" checked></eds-checkbox>
            <eds-checkbox label="Email — locale owners" checked></eds-checkbox>
            <eds-checkbox label="Weekly digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Gap alerts" name="sev-filter" value="amber">
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
        <eds-file-upload label="Import glossary pack" accept=".json,.csv,.tmx"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Wave 9 — standard', value: 'w9' },
      { label: 'Wave 9 — expanded RTL', value: 'w9rtl' },
      { label: 'Smoke — 80 queries', value: 'smoke' },
    ];
    profile.value = 'w9';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer lex_live_****" \\
  https://api.horizon.example/v1/search-quality?wave=9`;
  }
}
