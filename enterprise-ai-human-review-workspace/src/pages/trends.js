import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Agreement over time',
      lead: 'Rolling inter-rater agreement across Summit Review Board queues.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-cycle agreement rate'),
    })}
    ${sheet({
      title: 'By program',
      body: '<eds-data-table id="trend-table" zebra></eds-data-table>',
    })}
  `;
}

export function hydrateTrends(root) {
  hydrateStats(root, kpis.slice(0, 4), 'trend-kpi');
  const table = root.querySelector('#trend-table');
  if (table) {
    table.columns = [
      { key: 'squad', label: 'Program', sortable: true },
      { key: 'score', label: 'Agreement' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Lead' },
    ];
    table.rows = [
      { squad: 'Customer', score: '91%', delta: '+1 pt', owner: 'Priya Poluru' },
      { squad: 'Enterprise', score: '93%', delta: '+2 pts', owner: 'Nikhil Poluru' },
      { squad: 'Community', score: '86%', delta: '−1 pt', owner: 'Sahana Poluru' },
      { squad: 'Governance', score: '94%', delta: 'Hold', owner: 'Mira Poluru' },
    ];
  }
}
