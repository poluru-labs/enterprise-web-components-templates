import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Scan cadence, notification defaults, and WCAG level for Harbor Digital.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'General',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="wcag-level" label="Default WCAG level"></eds-select>
            <eds-switch label="Email digest on critical issues" checked></eds-switch>
            <eds-switch label="Require manual sign-off before VPAT export"></eds-switch>
            <eds-slider label="Scan depth" min="1" max="5" value="4" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #accessibility" checked></eds-checkbox>
            <eds-checkbox label="Email — squad owners" checked></eds-checkbox>
            <eds-checkbox label="Weekly summary to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Default severity filter" name="sev-filter" value="amber">
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
      title: 'API access',
      body: `
        <eds-code-snippet id="settings-snippet" language="bash"></eds-code-snippet>
        <eds-file-upload label="Import scan configuration" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const level = root.querySelector('#wcag-level');
  if (level) {
    level.options = [
      { label: 'WCAG 2.2 AA', value: '22aa' },
      { label: 'WCAG 2.1 AA', value: '21aa' },
      { label: 'WCAG 2.2 AAA (selected flows)', value: '22aaa' },
    ];
    level.value = '22aa';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer bcn_live_****" \\
  https://api.harbor.example/v1/audits?workspace=harbor-digital`;
  }
}
