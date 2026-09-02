import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { apiKeySnippet, auditColumns, auditLog, workspaceName } from '../data/index.js';
import { filterBar, pageHeader, sheet } from '../components/widgets.js';

export function renderAudit() {
  return `
    ${pageHeader({
      eyebrow: 'Security',
      title: 'Audit log',
      lead: 'Every admin action in Poluru Cloud. Filter by actor or export a pack.',
      actions: `
        <eds-button-group>
          <eds-button id="export-csv" variant="secondary" icon="download">CSV</eds-button>
          <eds-button id="export-json" variant="secondary" icon="file">JSON</eds-button>
        </eds-button-group>
      `,
    })}
    ${filterBar(`
      <eds-autocomplete id="audit-actor" label="Actor" placeholder="Search a Poluru admin"></eds-autocomplete>
      <eds-combobox id="audit-action" label="Action" placeholder="Choose an action"></eds-combobox>
    `)}
    <eds-card padded class="sheet">
      <eds-data-table id="audit-table" sortable striped compact></eds-data-table>
    </eds-card>
    <eds-card class="mt-3 sheet" padded>
      <div slot="header"><h2>Latest event</h2></div>
      <eds-code-snippet id="audit-snippet" language="json" label="Audit payload"></eds-code-snippet>
    </eds-card>
  `;
}

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: workspaceName,
      title: 'Settings',
      lead: 'SSO, API keys, webhooks, and workspace density. Changes apply to every Poluru Cloud tenant.',
      actions: `<eds-button id="save-settings" variant="primary" icon="save">Save</eds-button>`,
    })}
    <section class="row g-3 stretch-grid">
      <div class="col-lg-7">
        <eds-card padded class="sheet">
          <eds-accordion single>
            <eds-accordion-item heading="Workspace" open>
              <div class="stack">
                <eds-input label="Workspace name" value="${workspaceName}" icon="folder"></eds-input>
                <eds-input label="Support email" type="email" value="hello@polurulabs.example" icon="mail"></eds-input>
                <eds-select id="density" label="Density"></eds-select>
                <eds-checkbox label="Show impersonation in the header" checked></eds-checkbox>
              </div>
            </eds-accordion-item>
            <eds-accordion-item heading="SSO and SCIM">
              <div class="stack">
                <eds-switch id="sso-switch" label="Require SSO for staff" checked></eds-switch>
                <eds-switch id="scim-switch" label="SCIM provisioning"></eds-switch>
                <eds-input label="Entity ID" value="https://helio.example/sso" icon="link"></eds-input>
              </div>
            </eds-accordion-item>
            <eds-accordion-item heading="API keys">
              <eds-code-snippet id="key-snippet" language="bash" label="Live secret"></eds-code-snippet>
              <eds-button id="rotate-key" class="mt-3" variant="secondary" icon="refresh">Rotate</eds-button>
            </eds-accordion-item>
            <eds-accordion-item heading="Webhooks">
              <eds-file-upload id="hook-upload" label="Signing certificate" hint="PEM up to 2 MB" accept=".pem,.crt"></eds-file-upload>
            </eds-accordion-item>
          </eds-accordion>
        </eds-card>
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Sensitive actions',
          body: `
            <p class="muted">Confirm with the staff PIN before rotating keys or impersonating an org.</p>
            <eds-pin-input id="staff-pin" length="4" type="number" label="Staff PIN"></eds-pin-input>
            <eds-divider spacing="lg"></eds-divider>
            <eds-number-input id="session-hours" label="Session hours" value="8" min="1" max="24"></eds-number-input>
            <eds-textarea class="mt-3" label="Status page note" rows="3" placeholder="Optional note for customers."></eds-textarea>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateAudit(root) {
  const table = root.querySelector('#audit-table');
  if (table) {
    table.columns = auditColumns;
    table.rows = auditLog;
  }
  const actor = root.querySelector('#audit-actor');
  if (actor) actor.suggestions = [...new Set(auditLog.map((item) => item.actor))];
  const action = root.querySelector('#audit-action');
  if (action) {
    action.options = [
      { label: 'Enabled flag', value: 'flag' },
      { label: 'Invited member', value: 'invite' },
      { label: 'Impersonated org', value: 'impersonate' },
      { label: 'Rotated API key', value: 'key' },
      { label: 'Created org', value: 'org' },
    ];
  }
  const snippet = root.querySelector('#audit-snippet');
  if (snippet) snippet.code = JSON.stringify(auditLog[0], null, 2);
  root.querySelector('#export-csv')?.addEventListener('eds-click', () => {
    showToast({ message: 'Audit CSV ready', variant: 'success' });
  });
  root.querySelector('#export-json')?.addEventListener('eds-click', () => {
    showToast({ message: 'Audit JSON ready', variant: 'success' });
  });
}

export function hydrateSettings(root) {
  const density = root.querySelector('#density');
  if (density) {
    density.options = [
      { label: 'Comfortable', value: 'comfortable' },
      { label: 'Compact', value: 'compact' },
    ];
    density.value = 'comfortable';
  }
  const snippet = root.querySelector('#key-snippet');
  if (snippet) snippet.code = apiKeySnippet;
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Settings saved', variant: 'success' });
  });
  root.querySelector('#rotate-key')?.addEventListener('eds-click', () => {
    showToast({ message: 'Live key rotated', variant: 'warning' });
  });
  root.querySelector('#staff-pin')?.addEventListener('eds-complete', () => {
    showToast({ message: 'PIN confirmed', variant: 'success' });
  });
}
