import { badgeVariant } from '../lib/status.js';
import { formatCurrency } from '../lib/format.js';

const BRAND = '#1581BF';

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

const cardSheet = new CSSStyleSheet();
cardSheet.replaceSync(`
  .padded .header,
  .padded .footer,
  .padded .media ::slotted(*) {
    border: 0;
  }
`);

export function themeCards(root = document) {
  const apply = () => {
    root.querySelectorAll('eds-card').forEach((card) => {
      const shadow = card.shadowRoot;
      if (!shadow || card.dataset.cardTheme === '1') return;
      shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, cardSheet];
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

export function tripGrid(cards) {
  return `
    <section class="card-grid" aria-label="Trips">
      ${cards
        .map(
          (card) => `
        <content-card href="#/trip/${card.id}">
          <div slot="header" class="section-title">
            <h2>${card.city}</h2>
            ${statusChip(card.status)}
          </div>
          <p class="muted mb-1">${card.traveler} · ${card.code}</p>
          <p class="route-line mb-2">${card.origin} <span>→</span> ${card.dest}</p>
          <p class="muted mb-3">${card.depart} – ${card.return} · ${formatCurrency(card.cost)}</p>
          ${statusChip(card.risk)}
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
  const span = Math.max(max - min, 1);
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - ((value - min) / span) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  const area = `0,92 ${coords} 360,92`;
  const fillId = `way-fill-${++sparkId}`;
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="${fillId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.26" />
          <stop offset="100%" stop-color="${BRAND}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#${fillId})" points="${area}"></polygon>
      <polyline fill="none" stroke="${BRAND}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${coords}" />
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
  Watch: 'warning',
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

export function tripMix(cards) {
  const groups = [
    { key: 'Cleared', tone: 'on-track', items: [] },
    { key: 'Watch', tone: 'watch', items: [] },
    { key: 'Elevated', tone: 'risk', items: [] },
  ];
  cards.forEach((card) => {
    const group = groups.find((entry) => entry.key === card.risk) ?? groups[1];
    group.items.push(card);
  });
  const total = Math.max(cards.length, 1);
  const live = cards.filter((card) => card.status === 'In trip').length;

  return `
    <div class="health-mix">
      <div class="health-mix-hero">
        <strong>${live}</strong>
        <span>In trip · ${total} on the book</span>
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
            const names = group.items.map((item) => item.city).join(', ') || 'None';
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

export function legList(items) {
  const iconFor = (kind) => {
    if (kind === 'Flight') return 'bi-airplane';
    if (kind === 'Hotel') return 'bi-building';
    if (kind === 'Rail') return 'bi-train-front';
    if (kind === 'Car') return 'bi-car-front';
    return 'bi-geo-alt';
  };
  return `
    <div class="leg-list">
      ${items
        .map(
          (item) => `
        <div class="leg-row">
          <span class="leg-icon" aria-hidden="true"><i class="bi ${iconFor(item.kind)}"></i></span>
          <div class="leg-copy">
            <strong>${item.label}</strong>
            <small>${item.kind} · ${item.when}</small>
          </div>
          ${statusChip(item.status)}
        </div>`,
        )
        .join('')}
    </div>
  `;
}
