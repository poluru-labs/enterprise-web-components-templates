import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  courses,
  currentUser,
  onLeaveThisWeek,
  overviewStats,
  pendingLeave,
  people,
  reqs,
  workspace,
} from '../data/index.js';
import { hydrateStats, mixedHighlightGrid, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

const headcountTrend = [14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18];

export function renderOverview() {
  const stats = overviewStats();
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'People pulse',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. ${onLeaveThisWeek().length} teammates are out this week. ${pendingLeave().length} leave requests need review.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-add" variant="primary" icon="plus">Add employee</eds-button>
        <eds-button id="qa-leave" variant="secondary" icon="calendar">Leave</eds-button>
      `,
    })}
    <eds-alert id="leave-alert" variant="warning" dismissible title="${pendingLeave().length} leave requests pending" message="Arjun, Divya, and Kiran submitted PTO after Labor Day. Review before the office reopens."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Headcount',
          action: '<eds-badge label="18 active" variant="brand" pill></eds-badge>',
          body: `${sparkline(headcountTrend, 'Headcount growth')}
            <p class="muted mb-0 mt-2">18 teammates across 11 departments. Kiran Poluru and Asha Poluru joined in Aug–Oct 2026.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Training completion',
          action: '<eds-status label="On track" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block" style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="training-ring" value="74" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="74" max="100" label="74% avg hours vs target" show-value></eds-progress-bar>
              <p class="muted mb-0">Benefits 2026 due 12 Sep · 88 enrolled.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Highlights</h2>
        <eds-link href="#/people" variant="subtle">Directory</eds-link>
      </div>
      ${mixedHighlightGrid({
        peopleList: people.filter((p) => p.status === 'active').slice(0, 2),
        reqList: reqs.slice(0, 2),
        courseList: courses.slice(0, 2),
      })}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'On leave this week',
          action: '<eds-link href="#/leave" variant="subtle">Calendar</eds-link>',
          body: '<eds-list id="leave-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent activity',
          action: '<eds-link href="#/hiring" variant="subtle">Hiring</eds-link>',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, overviewStats(), 'stat');
  const period = root.querySelector('#dash-period');
  if (period) {
    period.options = [
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Quarter', value: 'qtr' },
    ];
    period.value = 'month';
  }
  const leaveList = root.querySelector('#leave-list');
  if (leaveList) {
    leaveList.items = onLeaveThisWeek().map((person) => ({
      label: person.name,
      description: `${person.title} · ${person.department}`,
      icon: 'calendar',
      href: `#/person/${person.id}`,
    }));
  }
  const timeline = root.querySelector('#overview-timeline');
  if (timeline) {
    timeline.items = [
      { label: 'People partner offer', description: 'Ananya Poluru · Austin req', timestamp: '1 Sep', icon: 'briefcase' },
      { label: 'Benefits 2026 launch', description: 'Neha Poluru · 88 enrolled', timestamp: '28 Aug', icon: 'book' },
      { label: 'Kiran Poluru joined', description: 'Frontend engineer · Austin', timestamp: '11 Aug', icon: 'user' },
      { label: 'Staff engineer req opened', description: 'Rohan Poluru · 2 openings', timestamp: '14 Jul', icon: 'folder' },
    ];
  }
  root.querySelector('#qa-add')?.addEventListener('eds-click', () => document.querySelector('#employee-modal')?.show());
  root.querySelector('#qa-leave')?.addEventListener('eds-click', () => {
    window.location.hash = '#/leave';
  });
  root.querySelector('#leave-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Leave reminder dismissed', variant: 'info' });
  });
}
