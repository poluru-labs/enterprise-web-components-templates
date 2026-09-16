import { renderOverview, hydrateOverview } from './overview.js';
import { renderTrips, hydrateTrips } from './trips.js';
import { renderTrip, hydrateTrip } from './trip.js';
import { renderTravelers, hydrateTravelers } from './travelers.js';
import { renderApprovals, hydrateApprovals } from './approvals.js';
import { renderItineraries, hydrateItineraries } from './itineraries.js';
import { renderExpenses, hydrateExpenses } from './expenses.js';
import { renderRisk, hydrateRisk } from './risk.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  trips: renderTrips,
  trip: renderTrip,
  travelers: renderTravelers,
  approvals: renderApprovals,
  itineraries: renderItineraries,
  expenses: renderExpenses,
  risk: renderRisk,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  trips: hydrateTrips,
  trip: hydrateTrip,
  travelers: hydrateTravelers,
  approvals: hydrateApprovals,
  itineraries: hydrateItineraries,
  expenses: hydrateExpenses,
  risk: hydrateRisk,
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
