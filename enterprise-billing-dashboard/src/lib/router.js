export const titles = {
  overview: 'Overview',
  search: 'Search',
  invoices: 'Invoices',
  invoice: 'Invoice',
  payments: 'Payments',
  subscriptions: 'Subscriptions',
  customers: 'Customers',
  customer: 'Customer',
  analytics: 'Analytics',
  reports: 'Reports',
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
  if (route.name === 'invoice') return '#/invoices';
  if (route.name === 'customer') return '#/customers';
  return `#/${route.name || 'overview'}`;
}

export function crumbText(route) {
  if (route.name === 'invoice') return `Ledger / Invoices / ${route.id}`;
  if (route.name === 'customer') return 'Accounts / Customers / Profile';
  if (route.name === 'search') return 'Northshore Cloud / Search';
  return `Northshore Cloud / ${titles[route.name] || 'Overview'}`;
}

export function pageTitle(route, productName) {
  return `${titles[route.name] || 'Overview'} · ${productName} Billing`;
}

export function navigate(href) {
  window.location.hash = href;
}
