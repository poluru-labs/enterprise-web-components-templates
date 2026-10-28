import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Pass rate over time',
      lead: 'Rolling suite health across Nexus UI packages and squads.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Build trajectory',
      body: sparkline(revenueTrend, 'Twelve-build suite pass rate'),
    })}
    ${sheet({
      title: 'Squad movement',
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
      { squad: 'Core', score: '99%', delta: '+0.2 pts', owner: 'Dev Poluru' },
      { squad: 'Overlays', score: '84%', delta: '−1 pt', owner: 'Kavya Poluru' },
      { squad: 'Data', score: '71%', delta: '−3 pts', owner: 'Nikhil Poluru' },
      { squad: 'Forms', score: '89%', delta: '+2 pts', owner: 'Sahana Poluru' },
    ];
  }
}
