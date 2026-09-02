const BRAND = '#1055C9';

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

export function chartPanel({ title, action = '', body }) {
  return `
    <lyra-content-card>
      <div slot="header" class="section-title">
        <h2>${title}</h2>
        ${action}
      </div>
      ${body}
    </lyra-content-card>
  `;
}

export function dashGrid(cells) {
  return `<section class="dash-grid">${cells.join('')}</section>`;
}

export function dashCell(html, span = 6) {
  return `<div class="dash-span-${span}">${html}</div>`;
}

let sparkId = 0;

export function sparkline(points, label, color = BRAND) {
  const max = Math.max(...points);
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - (value / max) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  const area = `0,92 ${coords} 360,92`;
  const fillId = `crm-fill-${++sparkId}`;
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
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
    <div class="bars" role="img" aria-label="${label}">
      ${values.map((value) => `<span style="--h:${value}%"></span>`).join('')}
    </div>
  `;
}

export function ring(value, label) {
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return `
    <div class="quota-ring">
      <svg viewBox="0 0 108 108" role="img" aria-label="${label}">
        <circle class="ring-track" cx="54" cy="54" r="${radius}"></circle>
        <circle class="ring-value" cx="54" cy="54" r="${radius}" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"></circle>
      </svg>
      <div class="ring-copy">
        <strong>${value}%</strong>
        <span>${label}</span>
      </div>
    </div>
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

export function formSection({ title, body }) {
  return `
    <lyra-content-card>
      <div slot="header" class="section-title"><h2>${title}</h2></div>
      <div class="stack">${body}</div>
    </lyra-content-card>
  `;
}

export function statusChip(status) {
  const map = {
    'Closed won': 'success',
    'Closed lost': 'danger',
    Negotiation: 'brand',
    Proposal: 'info',
    Discovery: 'warning',
    Qualify: 'neutral',
    New: 'info',
    Working: 'warning',
    Qualified: 'success',
    Unqualified: 'neutral',
    Expanding: 'success',
    Healthy: 'success',
    'At risk': 'danger',
    Champion: 'brand',
    'Decision maker': 'info',
    'Economic buyer': 'warning',
    Influencer: 'neutral',
    'Due today': 'warning',
    Scheduled: 'info',
    Sent: 'success',
    Blocked: 'danger',
  };
  return `<eds-badge label="${status}" variant="${map[status] ?? 'neutral'}" pill></eds-badge>`;
}

export function money(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export function cardGrid(items, cols = 4) {
  return `<div class="card-grid card-grid--${cols}">${items.join('')}</div>`;
}
