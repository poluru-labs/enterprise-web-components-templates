export const titles = {
  overview: 'Overview',
  catalog: 'Catalog',
  asset: 'Asset',
  owners: 'Ownership',
  lineage: 'Lineage',
  quality: 'Quality rules',
  classifications: 'Classifications',
  access: 'Access requests',
  glossary: 'Glossary',
  policies: 'Policies',
  issues: 'Issues',
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
  if (route.name === 'asset') return '#/catalog';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { assets, workspaceName }) {
  if (route.name === 'asset') {
    const asset = assets.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Catalog', href: '#/catalog' },
      { label: asset?.name || 'Asset', current: true },
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
