export const titles = {
  overview: 'Overview',
  assets: 'Assets',
  asset: 'Asset',
  incidents: 'Incidents',
  incident: 'Incident',
  changes: 'Changes',
  change: 'Change',
  health: 'Infrastructure health',
  availability: 'Service availability',
  oncall: 'On-call',
  maintenance: 'Maintenance',
  services: 'Services',
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
  if (route.name === 'asset') return '#/assets';
  if (route.name === 'incident') return '#/incidents';
  if (route.name === 'change') return '#/changes';
  if (route.name === 'oncall' || route.name === 'maintenance' || route.name === 'services') {
    return `#/${route.name}`;
  }
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { assets, incidents, changes, workspaceName }) {
  if (route.name === 'asset') {
    const asset = assets.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Assets', href: '#/assets' },
      { label: asset?.name || 'Asset', current: true },
    ];
  }
  if (route.name === 'incident') {
    const incident = incidents.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Incidents', href: '#/incidents' },
      { label: incident?.id || 'Incident', current: true },
    ];
  }
  if (route.name === 'change') {
    const change = changes.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Changes', href: '#/changes' },
      { label: change?.id || 'Change', current: true },
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
