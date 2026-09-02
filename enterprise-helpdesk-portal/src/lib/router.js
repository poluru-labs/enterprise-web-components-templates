export const titles = {
  overview: 'Overview',
  tickets: 'Tickets',
  teams: 'Teams',
  sla: 'SLA policies',
  knowledge: 'Knowledge',
  reports: 'Reports',
  settings: 'Settings',
  search: 'Search',
};

export function pageTitle(route, { tickets } = {}) {
  if (route.name === 'tickets' && route.id) {
    const ticket = tickets?.find((item) => item.id === route.id);
    return ticket?.id || 'Ticket';
  }
  return titles[route.name] || 'Overview';
}

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  const id = rest.join('/') || undefined;
  return { name: name || 'overview', id };
}

export function activeHref(route) {
  if (route.name === 'tickets') return '#/tickets';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { tickets, workspaceName }) {
  if (route.name === 'tickets' && route.id) {
    const ticket = tickets.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Tickets', href: '#/tickets' },
      { label: ticket?.id || 'Ticket', current: true },
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

export function ticketHref(id) {
  return `#/tickets/${id}`;
}
