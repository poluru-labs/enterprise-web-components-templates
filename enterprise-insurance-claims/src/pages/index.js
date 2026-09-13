import { renderOverview, hydrateOverview } from './overview.js';
import { renderClaims, hydrateClaims } from './claims.js';
import { renderClaim, hydrateClaim } from './claim.js';
import { renderAdjusters, hydrateAdjusters } from './adjusters.js';
import { renderPolicies, hydratePolicies } from './policies.js';
import { renderFraud, hydrateFraud } from './fraud.js';
import { renderSettlements, hydrateSettlements } from './settlements.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  claims: renderClaims,
  claim: renderClaim,
  adjusters: renderAdjusters,
  policies: renderPolicies,
  fraud: renderFraud,
  settlements: renderSettlements,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  claims: hydrateClaims,
  claim: hydrateClaim,
  adjusters: hydrateAdjusters,
  policies: hydratePolicies,
  fraud: hydrateFraud,
  settlements: hydrateSettlements,
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
