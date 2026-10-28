import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Evaluation windows, gate thresholds, and notifications for Meridian Analytics.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Gates',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default profile"></eds-select>
            <eds-switch label="Block promotion on red findings" checked></eds-switch>
            <eds-switch label="Require shadow run before prod" checked></eds-switch>
            <eds-slider label="Minimum portfolio pass rate" min="85" max="100" value="92" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #model-eval" checked></eds-checkbox>
            <eds-checkbox label="Email — model owners" checked></eds-checkbox>
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
        <eds-file-upload label="Import gate profile" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'Standard — classification', value: 'cls' },
      { label: 'Ranking — NDCG / MAP', value: 'rank' },
      { label: 'Forecast — MAPE / WAPE', value: 'fcst' },
    ];
    profile.value = 'cls';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer gge_live_****" \\
  https://api.meridian.example/v1/evaluations?window=4`;
  }
}
