import { badgeVariant } from '../lib/status.js';

const BRAND = '#A0153E';

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

export function padToEven(items, targets = [4, 6, 8]) {
  const list = [...items];
  const target = targets.find((count) => count >= list.length) ?? targets[targets.length - 1];
  while (list.length < target) {
    list.push({ ...list[list.length % items.length], _padded: true });
  }
  return list;
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

export function projectGrid(projects) {
  const cards = padToEven(projects, [4, 6, 8]);
  return `
    <section class="card-grid cols-4" aria-label="Projects">
      ${cards
        .map(
          (project) => `
        <content-card href="#/project/${project.id}">
          <div slot="header" class="section-title">
            <h2>${project.name}</h2>
            ${statusChip(project.status)}
          </div>
          <p class="muted mb-2">${project.client}</p>
          <p class="muted mb-3">${project.owner} · ${project.squad}</p>
          <eds-progress-bar value="${project.health}" max="100" label="${project.health}% health" show-value></eds-progress-bar>
        </content-card>`,
        )
        .join('')}
    </section>
  `;
}

export function taskGrid(tasks) {
  const cards = padToEven(tasks, [4, 6, 8]);
  return `
    <section class="card-grid" aria-label="Tasks">
      ${cards
        .map(
          (task) => `
        <content-card href="#/tasks">
          <div slot="header" class="section-title">
            <h2>${task.title}</h2>
            ${statusChip(task.status)}
          </div>
          <p class="muted mb-2">${task.project}</p>
          <p class="muted mb-0">${task.owner} · ${task.points} pts · due ${task.due}</p>
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
  const fillId = `vespera-fill-${++sparkId}`;
  return `
    <svg class="sparkline" viewBox="0 0 360 92" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="${fillId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.28" />
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

const ACTIVITY_VARIANT = {
  Flagged: 'danger',
  Review: 'brand',
  Legal: 'warning',
  Shipped: 'success',
  Started: 'brand',
  Done: 'success',
};

export function activityList(items) {
  return `
    <ol class="activity-list">
      ${items
        .map((item) => {
          const [day, month] = String(item.timestamp).split(/\s+/);
          const current = item.status === 'Flagged';
          return `
            <li class="activity-row${current ? ' is-current' : ''}">
              <time class="activity-date" datetime="${item.timestamp}">
                <strong>${day}</strong>
                <span>${month}</span>
              </time>
              <div class="activity-copy">
                <strong>${item.label}</strong>
                <small>${item.description}</small>
              </div>
              <eds-badge label="${item.status || 'Logged'}" variant="${ACTIVITY_VARIANT[item.status] ?? 'neutral'}" pill></eds-badge>
            </li>`;
        })
        .join('')}
    </ol>
  `;
}

const SQUAD_ORDER = ['Platform', 'Experience', 'Quality', 'Field', 'Insights'];

const SQUAD_TONE = {
  Platform: 'hot',
  Experience: 'booked',
  Quality: 'steady',
  Field: 'slack',
  Insights: 'idle',
};

export function capacityMix(roster, snapshot) {
  const groups = new Map();
  roster.forEach((person) => {
    const entry = groups.get(person.squad) ?? { name: person.squad, people: [], total: 0 };
    entry.people.push(person);
    entry.total += Number(person.capacity || 0);
    groups.set(person.squad, entry);
  });
  const squads = SQUAD_ORDER.map((name) => groups.get(name))
    .filter(Boolean)
    .map((entry) => ({
      name: entry.name,
      tone: SQUAD_TONE[entry.name] ?? 'booked',
      value: Math.round(entry.total / Math.max(entry.people.length, 1)),
      count: entry.people.length,
      names: entry.people.map((person) => person.name.split(' ')[0]).join(', '),
    }));
  const booked = snapshot.booked;
  const days = `${snapshot.daysBooked} of ${snapshot.daysTotal} days`;

  return `
    <div class="capacity-mix">
      <div class="capacity-mix-hero">
        <strong>${booked}%</strong>
        <span>Studio booked · ${days}</span>
      </div>
      <div class="capacity-mix-bar" role="img" aria-label="${squads.map((squad) => `${squad.name} ${squad.value}%`).join(', ')}">
        ${squads
          .map((squad) => `<span class="${squad.tone}" style="flex:${Math.max(squad.count, 0.15)}"></span>`)
          .join('')}
      </div>
      <ul class="capacity-mix-legend">
        ${squads
          .map(
            (squad) => `
              <li>
                <span class="swatch ${squad.tone}" aria-hidden="true"></span>
                <div>
                  <strong>${squad.name}</strong>
                  <small>${squad.count} ${squad.count === 1 ? 'person' : 'people'} · ${squad.names}</small>
                </div>
                <em>${squad.value}%</em>
              </li>`,
          )
          .join('')}
      </ul>
    </div>
  `;
}
