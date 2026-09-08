import { spendByCategory, spendTrend, workspace } from '../data/index.js';
import { formatCurrency, formatPercent } from '../lib/format.js';
import { pageHeader, sheet, sparkline } from '../components/widgets.js';

export function renderSpend() {
  return `
    ${pageHeader({
      eyebrow: 'FY26',
      title: 'Spend',
      lead: `Priya Poluru’s book: ${formatCurrency(workspace.spent)} posted against ${formatCurrency(workspace.budget)}. Cloud still leads.`,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Posted spend',
          action: '<eds-badge label="Sep close" variant="brand" pill></eds-badge>',
          body: `${sparkline(spendTrend, 'Monthly spend in thousands')}
            <p class="muted mb-0 mt-2">Twelve months, thousands of dollars. No surprises after June’s cloud true-up.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'By category',
          body: spendByCategory
            .map(
              (row) => `
            <div class="spend-row">
              <header>
                <span>${row.category}</span>
                <span>${formatCurrency(row.amount)}</span>
              </header>
              <eds-progress-bar value="${row.share}" max="100" label="${formatPercent(row.share, 0)}" show-value></eds-progress-bar>
            </div>`,
            )
            .join(''),
        })}
      </div>
    </div>
    <section class="mt-3">
      ${sheet({
        title: 'Category ledger',
        body: `
          <table class="spend-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Share</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Cloud</td><td>$412,000</td><td>33%</td><td>Maya Poluru</td></tr>
              <tr><td>IT hardware</td><td>$286,000</td><td>23%</td><td>Ishaan Poluru</td></tr>
              <tr><td>Facilities</td><td>$214,000</td><td>17%</td><td>Nikhil Poluru</td></tr>
              <tr><td>Professional services</td><td>$168,000</td><td>14%</td><td>Anika Poluru</td></tr>
              <tr><td>SaaS</td><td>$98,000</td><td>8%</td><td>Kavya Poluru</td></tr>
              <tr><td>Office</td><td>$62,000</td><td>5%</td><td>Rohan Poluru</td></tr>
            </tbody>
          </table>`,
      })}
    </section>
  `;
}

export function hydrateSpend() {}
