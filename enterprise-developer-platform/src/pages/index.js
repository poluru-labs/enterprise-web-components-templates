import { renderOverview, hydrateOverview } from './overview.js';
import { renderServices, hydrateServices } from './services.js';
import { renderService, hydrateService } from './service.js';
import { renderDeployments, hydrateDeployments } from './deployments.js';
import { renderEnvironments, hydrateEnvironments } from './environments.js';
import { renderHealth, hydrateHealth } from './health.js';
import { renderOwners, hydrateOwners } from './owners.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  services: renderServices,
  service: renderService,
  deployments: renderDeployments,
  environments: renderEnvironments,
  health: renderHealth,
  owners: renderOwners,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  services: hydrateServices,
  service: hydrateService,
  deployments: hydrateDeployments,
  environments: hydrateEnvironments,
  health: hydrateHealth,
  owners: hydrateOwners,
  reports: hydrateReports,
  settings: hydrateSettings,
  search: hydrateSearch,
};

export function renderView(route) {
  const render = views[route.name] || renderOverview;
  return render(route);
}

export function hydrateView(root, route) {
  const hydrate = hydrators[route.name] || hydrateOverview;
  hydrate(root, route);
}
