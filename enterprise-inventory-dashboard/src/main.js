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
  productName,
  productLine,
  products,
  purchaseOrders,
  warehouses,
  workspaceName,
} from './data.js';
import { themeCards } from './ui.js';
import { hydrateView, renderView } from './views.js';

const app = document.querySelector('#app');

const titles = {
  overview: 'Overview',
  inventory: 'Inventory',
  product: 'Item',
  orders: 'Purchase orders',
  warehouses: 'Warehouses',
  suppliers: 'Suppliers',
  team: 'Team',
  alerts: 'Alerts',
  reports: 'Reports',
  settings: 'Settings',
};

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

function activeHref(route) {
  if (route.name === 'product') return '#/inventory';
  return `#/${route.name || 'overview'}`;
}

function crumbItems(route) {
  if (route.name === 'product') {
    const item = products.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Inventory', href: '#/inventory' },
      { label: item?.name || 'Item', current: true },
    ];
  }
  return [
    { label: workspaceName, href: '#/overview' },
    { label: titles[route.name] || 'Overview', current: true },
  ];
}

function renderShell() {
  app.innerHTML = `
    <div class="nim-shell">
      <header class="nim-header">
        <eds-toolbar>
          <div slot="start" class="header-start">
            <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
              <i class="bi bi-list" aria-hidden="true"></i>
            </button>
            <a class="header-brand" href="#/overview">
              <span class="brand-mark" aria-hidden="true">N</span>
              <span class="brand-copy">
                <strong>${productName}</strong>
                <small>${productLine} · ${workspaceName}</small>
              </span>
            </a>
            <eds-breadcrumb id="crumbs"></eds-breadcrumb>
          </div>
          <div slot="center" class="header-search">
            <eds-visually-hidden>Search inventory</eds-visually-hidden>
            <eds-search id="global-search" placeholder="Find a SKU, order, or warehouse" clearable></eds-search>
          </div>
          <div slot="end" class="header-end">
            <span class="header-kbd"><eds-kbd keys="⌘K"></eds-kbd></span>
            <eds-tooltip content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-popover id="status-pop" heading="Network status" placement="bottom">
              <eds-button slot="trigger" variant="tertiary" icon="info" icon-only accessible-label="Network status"></eds-button>
              <eds-status label="All warehouses online" variant="success" pulse></eds-status>
              <p class="muted mb-0 mt-2">Dallas South is the only site above 85% capacity.</p>
            </eds-popover>
            <eds-button id="header-order" variant="primary" icon="plus">New order</eds-button>
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
      <div class="nim-body">
        <aside class="nim-sidebar" id="nim-sidebar" aria-label="Dashboard">
          <eds-side-nav id="side-nav"></eds-side-nav>
          <div class="sidebar-foot">
            <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
            <span class="brand-copy">
              <strong>${currentUser.name}</strong>
              <small>${currentUser.role}</small>
            </span>
          </div>
        </aside>
        <main id="view" tabindex="-1"></main>
      </div>
    </div>
    <button class="nim-backdrop" id="nim-backdrop" type="button" aria-label="Hide navigation" hidden></button>
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
    <eds-modal id="order-modal" heading="New purchase order" close-on-backdrop close-on-escape>
      <eds-stepper id="order-stepper"></eds-stepper>
      <div class="stack mt-4">
        <eds-combobox id="order-supplier" label="Supplier" placeholder="Choose a supplier"></eds-combobox>
        <eds-select id="order-site" label="Warehouse"></eds-select>
        <eds-number-input id="order-items" label="Line items" value="6" min="1" max="50"></eds-number-input>
        <eds-date-picker id="order-eta" label="Expected arrival"></eds-date-picker>
        <eds-radio-group id="order-priority" label="Priority" name="order-priority" value="standard">
          <eds-radio value="standard" label="Standard"></eds-radio>
          <eds-radio value="rush" label="Rush"></eds-radio>
        </eds-radio-group>
        <eds-textarea label="Notes" rows="3" placeholder="Anything the receiving team should know."></eds-textarea>
        <eds-pin-input id="order-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-order" variant="primary">Create order</eds-button>
        <eds-button id="close-order" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="sku-modal" heading="New SKU" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Item name" placeholder="Insulated steel bottle" icon="folder"></eds-input>
        <eds-select id="new-warehouse" label="Warehouse"></eds-select>
        <eds-select id="new-category" label="Category"></eds-select>
        <eds-number-input id="new-reorder" label="Reorder point" value="300" min="0" max="5000"></eds-number-input>
        <eds-textarea label="Description" rows="3" placeholder="What this SKU is and where it ships from."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-sku" variant="primary">Create</eds-button>
        <eds-button id="close-sku" variant="tertiary">Cancel</eds-button>
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
  const backdrop = document.querySelector('#nim-backdrop');
  if (backdrop) backdrop.hidden = !open;
  const toggle = document.querySelector('#nav-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', String(open));
}

function hydrateShell() {
  const inbox = document.querySelector('#inbox-list');
  if (inbox) inbox.items = inboxItems;

  const stepper = document.querySelector('#order-stepper');
  if (stepper) {
    stepper.steps = createSteps;
    stepper.current = 0;
  }

  const orderSupplier = document.querySelector('#order-supplier');
  if (orderSupplier) {
    orderSupplier.options = purchaseOrders
      .map((item) => item.supplier)
      .filter((value, index, list) => list.indexOf(value) === index)
      .map((label) => ({ label, value: label }));
  }

  const warehouseOptions = warehouses.map((site) => ({ label: site.name, value: site.name }));
  const orderSite = document.querySelector('#order-site');
  if (orderSite) {
    orderSite.options = warehouseOptions;
    orderSite.value = warehouses[0].name;
  }
  const newWarehouse = document.querySelector('#new-warehouse');
  if (newWarehouse) {
    newWarehouse.options = warehouseOptions;
    newWarehouse.value = warehouses[0].name;
  }

  const newCategory = document.querySelector('#new-category');
  if (newCategory) {
    newCategory.options = [
      { label: 'Footwear', value: 'footwear' },
      { label: 'Apparel', value: 'apparel' },
      { label: 'Outdoor gear', value: 'outdoor' },
      { label: 'Bags', value: 'bags' },
      { label: 'Electronics', value: 'electronics' },
    ];
    newCategory.value = 'apparel';
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

  document.querySelector('#nav-toggle')?.addEventListener('click', () => {
    setSidebarOpen(!document.body.classList.contains('sidebar-open'));
  });
  document.querySelector('#nim-backdrop')?.addEventListener('click', () => setSidebarOpen(false));
  document.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
    setSidebarOpen(false);
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
  document.querySelector('#header-order')?.addEventListener('eds-click', () => document.querySelector('#order-modal')?.show());

  document.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
    const value = event.detail?.value;
    if (value === 'inbox') document.querySelector('#inbox-drawer')?.show();
    if (value === 'settings') window.location.hash = '#/settings';
    if (value === 'signout') showToast({ message: 'Signed out of Poluru Supply Co.', variant: 'warning' });
  });

  document.querySelector('#save-order')?.addEventListener('eds-click', () => {
    document.querySelector('#order-modal')?.close();
    showToast({ message: 'Purchase order added to the register', variant: 'success' });
  });
  document.querySelector('#close-order')?.addEventListener('eds-click', () => document.querySelector('#order-modal')?.close());
  document.querySelector('#save-sku')?.addEventListener('eds-click', () => {
    document.querySelector('#sku-modal')?.close();
    showToast({ message: 'SKU added to the catalog', variant: 'success' });
  });
  document.querySelector('#close-sku')?.addEventListener('eds-click', () => document.querySelector('#sku-modal')?.close());

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
    app.innerHTML = `<div class="boot-error"><strong>Nimbus could not start</strong><pre>${error?.stack || error.message}</pre></div>`;
  }
}
