import { organizations, workspaceName } from '../data/index.js';

export const titles = {
  overview: 'Overview',
  search: 'Search',
  organizations: 'Organizations',
  org: 'Organization',
  members: 'Members',
  plans: 'Plans',
  flags: 'Flags',
  usage: 'Usage',
  incidents: 'Incidents',
  audit: 'Audit',
  settings: 'Settings',
};

export function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [path, queryString] = raw.split('?');
  const [name, id] = path.split('/');
  const params = new URLSearchParams(queryString ?? '');
  return {
    name: name || 'overview',
    id,
    query: params.get('q') ?? '',
  };
}

export function activeHref(route) {
  if (route.name === 'org') return '#/organizations';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route) {
  if (route.name === 'org') {
    const org = organizations.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Organizations', href: '#/organizations' },
      { label: org?.name || 'Workspace', current: true },
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

export function pageTitle(route, productName) {
  return `${titles[route.name] || 'Overview'} · ${productName} Admin`;
}

export function navigate(href) {
  window.location.hash = href;
}
