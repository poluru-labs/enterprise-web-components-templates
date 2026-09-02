import { renderOverview, hydrateOverview } from './overview.js';
import { renderTickets, hydrateTickets } from './tickets.js';
import { renderTicketDetail, hydrateTicketDetail } from './ticket-detail.js';
import { renderTeams, hydrateTeams } from './teams.js';
import { renderSla, hydrateSla } from './sla.js';
import { renderKnowledge, hydrateKnowledge } from './knowledge.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

export function renderView(route) {
  if (route.name === 'tickets' && route.id) return renderTicketDetail(route);
  const views = {
    overview: renderOverview,
    tickets: renderTickets,
    teams: renderTeams,
    sla: renderSla,
    knowledge: renderKnowledge,
    reports: renderReports,
    settings: renderSettings,
    search: renderSearch,
  };
  const render = views[route.name] || renderOverview;
  return render(route);
}

export function hydrateView(root, route) {
  if (route.name === 'tickets' && route.id) {
    hydrateTicketDetail(root, route);
    return;
  }
  const hydrators = {
    overview: hydrateOverview,
    tickets: hydrateTickets,
    teams: hydrateTeams,
    sla: hydrateSla,
    knowledge: hydrateKnowledge,
    reports: hydrateReports,
    settings: hydrateSettings,
    search: hydrateSearch,
  };
  const hydrate = hydrators[route.name] || hydrateOverview;
  hydrate(root, route);
}
