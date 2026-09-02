import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  commandItems,
  createSteps,
  currentUser,
  inboundDock,
  inboxItems,
  productLine,
  productName,
  purchaseOrders,
  stockHealth,
  warehouses,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, parseRoute, searchHref, titles } from '../lib/router.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

export class NimbusShell extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === '1') return;
    this.dataset.ready = '1';
    this.render();
    this.hydrate();
    setDensity('comfortable');
    this.setSidebarOpen(false);
    themeCards(this);
    this.renderRoute();
    this.onHashChange = () => this.renderRoute();
    window.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.onHashChange);
    if (this.onKeydown) document.removeEventListener('keydown', this.onKeydown);
  }

  render() {
    this.innerHTML = `
      <div class="nim-shell">
        <nimbus-header product="${productName}" workspace="${workspaceName}" product-line="${productLine}">
          <button slot="nav-toggle" class="nav-toggle" id="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
            <i class="bi bi-list" aria-hidden="true"></i>
          </button>
          <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
          <eds-visually-hidden slot="search">Search inventory</eds-visually-hidden>
          <eds-search slot="search" id="global-search" placeholder="Find a SKU, order, or warehouse" clearable></eds-search>
          <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
          <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
            <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
          </eds-tooltip>
          <eds-button slot="receipt" id="header-receipt" variant="primary" icon="plus">New receipt</eds-button>
          <eds-dropdown-menu slot="profile" id="profile-menu" placement="left">
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
        </nimbus-header>
        <div class="nim-body">
          ${sidebarTemplate()}
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

    const header = this.querySelector('nimbus-header');
    if (header) {
      header.stockHealth = stockHealth;
      header.inboundDock = inboundDock;
    }
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#order-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const orderSupplier = this.querySelector('#order-supplier');
    if (orderSupplier) {
      orderSupplier.options = purchaseOrders
        .map((item) => item.supplier)
        .filter((value, index, list) => list.indexOf(value) === index)
        .map((label) => ({ label, value: label }));
    }

    const warehouseOptions = warehouses.map((site) => ({ label: site.name, value: site.name }));
    const orderSite = this.querySelector('#order-site');
    if (orderSite) {
      orderSite.options = warehouseOptions;
      orderSite.value = warehouses[0].name;
    }
    const newWarehouse = this.querySelector('#new-warehouse');
    if (newWarehouse) {
      newWarehouse.options = warehouseOptions;
      newWarehouse.value = warehouses[0].name;
    }

    const newCategory = this.querySelector('#new-category');
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

    const search = this.querySelector('#global-search');

    const runSearch = (value) => {
      const query = (value || '').trim().toLowerCase();
      const list = this.querySelector('#command-list');
      if (list) {
        list.items = commandItems.filter(
          (item) => `${item.label} ${item.description}`.toLowerCase().includes(query) || !query,
        );
      }
      this.querySelector('#command-modal')?.show();
    };

    const goSearch = (value) => {
      window.location.hash = searchHref(value);
    };

    this.querySelector('#nav-toggle')?.addEventListener('click', () => {
      this.setSidebarOpen(!document.body.classList.contains('sidebar-open'));
    });
    this.querySelector('#nim-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
    this.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
      const href = event.detail?.href ?? event.detail?.item?.href;
      if (href) window.location.hash = href;
      this.setSidebarOpen(false);
    });

    search?.addEventListener('eds-change', (event) => goSearch(event.detail?.value ?? ''));
    search?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        goSearch(search.value);
      }
    });

    this.querySelector('#command-list')?.addEventListener('eds-select', (event) => {
      const item = commandItems.find((entry) => entry.label === event.detail?.label);
      this.querySelector('#command-modal')?.close();
      if (item) window.location.hash = item.href;
    });

    this.querySelector('#notify-btn')?.addEventListener('eds-click', () => this.querySelector('#inbox-drawer')?.show());
    this.querySelector('#close-inbox')?.addEventListener('eds-click', () => this.querySelector('#inbox-drawer')?.close());
    this.querySelector('#close-command')?.addEventListener('eds-click', () => this.querySelector('#command-modal')?.close());
    this.querySelector('#header-receipt')?.addEventListener('eds-click', () => this.querySelector('#order-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Poluru Supply Co.', variant: 'warning' });
    });

    this.querySelector('#save-order')?.addEventListener('eds-click', () => {
      this.querySelector('#order-modal')?.close();
      showToast({ message: 'Purchase order added to the register', variant: 'success' });
    });
    this.querySelector('#close-order')?.addEventListener('eds-click', () => this.querySelector('#order-modal')?.close());
    this.querySelector('#save-sku')?.addEventListener('eds-click', () => {
      this.querySelector('#sku-modal')?.close();
      showToast({ message: 'SKU added to the catalog', variant: 'success' });
    });
    this.querySelector('#close-sku')?.addEventListener('eds-click', () => this.querySelector('#sku-modal')?.close());

    this.onKeydown = (event) => {
      if (event.key === 'Escape') this.setSidebarOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        runSearch(search?.value ?? '');
      }
    };
    document.addEventListener('keydown', this.onKeydown);
  }

  setSidebarOpen(open) {
    document.body.classList.toggle('sidebar-open', open);
    const backdrop = this.querySelector('#nim-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { workspaceName });
  }

  renderRoute() {
    const route = parseRoute();
    if (!window.location.hash) window.location.hash = '#/overview';
    paintNav({ activeHref: activeHref(route) });
    this.paintCrumbs(route);
    const view = this.querySelector('#view');
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
}

if (!customElements.get('nimbus-shell')) {
  customElements.define('nimbus-shell', NimbusShell);
}
