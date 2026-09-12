export const titles = {
  overview: 'Overview',
  vehicles: 'Vehicles',
  vehicle: 'Vehicle',
  maintenance: 'Maintenance',
  drivers: 'Drivers',
  fuel: 'Fuel',
  inspections: 'Inspections',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'vehicle') return '#/vehicles';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { vehicles, workspaceName }) {
  if (route.name === 'vehicle') {
    const item = vehicles.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Vehicles', href: '#/vehicles' },
      { label: item?.unit || 'Vehicle', current: true },
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
