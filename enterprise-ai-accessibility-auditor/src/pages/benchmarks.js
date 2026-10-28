import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'WCAG benchmarks',
      lead: 'Compare Harbor Digital against peer medians across core success criteria.',
    })}
    ${sheet({
      title: 'Criterion comparison',
      body: '<eds-data-table id="benchmark-table" zebra sticky-header></eds-data-table>',
    })}
    ${sheet({
      title: 'Reference',
      body: `
        <eds-description-list id="wcag-ref"></eds-description-list>
        <eds-divider label="Resources"></eds-divider>
        <eds-list id="wcag-links" divided></eds-list>
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
  const ref = root.querySelector('#wcag-ref');
  if (ref) {
    ref.items = [
      { term: 'Target', description: 'WCAG 2.2 Level AA' },
      { term: 'Testing mix', description: 'Automated scans + manual quarterly reviews' },
      { term: 'Sign-off', description: 'Mira Poluru · Accessibility lead' },
    ];
  }
  const links = root.querySelector('#wcag-links');
  if (links) {
    links.items = [
      { label: 'Understanding WCAG 2.2', description: 'W3C quick reference', icon: 'external-link' },
      { label: 'Harbor VPAT template', description: 'Arjun Poluru · Program management', icon: 'download' },
      { label: 'Component checklist', description: 'Dev Poluru · Design system', icon: 'check' },
    ];
  }
}
