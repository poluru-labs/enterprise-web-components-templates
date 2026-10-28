import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Performance benchmarks',
      lead: 'Latency, throughput, and SLO metrics compared to peer platform labs.',
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
      { term: 'Harness contract', description: 'Versioned scenario packs per workload class' },
      { term: 'Capacity rule', description: 'SLO ≥ 90% · zero red regressions on block list' },
      { term: 'Governance', description: 'Mira Poluru · Performance engineering program' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Workload onboarding guide', description: 'Mira Poluru · PDF', icon: 'download' },
      { label: 'SLO tier rubric', description: 'Anika Poluru · Capacity', icon: 'check' },
      { label: 'Autoscale tuning SOP', description: 'Arjun Poluru · Platform', icon: 'settings' },
    ];
  }
}
