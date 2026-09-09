import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  addPolicy,
  commandItems,
  currentUser,
  frameworkOptions,
  frameworks,
  inboxItems,
  people,
  policies,
  productName,
  workspace,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, parseRoute, searchHref, titles } from '../lib/router.js';
import { searchGroups } from '../lib/search.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

export class AegisShell extends HTMLElement {
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
      <div class="aegis-shell">
        ${sidebarTemplate()}
        <div class="aegis-main">
          <aegis-header
            product="${productName}"
            workspace="${workspaceName}"
            inbox-count="${inboxItems.length}"
            audit-label="${workspace.nextAudit.replace(' Type II', '')}"
          >
            <eds-tooltip slot="nav-toggle" content="Show sidebar">
              <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
            </eds-tooltip>
            <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
            <eds-visually-hidden slot="search">Search policies</eds-visually-hidden>
            <eds-search slot="search" id="global-search" placeholder="Find a policy, control, or task" clearable></eds-search>
            <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
            <eds-button slot="add" id="header-add" variant="primary" icon="plus">New policy</eds-button>
            <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-dropdown-menu slot="profile" id="profile-menu" placement="left">
              <button slot="trigger" class="profile-trigger" type="button">
                <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
                <span class="profile-copy">
                  <strong>${currentUser.name}</strong>
                  <small>${currentUser.role}</small>
                </span>
                <eds-icon name="chevron-down" size="sm"></eds-icon>
              </button>
              <eds-menu-item label="Settings" value="settings" icon="settings"></eds-menu-item>
              <eds-menu-item label="Command palette" value="palette" icon="search"></eds-menu-item>
              <eds-menu-item label="Sign out" value="signout" icon="external-link" danger></eds-menu-item>
            </eds-dropdown-menu>
          </aegis-header>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
      <button class="aegis-backdrop" id="aegis-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-modal id="command-modal" heading="Jump to anything" close-on-backdrop close-on-escape>
        <eds-search id="command-search" placeholder="Policies, controls, audits…" clearable></eds-search>
        <eds-list id="command-list" divided class="mt-3"></eds-list>
        <div slot="footer">
          <eds-button id="close-command" variant="tertiary">Close</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="policy-modal" heading="New policy" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input id="pol-name" label="Name" placeholder="Data classification policy" icon="file"></eds-input>
          <eds-select id="pol-owner" label="Owner"></eds-select>
          <eds-select id="pol-framework" label="Primary framework"></eds-select>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-policy" variant="primary">Create draft</eds-button>
          <eds-button id="close-policy" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('aegis-header');
    if (header) header.frameworks = frameworks;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) {
      inbox.items = inboxItems.map((item) => ({
        label: item.label,
        description: item.description,
        icon: item.icon,
        href: item.href,
      }));
    }

    const owner = this.querySelector('#pol-owner');
    if (owner) {
      owner.options = people.map((item) => ({ label: item.name, value: item.name }));
      owner.value = currentUser.name;
    }
    const framework = this.querySelector('#pol-framework');
    if (framework) {
      framework.options = frameworkOptions;
      framework.value = 'SOC 2';
    }

    const search = this.querySelector('#global-search');
    const commandSearch = this.querySelector('#command-search');

    const paintCommand = (value) => {
      const query = (value || '').trim().toLowerCase();
      const groups = searchGroups(
        [{ group: 'All', items: commandItems.map((item) => ({ ...item, hint: item.description })) }],
        query,
      );
      const list = this.querySelector('#command-list');
      if (list) {
        list.items = (groups[0]?.items || []).map((item) => ({
          label: item.label,
          description: item.hint || item.description,
          icon: item.icon,
        }));
      }
    };

    const runSearch = (value) => {
      paintCommand(value);
      this.querySelector('#command-modal')?.show();
    };

    const goSearch = (value) => {
      window.location.hash = searchHref(value);
    };

    this.querySelector('#nav-toggle')?.addEventListener('eds-click', () => {
      this.setSidebarOpen(!document.body.classList.contains('sidebar-open'));
    });
    this.querySelector('#sidebar-close')?.addEventListener('click', () => this.setSidebarOpen(false));
    this.querySelector('#aegis-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
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

    commandSearch?.addEventListener('eds-input', (event) => paintCommand(event.detail?.value ?? ''));
    this.querySelector('#command-list')?.addEventListener('eds-select', (event) => {
      const item = commandItems.find((entry) => entry.label === event.detail?.label);
      this.querySelector('#command-modal')?.close();
      if (item?.href === '#add-policy') {
        this.querySelector('#policy-modal')?.show();
        return;
      }
      if (item) window.location.hash = item.href;
    });

    this.querySelector('#notify-btn')?.addEventListener('eds-click', () => this.querySelector('#inbox-drawer')?.show());
    this.querySelector('#close-inbox')?.addEventListener('eds-click', () => this.querySelector('#inbox-drawer')?.close());
    this.querySelector('#close-command')?.addEventListener('eds-click', () => this.querySelector('#command-modal')?.close());
    this.querySelector('#header-add')?.addEventListener('eds-click', () => this.querySelector('#policy-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'palette') runSearch('');
      if (value === 'signout') showToast({ message: 'Signed out of Poluru Trust', variant: 'warning' });
    });

    this.querySelector('#save-policy')?.addEventListener('eds-click', () => {
      const name = this.querySelector('#pol-name')?.value;
      if (!name?.trim()) {
        showToast({ message: 'Name required', variant: 'warning' });
        return;
      }
      const record = addPolicy({
        name,
        owner: this.querySelector('#pol-owner')?.value,
        framework: this.querySelector('#pol-framework')?.value,
      });
      this.querySelector('#policy-modal')?.close();
      showToast({ message: `${record.code} drafted`, variant: 'success' });
      window.location.hash = `#/policy/${record.id}`;
    });
    this.querySelector('#close-policy')?.addEventListener('eds-click', () => this.querySelector('#policy-modal')?.close());

    this.querySelector('#inbox-list')?.addEventListener('eds-select', (event) => {
      const item = inboxItems.find((entry) => entry.label === event.detail?.label);
      this.querySelector('#inbox-drawer')?.close();
      if (item?.href) window.location.hash = item.href;
    });

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

    paintCommand('');
  }

  setSidebarOpen(open) {
    document.body.classList.toggle('sidebar-open', open);
    const backdrop = this.querySelector('#aegis-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { policies, workspaceName });
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

if (!customElements.get('aegis-shell')) {
  customElements.define('aegis-shell', AegisShell);
}
