import { navItems } from '../data/index.js';

export class HaloAppSidebar extends HTMLElement {
  connectedCallback() {
    this.classList.add('halo-app-sidebar');
    this.render();
  }

  setRoute(route) {
    const current =
      route?.name === 'visit'
        ? '#/schedule'
        : route?.name === 'patient'
          ? '#/patients'
          : `#/${route?.name || 'overview'}`;
    this.querySelectorAll('a').forEach((link) => {
      if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  render() {
    this.innerHTML = `
      <nav aria-label="Sidebar">
        <p class="halo-sidebar-label">Floor</p>
        ${navItems
          .map(
            (item) => `
          <a href="${item.href}">
            <i class="bi bi-${item.icon}" aria-hidden="true"></i>
            <span>${item.label}</span>
          </a>`,
          )
          .join('')}
      </nav>
    `;
  }
}

if (!customElements.get('halo-app-sidebar')) {
  customElements.define('halo-app-sidebar', HaloAppSidebar);
}
