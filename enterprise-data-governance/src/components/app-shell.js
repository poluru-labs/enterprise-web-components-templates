import { setDensity, showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  assets,
  commandItems,
  createSteps,
  currentUser,
  inboxItems,
  people,
  productName,
  workspace,
  workspaceName,
} from '../data/index.js';
import { activeHref, crumbItems, parseRoute, searchHref, titles } from '../lib/router.js';
import { themeCards } from './widgets.js';
import { paintNav, sidebarTemplate } from './app-sidebar.js';
import './app-header.js';
import './content-card.js';
import { hydrateView, renderView } from '../pages/index.js';

function megaLink(href, icon, label) {
  return `<a href="${href}"><eds-icon name="${icon}" size="sm"></eds-icon>${label}<eds-icon name="chevron-right" size="sm"></eds-icon></a>`;
}

export class VerityShell extends HTMLElement {
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
      <div class="v-shell">
        <verity-header product="${productName}" workspace="${workspaceName}" period="${workspace.period}" inbox-count="${inboxItems.length}">
          <eds-tooltip slot="nav-toggle" content="Show sidebar">
            <eds-button id="nav-toggle" variant="tertiary" icon="menu" icon-only accessible-label="Show sidebar"></eds-button>
          </eds-tooltip>
          <button slot="mega" class="mega-toggle" id="mega-toggle" type="button" aria-expanded="false" aria-controls="mega-menu">
            Explore catalog
            <eds-icon name="chevron-down" size="sm"></eds-icon>
          </button>
          <eds-breadcrumb slot="crumbs" id="crumbs"></eds-breadcrumb>
          <eds-visually-hidden slot="search">Search catalog</eds-visually-hidden>
          <eds-search slot="search" id="global-search" placeholder="Find an asset, owner, or rule" clearable></eds-search>
          <eds-kbd slot="kbd" keys="⌘K"></eds-kbd>
          <eds-tooltip slot="inbox" content="Inbox" placement="bottom">
            <eds-button id="notify-btn" variant="tertiary" icon="bell" icon-only accessible-label="Notifications"></eds-button>
          </eds-tooltip>
          <eds-button slot="alert" id="header-access" variant="primary" icon="lock">Request access</eds-button>
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
        </verity-header>
        <div id="mega-menu" class="mega-menu" hidden>
          <div class="mega-intro">
            <span class="eyebrow">Verity catalog</span>
            <h2>Every asset. A named owner.</h2>
            <p>Browse gold data, follow lineage, and grant access without leaving the catalog.</p>
            <eds-badge label="Helix Markets" variant="neutral"></eds-badge>
          </div>
          <div>
            <h3>Catalog</h3>
            ${megaLink('#/catalog', 'folder', 'Browse assets')}
            ${megaLink('#/glossary', 'file', 'Business glossary')}
            ${megaLink('#/asset/ast_accounts', 'star', 'Certified accounts')}
            ${megaLink('#/owners', 'user', 'Named owners')}
          </div>
          <div>
            <h3>Trust</h3>
            ${megaLink('#/quality', 'check-circle', 'Quality rules')}
            ${megaLink('#/lineage', 'link', 'Lineage map')}
            ${megaLink('#/classifications', 'eye', 'Classifications')}
            ${megaLink('#/issues', 'alert-triangle', 'Open issues')}
          </div>
          <div>
            <h3>Control</h3>
            ${megaLink('#/access', 'lock', 'Access requests')}
            ${megaLink('#/policies', 'file', 'Policies')}
            ${megaLink('#/settings', 'settings', 'Workspace')}
            ${megaLink('#/search', 'search', 'Search catalog')}
          </div>
        </div>
        <div class="v-body">
          ${sidebarTemplate()}
          <div class="v-main">
            <main id="view" tabindex="-1"></main>
            <footer class="page-footer">
              <p class="page-footer-author">
                <span class="page-footer-kicker">Author</span>
                <strong>Subrahmanyam Poluru</strong>
                <a href="https://polurus.com" target="_blank" rel="noopener noreferrer">polurus.com</a>
              </p>
              <p class="page-footer-built">
                Built with
                <a href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc" target="_blank" rel="noopener noreferrer">@poluru-labs/enterprise-design-system-wc</a>
              </p>
            </footer>
          </div>
        </div>
      </div>
      <button class="v-backdrop" id="v-backdrop" type="button" aria-label="Hide sidebar" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="filter-drawer" heading="Catalog filters" side="right" size="md">
        <div class="stack">
          <eds-combobox id="filter-owner" label="Owner" placeholder="Any owner"></eds-combobox>
          <eds-checkbox label="Certified gold only" checked></eds-checkbox>
          <eds-switch label="Hide draft assets"></eds-switch>
          <eds-slider id="filter-quality" label="Min quality" min="0" max="100" value="70" show-value></eds-slider>
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
      <eds-modal id="access-modal" heading="Request access" close-on-backdrop close-on-escape>
        <eds-stepper id="access-stepper"></eds-stepper>
        <div class="stack mt-4">
          <eds-autocomplete id="access-asset" label="Asset" placeholder="core.customer.accounts"></eds-autocomplete>
          <eds-select id="access-owner" label="Approver"></eds-select>
          <eds-select id="access-level" label="Access"></eds-select>
          <eds-date-picker id="access-until" label="Needed until"></eds-date-picker>
          <eds-textarea label="Purpose" rows="3" placeholder="Why this gold asset is required."></eds-textarea>
          <eds-pin-input id="access-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-access" variant="primary">Submit request</eds-button>
          <eds-button id="close-access" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="asset-modal" heading="Register asset" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Qualified name" placeholder="finance.ledger.journal" icon="folder"></eds-input>
          <eds-select id="new-owner" label="Owner"></eds-select>
          <eds-select id="new-domain" label="Domain"></eds-select>
          <eds-file-upload label="Schema file" accept=".json,.yaml,.yml" hint="Optional column list"></eds-file-upload>
          <eds-textarea label="Purpose" rows="3" placeholder="What this asset is the source of truth for."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-asset" variant="primary">Register</eds-button>
          <eds-button id="close-asset" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="rule-modal" heading="Add quality rule" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Rule name" placeholder="Settlement lag &lt; 15m"></eds-input>
          <eds-combobox id="rule-asset" label="Asset" placeholder="Choose an asset"></eds-combobox>
          <eds-number-input id="rule-threshold" label="Pass threshold" value="95" min="1" max="100"></eds-number-input>
          <eds-radio-group id="rule-sev" label="Severity" name="rule-sev" value="high">
            <eds-radio value="medium" label="Medium"></eds-radio>
            <eds-radio value="high" label="High"></eds-radio>
            <eds-radio value="critical" label="Critical"></eds-radio>
          </eds-radio-group>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-rule" variant="primary">Publish rule</eds-button>
          <eds-button id="close-rule" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="classify-modal" heading="Classify column" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Column" placeholder="tax_id"></eds-input>
          <eds-select id="classify-label" label="Label"></eds-select>
          <eds-checkbox label="Mask in lower environments" checked></eds-checkbox>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-classify" variant="primary">Apply label</eds-button>
          <eds-button id="close-classify" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="owner-modal" heading="Assign owner" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-select id="assign-person" label="Owner"></eds-select>
          <eds-combobox id="assign-asset" label="Asset" placeholder="Choose an asset"></eds-combobox>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-owner" variant="primary">Assign</eds-button>
          <eds-button id="close-owner" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="certify-modal" heading="Certify asset" close-on-backdrop close-on-escape>
        <p class="muted">Certification needs a named owner, passing rules, and a published classification.</p>
        <div class="stack mt-4">
          <eds-checkbox label="Owner confirmed" checked></eds-checkbox>
          <eds-checkbox label="Quality rules passing" checked></eds-checkbox>
          <eds-checkbox label="Classifications published"></eds-checkbox>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-certify" variant="primary">Certify</eds-button>
          <eds-button id="close-certify" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="term-modal" heading="Add glossary term" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Term" placeholder="Settlement lag"></eds-input>
          <eds-textarea label="Definition" rows="3" placeholder="Minutes between a transfer event and confirmed settlement."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-term" variant="primary">Add term</eds-button>
          <eds-button id="close-term" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
    `;
  }

  hydrate() {
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;

    const stepper = this.querySelector('#access-stepper');
    if (stepper) {
      stepper.steps = createSteps;
      stepper.current = 0;
    }

    const ownerOptions = people.map((item) => ({ label: item.name, value: item.name }));
    const assetOptions = assets.map((item) => ({ label: item.name, value: item.name }));

    const assign = (selector, options, value) => {
      const el = this.querySelector(selector);
      if (!el) return;
      el.options = options;
      if (value) el.value = value;
    };

    assign('#access-owner', ownerOptions, people[11].name);
    assign('#new-owner', ownerOptions, people[0].name);
    assign('#filter-owner', ownerOptions);
    assign('#assign-person', ownerOptions, people[0].name);
    assign('#access-level', [
      { label: 'Read', value: 'read' },
      { label: 'Export', value: 'export' },
      { label: 'Write', value: 'write' },
    ], 'read');
    assign('#new-domain', [
      { label: 'Customer', value: 'customer' },
      { label: 'Finance', value: 'finance' },
      { label: 'Risk', value: 'risk' },
      { label: 'Payments', value: 'payments' },
    ], 'finance');
    assign('#rule-asset', assetOptions, assets[0].name);
    assign('#assign-asset', assetOptions, assets[0].name);
    assign('#classify-label', [
      { label: 'PII', value: 'pii' },
      { label: 'Restricted', value: 'restricted' },
      { label: 'Confidential', value: 'confidential' },
      { label: 'Internal', value: 'internal' },
    ], 'pii');

    const accessAsset = this.querySelector('#access-asset');
    if (accessAsset) accessAsset.suggestions = assets.map((item) => item.name);

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
    this.querySelector('#v-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));
    this.querySelector('#side-nav')?.addEventListener('eds-navigate', (event) => {
      const href = event.detail?.href ?? event.detail?.item?.href;
      if (href) window.location.hash = href;
    });

    const mega = this.querySelector('#mega-menu');
    const megaToggle = this.querySelector('#mega-toggle');
    const closeMega = () => {
      if (mega) mega.hidden = true;
      megaToggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mega-open');
    };
    megaToggle?.addEventListener('click', () => {
      const open = Boolean(mega?.hidden);
      if (mega) mega.hidden = !open;
      megaToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('mega-open', open);
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
    bind('#header-access', () => this.querySelector('#access-modal')?.show());
    bind('#save-access', () => {
      this.querySelector('#access-modal')?.close();
      showToast({ message: 'Access request sent to the owner', variant: 'success' });
    });
    bind('#close-access', () => this.querySelector('#access-modal')?.close());
    bind('#save-asset', () => {
      this.querySelector('#asset-modal')?.close();
      showToast({ message: 'Asset registered in the catalog', variant: 'success' });
    });
    bind('#close-asset', () => this.querySelector('#asset-modal')?.close());
    bind('#save-rule', () => {
      this.querySelector('#rule-modal')?.close();
      showToast({ message: 'Quality rule published', variant: 'success' });
    });
    bind('#close-rule', () => this.querySelector('#rule-modal')?.close());
    bind('#save-classify', () => {
      this.querySelector('#classify-modal')?.close();
      showToast({ message: 'Column classified', variant: 'success' });
    });
    bind('#close-classify', () => this.querySelector('#classify-modal')?.close());
    bind('#save-owner', () => {
      this.querySelector('#owner-modal')?.close();
      showToast({ message: 'Owner assigned', variant: 'success' });
    });
    bind('#close-owner', () => this.querySelector('#owner-modal')?.close());
    bind('#save-certify', () => {
      this.querySelector('#certify-modal')?.close();
      showToast({ message: 'Asset certified', variant: 'success' });
    });
    bind('#close-certify', () => this.querySelector('#certify-modal')?.close());
    bind('#save-term', () => {
      this.querySelector('#term-modal')?.close();
      showToast({ message: 'Term added to the glossary', variant: 'success' });
    });
    bind('#close-term', () => this.querySelector('#term-modal')?.close());
    bind('#apply-filters', () => {
      this.querySelector('#filter-drawer')?.close();
      showToast({ message: 'Filters applied', variant: 'success' });
    });
    bind('#close-filters', () => this.querySelector('#filter-drawer')?.close());

    this.querySelector('#profile-menu')?.addEventListener('eds-select', (event) => {
      const value = event.detail?.value;
      if (value === 'inbox') this.querySelector('#inbox-drawer')?.show();
      if (value === 'settings') window.location.hash = '#/settings';
      if (value === 'signout') showToast({ message: 'Signed out of Helix Markets', variant: 'warning' });
    });

    this.addEventListener('verity-export', () => {
      showToast({ message: 'Catalog pulse exported', variant: 'success' });
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
    const backdrop = this.querySelector('#v-backdrop');
    if (backdrop) backdrop.hidden = !open;
    const toggle = this.querySelector('#nav-toggle');
    if (toggle) toggle.setAttribute('accessible-label', open ? 'Hide sidebar' : 'Show sidebar');
  }

  paintCrumbs(route) {
    const crumbs = this.querySelector('#crumbs');
    if (!crumbs) return;
    crumbs.items = crumbItems(route, { assets, workspaceName });
  }

  renderRoute() {
    const route = parseRoute();
    if (!window.location.hash) window.location.hash = '#/overview';
    this.closeMega?.();
    this.setSidebarOpen(false);
    this.querySelector('#access-modal')?.close();
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
    const scroller = this.querySelector('.v-main');
    if (scroller) scroller.scrollTop = 0;
    view.scrollTop = 0;
    document.title = `${titles[route.name] || 'Overview'} · ${productName}`;
  }
}

if (!customElements.get('verity-shell')) {
  customElements.define('verity-shell', VerityShell);
}
