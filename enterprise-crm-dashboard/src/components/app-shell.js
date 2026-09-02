import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import {
  accounts,
  commandItems,
  inboxItems,
} from '../data/index.js';
import { crumbText, routeTitles } from '../lib/router.js';
import { renderView, hydrateView, viewState } from '../pages/index.js';
import './app-header.js';
import './app-sidebar.js';
import './content-card.js';

export class LyraShell extends HTMLElement {
  #route = { name: 'overview' };

  connectedCallback() {
    setDensity('comfortable');
    this.render();
    this.hydrateShell();
  }

  set route(value) {
    this.#route = value;
    this.querySelector('lyra-sidebar')?.setAttribute('route', JSON.stringify(value));
    const header = this.querySelector('lyra-header');
    if (header) header.setAttribute('crumb', crumbText(value));
    this.renderPage();
  }

  get route() {
    return this.#route;
  }

  render() {
    this.innerHTML = `
      <div class="crm-shell">
        <lyra-sidebar route='${JSON.stringify(this.#route)}'></lyra-sidebar>
        <div class="crm-main">
          <lyra-header crumb="${crumbText(this.#route)}"></lyra-header>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
      <button class="crm-backdrop" id="crm-backdrop" type="button" aria-label="Close navigation" hidden></button>
      <eds-drawer id="inbox-drawer" heading="Sales inbox" side="right" size="md">
        <eds-list id="inbox-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
        </div>
      </eds-drawer>
      <eds-drawer id="convert-drawer" heading="Convert lead" side="right" size="md">
        <p class="kicker mb-1">Qualified</p>
        <h2>Hana Poluru</h2>
        <p class="muted">Fold Paper Co · score 91 · partner sourced</p>
        <p>Create a contact, account, and discovery deal from this lead. Owner stays Aisha Poluru.</p>
        <div slot="footer" class="inline-actions">
          <eds-button id="confirm-convert" variant="primary">Convert</eds-button>
          <eds-button id="close-convert" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-drawer>
      <eds-modal id="deal-modal" heading="New deal" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input id="deal-name" label="Deal name" placeholder="Harbor platform expansion" icon="star"></eds-input>
          <eds-select id="deal-account" label="Account"></eds-select>
          <eds-select id="deal-stage" label="Stage"></eds-select>
          <eds-number-input id="deal-amount" label="Amount (USD)" value="24000" min="0" max="5000000" step="100"></eds-number-input>
          <eds-textarea label="Next step" rows="3" placeholder="Discovery call, security review, or legal."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-deal" variant="primary">Create deal</eds-button>
          <eds-button id="close-deal" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="lead-modal" heading="Add lead" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-input label="Name" placeholder="Elena Poluru" icon="user"></eds-input>
          <eds-input label="Company" placeholder="Lattice Energy"></eds-input>
          <eds-input label="Email" placeholder="name@company.example" icon="mail"></eds-input>
          <eds-select id="lead-source" label="Source"></eds-select>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-lead" variant="primary">Save lead</eds-button>
          <eds-button id="close-lead" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="activity-modal" heading="Log activity" close-on-backdrop close-on-escape>
        <div class="stack">
          <eds-select id="activity-type" label="Type"></eds-select>
          <eds-input label="Title" placeholder="Harbor legal walkthrough"></eds-input>
          <eds-textarea label="Notes" rows="3" placeholder="Outcome and next step."></eds-textarea>
        </div>
        <div slot="footer" class="inline-actions">
          <eds-button id="save-activity" variant="primary">Log activity</eds-button>
          <eds-button id="close-activity" variant="tertiary">Cancel</eds-button>
        </div>
      </eds-modal>
      <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
        <eds-list id="command-list" divided></eds-list>
        <div slot="footer">
          <eds-button id="close-command" variant="tertiary">Close</eds-button>
        </div>
      </eds-modal>
    `;
    this.bindShell();
  }

