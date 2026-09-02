import { boardColumns, tasks } from '../data/index.js';
import { pageHeader, statusChip } from '../components/widgets.js';

export function renderBoard() {
  return `
    ${pageHeader({
      eyebrow: 'Sprint 34',
      title: 'Board',
      lead: 'Harbor, Lumen, Cedar, and Brightline cards in flight. Drag is visual only in this demo.',
      actions: `
        <eds-button-group>
          <eds-button id="board-filter" variant="secondary" icon="filter">Filter</eds-button>
          <eds-button id="board-add" variant="primary" icon="plus">Card</eds-button>
        </eds-button-group>
      `,
    })}
    <div class="board-grid">
      ${boardColumns
        .map((column) => {
          const cards = tasks.filter((item) => item.column === column.id);
          return `
            <section class="board-col">
              <header>
                <h2>${column.label}</h2>
                <eds-badge label="${cards.length}" variant="neutral" pill></eds-badge>
              </header>
              ${cards
                .map(
                  (card) => `
                <article class="board-card">
                  <div class="board-card-top">
                    ${statusChip(card.status)}
                    <eds-avatar name="${card.owner}" size="xs"></eds-avatar>
                  </div>
                  <strong>${card.title}</strong>
                  <span>${card.project} · ${card.points} pts · ${card.due}</span>
                </article>`,
                )
                .join('')}
            </section>`;
        })
        .join('')}
    </div>
  `;
}

export function hydrateBoard(root) {
  root.querySelector('#board-add')?.addEventListener('eds-click', () => document.querySelector('#task-modal')?.show());
  root.querySelector('#board-filter')?.addEventListener('eds-click', () => document.querySelector('#filter-drawer')?.show());
}
