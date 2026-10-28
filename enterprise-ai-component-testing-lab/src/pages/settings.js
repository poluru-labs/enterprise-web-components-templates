import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Lab preferences',
      lead: 'Run cadence, notification defaults, and quality gates for Nexus UI.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'General',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="gate-level" label="Release gate"></eds-select>
            <eds-switch label="Block merge on P1 failure" checked></eds-switch>
            <eds-switch label="Require visual approval on diff" checked></eds-switch>
            <eds-slider label="Minimum pass rate" min="90" max="100" value="96" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #component-lab" checked></eds-checkbox>
            <eds-checkbox label="Email — component owners" checked></eds-checkbox>
            <eds-checkbox label="Daily summary to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Failure alerts" name="sev-filter" value="amber">
              <eds-radio value="green" label="All severities"></eds-radio>
              <eds-radio value="amber" label="Moderate and above"></eds-radio>
              <eds-radio value="red" label="Critical only"></eds-radio>
            </eds-radio-group>
            <eds-button variant="primary">Save preferences</eds-button>
          </div>
        `,
      })}
    </div>
    ${sheet({
      title: 'CI integration',
      body: `
        <eds-code-snippet id="settings-snippet" language="bash"></eds-code-snippet>
        <eds-file-upload label="Import run configuration" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const gate = root.querySelector('#gate-level');
  if (gate) {
    gate.options = [
      { label: 'Standard — 96% pass, 0 P1', value: 'standard' },
      { label: 'Strict — 98% pass, visual sign-off', value: 'strict' },
      { label: 'Hotfix — 94% pass, manual waiver', value: 'hotfix' },
    ];
    gate.value = 'standard';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer bch_live_****" \\
  https://api.nexus.example/v1/runs?workspace=nexus-ui`;
  }
}
