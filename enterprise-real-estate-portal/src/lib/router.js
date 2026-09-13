export const titles = {
  overview: 'Overview',
  properties: 'Properties',
  property: 'Property',
  leases: 'Leases',
  occupancy: 'Occupancy',
  maintenance: 'Maintenance',
  performance: 'Performance',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'property') return '#/properties';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { properties, workspaceName }) {
  if (route.name === 'property') {
    const item = properties.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Properties', href: '#/properties' },
      { label: item?.name || 'Property', current: true },
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
