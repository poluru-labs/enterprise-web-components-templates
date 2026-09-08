export const titles = {
  overview: 'Overview',
  requests: 'Requests',
  request: 'Request',
  approvals: 'Approvals',
  suppliers: 'Suppliers',
  contracts: 'Contracts',
  spend: 'Spend',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
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
      { label: item?.number || 'Request', current: true },
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
