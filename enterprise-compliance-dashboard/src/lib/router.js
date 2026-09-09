export const titles = {
  overview: 'Overview',
  policies: 'Policies',
  policy: 'Policy',
  controls: 'Controls',
  audits: 'Audits',
  tasks: 'Tasks',
  evidence: 'Evidence',
  findings: 'Findings',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'policy') return '#/policies';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { policies, workspaceName }) {
  if (route.name === 'policy') {
    const item = policies.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Policies', href: '#/policies' },
      { label: item?.code || 'Policy', current: true },
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
