export const titles = {
  overview: 'Overview',
  calendar: 'Calendar',
  piece: 'Piece',
  approvals: 'Approvals',
  locales: 'Locales',
  schedule: 'Schedule',
  assets: 'Assets',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'piece') return '#/calendar';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { pieces, workspaceName }) {
  if (route.name === 'piece') {
    const item = pieces.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Calendar', href: '#/calendar' },
      { label: item?.title || 'Piece', current: true },
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
