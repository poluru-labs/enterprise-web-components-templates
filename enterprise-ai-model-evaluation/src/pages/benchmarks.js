import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Benchmarks',
      title: 'Metric gates',
      lead: 'Portfolio evaluation metrics compared to peer analytics programs.',
    })}
    ${sheet({
      title: 'Gate comparison',
      body: '<eds-data-table id="benchmark-table" zebra sticky-header></eds-data-table>',
    })}
    ${sheet({
      title: 'Policy',
      body: `
        <eds-description-list id="bench-ref"></eds-description-list>
        <eds-divider label="Thresholds"></eds-divider>
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
      { term: 'Holdout policy', description: 'Frozen monthly · no peeking' },
      { term: 'Promotion rule', description: 'Zero red findings + shadow agreement ≥ 97%' },
      { term: 'Governance', description: 'Mira Poluru · Model quality' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Gate definition sheet', description: 'Elena Poluru · Fairness', icon: 'download' },
      { label: 'Holdout manifest', description: 'Hana Poluru · JSON', icon: 'folder' },
      { label: 'Latency SLO', description: 'Luca Poluru · Platform', icon: 'settings' },
    ];
  }
}
