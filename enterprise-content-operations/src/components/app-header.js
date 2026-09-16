import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#E87F24"></rect>
      <path d="M11 8h3.1v13.2H21V24H11V8z" fill="#fff"></path>
    </svg>
  `;
}

export class LoomHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'ship-label'];
  }

  #stages = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', (event) => {
      const cell = event.target.closest('.stage-cell');
      if (cell?.dataset.href) window.location.hash = cell.dataset.href;
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Loom';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Fieldline Press';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get shipLabel() {
    return this.getAttribute('ship-label') || 'Stride · 06:00';
  }

  set weekStages(value) {
    this.#stages = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get weekStages() {
    return this.#stages;
  }

  render() {
    const stages = this.#stages.length
      ? this.#stages
      : [
          { id: 'draft', label: 'Draft', count: 2, href: '#/calendar' },
          { id: 'copy', label: 'Copy', count: 2, href: '#/calendar', hot: true },
          { id: 'approve', label: 'Approve', count: 2, href: '#/approvals' },
          { id: 'ship', label: 'Ship', count: 2, href: '#/schedule' },
        ];

    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="header-shell">
        <div class="header-bar">
          <div class="header-start">
            <slot name="nav-toggle"></slot>
            <a class="header-brand" href="#/overview" part="brand">
              <span class="brand-mark">${brandMark()}</span>
              <span class="brand-copy">
                <strong>${this.product}</strong>
                <small>${this.workspace}</small>
              </span>
            </a>
            <slot name="crumbs"></slot>
          </div>
          <div class="header-search">
            <slot name="search"></slot>
          </div>
          <div class="header-end">
            <span class="search-hint"><slot name="kbd"></slot></span>
            <slot name="add"></slot>
            <div class="inbox-wrap">
              <slot name="inbox"></slot>
              <span class="inbox-count" aria-label="${this.inboxCount} unread">${this.inboxCount}</span>
            </div>
            <slot name="profile"></slot>
          </div>
        </div>
        <div class="loom-strip" aria-label="Editorial week">
          ${stages
            .map(
              (stage) => `
            <button class="stage-cell${stage.hot ? ' is-hot' : ''}" type="button" data-href="${stage.href}">
              <span>
                <small>${stage.label}</small>
                <strong>${stage.count}</strong>
              </span>
            </button>`,
            )
            .join('')}
          <div class="ship-chip">
            <small>Next ship</small>
            <strong>${this.shipLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('loom-header')) {
  customElements.define('loom-header', LoomHeader);
}
