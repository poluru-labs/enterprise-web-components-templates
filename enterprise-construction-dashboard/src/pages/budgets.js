import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { budgets } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderBudgets() {
  const remaining = budgets.reduce((sum, item) => sum + item.remaining, 0);
  return `
    ${pageHeader({
      eyebrow: 'Cost',
      title: 'Budgets',
      lead: `Arjun Poluru’s book. ${formatCurrency(remaining)} still unspent across eight jobs.`,
      actions: '<eds-button id="bd-export" variant="secondary" icon="download">Export</eds-button>',
    })}
    ${sheet({
      title: 'Approved vs spent',
      body: `
        <table class="budget-table">
          <thead>
            <tr><th>Job</th><th>Code</th><th>Approved</th><th>Spent</th><th>Left</th><th>Owner</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${budgets
              .map(
                (item) => `
              <tr>
                <td>${item.site}</td>
                <td>${item.code}</td>
                <td>${formatCurrency(item.approved)}</td>
                <td>${formatCurrency(item.spent)}</td>
                <td>${formatCurrency(item.remaining)}</td>
                <td>${item.owner}</td>
                <td>${statusChip(item.status)}</td>
              </tr>`,
              )
              .join('')}
          </tbody>
        </table>`,
    })}
  `;
}

export function hydrateBudgets(root) {
  root.querySelector('#bd-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Budget export is a demo in this template', variant: 'info' });
  });
}
