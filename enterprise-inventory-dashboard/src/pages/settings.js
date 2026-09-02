import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Preferences for Poluru Supply Co. Changes apply to this workspace only.',
    })}
    <section class="row g-3 stretch">
      <div class="col-lg-7">
        ${sheet({
          title: 'General',
          body: `
            <div class="stack">
              <eds-input label="Workspace name" value="Poluru Supply Co." icon="folder"></eds-input>
              <eds-select id="settings-timezone" label="Timezone"></eds-select>
              <eds-switch label="Low-stock email alerts" checked></eds-switch>
              <eds-switch label="Weekly stock snapshot"></eds-switch>
              <eds-slider id="settings-buffer" label="Peak-season buffer" min="0" max="100" value="20" show-value></eds-slider>
            </div>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Security',
          body: `
            <div class="stack">
              <eds-pin-input id="settings-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
              <eds-radio-group id="settings-role" label="Default role" name="settings-role" value="ops">
                <eds-radio value="ops" label="Operations"></eds-radio>
                <eds-radio value="viewer" label="Viewer"></eds-radio>
              </eds-radio-group>
              <eds-button id="save-settings" variant="primary">Save changes</eds-button>
            </div>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateSettings(root) {
  const timezone = root.querySelector('#settings-timezone');
  if (timezone) {
    timezone.options = [
      { label: 'America / Chicago', value: 'chicago' },
      { label: 'America / Denver', value: 'denver' },
      { label: 'America / Los Angeles', value: 'la' },
    ];
    timezone.value = 'chicago';
  }
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Workspace settings saved', variant: 'success' });
  });
}
