import { currentUser, navItems, productLine, productName } from '../data/index.js';

export function sidebarTemplate() {
  return `
    <aside class="ves-sidebar" id="ves-sidebar" aria-label="Dashboard">
      <a class="wordmark" href="#/overview">
        <span class="brand-mark" aria-hidden="true">V</span>
        <span class="brand-copy">
          <strong>${productName}</strong>
          <small>${productLine}</small>
        </span>
      </a>
      <eds-side-nav id="side-nav"></eds-side-nav>
      <div class="sidebar-foot">
        <eds-avatar name="${currentUser.name}" size="sm"></eds-avatar>
        <span class="brand-copy">
          <strong>${currentUser.name}</strong>
          <small>${currentUser.role}</small>
        </span>
      </div>
    </aside>
  `;
}

export function paintNav(route) {
  const nav = document.querySelector('#side-nav');
  if (!nav) return;
  const current = route.activeHref;
  nav.items = navItems.map((item) => ({
    ...item,
    active: item.href === current,
  }));
}
