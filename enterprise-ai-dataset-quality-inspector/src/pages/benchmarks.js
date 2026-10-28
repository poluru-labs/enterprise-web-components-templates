import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Quality benchmarks',
      lead: 'Dataset metrics compared to peer enterprise data trust programs.',
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
      { term: 'Schema contract', description: 'Versioned column definitions per dataset' },
      { term: 'Certification rule', description: 'Quality ≥ 90% · zero red findings' },
      { term: 'Governance', description: 'Mira Poluru · Data quality program' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Steward onboarding guide', description: 'Mira Poluru · PDF', icon: 'download' },
      { label: 'PII scan rubric', description: 'Anika Poluru · Compliance', icon: 'check' },
      { label: 'Schema change SOP', description: 'Dev Poluru · Product', icon: 'settings' },
    ];
  }
}
