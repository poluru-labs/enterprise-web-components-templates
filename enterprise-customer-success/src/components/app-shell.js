import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  accounts,
  commandItems,
  createSteps,
  currentUser,
  inboxItems,
  people,
  productName,
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

export class PulseShell extends HTMLElement {
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
      <div class="pulse-shell">
        ${sidebarTemplate()}
        <div class="pulse-main">
          <pulse-header product="${productName}" workspace="${workspaceName}" period="${workspace.period}" inbox-count="${inboxItems.length}">
            <eds-tooltip slot="nav-toggle" content="Show sidebar">
              <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
            </eds-tooltip>
            <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
            <eds-visually-hidden slot="search">Search accounts</eds-visually-hidden>
            <eds-search slot="search" id="global-search" placeholder="Find an account, renewal, or CSM" clearable></eds-search>
            <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
            <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-button slot="create" id="header-create" variant="primary" icon="plus">New account</eds-button>
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
          </pulse-header>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
      <button class="pulse-backdrop" id="pulse-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Account filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-csm" label="CSM" placeholder="Any CSM"></eds-combobox>
          <eds-checkbox label="Only my book" checked></eds-checkbox>
          <eds-switch label="Hide healthy"></eds-switch>
          <eds-slider id="filter-health" label="Min health" min="0" max="100" value="70" show-value></eds-slider>
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
      <eds-modal id="account-modal" heading="New account" close-on-backdrop close-on-escape>
        <eds-stepper id="account-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-input label="Name" placeholder="Harbor & Co." icon="folder"></eds-input>
          <eds-combobox id="new-csm" label="CSM" placeholder="Choose a CSM"></eds-combobox>
          <eds-select id="new-segment" label="Segment"></eds-select>
          <eds-number-input id="new-arr" label="ARR (USD)" value="240000" min="0" max="5000000" step="1000"></eds-number-input>
          <eds-date-picker id="new-renew" label="Renewal date"></eds-date-picker>
          <eds-radio-group id="new-plan" label="Plan" name="new-plan" value="growth">
            <eds-radio value="starter" label="Starter"></eds-radio>
            <eds-radio value="growth" label="Growth"></eds-radio>
            <eds-radio value="enterprise" label="Enterprise"></eds-radio>
          </eds-radio-group>
          <eds-textarea label="Notes" rows="3" placeholder="Who owns the relationship and what success looks like."></eds-textarea>
          <eds-pin-input id="account-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-account" variant="primary">Create account</eds-button>
          <eds-button id="close-account" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="play-modal" heading="Run a playbook" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-select id="play-pick" label="Playbook"></eds-select>
          <eds-select id="play-account" label="Account"></eds-select>
          <eds-textarea label="Why now" rows="3" placeholder="Health dip, renewal window, or expansion signal."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-play" variant="primary">Start run</eds-button>
          <eds-button id="close-play" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('pulse-header');
    if (header) header.tickerItems = tickerItems;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#account-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const csmOptions = people.map((item) => ({ label: item.name, value: item.name }));
    const newCsm = this.querySelector('#new-csm');
    if (newCsm) {
      newCsm.options = csmOptions;
      newCsm.value = people[1].name;
    }
    const filterCsm = this.querySelector('#filter-csm');
    if (filterCsm) filterCsm.options = csmOptions;

    const newSegment = this.querySelector('#new-segment');
    if (newSegment) {
      newSegment.options = [
        { label: 'Enterprise', value: 'Enterprise' },
        { label: 'Mid-market', value: 'Mid-market' },
        { label: 'SMB', value: 'SMB' },
      ];
      newSegment.value = 'Enterprise';
    }

    const playPick = this.querySelector('#play-pick');
    if (playPick) {
      playPick.options = [
        { label: 'Health recovery', value: 'pb_risk' },
        { label: '90-day renewal', value: 'pb_renew' },
        { label: 'First 60 days', value: 'pb_onboard' },
        { label: 'Seat attach', value: 'pb_expand' },
        { label: 'Detractor save', value: 'pb_nps' },
      ];
      playPick.value = 'pb_risk';
    }
    const playAccount = this.querySelector('#play-account');
    if (playAccount) {
      playAccount.options = accounts.map((item) => ({ label: item.name, value: item.id }));
      playAccount.value = 'ac_lattice';
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
    this.querySelector('#pulse-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
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
    this.querySelector('#header-create')?.addEventListener('eds-click', () => this.querySelector('#account-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Aetherline', variant: 'warning' });
    });

    this.querySelector('#save-account')?.addEventListener('eds-click', () => {
      this.querySelector('#account-modal')?.close();
      showToast({ message: 'Account added to the book', variant: 'success' });
    });
    this.querySelector('#close-account')?.addEventListener('eds-click', () => this.querySelector('#account-modal')?.close());
    this.querySelector('#save-play')?.addEventListener('eds-click', () => {
      this.querySelector('#play-modal')?.close();
      showToast({ message: 'Playbook run started', variant: 'success' });
    });
    this.querySelector('#close-play')?.addEventListener('eds-click', () => this.querySelector('#play-modal')?.close());
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
    const backdrop = this.querySelector('#pulse-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { accounts, workspaceName });
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

if (!customElements.get('pulse-shell')) {
  customElements.define('pulse-shell', PulseShell);
}
