import { goalColumns, goals } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderGoals() {
  return `
    ${pageHeader({
      eyebrow: 'Patterns',
      title: 'Workbench backlog',
      lead: 'Patterns, token work, and documentation targets for EDS 1.2.',
      actions: '<eds-button variant="primary" icon="plus">Add item</eds-button>',
    })}
    ${sheet({
      title: 'Backlog',
      body: '<eds-data-table id="goal-table" zebra sticky-header></eds-data-table>',
    })}
  `;
}

export function hydrateGoals(root) {
  const table = root.querySelector('#goal-table');
  if (table) {
    table.columns = goalColumns;
    table.rows = goals.map((row) => ({
      ...row,
      progress: `${row.progress}%`,
    }));
  }
}
