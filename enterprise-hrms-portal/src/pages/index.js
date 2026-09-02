import { renderOverview, hydrateOverview } from './overview.js';
import { renderPeople, hydratePeople } from './people.js';
import { renderPersonDetail, hydratePersonDetail } from './person-detail.js';
import { renderLeave, hydrateLeave } from './leave.js';
import { renderHiring, hydrateHiring } from './hiring.js';
import { renderOrg, hydrateOrg } from './org.js';
import { renderLearning, hydrateLearning } from './learning.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  people: renderPeople,
  person: renderPersonDetail,
  leave: renderLeave,
  hiring: renderHiring,
  org: renderOrg,
  learning: renderLearning,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  people: hydratePeople,
  person: hydratePersonDetail,
  leave: hydrateLeave,
  hiring: hydrateHiring,
  org: hydrateOrg,
  learning: hydrateLearning,
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
