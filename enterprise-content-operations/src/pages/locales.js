import { locales } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderLocales() {
  return `
    ${pageHeader({
      eyebrow: 'Packs',
      title: 'Locales',
      lead: `Nikhil Poluru’s book. English locks first. Spanish, French, and German follow the home slot.`,
    })}
    ${filterBar(`
      <eds-search id="loc-search" placeholder="Filter locales" clearable></eds-search>
      <eds-select id="loc-status" label="Status"></eds-select>
    `)}
    <div id="loc-table"></div>
    <eds-empty-state id="loc-empty" hidden heading="No matches" description="Try a language, piece, or owner." icon="search"></eds-empty-state>
  `;
}

export function hydrateLocales(root) {
  const table = root.querySelector('#loc-table');
  const empty = root.querySelector('#loc-empty');
  const search = root.querySelector('#loc-search');
  const status = root.querySelector('#loc-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Ready', value: 'ready' },
      { label: 'Translation', value: 'translation' },
      { label: 'Draft', value: 'draft' },
      { label: 'Hold', value: 'hold' },
      { label: 'Published', value: 'published' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(locales, search?.value ?? '', ['code', 'name', 'piece', 'owner']);
    const statusValue = status?.value;
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
    if (!table) return;
    if (!hits.length) {
      table.innerHTML = '';
      return;
    }
    const dataTable = document.createElement('eds-data-table');
    dataTable.striped = true;
    dataTable.sortable = true;
    dataTable.columns = [
      { key: 'code', label: 'Code', sortable: true },
      { key: 'name', label: 'Language', sortable: true },
      { key: 'piece', label: 'Piece', sortable: true },
      { key: 'owner', label: 'Owner', sortable: true },
      { key: 'coverage', label: 'Coverage', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
    ];
    dataTable.rows = hits.map((item) => ({
      code: item.code,
      name: item.name,
      piece: item.piece,
      owner: item.owner,
      coverage: `${item.coverage}%`,
      status: item.status.replace(/_/g, ' '),
    }));
    table.innerHTML = '';
    table.append(dataTable);

    const meters = document.createElement('div');
    meters.className = 'stack mt-3';
    meters.innerHTML = hits
      .slice(0, 4)
      .map(
        (item) => `
      <div>
        <div class="section-title mb-1">
          <strong>${item.code} · ${item.piece}</strong>
          ${statusChip(item.status)}
        </div>
        <eds-progress-bar value="${item.coverage}" max="100" label="${item.owner}" show-value></eds-progress-bar>
      </div>`,
      )
      .join('');
    table.append(meters);
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
