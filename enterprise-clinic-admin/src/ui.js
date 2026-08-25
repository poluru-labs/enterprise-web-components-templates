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
    <section class="sheet chart-panel">
      <div class="section-title">
        <h2>${title}</h2>
        ${action}
      </div>
      ${body}
    </section>
  `;
}

let sparkId = 0;

export function sparkline(points, label, color = '#427AB5') {
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
    <div class="capacity-ring">
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
    <section class="sheet">
      <div class="section-title"><h2>${title}</h2></div>
      <div class="stack">${body}</div>
    </section>
  `;
}

export function statusChip(status) {
  const map = {
    'In visit': 'brand',
    'Checked in': 'info',
    Waiting: 'warning',
    Scheduled: 'neutral',
    Completed: 'success',
    'No-show risk': 'danger',
    Telehealth: 'info',
    'In clinic': 'success',
    Available: 'success',
    Turnover: 'warning',
    Busy: 'warning',
    Virtual: 'info',
    Resulted: 'success',
    Review: 'warning',
    Collected: 'info',
    'In progress': 'brand',
    Pending: 'neutral',
    'On break': 'warning',
  };
  return `<eds-badge label="${status}" variant="${map[status] ?? 'neutral'}" pill></eds-badge>`;
}
