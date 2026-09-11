import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { alerts, incidents, investigations, playbooks } from '../data/index.js';
import { formatDateTime } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderIncidentDetail(route) {
  const item = incidents.find((entry) => entry.id === route.id) || incidents[0];
  const relatedAlerts = alerts.filter((alert) => alert.severity === item.severity).slice(0, 3);
  const relatedCase = investigations.find((entry) => entry.linked === item.code);
  const playbook = playbooks.find((entry) => entry.name === item.playbook);
  return `
    ${pageHeader({
      eyebrow: item.code,
      title: item.title,
      lead: `${item.owner} is commander. Queue ${item.queue}. Playbook ${item.playbook}. Opened ${formatDateTime(item.opened)}.`,
      actions: `
        <eds-button id="inc-contain" variant="primary" icon="shield">Contain</eds-button>
        <eds-button id="inc-escalate" variant="secondary" icon="alert-triangle">Escalate</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Incident',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>Code</dt><dd>${item.code}</dd></div>
              <div><dt>Severity</dt><dd>${item.severity}</dd></div>
              <div><dt>Commander</dt><dd>${item.owner}</dd></div>
              <div><dt>Queue</dt><dd>${item.queue}</dd></div>
              <div><dt>Playbook</dt><dd>${item.playbook}</dd></div>
              <div><dt>Opened</dt><dd>${formatDateTime(item.opened)}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru reviews containment before Maya Poluru closes the case. ${relatedCase ? `${relatedCase.code} is the linked investigation.` : 'No DFIR case is linked yet.'}</p>`,
        })}
        ${sheet({
          title: 'Linked alerts',
          action: '<eds-link href="#/alerts" variant="subtle">Queue</eds-link>',
          body: relatedAlerts
            .map(
              (alert) => `
            <div class="list-row">
              <div>
                <strong>${alert.title}</strong>
                <p class="muted mb-0">${alert.source} · ${alert.owner} · ${formatDateTime(alert.seen)}</p>
              </div>
              ${statusChip(alert.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Response trail',
          body: '<eds-timeline id="inc-timeline"></eds-timeline>',
        })}
        ${sheet({
          title: 'Playbook',
          action: playbook ? statusChip(playbook.status) : '',
          body: playbook
            ? `<p class="mb-1"><strong>${playbook.name}</strong></p>
               <p class="muted mb-0">${playbook.owner} · ${playbook.steps} steps · ${playbook.last}</p>`
            : '<p class="muted mb-0">No playbook attached.</p>',
        })}
      </div>
    </div>
  `;
}

export function hydrateIncidentDetail(root, route) {
  const item = incidents.find((entry) => entry.id === route.id) || incidents[0];
  const timeline = root.querySelector('#inc-timeline');
  if (timeline) {
    timeline.items = [
      { label: 'Detected', description: `${item.queue} queue`, timestamp: formatDateTime(item.opened), icon: 'bell' },
      { label: 'Commander assigned', description: item.owner, timestamp: 'Same minute', icon: 'user' },
      { label: 'Playbook attached', description: item.playbook, timestamp: 'In progress', icon: 'check' },
      { label: 'Current state', description: item.status, timestamp: 'Now', icon: 'clock' },
    ];
  }
  root.querySelector('#inc-contain')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} marked contained (demo)`, variant: 'success' });
  });
  root.querySelector('#inc-escalate')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} escalated to Subbu Poluru (demo)`, variant: 'warning' });
  });
}
