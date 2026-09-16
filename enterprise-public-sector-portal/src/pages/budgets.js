import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { budgetColumns, budgets } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export function renderBudgets() {
  const total = budgets.reduce((sum, item) => sum + item.appropriated, 0);
  const spent = budgets.reduce((sum, item) => sum + item.spent, 0);
  const used = Math.round((spent / total) * 100);
  return `
    ${pageHeader({
      eyebrow: 'FY26',
      title: 'Budgets',
      lead: `${formatCurrency(spent)} spent of ${formatCurrency(total)} appropriated (${used}% ). Water utility is the only watch fund.`,
      actions: `<eds-button id="bd-export" variant="primary" icon="download">Export YTD</eds-button>`,
    })}
    <eds-card padded>
      <eds-data-table id="bd-table" sortable striped></eds-data-table>
    </eds-card>
    <div class="card-grid mt-3">
      ${budgets
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.fund}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.department}</p>
          <p class="hero-metric" style="font-size:1.4rem">${item.used}%</p>
          <eds-progress-bar value="${item.used}" max="100" label="${formatCurrency(item.spent)} spent" show-value></eds-progress-bar>
          <p class="muted mb-0 mt-2">${formatCurrency(item.remaining)} remaining</p>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Notes',
        body: `
          <eds-accordion>
            <eds-accordion-item heading="On plan" open>
              Streets, parks, housing, general fund, and grants sit under 80%. Arjun Poluru owns the readout on 22 Sep.
            </eds-accordion-item>
            <eds-accordion-item heading="Watch">
              Water utility is at 78% with a main repair still open on Cedar.
            </eds-accordion-item>
            <eds-accordion-item heading="Council">
              Mira Poluru takes the appendix to council with the 311 SLA pack.
            </eds-accordion-item>
          </eds-accordion>`,
      })}
    </section>
  `;
}

export function hydrateBudgets(root) {
  const table = root.querySelector('#bd-table');
  if (table) {
    table.columns = budgetColumns;
    table.rows = budgets.map((item) => ({
      ...item,
      appropriated: formatCurrency(item.appropriated),
      spent: formatCurrency(item.spent),
      remaining: formatCurrency(item.remaining),
    }));
  }
  root.querySelector('#bd-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Budget YTD queued', variant: 'success' });
  });
}
