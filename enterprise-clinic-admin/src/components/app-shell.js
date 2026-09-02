import { patients } from '../data/index.js';
import './app-header.js';
import './app-sidebar.js';
import './content-card.js';

export function renderAppShell() {
  return `
    <div class="halo-app-layout">
      <halo-app-header id="halo-header"></halo-app-header>
      <halo-app-sidebar id="halo-sidebar"></halo-app-sidebar>
      <div class="halo-app-canvas">
        <p class="halo-crumb-line" id="halo-crumbs"></p>
        <main id="view" tabindex="-1"></main>
      </div>
    </div>
    <eds-drawer id="message-drawer" heading="Message" side="right" size="md">
      <p class="halo-kicker mb-1">Refill</p>
      <h2>Maya Poluru</h2>
      <p class="halo-muted">Albuterol is empty. Can we refill before Thursday?</p>
      <p>Chart is open in Exam 1. Coverage is Blue Cross PPO. Last fill 18 Aug 2026.</p>
      <div slot="footer" class="halo-inline-actions">
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
      <div class="halo-stack">
        <eds-select id="book-patient" label="Patient"></eds-select>
        <eds-select id="book-provider" label="Provider"></eds-select>
        <eds-select id="book-type" label="Visit type"></eds-select>
        <eds-input label="Preferred time" value="16:20"></eds-input>
        <eds-textarea label="Reason" rows="3" placeholder="Follow-up, new concern, or procedure."></eds-textarea>
      </div>
      <div slot="footer" class="halo-inline-actions">
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

export function hydrateShell(root) {
  const patient = root.querySelector('#book-patient');
  if (patient) {
    patient.options = patients.map((item) => ({ label: item.name, value: item.id }));
    patient.value = patients[0].id;
  }
  const provider = root.querySelector('#book-provider');
  if (provider) {
    provider.options = [
      { label: 'Dr. Elena Poluru', value: 'prv_elena' },
      { label: 'Dr. Marcus Poluru', value: 'prv_marcus' },
      { label: 'Dr. Priya Poluru', value: 'prv_priya' },
      { label: 'Dr. Nadia Poluru', value: 'prv_nadia' },
      { label: 'Jordan Poluru, NP', value: 'prv_jordan' },
      { label: 'Dr. Samir Poluru', value: 'prv_samir' },
    ];
    provider.value = 'prv_elena';
  }
  const type = root.querySelector('#book-type');
  if (type) {
    type.options = [
      { label: 'Follow-up', value: 'follow' },
      { label: 'New patient', value: 'new' },
      { label: 'Telehealth', value: 'tele' },
      { label: 'Urgent / walk-in', value: 'urgent' },
    ];
    type.value = 'follow';
  }
  const inbox = root.querySelector('#inbox-list');
  if (inbox) {
    inbox.items = [
      { label: 'Critical A1C', description: 'Luis Poluru · 9.4%', icon: 'alert-triangle' },
      { label: 'Inhaler refill', description: 'Maya Poluru · Exam 1', icon: 'mail' },
      { label: 'No-show risk', description: 'Leila Poluru · 10:20', icon: 'clock' },
    ];
  }
}

export function setShellRoute(route) {
  document.querySelector('#halo-header')?.setRoute(route);
  document.querySelector('#halo-sidebar')?.setRoute(route);
  document.querySelector('#halo-header')?.refreshBoard();
}
