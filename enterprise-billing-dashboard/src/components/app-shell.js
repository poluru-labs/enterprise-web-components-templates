import './app-header.js';
import './app-sidebar.js';
import './content-card.js';

export function renderShellMarkup() {
  return `
    <div class="vd-shell">
      <vd-app-header></vd-app-header>
      <vd-app-sidebar></vd-app-sidebar>
      <div class="vd-main">
        <div class="vd-main-inner">
          <p class="crumb-line" id="crumbs"></p>
          <main id="view" tabindex="-1"></main>
        </div>
      </div>
    </div>
    <eds-drawer id="preview-drawer" heading="Invoice preview" side="right" size="md">
      <p class="kicker mb-1">INV-2841</p>
      <h2>Harbor &amp; Co.</h2>
      <p class="muted">Issued 1 Aug 2026 · Due 15 Aug 2026</p>
      <p><strong>$18,400</strong> · Paid via Mastercard 8891</p>
      <p class="muted">Enterprise platform, priority support, and SSO for August.</p>
      <div slot="footer" class="inline-actions">
        <eds-button id="open-full-invoice" variant="primary">Open details</eds-button>
        <eds-button id="close-preview" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-drawer id="inbox-drawer" heading="Collections" side="right" size="md">
      <eds-list id="inbox-list" divided></eds-list>
      <div slot="footer">
        <eds-button id="close-inbox" variant="tertiary">Close</eds-button>
      </div>
    </eds-drawer>
    <eds-modal id="create-modal" heading="Quick create" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input label="Customer" placeholder="Harbor & Co." icon="user"></eds-input>
        <eds-number-input label="Amount (USD)" value="2400" min="0" max="100000" step="10"></eds-number-input>
        <eds-select id="create-kind" label="Type"></eds-select>
        <eds-textarea label="Memo" rows="3" placeholder="August platform fee plus support."></eds-textarea>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-create" variant="primary">Save draft</eds-button>
        <eds-button id="close-create" variant="tertiary">Cancel</eds-button>
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

class AppShell extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount === 0) {
      this.innerHTML = renderShellMarkup();
    }
  }
}

if (!customElements.get('vd-app-shell')) {
  customElements.define('vd-app-shell', AppShell);
}

export { AppShell };
