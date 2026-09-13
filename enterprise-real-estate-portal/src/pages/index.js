import { renderOverview, hydrateOverview } from './overview.js';
import { renderProperties, hydrateProperties } from './properties.js';
import { renderProperty, hydrateProperty } from './property.js';
import { renderLeases, hydrateLeases } from './leases.js';
import { renderOccupancy, hydrateOccupancy } from './occupancy.js';
import { renderMaintenance, hydrateMaintenance } from './maintenance.js';
import { renderPerformance, hydratePerformance } from './performance.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  properties: renderProperties,
  property: renderProperty,
  leases: renderLeases,
  occupancy: renderOccupancy,
  maintenance: renderMaintenance,
  performance: renderPerformance,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  properties: hydrateProperties,
  property: hydrateProperty,
  leases: hydrateLeases,
  occupancy: hydrateOccupancy,
  maintenance: hydrateMaintenance,
  performance: hydratePerformance,
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
