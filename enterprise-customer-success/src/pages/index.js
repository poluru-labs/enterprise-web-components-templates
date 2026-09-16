import { renderOverview, hydrateOverview } from './overview.js';
import { renderAccounts, hydrateAccounts } from './accounts.js';
import { renderAccount, hydrateAccount } from './account.js';
import { renderHealth, hydrateHealth } from './health.js';
import { renderRenewals, hydrateRenewals } from './renewals.js';
import { renderOnboarding, hydrateOnboarding } from './onboarding.js';
import { renderExpansion, hydrateExpansion } from './expansion.js';
import { renderPlaybooks, hydratePlaybooks } from './playbooks.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  accounts: renderAccounts,
  account: renderAccount,
  health: renderHealth,
  renewals: renderRenewals,
  onboarding: renderOnboarding,
  expansion: renderExpansion,
  playbooks: renderPlaybooks,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  accounts: hydrateAccounts,
  account: hydrateAccount,
  health: hydrateHealth,
  renewals: hydrateRenewals,
  onboarding: hydrateOnboarding,
  expansion: hydrateExpansion,
  playbooks: hydratePlaybooks,
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
