import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#C08552"></rect>
      <path d="M16 6.4 24 10.2v8.1c0 4.1-3.4 7.4-8 9.3-4.6-1.9-8-5.2-8-9.3v-8.1L16 6.4z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"></path>
      <path d="M12.2 16.2 14.8 18.7 19.8 13.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}

export class AegisHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'audit-label'];
  }

  #frameworks = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', (event) => {
      const cell = event.target.closest('.fw-cell');
      if (cell?.dataset.href) window.location.hash = cell.dataset.href;
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Aegis';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Trust';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get auditLabel() {
    return this.getAttribute('audit-label') || 'SOC 2 · 18 Sep';
  }

  set frameworks(value) {
    this.#frameworks = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get frameworks() {
    return this.#frameworks;
  }

  render() {
    const items = this.#frameworks.length
      ? this.#frameworks
      : [
          { id: 'soc2', label: 'SOC 2', value: '88%', ready: 88, href: '#/audits', hot: true },
          { id: 'iso', label: 'ISO 27001', value: '81%', ready: 81, href: '#/controls' },
          { id: 'gdpr', label: 'GDPR', value: '74%', ready: 74, href: '#/policies' },
          { id: 'hipaa', label: 'HIPAA', value: '92%', ready: 92, href: '#/controls' },
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
        <div class="framework-strip" aria-label="Framework readiness">
          ${items
            .map(
              (item) => `
            <button class="fw-cell${item.hot ? ' is-hot' : ''}" type="button" data-href="${item.href}">
              <span>
                <small>${item.label}</small>
                <strong>${item.value}</strong>
              </span>
              <span class="fw-meter" aria-hidden="true"><i style="width:${item.ready ?? 0}%"></i></span>
            </button>`,
            )
            .join('')}
          <div class="audit-chip">
            <small>Next audit</small>
            <strong>${this.auditLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('aegis-header')) {
  customElements.define('aegis-header', AegisHeader);
}
