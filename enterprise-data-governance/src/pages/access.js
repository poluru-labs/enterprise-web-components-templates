import { accessColumns, accessRequests } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderAccess() {
  const open = accessRequests.filter((item) => ['Pending', 'Queued', 'In review'].includes(item.status));
  return `
    ${pageHeader({
      eyebrow: 'Access',
      title: 'Requests in flight',
      lead: 'Read and export grants against gold and restricted assets. SLA is two business days.',
      actions: `<eds-button variant="primary" icon="lock" id="new-access">New request</eds-button>`,
    })}
    <div class="triple">
      ${sheet({ title: 'Open', body: `<eds-stat value="${open.length}" label="Waiting on an owner" hint="SLA 2 days" trend="down" trend-value="−4"></eds-stat>` })}
      ${sheet({ title: 'Approved this week', body: '<eds-stat value="9" label="Grants" hint="Vihaan Poluru, Hana Poluru" trend="up" trend-value="+2"></eds-stat>' })}
      ${sheet({ title: 'Denied', body: '<eds-stat value="1" label="Headcount export" hint="Elena Poluru" trend="flat" trend-value="Hold"></eds-stat>' })}
    </div>
    ${sheet({
      title: 'Queue',
      body: `<div class="stack">${open
        .map(
          (item) => `
        <div class="person-head">
          <div>
            <strong>${item.asset}</strong>
            <small class="asset-meta">${item.requester} · ${item.purpose} · ${item.sla}</small>
          </div>
          ${statusChip(item.status)}
        </div>`,
        )
        .join('')}</div>`,
    })}
    ${sheet({
      title: 'Register',
      body: '<eds-data-table id="access-table" sortable></eds-data-table>',
    })}
  `;
}

export function hydrateAccess(root) {
  const table = root.querySelector('#access-table');
  if (table) {
    table.columns = accessColumns;
    table.rows = accessRequests;
  }
  root.querySelector('#new-access')?.addEventListener('eds-click', () => document.querySelector('#access-modal')?.show());
}
