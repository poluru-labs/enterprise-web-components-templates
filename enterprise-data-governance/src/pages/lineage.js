import { lineageColumns, lineageEdges } from '../data/index.js';
import { lineageGraph, pageHeader, sheet } from '../components/widgets.js';

export function renderLineage() {
  return `
    ${pageHeader({
      eyebrow: 'Lineage',
      title: 'How gold is made',
      lead: 'Upstream sources, certified gold, and the joins that feed risk and finance.',
      actions: `<eds-button variant="secondary" icon="download" id="export-lineage">Export map</eds-button>`,
    })}
    <eds-alert variant="warning" title="Transfers still failing" message="payments.core.transfers is on the path to exposure and AML. Sahana Poluru owns the failing settlement-lag rule."></eds-alert>
    ${sheet({
      title: 'Current map',
      action: '<eds-badge label="Production" variant="brand" pill></eds-badge>',
      body: lineageGraph(),
    })}
    ${sheet({
      title: 'Edges',
      body: '<eds-data-table id="lineage-table" sortable></eds-data-table>',
    })}
    ${sheet({
      title: 'Attestation',
      body: `<eds-timeline id="lineage-timeline"></eds-timeline>
        <eds-popover>
          <eds-button slot="trigger" variant="tertiary" icon="info">How we attest</eds-button>
          <p>Nikhil Poluru confirms each certified asset has a documented upstream before the 24 Sep review.</p>
        </eds-popover>`,
    })}
  `;
}

export function hydrateLineage(root) {
  const table = root.querySelector('#lineage-table');
  if (table) {
    table.columns = lineageColumns;
    table.rows = lineageEdges;
  }
  const timeline = root.querySelector('#lineage-timeline');
  if (timeline) {
    timeline.items = [
      { title: 'Sources mapped', description: 'Kavya Poluru · catalog freeze', timestamp: '12 Sep', status: 'complete' },
      { title: 'Gold joins reviewed', description: 'Nikhil Poluru', timestamp: '15 Sep', status: 'complete' },
      { title: 'Transfers path', description: 'Sahana Poluru · failing rule', timestamp: '16 Sep', status: 'current' },
      { title: 'Attestation pack', description: 'Due 24 Sep', timestamp: '24 Sep', status: 'upcoming' },
    ];
  }
  root.querySelector('#export-lineage')?.addEventListener('eds-click', () => {
    window.location.hash = '#/catalog';
  });
}
