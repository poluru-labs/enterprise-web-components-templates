import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  activeSprint,
  commandItems,
  createSteps,
  currentUser,
  inboxItems,
  people,
  productName,
  projects,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, parseRoute, searchHref, titles } from '../lib/router.js';
import { searchGroups } from '../lib/search.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

export class VesperaShell extends HTMLElement {
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
      <div class="ves-shell">
        ${sidebarTemplate()}
        <div class="ves-main">
          <vespera-header
            sprint-name="${activeSprint.name}"
            days-left="${activeSprint.daysLeft}"
            days-total="${activeSprint.daysTotal}"
            sprint-focus="${activeSprint.focus}"
          >
            <eds-button slot="nav-toggle" id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Open menu"></eds-button>
            <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
            <eds-visually-hidden slot="search">Search projects</eds-visually-hidden>
            <eds-search slot="search" id="global-search" placeholder="Find a project, task, or teammate" clearable></eds-search>
            <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
            <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
              <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
            </eds-tooltip>
            <eds-button slot="task" id="header-task" variant="primary" icon="plus">New task</eds-button>
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
              <eds-menu-item label="Search" value="search" icon="search"></eds-menu-item>
              <eds-menu-item label="Settings" value="settings" icon="settings"></eds-menu-item>
              <eds-menu-item label="Sign out" value="signout" icon="external-link" danger></eds-menu-item>
            </eds-dropdown-menu>
          </vespera-header>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
      <button class="ves-backdrop" id="ves-backdrop" type="button" aria-label="Close navigation" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Board filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-project" label="Project" placeholder="Any project"></eds-combobox>
          <eds-checkbox label="Only my cards" checked></eds-checkbox>
          <eds-switch label="Hide done"></eds-switch>
          <eds-slider id="filter-points" label="Max points" min="1" max="13" value="8" show-value></eds-slider>
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
      <eds-modal id="task-modal" heading="New task" close-on-backdrop close-on-escape>
        <eds-stepper id="task-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-input label="Title" placeholder="Tokenize checkout fields" icon="check"></eds-input>
          <eds-combobox id="task-project" label="Project" placeholder="Choose a project"></eds-combobox>
          <eds-select id="task-modal-owner" label="Owner"></eds-select>
          <eds-number-input id="task-points" label="Points" value="3" min="1" max="13"></eds-number-input>
          <eds-date-picker id="task-due" label="Due"></eds-date-picker>
          <eds-radio-group id="task-priority" label="Priority" name="task-priority" value="med">
            <eds-radio value="low" label="Low"></eds-radio>
            <eds-radio value="med" label="Medium"></eds-radio>
            <eds-radio value="high" label="High"></eds-radio>
          </eds-radio-group>
          <eds-textarea label="Notes" rows="3" placeholder="Acceptance and who unblocks this."></eds-textarea>
          <eds-pin-input id="task-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-task" variant="primary">Create task</eds-button>
          <eds-button id="close-task" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="project-modal" heading="New project" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Name" placeholder="Harbor Checkout" icon="folder"></eds-input>
          <eds-input label="Client" placeholder="Harbor & Co."></eds-input>
          <eds-select id="new-owner" label="Owner"></eds-select>
          <eds-select id="new-type" label="Type"></eds-select>
          <eds-textarea label="Brief" rows="3" placeholder="What we are shipping and by when."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-project" variant="primary">Create</eds-button>
          <eds-button id="close-project" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('vespera-header');
    if (header) header.burndownTicks = activeSprint.burndownTicks;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#task-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const taskProject = this.querySelector('#task-project');
    if (taskProject) {
      taskProject.options = projects.map((item) => ({ label: item.name, value: item.id }));
    }

    const filterProject = this.querySelector('#filter-project');
    if (filterProject) {
      filterProject.options = projects.map((item) => ({ label: item.name, value: item.id }));
    }

    const ownerOptions = people.map((item) => ({ label: item.name, value: item.id }));
    const taskOwner = this.querySelector('#task-modal-owner');
    if (taskOwner) {
      taskOwner.options = ownerOptions;
      taskOwner.value = people[0].id;
    }
    const newOwner = this.querySelector('#new-owner');
    if (newOwner) {
      newOwner.options = ownerOptions;
      newOwner.value = people[0].id;
    }

    const newType = this.querySelector('#new-type');
    if (newType) {
      newType.options = [
        { label: 'Build', value: 'build' },
        { label: 'Design', value: 'design' },
        { label: 'Integration', value: 'integration' },
      ];
      newType.value = 'build';
    }

    const search = this.querySelector('#global-search');
    const commandGroups = [{ group: 'Jump to', items: commandItems }];

    const runSearch = (value) => {
      const query = (value || '').trim();
      const list = this.querySelector('#command-list');
      if (list) {
        const filtered = searchGroups(commandGroups, query)[0]?.items ?? commandItems;
        list.items = filtered.filter(
          (item) => `${item.label} ${item.description}`.toLowerCase().includes(query.toLowerCase()) || !query,
        );
      }
      this.querySelector('#command-modal')?.show();
    };

    const goSearch = (value) => {
      window.location.hash = searchHref(value);
    };

    this.querySelector('#nav-toggle')?.addEventListener('eds-click', () => this.setSidebarOpen(true));
    this.querySelector('#ves-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
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
    this.querySelector('#header-task')?.addEventListener('eds-click', () => this.querySelector('#task-modal')?.show());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'search') window.location.hash = '#/search';
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Fieldline Studio', variant: 'warning' });
    });

    this.querySelector('#save-task')?.addEventListener('eds-click', () => {
      this.querySelector('#task-modal')?.close();
      showToast({ message: 'Task added to Sprint 34', variant: 'success' });
    });
    this.querySelector('#close-task')?.addEventListener('eds-click', () => this.querySelector('#task-modal')?.close());
    this.querySelector('#save-project')?.addEventListener('eds-click', () => {
      this.querySelector('#project-modal')?.close();
      showToast({ message: 'Project added to the portfolio', variant: 'success' });
    });
    this.querySelector('#close-project')?.addEventListener('eds-click', () => this.querySelector('#project-modal')?.close());
    this.querySelector('#apply-filters')?.addEventListener('eds-click', () => {
      this.querySelector('#filter-drawer')?.close();
      showToast({ message: 'Board filters applied', variant: 'success' });
    });
    this.querySelector('#close-filters')?.addEventListener('eds-click', () => this.querySelector('#filter-drawer')?.close());

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
    document.body.classList.toggle('nav-open', open);
    const backdrop = this.querySelector('#ves-backdrop');
    if (backdrop) backdrop.hidden = !open;
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { projects, workspaceName });
  }

  renderRoute() {
    const route = parseRoute();
    if (!window.location.hash) window.location.hash = '#/overview';
    paintNav({ activeHref: activeHref(route) });
    this.paintCrumbs(route);
    this.setSidebarOpen(false);
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

if (!customElements.get('vespera-shell')) {
  customElements.define('vespera-shell', VesperaShell);
}
