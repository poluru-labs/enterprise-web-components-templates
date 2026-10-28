import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'SLO benchmarks',
      lead: 'Reliability metrics compared to peer enterprise platform programs.',
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
      { term: 'Error budget', description: '28-day rolling burn per customer tier' },
      { term: 'Escalation rule', description: 'Run success ≥ 99% · MTTR under 45 min' },
      { term: 'Governance', description: 'Mira Poluru · Platform reliability' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Incident command guide', description: 'Elena Poluru · PDF', icon: 'download' },
      { label: 'Trace instrumentation rubric', description: 'Luca Poluru · Platform', icon: 'check' },
      { label: 'DLQ drain SOP', description: 'Dev Poluru · Integrations', icon: 'settings' },
    ];
  }
}
