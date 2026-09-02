import { renderOverview, hydrateOverview } from './overview.js';
import { renderProjects, hydrateProjects } from './projects.js';
import { renderProject, hydrateProject } from './project.js';
import { renderBoard, hydrateBoard } from './board.js';
import { renderTimeline, hydrateTimeline } from './timeline.js';
import { renderTasks, hydrateTasks } from './tasks.js';
import { renderSprints, hydrateSprints } from './sprints.js';
import { renderTeam, hydrateTeam } from './team.js';
import { renderRisks, hydrateRisks } from './risks.js';
import { renderTime, hydrateTime } from './time.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  projects: renderProjects,
  project: renderProject,
  board: renderBoard,
  timeline: renderTimeline,
  tasks: renderTasks,
  sprints: renderSprints,
  team: renderTeam,
  risks: renderRisks,
  time: renderTime,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  projects: hydrateProjects,
  project: hydrateProject,
  board: hydrateBoard,
  timeline: hydrateTimeline,
  tasks: hydrateTasks,
  sprints: hydrateSprints,
  team: hydrateTeam,
  risks: hydrateRisks,
  time: hydrateTime,
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
