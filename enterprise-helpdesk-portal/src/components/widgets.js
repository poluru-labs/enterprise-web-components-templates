import { badgeVariant, priorityTone } from '../lib/status.js';

const BRAND = '#03346E';

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

export function statGrid(items, prefix = 'metric') {
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

export function hydrateStats(root, items, prefix = 'metric') {
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

export function queueGrid(queues) {
  return `
    <section class="card-grid" aria-label="Queues and teams">
      ${queues
        .map(
          (queue) => `
        <content-card href="#/tickets">
          <div slot="header" class="section-title">
            <h2>${queue.name}</h2>
            ${statusChip(queue.status)}
          </div>
          <p class="muted mb-2">${queue.lead} · ${queue.open} open</p>
          <p class="muted mb-3">${queue.breached} breached · ${queue.sla}% SLA</p>
          <eds-progress-bar value="${queue.sla}" max="100" label="${queue.sla}% SLA health" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </section>
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

export function priorityChip(priority) {
  return `<eds-badge label="${priority}" variant="${priorityTone(priority)}" pill></eds-badge>`;
}

export function slaChip(sla) {
  return `<eds-badge label="${sla}" variant="${badgeVariant(sla)}" pill></eds-badge>`;
}

export function ticketTableMarkup() {
  return '<eds-data-table id="ticket-table" compact striped selectable></eds-data-table>';
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
  const area = `0,92 ${coords} 360,92`;
  const fillId = `relay-fill-${Math.random().toString(36).slice(2, 8)}`;
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
