export const titles = {
  overview: 'Overview',
  people: 'People',
  person: 'Person',
  leave: 'Leave',
  hiring: 'Hiring',
  org: 'Org',
  learning: 'Learning',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || 'overview', id: rest.join('/') || undefined };
}

export function activeHref(route) {
  if (route.name === 'person') return '#/people';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { people, workspaceName }) {
  if (route.name === 'person') {
    const person = people.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'People', href: '#/people' },
      { label: person?.name || 'Person', current: true },
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
