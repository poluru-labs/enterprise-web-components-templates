import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Pass rate over time',
      lead: 'Rolling evaluation outcomes across Meridian Analytics.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-window evaluation pass rate'),
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
      { key: 'score', label: 'Pass rate' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Owner' },
    ];
    table.rows = [
      { squad: 'Growth', score: '96%', delta: '+2 pts', owner: 'Kavya Poluru' },
      { squad: 'Security', score: '71%', delta: '−3 pts', owner: 'Anika Poluru' },
      { squad: 'Finance', score: '84%', delta: '+1 pt', owner: 'Arjun Poluru' },
      { squad: 'Supply', score: '91%', delta: 'Hold', owner: 'Nikhil Poluru' },
    ];
  }
}
