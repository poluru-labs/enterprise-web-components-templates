import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#780C28"></rect>
      <path d="M16 7.4v4.2" stroke="#F4D5DC" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M16 11.6l6.2 3.2v6.6L16 24.6l-6.2-3.2v-6.6z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"></path>
      <path d="M16 14.2v7.2" stroke="#F4D5DC" stroke-width="1.6" stroke-linecap="round"></path>
    </svg>
  `;
}

export class BeaconHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count', 'reserve-label'];
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
    return this.getAttribute('product') || 'Beacon';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Cover';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  get reserveLabel() {
    return this.getAttribute('reserve-label') || '$4.8M reserved';
  }

  set claimStages(value) {
    this.#stages = Array.isArray(value) ? value : [];
    if (this.isConnected) this.render();
  }

  get claimStages() {
    return this.#stages;
  }

  render() {
    const stages = this.#stages.length
      ? this.#stages
      : [
          { id: 'intake', label: 'Intake', count: 2, href: '#/claims' },
          { id: 'assigned', label: 'Assigned', count: 3, href: '#/adjusters', hot: true },
          { id: 'investigate', label: 'Investigate', count: 2, href: '#/fraud' },
          { id: 'settle', label: 'Settle', count: 1, href: '#/settlements' },
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
        <div class="claim-strip" aria-label="Claim stages">
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
          <div class="reserve-chip">
            <small>Reserves</small>
            <strong>${this.reserveLabel}</strong>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('beacon-header')) {
  customElements.define('beacon-header', BeaconHeader);
}
