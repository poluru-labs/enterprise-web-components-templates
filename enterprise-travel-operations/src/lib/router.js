export const titles = {
  overview: 'Overview',
  trips: 'Trips',
  trip: 'Trip',
  travelers: 'Travelers',
  approvals: 'Approvals',
  itineraries: 'Itineraries',
  expenses: 'Expenses',
  risk: 'Risk',
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
  if (route.name === 'trip') return '#/trips';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { trips, workspaceName }) {
  if (route.name === 'trip') {
    const trip = trips.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Trips', href: '#/trips' },
      { label: trip ? `${trip.city}` : 'Trip', current: true },
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
