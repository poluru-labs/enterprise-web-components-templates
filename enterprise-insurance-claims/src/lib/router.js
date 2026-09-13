export const titles = {
  overview: 'Overview',
  claims: 'Claims',
  claim: 'Claim',
  adjusters: 'Adjusters',
  policies: 'Policies',
  fraud: 'Fraud',
  settlements: 'Settlements',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'claim') return '#/claims';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { claims, workspaceName }) {
  if (route.name === 'claim') {
    const item = claims.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Claims', href: '#/claims' },
      { label: item?.code || 'Claim', current: true },
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
