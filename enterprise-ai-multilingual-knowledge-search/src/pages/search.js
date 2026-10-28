import { buildSearchCatalog } from '../data/index.js';
import { emptyState, pageHeader, sheet } from '../components/widgets.js';
import { searchIndex } from '../lib/search.js';

const catalog = buildSearchCatalog();
const index = searchIndex(catalog);

export function renderSearch(route) {
  const query = decodeURIComponent(route.id || '');
  return `
    ${pageHeader({
      eyebrow: 'Search',
      title: query ? `Results for “${query}”` : 'Search Horizon',
      lead: 'Locales, gaps, goals, people, and reports across Lexicon.',
    })}
    ${sheet({
      title: 'Matches',
      body: `
        <eds-search id="page-search" placeholder="Search locales, gaps, people…" value="${query.replace(/"/g, '&quot;')}" clearable></eds-search>
        <eds-list id="search-results" divided class="mt-4"></eds-list>
        ${emptyState({
          id: 'search-empty',
          heading: 'No matches',
          description: 'Try a locale pack, gap title, or Poluru owner.',
        })}
      `,
    })}
  `;
}

export function hydrateSearch(root, route) {
  const list = root.querySelector('#search-results');
  const empty = root.querySelector('#search-empty');
  const input = root.querySelector('#page-search');

  const paint = (query) => {
    const needle = String(query ?? '').trim().toLowerCase();
    const hits = needle ? index.filter((item) => item.haystack.includes(needle)) : index.slice(0, 12);
    if (list) {
      list.items = hits.map((item) => ({
        label: item.label,
        description: `${item.type} · ${item.description}`,
        icon: 'search',
      }));
    }
    if (empty) empty.hidden = hits.length > 0;
  };

  paint(decodeURIComponent(route.id || ''));
  input?.addEventListener('eds-change', (event) => {
    const value = event.detail?.value ?? '';
    window.location.hash = value.trim() ? `#/search/${encodeURIComponent(value.trim())}` : '#/search';
  });
  list?.addEventListener('eds-select', (event) => {
    const hit = index.find((item) => item.label === event.detail?.label);
    if (hit?.href) window.location.hash = hit.href;
  });
}
