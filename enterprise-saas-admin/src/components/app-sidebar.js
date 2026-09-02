import { navItems } from '../data/index.js';

export function renderSidebarMarkup(activeHref = '#/overview') {
  return `
    <nav class="helio-sidebar-nav" id="sidebar-nav" aria-label="Dashboard">
      ${navItems
        .map(
          (item) => `
        <a href="${item.href}" ${item.href === activeHref ? 'aria-current="page"' : ''}>
          <i class="bi bi-${item.icon}" aria-hidden="true"></i>
          <span>${item.label}</span>
        </a>`,
        )
        .join('')}
    </nav>
    <div class="helio-sidebar-foot">
      <eds-avatar name="Mira Poluru" size="sm"></eds-avatar>
      <span class="helio-brand-copy">
        <strong>Mira Poluru</strong>
        <small>Platform admin</small>
      </span>
    </div>
  `;
}

class AppSidebar extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount === 0) {
      this.innerHTML = renderSidebarMarkup();
    }
  }

  paint(activeHref) {
    this.innerHTML = renderSidebarMarkup(activeHref);
  }
}

if (!customElements.get('helio-app-sidebar')) {
  customElements.define('helio-app-sidebar', AppSidebar);
}

export { AppSidebar };
