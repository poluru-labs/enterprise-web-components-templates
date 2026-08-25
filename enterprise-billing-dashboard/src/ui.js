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
    <section class="ledger-strip" aria-label="Key metrics">
      ${items
        .map(
          (_item, index) => `
        <div class="ledger-cell">
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
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
      <polyline fill="none" stroke="#1D4533" stroke-width="1.75" points="${coords}" />
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
