import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Replication over time',
      lead: 'Rolling success rates across Harbor Research cohorts.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-cohort replication success rate'),
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
      { key: 'owner', label: 'Lead' },
    ];
    table.rows = [
      { squad: 'Clinical', score: '88%', delta: '+2 pts', owner: 'Priya Poluru' },
      { squad: 'Environmental', score: '81%', delta: '−1 pt', owner: 'Luca Poluru' },
      { squad: 'Genomics', score: '93%', delta: '+1 pt', owner: 'Kavya Poluru' },
      { squad: 'Governance', score: '92%', delta: 'Hold', owner: 'Mira Poluru' },
    ];
  }
}
