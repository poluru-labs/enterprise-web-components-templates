import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './style.css';
import { commandItems, currentUser, invoices, navItems, productLine, productName } from './data.js';
import { hydrateView, renderView } from './views.js';

const app = document.querySelector('#app');
const titles = {
  overview: 'Overview',
  invoices: 'Invoices',
  invoice: 'Invoice',
  payments: 'Payments',
  subscriptions: 'Subscriptions',
  customers: 'Customers',
  customer: 'Customer',
  analytics: 'Analytics',
  reports: 'Reports',
  settings: 'Settings',
};

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

function crumbText(route) {
  if (route.name === 'invoice') return `Ledger / Invoices / ${route.id}`;
  if (route.name === 'customer') return 'Accounts / Customers / Profile';
  return `Northshore Cloud / ${titles[route.name] || 'Overview'}`;
}

function activeHref(route) {
  if (route.name === 'invoice') return '#/invoices';
  if (route.name === 'customer') return '#/customers';
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
    <header class="masthead">
      <div class="mast-top">
        <div class="mast-brand">
          <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu">Menu</button>
          <a class="wordmark" href="#/overview">
            <strong>${productName}</strong>
            <small>${productLine} · Northshore Cloud</small>
          </a>
        </div>
        <div class="account-dock" id="account-dock">
          <label class="dock-search">
            <span class="visually-hidden">Search the ledger</span>
            <i class="bi bi-search" aria-hidden="true"></i>
            <input id="global-search" type="search" placeholder="Find invoice, customer, or payment" autocomplete="off" />
          </label>
          <a class="dock-action" href="#/settings" id="settings-btn">
            <i class="bi bi-sliders" aria-hidden="true"></i>
            <span>Settings</span>
          </a>
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
              <button type="button" role="menuitem" id="inbox-btn">Collections inbox</button>
              <a href="#/settings" role="menuitem">Billing settings</a>
              <button type="button" role="menuitem" id="signout-btn">Sign out</button>
            </div>
          </div>
        </div>
      </div>
      <nav class="mast-nav" id="mast-nav" aria-label="Primary"></nav>
    </header>
    <div class="entity-bar">
      <div class="entity-bar-inner">
        <span>Entity 84-2291840 · USD · Net 15</span>
        <span>Books closed through 31 Jul 2026</span>
      </div>
    </div>
    <div class="app-canvas">
      <p class="crumb-line" id="crumbs"></p>
      <main id="view" tabindex="-1"></main>
    </div>
    <eds-drawer id="preview-drawer" heading="Invoice preview" side="right" size="md">
      <p class="kicker mb-1">INV-2841</p>
      <h2>Harbor &amp; Co.</h2>
      <p class="muted">Issued 1 Aug 2026 · Due 15 Aug 2026</p>
      <p><strong>$18,400</strong> · Paid via Mastercard 8891</p>
      <p class="muted">Enterprise platform, priority support, and SSO for August.</p>
      <div slot="footer" class="inline-actions">
        <eds-button id="open-full-invoice" variant="primary">Open details</eds-button>
        <eds-button id="close-preview" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-drawer id="inbox-drawer" heading="Collections" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="create-modal" heading="Quick create" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Customer" placeholder="Harbor & Co." icon="user"></eds-input>
        <eds-number-input label="Amount (USD)" value="2400" min="0" max="100000" step="10"></eds-number-input>
        <eds-select id="create-kind" label="Type"></eds-select>
        <eds-textarea label="Memo" rows="3" placeholder="August platform fee plus support."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-create" variant="primary">Save draft</eds-button>
        <eds-button id="close-create" variant="tertiary">Cancel</eds-button>
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
  const nav = document.querySelector('#mast-nav');
  if (!nav) return;
  const current = activeHref(route);
  nav.innerHTML = navItems
    .map((item) => `<a href="${item.href}" ${item.href === current ? 'aria-current="page"' : ''}>${item.label}</a>`)
    .join('');
}

function hydrateShell() {
  const kind = document.querySelector('#create-kind');
  if (kind) {
    kind.options = [
      { label: 'Invoice', value: 'invoice' },
      { label: 'Payment', value: 'payment' },
      { label: 'Customer', value: 'customer' },
    ];
    kind.value = 'invoice';
  }
  const inbox = document.querySelector('#inbox-list');
  if (inbox) {
    inbox.items = [
      { label: 'INV-2840 overdue', description: 'Nimbus Retail · $8,400', icon: 'alert-triangle' },
      { label: 'INV-2839 disputed', description: 'Lumen Health · wire', icon: 'warning' },
      { label: 'Trial ending', description: 'Kite Studio in 6 days', icon: 'clock' },
    ];
  }

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
    const invoiceHit = invoices.find(
      (item) => item.id.toLowerCase() === query || item.customer.toLowerCase().includes(query),
    );
    if (list) {
      list.items = commandItems.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(query) || !query);
    }
    document.querySelector('#command-modal')?.show();
    if (invoiceHit && query.startsWith('inv-')) window.location.hash = `#/invoice/${invoiceHit.id}`;
  }

  document.querySelector('#nav-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
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
    if (event.key === 'Escape') setProfileOpen(false);
  });
  document.querySelector('#close-inbox')?.addEventListener('eds-click', () => document.querySelector('#inbox-drawer')?.close());
  document.querySelector('#close-preview')?.addEventListener('eds-click', () => document.querySelector('#preview-drawer')?.close());
  document.querySelector('#open-full-invoice')?.addEventListener('eds-click', () => {
    document.querySelector('#preview-drawer')?.close();
    window.location.hash = '#/invoice/INV-2841';
  });
  document.querySelector('#save-create')?.addEventListener('eds-click', () => {
    document.querySelector('#create-modal')?.close();
    showToast({ message: 'Draft saved to the ledger', variant: 'success' });
  });
  document.querySelector('#close-create')?.addEventListener('eds-click', () => document.querySelector('#create-modal')?.close());
  document.querySelector('#close-command')?.addEventListener('eds-click', () => document.querySelector('#command-modal')?.close());
}

function renderRoute() {
  const route = parseRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  paintNav(route);
  const crumbs = document.querySelector('#crumbs');
  if (crumbs) crumbs.textContent = crumbText(route);
  document.body.classList.remove('nav-open');
  const view = document.querySelector('#view');
  if (!view) return;
  view.innerHTML = renderView(route);
  hydrateView(view, route);
  document.title = `${titles[route.name] || 'Overview'} · ${productName} Billing`;
}

setDensity('comfortable');
renderShell();
hydrateShell();
renderRoute();
window.addEventListener('hashchange', renderRoute);
