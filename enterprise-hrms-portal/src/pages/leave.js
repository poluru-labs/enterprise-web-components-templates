import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { leave, nextHoliday, onLeaveThisWeek, pendingLeave } from '../data/index.js';
import { formatDate } from '../lib/format.js';
import { statusLabel } from '../lib/status.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderLeave() {
  return `
    ${pageHeader({
      eyebrow: 'PTO',
      title: 'Leave calendar',
      lead: `${onLeaveThisWeek().length} out this week · ${pendingLeave().length} pending · ${nextHoliday.label}.`,
      actions: '<eds-button id="approve-all" variant="primary" icon="check">Review pending</eds-button>',
    })}
    <eds-alert variant="info" title="Labor Day office close" message="Poluru People offices are closed Mon 7 Sep 2026. Pending requests after the holiday need Sravani Poluru approval."></eds-alert>
    <div class="row g-3 mt-1">
      <div class="col-lg-7">
        ${sheet({
          title: 'This week',
          action: statusChip('approved'),
          body: '<eds-list id="week-leave" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Pending approval',
          action: `<eds-badge label="${pendingLeave().length}" variant="warning" pill></eds-badge>`,
          body: '<eds-list id="pending-leave" divided></eds-list>',
        })}
      </div>
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'All leave records',
        body: '<eds-data-table id="leave-table" compact striped></eds-data-table>',
      })}
    </section>
  `;
}

export function hydrateLeave(root) {
  const weekLeave = root.querySelector('#week-leave');
  if (weekLeave) {
    weekLeave.items = onLeaveThisWeek().map((person) => {
      const record = leave.find((l) => l.personId === person.id && l.status === 'approved');
      return {
        label: person.name,
        description: `${record?.type || 'PTO'} · ${formatDate(record?.start)} – ${formatDate(record?.end)}`,
        icon: 'calendar',
        href: `#/person/${person.id}`,
      };
    });
  }

  const pending = root.querySelector('#pending-leave');
  if (pending) {
    pending.items = pendingLeave().map((item) => ({
      label: item.personName,
      description: `${item.type} · ${formatDate(item.start)} – ${formatDate(item.end)}`,
      icon: 'clock',
    }));
  }

  const table = root.querySelector('#leave-table');
  if (table) {
    table.columns = [
      { key: 'person', label: 'Person' },
      { key: 'type', label: 'Type' },
      { key: 'dates', label: 'Dates' },
      { key: 'days', label: 'Days' },
      { key: 'status', label: 'Status' },
      { key: 'note', label: 'Note' },
    ];
    table.rows = leave.map((item) => ({
      person: item.personName,
      type: item.type,
      dates: `${formatDate(item.start)} – ${formatDate(item.end)}`,
      days: item.days,
      status: statusLabel(item.status),
      note: item.note,
    }));
  }

  root.querySelector('#approve-all')?.addEventListener('eds-click', () => {
    showToast({ message: 'Pending leave queued for review', variant: 'success' });
  });
}
