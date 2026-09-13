import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { rfis, schedule, sites } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { statusLabel } from '../lib/status.js';

export function renderSite(route) {
  const item = sites.find((entry) => entry.id === route.id) || sites[0];
  return `
    ${pageHeader({
      eyebrow: item.code,
      title: item.name,
      lead: `${item.city} · ${statusLabel(item.phase)}. ${item.pm} in the trailer, ${item.super} on the pad. Finish ${item.finish}.`,
      actions: `
        <eds-button id="st-rfi" variant="primary" icon="plus">Log RFI</eds-button>
        <eds-button id="st-sched" variant="secondary" icon="clock">Schedule</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Job',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>Code</dt><dd>${item.code}</dd></div>
              <div><dt>Phase</dt><dd>${statusLabel(item.phase)}</dd></div>
              <div><dt>PM</dt><dd>${item.pm}</dd></div>
              <div><dt>Superintendent</dt><dd>${item.super}</dd></div>
              <div><dt>Budget</dt><dd>${formatCurrency(item.budget)}</dd></div>
              <div><dt>Spent</dt><dd>${formatCurrency(item.spent)}</dd></div>
              <div><dt>Complete</dt><dd>${item.complete}%</dd></div>
              <div><dt>Finish</dt><dd>${item.finish}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru’s desk holds the packet. Subra Poluru owns the pad if the job is in structure or fit-out.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'On this job',
          body: '<eds-timeline id="st-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydrateSite(root, route) {
  const item = sites.find((entry) => entry.id === route.id) || sites[0];
  const siteRfis = rfis.filter((entry) => entry.site === item.name).slice(0, 2);
  const siteSched = schedule.filter((entry) => entry.site === item.name).slice(0, 2);
  const timeline = root.querySelector('#st-timeline');
  if (timeline) {
    timeline.items = [
      { label: `${item.complete}% complete`, description: item.super, timestamp: 'Today', icon: 'check' },
      ...siteSched.map((entry) => ({
        label: entry.activity,
        description: entry.owner,
        timestamp: entry.finish,
        icon: 'clock',
      })),
      ...siteRfis.map((entry) => ({
        label: entry.number,
        description: entry.title,
        timestamp: entry.due,
        icon: 'file',
      })),
    ];
  }
  root.querySelector('#st-rfi')?.addEventListener('eds-click', () => document.querySelector('#rfi-modal')?.show());
  root.querySelector('#st-sched')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} opened on the calendar`, variant: 'info' });
    window.location.hash = '#/schedule';
  });
}
