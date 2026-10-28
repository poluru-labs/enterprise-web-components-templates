import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Search quality over time',
      lead: 'Rolling precision across Horizon Global locale packs.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-wave precision@5'),
    })}
    ${sheet({
      title: 'By region',
      body: '<eds-data-table id="trend-table" zebra></eds-data-table>',
    })}
  `;
}

export function hydrateTrends(root) {
  hydrateStats(root, kpis.slice(0, 4), 'trend-kpi');
  const table = root.querySelector('#trend-table');
  if (table) {
    table.columns = [
      { key: 'squad', label: 'Region', sortable: true },
      { key: 'score', label: 'Precision' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Lead' },
    ];
    table.rows = [
      { squad: 'Americas', score: '91%', delta: '+2 pts', owner: 'Kavya Poluru' },
      { squad: 'EMEA', score: '93%', delta: '+1 pt', owner: 'Anika Poluru' },
      { squad: 'APAC', score: '88%', delta: '−1 pt', owner: 'Dev Poluru' },
      { squad: 'Governance', score: '94%', delta: 'Hold', owner: 'Mira Poluru' },
    ];
  }
}
