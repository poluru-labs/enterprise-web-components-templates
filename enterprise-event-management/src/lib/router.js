export const titles = {
  overview: 'Overview',
  events: 'Events',
  event: 'Event',
  registrations: 'Registrations',
  venues: 'Venues',
  speakers: 'Speakers',
  schedule: 'Schedule',
  sponsors: 'Sponsors',
  attendance: 'Attendance',
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
  if (route.name === 'event') return '#/events';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { events, workspaceName }) {
  if (route.name === 'event') {
    const item = events.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Events', href: '#/events' },
      { label: item?.name || 'Event', current: true },
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
