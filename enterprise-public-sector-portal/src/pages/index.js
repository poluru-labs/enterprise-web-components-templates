import { renderOverview, hydrateOverview } from './overview.js';
import { renderRequests, hydrateRequests } from './requests.js';
import { renderRequest, hydrateRequest } from './request.js';
import { renderPermits, hydratePermits } from './permits.js';
import { renderCases, hydrateCases } from './cases.js';
import { renderDepartments, hydrateDepartments } from './departments.js';
import { renderBudgets, hydrateBudgets } from './budgets.js';
import { renderService, hydrateService } from './service.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  requests: renderRequests,
  request: renderRequest,
  permits: renderPermits,
  cases: renderCases,
  departments: renderDepartments,
  budgets: renderBudgets,
  service: renderService,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  requests: hydrateRequests,
  request: hydrateRequest,
  permits: hydratePermits,
  cases: hydrateCases,
  departments: hydrateDepartments,
  budgets: hydrateBudgets,
  service: hydrateService,
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
