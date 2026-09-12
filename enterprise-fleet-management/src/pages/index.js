import { renderOverview, hydrateOverview } from './overview.js';
import { renderVehicles, hydrateVehicles } from './vehicles.js';
import { renderVehicle, hydrateVehicle } from './vehicle.js';
import { renderMaintenance, hydrateMaintenance } from './maintenance.js';
import { renderDrivers, hydrateDrivers } from './drivers.js';
import { renderFuel, hydrateFuel } from './fuel.js';
import { renderInspections, hydrateInspections } from './inspections.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  vehicles: renderVehicles,
  vehicle: renderVehicle,
  maintenance: renderMaintenance,
  drivers: renderDrivers,
  fuel: renderFuel,
  inspections: renderInspections,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  vehicles: hydrateVehicles,
  vehicle: hydrateVehicle,
  maintenance: hydrateMaintenance,
  drivers: hydrateDrivers,
  fuel: hydrateFuel,
  inspections: hydrateInspections,
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
