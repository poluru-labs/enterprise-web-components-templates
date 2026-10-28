import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Rubrics, SLA targets, and notifications for Summit Review Board.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default rubric"></eds-select>
            <eds-switch label="Block cycle sign-off on red escalations" checked></eds-switch>
            <eds-switch label="Require double-blind sample" checked></eds-switch>
            <eds-slider label="Minimum agreement" min="80" max="100" value="92" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #review-ops" checked></eds-checkbox>
            <eds-checkbox label="Email — queue leads" checked></eds-checkbox>
            <eds-checkbox label="Daily digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Escalation alerts" name="sev-filter" value="amber">
              <eds-radio value="green" label="All severities"></eds-radio>
              <eds-radio value="amber" label="Review and critical"></eds-radio>
              <eds-radio value="red" label="Critical only"></eds-radio>
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
        <eds-file-upload label="Import rubric pack" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Rubric v3.1 — standard', value: 'v31' },
      { label: 'Rubric v3.1 — appeals', value: 'v31app' },
      { label: 'Pilot — shortened', value: 'pilot' },
    ];
    profile.value = 'v31';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer pnl_live_****" \\
  https://api.summit.example/v1/review-ops?cycle=14`;
  }
}
