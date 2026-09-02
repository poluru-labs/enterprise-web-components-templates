import {
  accountColumns,
  accounts,
  activities,
  activityColumns,
  activityFeed,
  agenda,
  atRisk,
  contactColumns,
  contacts,
  currentUser,
  dealColumns,
  deals,
  forecast,
  funnel,
  insights,
  kpis,
  leadColumns,
  leads,
  pipelineMonths,
  reports,
  sourceMix,
  stages,
  teamBoard,
  workspaceName,
} from '../data/index.js';
import {
  bars,
  chartPanel,
  dashCell,
  dashGrid,
  emptyState,
  filterBar,
  formSection,
  money,
  pageHeader,
  ring,
  sparkline,
  statGrid,
  statusChip,
} from '../components/widgets.js';
import { viewState } from './state.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: `${workspaceName} · FY26 Q3`,
      title: 'Overview',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. Pipeline health, quota, and the next conversations that move revenue.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-deal" variant="primary" icon="plus">New deal</eds-button>
        <eds-button id="qa-activity" variant="secondary" icon="calendar">Log activity</eds-button>
        <eds-button id="qa-lead" variant="tertiary" icon="user">Add lead</eds-button>
      `,
    })}
    <section class="insight-banner" id="insight-banner">
      <div>
        <span class="kicker">Coach</span>
        <h2>${insights[0].title}</h2>
        <p>${insights[0].body}</p>
      </div>
      <div class="inline-actions">
        <eds-button id="insight-act" variant="primary">Book 15 min</eds-button>
        <eds-button id="insight-dismiss" variant="tertiary">Dismiss</eds-button>
      </div>
    </section>
    ${statGrid(kpis, 'kpi')}
    ${dashGrid([
      dashCell(
        chartPanel({
          title: 'Pipeline trend',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body:
            sparkline(pipelineMonths, 'Open pipeline in millions for the last twelve months') +
            '<p class="muted mb-0 mt-2">Open pipeline, unweighted. August is in progress at $4.86M.</p>',
        }),
        8,
      ),
      dashCell(
        chartPanel({
          title: 'Quota attained',
          body: ring(78, 'of $1.20M') + '<p class="muted mb-0 mt-2">Aisha Poluru commit $936k · remaining $264k · coverage 1.4×.</p>',
        }),
        4,
      ),
    ])}
    ${dashGrid([
      dashCell(
        `
        <section class="sheet">
          <div class="section-title">
            <h2>Stage funnel</h2>
            <eds-link href="#/pipeline" variant="subtle">Open board</eds-link>
          </div>
          <div class="funnel" role="img" aria-label="Pipeline funnel by stage">
            ${funnel
              .map(
                (item) => `
              <div class="funnel-row">
                <div class="d-flex justify-content-between"><strong>${item.stage}</strong><span>${item.count} · ${item.value}</span></div>
                <div class="funnel-track"><span style="width:${item.width}%"></span></div>
              </div>`,
              )
              .join('')}
          </div>
        </section>`,
        5,
      ),
      dashCell(
        `
        <section class="sheet">
          <div class="section-title">
            <h2>Team scoreboard</h2>
            <eds-badge label="This quarter" variant="brand" pill></eds-badge>
          </div>
          <ul class="scoreboard">
            ${teamBoard
              .map(
                (person) => `
              <li>
                <span class="avatar" aria-hidden="true">${person.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}</span>
                <div>
                  <strong>${person.name}</strong>
                  <small>${person.closed} closed · ${person.pipeline} pipeline</small>
                </div>
                <div class="score-meter">
                  <span style="width:${person.quota}%"></span>
                </div>
                <em>${person.quota}%</em>
              </li>`,
              )
              .join('')}
          </ul>
        </section>`,
        7,
      ),
    ])}
    ${dashGrid([
      dashCell(
        `
        <lyra-content-card>
          <div slot="header" class="section-title">
            <h2>Today’s agenda</h2>
            <eds-link href="#/activities" variant="subtle">All</eds-link>
          </div>
          <ul class="agenda" id="agenda-list">
            ${agenda
              .map(
                (item) => `
              <li data-id="${item.id}">
                <span class="agenda-time">${item.time}</span>
                <div>
                  <strong>${item.title}</strong>
                  <small>${item.type} · ${item.with}</small>
                </div>
                <eds-button class="agenda-done" variant="tertiary" data-id="${item.id}">Done</eds-button>
              </li>`,
              )
              .join('')}
          </ul>
        </lyra-content-card>`,
        4,
      ),
      dashCell(
        `
        <lyra-content-card>
          <div slot="header" class="section-title">
            <h2>At risk</h2>
            <eds-badge label="4" variant="danger" pill></eds-badge>
          </div>
          <ul class="risk-list">
            ${atRisk
              .map(
                (item) => `
              <li>
                <a href="${item.href}"><strong>${item.account}</strong></a>
                <small>${item.owner} · ${item.reason}</small>
                <em>${item.value}</em>
              </li>`,
              )
              .join('')}
          </ul>
        </lyra-content-card>`,
        4,
      ),
      dashCell(
        chartPanel({
          title: 'Source mix',
          body: `
            <div class="mix">
              ${sourceMix
                .map(
                  (item) => `
                <div>
                  <div class="d-flex justify-content-between"><strong>${item.label}</strong><span>${item.value}%</span></div>
                  <div class="mix-track"><span style="width:${item.value}%"></span></div>
                </div>`,
                )
                .join('')}
            </div>
          `,
        }),
        4,
      ),
    ])}
    ${dashGrid([
      dashCell(
        `
        <lyra-content-card>
          <div slot="header" class="section-title">
            <h2>Hot deals</h2>
            <eds-link href="#/deals" variant="subtle">All deals</eds-link>
          </div>
          <eds-data-table id="hot-deals" compact striped></eds-data-table>
        </lyra-content-card>`,
        7,
      ),
      dashCell(
        `
        <lyra-content-card>
          <div slot="header" class="section-title"><h2>Activity feed</h2></div>
          <eds-timeline id="activity-feed"></eds-timeline>
          <eds-divider label="conversion" spacing="md"></eds-divider>
          <p class="muted mb-1">Lead conversion is 24% this month. Follow-ups due today: 6.</p>
          <eds-progress-bar value="24" max="100" label="MQL conversion" show-value></eds-progress-bar>
        </lyra-content-card>`,
        5,
      ),
    ])}
  `;
}

