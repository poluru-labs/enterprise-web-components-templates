import {
  appointmentColumns,
  appointments,
  orderColumns,
  orders,
  patientColumns,
  patients,
  providerColumns,
  providers,
} from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { equalHeightRow, filterBar, pageHeader } from '../components/widgets.js';
import { viewState } from './state.js';

function getQuery() {
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?q=');
  if (qIndex === -1) return viewState.searchQuery;
  return decodeURIComponent(hash.slice(qIndex + 3));
}

export function render() {
  const query = getQuery();
  viewState.searchQuery = query;
  return `
    ${pageHeader({
      eyebrow: 'Global',
      title: 'Search',
      lead: 'Patients, appointments, orders, and providers across San Jose.',
    })}
    <halo-content-card>
      ${filterBar(`<eds-search id="global-search-page" placeholder="Search patients, visits, orders, providers" clearable value="${query}"></eds-search>`)}
    </halo-content-card>
    ${equalHeightRow([
      {
        className: 'col-12 col-xl-6',
        html: `
          <halo-content-card stretch>
            <div slot="header" class="halo-section-title">
              <h2>Patients</h2>
              <span class="halo-muted" id="search-pt-count"></span>
            </div>
            <eds-data-table id="search-pt-table" compact striped></eds-data-table>
          </halo-content-card>
        `,
      },
      {
        className: 'col-12 col-xl-6',
        html: `
          <halo-content-card stretch>
            <div slot="header" class="halo-section-title">
              <h2>Appointments</h2>
              <span class="halo-muted" id="search-apt-count"></span>
            </div>
            <eds-data-table id="search-apt-table" compact striped></eds-data-table>
          </halo-content-card>
        `,
      },
    ])}
    ${equalHeightRow([
      {
        className: 'col-12 col-xl-6',
        html: `
          <halo-content-card stretch>
            <div slot="header" class="halo-section-title">
              <h2>Orders</h2>
              <span class="halo-muted" id="search-order-count"></span>
            </div>
            <eds-data-table id="search-order-table" compact striped></eds-data-table>
          </halo-content-card>
        `,
      },
      {
        className: 'col-12 col-xl-6',
        html: `
          <halo-content-card stretch>
            <div slot="header" class="halo-section-title">
              <h2>Providers</h2>
              <span class="halo-muted" id="search-prv-count"></span>
            </div>
            <eds-data-table id="search-prv-table" compact striped></eds-data-table>
          </halo-content-card>
        `,
      },
    ])}
  `;
}

function paint(root, query) {
  viewState.searchQuery = query;
  const ptHits = searchRecords(patients, query, ['name', 'mrn', 'pcp', 'coverage', 'conditions']);
  const aptHits = searchRecords(appointments, query, ['patient', 'provider', 'room', 'type', 'status']);
  const orderHits = searchRecords(orders, query, ['id', 'patient', 'test', 'status', 'owner']);
  const prvHits = searchRecords(providers, query, ['name', 'role', 'rooms', 'status']);

  const ptTable = root.querySelector('#search-pt-table');
  if (ptTable) {
    ptTable.columns = patientColumns.filter((col) => ['name', 'mrn', 'pcp', 'status'].includes(col.key));
    ptTable.rows = ptHits.map((item) => ({
      name: item.name,
      mrn: item.mrn,
      pcp: item.pcp,
      status: item.status,
      id: item.id,
    }));
  }
  root.querySelector('#search-pt-count').textContent = `${ptHits.length} matches`;

  const aptTable = root.querySelector('#search-apt-table');
  if (aptTable) {
    aptTable.columns = appointmentColumns.filter((col) => ['time', 'patient', 'provider', 'status'].includes(col.key));
    aptTable.rows = aptHits;
  }
  root.querySelector('#search-apt-count').textContent = `${aptHits.length} matches`;

  const orderTable = root.querySelector('#search-order-table');
  if (orderTable) {
    orderTable.columns = orderColumns.filter((col) => ['id', 'patient', 'test', 'status'].includes(col.key));
    orderTable.rows = orderHits;
  }
  root.querySelector('#search-order-count').textContent = `${orderHits.length} matches`;

  const prvTable = root.querySelector('#search-prv-table');
  if (prvTable) {
    prvTable.columns = providerColumns.filter((col) => ['name', 'role', 'today', 'status'].includes(col.key));
    prvTable.rows = prvHits;
  }
  root.querySelector('#search-prv-count').textContent = `${prvHits.length} matches`;
}

export function hydrate(root) {
  const query = getQuery();
  paint(root, query);

  root.querySelector('#global-search-page')?.addEventListener('eds-input', (event) => {
    const value = event.detail?.value ?? event.target.value ?? '';
    const next = value.trim();
    window.location.hash = next ? `#/search?q=${encodeURIComponent(next)}` : '#/search';
  });

  root.querySelector('#search-pt-table')?.addEventListener('click', () => {
    window.location.hash = '#/patient/pt_maya';
  });
  root.querySelector('#search-apt-table')?.addEventListener('click', () => {
    window.location.hash = '#/visit/apt_1041';
  });
}
