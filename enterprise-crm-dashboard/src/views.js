import { showToast } from '@poluru-labs/enterprise-design-system-wc';
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
} from './data.js';
import {
  bars,
  chartPanel,
  emptyState,
  filterBar,
  formSection,
  hydrateStats,
  money,
  pageHeader,
  ring,
  sparkline,
  statGrid,
  statusChip,
} from './ui.js';

export const viewState = {
  dealQuery: '',
  dealView: 'all',
  leadQuery: '',
  leadStatus: 'all',
  contactQuery: '',
  accountQuery: '',
  activityQuery: '',
};

function dealRows(list = deals) {
  return list.map((item) => ({
    name: item.name,
    account: item.account,
    value: item.value,
    stage: item.stage,
    probability: `${item.probability}%`,
    owner: item.owner,
    close: item.close,
    id: item.id,
  }));
}

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
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Pipeline trend',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: sparkline(pipelineMonths, 'Open pipeline in millions for the last twelve months') + '<p class="muted mb-0 mt-2">Open pipeline, unweighted. August is in progress at $4.86M across the Poluru Labs book.</p>',
        })}
      </div>
      <div class="col-lg-4">
        ${chartPanel({
          title: 'Quota attained',
          body: ring(78, 'of $1.20M') + '<p class="muted mb-0 mt-2">Aisha Poluru commit $936k · remaining $264k · coverage 1.4×.</p>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
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
        </section>
      </div>
      <div class="col-lg-7">
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
                <span class="avatar" aria-hidden="true">${person.name.split(' ').map((part) => part[0]).join('')}</span>
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
        </section>
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-4">
        <section class="sheet">
          <div class="section-title">
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
        </section>
      </div>
      <div class="col-lg-4">
        <section class="sheet">
          <div class="section-title">
            <h2>At risk</h2>
            <eds-badge label="3" variant="danger" pill></eds-badge>
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
        </section>
      </div>
      <div class="col-lg-4">
        ${chartPanel({
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
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-7">
        <section class="sheet">
          <div class="section-title">
            <h2>Hot deals</h2>
            <eds-link href="#/deals" variant="subtle">All deals</eds-link>
          </div>
          <eds-data-table id="hot-deals" compact striped></eds-data-table>
        </section>
      </div>
      <div class="col-lg-5">
        <section class="sheet">
          <div class="section-title"><h2>Activity feed</h2></div>
          <eds-timeline id="activity-feed"></eds-timeline>
          <eds-divider label="conversion" spacing="md"></eds-divider>
          <p class="muted mb-1">Lead conversion is 24% this month. Follow-ups due today: 6.</p>
          <eds-progress-bar value="24" max="100" label="MQL conversion" show-value></eds-progress-bar>
        </section>
      </div>
    </section>
  `;
}

export function renderPipeline() {
  const columns = stages
    .map((stage) => {
      const cards = deals.filter((deal) => deal.stage === stage);
      const total = cards.reduce((sum, deal) => sum + deal.amount, 0);
      return `
        <section class="kanban-col" data-stage="${stage}">
          <header>
            <div>
              <h2>${stage}</h2>
              <p>${cards.length} · ${money(total)}</p>
            </div>
            <eds-badge label="${cards.length}" variant="${stage === 'Closed won' ? 'success' : 'brand'}" pill></eds-badge>
          </header>
          <div class="kanban-list" data-drop="${stage}">
            ${cards
              .map(
                (deal) => `
              <article class="kanban-card" draggable="true" data-id="${deal.id}">
                <a href="#/deal/${deal.id}">${deal.name}</a>
                <p>${deal.account}</p>
                <div class="kanban-meta">
                  <strong>${deal.value}</strong>
                  <span>${deal.probability}%</span>
                </div>
                <small>${deal.owner} · ${deal.close}</small>
              </article>`,
              )
              .join('')}
          </div>
        </section>`;
    })
    .join('');

  return `
    ${pageHeader({
      eyebrow: 'Board',
      title: 'Pipeline',
      lead: 'Drag deals between stages. Weighted pipeline and next steps stay in view.',
      actions: `
        <eds-button id="pipe-focus" variant="secondary" icon="filter">My deals</eds-button>
        <eds-button id="pipe-deal" variant="primary" icon="plus">New deal</eds-button>
      `,
    })}
    <div class="kanban" id="kanban">${columns}</div>
  `;
}

export function renderDeals() {
  return `
    ${pageHeader({
      eyebrow: 'Opportunities',
      title: 'Deals',
      lead: 'Every open and closed opportunity, with saved views for the week.',
      actions: `
        <eds-button id="export-deals" variant="tertiary" icon="download">Export CSV</eds-button>
        <eds-button id="new-deal" variant="primary" icon="plus">New deal</eds-button>
      `,
    })}
    <section class="sheet">
      ${filterBar(`
        <eds-search id="deal-search" placeholder="Search deal or account" clearable></eds-search>
        <eds-segmented-control id="deal-view"></eds-segmented-control>
      `)}
      <div id="deal-table-wrap" class="mt-3">
        <eds-data-table id="deal-table" sortable striped compact></eds-data-table>
        <p id="deal-count" class="muted mt-3 mb-0"></p>
      </div>
      ${emptyState({
        id: 'deal-empty',
        heading: 'No deals match',
        description: 'Clear the view or search another account.',
        action: '<eds-button id="reset-deals" slot="actions" variant="primary">Reset filters</eds-button>',
      })}
    </section>
  `;
}

export function renderDealDetail(id) {
  const deal = deals.find((item) => item.id === id) ?? deals[0];
  const account = accounts.find((item) => item.id === deal.accountId);
  return `
    ${pageHeader({
      eyebrow: 'Deal',
      title: deal.name,
      lead: `${deal.account} · ${deal.value} · close ${deal.close}`,
      actions: `
        <eds-button id="deal-activity" variant="secondary" icon="calendar">Log activity</eds-button>
        <eds-button id="deal-advance" variant="primary" icon="check">Advance stage</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-8">
        <section class="sheet">
          <div class="deal-hero mb-3">
            <span class="kicker">Amount</span>
            <strong>${deal.value}</strong>
            <div>${statusChip(deal.stage)} · ${deal.probability}% · ${deal.source}</div>
          </div>
          <eds-progress-bar value="${deal.probability}" max="100" label="Win probability" show-value></eds-progress-bar>
          <eds-description-list id="deal-facts" class="mt-3"></eds-description-list>
          <p class="muted mt-3 mb-0">Next step: ${deal.next}. Owner ${deal.owner}.</p>
        </section>
        <section class="sheet mt-3">
          <div class="section-title"><h2>Buying committee</h2></div>
          <eds-data-table id="deal-contacts" compact striped></eds-data-table>
        </section>
      </div>
      <div class="col-lg-4">
        <section class="sheet">
          <div class="section-title"><h2>Account</h2></div>
          <p class="mb-1"><strong>${account?.name ?? deal.account}</strong></p>
          <p class="muted mb-1">${account?.industry ?? '—'} · ${account?.region ?? '—'}</p>
          <p class="muted">Health ${account?.health ?? '—'} · ARR ${account?.arr ?? '—'}</p>
          <eds-link href="#/account/${deal.accountId}" variant="default">Open account</eds-link>
        </section>
        <section class="sheet mt-3">
          <div class="section-title"><h2>Timeline</h2></div>
          <eds-timeline id="deal-timeline"></eds-timeline>
        </section>
      </div>
    </div>
  `;
}

export function renderLeads() {
  return `
    ${pageHeader({
      eyebrow: 'Inbound',
      title: 'Leads',
      lead: 'Score, qualify, and convert marketing leads into opportunities.',
      actions: `
        <eds-button id="import-leads" variant="secondary" icon="upload">Import</eds-button>
        <eds-button id="add-lead" variant="primary" icon="plus">Add lead</eds-button>
      `,
    })}
    <section class="sheet">
      ${filterBar(`
        <eds-search id="lead-search" placeholder="Search name or company" clearable></eds-search>
        <eds-segmented-control id="lead-status"></eds-segmented-control>
      `)}
      <div class="mt-3">
        <eds-data-table id="lead-table" sortable striped compact></eds-data-table>
        <p id="lead-count" class="muted mt-3 mb-0"></p>
      </div>
    </section>
  `;
}

export function renderContacts() {
  return `
    ${pageHeader({
      eyebrow: 'People',
      title: 'Contacts',
      lead: 'Champions, buyers, and influencers across the book.',
      actions: `<eds-button id="add-contact" variant="primary" icon="plus">Add contact</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="contact-search" placeholder="Search contact or account" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="contact-table" sortable striped compact></eds-data-table>
      </div>
    </section>
  `;
}

export function renderContactDetail(id) {
  const contact = contacts.find((item) => item.id === id) ?? contacts[0];
  return `
    ${pageHeader({
      eyebrow: 'Contact',
      title: contact.name,
      lead: `${contact.title} · ${contact.account}`,
      actions: `
        <eds-button id="con-mail" variant="secondary" icon="mail">Email</eds-button>
        <eds-button id="con-call" variant="primary" icon="plus">Log call</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-4">
        <section class="sheet">
          <eds-avatar name="${contact.name}" size="lg"></eds-avatar>
          <p class="mt-2 mb-1"><strong>${contact.title}</strong></p>
          <p class="muted mb-1">${contact.email}</p>
          <p class="muted">${contact.phone}</p>
          ${statusChip(contact.influence)}
        </section>
      </div>
      <div class="col-lg-8">
        <section class="sheet">
          <eds-tabs>
            <eds-tab label="Context" active>
              <eds-description-list id="con-facts"></eds-description-list>
            </eds-tab>
            <eds-tab label="Notes">
              <eds-textarea label="Internal note" rows="4" placeholder="Meeting notes, objections, or next steps."></eds-textarea>
              <eds-button class="mt-3" variant="secondary" icon="save">Save note</eds-button>
            </eds-tab>
            <eds-tab label="Activity">
              <eds-timeline id="con-activity"></eds-timeline>
            </eds-tab>
          </eds-tabs>
        </section>
      </div>
    </div>
  `;
}

export function renderAccounts() {
  return `
    ${pageHeader({
      eyebrow: 'Companies',
      title: 'Accounts',
      lead: 'Customer and prospect companies, health, and next steps.',
      actions: `<eds-button id="add-account" variant="primary" icon="plus">Add account</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="account-search" placeholder="Search account or owner" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="account-table" sortable striped compact></eds-data-table>
      </div>
    </section>
  `;
}

export function renderAccountDetail(id) {
  const account = accounts.find((item) => item.id === id) ?? accounts[0];
  return `
    ${pageHeader({
      eyebrow: 'Account',
      title: account.name,
      lead: `${account.industry} · ${account.region} · ${account.employees} employees`,
      actions: `
        <eds-button id="acc-deal" variant="primary" icon="plus">New deal</eds-button>
        <eds-button id="acc-note" variant="secondary" icon="edit">Add note</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-4">
        <section class="sheet">
          <p class="mb-1">${statusChip(account.health)}</p>
          <eds-description-list id="acc-facts"></eds-description-list>
        </section>
      </div>
      <div class="col-lg-8">
        <section class="sheet">
          <eds-tabs>
            <eds-tab label="Deals" active>
              <eds-data-table id="acc-deals" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Contacts">
              <eds-data-table id="acc-contacts" compact striped></eds-data-table>
            </eds-tab>
            <eds-tab label="Activity">
              <eds-timeline id="acc-activity"></eds-timeline>
            </eds-tab>
          </eds-tabs>
        </section>
      </div>
    </div>
  `;
}

export function renderActivities() {
  return `
    ${pageHeader({
      eyebrow: 'Cadence',
      title: 'Activities',
      lead: 'Calls, meetings, emails, and tasks that keep the book moving.',
      actions: `<eds-button id="log-activity" variant="primary" icon="plus">Log activity</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="activity-search" placeholder="Search title or person" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="activity-table" sortable striped compact></eds-data-table>
      </div>
    </section>
    <div class="row g-3 mt-1">
      <div class="col-lg-6">
        ${chartPanel({
          title: 'Mix this week',
          body: bars([40, 28, 22, 10], 'Calls, meetings, emails, tasks') + '<p class="muted mt-2 mb-0">40% calls · 28% meetings · 22% email · 10% tasks</p>',
        })}
      </div>
      <div class="col-lg-6">
        <section class="sheet">
          <div class="section-title"><h2>Due today</h2></div>
          <eds-list id="due-list" divided></eds-list>
        </section>
      </div>
    </div>
  `;
}

export function renderForecast() {
  return `
    ${pageHeader({
      eyebrow: 'Quota',
      title: 'Forecast',
      lead: `Commit, best case, and remaining gap for ${currentUser.name} this quarter.`,
    })}
    ${statGrid(forecast, 'fc')}
    <div class="row g-3 mt-1">
      <div class="col-lg-8">
        ${chartPanel({
          title: 'Coverage vs quota',
          body: sparkline([0.72, 0.78, 0.81, 0.88, 0.94, 1.02, 1.1, 1.18, 1.22, 1.31, 1.36, 1.4], 'Pipeline coverage ratio') + '<p class="muted mb-0 mt-2">Coverage climbed from 0.72× to 1.4× as Harbor and Fieldwork entered late stage.</p>',
        })}
      </div>
      <div class="col-lg-4">
        ${chartPanel({
          title: 'Category mix',
          body: `
            <div class="mix">
              <div><div class="d-flex justify-content-between"><strong>Commit</strong><span>$936k</span></div><div class="mix-track"><span style="width:78%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Best case</strong><span>$1.18M</span></div><div class="mix-track"><span style="width:98%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Pipeline</strong><span>$1.64M</span></div><div class="mix-track"><span style="width:100%"></span></div></div>
            </div>
          `,
        })}
      </div>
    </div>
  `;
}

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'RevOps',
      title: 'Reports',
      lead: 'Coverage, conversion, win/loss, and activity — ready for the weekly forecast call.',
    })}
    <div class="row g-3">
      ${reports
        .map(
          (item, index) => `
        <div class="col-lg-6">
          <section class="sheet">
            <span class="kicker">Report ${index + 1}</span>
            <h2 class="mt-2">${item.name}</h2>
            <p class="muted">${item.description}</p>
            <p class="muted">Owner ${item.owner} · ${item.updated}</p>
            <div class="inline-actions">
              <eds-button class="export-csv" variant="secondary" icon="download" data-name="${item.name}">CSV</eds-button>
              <eds-button class="export-pdf" variant="primary" icon="file" data-name="${item.name}">PDF</eds-button>
            </div>
          </section>
        </div>`,
        )
        .join('')}
    </div>
  `;
}

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Workspace',
      title: 'Settings',
      lead: 'Team, pipeline stages, notifications, and forecast categories.',
    })}
    <div class="row g-3">
      <div class="col-lg-6">
        ${formSection({
          title: 'Workspace',
          body: `
            <eds-input label="Workspace name" value="${workspaceName}" icon="edit"></eds-input>
            <eds-input label="Fiscal year" value="FY26"></eds-input>
            <eds-select id="currency" label="Currency"></eds-select>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Pipeline',
          body: `
            <eds-switch label="Require next step on every open deal" checked></eds-switch>
            <eds-switch label="Warn when a deal is idle 14 days" checked></eds-switch>
            <eds-switch label="Auto-create follow-up after a meeting" checked></eds-switch>
            <eds-input label="Default cycle length" value="45 days"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'Notifications',
          body: `
            <eds-switch label="Daily digest of due activities" checked></eds-switch>
            <eds-switch label="Slack #revenue on closed-won" checked></eds-switch>
            <eds-switch label="Alert owner when a champion goes quiet" checked></eds-switch>
            <eds-button id="save-settings" variant="primary" icon="save">Save settings</eds-button>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${formSection({
          title: 'You',
          body: `
            <eds-input label="Name" value="${currentUser.name}"></eds-input>
            <eds-input label="Role" value="${currentUser.role}"></eds-input>
            <eds-input label="Quota" value="${currentUser.quota}"></eds-input>
          `,
        })}
      </div>
    </div>
  `;
}

export function renderView(route) {
  if (route.name === 'deal') return renderDealDetail(route.id);
  if (route.name === 'contact') return renderContactDetail(route.id);
  if (route.name === 'account') return renderAccountDetail(route.id);
  const pages = {
    overview: renderOverview,
    pipeline: renderPipeline,
    deals: renderDeals,
    leads: renderLeads,
    contacts: renderContacts,
    accounts: renderAccounts,
    activities: renderActivities,
    forecast: renderForecast,
    reports: renderReports,
    settings: renderSettings,
  };
  return (pages[route.name] ?? renderOverview)();
}

function filteredDeals() {
  const query = viewState.dealQuery.trim().toLowerCase();
  return deals.filter((row) => {
    const viewOk =
      viewState.dealView === 'all' ||
      (viewState.dealView === 'mine' && row.owner === currentUser.name) ||
      (viewState.dealView === 'closing' && row.close <= '2026-09-30' && row.stage !== 'Closed won') ||
      (viewState.dealView === 'risk' && row.probability > 0 && row.probability < 40);
    const queryOk = !query || `${row.name} ${row.account}`.toLowerCase().includes(query);
    return viewOk && queryOk;
  });
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) {
    hydrateStats(root, kpis, 'kpi');
    const table = root.querySelector('#hot-deals');
    if (table) {
      table.columns = dealColumns.filter((col) => !['probability'].includes(col.key));
      table.rows = dealRows(deals.filter((item) => item.stage !== 'Closed won').slice(0, 5));
    }
    const timeline = root.querySelector('#activity-feed');
    if (timeline) timeline.items = activityFeed;
    const period = root.querySelector('#dash-period');
    if (period) {
      period.options = [
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
        { label: 'Quarter', value: 'quarter' },
      ];
      period.value = 'quarter';
      period.addEventListener('eds-change', (event) => {
        const label = event.detail?.value ?? 'quarter';
        showToast({ message: `Dashboard set to this ${label}`, variant: 'info' });
      });
    }
    root.querySelector('#insight-act')?.addEventListener('eds-click', () => {
      showToast({ message: 'Hold placed with Meera Poluru at 16:20', variant: 'success' });
    });
    root.querySelector('#insight-dismiss')?.addEventListener('eds-click', () => {
      const banner = root.querySelector('#insight-banner');
      if (banner) banner.hidden = true;
    });
    root.querySelectorAll('.agenda-done').forEach((button) => {
      button.addEventListener('eds-click', () => {
        button.closest('li')?.remove();
        showToast({ message: 'Marked complete on Aisha Poluru’s agenda', variant: 'success' });
      });
    });
    root.querySelector('#qa-deal')?.addEventListener('eds-click', () => document.querySelector('#deal-modal')?.show());
    root.querySelector('#qa-activity')?.addEventListener('eds-click', () => {
      window.location.hash = '#/activities';
    });
    root.querySelector('#qa-lead')?.addEventListener('eds-click', () => {
      window.location.hash = '#/leads';
    });
    table?.addEventListener('click', () => {
      window.location.hash = '#/deal/deal_harbor';
    });
  }

  if (route.name === 'pipeline') {
    bindKanban(root);
    root.querySelector('#pipe-deal')?.addEventListener('eds-click', () => document.querySelector('#deal-modal')?.show());
    root.querySelector('#pipe-focus')?.addEventListener('eds-click', () => {
      showToast({ message: 'Board filtered to your deals', variant: 'info' });
    });
  }

  if (route.name === 'deals') {
    const paint = () => {
      const rows = dealRows(filteredDeals());
      const table = root.querySelector('#deal-table');
      const empty = root.querySelector('#deal-empty');
      const wrap = root.querySelector('#deal-table-wrap');
      if (table) {
        table.columns = dealColumns;
        table.rows = rows;
      }
      const count = root.querySelector('#deal-count');
      if (count) count.textContent = `${rows.length} deals · open a row for the record`;
      const none = rows.length === 0;
      if (empty) empty.hidden = !none;
      if (wrap) wrap.hidden = none;
    };
    const seg = root.querySelector('#deal-view');
    if (seg) {
      seg.options = [
        { label: 'All', value: 'all' },
        { label: 'Mine', value: 'mine' },
        { label: 'Closing', value: 'closing' },
        { label: 'At risk', value: 'risk' },
      ];
      seg.value = viewState.dealView;
      seg.addEventListener('eds-change', (event) => {
        viewState.dealView = event.detail?.value ?? event.target.value ?? 'all';
        paint();
      });
    }
    paint();
    root.querySelector('#deal-search')?.addEventListener('eds-input', (event) => {
      viewState.dealQuery = event.detail?.value ?? event.target.value ?? '';
      paint();
    });
    root.querySelector('#reset-deals')?.addEventListener('eds-click', () => {
      viewState.dealQuery = '';
      viewState.dealView = 'all';
      paint();
    });
    root.querySelector('#new-deal')?.addEventListener('eds-click', () => document.querySelector('#deal-modal')?.show());
    root.querySelector('#export-deals')?.addEventListener('eds-click', () => {
      showToast({ message: 'Deal CSV exported', variant: 'success' });
    });
    root.querySelector('#deal-table')?.addEventListener('click', () => {
      window.location.hash = '#/deal/deal_harbor';
    });
  }

  if (route.name === 'deal') {
    const deal = deals.find((item) => item.id === route.id) ?? deals[0];
    const facts = root.querySelector('#deal-facts');
    if (facts) {
      facts.items = [
        { term: 'Stage', description: deal.stage },
        { term: 'Owner', description: deal.owner },
        { term: 'Close date', description: deal.close },
        { term: 'Source', description: deal.source },
        { term: 'Next step', description: deal.next },
      ];
      facts.columns = 2;
    }
    const table = root.querySelector('#deal-contacts');
    if (table) {
      table.columns = contactColumns.filter((col) => ['name', 'title', 'influence', 'last'].includes(col.key));
      table.rows = contacts.filter((item) => item.accountId === deal.accountId);
    }
    const timeline = root.querySelector('#deal-timeline');
    if (timeline) timeline.items = activityFeed;
    root.querySelector('#deal-activity')?.addEventListener('eds-click', () => {
      window.location.hash = '#/activities';
    });
    root.querySelector('#deal-advance')?.addEventListener('eds-click', () => {
      const index = stages.indexOf(deal.stage);
      if (index >= 0 && index < stages.length - 1) {
        deal.stage = stages[index + 1];
        showToast({ message: `Moved to ${deal.stage}`, variant: 'success' });
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      } else {
        showToast({ message: 'Already at Closed won', variant: 'info' });
      }
    });
  }

  if (route.name === 'leads') {
    const table = root.querySelector('#lead-table');
    const paint = () => {
      const query = viewState.leadQuery.trim().toLowerCase();
      const rows = leads.filter((row) => {
        const statusOk = viewState.leadStatus === 'all' || row.status.toLowerCase() === viewState.leadStatus;
        const queryOk = !query || `${row.name} ${row.company}`.toLowerCase().includes(query);
        return statusOk && queryOk;
      });
      if (table) {
        table.columns = leadColumns;
        table.rows = rows;
      }
      const count = root.querySelector('#lead-count');
      if (count) count.textContent = `${rows.length} leads · convert from the drawer`;
    };
    const seg = root.querySelector('#lead-status');
    if (seg) {
      seg.options = [
        { label: 'All', value: 'all' },
        { label: 'New', value: 'new' },
        { label: 'Working', value: 'working' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Unqualified', value: 'unqualified' },
      ];
      seg.value = viewState.leadStatus;
      seg.addEventListener('eds-change', (event) => {
        viewState.leadStatus = (event.detail?.value ?? 'all').toLowerCase();
        paint();
      });
    }
    paint();
    root.querySelector('#lead-search')?.addEventListener('eds-input', (event) => {
      viewState.leadQuery = event.detail?.value ?? '';
      paint();
    });
    root.querySelector('#add-lead')?.addEventListener('eds-click', () => document.querySelector('#lead-modal')?.show());
    root.querySelector('#import-leads')?.addEventListener('eds-click', () => {
      showToast({ message: 'CSV import queued', variant: 'info' });
    });
    table?.addEventListener('click', () => document.querySelector('#convert-drawer')?.show());
  }

  if (route.name === 'contacts') {
    const table = root.querySelector('#contact-table');
    const paint = (query = '') => {
      if (!table) return;
      table.columns = contactColumns;
      table.rows = contacts.filter((row) => `${row.name} ${row.account}`.toLowerCase().includes(query.toLowerCase()));
    };
    paint();
    root.querySelector('#contact-search')?.addEventListener('eds-input', (event) => paint(event.detail?.value ?? ''));
    root.querySelector('#add-contact')?.addEventListener('eds-click', () => {
      showToast({ message: 'Contact form opened in the workspace', variant: 'info' });
    });
    table?.addEventListener('click', () => {
      window.location.hash = '#/contact/con_meera';
    });
  }

  if (route.name === 'contact') {
    const contact = contacts.find((item) => item.id === route.id) ?? contacts[0];
    const facts = root.querySelector('#con-facts');
    if (facts) {
      facts.items = [
        { term: 'Account', description: contact.account },
        { term: 'Influence', description: contact.influence },
        { term: 'Last touch', description: contact.last },
        { term: 'Phone', description: contact.phone },
      ];
    }
    const timeline = root.querySelector('#con-activity');
    if (timeline) timeline.items = activityFeed;
    root.querySelector('#con-mail')?.addEventListener('eds-click', () => showToast({ message: `Draft to ${contact.email}`, variant: 'info' }));
    root.querySelector('#con-call')?.addEventListener('eds-click', () => showToast({ message: 'Call logged', variant: 'success' }));
  }

  if (route.name === 'accounts') {
    const table = root.querySelector('#account-table');
    const paint = (query = '') => {
      if (!table) return;
      table.columns = accountColumns;
      table.rows = accounts.filter((row) => `${row.name} ${row.owner}`.toLowerCase().includes(query.toLowerCase()));
    };
    paint();
    root.querySelector('#account-search')?.addEventListener('eds-input', (event) => paint(event.detail?.value ?? ''));
    root.querySelector('#add-account')?.addEventListener('eds-click', () => {
      showToast({ message: 'Account form opened in the workspace', variant: 'info' });
    });
    table?.addEventListener('click', () => {
      window.location.hash = '#/account/acc_harbor';
    });
  }

  if (route.name === 'account') {
    const account = accounts.find((item) => item.id === route.id) ?? accounts[0];
    const facts = root.querySelector('#acc-facts');
    if (facts) {
      facts.items = [
        { term: 'Owner', description: account.owner },
        { term: 'ARR', description: account.arr },
        { term: 'Employees', description: account.employees },
        { term: 'Next', description: account.next },
      ];
    }
    const dealTable = root.querySelector('#acc-deals');
    if (dealTable) {
      dealTable.columns = dealColumns.filter((col) => ['name', 'value', 'stage', 'close'].includes(col.key));
      dealTable.rows = dealRows(deals.filter((item) => item.accountId === account.id));
    }
    const contactTable = root.querySelector('#acc-contacts');
    if (contactTable) {
      contactTable.columns = contactColumns.filter((col) => ['name', 'title', 'influence'].includes(col.key));
      contactTable.rows = contacts.filter((item) => item.accountId === account.id);
    }
    const timeline = root.querySelector('#acc-activity');
    if (timeline) timeline.items = activityFeed;
    root.querySelector('#acc-deal')?.addEventListener('eds-click', () => document.querySelector('#deal-modal')?.show());
    root.querySelector('#acc-note')?.addEventListener('eds-click', () => showToast({ message: 'Note saved on the account', variant: 'success' }));
  }

  if (route.name === 'activities') {
    const table = root.querySelector('#activity-table');
    const paint = (query = '') => {
      if (!table) return;
      table.columns = activityColumns;
      table.rows = activities.filter((row) => `${row.title} ${row.with}`.toLowerCase().includes(query.toLowerCase()));
    };
    paint();
    root.querySelector('#activity-search')?.addEventListener('eds-input', (event) => paint(event.detail?.value ?? ''));
    root.querySelector('#log-activity')?.addEventListener('eds-click', () => document.querySelector('#activity-modal')?.show());
    const list = root.querySelector('#due-list');
    if (list) {
      list.items = activities
        .filter((item) => item.status === 'Due today' || item.status === 'Blocked')
        .map((item) => ({ label: item.title, description: `${item.with} · ${item.when}`, icon: item.status === 'Blocked' ? 'alert-triangle' : 'clock' }));
    }
  }

  if (route.name === 'forecast') {
    hydrateStats(root, forecast, 'fc');
  }

  if (route.name === 'reports') {
    root.querySelectorAll('.export-csv, .export-pdf').forEach((button) => {
      button.addEventListener('eds-click', () => {
        showToast({
          message: `${button.dataset.name} ${button.classList.contains('export-pdf') ? 'PDF' : 'CSV'} ready`,
          variant: 'success',
        });
      });
    });
  }

  if (route.name === 'settings') {
    const currency = root.querySelector('#currency');
    if (currency) {
      currency.options = [
        { label: 'USD', value: 'usd' },
        { label: 'EUR', value: 'eur' },
        { label: 'GBP', value: 'gbp' },
        { label: 'INR', value: 'inr' },
      ];
      currency.value = 'usd';
    }
    root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
      showToast({ message: 'Workspace settings saved', variant: 'success' });
    });
  }
}

function bindKanban(root) {
  const board = root.querySelector('#kanban');
  if (!board) return;
  let dragging = null;

  board.querySelectorAll('.kanban-card').forEach((card) => {
    card.addEventListener('dragstart', () => {
      dragging = card.dataset.id;
      card.classList.add('is-dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      dragging = null;
    });
  });

  board.querySelectorAll('[data-drop]').forEach((column) => {
    column.addEventListener('dragover', (event) => {
      event.preventDefault();
      column.classList.add('is-over');
    });
    column.addEventListener('dragleave', () => column.classList.remove('is-over'));
    column.addEventListener('drop', (event) => {
      event.preventDefault();
      column.classList.remove('is-over');
      const deal = deals.find((item) => item.id === dragging);
      if (!deal) return;
      deal.stage = column.dataset.drop;
      showToast({ message: `${deal.name} moved to ${deal.stage}`, variant: 'success' });
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  });
}
