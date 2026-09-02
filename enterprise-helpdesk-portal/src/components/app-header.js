import headerCss from '../styles/header.css?inline';

function brandMark() {
  return `
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#03346E"></rect>
      <circle cx="10" cy="16" r="2.15" fill="#fff"></circle>
      <path d="M14.2 11.4a6.6 6.6 0 0 1 0 9.2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"></path>
      <path d="M17.6 8.6a10.4 10.4 0 0 1 0 14.8" fill="none" stroke="#9BB6D8" stroke-width="1.6" stroke-linecap="round"></path>
      <path d="M21 6.2a14 14 0 0 1 0 19.6" fill="none" stroke="#6B8FC4" stroke-width="1.5" stroke-linecap="round"></path>
    </svg>
  `;
}

export class RelayHeader extends HTMLElement {
  static get observedAttributes() {
    return ['product', 'workspace', 'inbox-count'];
  }

  #ribbon = null;
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
        const lane = event.target.closest('.queue-lane');
        if (lane) {
          window.location.hash = '#/tickets';
          return;
        }
        if (event.target.closest('.sla-clock')) {
          window.location.hash = '#/sla';
          return;
        }
        if (event.target.closest('.floor-chip')) {
          window.location.hash = '#/teams';
        }
      });
    }
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get product() {
    return this.getAttribute('product') || 'Relay';
  }

  get workspace() {
    return this.getAttribute('workspace') || 'Poluru Support';
  }

  get inboxCount() {
    return this.getAttribute('inbox-count') || '4';
  }

  set queueRibbon(value) {
    this.#ribbon = value;
    if (this.isConnected) this.render();
  }

  get queueRibbon() {
    return this.#ribbon;
  }

  renderLanes(lanes) {
    const max = Math.max(...lanes.map((lane) => Number(lane.open) || 0), 1);
    return lanes
      .map((lane) => {
        const open = Number(lane.open) || 0;
        const width = Math.max(12, Math.round((open / max) * 100));
        return `
          <button class="queue-lane" type="button" data-queue="${lane.id ?? lane.label}" title="${lane.label} · ${open} open">
            <span class="lane-meta"><span>${lane.label}</span><strong>${open}</strong></span>
            <span class="lane-track"><span class="lane-fill" style="width:${width}%"></span></span>
          </button>`;
      })
      .join('');
  }

  render() {
    const ribbon = this.#ribbon || {
      slaLabel: 'First response',
      slaCountdown: '12m',
      queueLength: 38,
      agentsOnline: 14,
      agentsScheduled: 18,
      breached: 6,
      shift: 'Shift B',
      coverage: 'Coverage until 8:00 PM',
      severity: { critical: 3, high: 7, medium: 12 },
      lanes: [],
    };
    const severity = ribbon.severity ?? { critical: 0, high: 0, medium: 0 };
    const lanes = ribbon.lanes ?? [];
    const sevTotal = Math.max(severity.critical + severity.high + severity.medium, 1);

    this.shadowRoot.innerHTML = `
      <style>${headerCss}</style>
      <div class="dispatch-shell">
        <div class="command-bar">
          <div class="command-start">
            <slot name="nav-toggle"></slot>
            <a class="header-brand" href="#/overview" part="brand">
              <span class="brand-mark">${brandMark()}</span>
              <span class="brand-copy">
                <strong>${this.product}</strong>
                <small>${this.workspace} · ${ribbon.shift || 'Shift B'}</small>
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
        <div class="dispatch-rail" aria-label="Live dispatch">
          <button class="sla-clock" type="button" title="Open SLA policies">
            <span class="sla-kicker"><span class="sla-pulse" aria-hidden="true"></span> Next breach</span>
            <strong>${ribbon.slaCountdown}</strong>
            <small>${ribbon.slaLabel} · ${ribbon.queueLength} in queue</small>
          </button>
          <div class="severity-stack" aria-label="${severity.critical} critical, ${severity.high} high, ${severity.medium} medium">
            <div class="severity-bar" role="img">
              <span class="critical" style="flex:${severity.critical / sevTotal}"></span>
              <span class="high" style="flex:${severity.high / sevTotal}"></span>
              <span class="medium" style="flex:${severity.medium / sevTotal}"></span>
            </div>
            <div class="severity-legend">
              <span><b>${severity.critical}</b> crit</span>
              <span><b>${severity.high}</b> high</span>
              <span><b>${severity.medium}</b> med</span>
            </div>
          </div>
          <div class="queue-lanes" aria-label="Queue load">
            ${this.renderLanes(lanes)}
          </div>
          <button class="floor-chip" type="button" title="Open teams">
            <strong>${ribbon.agentsOnline}/${ribbon.agentsScheduled} on floor</strong>
            <small>${ribbon.breached} breached · ${ribbon.coverage}</small>
          </button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('relay-header')) {
  customElements.define('relay-header', RelayHeader);
}
