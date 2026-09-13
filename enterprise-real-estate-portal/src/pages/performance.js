import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { performance } from '../data/index.js';
import { formatCurrency, formatPercent } from '../lib/format.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderPerformance() {
  const noi = performance.reduce((sum, item) => sum + item.noi, 0);
  return `
    ${pageHeader({
      eyebrow: 'Returns',
      title: 'Portfolio performance',
      lead: `Maya Poluru’s book. ${formatCurrency(noi)} TTM NOI across eight assets.`,
      actions: '<eds-button id="pf-export" variant="secondary" icon="download">Export</eds-button>',
    })}
    ${sheet({
      title: 'NOI, cap, collections',
      body: `
        <table class="perf-table">
          <thead>
            <tr><th>Asset</th><th>Code</th><th>NOI</th><th>Cap</th><th>Collections</th><th>Occupancy</th><th>Owner</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${performance
              .map(
                (item) => `
              <tr>
                <td>${item.property}</td>
                <td>${item.code}</td>
                <td>${formatCurrency(item.noi)}</td>
                <td>${item.cap}%</td>
                <td>${formatPercent(item.collections, 0)}</td>
                <td>${formatPercent(item.occupancy, 0)}</td>
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

export function hydratePerformance(root) {
  root.querySelector('#pf-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Performance export is a demo in this template', variant: 'info' });
  });
}
