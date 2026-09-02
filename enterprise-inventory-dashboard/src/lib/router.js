import { products } from '../data/index.js';

export const titles = {
  overview: 'Overview',
  inventory: 'Inventory',
  product: 'Item',
  orders: 'Purchase orders',
  warehouses: 'Warehouses',
  suppliers: 'Suppliers',
  team: 'Team',
  alerts: 'Alerts',
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
  if (route.name === 'product') return '#/inventory';
  return `#/${route.name || 'overview'}`;
}

export function crumbItems(route, { workspaceName }) {
  if (route.name === 'product') {
    const item = products.find((entry) => entry.id === route.id);
    return [
      { label: workspaceName, href: '#/overview' },
      { label: 'Inventory', href: '#/inventory' },
      { label: item?.name || 'Item', current: true },
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
