import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { clinic } from '../data/index.js';
import { formSection, pageHeader } from '../components/widgets.js';

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Configuration',
      title: 'Clinic settings',
      lead: 'Identity, hours, rooms, and how Halo notifies the floor.',
    })}
    <div class="row g-3 halo-equal-row">
      <div class="col-lg-4">
        ${formSection({
          title: 'Practice profile',
          body: `
            <eds-input label="Clinic name" value="${clinic.name}" icon="edit"></eds-input>
            <eds-textarea label="Address" rows="3" value="${clinic.address}"></eds-textarea>
            <eds-input label="Main phone" value="${clinic.phone}"></eds-input>
            <eds-input label="Group NPI" value="${clinic.npi}"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Hours & access',
          body: `
            <eds-input label="Published hours" value="${clinic.hours}"></eds-input>
            <eds-select id="tz" label="Timezone"></eds-select>
            <eds-switch label="Same-day online booking" checked></eds-switch>
            <eds-switch label="Telehealth by default for follow-ups"></eds-switch>
            <eds-input label="Default visit length" value="30 minutes"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Rooms',
          body: `
            <eds-input label="Published rooms" value="8 exam and telehealth rooms"></eds-input>
            <eds-input label="Turnover target" value="8 minutes"></eds-input>
            <eds-switch label="Show occupancy on the shift board" checked></eds-switch>
            <eds-switch label="Hold Exam 2 for same-day overflow" checked></eds-switch>
            <p class="halo-muted mb-0">Exam 2 is in turnover. Telehealth B is a float room.</p>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Floor notifications',
          body: `
            <eds-switch label="Ping MA when a patient checks in" checked></eds-switch>
            <eds-switch label="Flag wait time over 20 minutes" checked></eds-switch>
            <eds-switch label="Critical lab banners on overview" checked></eds-switch>
            <eds-switch label="Evening no-show SMS" checked></eds-switch>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'After hours',
          body: `
            <eds-input label="Saturday clinic" value="8:00–12:00"></eds-input>
            <eds-input label="Answering service" value="After 18:00 weekdays"></eds-input>
            <eds-input label="On-call" value="Dr. Elena Poluru"></eds-input>
            <eds-switch label="Route after-hours portal messages to on-call" checked></eds-switch>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Privacy',
          body: `
            <eds-status variant="success" label="Audit log enabled" pulse></eds-status>
            <eds-switch class="mt-2" label="Break-the-glass for restricted charts" checked></eds-switch>
            <eds-switch label="Auto-timeout after 8 minutes idle" checked></eds-switch>
            <eds-button id="save-settings" variant="primary" icon="save">Save clinic settings</eds-button>
          `,
        })}
      </div>
    </div>
  `;
}

export function hydrate(root) {
  const tz = root.querySelector('#tz');
  if (tz) {
    tz.options = [
      { label: 'America / Chicago', value: 'chicago' },
      { label: 'America / New York', value: 'ny' },
      { label: 'America / Denver', value: 'denver' },
      { label: 'America / Los Angeles', value: 'la' },
    ];
    tz.value = 'chicago';
  }
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Clinic settings saved', variant: 'success' });
  });
}
