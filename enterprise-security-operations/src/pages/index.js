import { renderOverview, hydrateOverview } from './overview.js';
import { renderAlerts, hydrateAlerts } from './alerts.js';
import { renderIncidents, hydrateIncidents } from './incidents.js';
import { renderIncidentDetail, hydrateIncidentDetail } from './incident-detail.js';
import { renderVulnerabilities, hydrateVulnerabilities } from './vulnerabilities.js';
import { renderInvestigations, hydrateInvestigations } from './investigations.js';
import { renderResponse, hydrateResponse } from './response.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  alerts: renderAlerts,
  incidents: renderIncidents,
  incident: renderIncidentDetail,
  vulnerabilities: renderVulnerabilities,
  investigations: renderInvestigations,
  response: renderResponse,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  alerts: hydrateAlerts,
  incidents: hydrateIncidents,
  incident: hydrateIncidentDetail,
  vulnerabilities: hydrateVulnerabilities,
  investigations: hydrateInvestigations,
  response: hydrateResponse,
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
