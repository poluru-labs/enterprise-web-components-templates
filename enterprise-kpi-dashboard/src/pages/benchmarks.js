import { benchmarkColumns, benchmarks } from '../data/index.js';
import { pageHeader } from '../components/widgets.js';

export function renderBenchmarks() {
  return `
    ${pageHeader({
      eyebrow: 'Peers',
      title: 'Benchmarks',
      lead: 'Clearline versus the peer median. Fulfillment is the only lagging line.',
    })}
    <eds-card padded>
      <eds-data-table id="bench-table" sortable striped></eds-data-table>
    </eds-card>
  `;
}

export function hydrateBenchmarks(root) {
  const table = root.querySelector('#bench-table');
  if (table) {
    table.columns = benchmarkColumns;
    table.rows = benchmarks;
  }
}
