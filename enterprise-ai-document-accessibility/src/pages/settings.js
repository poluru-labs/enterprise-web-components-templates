import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Settings',
      title: 'Workspace preferences',
      lead: 'Validation profiles, CMS hooks, and notifications for Summit Publishing.',
    })}
    <div class="split-grid">
      ${sheet({
        title: 'Validation',
        body: `
          <div class="stack">
            <eds-input label="Workspace name" value="${workspace.name}" icon="settings"></eds-input>
            <eds-select id="profile-level" label="Default profile"></eds-select>
            <eds-switch label="Block CMS publish on critical issue" checked></eds-switch>
            <eds-switch label="Require manual sign-off for VPAT"></eds-switch>
            <eds-slider label="Minimum document score" min="70" max="100" value="90" show-value></eds-slider>
          </div>
        `,
      })}
      ${sheet({
        title: 'Notifications',
        body: `
          <div class="stack">
            <eds-checkbox label="Slack — #doc-accessibility" checked></eds-checkbox>
            <eds-checkbox label="Email — document owners" checked></eds-checkbox>
            <eds-checkbox label="Weekly summary to Mira Poluru"></eds-checkbox>
            <eds-radio-group label="Issue alerts" name="sev-filter" value="amber">
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
      title: 'API',
      body: `
        <eds-code-snippet id="settings-snippet" language="bash"></eds-code-snippet>
        <eds-file-upload label="Import validation profile" accept=".json,.yaml"></eds-file-upload>
      `,
    })}
  `;
}

export function hydrateSettings(root) {
  const profile = root.querySelector('#profile-level');
  if (profile) {
    profile.options = [
      { label: 'PDF/UA-1 strict', value: 'pdfua' },
      { label: 'WCAG 2.2 AA (HTML export)', value: 'wcag' },
      { label: 'Section 508 aligned', value: '508' },
    ];
    profile.value = 'pdfua';
  }
  const snippet = root.querySelector('#settings-snippet');
  if (snippet) {
    snippet.code = `curl -H "Authorization: Bearer clr_live_****" \\
  https://api.summit.example/v1/documents?workspace=publishing`;
  }
}
