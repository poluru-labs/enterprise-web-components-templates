import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Poluru Trust compliance defaults, reminder windows, and Aegis notifications.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Workspace profile',
          body: `
            <eds-input label="Workspace" value="${workspace.name}" icon="folder"></eds-input>
            <eds-input class="mt-3" label="Timezone" value="${workspace.timezone}"></eds-input>
            <eds-number-input class="mt-3" id="set-window" label="Evidence freshness (days)" value="90" min="30"></eds-number-input>
            <eds-switch class="mt-3" label="Audit countdown to Subbu Poluru" checked></eds-switch>
            <eds-switch class="mt-3" label="Weekly digest to Priya Poluru" checked></eds-switch>`,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Preferences',
          body: `
            <eds-radio-group id="density" label="Density" name="density" value="comfortable">
              <eds-radio value="comfortable" label="Comfortable"></eds-radio>
              <eds-radio value="compact" label="Compact"></eds-radio>
            </eds-radio-group>
            <eds-combobox id="default-fw" label="Default framework" placeholder="SOC 2"></eds-combobox>
            <p class="muted mt-3 mb-1">Open command palette</p>
            <eds-kbd keys="⌘K"></eds-kbd>
            <div class="mt-3">
              <eds-button id="save-settings" variant="primary" icon="check">Save</eds-button>
            </div>`,
        })}
      </div>
    </div>
  `;
}

export function hydrateSettings(root) {
  const defaultFw = root.querySelector('#default-fw');
  if (defaultFw) {
    defaultFw.options = [
      { label: 'SOC 2', value: 'SOC 2' },
      { label: 'ISO 27001', value: 'ISO 27001' },
      { label: 'GDPR', value: 'GDPR' },
      { label: 'HIPAA', value: 'HIPAA' },
    ];
    defaultFw.value = 'SOC 2';
  }
  root.querySelector('#density')?.addEventListener('eds-change', (event) => {
    const value = event.detail?.value ?? 'comfortable';
    setDensity(value);
    showToast({ message: `Density set to ${value}`, variant: 'info' });
  });
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Workspace settings saved', variant: 'success' });
  });
}
