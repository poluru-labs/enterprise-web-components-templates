import { alerts } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { severityTone } from '../lib/status.js';

export function renderAlerts() {
  return `
    ${pageHeader({
      eyebrow: 'Escalations',
      title: 'Escalation register',
      lead: 'SLA breaches, calibration misses, and staffing exceptions by queue.',
      actions: '<eds-button variant="primary" icon="plus">Log escalation</eds-button>',
    })}
    ${sheet({
      title: 'Active escalations',
      body: `
        <eds-segmented-control id="issue-filter" aria-label="Filter by severity"></eds-segmented-control>
        <div class="mt-4 stack" id="issue-list"></div>
      `,
    })}
  `;
}

export function hydrateAlerts(root) {
  const list = root.querySelector('#issue-list');
  const control = root.querySelector('#issue-filter');
  if (control) {
    control.options = [
      { label: 'All', value: 'all' },
      { label: 'Critical', value: 'Red' },
      { label: 'Review', value: 'Amber' },
      { label: 'Resolved', value: 'Green' },
    ];
    control.value = 'all';
  }

  const paint = (filter) => {
    if (!list) return;
    const rows = alerts.filter((item) => filter === 'all' || item.severity === filter);
    list.innerHTML = rows
      .map(
        (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.title}</h2>
            <eds-badge label="${item.severity}" variant="${severityTone(item.severity)}" pill></eds-badge>
          </div>
          <p class="muted mb-2">${item.scorecard} · ${item.owner}</p>
          <p>${item.note}</p>
          <div slot="footer" class="inline-actions">
            <eds-status variant="${severityTone(item.severity)}" label="Since ${item.since}"></eds-status>
            ${statusChip(item.severity === 'Green' ? 'Resolved' : 'Open')}
          </div>
        </content-card>`,
      )
      .join('');
  };

  paint('all');
  control?.addEventListener('eds-change', (event) => paint(event.detail?.value ?? 'all'));
}
