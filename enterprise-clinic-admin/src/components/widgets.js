import { badgeVariant } from '../lib/status.js';

export function pageHeader({ eyebrow, title, lead, actions = '' }) {
  return `
    <header class="halo-page-header">
      <div>
        <span class="halo-kicker">${eyebrow}</span>
        <h1>${title}</h1>
        <p>${lead}</p>
      </div>
      <div class="halo-inline-actions">${actions}</div>
    </header>
  `;
}

export function statGrid(items, prefix = 'kpi') {
  return `
    <section class="halo-metric-strip" aria-label="Key metrics">
      ${items
        .map(
          (_item, index) => `
        <div class="halo-metric-cell">
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

export function chartPanel({ title, action = '', body }) {
  return `
    <halo-content-card class="halo-chart-panel">
      <div slot="header" class="halo-section-title">
        <h2>${title}</h2>
        ${action}
      </div>
      ${body}
    </halo-content-card>
  `;
}

let sparkId = 0;

export function sparkline(points, label, color = '#D90000') {
  const max = Math.max(...points);
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - (value / max) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  const area = `0,92 ${coords} 360,92`;
  const fillId = `halo-fill-${++sparkId}`;
  return `
    <svg class="halo-sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="${fillId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.22" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#${fillId})" points="${area}"></polygon>
      <polyline fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${coords}" />
    </svg>
  `;
}

export function bars(values, label) {
  return `
    <div class="halo-bars" role="img" aria-label="${label}">
      ${values.map((value) => `<span style="--h:${value}%"></span>`).join('')}
    </div>
  `;
}

export function ring(value, label) {
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return `
    <div class="halo-capacity-ring">
      <svg viewBox="0 0 108 108" role="img" aria-label="${label}">
        <circle class="halo-ring-track" cx="54" cy="54" r="${radius}"></circle>
        <circle class="halo-ring-value" cx="54" cy="54" r="${radius}" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"></circle>
      </svg>
      <div class="halo-ring-copy">
        <strong>${value}%</strong>
        <span>${label}</span>
      </div>
    </div>
  `;
}

export function filterBar(inner) {
  return `<div class="halo-filter-bar">${inner}</div>`;
}

export function emptyState({ id, heading, description, action = '' }) {
  return `
    <eds-empty-state id="${id}" hidden heading="${heading}" description="${description}" icon="search">
      ${action}
    </eds-empty-state>
  `;
}

export function formSection({ title, body }) {
  return `
    <halo-content-card>
      <div slot="header" class="halo-section-title"><h2>${title}</h2></div>
      <div class="halo-stack">${body}</div>
    </halo-content-card>
  `;
}

export function statusChip(status) {
  return `<eds-badge label="${status}" variant="${badgeVariant(status)}" pill></eds-badge>`;
}

export function equalHeightRow(cols) {
  return `
    <section class="row g-3 halo-equal-row">
      ${cols
        .map(
          (col) => `
        <div class="${col.className || 'col-lg-4'}">
          ${col.html}
        </div>`,
        )
        .join('')}
    </section>
  `;
}

export function cardGrid(cards, colClass = 'col-sm-6 col-xl-3') {
  return `
    <section class="row g-3 halo-equal-row" aria-label="Equal-height cards">
      ${cards.map((html) => `<div class="${colClass}">${html}</div>`).join('')}
    </section>
  `;
}

export function snapshotCard({ title, hint, href, tone = '' }) {
  return `
    <halo-content-card stretch>
      <div slot="header" class="halo-section-title">
        <h2>${title}</h2>
        ${tone ? `<eds-badge label="${tone}" variant="brand" pill></eds-badge>` : ''}
      </div>
      <p class="halo-muted">${hint}</p>
      ${href ? `<div class="halo-card-actions"><eds-link href="${href}" variant="default">Open</eds-link></div>` : ''}
    </halo-content-card>
  `;
}
