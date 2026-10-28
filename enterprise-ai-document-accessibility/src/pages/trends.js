import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Portfolio score over time',
      lead: 'Rolling document accessibility scores across Summit Publishing.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Score trajectory',
      body: sparkline(revenueTrend, 'Twelve-week portfolio accessibility score'),
    })}
    ${sheet({
      title: 'By squad',
      body: '<eds-data-table id="trend-table" zebra></eds-data-table>',
    })}
  `;
}

export function hydrateTrends(root) {
  hydrateStats(root, kpis.slice(0, 4), 'trend-kpi');
  const table = root.querySelector('#trend-table');
  if (table) {
    table.columns = [
      { key: 'squad', label: 'Squad', sortable: true },
      { key: 'score', label: 'Score' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Owner' },
    ];
    table.rows = [
      { squad: 'HR docs', score: '92%', delta: '+3 pts', owner: 'Priya Poluru' },
      { squad: 'Governance', score: '80%', delta: '+1 pt', owner: 'Arjun Poluru' },
      { squad: 'Investor', score: '82%', delta: '+2 pts', owner: 'Kavya Poluru' },
      { squad: 'Legal', score: '79%', delta: 'Hold', owner: 'Hana Poluru' },
    ];
  }
}
