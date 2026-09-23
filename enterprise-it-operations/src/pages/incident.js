import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { incidentTimeline, incidents } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { severityTone } from '../lib/status.js';

export function renderIncident(route) {
  const item = incidents.find((row) => row.id === route.id) || incidents[0];
  return `
    ${pageHeader({
      eyebrow: `${item.service} · ${item.ci}`,
      title: `${item.id}`,
      lead: item.title,
      actions: `
        <eds-button-group>
          <eds-button variant="secondary" icon="bell" id="page-oncall">Page on-call</eds-button>
          <eds-button variant="primary" icon="check" id="resolve-inc">Resolve</eds-button>
        </eds-button-group>
      `,
    })}
    <eds-alert variant="${item.severity === 'P1' ? 'danger' : 'warning'}" title="${item.severity} · ${item.status}" message="${item.note}"></eds-alert>
    <div class="triple mt-4">
      ${sheet({ title: 'Severity', body: `<eds-badge label="${item.severity}" variant="${severityTone(item.severity)}" pill></eds-badge><p class="muted mt-4">Commander ${item.owner}.</p>` })}
      ${sheet({
        title: 'Restore SLA',
        body: `<eds-popover placement="bottom" heading="Clock">
          <eds-button slot="trigger" variant="tertiary">${item.sla}</eds-button>
          <p>Restore SLA for ${item.severity}. Opened ${item.since}.</p>
        </eds-popover>
        <p class="muted mt-4">${statusChip(item.status)}</p>`,
      })}
      ${sheet({ title: 'Bridge', body: `<eds-status variant="${item.status === 'Resolved' ? 'success' : 'danger'}" label="${item.status}" pulse></eds-status><p class="muted mt-4">Sahana Poluru acknowledged in 1m 40s.</p>` })}
    </div>
    <eds-tabs>
      <eds-tab label="Timeline" active>
        ${sheet({
          title: 'Work log',
          body: `<eds-timeline id="inc-timeline"></eds-timeline>
            <eds-divider label="update"></eds-divider>
            <eds-textarea id="inc-note" label="Add an update" rows="3" placeholder="What changed on the bridge."></eds-textarea>
            <div class="inline-actions mt-4">
              <eds-button id="post-note" variant="primary" icon="save">Post</eds-button>
            </div>`,
        })}
      </eds-tab>
      <eds-tab label="Record">
        ${sheet({
          title: 'Incident record',
          body: `<eds-description-list id="inc-meta" columns="2" compact></eds-description-list>
            <eds-accordion class="mt-4">
              <eds-accordion-item heading="Runbook" open>
                <p>Fail SSO reads to the secondary broker, then check MFA round-trip. Do not bounce the primary until Elena Poluru is on the call.</p>
              </eds-accordion-item>
              <eds-accordion-item heading="Communications">
                <p>Status page: Identity degraded. Next update in 15 minutes from Mira Poluru.</p>
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </eds-tab>
    </eds-tabs>
  `;
}

export function hydrateIncident(root, route) {
  const item = incidents.find((row) => row.id === route.id) || incidents[0];
  const timeline = root.querySelector('#inc-timeline');
  if (timeline) timeline.items = incidentTimeline;
  const meta = root.querySelector('#inc-meta');
  if (meta) {
    meta.items = [
      { term: 'Owner', description: item.owner },
      { term: 'Service', description: item.service },
      { term: 'CI', description: item.ci },
      { term: 'Opened', description: item.since },
      { term: 'SLA', description: item.sla },
      { term: 'Status', description: item.status },
    ];
  }
  root.querySelector('#page-oncall')?.addEventListener('eds-click', () => {
    showToast({ message: 'Paged Sahana Poluru on Bridge A', variant: 'info' });
  });
  root.querySelector('#resolve-inc')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.id} marked resolved`, variant: 'success' });
  });
  root.querySelector('#post-note')?.addEventListener('eds-click', () => {
    showToast({ message: 'Update posted to the work log', variant: 'success' });
  });
}
