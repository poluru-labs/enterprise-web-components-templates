import {
  clinic,
  clinicName,
  currentUser,
  nextAppointments,
  productLine,
  productName,
  roomOccupancy,
} from '../data/index.js';
import { initials, lastName } from '../lib/format.js';

const routeTitles = {
  overview: 'Overview',
  schedule: 'Schedule',
  visit: 'Schedule',
  patients: 'Patients',
  patient: 'Patients',
  providers: 'Providers',
  census: 'Census',
  orders: 'Orders',
  messages: 'Messages',
  insights: 'Insights',
  search: 'Search',
  settings: 'Settings',
};

function crossMarkSvg() {
  return `
    <svg class="halo-cross-mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#D90000"/>
      <rect x="14" y="6" width="4" height="20" rx="1.5" fill="#fff"/>
      <rect x="6" y="14" width="20" height="4" rx="1.5" fill="#fff"/>
    </svg>
  `;
}

function renderApptChips(appointments) {
  return appointments
    .map((apt) => {
      const surname = lastName(apt.patient);
      return `<a class="halo-appt-chip" href="#/visit/${apt.id}"><span>${apt.time}</span> ${surname}</a>`;
    })
    .join('');
}

export class HaloAppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  setRoute(route) {
    const name = route?.name || 'overview';
    this.dataset.route = name;
    const label = this.querySelector('.halo-now-label');
    if (label) label.textContent = routeTitles[name] || 'Overview';
  }

  refreshBoard() {
    const occupancy = this.querySelector('.halo-occupancy-fill');
    const label = this.querySelector('.halo-occupancy-label');
    const chips = this.querySelector('.halo-appt-chips');
    if (occupancy) occupancy.style.width = `${roomOccupancy}%`;
    if (label) label.textContent = `Room occupancy ${roomOccupancy}%`;
    if (chips) chips.innerHTML = renderApptChips(nextAppointments(3));
  }

  render() {
    const upcoming = nextAppointments(3);
    this.innerHTML = `
      <header class="halo-shift-board" role="banner">
        <div class="halo-shift-strip">
          <div class="halo-occupancy-wrap">
            <span class="halo-occupancy-label">Room occupancy ${roomOccupancy}%</span>
            <div class="halo-occupancy-bar" role="meter" aria-valuenow="${roomOccupancy}" aria-valuemin="0" aria-valuemax="100" aria-label="Room occupancy">
              <span class="halo-occupancy-fill" style="width:${roomOccupancy}%"></span>
            </div>
          </div>
          <div class="halo-appt-chips" aria-label="Next appointments">
            ${renderApptChips(upcoming)}
          </div>
          <div class="halo-shift-meta">
            <span>NPI ${clinic.npi}</span>
            <span>${clinic.hours}</span>
            <span>${clinic.phone}</span>
          </div>
        </div>
        <div class="halo-shift-toolbar">
          <div class="halo-shift-brand">
            <button class="halo-nav-toggle" id="halo-nav-toggle" type="button" aria-label="Open menu">
              <i class="bi bi-list" aria-hidden="true"></i>
            </button>
            <a class="halo-wordmark" href="#/overview">
              ${crossMarkSvg()}
              <span>
                <strong>${productName}</strong>
                <small>${productLine} · ${clinicName}</small>
              </span>
            </a>
          </div>
          <div class="halo-shift-end">
            <p class="halo-now"><span>Now on</span> <strong class="halo-now-label">Overview</strong></p>
            <label class="halo-header-search">
              <span class="visually-hidden">Search the clinic</span>
              <i class="bi bi-search" aria-hidden="true"></i>
              <input id="halo-global-search" type="search" placeholder="Find patient, visit, order" autocomplete="off" />
              <button type="button" class="halo-kbd-btn" id="halo-command-btn" aria-label="Command palette">
                <kbd>⌘K</kbd>
              </button>
            </label>
            <button class="halo-header-action" id="halo-book-btn" type="button">
              <i class="bi bi-plus-lg" aria-hidden="true"></i>
              <span>New appointment</span>
            </button>
            <button class="halo-inbox-btn" id="halo-inbox-quick" type="button" aria-label="Clinical inbox">
              <i class="bi bi-bell" aria-hidden="true"></i>
              <span class="halo-inbox-count">3</span>
            </button>
            <div class="halo-profile-wrap">
              <button class="halo-profile-btn" id="halo-profile-btn" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="halo-profile-menu">
                <span class="halo-avatar" aria-hidden="true">${initials(currentUser.name)}</span>
                <span class="halo-profile-copy">
                  <strong>${currentUser.name}</strong>
                  <small>${currentUser.role}</small>
                </span>
                <i class="bi bi-caret-down-fill" aria-hidden="true"></i>
              </button>
              <div class="halo-profile-menu" id="halo-profile-menu" role="menu" hidden>
                <p class="halo-profile-menu-head">
                  <strong>${currentUser.name}</strong>
                  <span>${currentUser.email}</span>
                </p>
                <button type="button" role="menuitem" id="halo-inbox-btn">Clinical inbox</button>
                <a href="#/settings" role="menuitem">Clinic settings</a>
                <button type="button" role="menuitem" id="halo-signout-btn">Sign out</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  bindEvents() {
    this.querySelector('#halo-nav-toggle')?.addEventListener('click', () => {
      document.body.classList.toggle('halo-nav-open');
    });

    const search = this.querySelector('#halo-global-search');
    search?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const value = search.value.trim();
        window.location.hash = value ? `#/search?q=${encodeURIComponent(value)}` : '#/search';
      }
    });
    search?.addEventListener('focus', () => this.setProfileOpen(false));

    this.querySelector('#halo-command-btn')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('halo-command', { bubbles: true }));
    });

    this.querySelector('#halo-book-btn')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('halo-book', { bubbles: true }));
    });

    const openInbox = () => {
      this.setProfileOpen(false);
      this.dispatchEvent(new CustomEvent('halo-inbox', { bubbles: true }));
    };
    this.querySelector('#halo-inbox-quick')?.addEventListener('click', openInbox);
    this.querySelector('#halo-inbox-btn')?.addEventListener('click', openInbox);

    const profileBtn = this.querySelector('#halo-profile-btn');
    profileBtn?.addEventListener('click', (event) => {
      event.stopPropagation();
      this.setProfileOpen(this.querySelector('#halo-profile-menu')?.hidden);
    });

    this.querySelector('#halo-signout-btn')?.addEventListener('click', () => {
      this.setProfileOpen(false);
      this.dispatchEvent(new CustomEvent('halo-signout', { bubbles: true }));
    });

    this.querySelector('#halo-profile-menu a')?.addEventListener('click', () => this.setProfileOpen(false));

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.halo-profile-wrap')) this.setProfileOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('halo-command', { bubbles: true }));
      }
      if (event.key === 'Escape') this.setProfileOpen(false);
    });
  }

  setProfileOpen(open) {
    const menu = this.querySelector('#halo-profile-menu');
    const btn = this.querySelector('#halo-profile-btn');
    if (!menu || !btn) return;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }
}

if (!customElements.get('halo-app-header')) {
  customElements.define('halo-app-header', HaloAppHeader);
}
