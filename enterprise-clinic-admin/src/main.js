import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/header.css';
import { commandItems, patients } from './data/index.js';
import { renderAppShell, hydrateShell, setShellRoute } from './components/app-shell.js';
import { renderView, hydrateView } from './pages/index.js';
import { parseRoute, crumbText, routeTitle } from './lib/router.js';
const app = document.querySelector('#app');

function renderRoute() {
  const route = parseRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  setShellRoute(route);
  const crumbs = document.querySelector('#halo-crumbs');
  if (crumbs) crumbs.textContent = crumbText(route);
  document.body.classList.remove('halo-nav-open');
  const view = document.querySelector('#view');
  if (!view) return;
  try {
    view.innerHTML = renderView(route);
    hydrateView(view, route);
  } catch (error) {
    view.innerHTML = `<halo-content-card><h1>This page could not load</h1><p class="halo-muted">${error.message}</p></halo-content-card>`;
    console.error(error);
  }
  document.title = routeTitle(route);
}

function runCommandSearch(value) {
  const query = value.trim().toLowerCase();
  const list = document.querySelector('#command-list');
  const patientHit = patients.find(
    (item) => item.name.toLowerCase().includes(query) || item.mrn.toLowerCase() === query,
  );
  if (list) {
    list.items = commandItems.filter(
      (item) => `${item.label} ${item.description}`.toLowerCase().includes(query) || !query,
    );
  }
  document.querySelector('#command-modal')?.show();
  if (patientHit && query.length > 2) window.location.hash = `#/patient/${patientHit.id}`;
}

function bindShellEvents() {
  document.addEventListener('halo-command', () => {
    const search = document.querySelector('#halo-global-search');
    runCommandSearch(search?.value ?? '');
    document.querySelector('#command-modal')?.show();
  });

  document.addEventListener('halo-book', () => document.querySelector('#book-modal')?.show());
  document.addEventListener('halo-inbox', () => document.querySelector('#inbox-drawer')?.show());
  document.addEventListener('halo-signout', () => {
    showToast({ message: 'Signed out of the demo clinic', variant: 'warning' });
  });

  document.querySelector('#command-list')?.addEventListener('eds-select', (event) => {
    const item = commandItems.find((entry) => entry.label === event.detail?.label);
    document.querySelector('#command-modal')?.close();
    if (item) window.location.hash = item.href;
  });

  document.querySelector('#close-inbox')?.addEventListener('eds-click', () => document.querySelector('#inbox-drawer')?.close());
  document.querySelector('#close-message')?.addEventListener('eds-click', () => document.querySelector('#message-drawer')?.close());
  document.querySelector('#reply-message')?.addEventListener('eds-click', () => {
    document.querySelector('#message-drawer')?.close();
    showToast({ message: 'Refill sent to the pharmacy', variant: 'success' });
  });
  document.querySelector('#save-book')?.addEventListener('eds-click', () => {
    document.querySelector('#book-modal')?.close();
    showToast({ message: 'Slot held on the afternoon board', variant: 'success' });
  });
  document.querySelector('#close-book')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.close());
  document.querySelector('#close-command')?.addEventListener('eds-click', () => document.querySelector('#command-modal')?.close());

  document.querySelector('#halo-global-search')?.addEventListener('input', (event) => {
    const value = event.target?.value ?? '';
    if (value.trim()) runCommandSearch(value);
  });
}

setDensity('comfortable');
app.innerHTML = renderAppShell();
hydrateShell(app);
bindShellEvents();
renderRoute();
window.addEventListener('hashchange', renderRoute);
