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
  searchableRecords,
  sourceMix,
  stages,
  teamBoard,
  workspaceName,
} from '../data/index.js';
import { searchRecords } from '../lib/search.js';
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
} from '../components/widgets.js';
import { viewState } from './state.js';
import { renderOverview } from './overview.js';
import { renderPipeline } from './pipeline.js';
import { renderDeals, renderDealDetail } from './deals.js';
import { renderLeads } from './leads.js';
import { renderContacts, renderContactDetail } from './contacts.js';
import { renderAccounts, renderAccountDetail } from './accounts.js';
import { renderActivities } from './activities.js';
import { renderForecast } from './forecast.js';
import { renderReports } from './reports.js';
import { renderSettings } from './settings.js';
import { renderSearch } from './search.js';

export { viewState };

export function dealRows(list = deals) {
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















export function renderView(route) {
  if (route.name === 'deal') return renderDealDetail(route.id);
  if (route.name === 'contact') return renderContactDetail(route.id);
  if (route.name === 'account') return renderAccountDetail(route.id);
  if (route.name === 'search') return renderSearch();
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

  if (route.name === 'search') {
    const paint = () => {
      const hits = searchRecords(searchableRecords(), viewState.searchQuery, ['type', 'name', 'detail', 'owner']);
      const wrap = root.querySelector('#search-results');
      const meta = root.querySelector('#search-meta');
      const empty = root.querySelector('#search-empty');
      if (meta) meta.textContent = hits.length ? `${hits.length} records · Aug–Sep 2026 book` : 'Start typing to search the CRM';
      if (wrap) {
        wrap.innerHTML = hits
          .map(
            (item) => `
          <a class="search-hit" href="${item.href}">
            <eds-badge label="${item.type}" variant="brand" pill></eds-badge>
            <span><strong>${item.name}</strong><small>${item.detail}</small></span>
            <small>${item.owner}</small>
          </a>`,
          )
          .join('');
      }
      if (empty) empty.hidden = hits.length > 0 || !viewState.searchQuery.trim();
    };
    paint();
    root.querySelector('#global-record-search')?.addEventListener('eds-input', (event) => {
      viewState.searchQuery = event.detail?.value ?? '';
      paint();
    });
    root.querySelector('#search-reset')?.addEventListener('eds-click', () => {
      viewState.searchQuery = '';
      paint();
    });
    root.querySelector('#search-cmd')?.addEventListener('eds-click', () => {
      document.querySelector('#command-modal')?.show();
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
