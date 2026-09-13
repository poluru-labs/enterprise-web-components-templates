import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#347433"></rect>
      <path d="M16 7.4l5.2 4v9.2L16 24.6l-5.2-4V11.4z" fill="none" stroke="#fff" stroke-width="1.8"></path>
      <path d="M13.4 11.8h5.2L16 15.6z" fill="#D7F0D7"></path>
    </svg>
  `;
}

export class KeystoneHeader extends HTMLElement {
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
    return this.getAttribute('product') || 'Keystone';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Builds';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get budgetLabel() {
    return this.getAttribute('budget-label') || '$92.1M left';
  }

  set buildStages(value) {
    this.#stages = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get buildStages() {
    return this.#stages;
  }

  render() {
    const stages = this.#stages.length
      ? this.#stages
      : [
          { id: 'mobilize', label: 'Mobilize', count: 2, href: '#/sites' },
          { id: 'structure', label: 'Structure', count: 3, href: '#/schedule', hot: true },
          { id: 'fit_out', label: 'Fit-out', count: 2, href: '#/sites' },
          { id: 'punch', label: 'Punch', count: 1, href: '#/sites' },
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
        <div class="build-strip" aria-label="Build stages">
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

if (!customElements.get('keystone-header')) {
  customElements.define('keystone-header', KeystoneHeader);
}
