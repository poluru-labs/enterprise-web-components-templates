import { renderOverview, hydrateOverview } from './overview.js';
import { renderPolicies, hydratePolicies } from './policies.js';
import { renderPolicyDetail, hydratePolicyDetail } from './policy-detail.js';
import { renderControls, hydrateControls } from './controls.js';
import { renderAudits, hydrateAudits } from './audits.js';
import { renderTasks, hydrateTasks } from './tasks.js';
import { renderEvidence, hydrateEvidence } from './evidence.js';
import { renderFindings, hydrateFindings } from './findings.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  policies: renderPolicies,
  policy: renderPolicyDetail,
  controls: renderControls,
  audits: renderAudits,
  tasks: renderTasks,
  evidence: renderEvidence,
  findings: renderFindings,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  policies: hydratePolicies,
  policy: hydratePolicyDetail,
  controls: hydrateControls,
  audits: hydrateAudits,
  tasks: hydrateTasks,
  evidence: hydrateEvidence,
  findings: hydrateFindings,
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
