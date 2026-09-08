import { renderOverview, hydrateOverview } from './overview.js';
import { renderRequests, hydrateRequests } from './requests.js';
import { renderRequestDetail, hydrateRequestDetail } from './request-detail.js';
import { renderApprovals, hydrateApprovals } from './approvals.js';
import { renderSuppliers, hydrateSuppliers } from './suppliers.js';
import { renderContracts, hydrateContracts } from './contracts.js';
import { renderSpend, hydrateSpend } from './spend.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  requests: renderRequests,
  request: renderRequestDetail,
  approvals: renderApprovals,
  suppliers: renderSuppliers,
  contracts: renderContracts,
  spend: renderSpend,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  requests: hydrateRequests,
  request: hydrateRequestDetail,
  approvals: hydrateApprovals,
  suppliers: hydrateSuppliers,
  contracts: hydrateContracts,
  spend: hydrateSpend,
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
