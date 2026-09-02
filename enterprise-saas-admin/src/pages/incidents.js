import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { incidents } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderIncidents() {
  return `
    ${pageHeader({
      eyebrow: 'Reliability',
      title: 'Incidents',
      lead: 'Auth latency is the open watch. Everything else is green across Aug–Sep 2026.',
      actions: `<eds-button id="new-incident" variant="primary" icon="alert-triangle">Open incident</eds-button>`,
    })}
    <section class="row g-3 stretch-grid">
      <div class="col-lg-7">
        ${sheet({
          title: 'Timeline',
          body: '<eds-timeline id="incident-timeline"></eds-timeline>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Status',
          body: `
            <div class="stack">
              <eds-status label="API" variant="success"></eds-status>
              <eds-status label="Auth" variant="warning" pulse></eds-status>
              <eds-status label="Billing" variant="success"></eds-status>
              <eds-status label="Flags" variant="success"></eds-status>
            </div>
            <eds-divider label="Next window" spacing="lg"></eds-divider>
            <eds-date-picker id="maint-date" label="Maintenance date" value="2026-08-30"></eds-date-picker>
            <eds-time-picker id="maint-time" class="mt-3" label="Start" value="02:00"></eds-time-picker>
            <eds-button id="save-window" class="mt-3" variant="secondary">Save window</eds-button>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateIncidents(root) {
  const timeline = root.querySelector('#incident-timeline');
  if (timeline) timeline.items = incidents;
  root.querySelector('#new-incident')?.addEventListener('eds-click', () => document.querySelector('#incident-modal')?.show());
  root.querySelector('#save-window')?.addEventListener('eds-click', () => {
    showToast({ message: 'Maintenance window saved', variant: 'success' });
  });
}
