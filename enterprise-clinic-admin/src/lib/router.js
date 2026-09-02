import { clinicName } from '../data/index.js';

export const titles = {
  overview: 'Overview',
  schedule: 'Schedule',
  visit: 'Visit',
  patients: 'Patients',
  patient: 'Chart',
  providers: 'Providers',
  census: 'Census',
  orders: 'Orders',
  messages: 'Messages',
  insights: 'Insights',
  settings: 'Settings',
  search: 'Search',
};

export function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [name, id] = raw.split('/');
  return { name: name || 'overview', id };
}

export function crumbText(route) {
  if (route.name === 'visit') return `Schedule / Visit / ${route.id}`;
  if (route.name === 'patient') return `Patients / Chart / ${route.id}`;
  if (route.name === 'search') return `${clinicName} / Search`;
  return `${clinicName} / ${titles[route.name] || 'Overview'}`;
}

export function activeHref(route) {
  if (route.name === 'visit') return '#/schedule';
  if (route.name === 'patient') return '#/patients';
  if (route.name === 'search') return '#/search';
  return `#/${route.name || 'overview'}`;
}

export function routeTitle(route) {
  return `${titles[route.name] || 'Overview'} · Halo Clinic`;
}
