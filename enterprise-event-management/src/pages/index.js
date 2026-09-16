import { renderOverview, hydrateOverview } from './overview.js';
import { renderEvents, hydrateEvents } from './events.js';
import { renderEvent, hydrateEvent } from './event.js';
import { renderRegistrations, hydrateRegistrations } from './registrations.js';
import { renderVenues, hydrateVenues } from './venues.js';
import { renderSpeakers, hydrateSpeakers } from './speakers.js';
import { renderSchedule, hydrateSchedule } from './schedule.js';
import { renderSponsors, hydrateSponsors } from './sponsors.js';
import { renderAttendance, hydrateAttendance } from './attendance.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  events: renderEvents,
  event: renderEvent,
  registrations: renderRegistrations,
  venues: renderVenues,
  speakers: renderSpeakers,
  schedule: renderSchedule,
  sponsors: renderSponsors,
  attendance: renderAttendance,
  reports: renderReports,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  events: hydrateEvents,
  event: hydrateEvent,
  registrations: hydrateRegistrations,
  venues: hydrateVenues,
  speakers: hydrateSpeakers,
  schedule: hydrateSchedule,
  sponsors: hydrateSponsors,
  attendance: hydrateAttendance,
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
