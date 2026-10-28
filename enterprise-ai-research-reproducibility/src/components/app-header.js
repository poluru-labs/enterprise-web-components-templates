import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#B1B2FF"></rect>
      <path d="M9 22V10h2.4v5.6H16V10h2.4v12H16v-4.4H11.4V22H9zm10.2 0V14h2.4v8h-2.4zm5.4 0v-9h2.4V22h-2.4z" fill="#1e2048"></path>
    </svg>
  `;
}

export class SignalHeader extends HTMLElement {
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
    return this.getAttribute('product') || 'Ledger';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Harbor Research';
  }

  get period() {
    return this.getAttribute('period') || 'Cohort 7 · protocol v2.4';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '3';
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
          <button class="kpi-cell" type="button" data-href="${item.href || '#/trends'}" title="${item.label}">
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
      : [
          { label: 'Replication rate', value: '87%', delta: '+3 pts', trend: 'up', href: '#/trends' },
        ];

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
            <slot name="alert"></slot>
            <slot name="profile"></slot>
          </div>
        </div>
        <div class="scoreboard" aria-label="Live KPI scoreboard">
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

if (!customElements.get('signal-header')) {
  customElements.define('signal-header', SignalHeader);
}
