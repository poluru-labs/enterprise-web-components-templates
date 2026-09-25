import { setDensity, showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  assets,
  changes,
  commandItems,
  createSteps,
  currentUser,
  inboxItems,
  incidents,
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

function megaLink(href, icon, label, hint) {
  return `
    <a href="${href}">
      <eds-icon name="${icon}" size="sm"></eds-icon>
      <span class="mega-link-copy">
        ${label}
        ${hint ? `<small>${hint}</small>` : ''}
      </span>
      <eds-icon name="chevron-right" size="sm"></eds-icon>
    </a>`;
}

export class TechstarShell extends HTMLElement {
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
      <div class="ts-shell">
        <techstar-header product="${productName}" workspace="${workspaceName}" period="${workspace.period}" inbox-count="${inboxItems.length}">
          <eds-tooltip slot="nav-toggle" content="Show sidebar">
            <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
          </eds-tooltip>
          <nav slot="mega" class="mega-nav" aria-label="Workspace">
            <button class="mega-toggle" id="mega-ops" type="button" data-panel="ops" aria-expanded="false" aria-controls="mega-menu">
              Operations <eds-icon name="chevron-down" size="sm"></eds-icon>
            </button>
            <button class="mega-toggle" id="mega-estate" type="button" data-panel="estate" aria-expanded="false" aria-controls="mega-menu">
              Estate <eds-icon name="chevron-down" size="sm"></eds-icon>
            </button>
            <button class="mega-toggle" id="mega-svc" type="button" data-panel="services" aria-expanded="false" aria-controls="mega-menu">
              Services <eds-icon name="chevron-down" size="sm"></eds-icon>
            </button>
          </nav>
          <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
          <eds-visually-hidden slot="search">Search operations</eds-visually-hidden>
          <eds-search slot="search" id="global-search" placeholder="Find an incident, CI, or change" clearable></eds-search>
          <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
          <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
            <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
          </eds-tooltip>
          <eds-button slot="alert" id="header-raise" variant="primary" icon="plus">Raise incident</eds-button>
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
        </techstar-header>
        <div id="mega-menu" class="mega-menu" hidden>
          <div class="mega-intro">
            <span class="eyebrow">Northline Systems</span>
            <h2>Run the estate from one desk.</h2>
            <p>Assets, incidents, changes, site health, and service SLOs — with a named owner on every record.</p>
            <eds-status variant="danger" label="P1 SSO open" pulse></eds-status>
          </div>
          <div class="mega-col" data-col="ops">
            <h3>Operations</h3>
            ${megaLink('#/incidents', 'alert-triangle', 'Incident queue', '11 open')}
            ${megaLink('#/incident/INC-10482', 'warning', 'Major incident', 'INC-10482')}
            ${megaLink('#/changes', 'edit', 'Change board', '3 tonight')}
            ${megaLink('#/oncall', 'user', 'On-call rota', 'Sahana Poluru')}
          </div>
          <div class="mega-col" data-col="estate">
            <h3>Estate</h3>
            ${megaLink('#/assets', 'folder', 'CMDB assets', '412 CIs')}
            ${megaLink('#/health', 'refresh', 'Infrastructure health', '5 sites')}
            ${megaLink('#/maintenance', 'clock', 'Maintenance windows', 'Dallas 22:00')}
            ${megaLink('#/asset/ci_sso', 'star', 'SSO broker', 'Degraded')}
          </div>
          <div class="mega-col" data-col="services">
            <h3>Services</h3>
            ${megaLink('#/availability', 'check-circle', 'Service availability', '99.94%')}
            ${megaLink('#/services', 'link', 'Service catalog', '6 live')}
            ${megaLink('#/search', 'search', 'Search records', '⌘K')}
            ${megaLink('#/settings', 'settings', 'Workspace', 'Chicago')}
          </div>
        </div>
        <div class="ts-body">
          ${sidebarTemplate()}
          <div class="ts-main">
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
      </div>
      <button class="ts-backdrop" id="ts-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Queue filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-owner" label="Owner" placeholder="Any owner"></eds-combobox>
          <eds-checkbox label="Only my queue" checked></eds-checkbox>
          <eds-switch label="Hide resolved"></eds-switch>
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
      <eds-modal id="raise-modal" heading="Raise incident" close-on-backdrop close-on-escape>
        <eds-stepper id="raise-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-autocomplete id="raise-service" label="Service" placeholder="Identity / SSO"></eds-autocomplete>
          <eds-combobox id="raise-ci" label="Configuration item" placeholder="Choose a CI"></eds-combobox>
          <eds-select id="raise-owner" label="Commander"></eds-select>
          <eds-radio-group id="raise-sev" label="Severity" name="raise-sev" value="p2">
            <eds-radio value="p1" label="P1"></eds-radio>
            <eds-radio value="p2" label="P2"></eds-radio>
            <eds-radio value="p3" label="P3"></eds-radio>
          </eds-radio-group>
          <eds-textarea label="Symptom" rows="3" placeholder="What users see, and since when."></eds-textarea>
          <eds-file-upload label="Evidence" accept=".png,.jpg,.log,.txt" hint="Optional screenshot or log"></eds-file-upload>
          <eds-pin-input id="raise-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-raise" variant="primary">Open incident</eds-button>
          <eds-button id="close-raise" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="change-modal" heading="Submit change" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Title" placeholder="Expand Dallas ledger cluster" icon="edit"></eds-input>
          <eds-select id="change-owner" label="Implementer"></eds-select>
          <eds-combobox id="change-ci" label="Configuration item" placeholder="Choose a CI"></eds-combobox>
          <eds-date-picker id="change-date" label="Window date" value="2026-09-16"></eds-date-picker>
          <eds-time-picker id="change-time" label="Start" value="22:00"></eds-time-picker>
          <eds-number-input id="change-mins" label="Duration (minutes)" value="90" min="15" max="480"></eds-number-input>
          <eds-textarea label="Plan" rows="3" placeholder="Steps, backout, and who verifies."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-change" variant="primary">Send to CAB</eds-button>
          <eds-button id="close-change" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="asset-modal" heading="Register asset" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="CI name" placeholder="id-sso-prod-03" icon="folder"></eds-input>
          <eds-select id="new-owner" label="Owner"></eds-select>
          <eds-select id="new-site" label="Site"></eds-select>
          <eds-textarea label="Purpose" rows="3" placeholder="What this CI is for."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-asset" variant="primary">Register</eds-button>
          <eds-button id="close-asset" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="maint-modal" heading="Schedule maintenance" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Title" placeholder="Dallas ledger expansion"></eds-input>
          <eds-date-range-picker id="maint-range" label="Window" start-value="2026-09-16" end-value="2026-09-17"></eds-date-range-picker>
          <eds-select id="maint-site" label="Site"></eds-select>
          <eds-checkbox label="Notify service owners" checked></eds-checkbox>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-maint" variant="primary">Schedule</eds-button>
          <eds-button id="close-maint" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;

    const header = this.querySelector('techstar-header');
    if (header) header.tickerItems = tickerItems;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#raise-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const ownerOptions = people.map((item) => ({ label: item.name, value: item.name }));
    const ciOptions = assets.map((item) => ({ label: item.name, value: item.name }));
    const siteOptions = [
      { label: 'Chicago', value: 'chicago' },
      { label: 'Dallas', value: 'dallas' },
      { label: 'Phoenix', value: 'phoenix' },
      { label: 'Ashburn', value: 'ashburn' },
      { label: 'Austin', value: 'austin' },
    ];

    const assign = (selector, options, value) => {
      const el = this.querySelector(selector);
      if (!el) return;
      el.options = options;
      if (value) el.value = value;
    };

    assign('#raise-owner', ownerOptions, people[1].name);
    assign('#change-owner', ownerOptions, people[6].name);
    assign('#new-owner', ownerOptions, people[0].name);
    assign('#filter-owner', ownerOptions);
    assign('#raise-ci', ciOptions, assets[0].name);
    assign('#change-ci', ciOptions, assets[2].name);
    assign('#new-site', siteOptions, 'chicago');
    assign('#maint-site', siteOptions, 'dallas');

    const raiseService = this.querySelector('#raise-service');
    if (raiseService) {
      raiseService.suggestions = ['Identity / SSO', 'Payments API', 'Corporate email', 'Remote access', 'HRIS', 'Campus VDI'];
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
    this.querySelector('#ts-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
    this.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
      const href = event.detail?.href ?? event.detail?.item?.href;
      if (href) window.location.hash = href;
    });

    const mega = this.querySelector('#mega-menu');
    const toggles = [...this.querySelectorAll('.mega-toggle')];
    const closeMega = () => {
      if (mega) mega.hidden = true;
      toggles.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
      document.body.classList.remove('mega-open');
      mega?.querySelectorAll('.mega-col').forEach((col) => col.classList.remove('is-active'));
    };
    const openMega = (panel) => {
      if (mega) mega.hidden = false;
      document.body.classList.add('mega-open');
      toggles.forEach((btn) => btn.setAttribute('aria-expanded', String(btn.dataset.panel === panel)));
      mega?.querySelectorAll('.mega-col').forEach((col) => {
        col.classList.toggle('is-active', col.dataset.col === panel);
      });
    };
    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = btn.dataset.panel;
        const already = btn.getAttribute('aria-expanded') === 'true';
        if (already) closeMega();
        else openMega(panel);
      });
    });
    mega?.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMega();
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

    const bind = (id, handler) => this.querySelector(id)?.addEventListener('eds-click', handler);
    bind('#notify-btn', () => this.querySelector('#inbox-drawer')?.show());
    bind('#close-inbox', () => this.querySelector('#inbox-drawer')?.close());
    bind('#close-command', () => this.querySelector('#command-modal')?.close());
    bind('#header-raise', () => this.querySelector('#raise-modal')?.show());
    bind('#save-raise', () => {
      this.querySelector('#raise-modal')?.close();
      showToast({ message: 'Incident opened on the P1 bridge', variant: 'success' });
    });
    bind('#close-raise', () => this.querySelector('#raise-modal')?.close());
    bind('#save-change', () => {
      this.querySelector('#change-modal')?.close();
      showToast({ message: 'Change sent to Kavya Poluru for CAB', variant: 'success' });
    });
    bind('#close-change', () => this.querySelector('#change-modal')?.close());
    bind('#save-asset', () => {
      this.querySelector('#asset-modal')?.close();
      showToast({ message: 'CI registered in the CMDB', variant: 'success' });
    });
    bind('#close-asset', () => this.querySelector('#asset-modal')?.close());
    bind('#save-maint', () => {
      this.querySelector('#maint-modal')?.close();
      showToast({ message: 'Maintenance window published', variant: 'success' });
    });
    bind('#close-maint', () => this.querySelector('#maint-modal')?.close());
    bind('#apply-filters', () => {
      this.querySelector('#filter-drawer')?.close();
      showToast({ message: 'Filters applied', variant: 'success' });
    });
    bind('#close-filters', () => this.querySelector('#filter-drawer')?.close());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Northline Systems', variant: 'warning' });
    });

    this.addEventListener('techstar-export', () => {
      showToast({ message: 'Operations pulse exported', variant: 'success' });
    });

    this.onKeydown = (event) => {
      if (event.key === 'Escape') {
        closeMega();
        this.setSidebarOpen(false);
      }
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
    this.closeMega = closeMega;
  }

  setSidebarOpen(open) {
    document.body.classList.toggle('sidebar-open', open);
    const backdrop = this.querySelector('#ts-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { assets, incidents, changes, workspaceName });
  }

  renderRoute() {
    const route = parseRoute();
    if (!window.location.hash) window.location.hash = '#/overview';
    this.closeMega?.();
    this.setSidebarOpen(false);
    this.querySelector('#raise-modal')?.close();
    this.querySelector('#inbox-drawer')?.close();
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
    const scroller = this.querySelector('.ts-main');
    if (scroller) scroller.scrollTop = 0;
    view.scrollTop = 0;
    document.title = `${titles[route.name] || 'Overview'} · ${productName}`;
  }
}

if (!customElements.get('techstar-shell')) {
  customElements.define('techstar-shell', TechstarShell);
}
