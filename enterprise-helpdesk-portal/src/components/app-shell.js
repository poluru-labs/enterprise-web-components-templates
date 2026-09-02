import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  agents,
  commandItems,
  createSteps,
  currentUser,
  inboxItems,
  productName,
  queueRibbon,
  tickets,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, pageTitle, parseRoute, searchHref } from '../lib/router.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

export class RelayShell extends HTMLElement {
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
      <div class="relay-shell">
        ${sidebarTemplate()}
        <div class="relay-main">
          <relay-header product="${productName}" workspace="${workspaceName}" inbox-count="${inboxItems.length}">
            <eds-tooltip slot="nav-toggle" content="Show sidebar">
              <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
            </eds-tooltip>
            <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
            <eds-visually-hidden slot="search">Search tickets</eds-visually-hidden>
            <eds-search slot="search" id="global-search" placeholder="Search tickets, agents, articles" clearable></eds-search>
            <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
            <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-button slot="create" id="header-create" variant="primary" icon="plus">Create ticket</eds-button>
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
          </relay-header>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
      <button class="relay-backdrop" id="relay-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Ticket filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-assignee" label="Assignee" placeholder="Any assignee"></eds-combobox>
          <eds-combobox id="filter-queue" label="Queue" placeholder="Any queue"></eds-combobox>
          <eds-checkbox label="Only breached SLA" checked></eds-checkbox>
          <eds-switch label="Hide resolved"></eds-switch>
          <eds-slider id="filter-age" label="Max age (hours)" min="1" max="72" value="24" show-value></eds-slider>
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
      <eds-modal id="ticket-modal" heading="Create ticket" close-on-backdrop close-on-escape>
        <eds-stepper id="ticket-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-input label="Requester" placeholder="Maya Poluru" icon="user"></eds-input>
          <eds-select id="ticket-category" label="Category"></eds-select>
          <eds-combobox id="ticket-queue" label="Queue" placeholder="Choose a queue"></eds-combobox>
          <eds-select id="ticket-priority" label="Priority"></eds-select>
          <eds-textarea label="Summary" rows="3" placeholder="Describe the issue briefly"></eds-textarea>
          <eds-radio-group id="ticket-impact" label="Impact" name="ticket-impact" value="single">
            <eds-radio value="single" label="Single user"></eds-radio>
            <eds-radio value="team" label="Team-wide"></eds-radio>
            <eds-radio value="critical" label="Business critical"></eds-radio>
          </eds-radio-group>
          <eds-switch label="Mark as urgent" checked></eds-switch>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-ticket" variant="primary">Create ticket</eds-button>
          <eds-button id="close-ticket" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('relay-header');
    if (header) header.queueRibbon = queueRibbon;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#ticket-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const assigneeOptions = agents.map((item) => ({ label: item.name, value: item.name }));
    const filterAssignee = this.querySelector('#filter-assignee');
    if (filterAssignee) filterAssignee.options = assigneeOptions;

    const filterQueue = this.querySelector('#filter-queue');
    if (filterQueue) {
      filterQueue.options = [
        { label: 'Identity & access', value: 'identity' },
        { label: 'Platform support', value: 'platform' },
        { label: 'Billing & workflow', value: 'billing' },
        { label: 'Infrastructure', value: 'infra' },
      ];
    }

    const ticketCategory = this.querySelector('#ticket-category');
    if (ticketCategory) {
      ticketCategory.options = [
        { label: 'Access', value: 'access' },
        { label: 'Billing', value: 'billing' },
        { label: 'Infrastructure', value: 'infra' },
        { label: 'Hardware', value: 'hardware' },
      ];
      ticketCategory.value = 'access';
    }

    const ticketQueue = this.querySelector('#ticket-queue');
    if (ticketQueue) {
      ticketQueue.options = [
        { label: 'Identity & access', value: 'identity' },
        { label: 'Platform support', value: 'platform' },
        { label: 'Billing & workflow', value: 'billing' },
      ];
    }

    const ticketPriority = this.querySelector('#ticket-priority');
    if (ticketPriority) {
      ticketPriority.options = [
        { label: 'Critical', value: 'critical' },
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ];
      ticketPriority.value = 'medium';
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
    this.querySelector('#relay-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
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
    this.querySelector('#header-create')?.addEventListener('eds-click', () => this.querySelector('#ticket-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Poluru Support', variant: 'warning' });
    });

    this.querySelector('#save-ticket')?.addEventListener('eds-click', () => {
      this.querySelector('#ticket-modal')?.close();
      showToast({ message: 'Ticket HD-4825 created and routed to queue', variant: 'success' });
    });
    this.querySelector('#close-ticket')?.addEventListener('eds-click', () => this.querySelector('#ticket-modal')?.close());
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
    const backdrop = this.querySelector('#relay-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { tickets, workspaceName });
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
    document.title = `${pageTitle(route, { tickets })} · ${productName}`;
  }
}

if (!customElements.get('relay-shell')) {
  customElements.define('relay-shell', RelayShell);
}
