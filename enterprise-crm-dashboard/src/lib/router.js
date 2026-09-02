import { workspaceName } from '../data/index.js';

export const routeTitles = {
  overview: 'Overview',
  pipeline: 'Pipeline',
  deals: 'Deals',
  deal: 'Deal',
  leads: 'Leads',
  contacts: 'Contacts',
  contact: 'Contact',
  accounts: 'Accounts',
  account: 'Account',
  activities: 'Activities',
  forecast: 'Forecast',
  reports: 'Reports',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute(hash = window.location.hash) {
  const raw = hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

export function crumbText(route) {
  if (route.name === 'deal') return `Pipeline / Deals / ${route.id}`;
  if (route.name === 'contact') return `People / Contacts / ${route.id}`;
  if (route.name === 'account') return `Companies / Accounts / ${route.id}`;
  if (route.name === 'search') return `${workspaceName} / Search`;
  return `${workspaceName} / ${routeTitles[route.name] || 'Overview'}`;
}

export function activeHref(route) {
  if (route.name === 'deal') return '#/deals';
  if (route.name === 'contact') return '#/contacts';
  if (route.name === 'account') return '#/accounts';
  if (route.name === 'search') return '#/search';
  return `#/${route.name || 'overview'}`;
}

export function ensureDefaultRoute() {
  if (!window.location.hash) window.location.hash = '#/overview';
}

export function subscribe(onRoute) {
  const handler = () => {
    ensureDefaultRoute();
    onRoute(parseRoute());
  };
  window.addEventListener('hashchange', handler);
  handler();
  return () => window.removeEventListener('hashchange', handler);
}

export function navigate(href) {
  window.location.hash = href.replace(/^#/, '#/').replace(/^#\/\//, '#/');
}
