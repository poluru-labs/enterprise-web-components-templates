import { renderOverview, hydrateOverview } from './overview.js';
import { renderAssets, hydrateAssets } from './assets.js';
import { renderAsset, hydrateAsset } from './asset.js';
import { renderIncidents, hydrateIncidents } from './incidents.js';
import { renderIncident, hydrateIncident } from './incident.js';
import { renderChanges, hydrateChanges } from './changes.js';
import { renderChange, hydrateChange } from './change.js';
import { renderHealth, hydrateHealth } from './health.js';
import { renderAvailability, hydrateAvailability } from './availability.js';
import { renderOncall, hydrateOncall } from './oncall.js';
import { renderMaintenance, hydrateMaintenance } from './maintenance.js';
import { renderServices, hydrateServices } from './services.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  assets: renderAssets,
  asset: renderAsset,
  incidents: renderIncidents,
  incident: renderIncident,
  changes: renderChanges,
  change: renderChange,
  health: renderHealth,
  availability: renderAvailability,
  oncall: renderOncall,
  maintenance: renderMaintenance,
  services: renderServices,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  assets: hydrateAssets,
  asset: hydrateAsset,
  incidents: hydrateIncidents,
  incident: hydrateIncident,
  changes: hydrateChanges,
  change: hydrateChange,
  health: hydrateHealth,
  availability: hydrateAvailability,
  oncall: hydrateOncall,
  maintenance: hydrateMaintenance,
  services: hydrateServices,
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
