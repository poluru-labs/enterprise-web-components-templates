import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  appointmentColumns,
  appointments,
  boardHours,
  boardRooms,
  scheduleWatch,
} from '../data/index.js';
import { cardGrid, emptyState, filterBar, pageHeader, snapshotCard } from '../components/widgets.js';
import { viewState } from './state.js';

function hourIndex(time) {
  return boardHours.findIndex((hour) => time.startsWith(hour.slice(0, 2)));
}

function boardCell(room, hour) {
  const visit = appointments.find((item) => item.room === room && hourIndex(item.time) === boardHours.indexOf(hour));
  if (!visit) return '<div class="halo-slot-empty">Open</div>';
  const tone = visit.status.replace(/\s+/g, '-').toLowerCase();
  return `
    <a class="halo-slot-chip tone-${tone}" href="#/visit/${visit.id}">
      <strong>${visit.time}</strong>
      <span>${visit.patient}</span>
      <small>${visit.type}</small>
    </a>
  `;
}

function filteredAppointments() {
  const query = viewState.appointmentQuery.trim().toLowerCase();
  return appointments.filter((row) => {
    const statusOk = viewState.appointmentStatus === 'all' || row.status.toLowerCase() === viewState.appointmentStatus;
    const queryOk = !query || `${row.patient} ${row.provider} ${row.room}`.toLowerCase().includes(query);
    return statusOk && queryOk;
  });
}

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Today',
      title: 'Schedule',
      lead: 'Room board for 1 September. Book, check in, or open a visit without leaving the floor view.',
      actions: `
        <eds-button id="print-board" variant="tertiary" icon="download">Print board</eds-button>
        <eds-button id="book-visit" variant="primary" icon="plus">Book visit</eds-button>
      `,
    })}
    ${cardGrid(scheduleWatch.map((item) => snapshotCard(item)))}
    <halo-content-card class="mt-3">
      ${filterBar(`
        <eds-search id="apt-search" placeholder="Search patient or provider" clearable></eds-search>
        <eds-segmented-control id="apt-status"></eds-segmented-control>
      `)}
      <div class="halo-day-board mt-3" role="table" aria-label="Room schedule">
        <div class="halo-board-corner">Time</div>
        ${boardRooms.map((room) => `<div class="halo-board-head">${room}</div>`).join('')}
        ${boardHours
          .map(
            (hour) => `
            <div class="halo-board-time">${hour}</div>
            ${boardRooms.map((room) => `<div class="halo-board-cell">${boardCell(room, hour)}</div>`).join('')}
          `,
          )
          .join('')}
      </div>
    </halo-content-card>
    <halo-content-card class="mt-3">
      <div slot="header" class="halo-section-title"><h2>All visits</h2></div>
      <div id="apt-table-wrap">
        <eds-data-table id="apt-table" sortable striped compact></eds-data-table>
        <p id="apt-count" class="halo-muted mt-3 mb-0"></p>
      </div>
      ${emptyState({
        id: 'apt-empty',
        heading: 'No visits match',
        description: 'Clear status or search another name.',
        action: '<eds-button id="reset-apts" slot="actions" variant="primary">Reset filters</eds-button>',
      })}
    </halo-content-card>
  `;
}

export function hydrate(root) {
  const paint = () => {
    const rows = filteredAppointments();
    const table = root.querySelector('#apt-table');
    const empty = root.querySelector('#apt-empty');
    const wrap = root.querySelector('#apt-table-wrap');
    if (table) {
      table.columns = appointmentColumns;
      table.rows = rows;
    }
    const count = root.querySelector('#apt-count');
    if (count) count.textContent = `${rows.length} visits · select a row to open the visit`;
    const none = rows.length === 0;
    if (empty) empty.hidden = !none;
    if (wrap) wrap.hidden = none;
  };
  const seg = root.querySelector('#apt-status');
  if (seg) {
    seg.options = [
      { label: 'All', value: 'all' },
      { label: 'Scheduled', value: 'scheduled' },
      { label: 'Waiting', value: 'waiting' },
      { label: 'In visit', value: 'in visit' },
      { label: 'Completed', value: 'completed' },
    ];
    seg.value = viewState.appointmentStatus;
    seg.addEventListener('eds-change', (event) => {
      viewState.appointmentStatus = (event.detail?.value ?? event.target.value).toLowerCase();
      paint();
    });
  }
  paint();
  root.querySelector('#apt-search')?.addEventListener('eds-input', (event) => {
    viewState.appointmentQuery = event.detail?.value ?? event.target.value ?? '';
    paint();
  });
  root.querySelector('#reset-apts')?.addEventListener('eds-click', () => {
    viewState.appointmentQuery = '';
    viewState.appointmentStatus = 'all';
    paint();
  });
  root.querySelector('#book-visit')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.show());
  root.querySelector('#print-board')?.addEventListener('eds-click', () => {
    showToast({ message: 'Board sent to the front-desk printer', variant: 'success' });
  });
  root.querySelector('#apt-table')?.addEventListener('click', () => {
    window.location.hash = '#/visit/apt_1041';
  });
}
