import { reports } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderReports() {
  return `
    ${pageHeader({
      eyebrow: 'Releases',
      title: 'Notes and exports',
      lead: 'Changelogs, token diffs, and migration guides for each EDS release.',
      actions: '<eds-button variant="primary" icon="download">Bundle release</eds-button>',
    })}
    ${sheet({
      title: 'Library',
      body: `
        <eds-list id="report-list" divided></eds-list>
        <eds-pagination id="report-pages" total-items="${reports.length}" page-size="4" class="mt-4"></eds-pagination>
      `,
    })}
  `;
}

export function hydrateReports(root) {
  const list = root.querySelector('#report-list');
  if (list) {
    list.items = reports.map((item) => ({
      label: item.name,
      description: `${item.format} · ${item.owner} · ${item.updated}`,
      icon: 'download',
    }));
  }
}
