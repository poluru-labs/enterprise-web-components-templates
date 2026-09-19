import { renderOverview, hydrateOverview } from './overview.js';
import { renderCatalog, hydrateCatalog } from './catalog.js';
import { renderAsset, hydrateAsset } from './asset.js';
import { renderOwners, hydrateOwners } from './owners.js';
import { renderLineage, hydrateLineage } from './lineage.js';
import { renderQuality, hydrateQuality } from './quality.js';
import { renderClassifications, hydrateClassifications } from './classifications.js';
import { renderAccess, hydrateAccess } from './access.js';
import { renderGlossary, hydrateGlossary } from './glossary.js';
import { renderPolicies, hydratePolicies } from './policies.js';
import { renderIssues, hydrateIssues } from './issues.js';
import { renderSettings, hydrateSettings } from './settings.js';
import { renderSearch, hydrateSearch } from './search.js';

const views = {
  overview: renderOverview,
  catalog: renderCatalog,
  asset: renderAsset,
  owners: renderOwners,
  lineage: renderLineage,
  quality: renderQuality,
  classifications: renderClassifications,
  access: renderAccess,
  glossary: renderGlossary,
  policies: renderPolicies,
  issues: renderIssues,
  settings: renderSettings,
  search: renderSearch,
};

const hydrators = {
  overview: hydrateOverview,
  catalog: hydrateCatalog,
  asset: hydrateAsset,
  owners: hydrateOwners,
  lineage: hydrateLineage,
  quality: hydrateQuality,
  classifications: hydrateClassifications,
  access: hydrateAccess,
  glossary: hydrateGlossary,
  policies: hydratePolicies,
  issues: hydrateIssues,
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
