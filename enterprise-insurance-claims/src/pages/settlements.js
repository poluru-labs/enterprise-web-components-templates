import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { settlements } from '../data/index.js';
import { formatCurrency } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderSettlements() {
  const reserved = settlements.reduce((sum, item) => sum + item.reserved, 0);
  return `
    ${pageHeader({
      eyebrow: 'Payables',
      title: 'Settlements',
      lead: `Priya Poluru’s book. ${formatCurrency(reserved)} still reserved across eight files.`,
      actions: '<eds-button id="st-export" variant="secondary" icon="download">Export</eds-button>',
    })}
    ${sheet({
      title: 'Reserved vs paid',
      body: `
        <table class="set-table">
          <thead>
            <tr><th>Claim</th><th>Insured</th><th>Paid</th><th>Reserved</th><th>Owner</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${settlements
              .map(
                (item) => `
              <tr>
                <td>${item.claim}</td>
                <td>${item.insured}</td>
                <td>${formatCurrency(item.amount)}</td>
                <td>${formatCurrency(item.reserved)}</td>
                <td>${item.owner}</td>
                <td>${item.date}</td>
                <td>${statusChip(item.status)}</td>
              </tr>`,
              )
              .join('')}
          </tbody>
        </table>`,
    })}
  `;
}

export function hydrateSettlements(root) {
  root.querySelector('#st-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Settlement export is a demo in this template', variant: 'info' });
  });
}
