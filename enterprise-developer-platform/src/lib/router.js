export const titles = {
  overview: 'Overview',
  services: 'Services',
  service: 'Service',
  deployments: 'Deployments',
  environments: 'Environments',
  health: 'Health',
  owners: 'Owners',
  reports: 'Reports',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  const id = rest.join('/') || undefined;
  return { name: name || 'overview', id };
}

export function activeHref(route) {
  if (route.name === 'service') return '#/services';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { services, workspaceName }) {
  if (route.name === 'service') {
    const item = services.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Services', href: '#/services' },
      { label: item?.name || 'Service', current: true },
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
