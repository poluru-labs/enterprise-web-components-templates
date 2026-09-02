import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Poluru People defaults, density, and Alder notification preferences.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Workspace profile',
          body: `
            <eds-input label="Workspace" value="${workspace.name}" icon="folder"></eds-input>
            <eds-input class="mt-3" label="Timezone" value="${workspace.timezone}"></eds-input>
            <eds-select id="set-region" label="Primary region"></eds-select>
            <eds-switch class="mt-3" label="Labor Day office close reminder" checked></eds-switch>
            <eds-switch class="mt-3" label="Weekly leave digest" checked></eds-switch>`,
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
            <eds-combobox id="default-dept" label="Default department" placeholder="People"></eds-combobox>
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
  const region = root.querySelector('#set-region');
  if (region) {
    region.options = [
      { label: 'Americas', value: 'americas' },
      { label: 'EMEA', value: 'emea' },
      { label: 'APAC', value: 'apac' },
    ];
    region.value = 'americas';
  }
  const defaultDept = root.querySelector('#default-dept');
  if (defaultDept) {
    defaultDept.options = [
      { label: 'People', value: 'People' },
      { label: 'Engineering', value: 'Engineering' },
      { label: 'Product', value: 'Product' },
    ];
    defaultDept.value = 'People';
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
