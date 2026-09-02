import { badgeVariant, statusLabel } from '../lib/status.js';

const BRAND = '#0F766E';

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

export function personCard(person) {
  return `
    <content-card href="#/person/${person.id}">
      <div slot="header" class="section-title">
        <h2>${person.name}</h2>
        ${statusChip(person.status)}
      </div>
      <div class="person-card">
        <eds-avatar name="${person.name}" size="md"></eds-avatar>
        <div class="meta">
          <strong>${person.title}</strong>
          <span class="muted">${person.department} · ${person.location}</span>
          <span class="muted">${person.learningHours}h learning · ${person.ptoBalance} PTO days</span>
        </div>
      </div>
    </content-card>
  `;
}

export function personGrid(peopleList) {
  return `
    <section class="card-grid" aria-label="People">
      ${peopleList.map((person) => personCard(person)).join('')}
    </section>
  `;
}

export function reqCard(req) {
  const total = Object.values(req.pipeline).reduce((a, b) => a + b, 0);
  return `
    <content-card href="#/hiring">
      <div slot="header" class="section-title">
        <h2>${req.title}</h2>
        ${statusChip(req.status)}
      </div>
      <p class="muted mb-2">${req.department} · ${req.location}</p>
      <p class="muted mb-2">${req.hiringManager} · ${req.openings} opening${req.openings > 1 ? 's' : ''}</p>
      <div class="pipeline-bar">
        ${Object.entries(req.pipeline)
          .map(
            ([stage, count]) => `
          <div class="pipeline-stage">
            <strong>${count}</strong>
            ${stage}
          </div>`,
          )
          .join('')}
      </div>
      <p class="muted mt-2 mb-0">${total} candidates · posted ${req.posted}</p>
    </content-card>
  `;
}

export function reqGrid(reqList) {
  return `
    <section class="card-grid" aria-label="Requisitions">
      ${reqList.map((req) => reqCard(req)).join('')}
    </section>
  `;
}

export function courseCard(course) {
  return `
    <content-card href="#/learning">
      <div slot="header" class="section-title">
        <h2>${course.title}</h2>
        ${statusChip(course.status)}
      </div>
      <p class="muted mb-2">${course.category} · ${course.hours}h · ${course.enrolled} enrolled</p>
      <p class="muted mb-2">${course.instructor}</p>
      <p class="muted mb-0">${course.summary}</p>
      <div slot="footer">
        <eds-badge label="Due ${course.due}" variant="info" pill></eds-badge>
      </div>
    </content-card>
  `;
}

export function courseGrid(courseList) {
  return `
    <section class="card-grid" aria-label="Courses">
      ${courseList.map((course) => courseCard(course)).join('')}
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
  const fillId = `alder-fill-${++sparkId}`;
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

export function mixedHighlightGrid({ peopleList = [], reqList = [], courseList = [] }) {
  const cards = [
    ...peopleList.slice(0, 2).map((p) => personCard(p)),
    ...reqList.slice(0, 2).map((r) => reqCard(r)),
    ...courseList.slice(0, 2).map((c) => courseCard(c)),
  ];
  return `<section class="card-grid" aria-label="Highlights">${cards.join('')}</section>`;
}
