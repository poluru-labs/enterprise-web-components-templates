import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Poluru Yards defaults, shop hours, and Orbit notifications.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Yard profile',
          body: `
            <eds-input label="Workspace" value="${workspace.name}" icon="folder"></eds-input>
            <eds-input class="mt-3" label="Timezone" value="${workspace.timezone}"></eds-input>
            <eds-number-input class="mt-3" id="set-fuel" label="Fuel exception (gallons)" value="50" min="10"></eds-number-input>
            <eds-switch class="mt-3" label="DOT due reminders to Ishaan Poluru" checked></eds-switch>
            <eds-switch class="mt-3" label="Shop digest to Subra Poluru" checked></eds-switch>`,
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
            <eds-combobox id="default-yard" label="Default yard" placeholder="Austin"></eds-combobox>
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
  const defaultYard = root.querySelector('#default-yard');
  if (defaultYard) {
    defaultYard.options = [
      { label: 'Austin', value: 'Austin' },
      { label: 'Dallas', value: 'Dallas' },
    ];
    defaultYard.value = 'Austin';
  }
  root.querySelector('#density')?.addEventListener('eds-change', (event) => {
    const value = event.detail?.value ?? 'comfortable';
    setDensity(value);
    showToast({ message: `Density set to ${value}`, variant: 'info' });
  });
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Yard settings saved', variant: 'success' });
  });
}
