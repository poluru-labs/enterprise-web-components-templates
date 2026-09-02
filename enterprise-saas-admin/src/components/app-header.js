import { formatNumber, initials, seatRatio } from '../lib/format.js';
import {
  currentUser,
  orgSwitcherOptions,
  productLine,
  productName,
  seatUsage,
  workspaceName,
} from '../data/index.js';

export function renderHeaderMarkup({ user, searchValue = '' } = {}) {
  const activeOrg = orgSwitcherOptions.find((item) => item.active) ?? orgSwitcherOptions[0];
  const ratio = seatRatio(seatUsage.used, seatUsage.total);
  return `
    <header class="helio-tenancy-bar" role="banner">
      <div class="helio-tenancy-bar__inner">
        <button class="helio-nav-toggle" id="nav-toggle" type="button" aria-label="Open menu">Menu</button>
        <a class="helio-tenancy-bar__brand" href="#/overview">
          <span class="helio-brand-mark" aria-hidden="true">H</span>
          <span class="helio-brand-copy">
            <strong>${productName}</strong>
            <small>${productLine} · ${workspaceName}</small>
          </span>
        </a>
        <div class="helio-tenancy-center">
          <div class="helio-org-switcher">
            <button class="helio-org-chip" id="org-chip" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="org-menu">
              ${activeOrg.label}
              <i class="bi bi-chevron-down" aria-hidden="true"></i>
            </button>
            <div class="helio-org-menu" id="org-menu" role="menu" hidden>
              ${orgSwitcherOptions
                .map(
                  (org) => `
                <button type="button" role="menuitem" data-org="${org.id}" aria-current="${org.active ? 'true' : 'false'}">
                  ${org.label}
                  <small>${org.region}</small>
                </button>`,
                )
                .join('')}
            </div>
          </div>
          <div class="helio-seat-meter" aria-label="Seat usage">
            <span class="helio-seat-meter__label">${seatUsage.label}</span>
            <div class="helio-seat-meter__track">
              <div class="helio-seat-meter__fill" style="width:${ratio}%"></div>
            </div>
            <span class="helio-seat-meter__value">${formatNumber(seatUsage.used)} / ${formatNumber(seatUsage.total)}</span>
          </div>
        </div>
        <div class="helio-tenancy-actions">
          <label class="helio-header-search">
            <span class="visually-hidden">Search the control plane</span>
            <i class="bi bi-search" aria-hidden="true"></i>
            <input id="global-search" type="search" placeholder="Search orgs, members, flags" value="${searchValue}" autocomplete="off" />
            <span class="helio-header-kbd" aria-hidden="true">⌘K</span>
          </label>
          <button class="helio-header-action helio-header-action--primary" id="header-invite" type="button">
            <i class="bi bi-plus-lg" aria-hidden="true"></i>
            <span>Invite org</span>
          </button>
          <div class="helio-header-profile-wrap">
            <button class="helio-header-profile" id="profile-btn" type="button" aria-expanded="false" aria-haspopup="menu" aria-controls="profile-menu">
              <span class="helio-header-avatar" aria-hidden="true">${initials(user?.name)}</span>
              <span class="helio-header-profile-copy">
                <strong>${user?.name ?? ''}</strong>
                <small>${user?.role ?? ''}</small>
              </span>
              <i class="bi bi-caret-down-fill" aria-hidden="true"></i>
            </button>
            <div class="helio-profile-menu" id="profile-menu" role="menu" hidden>
              <p class="helio-profile-menu-head">
                <strong>${user?.name ?? ''}</strong>
                <span>${user?.email ?? ''}</span>
              </p>
              <button type="button" role="menuitem" id="inbox-btn">Inbox</button>
              <a href="#/settings" role="menuitem">Settings</a>
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

if (!customElements.get('helio-app-header')) {
  customElements.define('helio-app-header', AppHeader);
}

export { AppHeader };
