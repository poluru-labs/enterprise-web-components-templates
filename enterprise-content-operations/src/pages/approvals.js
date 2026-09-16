import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { approvals } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderApprovals() {
  return `
    ${pageHeader({
      eyebrow: 'Queue',
      title: 'Approvals',
      lead: `Asha Poluru’s book. Copy, legal, and locale sign-off before Rohan Poluru slots a ship.`,
    })}
    ${filterBar(`
      <eds-search id="ap-search" placeholder="Filter approvals" clearable></eds-search>
      <eds-select id="ap-status" label="Status"></eds-select>
    `)}
    <div id="ap-table"></div>
    <eds-empty-state id="ap-empty" hidden heading="No matches" description="Try a piece, reviewer, or desk." icon="search"></eds-empty-state>
  `;
}

export function hydrateApprovals(root) {
  const table = root.querySelector('#ap-table');
  const empty = root.querySelector('#ap-empty');
  const search = root.querySelector('#ap-search');
  const status = root.querySelector('#ap-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'In review', value: 'in_review' },
      { label: 'Approved', value: 'approved' },
      { label: 'Hold', value: 'hold' },
      { label: 'Copy', value: 'copy' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(approvals, search?.value ?? '', ['piece', 'title', 'requester', 'reviewer', 'desk']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
    if (!table) return;
    if (!hits.length) {
      table.innerHTML = '';
      return;
    }
    table.innerHTML = `
      <table class="ap-table">
        <thead>
          <tr><th>Piece</th><th>Headline</th><th>Requester</th><th>Reviewer</th><th>Desk</th><th>Date</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          ${hits
            .map(
              (item) => `
            <tr>
              <td>${item.piece}</td>
              <td>${item.title}</td>
              <td>${item.requester}</td>
              <td>${item.reviewer}</td>
              <td>${item.desk}</td>
              <td>${item.date}</td>
              <td>${statusChip(item.status)}</td>
              <td>
                <eds-split-button class="ap-split" data-id="${item.id}" label="Sign" variant="primary" icon="check" size="sm">
                  <eds-menu-item label="Approve" value="approve" icon="check"></eds-menu-item>
                  <eds-menu-item label="Return" value="return" icon="x"></eds-menu-item>
                </eds-split-button>
              </td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    `;
    table.querySelectorAll('.ap-split').forEach((button) => {
      button.addEventListener('eds-click', () => {
        const row = approvals.find((entry) => entry.id === button.dataset.id);
        showToast({ message: `${row?.piece || 'Piece'} signed by Asha Poluru`, variant: 'success' });
      });
      button.addEventListener('eds-select', (event) => {
        const row = approvals.find((entry) => entry.id === button.dataset.id);
        const value = event.detail?.value;
        if (value === 'return') {
          showToast({ message: `${row?.piece || 'Piece'} returned to ${row?.requester}`, variant: 'warning' });
        } else {
          showToast({ message: `${row?.piece || 'Piece'} approved`, variant: 'success' });
        }
      });
    });
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
