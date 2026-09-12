import { badgeVariant, statusLabel } from '../lib/status.js';
import { formatNumber } from '../lib/format.js';

const BRAND = '#541212';

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

export function vehicleCard(item) {
  return `
    <content-card href="#/vehicle/${item.id}">
      <div slot="header" class="section-title">
        <h2>${item.unit}</h2>
        ${statusChip(item.status)}
      </div>
      <div class="vehicle-meta">
        <strong>${item.make}</strong>
        <span class="muted">${item.type} · ${item.yard}</span>
        <span class="muted">${item.driver} · ${formatNumber(item.miles)} mi · ${item.fuel}% tank</span>
      </div>
    </content-card>
  `;
}

export function vehicleGrid(list) {
  return `
    <section class="card-grid" aria-label="Vehicles">
      ${list.map((item) => vehicleCard(item)).join('')}
    </section>
  `;
}

export function driverCard(item) {
  return `
    <content-card href="#/drivers">
      <div slot="header" class="section-title">
        <h2>${item.name}</h2>
        ${statusChip(item.status)}
      </div>
      <div class="driver-meta">
        <strong>${item.vehicle}</strong>
        <span class="muted">${item.license} · ${item.yard}</span>
        <span class="muted">${item.hours} hrs today · ${item.phone}</span>
      </div>
    </content-card>
  `;
}

export function driverGrid(list) {
  return `
    <section class="card-grid" aria-label="Drivers">
      ${list.map((item) => driverCard(item)).join('')}
    </section>
  `;
}

export function workCard(item) {
  return `
    <content-card href="#/maintenance">
      <div slot="header" class="section-title">
        <h2>${item.vehicle}</h2>
        ${statusChip(item.status)}
      </div>
      <div class="work-meta">
        <strong>${item.title}</strong>
        <span class="muted">${item.shop} · ${item.owner}</span>
        <span class="muted">Due ${item.due} · ${item.hours} hrs</span>
      </div>
    </content-card>
  `;
}

export function workGrid(list) {
  return `
    <section class="card-grid" aria-label="Work orders">
      ${list.map((item) => workCard(item)).join('')}
    </section>
  `;
}

export function filterBar(inner) {
  return `<div class="filter-bar">${inner}</div>`;
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
  const fillId = `orbit-fill-${++sparkId}`;
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}" style="width:100%;height:108px">
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
