import { kpis, revenueTrend } from '../data/index.js';
import { hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';

export function renderTrends() {
  return `
    ${pageHeader({
      eyebrow: 'Trends',
      title: 'Compliance over time',
      lead: 'Rolling WCAG score with squad-level movement across Harbor Digital.',
    })}
    ${statGrid(kpis.slice(0, 4), 'trend-kpi')}
    ${sheet({
      title: 'Score trajectory',
      body: sparkline(revenueTrend, 'Twelve-week WCAG compliance score'),
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
      { key: 'score', label: 'Score' },
      { key: 'delta', label: 'Change' },
      { key: 'owner', label: 'Owner' },
    ];
    table.rows = [
      { squad: 'Marketing', score: '96%', delta: '+1 pt', owner: 'Kavya Poluru' },
      { squad: 'Portal', score: '82%', delta: '+3 pts', owner: 'Nikhil Poluru' },
      { squad: 'Commerce', score: '68%', delta: '−2 pts', owner: 'Rohan Poluru' },
      { squad: 'Platform', score: '98%', delta: 'Hold', owner: 'Dev Poluru' },
    ];
  }
}
