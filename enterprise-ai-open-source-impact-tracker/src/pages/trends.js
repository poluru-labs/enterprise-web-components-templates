import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Impact over time',
      lead: 'Rolling scores across Harbor Commons Program projects.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Trajectory',
      body: sparkline(revenueTrend, 'Twelve-quarter weighted impact score'),
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
      { key: 'score', label: 'Impact score' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Lead' },
    ];
    table.rows = [
      { squad: 'Platform', score: '91%', delta: '+2 pts', owner: 'Nikhil Poluru' },
      { squad: 'Product', score: '87%', delta: '+1 pt', owner: 'Priya Poluru' },
      { squad: 'Security', score: '95%', delta: 'Hold', owner: 'Arjun Poluru' },
      { squad: 'Governance', score: '90%', delta: '+1 pt', owner: 'Mira Poluru' },
    ];
  }
}
