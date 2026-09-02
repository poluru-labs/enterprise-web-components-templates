import headerCss from '../styles/header.css?inline';

export class AlderHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'leave-count', 'holiday-label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.leave-cluster')?.addEventListener('click', () => {
      window.location.hash = '#/leave';
    });
    this.shadowRoot.querySelector('.holiday-chip')?.addEventListener('click', () => {
      window.location.hash = '#/leave';
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Alder';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru People';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get leaveCount() {
    return this.getAttribute('leave-count') || '0';
  }

  get holidayLabel() {
    return this.getAttribute('holiday-label') || 'Next holiday · Labor Day';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="header-shell">
        <div class="header-bar">
          <div class="header-start">
            <slot name="nav-toggle"></slot>
            <a class="header-brand" href="#/overview" part="brand">
              <span class="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="28" height="28">
                  <rect width="32" height="32" rx="9" fill="#0F766E"/>
                  <path d="M16 7c-3.8 2.8-6 6.4-6 10.2 0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5C22 13.4 19.8 9.8 16 7z" fill="#F0FDFA"/>
                  <path d="M16 22.5c-1.8 0-3.5-.6-4.8-1.6l1.2-1.4c1 .7 2.2 1.1 3.6 1.1s2.6-.4 3.6-1.1l1.2 1.4c-1.3 1-3 1.6-4.8 1.6z" fill="#99F6E4"/>
                </svg>
              </span>
              <span class="brand-copy">
                <strong>${this.product}</strong>
                <small>${this.workspace}</small>
              </span>
            </a>
            <slot name="crumbs"></slot>
          </div>
          <div class="header-center">
            <button type="button" class="leave-cluster" aria-label="People on leave this week">
              <span class="avatar-stack">
                <slot name="leave-avatars"></slot>
              </span>
              <span class="leave-copy">
                <strong>${this.leaveCount} on leave this week</strong>
                <small>Open the PTO calendar</small>
              </span>
            </button>
            <button type="button" class="holiday-chip">
              <eds-icon name="calendar" size="sm" aria-hidden="true"></eds-icon>
              ${this.holidayLabel}
            </button>
          </div>
          <div class="header-end">
            <div class="header-search">
              <slot name="search"></slot>
            </div>
            <span class="header-kbd"><slot name="kbd"></slot></span>
            <slot name="add"></slot>
            <div class="inbox-wrap">
              <slot name="inbox"></slot>
              <span class="inbox-count" aria-label="${this.inboxCount} unread">${this.inboxCount}</span>
            </div>
            <slot name="profile"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('alder-header')) {
  customElements.define('alder-header', AlderHeader);
}
