import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Quality over time',
      lead: 'Rolling scores across Atlas Knowledge collections.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-cycle overall quality score'),
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
      { squad: 'Support', score: '95%', delta: '+2 pts', owner: 'Priya Poluru' },
      { squad: 'Revenue', score: '69%', delta: '−4 pts', owner: 'Kavya Poluru' },
      { squad: 'Product', score: '81%', delta: '+1 pt', owner: 'Dev Poluru' },
      { squad: 'Platform', score: '97%', delta: 'Hold', owner: 'Luca Poluru' },
    ];
  }
}
