import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Standards',
      title: 'Security benchmarks',
      lead: 'Probe and gate metrics compared to peer enterprise secure QA programs.',
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
      { term: 'Corpus contract', description: 'Versioned probe packs per surface class' },
      { term: 'Release gate', description: 'Pass ≥ 88% · zero red findings on block list' },
      { term: 'Governance', description: 'Mira Poluru · Application security program' },
    ];
  }
  const links = root.querySelector('#bench-links');
  if (links) {
    links.items = [
      { label: 'Surface onboarding guide', description: 'Mira Poluru · PDF', icon: 'download' },
      { label: 'Allowlist review rubric', description: 'Anika Poluru · Compliance', icon: 'check' },
      { label: 'Webhook hardening SOP', description: 'Dev Poluru · Integrations', icon: 'settings' },
    ];
  }
}
