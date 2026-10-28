import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'SLO over time',
      lead: 'Rolling scores across Summit Platform Lab workloads.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-cycle weighted SLO pass rate'),
    })}
    ${sheet({
      title: 'By domain',
      body: '<eds-data-table id="trend-table" zebra></eds-data-table>',
    })}
  `;
}

export function hydrateTrends(root) {
  hydrateStats(root, kpis.slice(0, 4), 'trend-kpi');
  const table = root.querySelector('#trend-table');
  if (table) {
    table.columns = [
      { key: 'squad', label: 'Domain', sortable: true },
      { key: 'score', label: 'SLO score' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Lead' },
    ];
    table.rows = [
      { squad: 'Revenue', score: '86%', delta: '+1 pt', owner: 'Arjun Poluru' },
      { squad: 'Platform', score: '96%', delta: '+2 pts', owner: 'Nikhil Poluru' },
      { squad: 'Product', score: '83%', delta: '−1 pt', owner: 'Priya Poluru' },
      { squad: 'Governance', score: '93%', delta: '+1 pt', owner: 'Mira Poluru' },
    ];
  }
}
