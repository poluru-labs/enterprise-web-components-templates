import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Adoption',
      title: 'Squad uptake',
      lead: 'How product teams consume Polaris Guild components and tokens over time.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Adoption curve',
      body: sparkline(revenueTrend, 'Percent of squads on EDS 1.1 or newer'),
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
      { key: 'score', label: 'Adoption' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Champion' },
    ];
    table.rows = [
      { squad: 'Billing', score: '92%', delta: '+4 pts', owner: 'Arjun Poluru' },
      { squad: 'Support', score: '81%', delta: '+2 pts', owner: 'Priya Poluru' },
      { squad: 'Admin', score: '74%', delta: '+6 pts', owner: 'Nikhil Poluru' },
      { squad: 'Marketing', score: '68%', delta: '+1 pt', owner: 'Rohan Poluru' },
    ];
  }
}
