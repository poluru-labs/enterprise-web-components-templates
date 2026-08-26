import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './style.css';
import {
  accounts,
  commandItems,
  currentUser,
  inboxItems,
  navGroups,
  pinnedDeal,
  productLine,
  productName,
  workspaceName,
} from './data.js';
import { hydrateView, renderView } from './views.js';

const app = document.querySelector('#app');

const titles = {
  overview: 'Overview',
  pipeline: 'Pipeline',
  deals: 'Deals',
  deal: 'Deal',
  leads: 'Leads',
  contacts: 'Contacts',
  contact: 'Contact',
  accounts: 'Accounts',
  account: 'Account',
  activities: 'Activities',
  forecast: 'Forecast',
  reports: 'Reports',
  settings: 'Settings',
};

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

function crumbText(route) {
  if (route.name === 'deal') return `Pipeline / Deals / ${route.id}`;
  if (route.name === 'contact') return `People / Contacts / ${route.id}`;
  if (route.name === 'account') return `Companies / Accounts / ${route.id}`;
  return `${workspaceName} / ${titles[route.name] || 'Overview'}`;
}

function activeHref(route) {
  if (route.name === 'deal') return '#/deals';
  if (route.name === 'contact') return '#/contacts';
  if (route.name === 'account') return '#/accounts';
  return `#/${route.name || 'overview'}`;
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function renderShell() {
  app.innerHTML = `
    <div class="crm-shell">
      <aside class="crm-sidebar" id="crm-sidebar" aria-label="Dashboard">
        <div class="sidebar-head">
          <a class="wordmark" href="#/overview">
            <span class="brand-mark" aria-hidden="true">L</span>
            <span class="brand-copy">
              <strong>${productName}</strong>
              <small>${productLine} · ${workspaceName}</small>
            </span>
          </a>
          <button class="sidebar-collapse" id="sidebar-collapse" type="button" aria-label="Collapse sidebar">
            <i class="bi bi-layout-sidebar" aria-hidden="true"></i>
          </button>
        </div>
        <div class="sidebar-tools">
          <button class="sidebar-jump" id="sidebar-jump" type="button">
            <i class="bi bi-search" aria-hidden="true"></i>
            <span>Jump to a record</span>
          </button>
          <button class="sidebar-compose" id="sidebar-compose" type="button">
            <i class="bi bi-plus-lg" aria-hidden="true"></i>
            <span>New deal</span>
          </button>
        </div>
        <div class="sidebar-scroll" id="side-nav"></div>
        <article class="sidebar-pin">
          <p class="nav-group-label">Pinned</p>
          <a class="pin-card" href="#/deal/${pinnedDeal.id}">
            <strong>${pinnedDeal.name}</strong>
            <span>${pinnedDeal.account} · ${pinnedDeal.value}</span>
            <em>${pinnedDeal.stage} · ${pinnedDeal.owner}</em>
          </a>
        </article>
        <div class="sidebar-foot">
          <div class="quota-meter" aria-label="Quota attained">
            <div class="quota-meter-copy">
              <span>Quota</span>
              <strong>${currentUser.attained}</strong>
            </div>
            <div class="quota-track"><span style="width:${currentUser.attained}"></span></div>
            <p>FY26 Q3 · ${currentUser.quota}</p>
          </div>
          <div class="sidebar-user">
            <span class="avatar" aria-hidden="true">${initials(currentUser.name)}</span>
            <span class="brand-copy">
              <strong>${currentUser.name}</strong>
              <small>${currentUser.role}</small>
            </span>
          </div>
        </div>
      </aside>
      <div class="crm-main">
        <header class="crm-topbar">
          <div class="topbar-start">
            <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu">
              <i class="bi bi-list" aria-hidden="true"></i>
              <span>Menu</span>
            </button>
            <p class="crumb-line" id="crumbs"></p>
          </div>
          <label class="topbar-search">
            <span class="visually-hidden">Search the CRM</span>
            <i class="bi bi-search" aria-hidden="true"></i>
            <input id="global-search" type="search" placeholder="Find a deal, lead, or account" autocomplete="off" />
          </label>
          <div class="topbar-end">
            <button class="icon-btn" id="notify-btn" type="button" aria-label="Notifications">
              <i class="bi bi-bell" aria-hidden="true"></i>
              <span class="notify-dot" aria-hidden="true"></span>
            </button>
            <eds-button id="quick-deal" variant="primary" icon="plus">New deal</eds-button>
            <div class="dock-profile-wrap">
              <button class="dock-profile" id="profile-btn" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="profile-menu">
                <span class="avatar" aria-hidden="true">${initials(currentUser.name)}</span>
                <span class="profile-copy">
                  <strong>${currentUser.name}</strong>
                  <small>${currentUser.role}</small>
                </span>
                <i class="bi bi-caret-down-fill" aria-hidden="true"></i>
              </button>
              <div class="profile-menu" id="profile-menu" role="menu" hidden>
                <p class="profile-menu-head">
                  <strong>${currentUser.name}</strong>
                  <span>${currentUser.email}</span>
                </p>
                <button type="button" role="menuitem" id="inbox-btn">Sales inbox</button>
                <a href="#/settings" role="menuitem">Workspace settings</a>
                <button type="button" role="menuitem" id="signout-btn">Sign out</button>
              </div>
            </div>
          </div>
        </header>
        <main id="view" tabindex="-1"></main>
      </div>
    </div>
    <button class="crm-backdrop" id="crm-backdrop" type="button" aria-label="Close navigation" hidden></button>
    <eds-drawer id="inbox-drawer" heading="Sales inbox" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-drawer id="convert-drawer" heading="Convert lead" side="right" size="md">
      <p class="kicker mb-1">Qualified</p>
      <h2>Hana Poluru</h2>
      <p class="muted">Fold Paper Co · score 91 · partner sourced</p>
      <p>Create a contact, account, and discovery deal from this lead. Owner stays Aisha Poluru.</p>
      <div slot="footer" class="inline-actions">
        <eds-button id="confirm-convert" variant="primary">Convert</eds-button>
        <eds-button id="close-convert" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="deal-modal" heading="New deal" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input id="deal-name" label="Deal name" placeholder="Harbor platform expansion" icon="star"></eds-input>
        <eds-select id="deal-account" label="Account"></eds-select>
        <eds-select id="deal-stage" label="Stage"></eds-select>
        <eds-number-input id="deal-amount" label="Amount (USD)" value="24000" min="0" max="5000000" step="100"></eds-number-input>
        <eds-textarea label="Next step" rows="3" placeholder="Discovery call, security review, or legal."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-deal" variant="primary">Create deal</eds-button>
        <eds-button id="close-deal" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="lead-modal" heading="Add lead" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Name" placeholder="Elena Poluru" icon="user"></eds-input>
        <eds-input label="Company" placeholder="Lattice Energy"></eds-input>
        <eds-input label="Email" placeholder="name@company.example" icon="mail"></eds-input>
        <eds-select id="lead-source" label="Source"></eds-select>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-lead" variant="primary">Save lead</eds-button>
        <eds-button id="close-lead" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="activity-modal" heading="Log activity" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-select id="activity-type" label="Type"></eds-select>
        <eds-input label="Title" placeholder="Harbor legal walkthrough"></eds-input>
        <eds-textarea label="Notes" rows="3" placeholder="Outcome and next step."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-activity" variant="primary">Log activity</eds-button>
        <eds-button id="close-activity" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
      <eds-list id="command-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-command" variant="tertiary">Close</eds-button>
      </div>
    </eds-modal>
  `;
}

function paintNav(route) {
  const nav = document.querySelector('#side-nav');
  if (!nav) return;
  const current = activeHref(route);
  nav.innerHTML = navGroups
    .map(
      (group) => `
        <p class="nav-group-label">${group.label}</p>
        <nav class="side-nav" aria-label="${group.label}">
          ${group.items
            .map((item) => {
              const active = item.href === current;
              return `
                <a class="side-link${active ? ' is-active' : ''}" href="${item.href}" ${active ? 'aria-current="page"' : ''} title="${item.label}">
                  <i class="bi ${item.icon}" aria-hidden="true"></i>
                  <span class="side-link-copy">${item.label}</span>
                  ${item.badge ? `<span class="side-badge">${item.badge}</span>` : ''}
                </a>`;
            })
            .join('')}
        </nav>`,
    )
    .join('');
}

function setSidebarOpen(open) {
  document.body.classList.toggle('nav-open', open);
  const backdrop = document.querySelector('#crm-backdrop');
  if (backdrop) backdrop.hidden = !open;
}

function hydrateShell() {
  const account = document.querySelector('#deal-account');
  if (account) {
    account.options = accounts.map((item) => ({ label: item.name, value: item.id }));
    account.value = accounts[0].id;
  }
  const stage = document.querySelector('#deal-stage');
  if (stage) {
    stage.options = [
      { label: 'Qualify', value: 'Qualify' },
      { label: 'Discovery', value: 'Discovery' },
      { label: 'Proposal', value: 'Proposal' },
      { label: 'Negotiation', value: 'Negotiation' },
    ];
    stage.value = 'Qualify';
  }
  const source = document.querySelector('#lead-source');
  if (source) {
    source.options = [
      { label: 'Inbound', value: 'inbound' },
      { label: 'Outbound', value: 'outbound' },
      { label: 'Webinar', value: 'webinar' },
      { label: 'Partner', value: 'partner' },
      { label: 'Event', value: 'event' },
    ];
    source.value = 'inbound';
  }
  const activityType = document.querySelector('#activity-type');
  if (activityType) {
    activityType.options = [
      { label: 'Call', value: 'call' },
      { label: 'Meeting', value: 'meeting' },
      { label: 'Email', value: 'email' },
      { label: 'Task', value: 'task' },
    ];
    activityType.value = 'call';
  }
  const inbox = document.querySelector('#inbox-list');
  if (inbox) inbox.items = inboxItems;

  const search = document.querySelector('#global-search');
  const profileBtn = document.querySelector('#profile-btn');
  const profileMenu = document.querySelector('#profile-menu');

  function setProfileOpen(open) {
    if (!profileBtn || !profileMenu) return;
    profileMenu.hidden = !open;
    profileBtn.setAttribute('aria-expanded', String(open));
  }

  function runSearch(value) {
    const query = value.trim().toLowerCase();
    const list = document.querySelector('#command-list');
    if (list) {
      list.items = commandItems.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(query) || !query);
    }
    document.querySelector('#command-modal')?.show();
  }

  document.querySelector('#nav-toggle')?.addEventListener('click', () => setSidebarOpen(true));
  document.querySelector('#crm-backdrop')?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('#sidebar-collapse')?.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-collapsed');
    const collapsed = document.body.classList.contains('sidebar-collapsed');
    document.querySelector('#sidebar-collapse')?.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  });
  document.querySelector('#side-nav')?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('#sidebar-jump')?.addEventListener('click', () => {
    document.querySelector('#global-search')?.focus();
    runSearch('');
  });
  document.querySelector('#sidebar-compose')?.addEventListener('click', () => document.querySelector('#deal-modal')?.show());
  search?.addEventListener('focus', () => setProfileOpen(false));
  search?.addEventListener('input', () => {
    if (search.value.trim()) runSearch(search.value);
  });
  search?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runSearch(search.value);
    }
  });
  document.querySelector('#command-list')?.addEventListener('eds-select', (event) => {
    const item = commandItems.find((entry) => entry.label === event.detail?.label);
    document.querySelector('#command-modal')?.close();
    if (item) window.location.hash = item.href;
  });
  profileBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    setProfileOpen(profileMenu?.hidden);
  });
  document.querySelector('#notify-btn')?.addEventListener('click', () => document.querySelector('#inbox-drawer')?.show());
  document.querySelector('#inbox-btn')?.addEventListener('click', () => {
    setProfileOpen(false);
    document.querySelector('#inbox-drawer')?.show();
  });
  document.querySelector('#signout-btn')?.addEventListener('click', () => {
    setProfileOpen(false);
    showToast({ message: 'Signed out of the demo workspace', variant: 'warning' });
  });
  profileMenu?.querySelector('a')?.addEventListener('click', () => setProfileOpen(false));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dock-profile-wrap')) setProfileOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setProfileOpen(false);
      setSidebarOpen(false);
    }
  });
  document.querySelector('#quick-deal')?.addEventListener('eds-click', () => document.querySelector('#deal-modal')?.show());
  document.querySelector('#save-deal')?.addEventListener('eds-click', () => {
    document.querySelector('#deal-modal')?.close();
    showToast({ message: 'Deal created in Qualify', variant: 'success' });
    window.location.hash = '#/pipeline';
  });
  document.querySelector('#close-deal')?.addEventListener('eds-click', () => document.querySelector('#deal-modal')?.close());
  document.querySelector('#save-lead')?.addEventListener('eds-click', () => {
    document.querySelector('#lead-modal')?.close();
    showToast({ message: 'Lead added to the queue', variant: 'success' });
  });
  document.querySelector('#close-lead')?.addEventListener('eds-click', () => document.querySelector('#lead-modal')?.close());
  document.querySelector('#save-activity')?.addEventListener('eds-click', () => {
    document.querySelector('#activity-modal')?.close();
    showToast({ message: 'Activity logged', variant: 'success' });
  });
  document.querySelector('#close-activity')?.addEventListener('eds-click', () => document.querySelector('#activity-modal')?.close());
  document.querySelector('#close-inbox')?.addEventListener('eds-click', () => document.querySelector('#inbox-drawer')?.close());
  document.querySelector('#close-convert')?.addEventListener('eds-click', () => document.querySelector('#convert-drawer')?.close());
  document.querySelector('#confirm-convert')?.addEventListener('eds-click', () => {
    document.querySelector('#convert-drawer')?.close();
    showToast({ message: 'Lead converted to a discovery deal', variant: 'success' });
    window.location.hash = '#/pipeline';
  });
  document.querySelector('#close-command')?.addEventListener('eds-click', () => document.querySelector('#command-modal')?.close());
}

function renderRoute() {
  const route = parseRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  paintNav(route);
  const crumbs = document.querySelector('#crumbs');
  if (crumbs) crumbs.textContent = crumbText(route);
  setSidebarOpen(false);
  const view = document.querySelector('#view');
  if (!view) return;
  try {
    view.innerHTML = renderView(route);
    hydrateView(view, route);
  } catch (error) {
    view.innerHTML = `<section class="sheet"><h1>This page could not load</h1><p class="muted">${error.message}</p></section>`;
    console.error(error);
  }
  view.scrollTop = 0;
  document.title = `${titles[route.name] || 'Overview'} · ${productName} CRM`;
}

setDensity('comfortable');
renderShell();
hydrateShell();
renderRoute();
window.addEventListener('hashchange', renderRoute);
