import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'SLO targets, paging rules, and notifications for Summit Platform.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'SLOs',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default tier"></eds-select>
            <eds-switch label="Block deploy on red SLO" checked></eds-switch>
            <eds-switch label="Require trace completeness sample" checked></eds-switch>
            <eds-slider label="Minimum run success" min="95" max="100" value="99" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #platform-reliability" checked></eds-checkbox>
            <eds-checkbox label="Pager — service owners" checked></eds-checkbox>
            <eds-checkbox label="Daily digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Incident alerts" name="sev-filter" value="amber">
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
        <eds-file-upload label="Import SLO pack" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Tier 1 — customer facing', value: 't1' },
      { label: 'Tier 2 — internal', value: 't2' },
      { label: 'Tier 3 — batch', value: 't3' },
    ];
    profile.value = 't1';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer rly_live_****" \\
  https://api.summit.example/v1/observability?week=43`;
  }
}
