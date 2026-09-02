export const titles = {
  overview: 'Overview',
  projects: 'Projects',
  project: 'Project',
  board: 'Board',
  timeline: 'Timeline',
  tasks: 'Tasks',
  sprints: 'Sprints',
  team: 'Team',
  risks: 'Risks',
  time: 'Time',
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
  if (route.name === 'project') return '#/projects';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { projects, workspaceName }) {
  if (route.name === 'project') {
    const project = projects.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Projects', href: '#/projects' },
      { label: project?.name || 'Project', current: true },
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
