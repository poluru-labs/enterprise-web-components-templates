export const titles = {
  overview: 'Overview',
  alerts: 'Alerts',
  incidents: 'Incidents',
  incident: 'Incident',
  vulnerabilities: 'Vulnerabilities',
  investigations: 'Investigations',
  response: 'Response',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'incident') return '#/incidents';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { incidents, workspaceName }) {
  if (route.name === 'incident') {
    const item = incidents.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Incidents', href: '#/incidents' },
      { label: item?.code || 'Incident', current: true },
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
