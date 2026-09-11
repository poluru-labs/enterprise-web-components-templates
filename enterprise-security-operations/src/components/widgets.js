import { badgeVariant, statusLabel } from '../lib/status.js';

const BRAND = '#D10056';

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

export function statGrid(items, prefix = 'stat') {
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

export function hydrateStats(root, items, prefix = 'stat') {
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

export function statusChip(status) {
  return `<eds-badge label="${statusLabel(status)}" variant="${badgeVariant(status)}" pill></eds-badge>`;
}

export function itemCard(item, href) {
  return `
    <content-card href="${href}">
      <div slot="header" class="section-title">
        <h2>${item.code || item.cve || item.source || item.name}</h2>
        ${statusChip(item.severity || item.status)}
      </div>
      <div class="item-meta">
        <strong>${item.title || item.name}</strong>
        <span class="muted">${item.owner}${item.asset ? ` · ${item.asset}` : ''}${item.queue ? ` · ${item.queue}` : ''}</span>
        <span class="muted">${item.status}${item.sla ? ` · SLA ${item.sla}` : ''}${item.linked ? ` · ${item.linked}` : ''}</span>
      </div>
    </content-card>
  `;
}

export function itemGrid(list, hrefFor) {
  return `
    <section class="card-grid" aria-label="Records">
      ${list.map((item) => itemCard(item, hrefFor(item))).join('')}
    </section>
  `;
}

export function filterBar(inner) {
  return `<div class="filter-bar">${inner}</div>`;
}

export function sparkline(points, label) {
  const max = Math.max(...points);
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - (value / max) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}" style="width:100%;height:108px">
      <polyline fill="none" stroke="${BRAND}" stroke-width="2.2" stroke-linecap="square" stroke-linejoin="miter" points="${coords}" />
    </svg>
  `;
}
