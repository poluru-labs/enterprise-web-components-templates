import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Harness packs, capacity gates, and notifications for Summit Platform Lab.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default harness"></eds-select>
            <eds-switch label="Block capacity review on red regressions" checked></eds-switch>
            <eds-switch label="Require baseline recheck on deploy" checked></eds-switch>
            <eds-slider label="Minimum SLO score" min="70" max="100" value="90" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #platform-perf" checked></eds-checkbox>
            <eds-checkbox label="Email — workload owners" checked></eds-checkbox>
            <eds-checkbox label="Daily digest to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Regression alerts" name="sev-filter" value="amber">
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
        <eds-file-upload label="Import harness pack" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Harness v3 — standard', value: 'v3' },
      { label: 'Harness v3 — peak extended', value: 'v3peak' },
      { label: 'Smoke — 12 scenarios', value: 'smoke' },
    ];
    profile.value = 'v3';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer gau_live_****" \\
  https://api.summit.example/v1/workloads?cycle=14`;
  }
}
