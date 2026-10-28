import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Protocol versions, replication gates, and notifications for Harbor Research.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default protocol"></eds-select>
            <eds-switch label="Block sign-off on red gaps" checked></eds-switch>
            <eds-switch label="Require artifact hash audit" checked></eds-switch>
            <eds-slider label="Minimum replication score" min="70" max="100" value="85" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #reproducibility" checked></eds-checkbox>
            <eds-checkbox label="Email — study PIs" checked></eds-checkbox>
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
        <eds-file-upload label="Import protocol pack" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Protocol v2.4 — standard', value: 'v24' },
      { label: 'Protocol v2.3 — legacy', value: 'v23' },
      { label: 'Pilot — abbreviated', value: 'pilot' },
    ];
    profile.value = 'v24';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer lgr_live_****" \\
  https://api.harbor.example/v1/reproducibility?cohort=7`;
  }
}
