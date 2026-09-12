export const titles = {
  overview: 'Overview',
  scorecards: 'Scorecards',
  scorecard: 'Scorecard',
  goals: 'Goals',
  trends: 'Trends',
  teams: 'Teams',
  alerts: 'Alerts',
  reviews: 'Reviews',
  benchmarks: 'Benchmarks',
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
  if (route.name === 'scorecard') return '#/scorecards';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { scorecards, workspaceName }) {
  if (route.name === 'scorecard') {
    const card = scorecards.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Scorecards', href: '#/scorecards' },
      { label: card?.name || 'Scorecard', current: true },
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
