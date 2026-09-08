import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { requests } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderRequestDetail(route) {
  const item = requests.find((entry) => entry.id === route.id) || requests[0];
  return `
    ${pageHeader({
      eyebrow: item.number,
      title: item.title,
      lead: `${item.requester} asked ${formatCurrency(item.amount)} from ${item.supplier}. Approver: ${item.approver}.`,
      actions: `
        <eds-button id="pr-approve" variant="primary" icon="check">Approve</eds-button>
        <eds-button id="pr-reject" variant="secondary" icon="x">Reject</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Request',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>PR</dt><dd>${item.number}</dd></div>
              <div><dt>Category</dt><dd>${item.category}</dd></div>
              <div><dt>Amount</dt><dd>${formatCurrency(item.amount)}</dd></div>
              <div><dt>Needed</dt><dd>${item.needed}</dd></div>
              <div><dt>Supplier</dt><dd>${item.supplier}</dd></div>
              <div><dt>Stage</dt><dd>${item.stage}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru’s desk holds the packet until ${item.approver} signs or sends it back.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Routing',
          body: '<eds-timeline id="pr-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydrateRequestDetail(root, route) {
  const item = requests.find((entry) => entry.id === route.id) || requests[0];
  const timeline = root.querySelector('#pr-timeline');
  if (timeline) {
    timeline.items = [
      { label: 'Drafted', description: item.requester, timestamp: 'Opened', icon: 'file' },
      { label: 'Category review', description: 'Maya Poluru · buy desk', timestamp: 'Same day', icon: 'user' },
      { label: 'Waiting', description: item.approver, timestamp: item.status, icon: 'clock' },
    ];
  }
  root.querySelector('#pr-approve')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.number} approved (demo)`, variant: 'success' });
  });
  root.querySelector('#pr-reject')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.number} sent back (demo)`, variant: 'warning' });
  });
}
