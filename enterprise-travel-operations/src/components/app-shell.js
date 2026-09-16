import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  commandItems,
  createSteps,
  currentUser,
  inboxItems,
  productName,
  tickerItems,
  travelers,
  trips,
  workspace,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, parseRoute, searchHref, titles } from '../lib/router.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

export class WayShell extends HTMLElement {
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
      <div class="way-shell">
        ${sidebarTemplate()}
        <div class="way-main">
          <way-header product="${productName}" workspace="${workspaceName}" period="${workspace.period}" inbox-count="${inboxItems.length}">
            <eds-tooltip slot="nav-toggle" content="Show sidebar">
              <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
            </eds-tooltip>
            <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
            <eds-visually-hidden slot="search">Search trips</eds-visually-hidden>
            <eds-search slot="search" id="global-search" placeholder="Find a trip, traveler, or city" clearable></eds-search>
            <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
            <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-button slot="create" id="header-create" variant="primary" icon="plus">New trip</eds-button>
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
          </way-header>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
      <button class="way-backdrop" id="way-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Trip filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-traveler" label="Traveler" placeholder="Any traveler"></eds-combobox>
          <eds-checkbox label="Only my approvals" checked></eds-checkbox>
          <eds-switch label="Hide completed"></eds-switch>
          <eds-slider id="filter-cost" label="Min cost" min="0" max="10000" value="500" show-value></eds-slider>
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
      <eds-modal id="trip-modal" heading="New trip" close-on-backdrop close-on-escape>
        <eds-stepper id="trip-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-combobox id="new-traveler" label="Traveler" placeholder="Choose a traveler"></eds-combobox>
          <eds-input label="City" placeholder="Lagos" icon="folder"></eds-input>
          <eds-select id="new-purpose" label="Purpose"></eds-select>
          <eds-number-input id="new-cost" label="Estimated cost (USD)" value="2400" min="0" max="20000" step="50"></eds-number-input>
          <eds-date-picker id="new-depart" label="Depart"></eds-date-picker>
          <eds-date-picker id="new-return" label="Return"></eds-date-picker>
          <eds-radio-group id="new-cabin" label="Cabin" name="new-cabin" value="economy">
            <eds-radio value="economy" label="Economy"></eds-radio>
            <eds-radio value="plus" label="Economy plus"></eds-radio>
            <eds-radio value="business" label="Business"></eds-radio>
          </eds-radio-group>
          <eds-textarea label="Notes" rows="3" placeholder="Why this trip is on the books and who signs."></eds-textarea>
          <eds-pin-input id="trip-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-trip" variant="primary">Create trip</eds-button>
          <eds-button id="close-trip" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="policy-modal" heading="Policy exception" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-select id="policy-pick" label="Policy"></eds-select>
          <eds-select id="policy-trip" label="Trip"></eds-select>
          <eds-textarea label="Why now" rows="3" placeholder="Restricted country, hotel cap, or cabin rule."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-policy" variant="primary">File exception</eds-button>
          <eds-button id="close-policy" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('way-header');
    if (header) header.tickerItems = tickerItems;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#trip-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const travelerOptions = travelers.map((item) => ({ label: item.name, value: item.name }));
    const newTraveler = this.querySelector('#new-traveler');
    if (newTraveler) {
      newTraveler.options = travelerOptions;
      newTraveler.value = travelers[1].name;
    }
    const filterTraveler = this.querySelector('#filter-traveler');
    if (filterTraveler) filterTraveler.options = travelerOptions;

    const newPurpose = this.querySelector('#new-purpose');
    if (newPurpose) {
      newPurpose.options = [
        { label: 'Client', value: 'Client' },
        { label: 'Internal', value: 'Internal' },
        { label: 'Conference', value: 'Conference' },
        { label: 'Duty of care', value: 'Duty of care' },
      ];
      newPurpose.value = 'Client';
    }

    const policyPick = this.querySelector('#policy-pick');
    if (policyPick) {
      policyPick.options = [
        { label: 'Restricted country', value: 'po_rest' },
        { label: 'Hotel cap', value: 'po_cap' },
        { label: 'Cabin exception', value: 'po_cabin' },
        { label: 'Duty of care', value: 'po_duty' },
      ];
      policyPick.value = 'po_rest';
    }
    const policyTrip = this.querySelector('#policy-trip');
    if (policyTrip) {
      policyTrip.options = trips.map((item) => ({ label: `${item.traveler} · ${item.city}`, value: item.id }));
      policyTrip.value = 'tr_lagos';
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
    this.querySelector('#way-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
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
    this.querySelector('#header-create')?.addEventListener('eds-click', () => this.querySelector('#trip-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Meridian Group', variant: 'warning' });
    });

    this.querySelector('#save-trip')?.addEventListener('eds-click', () => {
      this.querySelector('#trip-modal')?.close();
      showToast({ message: 'Trip added to the book', variant: 'success' });
    });
    this.querySelector('#close-trip')?.addEventListener('eds-click', () => this.querySelector('#trip-modal')?.close());
    this.querySelector('#save-policy')?.addEventListener('eds-click', () => {
      this.querySelector('#policy-modal')?.close();
      showToast({ message: 'Exception filed', variant: 'success' });
    });
    this.querySelector('#close-policy')?.addEventListener('eds-click', () => this.querySelector('#policy-modal')?.close());
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
    const backdrop = this.querySelector('#way-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { trips, workspaceName });
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

if (!customElements.get('way-shell')) {
  customElements.define('way-shell', WayShell);
}
