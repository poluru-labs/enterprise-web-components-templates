import { renderOverview, hydrateOverview } from './overview.js';
import { renderSearch, hydrateSearch } from './search.js';
import { renderOrganizations, hydrateOrganizations } from './organizations.js';
import { renderOrgDetail, hydrateOrgDetail } from './org-detail.js';
import { renderMembers, hydrateMembers } from './members.js';
import { renderPlans, hydratePlans } from './plans.js';
import { renderFlags, hydrateFlags } from './flags.js';
import { renderUsage, hydrateUsage } from './usage.js';
import { renderIncidents, hydrateIncidents } from './incidents.js';
import { renderAudit, renderSettings, hydrateAudit, hydrateSettings } from './audit.js';

export function renderView(route) {
  if (route.name === 'org') return renderOrgDetail(route);
  const pages = {
    overview: renderOverview,
    search: () => renderSearch(route.query ?? ''),
    organizations: renderOrganizations,
    members: renderMembers,
    plans: renderPlans,
    flags: renderFlags,
    usage: renderUsage,
    incidents: renderIncidents,
    audit: renderAudit,
    settings: renderSettings,
  };
  return (pages[route.name] ?? renderOverview)();
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) hydrateOverview(root);
  if (route.name === 'search') hydrateSearch(root, route.query ?? '');
  if (route.name === 'organizations') hydrateOrganizations(root);
  if (route.name === 'org') hydrateOrgDetail(root, route);
  if (route.name === 'members') hydrateMembers(root);
  if (route.name === 'plans') hydratePlans(root);
  if (route.name === 'flags') hydrateFlags(root);
  if (route.name === 'usage') hydrateUsage(root);
  if (route.name === 'incidents') hydrateIncidents(root);
  if (route.name === 'audit') hydrateAudit(root);
  if (route.name === 'settings') hydrateSettings(root);
}
