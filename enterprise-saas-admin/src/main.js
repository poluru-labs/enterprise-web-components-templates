import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/header.css';
import './components/app-shell.js';
import {
  commandItems,
  inboxItems,
  inviteSteps,
  organizations,
  productName,
} from './data/index.js';
import { activeHref, crumbItems, pageTitle, parseRoute } from './lib/router.js';
import { hydrateView, renderView } from './pages/index.js';
import { themeCards } from './components/widgets.js';
import { viewState } from './pages/state.js';

const app = document.querySelector('#app');

function paintSidebar(route) {
  document.querySelector('helio-app-sidebar')?.paint(activeHref(route));
}

function paintCrumbs(route) {
  const crumbs = document.querySelector('#crumbs');
  if (!crumbs) return;
  crumbs.items = crumbItems(route);
}

function setSidebarOpen(open) {
  document.body.classList.toggle('nav-open', open);
  const backdrop = document.querySelector('#helio-backdrop');
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
  const profileBtn = document.querySelector('#profile-btn');
  const profileMenu = document.querySelector('#profile-menu');
  const orgChip = document.querySelector('#org-chip');
  const orgMenu = document.querySelector('#org-menu');

  function setProfileOpen(open) {
    if (!profileBtn || !profileMenu) return;
    profileMenu.hidden = !open;
    profileBtn.setAttribute('aria-expanded', String(open));
  }

  function setOrgOpen(open) {
    if (!orgChip || !orgMenu) return;
    orgMenu.hidden = !open;
    orgChip.setAttribute('aria-expanded', String(open));
  }

  function openCommandPalette(value = '') {
    const query = value.trim().toLowerCase();
    const list = document.querySelector('#command-list');
    const filtered = commandItems.filter(
      (item) => !query || `${item.label} ${item.description}`.toLowerCase().includes(query),
    );
    if (list) {
      list.items = filtered.map((item) => ({
        label: item.label,
        description: item.description,
        icon: item.icon,
      }));
    }
    document.querySelector('#command-modal')?.show();
  }

  function runSearch(value) {
    const query = value.trim();
    if (!query) {
      window.location.hash = '#/search';
      return;
    }
    window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
  }

  document.querySelector('#nav-toggle')?.addEventListener('click', () => setSidebarOpen(true));
  document.querySelector('#helio-backdrop')?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('#sidebar-nav')?.addEventListener('click', () => setSidebarOpen(false));

  search?.addEventListener('focus', () => {
    setProfileOpen(false);
    setOrgOpen(false);
  });
  search?.addEventListener('input', () => {
    if (search.value.trim()) openCommandPalette(search.value);
  });
  search?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runSearch(search.value);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setSidebarOpen(false);
      setProfileOpen(false);
      setOrgOpen(false);
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      search?.focus();
      openCommandPalette(search?.value ?? '');
    }
  });

  document.querySelector('#command-list')?.addEventListener('eds-select', (event) => {
    const item = commandItems.find((entry) => entry.label === event.detail?.label);
    document.querySelector('#command-modal')?.close();
    if (item) window.location.hash = item.href;
  });

  orgChip?.addEventListener('click', (event) => {
    event.stopPropagation();
    setProfileOpen(false);
    setOrgOpen(orgMenu?.hidden);
  });

  orgMenu?.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      setOrgOpen(false);
      showToast({ message: `Switched to ${button.textContent.trim()}`, variant: 'info' });
    });
  });

  profileBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    setOrgOpen(false);
    setProfileOpen(profileMenu?.hidden);
  });

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
    if (!event.target.closest('.helio-header-profile-wrap')) setProfileOpen(false);
    if (!event.target.closest('.helio-org-switcher')) setOrgOpen(false);
  });

  document.querySelector('#header-invite')?.addEventListener('click', () => document.querySelector('#invite-modal')?.show());
  document.querySelector('#close-inbox')?.addEventListener('eds-click', () => document.querySelector('#inbox-drawer')?.close());
  document.querySelector('#close-command')?.addEventListener('eds-click', () => document.querySelector('#command-modal')?.close());

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
}

function renderRoute() {
  const route = parseRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  paintSidebar(route);
  paintCrumbs(route);
  setSidebarOpen(false);
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
  document.title = pageTitle(route, productName);

  const search = document.querySelector('#global-search');
  if (search && route.name === 'search' && route.query) {
    search.value = route.query;
  }
}

function boot() {
  if (!app) {
    throw new Error('Missing #app root');
  }
  setDensity('comfortable');
  app.innerHTML = '<helio-app-shell></helio-app-shell>';
  hydrateShell();
  themeCards();
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
