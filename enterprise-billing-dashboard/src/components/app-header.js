import { initials } from '../lib/format.js';
import { company, currentUser, ledgerMetrics, productLine, productName } from '../data/index.js';

export function renderHeaderMarkup({ user, searchValue = '' } = {}) {
  const metrics = ledgerMetrics;
  return `
    <header class="vd-ledger-header" role="banner">
      <div class="vd-ledger-ribbon" aria-label="Ledger pulse">
        ${metrics
          .map(
            (cell) => `
          <div class="vd-ledger-cell">
            <span class="vd-ledger-cell__label">${cell.label}</span>
            <span class="vd-ledger-cell__value">${cell.value}</span>
            <span class="vd-ledger-cell__hint">${cell.hint}</span>
          </div>`,
          )
          .join('')}
        <div class="vd-ledger-meta">
          <span>${company.taxId} · ${company.currency} · ${company.terms}</span>
          <span>Books closed through 31 Jul 2026</span>
        </div>
      </div>
      <div class="vd-ledger-toolbar">
        <div class="vd-ledger-toolbar__brand">
          <button class="vd-nav-toggle" id="nav-toggle" type="button" aria-label="Open menu">
            <i class="bi bi-list" aria-hidden="true"></i>
          </button>
          <a class="vd-ledger-header__brand" href="#/overview">
            <span class="vd-ledger-header__mark" aria-hidden="true">V</span>
            <span class="vd-ledger-header__wordmark">
              <strong>${productName}</strong>
              <small>${productLine} · Northshore Cloud</small>
            </span>
          </a>
        </div>
        <div class="vd-ledger-header__actions">
          <label class="vd-ledger-search">
            <span class="visually-hidden">Search the ledger</span>
            <i class="bi bi-search" aria-hidden="true"></i>
            <input id="global-search" type="search" placeholder="Find invoice or customer" value="${searchValue}" autocomplete="off" />
            <span class="vd-ledger-kbd" aria-hidden="true">⌘K</span>
          </label>
          <button class="vd-ledger-action vd-ledger-action--primary" id="new-invoice-btn" type="button">
            <i class="bi bi-plus-lg" aria-hidden="true"></i>
            <span>New invoice</span>
          </button>
          <div class="vd-ledger-profile-wrap">
            <button class="vd-ledger-profile" id="profile-btn" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="profile-menu">
              <span class="vd-ledger-avatar" aria-hidden="true">${initials(user?.name)}</span>
              <span class="vd-ledger-profile-copy">
                <strong>${user?.name ?? ''}</strong>
                <small>${user?.role ?? ''}</small>
              </span>
              <i class="bi bi-caret-down-fill" aria-hidden="true"></i>
            </button>
            <div class="vd-profile-menu" id="profile-menu" role="menu" hidden>
              <p class="vd-profile-menu-head">
                <strong>${user?.name ?? ''}</strong>
                <span>${user?.email ?? ''}</span>
              </p>
              <button type="button" role="menuitem" id="inbox-btn">Collections inbox</button>
              <a href="#/settings" role="menuitem">Billing settings</a>
              <button type="button" role="menuitem" id="signout-btn">Sign out</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

class AppHeader extends HTMLElement {
  connectedCallback() {
    if (!this.dataset.hydrated) {
      this.innerHTML = renderHeaderMarkup({ user: currentUser });
      this.dataset.hydrated = 'true';
    }
  }
}

if (!customElements.get('vd-app-header')) {
  customElements.define('vd-app-header', AppHeader);
}

export { AppHeader };
