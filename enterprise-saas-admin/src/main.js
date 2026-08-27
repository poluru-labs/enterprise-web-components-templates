import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './style.css';
import {
  commandItems,
  currentUser,
  inboxItems,
  inviteSteps,
  navItems,
  organizations,
  productLine,
  productName,
  workspaceName,
} from './data.js';
import { hydrateView, renderView, viewState } from './views.js';

const app = document.querySelector('#app');

const titles = {
  overview: 'Overview',
  organizations: 'Organizations',
  org: 'Organization',
  members: 'Members',
  plans: 'Plans',
  flags: 'Flags',
  usage: 'Usage',
  incidents: 'Incidents',
  audit: 'Audit',
  settings: 'Settings',
};

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

function activeHref(route) {
  if (route.name === 'org') return '#/organizations';
  return `#/${route.name || 'overview'}`;
}

function crumbItems(route) {
  if (route.name === 'org') {
    const org = organizations.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Organizations', href: '#/organizations' },
      { label: org?.name || 'Workspace', current: true },
    ];
  }
  return [
    { label: workspaceName, href: '#/overview' },
    { label: titles[route.name] || 'Overview', current: true },
  ];
}

function renderShell() {
  app.innerHTML = `
    <header class="saas-header">
      <eds-toolbar bordered>
        <div slot="start" class="header-start">
          <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Open menu"></eds-button>
          <a class="wordmark" href="#/overview">
            <span class="brand-mark" aria-hidden="true">H</span>
            <span class="brand-copy">
              <strong>${productName}</strong>
              <small>${productLine} · ${workspaceName}</small>
            </span>
          </a>
        </div>
        <div slot="center" class="header-search">
          <eds-visually-hidden>Search the control plane</eds-visually-hidden>
          <eds-search id="global-search" placeholder="Search orgs, members, flags" clearable></eds-search>
        </div>
        <div slot="end" class="header-end">
          <span class="header-kbd">
            <eds-kbd keys="⌘K"></eds-kbd>
          </span>
          <eds-tooltip content="Inbox" placement="bottom">
            <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
          </eds-tooltip>
          <eds-popover id="status-pop" heading="Status" placement="bottom">
            <eds-button slot="trigger" variant="tertiary" icon="info" icon-only accessible-label="System status"></eds-button>
            <eds-status label="All systems operational" variant="success" pulse></eds-status>
            <p class="muted mb-0 mt-2">Auth latency in EMEA is the only watch.</p>
          </eds-popover>
          <eds-button id="header-invite" variant="primary" icon="plus">Invite</eds-button>
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
    <div class="saas-shell">
      <aside class="saas-sidebar" id="saas-sidebar" aria-label="Dashboard">
        <eds-side-nav id="side-nav"></eds-side-nav>
        <div class="sidebar-foot">
          <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
          <span class="brand-copy">
            <strong>${currentUser.name}</strong>
            <small>${currentUser.role}</small>
          </span>
        </div>
      </aside>
      <div class="saas-main">
        <div class="crumb-row">
          <eds-breadcrumb id="crumbs"></eds-breadcrumb>
        </div>
        <main id="view" tabindex="-1"></main>
      </div>
    </div>
    <button class="saas-backdrop" id="saas-backdrop" type="button" aria-label="Close navigation" hidden></button>
    <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
      <eds-list id="command-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-command" variant="tertiary">Close</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="invite-modal" heading="Invite member" close-on-backdrop close-on-escape>
      <eds-stepper id="invite-stepper"></eds-stepper>
      <div class="stack mt-4">
        <eds-combobox id="invite-org" label="Organization" placeholder="Choose an organization"></eds-combobox>
        <eds-input id="invite-email" label="Email" type="email" placeholder="name@company.example" icon="mail"></eds-input>
        <eds-radio-group id="invite-role" label="Role" name="invite-role" value="member">
          <eds-radio value="admin" label="Admin"></eds-radio>
          <eds-radio value="member" label="Member"></eds-radio>
          <eds-radio value="billing" label="Billing"></eds-radio>
        </eds-radio-group>
        <eds-number-input id="invite-seats" label="Extra seats" value="1" min="1" max="40"></eds-number-input>
        <eds-pin-input id="invite-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-invite" variant="primary">Send invite</eds-button>
        <eds-button id="close-invite" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="org-modal" heading="New organization" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Name" placeholder="Fieldwork Studio" icon="folder"></eds-input>
        <eds-input label="Owner" value="Luca Poluru" icon="user"></eds-input>
        <eds-select id="new-org-plan" label="Plan"></eds-select>
        <eds-select id="new-org-region" label="Region"></eds-select>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-org" variant="primary">Create</eds-button>
        <eds-button id="close-org" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="flag-modal" heading="New flag" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Name" placeholder="Audit exports" icon="filter"></eds-input>
        <eds-input label="Key" value="audit.exports"></eds-input>
        <eds-slider id="flag-initial" label="Initial rollout" min="0" max="100" value="0" show-value></eds-slider>
        <eds-textarea label="Notes" rows="3" placeholder="Who is this for, and when does it graduate."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-flag" variant="primary">Create flag</eds-button>
        <eds-button id="close-flag" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="incident-modal" heading="Open incident" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Title" placeholder="Elevated error rate" icon="alert-triangle"></eds-input>
        <eds-select id="incident-sev" label="Severity"></eds-select>
        <eds-textarea label="Impact" rows="3" placeholder="Who is affected and what they see."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-incident" variant="danger">Open</eds-button>
        <eds-button id="close-incident" variant="tertiary">Cancel</eds-button>
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
  document.body.classList.toggle('nav-open', open);
  const backdrop = document.querySelector('#saas-backdrop');
  if (backdrop) backdrop.hidden = !open;
}

function hydrateShell() {
  const inbox = document.querySelector('#inbox-list');
  if (inbox) inbox.items = inboxItems;

  const stepper = document.querySelector('#invite-stepper');
  if (stepper) {
    stepper.steps = inviteSteps;
    stepper.current = 0;
  }

  const inviteOrg = document.querySelector('#invite-org');
  if (inviteOrg) {
    inviteOrg.options = organizations.map((item) => ({ label: item.name, value: item.id }));
  }

  const newPlan = document.querySelector('#new-org-plan');
  if (newPlan) {
    newPlan.options = [
      { label: 'Starter', value: 'starter' },
      { label: 'Growth', value: 'growth' },
      { label: 'Enterprise', value: 'enterprise' },
    ];
    newPlan.value = 'starter';
  }

  const newRegion = document.querySelector('#new-org-region');
  if (newRegion) {
    newRegion.options = [
      { label: 'Americas', value: 'americas' },
      { label: 'EMEA', value: 'emea' },
      { label: 'APAC', value: 'apac' },
    ];
    newRegion.value = 'americas';
  }

  const incidentSev = document.querySelector('#incident-sev');
  if (incidentSev) {
    incidentSev.options = [
      { label: 'SEV-1', value: '1' },
      { label: 'SEV-2', value: '2' },
      { label: 'SEV-3', value: '3' },
    ];
    incidentSev.value = '2';
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

  document.querySelector('#nav-toggle')?.addEventListener('eds-click', () => setSidebarOpen(true));
  document.querySelector('#saas-backdrop')?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('#side-nav')?.addEventListener('eds-navigate', () => setSidebarOpen(false));

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

  document.querySelector('#header-invite')?.addEventListener('eds-click', () => document.querySelector('#invite-modal')?.show());

  document.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
    const value = event.detail?.value;
    if (value === 'inbox') document.querySelector('#inbox-drawer')?.show();
    if (value === 'settings') window.location.hash = '#/settings';
    if (value === 'signout') showToast({ message: 'Signed out of the demo workspace', variant: 'warning' });
  });

  document.querySelector('#save-invite')?.addEventListener('eds-click', () => {
    document.querySelector('#invite-modal')?.close();
    viewState.inviteStep = 0;
    showToast({ message: 'Invite sent to a Poluru teammate', variant: 'success' });
    window.location.hash = '#/members';
  });
  document.querySelector('#close-invite')?.addEventListener('eds-click', () => document.querySelector('#invite-modal')?.close());
  document.querySelector('#save-org')?.addEventListener('eds-click', () => {
    document.querySelector('#org-modal')?.close();
    showToast({ message: 'Organization created', variant: 'success' });
  });
  document.querySelector('#close-org')?.addEventListener('eds-click', () => document.querySelector('#org-modal')?.close());
  document.querySelector('#save-flag')?.addEventListener('eds-click', () => {
    document.querySelector('#flag-modal')?.close();
    showToast({ message: 'Flag created at 0% rollout', variant: 'success' });
    window.location.hash = '#/flags';
  });
  document.querySelector('#close-flag')?.addEventListener('eds-click', () => document.querySelector('#flag-modal')?.close());
  document.querySelector('#save-incident')?.addEventListener('eds-click', () => {
    document.querySelector('#incident-modal')?.close();
    showToast({ message: 'Incident opened', variant: 'warning' });
    window.location.hash = '#/incidents';
  });
  document.querySelector('#close-incident')?.addEventListener('eds-click', () => document.querySelector('#incident-modal')?.close());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setSidebarOpen(false);
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      runSearch(search?.value ?? '');
    }
  });
}

function renderRoute() {
  const route = parseRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  paintNav(route);
  paintCrumbs(route);
  setSidebarOpen(false);
  const view = document.querySelector('#view');
  if (!view) return;
  try {
    view.innerHTML = renderView(route);
    hydrateView(view, route);
  } catch (error) {
    view.innerHTML = `<eds-card padded><h1>This page could not load</h1><p class="muted">${error.message}</p></eds-card>`;
    console.error(error);
  }
  view.scrollTop = 0;
  document.title = `${titles[route.name] || 'Overview'} · ${productName} Admin`;
}

function boot() {
  if (!app) {
    throw new Error('Missing #app root');
  }
  setDensity('comfortable');
  renderShell();
  hydrateShell();
  renderRoute();
  window.addEventListener('hashchange', renderRoute);
}

try {
  boot();
} catch (error) {
  console.error(error);
  if (app) {
    app.innerHTML = `<div class="boot-error"><strong>Helio could not start</strong><pre>${error?.stack || error.message}</pre></div>`;
  }
}
