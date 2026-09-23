import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { oncall, people } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderOncall() {
  return `
    ${pageHeader({
      eyebrow: 'Rota',
      title: 'On-call',
      lead: 'Sahana Poluru is primary until 17 Sep 09:00. Dev Poluru is secondary. Mira Poluru is the manager on the bridge.',
      actions: `<eds-button variant="primary" icon="bell" id="page-primary">Page primary</eds-button>`,
    })}
    <div class="split">
      ${sheet({
        title: 'This shift',
        body: `<eds-list id="oncall-list" divided></eds-list>
          <eds-alert class="mt-4" variant="info" title="Ack target 5 minutes" message="Primary must acknowledge P1 and P2 pages. Escalation to Mira Poluru at 10 minutes."></eds-alert>`,
      })}
      ${sheet({
        title: 'Bridge seats',
        body: `<eds-description-list id="oncall-meta" columns="1"></eds-description-list>
          <eds-accordion class="mt-4">
            <eds-accordion-item heading="When to page security" open>
              <p>Anika Poluru takes identity abuse, VPN portal certs, and anything that looks like credential stuffing. Do not wait for the P1 clock.</p>
            </eds-accordion-item>
            <eds-accordion-item heading="Handover">
              <p>Handover is 09:00 CT. The outgoing primary posts open incidents and tonight’s changes in the ops channel.</p>
            </eds-accordion-item>
          </eds-accordion>`,
      })}
    </div>
    <div class="people-grid">
      ${people
        .map(
          (person) => `
        <content-card>
          <div class="person-card">
            <div class="person-head">
              <eds-avatar name="${person.name}" size="md"></eds-avatar>
              <div>
                <strong>${person.name}</strong>
                <small>${person.role}</small>
              </div>
              ${statusChip(person.score >= 90 ? 'Ready' : 'Watch')}
            </div>
            <eds-rating value="${person.rating}" max="5" readonly size="sm"></eds-rating>
            <p class="asset-meta">${person.squad} · ${person.site}</p>
          </div>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateOncall(root) {
  const list = root.querySelector('#oncall-list');
  if (list) {
    list.items = oncall.map((item) => ({
      label: `${item.seat} · ${item.name}`,
      description: `Until ${item.until} · ${item.phone}`,
      icon: 'user',
    }));
  }
  const meta = root.querySelector('#oncall-meta');
  if (meta) {
    meta.items = oncall.map((item) => ({ term: item.seat, description: `${item.name} · ${item.phone}` }));
  }
  root.querySelector('#page-primary')?.addEventListener('eds-click', () => {
    showToast({ message: 'Paged Sahana Poluru on Bridge A', variant: 'info' });
  });
}
