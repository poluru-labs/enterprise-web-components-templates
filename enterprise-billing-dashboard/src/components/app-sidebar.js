import { navItems } from '../data/index.js';

export function renderSidebarMarkup(activeHref = '#/overview') {
  return `
    <nav class="vd-sidebar-nav" id="sidebar-nav" aria-label="Primary">
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

if (!customElements.get('vd-app-sidebar')) {
  customElements.define('vd-app-sidebar', AppSidebar);
}

export { AppSidebar };
