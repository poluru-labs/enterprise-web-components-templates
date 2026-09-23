import { badgeVariant } from '../lib/status.js';

const BRAND = '#88BDA4';
const INK = '#15241e';

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
    <section class="card-grid" aria-label="Configuration items">
      ${cards
        .map(
          (card) => `
        <content-card href="#/asset/${card.id}">
          <div slot="header" class="section-title">
            <h2>${card.name}</h2>
            ${statusChip(card.status)}
          </div>
          <p class="muted mb-2">${card.purpose}</p>
          <p class="muted mb-3">${card.owner} · ${card.site} · ${card.type}</p>
          <eds-progress-bar value="${card.health}" max="100" label="${card.health}% health" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </section>
  `;
}

let sparkId = 0;

export function sparkline(points, label) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = Math.max(max - min, 0.01);
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - ((value - min) / span) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  const area = `0,92 ${coords} 360,92`;
  const fillId = `ts-fill-${++sparkId}`;
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="${fillId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.5" />
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
  Tonight: 'warning',
};

export function cadenceList(items) {
  return `
    <ol class="cadence-list">
      ${items
        .map((item) => {
          const [day, month] = String(item.timestamp).split(/\s+/);
          const current = item.status === 'Today' || item.status === 'Next' || item.status === 'Tonight';
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

export function healthMix(cards, { valueKey = 'health', label = 'Estate health' } = {}) {
  const groups = [
    { key: 'Healthy', tone: 'on-track', items: [] },
    { key: 'Watch', tone: 'watch', items: [] },
    { key: 'Degraded', tone: 'risk', items: [] },
  ];
  cards.forEach((card) => {
    const status = card.status;
    if (status === 'Healthy' || status === 'In service' || status === 'Resolved' || status === 'Closed') {
      groups[0].items.push(card);
    } else if (status === 'Degraded' || status === 'Down' || status === 'Outage' || status === 'Investigating') {
      groups[2].items.push(card);
    } else {
      groups[1].items.push(card);
    }
  });
  const total = Math.max(cards.length, 1);
  const avg = Math.round(cards.reduce((sum, card) => sum + Number(card[valueKey] || 0), 0) / total);

  return `
    <div class="health-mix">
      <div class="health-mix-hero">
        <strong>${avg}%</strong>
        <span>${label} · ${total} items</span>
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
            const names = group.items.map((item) => item.name).join(', ') || 'None';
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

export function healthMap() {
  return `
    <svg class="health-map" viewBox="0 0 760 240" role="img" aria-label="Northline sites">
      ${siteBox(24, 40, 'Chicago DC', '98%', BRAND)}
      ${siteBox(200, 40, 'Dallas DC', '94%', '#fff1cc')}
      ${siteBox(376, 40, 'Phoenix edge', '91%', '#fff1cc')}
      ${siteBox(552, 40, 'Ashburn DR', '99%', BRAND)}
      ${siteBox(200, 140, 'Austin campus', '96%', BRAND)}
      ${siteBox(376, 140, 'SaaS tenants', '93%', BRAND)}
      <line x1="176" y1="66" x2="200" y2="66" stroke="#c5d8ce" stroke-width="1.6"></line>
      <line x1="352" y1="66" x2="376" y2="66" stroke="#c5d8ce" stroke-width="1.6"></line>
      <line x1="528" y1="66" x2="552" y2="66" stroke="#c5d8ce" stroke-width="1.6"></line>
      <line x1="100" y1="92" x2="276" y2="140" stroke="#c5d8ce" stroke-width="1.6"></line>
      <line x1="452" y1="92" x2="452" y2="140" stroke="#c5d8ce" stroke-width="1.6"></line>
    </svg>
  `;
}

function siteBox(x, y, name, value, fill) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="152" height="52" rx="10" fill="${fill}" stroke="#dce8e2"></rect>
      <text x="${x + 12}" y="${y + 22}" font-size="12" font-weight="600" fill="${INK}">${name}</text>
      <text x="${x + 12}" y="${y + 38}" font-size="11" fill="#5d7269">${value}</text>
    </g>
  `;
}
