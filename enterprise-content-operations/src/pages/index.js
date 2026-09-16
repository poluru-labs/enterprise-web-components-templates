import { renderOverview, hydrateOverview } from './overview.js';
import { renderCalendar, hydrateCalendar } from './calendar.js';
import { renderPiece, hydratePiece } from './piece.js';
import { renderApprovals, hydrateApprovals } from './approvals.js';
import { renderLocales, hydrateLocales } from './locales.js';
import { renderSchedule, hydrateSchedule } from './schedule.js';
import { renderAssets, hydrateAssets } from './assets.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  calendar: renderCalendar,
  piece: renderPiece,
  approvals: renderApprovals,
  locales: renderLocales,
  schedule: renderSchedule,
  assets: renderAssets,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  calendar: hydrateCalendar,
  piece: hydratePiece,
  approvals: hydrateApprovals,
  locales: hydrateLocales,
  schedule: hydrateSchedule,
  assets: hydrateAssets,
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
