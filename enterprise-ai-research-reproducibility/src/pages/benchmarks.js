import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Reproducibility benchmarks',
      lead: 'Cohort metrics compared to peer research programs.',
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
      { term: 'Artifact bundle', description: 'Data, code, and environment hashes' },
      { term: 'Sign-off rule', description: 'Replication ≥ 85% · zero red gaps' },
      { term: 'Governance', description: 'Mira Poluru · Reproducibility program' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Protocol authoring guide', description: 'Sahana Poluru · PDF', icon: 'download' },
      { label: 'Blinding checklist', description: 'Anika Poluru · Clinical', icon: 'check' },
      { label: 'Environment lockfile SOP', description: 'Arjun Poluru · Curation', icon: 'settings' },
    ];
  }
}
