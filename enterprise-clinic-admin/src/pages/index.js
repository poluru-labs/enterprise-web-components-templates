import * as overview from './overview.js';
import * as schedule from './schedule.js';
import * as visit from './visit.js';
import * as patients from './patients.js';
import * as patient from './patient.js';
import * as providers from './providers.js';
import * as census from './census.js';
import * as orders from './orders.js';
import * as messages from './messages.js';
import * as insights from './insights.js';
import * as settings from './settings.js';
import * as search from './search.js';

const pages = {
  overview,
  schedule,
  patients,
  providers,
  census,
  orders,
  messages,
  insights,
  settings,
  search,
};

export function renderView(route) {
  if (route.name === 'visit') return visit.render(route);
  if (route.name === 'patient') return patient.render(route);
  const page = pages[route.name] ?? overview;
  return page.render(route);
}

export function hydrateView(root, route) {
  if (route.name === 'visit') return visit.hydrate(root, route);
  if (route.name === 'patient') return patient.hydrate(root, route);
  const page = pages[route.name] ?? overview;
  return page.hydrate(root, route);
}
