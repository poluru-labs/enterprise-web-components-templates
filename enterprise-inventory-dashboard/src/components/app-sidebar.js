import { currentUser, navItems, productLine, productName } from '../data/index.js';

export function sidebarTemplate() {
  return `
    <aside class="nim-sidebar" id="nim-sidebar" aria-label="Dashboard">
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
