import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#88BDA4"></rect>
      <path d="M16 6.4l2.15 6.12h6.45l-5.22 3.79 2 6.19L16 18.9l-5.38 3.6 2-6.19-5.22-3.79h6.45L16 6.4z" fill="#15241e"></path>
    </svg>
  `;
}

export class TechstarHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'period', 'inbox-count'];
  }

  #ticker = null;
  #bound = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    if (!this.#bound) {
      this.#bound = true;
      this.shadowRoot.addEventListener('click', (event) => {
        const cell = event.target.closest('.kpi-cell');
        if (cell?.dataset.href) window.location.hash = cell.dataset.href;
      });
    }
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'TechStar';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Northline Systems';
  }

  get period() {
    return this.getAttribute('period') || 'Week of 16 Sep 2026';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  set tickerItems(value) {
    this.#ticker = value;
    if (this.isConnected) this.render();
  }

  get tickerItems() {
    return this.#ticker;
  }

  renderBoard(items) {
    return items
      .map(
        (item) => `
          <button class="kpi-cell" type="button" data-href="${item.href || '#/overview'}" title="${item.label}">
            <small>${item.label}</small>
            <strong>${item.value}</strong>
            <span class="kpi-delta ${item.trend || 'flat'}">${item.delta || ''}</span>
          </button>`,
      )
      .join('');
  }

  render() {
    const items = this.#ticker?.length
      ? this.#ticker
      : [{ label: 'Identity', value: '99.95%', delta: 'SLO hold', trend: 'flat', href: '#/availability' }];

    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="board">
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
        <div class="ticker" aria-label="Live operations ticker">
          <div class="live-chip"><span class="live-dot" aria-hidden="true"></span> Live</div>
          ${this.renderBoard(items)}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('techstar-header')) {
  customElements.define('techstar-header', TechstarHeader);
}
