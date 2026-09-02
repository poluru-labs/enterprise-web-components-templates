import headerCss from '../styles/header.css?inline';
import { formatPercent } from '../lib/format.js';

function healthRing(label, percent, tone) {
  const r = 14;
  const circumference = 2 * Math.PI * r;
  const dash = (Math.min(Math.max(percent, 0), 100) / 100) * circumference;
  return `
    <div class="health-ring" aria-label="${label} ${formatPercent(percent, 0)}">
      <svg class="ring-svg" viewBox="0 0 36 36" aria-hidden="true">
        <circle class="ring-track" cx="18" cy="18" r="${r}"></circle>
        <circle
          class="ring-fill ${tone}"
          cx="18"
          cy="18"
          r="${r}"
          stroke-dasharray="${dash} ${circumference}"
        ></circle>
      </svg>
      <span class="ring-copy">
        <strong>${formatPercent(percent, 0)}</strong>
        <small>${label}</small>
      </span>
    </div>`;
}

export class NimbusHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'product-line'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Nimbus';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Supply Co.';
  }

  get productLine() {
    return this.getAttribute('product-line') || 'Inventory';
  }

  render() {
    const health = this.stockHealth || { inStock: 76.2, low: 14.8, stockout: 9.0 };
    const dock = this.inboundDock || { dock: 'Dock 2', minutes: 18 };

    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="header-shell">
        <div class="header-status" aria-label="Warehouse status">
          <span class="status-kicker">Warehouse status</span>
          <div class="health-rings">
            ${healthRing('In stock', health.inStock, 'success')}
            ${healthRing('Low', health.low, 'warning')}
            ${healthRing('Stockout', health.stockout, 'danger')}
          </div>
          <div class="dock-countdown">
            <span class="dock-kicker">Inbound</span>
            <strong>${dock.dock} · ${dock.minutes} min</strong>
          </div>
        </div>
        <div class="header-bar">
          <div class="header-start">
            <slot name="nav-toggle"></slot>
            <a class="header-brand" href="#/overview" part="brand">
              <span class="brand-mark" aria-hidden="true">N</span>
              <span class="brand-copy">
                <strong>${this.product}</strong>
                <small>${this.productLine} · ${this.workspace}</small>
              </span>
            </a>
            <slot name="crumbs"></slot>
          </div>
          <div class="header-search">
            <slot name="search"></slot>
          </div>
          <div class="header-end">
            <span class="header-kbd"><slot name="kbd"></slot></span>
            <slot name="inbox"></slot>
            <slot name="receipt"></slot>
            <slot name="profile"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('nimbus-header')) {
  customElements.define('nimbus-header', NimbusHeader);
}
