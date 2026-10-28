import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Reliability over time',
      lead: 'Rolling run success across Summit Platform services.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-week run success rate'),
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
      { key: 'score', label: 'Success' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Owner' },
    ];
    table.rows = [
      { squad: 'Commerce', score: '98.1%', delta: '+0.2 pts', owner: 'Priya Poluru' },
      { squad: 'Platform', score: '99.4%', delta: '+0.1 pt', owner: 'Luca Poluru' },
      { squad: 'Finance', score: '97.8%', delta: 'Hold', owner: 'Arjun Poluru' },
      { squad: 'Partners', score: '96.2%', delta: '−0.4 pts', owner: 'Dev Poluru' },
    ];
  }
}
