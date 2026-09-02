import headerCss from '../styles/header.css?inline';

export class VesperaHeader extends HTMLElement {
  static get observedAttributes() {
    return ['sprint-name', 'days-left', 'days-total', 'sprint-focus'];
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

  get sprintName() {
    return this.getAttribute('sprint-name') || 'Sprint 34';
  }

  get daysLeft() {
    return Number(this.getAttribute('days-left') || 4);
  }

  get daysTotal() {
    return Number(this.getAttribute('days-total') || 10);
  }

  get sprintFocus() {
    return this.getAttribute('sprint-focus') || 'Checkout tokenize';
  }

  renderBurndownTicks() {
    const ticks = this.burndownTicks || [];
    const elapsed = this.daysTotal - this.daysLeft;
    return ticks
      .map((value, index) => {
        const height = Math.max(0.35, Math.min(1, Number(value))) * 100;
        const classes = ['burndown-tick'];
        if (index < elapsed) classes.push('done');
        if (index === elapsed) classes.push('today');
        return `<span class="${classes.join(' ')}" style="height:${height}%" title="Day ${index + 1}"></span>`;
      })
      .join('');
  }

  render() {
    const elapsed = Math.max(0, this.daysTotal - this.daysLeft);
    const meterPct = Math.round((this.daysLeft / this.daysTotal) * 100);

    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="header-shell">
        <div class="sprint-strip" aria-label="Sprint progress">
          <div class="sprint-meta">
            <span class="sprint-dot" aria-hidden="true"></span>
            <span>${this.sprintName}</span>
            <span aria-hidden="true">·</span>
            <span>${this.daysLeft} day${this.daysLeft === 1 ? '' : 's'} left</span>
          </div>
          <div class="days-meter" role="meter" aria-valuemin="0" aria-valuemax="${this.daysTotal}" aria-valuenow="${this.daysLeft}" aria-label="Days remaining">
            <span class="days-meter-label">${elapsed} of ${this.daysTotal} days elapsed</span>
            <div class="days-meter-track">
              <div class="days-meter-fill" style="width:${meterPct}%"></div>
            </div>
          </div>
          <div class="burndown-ticks" aria-label="Mini burndown">${this.renderBurndownTicks()}</div>
          <span class="sprint-focus">${this.sprintFocus}</span>
        </div>
        <div class="header-bar">
          <div class="header-start">
            <slot name="nav-toggle"></slot>
            <a class="header-brand" href="#/overview" part="brand">
              <span class="brand-mark" aria-hidden="true">V</span>
              <span class="brand-copy">
                <strong>Vespera</strong>
                <small>Fieldline Studio</small>
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
            <slot name="task"></slot>
            <slot name="profile"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('vespera-header')) {
  customElements.define('vespera-header', VesperaHeader);
}
