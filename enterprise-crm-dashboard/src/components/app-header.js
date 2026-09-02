import { currentUser, stageCounts } from '../data/index.js';
import { initials } from '../lib/format.js';

const styles = `
  :host {
    display: block;
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .command-bar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 1rem 1.25rem;
    min-height: 4.35rem;
    padding: 0.65rem clamp(1.25rem, 2.4vw, 2rem);
    border-bottom: 1px solid rgb(255 255 255 / 0.18);
    background:
      linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.06)),
      rgb(16 85 201 / 0.88);
    backdrop-filter: blur(16px) saturate(140%);
    color: #fff;
    box-shadow: 0 12px 32px rgb(7 47 115 / 0.18);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    min-width: 0;
  }
  .brand-mark {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.75rem;
    background: #fff;
    color: #1055c9;
    font-family: 'Outfit', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
  .brand-copy strong {
    display: block;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
  .brand-copy small {
    display: block;
    margin-top: 0.08rem;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.78;
  }
  .nav-toggle {
    display: none;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
    border: 1px solid rgb(255 255 255 / 0.28);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.12);
    color: inherit;
    font: inherit;
    font-size: 0.76rem;
    font-weight: 650;
    cursor: pointer;
  }
  .crumb {
    margin: 0;
    overflow: hidden;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    opacity: 0.82;
  }
  .pipeline-rail {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-width: 0;
    overflow-x: auto;
    padding: 0.15rem 0;
    scrollbar-width: none;
  }
  .pipeline-rail::-webkit-scrollbar {
    display: none;
  }
  .stage-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 0.75rem;
    border: 1px solid rgb(255 255 255 / 0.22);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.1);
    color: inherit;
    font: inherit;
    font-size: 0.76rem;
    font-weight: 650;
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.15s ease, transform 0.15s ease;
  }
  .stage-pill:hover {
    background: rgb(255 255 255 / 0.2);
    transform: translateY(-1px);
  }
  .stage-pill em {
    display: inline-grid;
    place-items: center;
    min-width: 1.35rem;
    height: 1.35rem;
    padding: 0 0.35rem;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.92);
    color: #1055c9;
    font-style: normal;
    font-size: 0.68rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }
  .stage-arrow {
    opacity: 0.45;
    font-size: 0.65rem;
    user-select: none;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.55rem;
    min-width: 0;
  }
  .search-wrap {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 11rem;
    max-width: 16rem;
    padding: 0 0.85rem;
    border: 1px solid rgb(255 255 255 / 0.24);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.12);
    color: rgb(255 255 255 / 0.72);
  }
  .search-wrap input {
    width: 100%;
    min-height: 2.25rem;
    border: 0;
    background: transparent;
    color: #fff;
    font: inherit;
    font-size: 0.84rem;
    outline: none;
  }
  .search-wrap input::placeholder {
    color: rgb(255 255 255 / 0.62);
  }
  .kbd {
    padding: 0.12rem 0.38rem;
    border: 1px solid rgb(255 255 255 / 0.28);
    border-radius: 0.35rem;
    background: rgb(255 255 255 / 0.1);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  .icon-btn {
    position: relative;
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid rgb(255 255 255 / 0.24);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.1);
    color: inherit;
    cursor: pointer;
  }
  .notify-dot {
    position: absolute;
    top: 0.42rem;
    right: 0.48rem;
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    background: #ffb020;
  }
  .new-deal {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.85rem;
    border: 0;
    border-radius: 999px;
    background: #fff;
    color: #1055c9;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
  }
  .profile-wrap {
    position: relative;
  }
  .profile-btn {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin: 0;
    padding: 0.18rem 0.5rem 0.18rem 0.18rem;
    border: 1px solid rgb(255 255 255 / 0.24);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.1);
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .avatar {
    display: grid;
    place-items: center;
    width: 1.85rem;
    height: 1.85rem;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.92);
    color: #1055c9;
    font-size: 0.64rem;
    font-weight: 800;
  }
  .profile-copy {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    text-align: left;
  }
  .profile-copy strong {
    font-size: 0.76rem;
  }
  .profile-copy small {
    font-size: 0.62rem;
    opacity: 0.78;
  }
  .profile-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 0.45rem);
    z-index: 40;
    display: grid;
    min-width: 16rem;
    padding: 0.35rem 0;
    border: 1px solid #d7e0ee;
    border-radius: 12px;
    background: #fff;
    color: #142033;
    box-shadow: 0 16px 36px rgb(20 32 51 / 0.12);
  }
  .profile-menu[hidden] {
    display: none;
  }
  .profile-menu-head {
    display: grid;
    gap: 0.12rem;
    margin: 0 0 0.35rem;
    padding: 0.55rem 0.9rem 0.7rem;
    border-bottom: 1px solid #d7e0ee;
  }
  .profile-menu-head span {
    color: #5b6b7c;
    font-size: 0.76rem;
  }
  .profile-menu a,
  .profile-menu button {
    display: block;
    width: 100%;
    padding: 0.55rem 0.9rem;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 0.86rem;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
  }
  .profile-menu a:hover,
  .profile-menu button:hover {
    background: #e8f0fb;
  }
  @media (max-width: 1100px) {
    .command-bar {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        'brand actions'
        'pipeline pipeline';
    }
    .brand { grid-area: brand; }
    .actions { grid-area: actions; }
    .pipeline-rail { grid-area: pipeline; justify-content: flex-start; }
    .profile-copy { display: none; }
    .search-wrap { display: none; }
  }
  @media (max-width: 960px) {
    .nav-toggle { display: inline-flex; }
  }
`;

