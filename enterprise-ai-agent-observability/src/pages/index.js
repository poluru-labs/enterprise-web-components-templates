import { renderOverview, hydrateOverview } from './overview.js';
import { renderScorecards, hydrateScorecards } from './scorecards.js';
import { renderScorecard, hydrateScorecard } from './scorecard.js';
import { renderGoals, hydrateGoals } from './goals.js';
import { renderTrends, hydrateTrends } from './trends.js';
import { renderTeams, hydrateTeams } from './teams.js';
import { renderAlerts, hydrateAlerts } from './alerts.js';
import { renderReviews, hydrateReviews } from './reviews.js';
import { renderBenchmarks, hydrateBenchmarks } from './benchmarks.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  scorecards: renderScorecards,
  scorecard: renderScorecard,
  goals: renderGoals,
  trends: renderTrends,
  teams: renderTeams,
  alerts: renderAlerts,
  reviews: renderReviews,
  benchmarks: renderBenchmarks,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  scorecards: hydrateScorecards,
  scorecard: hydrateScorecard,
  goals: hydrateGoals,
  trends: hydrateTrends,
  teams: hydrateTeams,
  alerts: hydrateAlerts,
  reviews: hydrateReviews,
  benchmarks: hydrateBenchmarks,
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
