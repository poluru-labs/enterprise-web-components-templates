import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" fill="#D10056"></rect>
      <path d="M16 6.2 23.5 9.4v7.6c0 4.2-3.2 7.6-7.5 9.6-4.3-2-7.5-5.4-7.5-9.6V9.4L16 6.2z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"></path>
      <path d="M16 11.2v9.2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="square"></path>
      <circle cx="16" cy="21.6" r="1.15" fill="#fff"></circle>
    </svg>
  `;
}

export class SentinelHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'mtta-label'];
  }

  #queues = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', (event) => {
      const cell = event.target.closest('.queue-cell');
      if (cell?.dataset.href) window.location.hash = cell.dataset.href;
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Sentinel';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Shield';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get mttaLabel() {
    return this.getAttribute('mtta-label') || '14m';
  }

  set queues(value) {
    this.#queues = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get queues() {
    return this.#queues;
  }

  render() {
    const items = this.#queues.length
      ? this.#queues
      : [
          { id: 'alerts', label: 'Alerts', value: '18', href: '#/alerts', hot: true },
          { id: 'incidents', label: 'Incidents', value: '6', href: '#/incidents' },
          { id: 'vulns', label: 'Vulns', value: '11', href: '#/vulnerabilities' },
          { id: 'cases', label: 'Cases', value: '4', href: '#/investigations' },
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
        <div class="queue-strip" aria-label="Security queues">
          ${items
            .map(
              (item) => `
            <button class="queue-cell${item.hot ? ' is-hot' : ''}" type="button" data-href="${item.href}">
              <small>${item.label}</small>
              <strong>${item.value}</strong>
            </button>`,
            )
            .join('')}
          <div class="mtta-chip">
            <small>MTTA</small>
            <strong>${this.mttaLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('sentinel-header')) {
  customElements.define('sentinel-header', SentinelHeader);
}
