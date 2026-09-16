import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#129990"></rect>
      <path fill="none" stroke="#fff" stroke-width="1.7" stroke-linejoin="round" d="M16 6.2 25.2 10.4v7.1c0 4.4-4 7.7-9.2 9.3-5.2-1.6-9.2-4.9-9.2-9.3v-7.1Z"></path>
      <rect x="14.2" y="15.2" width="3.6" height="7.2" rx="0.4" fill="#fff"></rect>
      <rect x="9.6" y="17.4" width="3.2" height="5" rx="0.3" fill="#fff" fill-opacity="0.7"></rect>
      <rect x="19.2" y="17.4" width="3.2" height="5" rx="0.3" fill="#fff" fill-opacity="0.7"></rect>
      <path fill="#fff" d="M16 8.6 22.4 11.4v1.1L16 9.9 9.6 12.5V11.4Z"></path>
    </svg>
  `;
}

export class CivicHeader extends HTMLElement {
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
    return this.getAttribute('product') || 'CivicWorks';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Harbor City';
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
          <button class="kpi-cell" type="button" data-href="${item.href || '#/requests'}" title="${item.label}">
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
      : [{ label: 'Open 311', value: '142', delta: 'Live', trend: 'flat', href: '#/requests' }];

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
        <div class="scoreboard" aria-label="Live civic administration scoreboard">
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

if (!customElements.get('civic-header')) {
  customElements.define('civic-header', CivicHeader);
}
