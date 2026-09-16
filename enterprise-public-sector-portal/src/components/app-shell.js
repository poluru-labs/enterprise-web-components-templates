import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  commandItems,
  createSteps,
  currentUser,
  departments,
  inboxItems,
  people,
  productName,
  requests,
  tickerItems,
  workspace,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, parseRoute, searchHref, titles } from '../lib/router.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

export class CivicShell extends HTMLElement {
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
      <div class="civic-shell">
        ${sidebarTemplate()}
        <div class="civic-main">
          <civic-header product="${productName}" workspace="${workspaceName}" period="${workspace.period}" inbox-count="${inboxItems.length}">
            <eds-tooltip slot="nav-toggle" content="Show sidebar">
              <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
            </eds-tooltip>
            <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
            <eds-visually-hidden slot="search">Search requests</eds-visually-hidden>
            <eds-search slot="search" id="global-search" placeholder="Find a request, permit, or case" clearable></eds-search>
            <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
            <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-button slot="create" id="header-create" variant="primary" icon="plus">New request</eds-button>
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
          </civic-header>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
      <button class="civic-backdrop" id="civic-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Request filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-owner" label="Owner" placeholder="Any owner"></eds-combobox>
          <eds-checkbox label="Only my desk" checked></eds-checkbox>
          <eds-switch label="Hide complete"></eds-switch>
          <eds-slider id="filter-age" label="Min age (days)" min="0" max="14" value="2" show-value></eds-slider>
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
      <eds-modal id="request-modal" heading="New 311 request" close-on-backdrop close-on-escape>
        <eds-stepper id="request-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-input label="Title" placeholder="Pothole on Oak Street" icon="folder"></eds-input>
          <eds-select id="new-dept" label="Department"></eds-select>
          <eds-combobox id="new-owner" label="Owner" placeholder="Choose an owner"></eds-combobox>
          <eds-select id="new-ward" label="Ward"></eds-select>
          <eds-date-picker id="new-due" label="Due"></eds-date-picker>
          <eds-radio-group id="new-channel" label="Channel" name="new-channel" value="app">
            <eds-radio value="app" label="App"></eds-radio>
            <eds-radio value="phone" label="Phone"></eds-radio>
            <eds-radio value="web" label="Web"></eds-radio>
          </eds-radio-group>
          <eds-textarea label="Notes" rows="3" placeholder="Location, photos, and who already went out."></eds-textarea>
          <eds-pin-input id="request-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-request" variant="primary">Create request</eds-button>
          <eds-button id="close-request" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="hearing-modal" heading="Set a hearing" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-select id="hearing-case" label="Case"></eds-select>
          <eds-date-picker id="hearing-day" label="Date"></eds-date-picker>
          <eds-time-picker id="hearing-time" label="Time"></eds-time-picker>
          <eds-textarea label="Notice" rows="3" placeholder="What the board will hear."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-hearing" variant="primary">Hold the date</eds-button>
          <eds-button id="close-hearing" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('civic-header');
    if (header) header.tickerItems = tickerItems;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#request-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const ownerOptions = people.map((item) => ({ label: item.name, value: item.name }));
    const newOwner = this.querySelector('#new-owner');
    if (newOwner) {
      newOwner.options = ownerOptions;
      newOwner.value = people[2].name;
    }
    const filterOwner = this.querySelector('#filter-owner');
    if (filterOwner) filterOwner.options = ownerOptions;

    const newDept = this.querySelector('#new-dept');
    if (newDept) {
      newDept.options = departments.map((item) => ({ label: item.name, value: item.name }));
      newDept.value = 'Public works';
    }
    const newWard = this.querySelector('#new-ward');
    if (newWard) {
      newWard.options = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6'].map((label) => ({ label, value: label }));
      newWard.value = 'Ward 2';
    }

    const hearingCase = this.querySelector('#hearing-case');
    if (hearingCase) {
      hearingCase.options = [
        { label: 'Housing vacancy 14 Elm', value: 'cs_housing' },
        { label: 'Repeat noise 6 Dock', value: 'cs_noise' },
        { label: 'Illegal dump alley 9', value: 'cs_dump' },
        { label: 'Cafe license renewal', value: 'cs_license' },
      ];
      hearingCase.value = 'cs_noise';
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

    this.querySelector('#nav-toggle')?.addEventListener('eds-click', () => {
      this.setSidebarOpen(!document.body.classList.contains('sidebar-open'));
    });
    this.querySelector('#sidebar-close')?.addEventListener('click', () => this.setSidebarOpen(false));
    this.querySelector('#civic-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
    this.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
      const href = event.detail?.href ?? event.detail?.item?.href;
      if (href) window.location.hash = href;
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
    this.querySelector('#header-create')?.addEventListener('eds-click', () => this.querySelector('#request-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Harbor City', variant: 'warning' });
    });

    this.querySelector('#save-request')?.addEventListener('eds-click', () => {
      this.querySelector('#request-modal')?.close();
      showToast({ message: 'Request added to the 311 board', variant: 'success' });
    });
    this.querySelector('#close-request')?.addEventListener('eds-click', () => this.querySelector('#request-modal')?.close());
    this.querySelector('#save-hearing')?.addEventListener('eds-click', () => {
      this.querySelector('#hearing-modal')?.close();
      showToast({ message: 'Hearing held on the docket', variant: 'success' });
    });
    this.querySelector('#close-hearing')?.addEventListener('eds-click', () => this.querySelector('#hearing-modal')?.close());
    this.querySelector('#apply-filters')?.addEventListener('eds-click', () => {
      this.querySelector('#filter-drawer')?.close();
      showToast({ message: 'Filters applied', variant: 'success' });
    });
    this.querySelector('#close-filters')?.addEventListener('eds-click', () => this.querySelector('#filter-drawer')?.close());

    this.onKeydown = (event) => {
      if (event.key === 'Escape') this.setSidebarOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        runSearch(search?.value ?? '');
      }
      if ((event.metaKey || event.ctrlKey) && event.key === '\\') {
        event.preventDefault();
        this.setSidebarOpen(!document.body.classList.contains('sidebar-open'));
      }
    };
    document.addEventListener('keydown', this.onKeydown);
  }

  setSidebarOpen(open) {
    document.body.classList.toggle('sidebar-open', open);
    const backdrop = this.querySelector('#civic-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { requests, workspaceName });
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

if (!customElements.get('civic-shell')) {
  customElements.define('civic-shell', CivicShell);
}
