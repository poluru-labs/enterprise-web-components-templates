import { badgeVariant } from '../lib/status.js';

const BRAND = '#DD0303';

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

export function scorecardGrid(cards) {
  return `
    <section class="card-grid" aria-label="Scorecards">
      ${cards
        .map(
          (card) => `
        <content-card href="#/scorecard/${card.id}">
          <div slot="header" class="section-title">
            <h2>${card.name}</h2>
            ${statusChip(card.status)}
          </div>
          <p class="muted mb-2">${card.focus}</p>
          <p class="muted mb-3">${card.owner} · ${card.kpis} KPIs</p>
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
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - (value / max) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  const area = `0,92 ${coords} 360,92`;
  const fillId = `signal-fill-${++sparkId}`;
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
    { key: 'On track', tone: 'on-track', items: [] },
    { key: 'Watch', tone: 'watch', items: [] },
    { key: 'At risk', tone: 'risk', items: [] },
  ];
  cards.forEach((card) => {
    const group = groups.find((entry) => entry.key === card.status) ?? groups[1];
    group.items.push(card);
  });
  const total = Math.max(cards.length, 1);
  const avg = Math.round(cards.reduce((sum, card) => sum + Number(card.health || 0), 0) / total);

  return `
    <div class="health-mix">
      <div class="health-mix-hero">
        <strong>${avg}%</strong>
        <span>Portfolio health · ${total} scorecards</span>
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
