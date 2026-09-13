import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#64E2B7"></rect>
      <path d="M8 18.4L16 11l8 7.4V24a1.2 1.2 0 0 1-1.2 1.2H9.2A1.2 1.2 0 0 1 8 24z" fill="none" stroke="#10241C" stroke-width="1.8" stroke-linejoin="round"></path>
      <path d="M13.2 25.2v-5.2h5.6v5.2" fill="none" stroke="#10241C" stroke-width="1.8"></path>
    </svg>
  `;
}

export class HavenHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'lease-label'];
  }

  #mix = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', (event) => {
      const cell = event.target.closest('.mix-cell');
      if (cell?.dataset.href) window.location.hash = cell.dataset.href;
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Haven';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Homes';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get leaseLabel() {
    return this.getAttribute('lease-label') || '93% leased';
  }

  set assetMix(value) {
    this.#mix = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get assetMix() {
    return this.#mix;
  }

  render() {
    const mix = this.#mix.length
      ? this.#mix
      : [
          { id: 'multifamily', label: 'Multifamily', count: 4, href: '#/properties', hot: true },
          { id: 'office', label: 'Office', count: 1, href: '#/properties' },
          { id: 'retail', label: 'Retail', count: 1, href: '#/leases' },
          { id: 'industrial', label: 'Industrial', count: 2, href: '#/occupancy' },
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
        <div class="mix-strip" aria-label="Asset mix">
          ${mix
            .map(
              (item) => `
            <button class="mix-cell${item.hot ? ' is-hot' : ''}" type="button" data-href="${item.href}">
              <span>
                <small>${item.label}</small>
                <strong>${item.count}</strong>
              </span>
            </button>`,
            )
            .join('')}
          <div class="lease-chip">
            <small>Occupancy</small>
            <strong>${this.leaseLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('haven-header')) {
  customElements.define('haven-header', HavenHeader);
}
