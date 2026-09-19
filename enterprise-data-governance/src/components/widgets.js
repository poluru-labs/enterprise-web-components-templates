import { badgeVariant } from '../lib/status.js';

const BRAND = '#D2FF72';
const INK = '#121714';

export function pageHeader({ eyebrow, title, lead, actions = '' }) {
  return `
    <header class="page-header">
      <div>
        <span class="kicker">${eyebrow}</span>
        <h1>${title}</h1>
        <p>${lead}</p>
      </div>
      <div class="inline-actions">${actions}</div>
    </header>
  `;
}

export function statGrid(items, prefix = 'kpi') {
  return `
    <section class="metric-strip" aria-label="Key metrics">
      ${items
        .map(
          (_item, index) => `
        <div class="metric-cell">
          <eds-stat id="${prefix}-${index}"></eds-stat>
        </div>`,
        )
        .join('')}
    </section>
  `;
}

export function hydrateStats(root, items, prefix = 'kpi') {
  items.forEach((item, index) => Object.assign(root.querySelector(`#${prefix}-${index}`) ?? {}, item));
}

const cardCss = `
  .padded .header,
  .padded .footer,
  .padded .media ::slotted(*) {
    border: 0;
  }
`;

const cardSheet = typeof CSSStyleSheet === 'function' ? new CSSStyleSheet() : null;
if (cardSheet?.replaceSync) cardSheet.replaceSync(cardCss);

export function themeCards(root = document) {
  const apply = () => {
    root.querySelectorAll('eds-card').forEach((card) => {
      const shadow = card.shadowRoot;
      if (!shadow || card.dataset.cardTheme === '1') return;
      if (cardSheet && Array.isArray(shadow.adoptedStyleSheets)) {
        shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, cardSheet];
      } else {
        const style = document.createElement('style');
        style.textContent = cardCss;
        shadow.append(style);
      }
      card.dataset.cardTheme = '1';
    });
  };
  apply();
  requestAnimationFrame(apply);
}

export function sheet({ title, action = '', body }) {
  return `
    <content-card>
      <div slot="header" class="section-title">
        <h2>${title}</h2>
        ${action}
      </div>
      ${body}
    </content-card>
  `;
}

export function assetGrid(cards) {
  return `
    <section class="card-grid" aria-label="Catalog assets">
      ${cards
        .map(
          (card) => `
        <content-card href="#/asset/${card.id}">
          <div slot="header" class="section-title">
            <h2>${card.name}</h2>
            ${statusChip(card.status)}
          </div>
          <p class="muted mb-2">${card.purpose}</p>
          <p class="muted mb-3">${card.owner} · ${card.domain} · ${card.type}</p>
          <eds-progress-bar value="${card.quality}" max="100" label="${card.quality}% quality" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </section>
  `;
}

let sparkId = 0;

export function sparkline(points, label) {
  const max = Math.max(...points);
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - (value / max) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  const area = `0,92 ${coords} 360,92`;
  const fillId = `verity-fill-${++sparkId}`;
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="${fillId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.55" />
          <stop offset="100%" stop-color="${BRAND}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#${fillId})" points="${area}"></polygon>
      <polyline fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${coords}" />
    </svg>
  `;
}

export function filterBar(inner) {
  return `<div class="filter-bar">${inner}</div>`;
}

export function emptyState({ id, heading, description, action = '' }) {
  return `
    <eds-empty-state id="${id}" hidden heading="${heading}" description="${description}" icon="search">
      ${action}
    </eds-empty-state>
  `;
}

export function statusChip(status) {
  return `<eds-badge label="${status}" variant="${badgeVariant(status)}" pill></eds-badge>`;
}

const CADENCE_VARIANT = {
  Done: 'success',
  Today: 'brand',
  Next: 'warning',
  Scheduled: 'neutral',
};

export function cadenceList(items) {
  return `
    <ol class="cadence-list">
      ${items
        .map((item) => {
          const [day, month] = String(item.timestamp).split(/\s+/);
          const current = item.status === 'Today' || item.status === 'Next';
          return `
            <li class="cadence-row${current ? ' is-current' : ''}">
              <time class="cadence-date" datetime="${item.timestamp}">
                <strong>${day}</strong>
                <span>${month}</span>
              </time>
              <div class="cadence-copy">
                <strong>${item.label}</strong>
                <small>${item.description}</small>
              </div>
              <eds-badge label="${item.status || 'Scheduled'}" variant="${CADENCE_VARIANT[item.status] ?? 'neutral'}" pill></eds-badge>
            </li>`;
        })
        .join('')}
    </ol>
  `;
}

