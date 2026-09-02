import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { flags } from '../data/index.js';
import { pageHeader, statusFor } from '../components/widgets.js';

export function renderFlags() {
  return `
    ${pageHeader({
      eyebrow: 'Release',
      title: 'Feature flags',
      lead: 'Percentage rollouts, environment targeting, and kill switches across Poluru Cloud.',
      actions: `<eds-button id="new-flag" variant="primary" icon="plus">New flag</eds-button>`,
    })}
    <div class="flag-grid">
      ${flags
        .map(
          (flag, index) => `
        <eds-card class="sheet flag-card" padded>
          <div slot="header" class="section-title">
            <div>
              <h2>${flag.name}</h2>
              <p class="muted mb-0"><code>${flag.key}</code></p>
            </div>
            <eds-status label="${flag.status}" variant="${statusFor(flag.status)}"></eds-status>
          </div>
          <eds-switch id="flag-switch-${index}" label="${flag.rollout > 0 ? 'Enabled' : 'Disabled'}" ${flag.rollout > 0 ? 'checked' : ''}></eds-switch>
          <eds-slider id="flag-rollout-${index}" class="mt-3" label="Rollout" min="0" max="100" step="1" value="${flag.rollout}" show-value></eds-slider>
          <p class="muted mb-0 mt-2">${flag.owner} · ${flag.env}</p>
        </eds-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateFlags(root) {
  flags.forEach((flag, index) => {
    const toggle = root.querySelector(`#flag-switch-${index}`);
    const slider = root.querySelector(`#flag-rollout-${index}`);
    toggle?.addEventListener('eds-change', (event) => {
      const on = Boolean(event.detail?.checked ?? toggle.checked);
      showToast({ message: `${flag.name} ${on ? 'enabled' : 'disabled'}`, variant: on ? 'success' : 'warning' });
    });
    slider?.addEventListener('eds-change', (event) => {
      showToast({ message: `${flag.name} at ${event.detail?.value ?? slider.value}%`, variant: 'info' });
    });
  });
  root.querySelector('#new-flag')?.addEventListener('eds-click', () => document.querySelector('#flag-modal')?.show());
}
