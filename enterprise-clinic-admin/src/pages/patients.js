import { patientColumns, patients } from '../data/index.js';
import { cardGrid, emptyState, filterBar, pageHeader, snapshotCard } from '../components/widgets.js';
import { viewState } from './state.js';

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Directory',
      title: 'Patients',
      lead: 'Active panel for San Jose. Search a name or MRN, then open the chart.',
      actions: `<eds-button id="add-patient" variant="primary" icon="plus">Register patient</eds-button>`,
    })}
    ${cardGrid(
      patients.slice(0, 8).map((item) =>
        snapshotCard({
          title: item.name,
          hint: `${item.mrn} · ${item.pcp} · last visit ${item.lastVisit}`,
          href: `#/patient/${item.id}`,
          tone: item.status,
        }),
      ),
    )}
    <halo-content-card class="mt-3">
      ${filterBar(`<eds-search id="pt-search" placeholder="Search name, MRN, or PCP" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="pt-table" sortable striped compact></eds-data-table>
      </div>
      ${emptyState({
        id: 'pt-empty',
        heading: 'No patients match',
        description: 'Try another name or MRN.',
      })}
      <p id="pt-count" class="halo-muted mt-3 mb-0"></p>
    </halo-content-card>
  `;
}

export function hydrate(root) {
  const table = root.querySelector('#pt-table');
  const empty = root.querySelector('#pt-empty');
  const paint = (query = viewState.patientQuery) => {
    viewState.patientQuery = query;
    const rows = patients
      .map((item) => ({
        name: item.name,
        mrn: item.mrn,
        age: item.age,
        pcp: item.pcp,
        coverage: item.coverage,
        lastVisit: item.lastVisit,
        status: item.status,
        id: item.id,
      }))
      .filter((row) => `${row.name} ${row.mrn} ${row.pcp}`.toLowerCase().includes(query.toLowerCase()));
    if (table) {
      table.columns = patientColumns;
      table.rows = rows;
    }
    const count = root.querySelector('#pt-count');
    if (count) count.textContent = `${rows.length} patients in view`;
    if (empty) empty.hidden = rows.length > 0;
  };
  paint();
  root.querySelector('#pt-search')?.addEventListener('eds-input', (event) => {
    paint(event.detail?.value ?? '');
  });
  root.querySelector('#add-patient')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.show());
  table?.addEventListener('click', () => {
    window.location.hash = '#/patient/pt_maya';
  });
}
