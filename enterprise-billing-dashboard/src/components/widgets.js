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

export function contentCard({ title, action = '', body, tag = 'vd-content-card' }) {
  return `
    <${tag} class="sheet">
      ${title ? `<div class="section-title"><h2>${title}</h2>${action}</div>` : ''}
      <div class="sheet-body">${body}</div>
    </${tag}>
  `;
}

export function cardGrid(cards, colClass = 'col-sm-6 col-xl-3') {
  return `
    <section class="row g-3 stretch-grid" aria-label="Equal-height cards">
      ${cards
        .map(
          (card) => `
        <div class="${colClass}">${card}</div>`,
        )
        .join('')}
    </section>
  `;
}

export function chartPanel({ title, action = '', body }) {
  return contentCard({ title, action, body, tag: 'vd-content-card' });
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
  return contentCard({ title, body });
}

export function badgeHtml(status) {
  const map = {
    Paid: 'success',
    Overdue: 'danger',
    Pending: 'warning',
    Draft: 'neutral',
    Cancelled: 'neutral',
    Collected: 'success',
    Failed: 'danger',
    Disputed: 'danger',
    Disputed: 'danger',
    Refunded: 'neutral',
    Active: 'success',
    'Past due': 'warning',
    Trial: 'info',
  };
  return `<eds-badge label="${status}" variant="${map[status] ?? 'neutral'}" pill></eds-badge>`;
}
