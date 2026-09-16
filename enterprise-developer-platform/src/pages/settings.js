import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Forge profile, density, and how Circuit behaves when the sidebar is closed.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Forge profile',
          body: `
            <eds-input label="Workspace" value="${workspace.name}" icon="folder"></eds-input>
            <eds-input class="mt-3" label="Timezone" value="${workspace.timezone}"></eds-input>
            <eds-select id="set-region" label="Home region"></eds-select>
            <eds-slider class="mt-3" id="slo-floor" label="Error budget floor" min="60" max="95" value="70" show-value></eds-slider>
            <eds-switch class="mt-3" label="Start in full width" checked></eds-switch>
            <eds-switch class="mt-3" label="Budget lag ping" checked></eds-switch>`,
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
            <eds-pin-input class="mt-3" id="staff-pin" length="4" type="number" label="Staff PIN"></eds-pin-input>
            <p class="muted mt-3 mb-1">Jump to a service</p>
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
  root.querySelector('#density')?.addEventListener('eds-change', (event) => {
    const value = event.detail?.value ?? 'comfortable';
    setDensity(value);
    showToast({ message: `Density set to ${value}`, variant: 'info' });
  });
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Workspace settings saved', variant: 'success' });
  });
}
