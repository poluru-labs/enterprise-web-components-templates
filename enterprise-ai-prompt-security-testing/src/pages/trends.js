import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Pass rate over time',
      lead: 'Rolling probe outcomes across Harbor Secure QA surfaces.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-sprint weighted pass rate'),
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
      { key: 'score', label: 'Pass score' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Lead' },
    ];
    table.rows = [
      { squad: 'Commerce', score: '84%', delta: '+1 pt', owner: 'Arjun Poluru' },
      { squad: 'Platform', score: '96%', delta: '+2 pts', owner: 'Nikhil Poluru' },
      { squad: 'Partners', score: '71%', delta: '−2 pts', owner: 'Dev Poluru' },
      { squad: 'Governance', score: '93%', delta: '+1 pt', owner: 'Mira Poluru' },
    ];
  }
}
