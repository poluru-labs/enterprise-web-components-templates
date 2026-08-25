import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity } from '@poluru-labs/enterprise-design-system-wc';
import './style.css';
import { clinic, clinicName, commandItems, currentUser, navItems, patients, productLine, productName } from './data.js';
import { hydrateView, renderView } from './views.js';

const app = document.querySelector('#app');

const titles = {
  overview: 'Overview',
  schedule: 'Schedule',
  visit: 'Visit',
  patients: 'Patients',
  patient: 'Chart',
  providers: 'Providers',
  census: 'Census',
  orders: 'Orders',
  messages: 'Messages',
  insights: 'Insights',
  settings: 'Settings',
};

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

function crumbText(route) {
  if (route.name === 'visit') return `Schedule / Visit / ${route.id}`;
  if (route.name === 'patient') return `Patients / Chart / ${route.id}`;
  return `${clinicName} / ${titles[route.name] || 'Overview'}`;
}

function activeHref(route) {
  if (route.name === 'visit') return '#/schedule';
  if (route.name === 'patient') return '#/patients';
  return `#/${route.name || 'overview'}`;
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function renderShell() {
  app.innerHTML = `
    <header class="masthead">
      <div class="mast-top">
        <div class="mast-brand">
          <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu">Menu</button>
          <a class="wordmark" href="#/overview">
            <span class="brand-mark" aria-hidden="true">+</span>
            <span>
              <strong>${productName}</strong>
              <small>${productLine} · ${clinicName}</small>
            </span>
          </a>
        </div>
        <div class="account-dock" id="account-dock">
          <label class="dock-search">
            <span class="visually-hidden">Search the clinic</span>
            <i class="bi bi-search" aria-hidden="true"></i>
            <input id="global-search" type="search" placeholder="Find a patient, visit, or provider" autocomplete="off" />
          </label>
          <button class="dock-action" id="book-btn" type="button">
            <i class="bi bi-plus-lg" aria-hidden="true"></i>
            <span>Book</span>
          </button>
          <a class="dock-action" href="#/settings" id="settings-btn">
            <i class="bi bi-sliders" aria-hidden="true"></i>
            <span>Settings</span>
          </a>
          <div class="dock-profile-wrap">
            <button class="dock-profile" id="profile-btn" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="profile-menu">
              <span class="avatar" aria-hidden="true">${initials(currentUser.name)}</span>
              <span class="profile-copy">
                <strong>${currentUser.name}</strong>
                <small>${currentUser.role}</small>
              </span>
              <i class="bi bi-caret-down-fill" aria-hidden="true"></i>
            </button>
            <div class="profile-menu" id="profile-menu" role="menu" hidden>
              <p class="profile-menu-head">
                <strong>${currentUser.name}</strong>
                <span>${currentUser.email}</span>
              </p>
              <button type="button" role="menuitem" id="inbox-btn">Clinical inbox</button>
              <a href="#/settings" role="menuitem">Clinic settings</a>
              <button type="button" role="menuitem" id="signout-btn">Sign out</button>
            </div>
          </div>
        </div>
      </div>
      <nav class="mast-nav" id="mast-nav" aria-label="Primary"></nav>
    </header>
    <div class="entity-bar">
      <div class="entity-bar-inner">
        <span>NPI ${clinic.npi} · ${clinic.hours}</span>
        <span>${clinic.phone} · ${clinic.timezone}</span>
      </div>
    </div>
    <div class="app-canvas">
      <p class="crumb-line" id="crumbs"></p>
      <main id="view" tabindex="-1"></main>
    </div>
    <eds-drawer id="message-drawer" heading="Message" side="right" size="md">
      <p class="kicker mb-1">Refill</p>
      <h2>Maya Poluru</h2>
      <p class="muted">Albuterol is empty. Can we refill before Thursday?</p>
      <p>Chart is open in Exam 1. Coverage is Blue Cross PPO. Last fill 11 Jun 2026.</p>
      <div slot="footer" class="inline-actions">
        <eds-button id="reply-message" variant="primary">Send refill</eds-button>
        <eds-button id="close-message" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-drawer id="inbox-drawer" heading="Clinical inbox" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="book-modal" heading="Book a visit" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-select id="book-patient" label="Patient"></eds-select>
        <eds-select id="book-provider" label="Provider"></eds-select>
        <eds-select id="book-type" label="Visit type"></eds-select>
        <eds-input label="Preferred time" value="16:20"></eds-input>
        <eds-textarea label="Reason" rows="3" placeholder="Follow-up, new concern, or procedure."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-book" variant="primary">Hold slot</eds-button>
        <eds-button id="close-book" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
      <eds-list id="command-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-command" variant="tertiary">Close</eds-button>
      </div>
    </eds-modal>
  `;
}

function paintNav(route) {
  const nav = document.querySelector('#mast-nav');
  if (!nav) return;
  const current = activeHref(route);
  nav.innerHTML = navItems
    .map((item) => `<a href="${item.href}" ${item.href === current ? 'aria-current="page"' : ''}>${item.label}</a>`)
    .join('');
}

function hydrateShell() {
  const patient = document.querySelector('#book-patient');
  if (patient) {
    patient.options = patients.map((item) => ({ label: item.name, value: item.id }));
    patient.value = patients[0].id;
  }
  const provider = document.querySelector('#book-provider');
  if (provider) {
    provider.options = [
      { label: 'Dr. Elena Poluru', value: 'prv_elena' },
      { label: 'Dr. Marcus Poluru', value: 'prv_marcus' },
      { label: 'Dr. Priya Poluru', value: 'prv_priya' },
      { label: 'Jordan Poluru, NP', value: 'prv_jordan' },
      { label: 'Dr. Samir Poluru', value: 'prv_samir' },
    ];
    provider.value = 'prv_elena';
  }
  const type = document.querySelector('#book-type');
  if (type) {
    type.options = [
      { label: 'Follow-up', value: 'follow' },
      { label: 'New patient', value: 'new' },
      { label: 'Telehealth', value: 'tele' },
      { label: 'Urgent / walk-in', value: 'urgent' },
    ];
    type.value = 'follow';
  }
  const inbox = document.querySelector('#inbox-list');
  if (inbox) {
    inbox.items = [
      { label: 'Critical A1C', description: 'Luis Poluru · 9.4%', icon: 'alert-triangle' },
      { label: 'Inhaler refill', description: 'Maya Poluru · Exam 1', icon: 'mail' },
      { label: 'No-show risk', description: 'Leila Poluru · 10:20', icon: 'clock' },
    ];
  }

  const search = document.querySelector('#global-search');
  const profileBtn = document.querySelector('#profile-btn');
  const profileMenu = document.querySelector('#profile-menu');

  function setProfileOpen(open) {
    if (!profileBtn || !profileMenu) return;
    profileMenu.hidden = !open;
    profileBtn.setAttribute('aria-expanded', String(open));
  }

  function runSearch(value) {
    const query = value.trim().toLowerCase();
    const list = document.querySelector('#command-list');
    const patientHit = patients.find(
      (item) => item.name.toLowerCase().includes(query) || item.mrn.toLowerCase() === query,
    );
    if (list) {
      list.items = commandItems.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(query) || !query);
    }
    document.querySelector('#command-modal')?.show();
    if (patientHit && query.length > 2) window.location.hash = `#/patient/${patientHit.id}`;
  }

  document.querySelector('#nav-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
  search?.addEventListener('focus', () => setProfileOpen(false));
  search?.addEventListener('input', () => {
    if (search.value.trim()) runSearch(search.value);
  });
  search?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runSearch(search.value);
    }
  });
  document.querySelector('#command-list')?.addEventListener('eds-select', (event) => {
    const item = commandItems.find((entry) => entry.label === event.detail?.label);
    document.querySelector('#command-modal')?.close();
    if (item) window.location.hash = item.href;
  });
  profileBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    setProfileOpen(profileMenu?.hidden);
  });
  document.querySelector('#inbox-btn')?.addEventListener('click', () => {
    setProfileOpen(false);
    document.querySelector('#inbox-drawer')?.show();
  });
  document.querySelector('#signout-btn')?.addEventListener('click', () => {
    setProfileOpen(false);
    showToast({ message: 'Signed out of the demo clinic', variant: 'warning' });
  });
  profileMenu?.querySelector('a')?.addEventListener('click', () => setProfileOpen(false));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dock-profile-wrap')) setProfileOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setProfileOpen(false);
  });
  document.querySelector('#book-btn')?.addEventListener('click', () => document.querySelector('#book-modal')?.show());
  document.querySelector('#close-inbox')?.addEventListener('eds-click', () => document.querySelector('#inbox-drawer')?.close());
  document.querySelector('#close-message')?.addEventListener('eds-click', () => document.querySelector('#message-drawer')?.close());
  document.querySelector('#reply-message')?.addEventListener('eds-click', () => {
    document.querySelector('#message-drawer')?.close();
    showToast({ message: 'Refill sent to the pharmacy', variant: 'success' });
  });
  document.querySelector('#save-book')?.addEventListener('eds-click', () => {
    document.querySelector('#book-modal')?.close();
    showToast({ message: 'Slot held on the afternoon board', variant: 'success' });
  });
  document.querySelector('#close-book')?.addEventListener('eds-click', () => document.querySelector('#book-modal')?.close());
  document.querySelector('#close-command')?.addEventListener('eds-click', () => document.querySelector('#command-modal')?.close());
}

function renderRoute() {
  const route = parseRoute();
  if (!window.location.hash) window.location.hash = '#/overview';
  paintNav(route);
  const crumbs = document.querySelector('#crumbs');
  if (crumbs) crumbs.textContent = crumbText(route);
  document.body.classList.remove('nav-open');
  const view = document.querySelector('#view');
  if (!view) return;
  try {
    view.innerHTML = renderView(route);
    hydrateView(view, route);
  } catch (error) {
    view.innerHTML = `<section class="sheet"><h1>This page could not load</h1><p class="muted">${error.message}</p></section>`;
    console.error(error);
  }
  document.title = `${titles[route.name] || 'Overview'} · ${productName} Clinic`;
}

setDensity('comfortable');
renderShell();
hydrateShell();
renderRoute();
window.addEventListener('hashchange', renderRoute);
