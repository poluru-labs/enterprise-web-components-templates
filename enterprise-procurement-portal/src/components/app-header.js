import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#FF5722"></rect>
      <circle cx="16" cy="16" r="8" fill="none" stroke="#fff" stroke-width="2"></circle>
      <path d="M16 8.6v14.8M8.6 16h14.8" stroke="#fff" stroke-width="1.5"></path>
    </svg>
  `;
}

export class AtlasHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'budget-label'];
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
    return this.getAttribute('product') || 'Atlas';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Works';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get budgetLabel() {
    return this.getAttribute('budget-label') || '$3.56M left · FY26';
  }

  set pipelineStages(value) {
    this.#stages = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get pipelineStages() {
    return this.#stages;
  }

  render() {
    const stages = this.#stages.length
      ? this.#stages
      : [
          { id: 'request', label: 'Request', count: 2, href: '#/requests' },
          { id: 'approve', label: 'Approve', count: 2, href: '#/approvals', hot: true },
          { id: 'order', label: 'Order', count: 3, href: '#/requests' },
          { id: 'receive', label: 'Receive', count: 1, href: '#/requests' },
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
        <div class="pipeline-strip" aria-label="Purchase pipeline">
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
          <div class="budget-chip">
            <small>Budget left</small>
            <strong>${this.budgetLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('atlas-header')) {
  customElements.define('atlas-header', AtlasHeader);
}