export function healthMix(cards) {
  const groups = [
    { key: 'Certified', tone: 'on-track', items: [] },
    { key: 'Watch', tone: 'watch', items: [] },
    { key: 'Failing', tone: 'risk', items: [] },
  ];
  cards.forEach((card) => {
    const group =
      groups.find((entry) => entry.key === card.status) ||
      (card.status === 'Restricted' || card.status === 'Draft' || card.status === 'Classified' ? groups[1] : groups[1]);
    group.items.push(card);
  });
  const total = Math.max(cards.length, 1);
  const avg = Math.round(cards.reduce((sum, card) => sum + Number(card.quality || 0), 0) / total);

  return `
    <div class="health-mix">
      <div class="health-mix-hero">
        <strong>${avg}%</strong>
        <span>Catalog quality · ${total} assets</span>
      </div>
      <div class="health-mix-bar" role="img" aria-label="${groups.map((group) => `${group.items.length} ${group.key.toLowerCase()}`).join(', ')}">
        ${groups
          .map((group) => `<span class="${group.tone}" style="flex:${Math.max(group.items.length, 0.15)}"></span>`)
          .join('')}
      </div>
      <ul class="health-mix-legend">
        ${groups
          .map((group) => {
            const pct = Math.round((group.items.length / total) * 100);
            const names = group.items.map((item) => item.name.split('.').pop()).join(', ') || 'None';
            return `
              <li>
                <span class="swatch ${group.tone}" aria-hidden="true"></span>
                <div>
                  <strong>${group.items.length} ${group.key.toLowerCase()}</strong>
                  <small>${names}</small>
                </div>
                <em>${pct}%</em>
              </li>`;
          })
          .join('')}
      </ul>
    </div>
  `;
}

export function lineageGraph() {
  return `
    <svg class="lineage-graph" viewBox="0 0 760 280" role="img" aria-label="Lineage from sources through gold assets">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8a9688"></path>
        </marker>
      </defs>
      <line x1="170" y1="70" x2="290" y2="70" stroke="#c9d3c4" stroke-width="1.6" marker-end="url(#arrow)"></line>
      <line x1="170" y1="150" x2="290" y2="150" stroke="#c9d3c4" stroke-width="1.6" marker-end="url(#arrow)"></line>
      <line x1="170" y1="230" x2="290" y2="210" stroke="#c9d3c4" stroke-width="1.6" marker-end="url(#arrow)"></line>
      <line x1="470" y1="70" x2="590" y2="90" stroke="#c9d3c4" stroke-width="1.6" marker-end="url(#arrow)"></line>
      <line x1="470" y1="150" x2="590" y2="150" stroke="#c9d3c4" stroke-width="1.6" marker-end="url(#arrow)"></line>
      <line x1="470" y1="210" x2="590" y2="210" stroke="#c9d3c4" stroke-width="1.6" marker-end="url(#arrow)"></line>
      ${node(24, 44, 'crm.raw.accounts', 'Source')}
      ${node(24, 124, 'ledger.raw.journal', 'Source')}
      ${node(24, 204, 'ops.raw.sla', 'Source')}
      ${node(300, 44, 'core.customer.accounts', 'Certified')}
      ${node(300, 124, 'finance.ledger.journal', 'Certified')}
      ${node(300, 184, 'payments.core.transfers', 'Failing')}
      ${node(600, 64, 'warehouse.gold.nrr', 'Certified')}
      ${node(600, 124, 'risk.credit.exposure', 'Watch')}
      ${node(600, 184, 'risk.aml.alerts', 'Restricted')}
    </svg>
  `;
}

function node(x, y, name, status) {
  const fill = status === 'Certified' ? BRAND : status === 'Failing' ? '#fce8e6' : '#fff';
  return `
    <g>
      <rect x="${x}" y="${y}" width="160" height="52" rx="10" fill="${fill}" stroke="#d5ddcf"></rect>
      <text x="${x + 12}" y="${y + 22}" font-size="11" font-weight="600" fill="${INK}">${name.split('.').slice(-2).join('.')}</text>
      <text x="${x + 12}" y="${y + 38}" font-size="10" fill="#5e6b62">${status}</text>
    </g>
  `;
}
