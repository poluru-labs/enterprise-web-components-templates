import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/header.css';
import './components/app-shell.js';
import { commandItems, inboxItems, invoices, productName } from './data/index.js';
import { activeHref, crumbText, pageTitle, parseRoute } from './lib/router.js';
import { hydrateView, renderView } from './pages/index.js';

const app = document.querySelector('#app');

function paintSidebar(route) {
  document.querySelector('vd-app-sidebar')?.paint(activeHref(route));
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
  if (inbox) inbox.items = inboxItems;

  const search = document.querySelector('#global-search');
  const profileBtn = document.querySelector('#profile-btn');
  const profileMenu = document.querySelector('#profile-menu');

  function setProfileOpen(open) {
    if (!profileBtn || !profileMenu) return;
    profileMenu.hidden = !open;
    profileBtn.setAttribute('aria-expanded', String(open));
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
    const invoiceHit = invoices.find(
      (item) => item.id.toLowerCase() === query.toLowerCase() || item.customer.toLowerCase().includes(query.toLowerCase()),
    );
    if (invoiceHit && query.toLowerCase().startsWith('inv-')) {
      window.location.hash = `#/invoice/${invoiceHit.id}`;
      return;
    }
    window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
  }

  document.querySelector('#nav-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  document.querySelector('#new-invoice-btn')?.addEventListener('click', () => {
    document.querySelector('#create-modal')?.show();
  });

  search?.addEventListener('focus', () => setProfileOpen(false));
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
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      search?.focus();
      openCommandPalette(search?.value ?? '');
    }
    if (event.key === 'Escape') setProfileOpen(false);
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
    if (!event.target.closest('.vd-ledger-profile-wrap')) setProfileOpen(false);
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
  paintSidebar(route);
  const crumbs = document.querySelector('#crumbs');
  if (crumbs) crumbs.textContent = crumbText(route);
  document.body.classList.remove('nav-open');
  const view = document.querySelector('#view');
  if (!view) return;
  view.innerHTML = renderView(route);
  hydrateView(view, route);
  document.title = pageTitle(route, productName);

  const search = document.querySelector('#global-search');
  if (search && route.name === 'search' && route.query) {
    search.value = route.query;
  }
}

setDensity('comfortable');
app.innerHTML = '<vd-app-shell></vd-app-shell>';
hydrateShell();
renderRoute();
window.addEventListener('hashchange', renderRoute);
