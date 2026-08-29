import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './style.css';
import {
  commandItems,
  createSteps,
  currentUser,
  inboxItems,
  navItems,
  people,
  productLine,
  productName,
  scorecards,
  workspaceName,
} from './data.js';
import { themeCards } from './ui.js';
import { hydrateView, renderView } from './views.js';

const app = document.querySelector('#app');

const titles = {
  overview: 'Overview',
  scorecards: 'Scorecards',
  scorecard: 'Scorecard',
  goals: 'Goals',
  trends: 'Trends',
  teams: 'Teams',
  alerts: 'Alerts',
  reviews: 'Reviews',
  benchmarks: 'Benchmarks',
  reports: 'Reports',
  settings: 'Settings',
};

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

function activeHref(route) {
  if (route.name === 'scorecard') return '#/scorecards';
  return `#/${route.name || 'overview'}`;
}

function crumbItems(route) {
  if (route.name === 'scorecard') {
    const card = scorecards.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Scorecards', href: '#/scorecards' },
      { label: card?.name || 'Scorecard', current: true },
    ];
  }
  return [
    { label: workspaceName, href: '#/overview' },
    { label: titles[route.name] || 'Overview', current: true },
  ];
}

function renderShell() {
  app.innerHTML = `
    <div class="sig-shell">
      <aside class="sig-sidebar" id="sig-sidebar" aria-label="Dashboard">
        <div class="sidebar-head">
          <a class="wordmark" href="#/overview">
            <span class="brand-mark" aria-hidden="true">S</span>
            <span class="brand-copy">
              <strong>${productName}</strong>
              <small>${productLine}</small>
            </span>
          </a>
          <button class="sidebar-hide" id="sidebar-close" type="button" aria-label="Hide sidebar">
            <i class="bi bi-chevron-left" aria-hidden="true"></i>
          </button>
        </div>
        <eds-side-nav id="side-nav"></eds-side-nav>
        <div class="sidebar-foot">
          <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
          <span class="brand-copy">
            <strong>${currentUser.name}</strong>
            <small>${currentUser.role}</small>
          </span>
        </div>
      </aside>
      <div class="sig-main">
        <header class="sig-header">
          <eds-toolbar>
            <div slot="start" class="header-start">
              <eds-tooltip content="Show sidebar">
                <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
              </eds-tooltip>
              <a class="header-brand" href="#/overview">
                <span class="brand-mark" aria-hidden="true">S</span>
                <span class="brand-copy">
                  <strong>${productName}</strong>
                  <small>${workspaceName}</small>
                </span>
              </a>
              <eds-breadcrumb id="crumbs"></eds-breadcrumb>
            </div>
            <div slot="center" class="header-search">
              <eds-visually-hidden>Search scorecards</eds-visually-hidden>
              <eds-search id="global-search" placeholder="Find a KPI, goal, or owner" clearable></eds-search>
            </div>
            <div slot="end" class="header-end">
              <span class="header-kbd"><eds-kbd keys="⌘K"></eds-kbd></span>
              <eds-tooltip content="Inbox" placement="bottom">
                <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
              </eds-tooltip>
              <eds-popover id="status-pop" heading="Quarter" placement="bottom">
                <eds-button slot="trigger" variant="tertiary" icon="info" icon-only accessible-label="Plan status"></eds-button>
                <eds-status label="Q3 ahead of plan" variant="success" pulse></eds-status>
                <p class="muted mb-0 mt-2">Operations fulfillment is the only red item.</p>
              </eds-popover>
              <eds-button id="header-alert" variant="primary" icon="plus">New alert</eds-button>
              <eds-dropdown-menu id="profile-menu" placement="left">
                <button slot="trigger" class="profile-trigger" type="button">
                  <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
                  <span class="profile-copy">
                    <strong>${currentUser.name}</strong>
                    <small>${currentUser.role}</small>
                  </span>
                  <eds-icon name="chevron-down" size="sm"></eds-icon>
                </button>
                <eds-menu-item label="Inbox" value="inbox" icon="bell"></eds-menu-item>
                <eds-menu-item label="Settings" value="settings" icon="settings"></eds-menu-item>
                <eds-menu-item label="Sign out" value="signout" icon="external-link" danger></eds-menu-item>
              </eds-dropdown-menu>
            </div>
          </eds-toolbar>
        </header>
        <main id="view" tabindex="-1"></main>
      </div>
    </div>
    <button class="sig-backdrop" id="sig-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
    <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-drawer id="filter-drawer" heading="Scorecard filters" side="right" size="md">
      <div class="stack">
        <eds-combobox id="filter-owner" label="Owner" placeholder="Any owner"></eds-combobox>
        <eds-checkbox label="Only my scorecards" checked></eds-checkbox>
        <eds-switch label="Hide on-track"></eds-switch>
        <eds-slider id="filter-health" label="Min health" min="0" max="100" value="70" show-value></eds-slider>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="apply-filters" variant="primary">Apply</eds-button>
        <eds-button id="close-filters" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
      <eds-list id="command-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-command" variant="tertiary">Close</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="alert-modal" heading="New alert" close-on-backdrop close-on-escape>
      <eds-stepper id="alert-stepper"></eds-stepper>
      <div class="stack mt-4">
        <eds-input label="Name" placeholder="Fulfillment SLA below 96%" icon="bell"></eds-input>
        <eds-combobox id="alert-card" label="Scorecard" placeholder="Choose a scorecard"></eds-combobox>
        <eds-select id="alert-owner" label="Owner"></eds-select>
        <eds-number-input id="alert-threshold" label="Threshold" value="96" min="1" max="100"></eds-number-input>
        <eds-date-picker id="alert-from" label="Start watching"></eds-date-picker>
        <eds-radio-group id="alert-sev" label="Severity" name="alert-sev" value="amber">
          <eds-radio value="green" label="Info"></eds-radio>
          <eds-radio value="amber" label="Amber"></eds-radio>
          <eds-radio value="red" label="Red"></eds-radio>
        </eds-radio-group>
        <eds-textarea label="Runbook" rows="3" placeholder="Who to page and what to check first."></eds-textarea>
        <eds-pin-input id="alert-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-alert" variant="primary">Create alert</eds-button>
        <eds-button id="close-alert" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="scorecard-modal" heading="New scorecard" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Name" placeholder="Finance" icon="star"></eds-input>
        <eds-select id="new-owner" label="Owner"></eds-select>
        <eds-select id="new-focus" label="Focus"></eds-select>
        <eds-textarea label="Purpose" rows="3" placeholder="What this scorecard is the source of truth for."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-card" variant="primary">Create</eds-button>
        <eds-button id="close-card" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
  `;
}

