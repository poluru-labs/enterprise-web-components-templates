import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Review benchmarks',
      lead: 'Operations metrics compared to peer enterprise review programs.',
    })}
    ${sheet({
      title: 'Peer comparison',
      body: '<eds-data-table id="benchmark-table" zebra sticky-header></eds-data-table>',
    })}
    ${sheet({
      title: 'Policy',
      body: `
        <eds-description-list id="bench-ref"></eds-description-list>
        <eds-divider label="Playbooks"></eds-divider>
        <eds-list id="bench-links" divided></eds-list>
      `,
    })}
  `;
}

export function hydrateBenchmarks(root) {
  const table = root.querySelector('#benchmark-table');
  if (table) {
    table.columns = benchmarkColumns;
    table.rows = benchmarks;
  }
  const ref = root.querySelector('#bench-ref');
  if (ref) {
    ref.items = [
      { term: 'Gold set', description: 'Calibrated items for agreement measurement' },
      { term: 'Sign-off rule', description: 'Agreement ≥ 92% · zero red escalations' },
      { term: 'Governance', description: 'Mira Poluru · Review operations' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Reviewer onboarding guide', description: 'Mira Poluru · PDF', icon: 'download' },
      { label: 'Double-blind procedure', description: 'Priya Poluru · Claims', icon: 'check' },
      { label: 'Escalation triage SOP', description: 'Luca Poluru · Platform', icon: 'settings' },
    ];
  }
}
