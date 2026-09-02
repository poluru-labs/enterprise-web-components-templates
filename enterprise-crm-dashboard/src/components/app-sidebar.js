import {
  accounts,
  currentUser,
  navGroups,
  pinnedDeal,
  productLine,
  productName,
  workspaceName,
} from '../data/index.js';
import { initials } from '../lib/format.js';
import { activeHref } from '../lib/router.js';

export class LyraSidebar extends HTMLElement {
  static get observedAttributes() {
    return ['route'];
  }

  connectedCallback() {
    this.render();
    this.bind();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.paintNav();
  }

  get route() {
    try {
      return JSON.parse(this.getAttribute('route') || '{}');
    } catch {
      return { name: 'overview' };
    }
  }

  render() {
    this.innerHTML = `
      <aside class="crm-sidebar" id="crm-sidebar" aria-label="Dashboard">
        <div class="sidebar-head">
          <a class="wordmark" href="#/overview">
            <span class="brand-mark" aria-hidden="true">L</span>
            <span class="brand-copy">
              <strong>${productName}</strong>
              <small>${productLine} · ${workspaceName}</small>
            </span>
          </a>
          <button class="sidebar-collapse" id="sidebar-collapse" type="button" aria-label="Collapse sidebar">
            <i class="bi bi-layout-sidebar" aria-hidden="true"></i>
          </button>
        </div>
        <div class="sidebar-tools">
          <button class="sidebar-jump" id="sidebar-jump" type="button">
            <i class="bi bi-search" aria-hidden="true"></i>
            <span>Jump to a record</span>
          </button>
          <button class="sidebar-compose" id="sidebar-compose" type="button">
            <i class="bi bi-plus-lg" aria-hidden="true"></i>
            <span>New deal</span>
          </button>
        </div>
        <div class="sidebar-scroll" id="side-nav"></div>
        <article class="sidebar-pin">
          <p class="nav-group-label">Pinned</p>
          <a class="pin-card" href="#/deal/${pinnedDeal.id}">
            <strong>${pinnedDeal.name}</strong>
            <span>${pinnedDeal.account} · ${pinnedDeal.value}</span>
            <em>${pinnedDeal.stage} · ${pinnedDeal.owner}</em>
          </a>
        </article>
        <div class="sidebar-foot">
          <div class="quota-meter" aria-label="Quota attained">
            <div class="quota-meter-copy">
              <span>Quota</span>
              <strong>${currentUser.attained}</strong>
            </div>
            <div class="quota-track"><span style="width:${currentUser.attained}"></span></div>
            <p>FY26 Q3 · ${currentUser.quota}</p>
          </div>
          <div class="sidebar-user">
            <span class="avatar" aria-hidden="true">${initials(currentUser.name)}</span>
            <span class="brand-copy">
              <strong>${currentUser.name}</strong>
              <small>${currentUser.role}</small>
            </span>
          </div>
        </div>
      </aside>
    `;
    this.paintNav();
  }

  paintNav() {
    const nav = this.querySelector('#side-nav');
    if (!nav) return;
    const current = activeHref(this.route);
    nav.innerHTML = navGroups
      .map(
        (group) => `
        <p class="nav-group-label">${group.label}</p>
        <nav class="side-nav" aria-label="${group.label}">
          ${group.items
            .map((item) => {
              const active = item.href === current;
              return `
                <a class="side-link${active ? ' is-active' : ''}" href="${item.href}" ${active ? 'aria-current="page"' : ''} title="${item.label}">
                  <i class="bi ${item.icon}" aria-hidden="true"></i>
                  <span class="side-link-copy">${item.label}</span>
                  ${item.badge ? `<span class="side-badge">${item.badge}</span>` : ''}
                </a>`;
            })
            .join('')}
        </nav>`,
      )
      .join('');
  }

  bind() {
    this.querySelector('#sidebar-collapse')?.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-collapsed');
      const collapsed = document.body.classList.contains('sidebar-collapsed');
      this.querySelector('#sidebar-collapse')?.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    });
    this.querySelector('#sidebar-jump')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('lyra-command', { bubbles: true }));
    });
    this.querySelector('#sidebar-compose')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('lyra-new-deal', { bubbles: true }));
    });
    this.querySelector('#side-nav')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('lyra-nav-close', { bubbles: true }));
    });
  }
}

if (!customElements.get('lyra-sidebar')) {
  customElements.define('lyra-sidebar', LyraSidebar);
}

export { accounts };
