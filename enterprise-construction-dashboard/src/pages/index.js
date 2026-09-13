import { renderOverview, hydrateOverview } from './overview.js';
import { renderSites, hydrateSites } from './sites.js';
import { renderSite, hydrateSite } from './site.js';
import { renderBudgets, hydrateBudgets } from './budgets.js';
import { renderSchedule, hydrateSchedule } from './schedule.js';
import { renderRfis, hydrateRfis } from './rfis.js';
import { renderSubs, hydrateSubs } from './subcontractors.js';
import { renderSafety, hydrateSafety } from './safety.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  sites: renderSites,
  site: renderSite,
  budgets: renderBudgets,
  schedule: renderSchedule,
  rfis: renderRfis,
  subcontractors: renderSubs,
  safety: renderSafety,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  sites: hydrateSites,
  site: hydrateSite,
  budgets: hydrateBudgets,
  schedule: hydrateSchedule,
  rfis: hydrateRfis,
  subcontractors: hydrateSubs,
  safety: hydrateSafety,
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
