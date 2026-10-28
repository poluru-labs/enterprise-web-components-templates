import { goalColumns, goals } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderGoals() {
  return `
    ${pageHeader({
      eyebrow: 'Goals',
      title: 'Test goals',
      lead: 'Release 4.2 remediation targets tied to components and owners.',
      actions: '<eds-button variant="primary" icon="plus">Add goal</eds-button>',
    })}
    ${sheet({
      title: 'Goal register',
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
