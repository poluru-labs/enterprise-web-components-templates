import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { approvalColumns, approvals, people } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export const viewState = {
  approvalQuery: '',
};

export function renderApprovals() {
  const open = approvals.filter((item) => item.status === 'Pending' || item.status === 'Submitted');
  return `
    ${pageHeader({
      eyebrow: 'Queue',
      title: 'Approvals',
      lead: `${open.length} open. Berlin hotel and the Singapore extra night are past SLA. Lagos exception waits on Nikhil Poluru.`,
      actions: `<eds-button id="ap-policy" variant="primary" icon="file">File exception</eds-button>`,
    })}
    <eds-card padded>
      ${filterBar(`
        <eds-search id="ap-search" placeholder="Search request or owner" clearable></eds-search>
        <eds-autocomplete id="ap-owner" label="Owner" placeholder="Poluru teammate"></eds-autocomplete>
        <eds-segmented-control id="ap-status"></eds-segmented-control>
      `)}
      <eds-data-table id="ap-table" sortable striped></eds-data-table>
      ${emptyState({
        id: 'ap-empty',
        heading: 'No requests match',
        description: 'Clear search or status to see the queue.',
        action: '<eds-button id="reset-ap" slot="actions" variant="primary">Reset</eds-button>',
      })}
    </eds-card>
    <div class="card-grid mt-3">
      ${approvals
        .map(
          (item) => `
        <content-card href="#/trip/${item.tripId}">
          <div slot="header" class="section-title">
            <h2>${item.type}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.subject}</p>
          <p class="hero-metric" style="font-size:1.4rem">${formatCurrency(item.amount)}</p>
          <p class="muted mb-0">${item.owner} · ${item.sla} · ${item.submitted}</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Hold a slot',
          body: `
            <eds-date-picker id="ap-day" label="Review date"></eds-date-picker>
            <eds-time-picker class="mt-3" id="ap-time" label="Call"></eds-time-picker>
            <eds-checkbox class="mt-3" id="ap-exec" label="Include exec sponsor" checked></eds-checkbox>
            <eds-button class="mt-3" id="hold-ap" variant="primary">Hold the slot</eds-button>`,
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Queue',
          body: `
            <eds-accordion>
              <eds-accordion-item heading="Overdue" open>
                Berlin hotel cap and the Singapore extra night. Elena Poluru owns both.
              </eds-accordion-item>
              <eds-accordion-item heading="Policy">
                Lagos is a restricted country. Security brief is signed; Nikhil Poluru still has to stamp it.
              </eds-accordion-item>
              <eds-accordion-item heading="Spend">
                Luca Poluru HQ meals are under $75 each and wait on Rohan Poluru.
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateApprovals(root) {
  const table = root.querySelector('#ap-table');
  const empty = root.querySelector('#ap-empty');
  const status = root.querySelector('#ap-status');
  const owner = root.querySelector('#ap-owner');
  if (status) {
    status.options = [
      { label: 'All', value: 'all' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Submitted', value: 'Submitted' },
      { label: 'Approved', value: 'Approved' },
    ];
    status.value = 'all';
  }
  if (owner) owner.options = people.map((item) => ({ label: item.name, value: item.name }));
  const paint = () => {
    const query = viewState.approvalQuery.toLowerCase();
    const rows = approvals
      .filter((item) => `${item.subject} ${item.owner}`.toLowerCase().includes(query))
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value)
      .map((item) => ({
        ...item,
        amount: formatCurrency(item.amount),
      }));
    if (table) {
      table.columns = approvalColumns;
      table.rows = rows;
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#ap-search')?.addEventListener('eds-input', (event) => {
    viewState.approvalQuery = event.detail?.value ?? '';
    paint();
  });
  status?.addEventListener('eds-change', paint);
  root.querySelector('#reset-ap')?.addEventListener('eds-click', () => {
    viewState.approvalQuery = '';
    if (status) status.value = 'all';
    paint();
  });
  root.querySelector('#ap-policy')?.addEventListener('eds-click', () => document.querySelector('#policy-modal')?.show());
  root.querySelector('#hold-ap')?.addEventListener('eds-click', () => {
    showToast({ message: 'Review slot held', variant: 'success' });
  });
}
