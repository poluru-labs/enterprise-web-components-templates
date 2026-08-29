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
  people,
  productLine,
  productName,
  projects,
  workspaceName,
} from './data.js';
import { themeCards } from './ui.js';
import { hydrateView, renderView } from './views.js';

const app = document.querySelector('#app');

const titles = {
  overview: 'Overview',
  projects: 'Projects',
  project: 'Project',
  board: 'Board',
  timeline: 'Timeline',
  tasks: 'Tasks',
  sprints: 'Sprints',
  team: 'Team',
  risks: 'Risks',
  time: 'Time',
  reports: 'Reports',
  settings: 'Settings',
};

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

function activeHref(route) {
  if (route.name === 'project') return '#/projects';
  return `#/${route.name || 'overview'}`;
}

function crumbItems(route) {
  if (route.name === 'project') {
    const project = projects.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Projects', href: '#/projects' },
      { label: project?.name || 'Project', current: true },
    ];
  }
  return [
    { label: workspaceName, href: '#/overview' },
    { label: titles[route.name] || 'Overview', current: true },
  ];
}

function renderShell() {
  app.innerHTML = `
    <div class="ves-shell">
      <aside class="ves-sidebar" id="ves-sidebar" aria-label="Dashboard">
        <a class="wordmark" href="#/overview">
          <span class="brand-mark" aria-hidden="true">V</span>
          <span class="brand-copy">
            <strong>${productName}</strong>
            <small>${productLine}</small>
          </span>
        </a>
        <eds-side-nav id="side-nav"></eds-side-nav>
        <div class="sidebar-foot">
          <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
          <span class="brand-copy">
            <strong>${currentUser.name}</strong>
            <small>${currentUser.role}</small>
          </span>
        </div>
      </aside>
      <div class="ves-main">
        <header class="ves-header">
          <eds-toolbar>
            <div slot="start" class="header-start">
              <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Open menu"></eds-button>
              <eds-breadcrumb id="crumbs"></eds-breadcrumb>
            </div>
            <div slot="center" class="header-search">
              <eds-visually-hidden>Search projects</eds-visually-hidden>
              <eds-search id="global-search" placeholder="Find a project, task, or teammate" clearable></eds-search>
            </div>
            <div slot="end" class="header-end">
              <span class="header-kbd"><eds-kbd keys="⌘K"></eds-kbd></span>
              <eds-tooltip content="Inbox" placement="bottom">
                <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
              </eds-tooltip>
              <eds-popover id="status-pop" heading="Delivery" placement="bottom">
                <eds-button slot="trigger" variant="tertiary" icon="info" icon-only accessible-label="Sprint status"></eds-button>
                <eds-status label="Sprint 24 on track" variant="success" pulse></eds-status>
                <p class="muted mb-0 mt-2">Nimbus SKU feed is the only watch item.</p>
              </eds-popover>
              <eds-button id="header-task" variant="primary" icon="plus">New task</eds-button>
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
  document.body.classList.toggle('nav-open', open);
  const backdrop = document.querySelector('#ves-backdrop');
  if (backdrop) backdrop.hidden = !open;
}

function hydrateShell() {
  const inbox = document.querySelector('#inbox-list');
  if (inbox) inbox.items = inboxItems;

  const stepper = document.querySelector('#task-stepper');
  if (stepper) {
    stepper.steps = createSteps;
    stepper.current = 0;
  }

  const taskProject = document.querySelector('#task-project');
  if (taskProject) {
    taskProject.options = projects.map((item) => ({ label: item.name, value: item.id }));
  }

  const filterProject = document.querySelector('#filter-project');
  if (filterProject) {
    filterProject.options = projects.map((item) => ({ label: item.name, value: item.id }));
  }

  const ownerOptions = people.map((item) => ({ label: item.name, value: item.id }));
  const taskOwner = document.querySelector('#task-modal-owner');
  if (taskOwner) {
    taskOwner.options = ownerOptions;
    taskOwner.value = people[0].id;
  }
  const newOwner = document.querySelector('#new-owner');
  if (newOwner) {
    newOwner.options = ownerOptions;
    newOwner.value = people[0].id;
  }

  const newType = document.querySelector('#new-type');
  if (newType) {
    newType.options = [
      { label: 'Build', value: 'build' },
      { label: 'Design', value: 'design' },
      { label: 'Integration', value: 'integration' },
    ];
    newType.value = 'build';
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

  document.querySelector('#nav-toggle')?.addEventListener('eds-click', () => setSidebarOpen(true));
  document.querySelector('#ves-backdrop')?.addEventListener('click', () => setSidebarOpen(false));
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
  document.querySelector('#header-task')?.addEventListener('eds-click', () => document.querySelector('#task-modal')?.show());

  document.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
    const value = event.detail?.value;
    if (value === 'inbox') document.querySelector('#inbox-drawer')?.show();
    if (value === 'settings') window.location.hash = '#/settings';
    if (value === 'signout') showToast({ message: 'Signed out of Fieldline Studio', variant: 'warning' });
  });

  document.querySelector('#save-task')?.addEventListener('eds-click', () => {
    document.querySelector('#task-modal')?.close();
    showToast({ message: 'Task added to Sprint 24', variant: 'success' });
  });
  document.querySelector('#close-task')?.addEventListener('eds-click', () => document.querySelector('#task-modal')?.close());
  document.querySelector('#save-project')?.addEventListener('eds-click', () => {
    document.querySelector('#project-modal')?.close();
    showToast({ message: 'Project added to the portfolio', variant: 'success' });
  });
  document.querySelector('#close-project')?.addEventListener('eds-click', () => document.querySelector('#project-modal')?.close());
  document.querySelector('#apply-filters')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.close();
    showToast({ message: 'Board filters applied', variant: 'success' });
  });
  document.querySelector('#close-filters')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.close());

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
  setSidebarOpen(false);
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
  themeCards();
  renderRoute();
  window.addEventListener('hashchange', renderRoute);
}

try {
  boot();
} catch (error) {
  console.error(error);
  if (app) {
    app.innerHTML = `<div class="boot-error"><strong>Vespera could not start</strong><pre>${error?.stack || error.message}</pre></div>`;
  }
}
