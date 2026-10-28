import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Tokens',
      title: 'Foundation coverage',
      lead: 'Token groups mapped across Figma, CSS, and TypeScript helpers.',
    })}
    ${sheet({
      title: 'Token groups',
      body: '<eds-data-table id="benchmark-table" zebra sticky-header></eds-data-table>',
    })}
    ${sheet({
      title: 'Reference',
      body: `
        <eds-description-list id="token-ref"></eds-description-list>
        <eds-divider label="Imports"></eds-divider>
        <eds-code-snippet id="token-snippet" language="css"></eds-code-snippet>
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
  const ref = root.querySelector('#token-ref');
  if (ref) {
    ref.items = [
      { term: 'CSS entry', description: '@poluru-labs/enterprise-design-system-wc/tokens.css' },
      { term: 'Primary brand', description: '#BA6A4C (Polaris extension)' },
      { term: 'Maintainer', description: 'Dev Poluru · Core squad' },
    ];
  }
  const snippet = root.querySelector('#token-snippet');
  if (snippet) {
    snippet.code = `@import '@poluru-labs/enterprise-design-system-wc/tokens.css';

:root {
  --brand-marketing: #ba6a4c;
}`;
  }
}
