import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1581BF"></rect>
      <circle cx="16" cy="16" r="9.2" fill="none" stroke="#fff" stroke-width="1.7"></circle>
      <path fill="#fff" d="M16 6.8 18.35 16 16 25.2 13.65 16Z"></path>
      <path fill="#fff" fill-opacity="0.45" d="M6.8 16 16 13.65 25.2 16 16 18.35Z"></path>
      <circle cx="16" cy="16" r="1.7" fill="#083d5c"></circle>
    </svg>
  `;
}

export class WayHeader extends HTMLElement {
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
    return this.getAttribute('product') || 'Waypoint';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Meridian Group';
  }

  get period() {
    return this.getAttribute('period') || 'FY26 Q3 · week 12';
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
          <button class="kpi-cell" type="button" data-href="${item.href || '#/trips'}" title="${item.label}">
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
      : [{ label: 'In trip', value: '2', delta: 'Live', trend: 'flat', href: '#/trips' }];

    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="board-shell">
        <div class="live-led" aria-hidden="true"></div>
        <div class="command-bar">
          <div class="command-start">
            <slot name="nav-toggle"></slot>
            <a class="header-brand" href="#/overview" part="brand">
              <span class="brand-mark">${brandMark()}</span>
              <span class="brand-copy">
                <strong>${this.product}</strong>
                <small>${this.workspace} · ${this.period}</small>
              </span>
            </a>
            <slot name="crumbs"></slot>
          </div>
          <div class="command-search">
            <slot name="search"></slot>
          </div>
          <div class="command-end">
            <span class="search-hint"><slot name="kbd"></slot></span>
            <div class="inbox-wrap">
              <slot name="inbox"></slot>
              <span class="inbox-count" aria-label="${this.inboxCount} unread">${this.inboxCount}</span>
            </div>
            <slot name="create"></slot>
            <slot name="profile"></slot>
          </div>
        </div>
        <div class="scoreboard" aria-label="Live travel operations scoreboard">
          <div class="live-chip">
            <span><span class="live-dot" aria-hidden="true"></span> Live</span>
            ${this.period}
          </div>
          ${this.renderBoard(items)}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('way-header')) {
  customElements.define('way-header', WayHeader);
}
