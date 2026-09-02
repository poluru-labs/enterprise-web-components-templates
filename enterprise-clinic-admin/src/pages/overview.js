import {
  activity,
  appointmentColumns,
  appointments,
  floorWatch,
  kpis,
  waitMinutes,
} from '../data/index.js';
import {
  cardGrid,
  chartPanel,
  equalHeightRow,
  hydrateStats,
  pageHeader,
  ring,
  snapshotCard,
  sparkline,
  statGrid,
} from '../components/widgets.js';

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Tuesday, 1 September 2026',
      title: 'Clinic pulse',
      lead: 'San Jose is running a full book. Capacity is healthy and two patients still need outreach.',
      actions: `
        <eds-button id="qa-book" variant="primary" icon="plus">Book visit</eds-button>
        <eds-button id="qa-checkin" variant="secondary" icon="check">Check in</eds-button>
        <eds-button id="qa-inbox" variant="tertiary" icon="mail">Inbox</eds-button>
      `,
    })}
    <section class="halo-hero-panel">
      <div class="halo-hero-copy">
        <span class="halo-kicker">Today's floor</span>
        <h2>Calm, on time, and nearly full.</h2>
        <p>20 patients already seen. Next open in-person slot is 16:20 in Exam 2. Telehealth A is held for Dr. Samir Poluru at 11:30.</p>
        <div class="halo-hero-pills">
          <span>Lobby wait 10 min</span>
          <span>5 labs to review</span>
          <span>2 no-show risks</span>
        </div>
      </div>
      ${ring(82, 'Room use')}
    </section>
    ${statGrid(kpis, 'kpi')}
    ${equalHeightRow([
      {
        className: 'col-lg-8',
        html: chartPanel({
          title: 'Wait time through the morning',
          action: '<eds-badge label="Minutes" variant="brand" pill></eds-badge>',
          body:
            sparkline(waitMinutes, 'Average lobby wait in minutes') +
            '<p class="halo-muted mb-0 mt-2">Door-to-room time dropped after 10:00 once Exam 2 turned over.</p>',
        }),
      },
      {
        className: 'col-lg-4',
        html: `
          <halo-content-card stretch title="Live activity">
            <eds-timeline id="floor-activity"></eds-timeline>
          </halo-content-card>
        `,
      },
    ])}
    ${equalHeightRow([
      {
        className: 'col-lg-6',
        html: `
          <halo-content-card stretch>
            <div slot="header" class="halo-section-title">
              <h2>Next on the board</h2>
              <eds-link href="#/schedule" variant="subtle">Open schedule</eds-link>
            </div>
            <eds-data-table id="upcoming-table" compact striped></eds-data-table>
          </halo-content-card>
        `,
      },
      {
        className: 'col-lg-6',
        html: `
          <halo-content-card stretch title="Needs attention">
            <eds-alert variant="danger" title="Critical A1C" message="Luis Poluru 9.4%. Same-day review with Dr. Marcus Poluru is still open."></eds-alert>
            <eds-alert class="mt-2" variant="warning" title="No-show risk" message="Leila Poluru has not confirmed the 10:20 urgent slot."></eds-alert>
            <eds-alert class="mt-2" variant="info" title="Refill waiting" message="Maya Poluru requested albuterol. Chart is already open in Exam 1."></eds-alert>
          </halo-content-card>
        `,
      },
    ])}
    <div class="halo-section-title mt-4">
      <h2>Floor watch</h2>
    </div>
    ${cardGrid(floorWatch.map((item) => snapshotCard(item)))}
  `;
}

export function hydrate(root) {
  hydrateStats(root, kpis, 'kpi');
  const table = root.querySelector('#upcoming-table');
  if (table) {
    table.columns = appointmentColumns.filter((col) => !['mode'].includes(col.key));
    table.rows = appointments.filter((item) => item.status !== 'Completed' && item.status !== 'In visit').slice(0, 6);
  }
  const timeline = root.querySelector('#floor-activity');
  if (timeline) timeline.items = activity;
  root.querySelector('#qa-book')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.show());
  root.querySelector('#qa-checkin')?.addEventListener('eds-click', () => {
    window.location.hash = '#/schedule';
  });
  root.querySelector('#qa-inbox')?.addEventListener('eds-click', () => {
    window.location.hash = '#/messages';
  });
}
