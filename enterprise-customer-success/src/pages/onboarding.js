import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { onboarding } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderOnboarding() {
  return `
    ${pageHeader({
      eyebrow: 'First 60 days',
      title: 'Onboarding',
      lead: 'Alder is in training. Northline is blocked on SSO. Fieldwork and Rivermark already hit first value.',
      actions: `<eds-button id="onboard-play" variant="primary" icon="plus">New kickoff</eds-button>`,
    })}
    <div class="card-grid cols-2">
      ${onboarding
        .map(
          (item) => `
        <content-card href="#/account/${item.accountId}">
          <div slot="header" class="section-title">
            <h2>${item.account}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.csm} · ${item.milestone} · target ${item.target}</p>
          <eds-stepper id="ob-steps-${item.id}"></eds-stepper>
          <eds-progress-bar class="mt-3" value="${item.progress}" max="100" label="${item.progress}%" show-value></eds-progress-bar>
          <div class="milestone-track">
            ${item.steps
              .map(
                (step, index) => `
              <span>
                <strong>${step}</strong>
                <em>${index < item.current ? 'Done' : index === item.current ? 'Now' : 'Next'}</em>
              </span>`,
              )
              .join('')}
          </div>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-3 stretch">
      <div class="col-lg-7">
        ${sheet({
          title: 'Blockers',
          body: `
            <eds-list id="block-list" divided></eds-list>
            <eds-checkbox class="mt-3" label="Page Dev Poluru when SSO slips two days" checked></eds-checkbox>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Kickoff',
          body: `
            <eds-date-picker id="kick-day" label="Start"></eds-date-picker>
            <eds-time-picker class="mt-3" id="kick-time" label="Kickoff call"></eds-time-picker>
            <eds-select class="mt-3" id="kick-csm" label="Onboarding lead"></eds-select>
            <eds-button class="mt-3" id="save-kick" variant="primary">Schedule</eds-button>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateOnboarding(root) {
  onboarding.forEach((item) => {
    const stepper = root.querySelector(`#ob-steps-${item.id}`);
    if (stepper) {
      stepper.steps = item.steps.map((label) => ({ label }));
      stepper.current = item.current;
    }
  });
  const blocks = root.querySelector('#block-list');
  if (blocks) {
    blocks.items = [
      { label: 'Northline SSO', description: 'Elena Poluru · IdP wait since 2 Sep', icon: 'alert-triangle', href: '#/account/ac_north' },
      { label: 'Alder training seats', description: 'Elena Poluru · 22 Sep session', icon: 'clock', href: '#/account/ac_alder' },
      { label: 'Fieldwork first value', description: 'Closed 4 Sep', icon: 'check', href: '#/account/ac_field' },
    ];
  }
  const csm = root.querySelector('#kick-csm');
  if (csm) {
    csm.options = [
      { label: 'Elena Poluru', value: 'Elena Poluru' },
      { label: 'Hana Poluru', value: 'Hana Poluru' },
      { label: 'Luca Poluru', value: 'Luca Poluru' },
    ];
    csm.value = 'Elena Poluru';
  }
  root.querySelector('#onboard-play')?.addEventListener('eds-click', () => document.querySelector('#play-modal')?.show());
  root.querySelector('#save-kick')?.addEventListener('eds-click', () => {
    showToast({ message: 'Kickoff held on the calendar', variant: 'success' });
  });
  blocks?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
  });
}
