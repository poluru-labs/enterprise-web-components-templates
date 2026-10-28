import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Document criteria',
      lead: 'PDF/UA and WCAG document checks compared to peer publishing programs.',
    })}
    ${sheet({
      title: 'Criterion comparison',
      body: '<eds-data-table id="benchmark-table" zebra sticky-header></eds-data-table>',
    })}
    ${sheet({
      title: 'Reference',
      body: `
        <eds-description-list id="std-ref"></eds-description-list>
        <eds-divider label="Resources"></eds-divider>
        <eds-list id="std-links" divided></eds-list>
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
  const ref = root.querySelector('#std-ref');
  if (ref) {
    ref.items = [
      { term: 'Primary standard', description: 'PDF/UA-1 (ISO 14289)' },
      { term: 'Web alignment', description: 'WCAG 2.2 AA for HTML exports' },
      { term: 'Sign-off', description: 'Mira Poluru · Document accessibility' },
    ];
  }
  const links = root.querySelector('#std-links');
  if (links) {
    links.items = [
      { label: 'PDF/UA reference', description: 'Dev Poluru · Validation tooling', icon: 'external-link' },
      { label: 'Author checklist', description: 'Priya Poluru · PDF', icon: 'download' },
      { label: 'Table tagging guide', description: 'Sahana Poluru · Remediation', icon: 'check' },
    ];
  }
}
