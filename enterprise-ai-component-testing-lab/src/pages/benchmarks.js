import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Coverage',
      title: 'Quality signals',
      lead: 'Compare Nexus UI test coverage and stability against peer design system programs.',
    })}
    ${sheet({
      title: 'Signal comparison',
      body: '<eds-data-table id="benchmark-table" zebra sticky-header></eds-data-table>',
    })}
    ${sheet({
      title: 'Reference',
      body: `
        <eds-description-list id="coverage-ref"></eds-description-list>
        <eds-divider label="Resources"></eds-divider>
        <eds-list id="coverage-links" divided></eds-list>
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
  const ref = root.querySelector('#coverage-ref');
  if (ref) {
    ref.items = [
      { term: 'Primary runner', description: 'Vitest + Playwright + Chromatic' },
      { term: 'Release gate', description: '96% pass rate · 0 P1 failures' },
      { term: 'Sign-off', description: 'Mira Poluru · Design systems QA' },
    ];
  }
  const links = root.querySelector('#coverage-links');
  if (links) {
    links.items = [
      { label: 'Interaction spec template', description: 'Dev Poluru · Core package', icon: 'download' },
      { label: 'Visual baseline guide', description: 'Priya Poluru · Chromatic', icon: 'eye' },
      { label: 'Flake quarantine policy', description: 'Sahana Poluru · CI', icon: 'settings' },
    ];
  }
}
