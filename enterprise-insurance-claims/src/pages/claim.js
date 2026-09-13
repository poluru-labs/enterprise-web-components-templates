import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { claims, fraudFlags, policies } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { statusLabel } from '../lib/status.js';

export function renderClaim(route) {
  const item = claims.find((entry) => entry.id === route.id) || claims[0];
  return `
    ${pageHeader({
      eyebrow: item.code,
      title: item.title,
      lead: `${item.city} · ${statusLabel(item.line)}. ${item.adjuster} on the file. Loss ${item.loss}.`,
      actions: `
        <eds-button id="cl-assign" variant="primary" icon="user">Assign</eds-button>
        <eds-button id="cl-policy" variant="secondary" icon="file">Policy</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'File',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>Code</dt><dd>${item.code}</dd></div>
              <div><dt>Stage</dt><dd>${statusLabel(item.stage)}</dd></div>
              <div><dt>Adjuster</dt><dd>${item.adjuster}</dd></div>
              <div><dt>Insured</dt><dd>${item.insured}</dd></div>
              <div><dt>Policy</dt><dd>${item.policy}</dd></div>
              <div><dt>Reserve</dt><dd>${formatCurrency(item.reserve)}</dd></div>
              <div><dt>Line</dt><dd>${statusLabel(item.line)}</dd></div>
              <div><dt>Loss date</dt><dd>${item.loss}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru’s desk holds the packet. Subra Poluru owns the pad on home and flood.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'On this file',
          body: '<eds-timeline id="cl-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydrateClaim(root, route) {
  const item = claims.find((entry) => entry.id === route.id) || claims[0];
  const policy = policies.find((entry) => entry.number === item.policy);
  const flags = fraudFlags.filter((entry) => entry.claim === item.code).slice(0, 2);
  const timeline = root.querySelector('#cl-timeline');
  if (timeline) {
    timeline.items = [
      { label: `${statusLabel(item.stage)} · ${item.adjuster}`, description: item.city, timestamp: 'Today', icon: 'check' },
      {
        label: policy ? `${policy.number} ${statusLabel(policy.status)}` : item.policy,
        description: policy?.owner || 'Coverage',
        timestamp: 'Policy',
        icon: 'file',
      },
      ...flags.map((entry) => ({
        label: entry.title,
        description: entry.reporter,
        timestamp: entry.date,
        icon: 'star',
      })),
    ];
  }
  root.querySelector('#cl-assign')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} stays with ${item.adjuster}`, variant: 'info' });
    window.location.hash = '#/adjusters';
  });
  root.querySelector('#cl-policy')?.addEventListener('eds-click', () => {
    window.location.hash = '#/policies';
  });
}