  renderPage() {
    const view = this.querySelector('#view');
    if (!view) return;
    try {
      view.innerHTML = renderView(this.#route);
      hydrateView(view, this.#route);
    } catch (error) {
      view.innerHTML = `<section class="sheet"><h1>This page could not load</h1><p class="muted">${error.message}</p></section>`;
      console.error(error);
    }
    view.scrollTop = 0;
    document.title = `${routeTitles[this.#route.name] || 'Overview'} · Lyra CRM`;
    this.setSidebarOpen(false);
  }

  setSidebarOpen(open) {
    document.body.classList.toggle('nav-open', open);
    const backdrop = this.querySelector('#crm-backdrop');
    if (backdrop) backdrop.hidden = !open;
  }

  runSearch(value, navigate = false) {
    const query = value.trim();
    viewState.searchQuery = query;
    const list = this.querySelector('#command-list');
    if (list) {
      list.items = commandItems.filter(
        (item) => `${item.label} ${item.description}`.toLowerCase().includes(query.toLowerCase()) || !query,
      );
    }
    if (navigate && query) {
      window.location.hash = '#/search';
      return;
    }
    this.querySelector('#command-modal')?.show();
  }

  hydrateShell() {
    const account = this.querySelector('#deal-account');
    if (account) {
      account.options = accounts.map((item) => ({ label: item.name, value: item.id }));
      account.value = accounts[0].id;
    }
    const stage = this.querySelector('#deal-stage');
    if (stage) {
      stage.options = [
        { label: 'Qualify', value: 'Qualify' },
        { label: 'Discovery', value: 'Discovery' },
        { label: 'Proposal', value: 'Proposal' },
        { label: 'Negotiation', value: 'Negotiation' },
      ];
      stage.value = 'Qualify';
    }
    const source = this.querySelector('#lead-source');
    if (source) {
      source.options = [
        { label: 'Inbound', value: 'inbound' },
        { label: 'Outbound', value: 'outbound' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Partner', value: 'partner' },
        { label: 'Event', value: 'event' },
      ];
      source.value = 'inbound';
    }
    const activityType = this.querySelector('#activity-type');
    if (activityType) {
      activityType.options = [
        { label: 'Call', value: 'call' },
        { label: 'Meeting', value: 'meeting' },
        { label: 'Email', value: 'email' },
        { label: 'Task', value: 'task' },
      ];
      activityType.value = 'call';
    }
    const inbox = this.querySelector('#inbox-list');
    if (inbox) inbox.items = inboxItems;
  }

  bindShell() {
    this.querySelector('#crm-backdrop')?.addEventListener('click', () => this.setSidebarOpen(false));

    this.addEventListener('lyra-nav-toggle', () => this.setSidebarOpen(true));
    this.addEventListener('lyra-nav-close', () => this.setSidebarOpen(false));
    this.addEventListener('lyra-new-deal', () => this.querySelector('#deal-modal')?.show());
    this.addEventListener('lyra-inbox', () => this.querySelector('#inbox-drawer')?.show());
    this.addEventListener('lyra-signout', () => showToast({ message: 'Signed out of the demo workspace', variant: 'warning' }));
    this.addEventListener('lyra-command', () => this.runSearch(''));
    this.addEventListener('lyra-search', (event) => {
      const { query, navigate } = event.detail ?? {};
      this.runSearch(query ?? '', navigate);
    });

    this.querySelector('#command-list')?.addEventListener('eds-select', (event) => {
      const item = commandItems.find((entry) => entry.label === event.detail?.label);
      this.querySelector('#command-modal')?.close();
      if (item) window.location.hash = item.href;
    });

    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        this.querySelector('lyra-header')?.focusSearch();
        this.runSearch('');
      }
      if (event.key === 'Escape') {
        this.setSidebarOpen(false);
      }
    });

    this.querySelector('#save-deal')?.addEventListener('eds-click', () => {
      this.querySelector('#deal-modal')?.close();
      showToast({ message: 'Deal created in Qualify', variant: 'success' });
      window.location.hash = '#/pipeline';
    });
    this.querySelector('#close-deal')?.addEventListener('eds-click', () => this.querySelector('#deal-modal')?.close());
    this.querySelector('#save-lead')?.addEventListener('eds-click', () => {
      this.querySelector('#lead-modal')?.close();
      showToast({ message: 'Lead added to the queue', variant: 'success' });
    });
    this.querySelector('#close-lead')?.addEventListener('eds-click', () => this.querySelector('#lead-modal')?.close());
    this.querySelector('#save-activity')?.addEventListener('eds-click', () => {
      this.querySelector('#activity-modal')?.close();
      showToast({ message: 'Activity logged', variant: 'success' });
    });
    this.querySelector('#close-activity')?.addEventListener('eds-click', () => this.querySelector('#activity-modal')?.close());
    this.querySelector('#close-inbox')?.addEventListener('eds-click', () => this.querySelector('#inbox-drawer')?.close());
    this.querySelector('#close-convert')?.addEventListener('eds-click', () => this.querySelector('#convert-drawer')?.close());
    this.querySelector('#confirm-convert')?.addEventListener('eds-click', () => {
      this.querySelector('#convert-drawer')?.close();
      showToast({ message: 'Lead converted to a discovery deal', variant: 'success' });
      window.location.hash = '#/pipeline';
    });
    this.querySelector('#close-command')?.addEventListener('eds-click', () => this.querySelector('#command-modal')?.close());
  }
}

if (!customElements.get('lyra-shell')) {
  customElements.define('lyra-shell', LyraShell);
}
