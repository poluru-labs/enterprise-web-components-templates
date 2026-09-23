import { maintenance } from '../data/index.js';
import { cadenceList, pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderMaintenance() {
  const cadence = maintenance.map((item) => ({
    label: item.title,
    description: `${item.owner} · ${item.site}`,
    timestamp: item.window.split('–')[0],
    status: item.status,
  }));
  return `
    ${pageHeader({
      eyebrow: 'Windows',
      title: 'Maintenance',
      lead: 'Published windows for Dallas, Phoenix, SaaS, and Chicago core.',
      actions: `<eds-button variant="primary" icon="calendar" id="sched-maint">Schedule window</eds-button>`,
    })}
    <div class="split">
      ${sheet({
        title: 'Upcoming',
        body: cadenceList(cadence),
      })}
      ${sheet({
        title: 'Impact',
        body: `<div class="stack">${maintenance
          .map(
            (item) => `
          <div class="person-head">
            <div>
              <strong>${item.title}</strong>
              <small class="asset-meta">${item.window} · ${item.impact}</small>
            </div>
            ${statusChip(item.status)}
          </div>`,
          )
          .join('')}</div>`,
      })}
    </div>
  `;
}

export function hydrateMaintenance(root) {
  root.querySelector('#sched-maint')?.addEventListener('eds-click', () => document.querySelector('#maint-modal')?.show());
}