function paintNav(route) {
  const nav = document.querySelector('#side-nav');
  if (!nav) return;
  const current = activeHref(route);
  nav.items = navItems.map((item) => ({
    ...item,
    active: item.href === current,
  }));
}

function paintCrumbs(route) {
  const crumbs = document.querySelector('#crumbs');
  if (!crumbs) return;
  crumbs.items = crumbItems(route);
}

function setSidebarOpen(open) {
  document.body.classList.toggle('sidebar-open', open);
  const backdrop = document.querySelector('#sig-backdrop');
  if (backdrop) backdrop.hidden = !open;
  const toggle = document.querySelector('#nav-toggle');
  if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
}

function hydrateShell() {
  const inbox = document.querySelector('#inbox-list');
  if (inbox) inbox.items = inboxItems;

  const stepper = document.querySelector('#alert-stepper');
  if (stepper) {
    stepper.steps = createSteps;
    stepper.current = 0;
  }

  const alertCard = document.querySelector('#alert-card');
  if (alertCard) {
    alertCard.options = scorecards.map((item) => ({ label: item.name, value: item.id }));
  }

  const ownerOptions = people.map((item) => ({ label: item.name, value: item.name }));
  const alertOwner = document.querySelector('#alert-owner');
  if (alertOwner) {
    alertOwner.options = ownerOptions;
    alertOwner.value = people[0].name;
  }
  const newOwner = document.querySelector('#new-owner');
  if (newOwner) {
    newOwner.options = ownerOptions;
    newOwner.value = people[0].name;
  }
  const filterOwner = document.querySelector('#filter-owner');
  if (filterOwner) filterOwner.options = ownerOptions;

  const newFocus = document.querySelector('#new-focus');
  if (newFocus) {
    newFocus.options = [
      { label: 'Revenue', value: 'revenue' },
      { label: 'Quality', value: 'quality' },
      { label: 'People', value: 'people' },
    ];
    newFocus.value = 'revenue';
  }

  const search = document.querySelector('#global-search');

  function runSearch(value) {
    const query = (value || '').trim().toLowerCase();
    const list = document.querySelector('#command-list');
    if (list) {
      list.items = commandItems.filter(
        (item) => `${item.label} ${item.description}`.toLowerCase().includes(query) || !query,
      );
    }
    document.querySelector('#command-modal')?.show();
  }

  document.querySelector('#nav-toggle')?.addEventListener('eds-click', () => {
    setSidebarOpen(!document.body.classList.contains('sidebar-open'));
  });
  document.querySelector('#sidebar-close')?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('#sig-backdrop')?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
  });

  search?.addEventListener('eds-change', (event) => runSearch(event.detail?.value ?? ''));
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

  document.querySelector('#notify-btn')?.addEventListener('eds-click', () => document.querySelector('#inbox-drawer')?.show());
  document.querySelector('#close-inbox')?.addEventListener('eds-click', () => document.querySelector('#inbox-drawer')?.close());
  document.querySelector('#close-command')?.addEventListener('eds-click', () => document.querySelector('#command-modal')?.close());
  document.querySelector('#header-alert')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.show());

  document.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
    const value = event.detail?.value;
    if (value === 'inbox') document.querySelector('#inbox-drawer')?.show();
    if (value === 'settings') window.location.hash = '#/settings';
    if (value === 'signout') showToast({ message: 'Signed out of Clearline Holdings', variant: 'warning' });
  });

  document.querySelector('#save-alert')?.addEventListener('eds-click', () => {
    document.querySelector('#alert-modal')?.close();
    showToast({ message: 'Alert added to the register', variant: 'success' });
  });
  document.querySelector('#close-alert')?.addEventListener('eds-click', () => document.querySelector('#alert-modal')?.close());
  document.querySelector('#save-card')?.addEventListener('eds-click', () => {
    document.querySelector('#scorecard-modal')?.close();
    showToast({ message: 'Scorecard added to the portfolio', variant: 'success' });
  });
  document.querySelector('#close-card')?.addEventListener('eds-click', () => document.querySelector('#scorecard-modal')?.close());
  document.querySelector('#apply-filters')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.close();
    showToast({ message: 'Filters applied', variant: 'success' });
  });
  document.querySelector('#close-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.close());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setSidebarOpen(false);
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      runSearch(search?.value ?? '');
    }
    if ((event.metaKey || event.ctrlKey) && event.key === '\\') {
      event.preventDefault();
      setSidebarOpen(!document.body.classList.contains('sidebar-open'));
    }
  });
}

function renderRoute() {
  const route = parseRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  paintNav(route);
  paintCrumbs(route);
  const view = document.querySelector('#view');
  if (!view) return;
  try {
    view.innerHTML = renderView(route);
    hydrateView(view, route);
    themeCards(view);
  } catch (error) {
    view.innerHTML = `<eds-card padded><h1>This page could not load</h1><p class="muted">${error.message}</p></eds-card>`;
    themeCards(view);
    console.error(error);
  }
  view.scrollTop = 0;
  document.title = `${titles[route.name] || 'Overview'} · ${productName}`;
}

function boot() {
  if (!app) throw new Error('Missing #app root');
  setDensity('comfortable');
  renderShell();
  hydrateShell();
  setSidebarOpen(false);
  themeCards();
  renderRoute();
  window.addEventListener('hashchange', renderRoute);
}

try {
  boot();
} catch (error) {
  console.error(error);
  if (app) {
    app.innerHTML = `<div class="boot-error"><strong>Signal could not start</strong><pre>${error?.stack || error.message}</pre></div>`;
  }
}
