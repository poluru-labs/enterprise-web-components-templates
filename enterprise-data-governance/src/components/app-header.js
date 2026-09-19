import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#D2FF72"></rect>
      <path d="M8.2 11.2h3.1L16 21.4l4.7-10.2h3.1L17.4 23.6h-2.8L8.2 11.2z" fill="#121714"></path>
    </svg>
  `;
}

export class VerityHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'period', 'inbox-count'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Verity';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Helix Markets';
  }

  get period() {
    return this.getAttribute('period') || 'Catalog freeze 16 Sep 2026';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="bar">
        <div class="bar-start">
          <slot name="nav-toggle"></slot>
          <a class="header-brand" href="#/overview" part="brand">
            <span class="brand-mark">${brandMark()}</span>
            <span class="brand-copy">
              <strong>${this.product}</strong>
              <small>${this.workspace} · ${this.period}</small>
            </span>
          </a>
          <slot name="mega"></slot>
          <slot name="crumbs"></slot>
        </div>
        <div class="bar-search">
          <slot name="search"></slot>
        </div>
        <div class="bar-end">
          <span class="search-hint"><slot name="kbd"></slot></span>
          <div class="inbox-wrap">
            <slot name="inbox"></slot>
            <span class="inbox-count" aria-label="${this.inboxCount} unread">${this.inboxCount}</span>
          </div>
          <slot name="alert"></slot>
          <slot name="profile"></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('verity-header')) {
  customElements.define('verity-header', VerityHeader);
}
