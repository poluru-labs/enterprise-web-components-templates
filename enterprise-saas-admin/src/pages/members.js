import { memberColumns, members } from '../data/index.js';
import { emptyState, filterBar, pageHeader, sheet } from '../components/widgets.js';
import { viewState } from './state.js';

export function renderMembers() {
  return `
    ${pageHeader({
      eyebrow: 'Access',
      title: 'Members',
      lead: '12,480 active seats. Invite a Poluru teammate, change a role, or suspend access.',
      actions: `<eds-button id="invite-member" variant="primary" icon="plus">Invite member</eds-button>`,
    })}
    ${filterBar(`
      <eds-search id="member-search" placeholder="Name or email" clearable></eds-search>
      <eds-select id="member-role" label="Role"></eds-select>
      <eds-select id="member-status" label="Status"></eds-select>
    `)}
    <section class="row g-3 stretch-grid">
      <div class="col-lg-8">
        <eds-card padded class="sheet">
          <eds-data-table id="member-table" sortable striped></eds-data-table>
          ${emptyState({ id: 'member-empty', heading: 'No members', description: 'No one matches this filter.' })}
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Seat pack',
          body: `
            <eds-meter label="Used" value="84" show-value></eds-meter>
            <p class="muted mt-3 mb-2">Pending invites</p>
            <eds-list id="pending-invites" divided></eds-list>`,
        })}
      </div>
    </section>
  `;
}

export function hydrateMembers(root) {
  const table = root.querySelector('#member-table');
  const role = root.querySelector('#member-role');
  const status = root.querySelector('#member-status');
  if (role) {
    role.options = [
      { label: 'All roles', value: 'all' },
      { label: 'Owner', value: 'Owner' },
      { label: 'Admin', value: 'Admin' },
      { label: 'Billing', value: 'Billing' },
      { label: 'Member', value: 'Member' },
      { label: 'Support', value: 'Support' },
    ];
    role.value = 'all';
  }
  if (status) {
    status.options = [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'Active' },
      { label: 'Invited', value: 'Invited' },
      { label: 'Suspended', value: 'Suspended' },
    ];
    status.value = 'all';
  }
  const paint = () => {
    const query = viewState.memberQuery.toLowerCase();
    const rows = members
      .filter((item) => `${item.name} ${item.email}`.toLowerCase().includes(query))
      .filter((item) => (role?.value || 'all') === 'all' || item.role === role.value)
      .filter((item) => (status?.value || 'all') === 'all' || item.status === status.value);
    if (table) {
      table.columns = memberColumns;
      table.rows = rows;
    }
    const empty = root.querySelector('#member-empty');
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#member-search')?.addEventListener('eds-input', (event) => {
    viewState.memberQuery = event.detail?.value ?? '';
    paint();
  });
  role?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  const pending = root.querySelector('#pending-invites');
  if (pending) {
    pending.items = members
      .filter((item) => item.status === 'Invited')
      .map((item) => ({ label: item.name, description: item.org, icon: 'mail' }));
  }
  root.querySelector('#invite-member')?.addEventListener('eds-click', () => document.querySelector('#invite-modal')?.show());
}