function renderStagePills(stages) {
  return stages
    .map((item, index) => {
      const arrow = index < stages.length - 1 ? '<span class="stage-arrow" aria-hidden="true">→</span>' : '';
      return `
        <button class="stage-pill" type="button" data-stage="${item.stage}" title="${item.label} deals">
          ${item.label}
          <em>${item.count}</em>
        </button>${arrow}`;
    })
    .join('');
}

export class LyraHeader extends HTMLElement {
  static get observedAttributes() {
    return ['crumb'];
  }

  #profileOpen = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.bind();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.querySelector('.crumb')) {
      this.shadowRoot.querySelector('.crumb').textContent = this.getAttribute('crumb') || '';
    }
  }

  render() {
    const stages = stageCounts();
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <header class="command-bar" part="bar">
        <div class="brand">
          <button class="nav-toggle" type="button" aria-label="Open menu">
            <i class="bi bi-list" aria-hidden="true"></i>
            Menu
          </button>
          <span class="brand-mark" aria-hidden="true">L</span>
          <div class="brand-copy">
            <strong>Lyra</strong>
            <small>Pipeline command</small>
          </div>
          <p class="crumb">${this.getAttribute('crumb') || ''}</p>
        </div>
        <nav class="pipeline-rail" aria-label="Deal stages">
          ${renderStagePills(stages)}
        </nav>
        <div class="actions">
          <label class="search-wrap">
            <span class="visually-hidden">Search</span>
            <i class="bi bi-search" aria-hidden="true"></i>
            <input id="header-search" type="search" placeholder="Search CRM" autocomplete="off" />
            <span class="kbd">⌘K</span>
          </label>
          <button class="new-deal" type="button" id="header-new-deal">
            <i class="bi bi-plus-lg" aria-hidden="true"></i>
            New deal
          </button>
          <button class="icon-btn" type="button" id="header-notify" aria-label="Notifications">
            <i class="bi bi-bell" aria-hidden="true"></i>
            <span class="notify-dot" aria-hidden="true"></span>
          </button>
          <div class="profile-wrap">
            <button class="profile-btn" type="button" id="header-profile" aria-expanded="false" aria-haspopup="menu">
              <span class="avatar" aria-hidden="true">${initials(currentUser.name)}</span>
              <span class="profile-copy">
                <strong>${currentUser.name}</strong>
                <small>${currentUser.role}</small>
              </span>
              <i class="bi bi-caret-down-fill" aria-hidden="true"></i>
            </button>
            <div class="profile-menu" id="header-profile-menu" role="menu" hidden>
              <p class="profile-menu-head">
                <strong>${currentUser.name}</strong>
                <span>${currentUser.email}</span>
              </p>
              <button type="button" role="menuitem" data-action="inbox">Sales inbox</button>
              <a href="#/settings" role="menuitem">Workspace settings</a>
              <button type="button" role="menuitem" data-action="signout">Sign out</button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  bind() {
    const search = this.shadowRoot.querySelector('#header-search');
    search?.addEventListener('focus', () => this.setProfileOpen(false));
    search?.addEventListener('input', () => {
      this.dispatchEvent(new CustomEvent('lyra-search', { detail: { query: search.value }, bubbles: true, composed: true }));
    });
    search?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('lyra-search', { detail: { query: search.value, navigate: true }, bubbles: true, composed: true }));
      }
    });

    this.shadowRoot.querySelector('#header-new-deal')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('lyra-new-deal', { bubbles: true, composed: true }));
    });
    this.shadowRoot.querySelector('#header-notify')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('lyra-inbox', { bubbles: true, composed: true }));
    });
    this.shadowRoot.querySelector('.nav-toggle')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('lyra-nav-toggle', { bubbles: true, composed: true }));
    });

    this.shadowRoot.querySelectorAll('.stage-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        window.location.hash = '#/pipeline';
      });
    });

    const profileBtn = this.shadowRoot.querySelector('#header-profile');
    profileBtn?.addEventListener('click', (event) => {
      event.stopPropagation();
      this.setProfileOpen(!this.#profileOpen);
    });

    this.shadowRoot.querySelector('[data-action="inbox"]')?.addEventListener('click', () => {
      this.setProfileOpen(false);
      this.dispatchEvent(new CustomEvent('lyra-inbox', { bubbles: true, composed: true }));
    });
    this.shadowRoot.querySelector('[data-action="signout"]')?.addEventListener('click', () => {
      this.setProfileOpen(false);
      this.dispatchEvent(new CustomEvent('lyra-signout', { bubbles: true, composed: true }));
    });
    this.shadowRoot.querySelector('.profile-menu a')?.addEventListener('click', () => this.setProfileOpen(false));

    this._outsideClick = (event) => {
      if (!event.composedPath().includes(this)) this.setProfileOpen(false);
    };
    document.addEventListener('click', this._outsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._outsideClick);
  }

  setProfileOpen(open) {
    this.#profileOpen = open;
    const menu = this.shadowRoot.querySelector('#header-profile-menu');
    const btn = this.shadowRoot.querySelector('#header-profile');
    if (menu) menu.hidden = !open;
    if (btn) btn.setAttribute('aria-expanded', String(open));
  }

  focusSearch() {
    this.shadowRoot.querySelector('#header-search')?.focus();
  }
}

if (!customElements.get('lyra-header')) {
  customElements.define('lyra-header', LyraHeader);
}
