import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './style.css';
import { currentUser, navItems, notifications, productName, routes } from './data.js';
import { filterCommands } from './features.js';
import { hydrateView, renderView } from './views.js';

const app = document.querySelector('#app');

const routeNames = Object.keys(routes);

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return routeNames.includes(hash) ? hash : 'overview';
}

function withActiveNav(route) {
  return navItems.map((item) => ({
    ...item,
    active: item.href === `#/${route}` || item.children?.some((child) => child.href === `#/${route}`),
    children: item.children?.map((child) => ({
      ...child,
      active: child.href === `#/${route}`,
    })),
  }));
}

function renderShell() {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="app-sidebar" id="sidebar">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true">H</span>
          <div class="brand-copy">
            <strong>${productName}</strong>
            <small>Enterprise analytics</small>
          </div>
        </div>
        <eds-side-nav id="side-nav"></eds-side-nav>
        <p class="footer-meta px-2 mb-0">© 2026 ${productName} · MIT</p>
      </aside>
      <div class="app-main">
        <eds-toolbar bordered sticky>
          <div slot="start" class="toolbar-start">
            <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Toggle navigation"></eds-button>
            <eds-search id="global-search" class="toolbar-search" placeholder="Search reports, metrics, people" clearable></eds-search>
          </div>
          <div slot="end" class="toolbar-end">
            <eds-badge id="inbox-count" label="${notifications.length}" variant="danger" pill></eds-badge>
            <eds-tooltip content="Open inbox">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-dropdown-menu id="user-menu" placement="bottom">
              <eds-button slot="trigger" variant="tertiary" icon="user">${currentUser.name}</eds-button>
              <eds-menu-item label="Settings" value="settings" icon="settings"></eds-menu-item>
              <eds-menu-item label="Legal & copyright" value="legal" icon="file"></eds-menu-item>
              <eds-menu-item label="Sign out" value="signout" icon="lock" danger></eds-menu-item>
            </eds-dropdown-menu>
          </div>
        </eds-toolbar>
        <div class="app-page">
          <eds-breadcrumb id="crumbs"></eds-breadcrumb>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
    </div>
    <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer" class="inline-actions">
        <eds-button id="mark-read" variant="primary">Mark all read</eds-button>
        <eds-button id="goto-alerts" variant="tertiary">Open alerts</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
      <eds-list id="command-list" divided></eds-list>
      <div slot="footer" class="inline-actions">
        <eds-button id="close-command" variant="tertiary">Close</eds-button>
      </div>
    </eds-modal>
    <eds-drawer id="filter-drawer" heading="Advanced filters" side="right" size="md">
      <div class="stack">
        <eds-select id="drawer-domain" label="Domain"></eds-select>
        <eds-checkbox label="Certified models only" checked></eds-checkbox>
        <eds-checkbox label="Include archived"></eds-checkbox>
        <eds-switch label="Only reports I own"></eds-switch>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="apply-filters" variant="primary">Apply</eds-button>
        <eds-button id="close-filters" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="share-modal" heading="Create alert" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Alert name" placeholder="Pipeline SLA below 99%" icon="bell"></eds-input>
        <eds-select id="alert-channel" label="Channel"></eds-select>
        <eds-textarea label="Runbook" rows="3" placeholder="Who to page and what to check first."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-alert" variant="primary">Save alert</eds-button>
        <eds-button id="close-alert" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
  `;
}

function hydrateShell() {
  const domain = document.querySelector('#drawer-domain');
  if (domain) {
    domain.options = [
      { label: 'All domains', value: '' },
      { label: 'Finance', value: 'finance' },
      { label: 'Growth', value: 'growth' },
      { label: 'Platform', value: 'platform' },
    ];
  }
  const channel = document.querySelector('#alert-channel');
  if (channel) {
    channel.options = [
      { label: 'Slack', value: 'slack' },
      { label: 'Email', value: 'email' },
      { label: 'Pager', value: 'pager' },
    ];
    channel.value = 'slack';
  }

  document.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href.replace(/^#/, '#');
  });

  document.querySelector('#nav-toggle')?.addEventListener('eds-click', () => {
    document.body.classList.toggle('sidebar-open');
    const nav = document.querySelector('#side-nav');
    if (nav && window.matchMedia('(min-width: 961px)').matches) {
      nav.collapsed = !nav.collapsed;
      document.body.classList.toggle('sidebar-collapsed', nav.collapsed);
    }
  });

  const commandList = document.querySelector('#command-list');
  document.querySelector('#global-search')?.addEventListener('eds-change', (event) => {
    const value = event.detail?.value ?? event.target.value ?? '';
    if (commandList) commandList.items = filterCommands(value);
    document.querySelector('#command-modal')?.show();
  });
  commandList?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? commandItemsHref(event.detail?.label);
    document.querySelector('#command-modal')?.close();
    if (href) window.location.hash = href;
  });
  document.querySelector('#close-command')?.addEventListener('eds-click', () => {
    document.querySelector('#command-modal')?.close();
  });

  const inbox = document.querySelector('#inbox-list');
  if (inbox) inbox.items = notifications;
  document.querySelector('#notify-btn')?.addEventListener('eds-click', () => {
    document.querySelector('#inbox-drawer')?.show();
  });
  document.querySelector('#mark-read')?.addEventListener('eds-click', () => {
    const badge = document.querySelector('#inbox-count');
    if (badge) badge.label = '0';
    document.querySelector('#inbox-drawer')?.close();
    showToast({ message: 'Inbox marked read', variant: 'success' });
  });
  document.querySelector('#goto-alerts')?.addEventListener('eds-click', () => {
    document.querySelector('#inbox-drawer')?.close();
    window.location.hash = '#/alerts';
  });

  function commandItemsHref(label) {
    return filterCommands(label)[0]?.href;
  }

  document.querySelector('#user-menu')?.addEventListener('eds-select', (event) => {
    const value = event.detail?.value;
    if (value === 'settings' || value === 'legal') window.location.hash = `#/${value}`;
    if (value === 'signout') showToast({ message: 'Signed out of the demo workspace', variant: 'warning' });
  });

  document.querySelector('#apply-filters')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.close();
    showToast({ message: 'Filters applied', variant: 'success' });
  });
  document.querySelector('#close-filters')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.close();
  });
  document.querySelector('#save-alert')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.close();
    showToast({ message: 'Alert created', variant: 'success' });
  });
  document.querySelector('#close-alert')?.addEventListener('eds-click', () => {
    document.querySelector('#share-modal')?.close();
  });
}

function renderRoute() {
  const route = currentRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  const nav = document.querySelector('#side-nav');
  if (nav) nav.items = withActiveNav(route);
  const crumbs = document.querySelector('#crumbs');
  if (crumbs) crumbs.items = routes[route].crumbs;
  const view = document.querySelector('#view');
  if (!view) return;
  view.innerHTML = renderView(route);
  hydrateView(view, route);
  document.title = `${routes[route].title} · ${productName}`;
}

setDensity('comfortable');
renderShell();
hydrateShell();
renderRoute();
window.addEventListener('hashchange', renderRoute);
