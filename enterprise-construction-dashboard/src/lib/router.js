export const titles = {
  overview: 'Overview',
  sites: 'Job sites',
  site: 'Job site',
  budgets: 'Budgets',
  schedule: 'Schedule',
  rfis: 'RFIs',
  subcontractors: 'Subcontractors',
  safety: 'Safety',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'site') return '#/sites';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { sites, workspaceName }) {
  if (route.name === 'site') {
    const item = sites.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Job sites', href: '#/sites' },
      { label: item?.name || 'Site', current: true },
    ];
  }
  if (route.name === 'search') {
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Search', current: true },
    ];
  }
  return [
    { label: workspaceName, href: '#/overview' },
    { label: titles[route.name] || 'Overview', current: true },
  ];
}

export function searchHref(query) {
  const trimmed = String(query ?? '').trim();
  if (!trimmed) return '#/search';
  return `#/search/${encodeURIComponent(trimmed)}`;
}
