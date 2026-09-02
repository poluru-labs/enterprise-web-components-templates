import './app-header.js';
import './app-sidebar.js';
import './content-card.js';

export function renderShellMarkup() {
  return `
    <div class="helio-shell">
      <helio-app-header></helio-app-header>
      <helio-app-sidebar></helio-app-sidebar>
      <div class="helio-main">
        <div class="helio-crumb-row">
          <eds-breadcrumb id="crumbs"></eds-breadcrumb>
        </div>
        <main id="view" tabindex="-1"></main>
      </div>
    </div>
    <button class="helio-backdrop" id="helio-backdrop" type="button" aria-label="Close navigation" hidden></button>
    <eds-drawer id="inbox-drawer" heading="Inbox" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="command-modal" heading="Jump to" close-on-backdrop close-on-escape>
      <eds-list id="command-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-command" variant="tertiary">Close</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="invite-modal" heading="Invite member" close-on-backdrop close-on-escape>
      <eds-stepper id="invite-stepper"></eds-stepper>
      <div class="stack mt-4">
        <eds-combobox id="invite-org" label="Organization" placeholder="Choose an organization"></eds-combobox>
        <eds-input id="invite-email" label="Email" type="email" placeholder="name@company.example" icon="mail"></eds-input>
        <eds-radio-group id="invite-role" label="Role" name="invite-role" value="member">
          <eds-radio value="admin" label="Admin"></eds-radio>
          <eds-radio value="member" label="Member"></eds-radio>
          <eds-radio value="billing" label="Billing"></eds-radio>
        </eds-radio-group>
        <eds-number-input id="invite-seats" label="Extra seats" value="1" min="1" max="40"></eds-number-input>
        <eds-pin-input id="invite-pin" length="4" type="number" label="Confirm with staff PIN"></eds-pin-input>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-invite" variant="primary">Send invite</eds-button>
        <eds-button id="close-invite" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="org-modal" heading="New organization" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Name" placeholder="Fieldwork Studio" icon="folder"></eds-input>
        <eds-input label="Owner" value="Luca Poluru" icon="user"></eds-input>
        <eds-select id="new-org-plan" label="Plan"></eds-select>
        <eds-select id="new-org-region" label="Region"></eds-select>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-org" variant="primary">Create</eds-button>
        <eds-button id="close-org" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="flag-modal" heading="New flag" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Name" placeholder="Audit exports" icon="filter"></eds-input>
        <eds-input label="Key" value="audit.exports"></eds-input>
        <eds-slider id="flag-initial" label="Initial rollout" min="0" max="100" value="0" show-value></eds-slider>
        <eds-textarea label="Notes" rows="3" placeholder="Who is this for, and when does it graduate."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-flag" variant="primary">Create flag</eds-button>
        <eds-button id="close-flag" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
    <eds-modal id="incident-modal" heading="Open incident" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Title" placeholder="Elevated error rate" icon="alert-triangle"></eds-input>
        <eds-select id="incident-sev" label="Severity"></eds-select>
        <eds-textarea label="Impact" rows="3" placeholder="Who is affected and what they see."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-incident" variant="danger">Open</eds-button>
        <eds-button id="close-incident" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
  `;
}

class AppShell extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount === 0) {
      this.innerHTML = renderShellMarkup();
    }
  }
}

if (!customElements.get('helio-app-shell')) {
  customElements.define('helio-app-shell', AppShell);
}

export { AppShell };
