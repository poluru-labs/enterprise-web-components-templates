import { buildSearchCatalog } from '../data/index.js';
import { emptyState, pageHeader, sheet } from '../components/widgets.js';
import { searchIndex, buildSearchIndex } from '../lib/search.js';

const catalog = buildSearchIndex(buildSearchCatalog());

export function renderSearch(route) {
  const query = decodeURIComponent(route.id || '');
  return `
    ${pageHeader({
      eyebrow: 'Search',
      title: query ? `Results for “${query}”` : 'Search the catalog',
      lead: 'Assets, owners, rules, terms, and access requests.',
    })}
    ${sheet({
      title: 'Hits',
      body: `<eds-search id="page-search" placeholder="Search Verity" value="${query}" clearable></eds-search>
        <div id="search-hits"></div>
        ${emptyState({ id: 'search-empty', heading: 'Nothing matched', description: 'Try an owner, asset name, or term.' })}`,
    })}
  `;
}

export function hydrateSearch(root, route) {
  const input = root.querySelector('#page-search');
  const hits = root.querySelector('#search-hits');
  const empty = root.querySelector('#search-empty');
  const paint = (query) => {
    const rows = searchIndex(catalog, query);
    if (hits) {
      hits.innerHTML = rows
        .slice(0, 12)
        .map(
          (item) => `
        <a class="search-hit" href="${item.href || '#/overview'}">
          <span>
            <strong>${item.label}</strong>
            <small>${item.description || item.owner || ''}</small>
          </span>
          <eds-badge label="${item.type}" variant="neutral" pill></eds-badge>
        </a>`,
        )
        .join('');
    }
    if (empty) empty.hidden = rows.length > 0;
  };
  paint(route.id ? decodeURIComponent(route.id) : '');
  input?.addEventListener('eds-change', (event) => {
    const value = event.detail?.value || '';
    window.location.hash = value ? `#/search/${encodeURIComponent(value)}` : '#/search';
  });
}
