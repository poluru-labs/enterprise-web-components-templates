import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { approvals } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, statusChip } from '../components/widgets.js';

export function renderApprovals() {
  return `
    ${pageHeader({
      eyebrow: 'Queue',
      title: 'Approvals',
      lead: 'Arjun Poluru signs spend over $25k. Anika Poluru countersigns legal. Subbu Poluru can nudge, not skip.',
    })}
    <div class="card-grid cols-2" id="approval-grid">
      ${approvals
        .map(
          (item) => `
        <content-card href="#/request/${item.requestId}">
          <div slot="header" class="section-title">
            <h2>${item.title}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.owner} · waiting ${item.waiting}</p>
          <p class="muted mb-2">${formatCurrency(item.amount)}</p>
          <p class="muted mb-3">${item.note}</p>
          <div slot="footer" class="inline-actions">
            <eds-button class="approve-btn" variant="primary" data-id="${item.id}" icon="check">Approve</eds-button>
            <eds-button class="reject-btn" variant="tertiary" data-id="${item.id}">Return</eds-button>
          </div>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateApprovals(root) {
  root.querySelectorAll('.approve-btn').forEach((btn) => {
    btn.addEventListener('eds-click', (event) => {
      event.stopPropagation();
      const item = approvals.find((entry) => entry.id === btn.getAttribute('data-id'));
      showToast({ message: `${item?.title || 'Request'} approved (demo)`, variant: 'success' });
    });
  });
  root.querySelectorAll('.reject-btn').forEach((btn) => {
    btn.addEventListener('eds-click', (event) => {
      event.stopPropagation();
      const item = approvals.find((entry) => entry.id === btn.getAttribute('data-id'));
      showToast({ message: `${item?.title || 'Request'} returned (demo)`, variant: 'warning' });
    });
  });
}
