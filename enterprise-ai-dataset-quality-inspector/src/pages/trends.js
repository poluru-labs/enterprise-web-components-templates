import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Quality over time',
      lead: 'Rolling scores across Cedar Data Trust datasets.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-batch overall quality score'),
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
      { key: 'score', label: 'Score' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Lead' },
    ];
    table.rows = [
      { squad: 'Commerce', score: '86%', delta: '+1 pt', owner: 'Arjun Poluru' },
      { squad: 'Finance', score: '97%', delta: '+2 pts', owner: 'Kavya Poluru' },
      { squad: 'Operations', score: '91%', delta: 'Hold', owner: 'Luca Poluru' },
      { squad: 'Governance', score: '93%', delta: '+1 pt', owner: 'Mira Poluru' },
    ];
  }
}
