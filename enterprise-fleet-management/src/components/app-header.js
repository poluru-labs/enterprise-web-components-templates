import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#541212"></rect>
      <circle cx="16" cy="16" r="8" fill="none" stroke="#fff" stroke-width="2"></circle>
      <circle cx="16" cy="16" r="3" fill="#F3D2D2"></circle>
    </svg>
  `;
}

export class OrbitHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'fuel-label'];
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
    return this.getAttribute('product') || 'Orbit';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Yards';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get fuelLabel() {
    return this.getAttribute('fuel-label') || '68% avg tank';
  }

  set dispatchStages(value) {
    this.#stages = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get dispatchStages() {
    return this.#stages;
  }

  render() {
    const stages = this.#stages.length
      ? this.#stages
      : [
          { id: 'yard', label: 'Yard', count: 18, href: '#/vehicles' },
          { id: 'assigned', label: 'Assigned', count: 12, href: '#/drivers' },
          { id: 'on_route', label: 'On route', count: 96, href: '#/vehicles' },
          { id: 'shop', label: 'Shop', count: 8, href: '#/maintenance', hot: true },
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
        <div class="dispatch-strip" aria-label="Dispatch board">
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
          <div class="fuel-chip">
            <small>Fuel left</small>
            <strong>${this.fuelLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('orbit-header')) {
  customElements.define('orbit-header', OrbitHeader);
}
