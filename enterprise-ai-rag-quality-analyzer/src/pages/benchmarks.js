import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Quality gates',
      lead: 'Retrieval metrics compared to peer enterprise knowledge programs.',
    })}
    ${sheet({
      title: 'Gate comparison',
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
      { term: 'Gold labels', description: 'Human-verified query ↔ passage pairs' },
      { term: 'Promotion rule', description: 'Recall@5 ≥ 85% · zero red issues' },
      { term: 'Governance', description: 'Mira Poluru · Retrieval quality' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Query suite authoring guide', description: 'Sahana Poluru · PDF', icon: 'download' },
      { label: 'Citation rubric', description: 'Priya Poluru · Support', icon: 'check' },
      { label: 'Index compaction SOP', description: 'Nikhil Poluru · Platform', icon: 'settings' },
    ];
  }
}
