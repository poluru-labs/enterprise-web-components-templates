export const titles = {
  overview: 'Overview',
  accounts: 'Accounts',
  account: 'Account',
  health: 'Health',
  renewals: 'Renewals',
  onboarding: 'Onboarding',
  expansion: 'Expansion',
  playbooks: 'Playbooks',
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
  if (route.name === 'account') return '#/accounts';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { accounts, workspaceName }) {
  if (route.name === 'account') {
    const account = accounts.find((item) => item.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Accounts', href: '#/accounts' },
      { label: account?.name || 'Account', current: true },
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
