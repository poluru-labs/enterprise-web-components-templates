import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import { workspace } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Fieldline Press desk defaults, ship hours, and Loom notifications.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${sheet({
          title: 'Desk profile',
          body: `
            <eds-input label="Workspace" value="${workspace.name}" icon="folder"></eds-input>
            <eds-input class="mt-3" label="Timezone" value="${workspace.timezone}"></eds-input>
            <eds-number-input class="mt-3" id="set-slot" label="Home slot (hour, CT)" value="6" min="0" max="23"></eds-number-input>
            <eds-slider class="mt-3" id="set-words" label="Copy target (words)" min="400" max="3000" step="20" value="1800" show-value></eds-slider>
            <eds-switch class="mt-3" label="Legal digest to Maya Poluru" checked></eds-switch>
            <eds-switch class="mt-3" label="Locale digest to Nikhil Poluru" checked></eds-switch>
            <eds-checkbox class="mt-3" label="Hold ransomware files for counsel" checked></eds-checkbox>`,
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
            <eds-combobox id="default-desk" label="Default desk" placeholder="News"></eds-combobox>
            <eds-autocomplete class="mt-3" id="owner-suggest" label="Default owner" placeholder="Kavya Poluru"></eds-autocomplete>
            <eds-rating class="mt-3" id="desk-score" label="Desk health" value="4"></eds-rating>
            <p class="muted mt-3 mb-1">Open command palette</p>
            <eds-kbd keys="⌘K"></eds-kbd>
            <div class="mt-3">
              <eds-button id="save-settings" variant="primary" icon="save">Save</eds-button>
            </div>`,
        })}
      </div>
    </div>
  `;
}

export function hydrateSettings(root) {
  const defaultDesk = root.querySelector('#default-desk');
  if (defaultDesk) {
    defaultDesk.options = [
      { label: 'News', value: 'news' },
      { label: 'Features', value: 'features' },
      { label: 'Photo', value: 'photo' },
      { label: 'Locales', value: 'locales' },
    ];
    defaultDesk.value = 'news';
  }
  const owner = root.querySelector('#owner-suggest');
  if (owner) {
    owner.suggestions = ['Kavya Poluru', 'Arjun Poluru', 'Leela Poluru', 'Asha Poluru', 'Nikhil Poluru'];
    owner.value = 'Kavya Poluru';
  }
  root.querySelector('#density')?.addEventListener('eds-change', (event) => {
    const value = event.detail?.value ?? 'comfortable';
    setDensity(value);
    showToast({ message: `Density set to ${value}`, variant: 'info' });
  });
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Fieldline settings saved', variant: 'success' });
  });
}
