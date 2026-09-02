import { renderOverview, hydrateOverview } from './overview.js';
import { renderInventory, hydrateInventory } from './inventory.js';
import { renderProduct, hydrateProduct } from './product.js';
import { renderOrders, hydrateOrders } from './orders.js';
import { renderWarehouses, hydrateWarehouses } from './warehouses.js';
import { renderSuppliers, hydrateSuppliers } from './suppliers.js';
import { renderTeam, hydrateTeam } from './team.js';
import { renderAlerts, hydrateAlerts } from './alerts.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  inventory: renderInventory,
  product: renderProduct,
  orders: renderOrders,
  warehouses: renderWarehouses,
  suppliers: renderSuppliers,
  team: renderTeam,
  alerts: renderAlerts,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  inventory: hydrateInventory,
  product: hydrateProduct,
  orders: hydrateOrders,
  warehouses: hydrateWarehouses,
  suppliers: hydrateSuppliers,
  team: hydrateTeam,
  alerts: hydrateAlerts,
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
