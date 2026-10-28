import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Program benchmarks',
      lead: 'Impact, contributions, and compliance compared to peer open source programs.',
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
      { term: 'Catalog contract', description: 'Versioned policy packs per project class' },
      { term: 'Board rule', description: 'Impact ≥ 85% · zero red exceptions on block list' },
      { term: 'Governance', description: 'Mira Poluru · Harbor Commons Program' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Maintainer onboarding guide', description: 'Mira Poluru · PDF', icon: 'download' },
      { label: 'License allowlist rubric', description: 'Anika Poluru · Legal', icon: 'check' },
      { label: 'Contribution logging SOP', description: 'Elena Poluru · Community', icon: 'settings' },
    ];
  }
}
