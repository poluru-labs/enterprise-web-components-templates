export const titles = {
  overview: 'Overview',
  requests: 'Requests',
  request: 'Request',
  permits: 'Permits',
  cases: 'Cases',
  departments: 'Departments',
  budgets: 'Budgets',
  service: 'Service',
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
  if (route.name === 'request') return '#/requests';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { requests, workspaceName }) {
  if (route.name === 'request') {
    const item = requests.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Requests', href: '#/requests' },
      { label: item?.code || 'Request', current: true },
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
