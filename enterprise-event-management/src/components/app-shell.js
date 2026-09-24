import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  commandItems,
  createSteps,
  currentUser,
  events,
  inboxItems,
  people,
  productName,
  tickerItems,
  venues,
  workspace,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, parseRoute, searchHref, titles } from '../lib/router.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

export class GatherShell extends HTMLElement {
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
      <div class="gather-shell">
        ${sidebarTemplate()}
        <div class="gather-main">
          <gather-header product="${productName}" workspace="${workspaceName}" period="${workspace.period}" inbox-count="${inboxItems.length}">
            <eds-tooltip slot="nav-toggle" content="Show sidebar">
              <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
            </eds-tooltip>
            <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
            <eds-visually-hidden slot="search">Search events</eds-visually-hidden>
            <eds-search slot="search" id="global-search" placeholder="Find an event, guest, or room" clearable></eds-search>
            <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
            <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-button slot="create" id="header-create" variant="primary" icon="plus">New event</eds-button>
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
          </gather-header>
          <main id="view" tabindex="-1"></main>
          <footer class="app-footer">
            <p class="app-footer-author">
              Created by
              <a href="https://polurus.com" target="_blank" rel="noopener noreferrer"><strong>Subrahmanyam Poluru</strong></a>
            </p>
            <p class="app-footer-built">
              Built with
              <a href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc" target="_blank" rel="noopener noreferrer">@poluru-labs/enterprise-design-system-wc</a>
            </p>
          </footer>
        </div>
      </div>
      <button class="gather-backdrop" id="gather-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Event filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-owner" label="Owner" placeholder="Any owner"></eds-combobox>
          <eds-checkbox label="Only my desk" checked></eds-checkbox>
          <eds-switch label="Hide complete"></eds-switch>
          <eds-slider id="filter-fill" label="Min fill (%)" min="0" max="100" value="40" show-value></eds-slider>
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
      <eds-modal id="event-modal" heading="New event" close-on-backdrop close-on-escape>
        <eds-stepper id="event-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-input label="Name" placeholder="Northline Summit" icon="folder"></eds-input>
          <eds-select id="new-type" label="Type"></eds-select>
          <eds-combobox id="new-owner" label="Owner" placeholder="Choose an owner"></eds-combobox>
          <eds-select id="new-venue" label="Venue"></eds-select>
          <eds-date-picker id="new-start" label="Start"></eds-date-picker>
          <eds-radio-group id="new-track" label="Track" name="new-track" value="flagship">
            <eds-radio value="flagship" label="Flagship"></eds-radio>
            <eds-radio value="product" label="Product"></eds-radio>
            <eds-radio value="community" label="Community"></eds-radio>
          </eds-radio-group>
          <eds-textarea label="Notes" rows="3" placeholder="Room hold, AV, and who owns load-in."></eds-textarea>
          <eds-pin-input id="event-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-event" variant="primary">Create event</eds-button>
          <eds-button id="close-event" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="checkin-modal" heading="Check in a guest" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-select id="checkin-event" label="Event"></eds-select>
          <eds-input label="Guest" placeholder="Rohan Poluru" icon="user"></eds-input>
          <eds-select id="checkin-gate" label="Gate"></eds-select>
          <eds-textarea label="Note" rows="3" placeholder="Badge reprint, plus-one, or late arrival."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-checkin" variant="primary">Check in</eds-button>
          <eds-button id="close-checkin" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('gather-header');
    if (header) header.tickerItems = tickerItems;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#event-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const ownerOptions = people.map((item) => ({ label: item.name, value: item.name }));
    const newOwner = this.querySelector('#new-owner');
    if (newOwner) {
      newOwner.options = ownerOptions;
      newOwner.value = people[0].name;
    }
    const filterOwner = this.querySelector('#filter-owner');
    if (filterOwner) filterOwner.options = ownerOptions;

    const newType = this.querySelector('#new-type');
    if (newType) {
      newType.options = ['Conference', 'Workshop', 'Forum', 'Breakfast', 'Dinner', 'Briefing', 'Salon'].map((label) => ({
        label,
        value: label,
      }));
      newType.value = 'Conference';
    }
    const newVenue = this.querySelector('#new-venue');
    if (newVenue) {
      newVenue.options = venues.map((item) => ({ label: `${item.name} · ${item.seats} seats`, value: item.id }));
      newVenue.value = 'vn_halla';
    }

    const checkinEvent = this.querySelector('#checkin-event');
    if (checkinEvent) {
      checkinEvent.options = events.map((item) => ({ label: item.name, value: item.id }));
      checkinEvent.value = 'ev_north';
    }
    const checkinGate = this.querySelector('#checkin-gate');
    if (checkinGate) {
      checkinGate.options = [
        { label: 'Foyer A', value: 'foyer-a' },
        { label: 'Foyer B', value: 'foyer-b' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Courtyard', value: 'courtyard' },
      ];
      checkinGate.value = 'foyer-a';
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
    this.querySelector('#gather-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
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
    this.querySelector('#header-create')?.addEventListener('eds-click', () => this.querySelector('#event-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Alder Hall', variant: 'warning' });
    });

    this.querySelector('#save-event')?.addEventListener('eds-click', () => {
      this.querySelector('#event-modal')?.close();
      showToast({ message: 'Event added to the book', variant: 'success' });
    });
    this.querySelector('#close-event')?.addEventListener('eds-click', () => this.querySelector('#event-modal')?.close());
    this.querySelector('#save-checkin')?.addEventListener('eds-click', () => {
      this.querySelector('#checkin-modal')?.close();
      showToast({ message: 'Guest checked in', variant: 'success' });
    });
    this.querySelector('#close-checkin')?.addEventListener('eds-click', () => this.querySelector('#checkin-modal')?.close());
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
    const backdrop = this.querySelector('#gather-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { events, workspaceName });
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

if (!customElements.get('gather-shell')) {
  customElements.define('gather-shell', GatherShell);
}
