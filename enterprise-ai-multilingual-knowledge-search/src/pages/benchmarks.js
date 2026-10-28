import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Search quality benchmarks',
      lead: 'Multilingual metrics compared to peer global knowledge programs.',
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
      { term: 'Master locale', description: 'en-US support corpus as parity source' },
      { term: 'Launch rule', description: 'Precision@5 ≥ 90% · zero red gaps' },
      { term: 'Governance', description: 'Mira Poluru · Global search program' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Glossary council guide', description: 'Nikhil Poluru · PDF', icon: 'download' },
      { label: 'RTL result card checklist', description: 'Sahana Poluru · Platform', icon: 'check' },
      { label: 'Query labeling SOP', description: 'Rohan Poluru · Search', icon: 'settings' },
    ];
  }
}
