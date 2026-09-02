import { buildSearchIndex, searchIndex } from '../lib/search.js';
import { commandItems, flags, members, organizations } from '../data/index.js';
import { contentCard, emptyState, pageHeader } from '../components/widgets.js';

const searchHits = buildSearchIndex({ organizations, members, flags, commandItems });

export function renderSearch(query = '') {
  const safeQuery = String(query).replace(/"/g, '&quot;');
  return `
    ${pageHeader({
      eyebrow: 'Control plane',
      title: 'Search',
      lead: 'Find organizations, members, flags, and jump targets across Poluru Cloud.',
    })}
    <section class="sheet">
      <eds-search id="helio-search" placeholder="Search orgs, members, flags" clearable value="${safeQuery}"></eds-search>
      <div id="search-results" class="mt-3"></div>
      ${emptyState({
        id: 'search-empty',
        heading: 'No matches',
        description: 'Try an organization name, member email, or flag key.',
        action: '<eds-button id="clear-search" slot="actions" variant="primary">Clear search</eds-button>',
      })}
    </section>
    <section class="row g-3 mt-1 stretch-grid">
      <div class="col-lg-6">
        ${contentCard({
          title: 'Quick filters',
          body: `
            <div class="inline-actions">
              <eds-button class="search-chip" data-q="harbor" variant="secondary">Harbor</eds-button>
              <eds-button class="search-chip" data-q="poluru" variant="secondary">Poluru</eds-button>
              <eds-button class="search-chip" data-q="passkeys" variant="secondary">Passkeys</eds-button>
              <eds-button class="search-chip" data-q="enterprise" variant="secondary">Enterprise</eds-button>
            </div>
          `,
        })}
      </div>
      <div class="col-lg-6">
        ${contentCard({
          title: 'Search tips',
          body: `
            <p class="muted mb-1">Use org names like <strong>Harbor &amp; Co.</strong> or member emails like <strong>mira.poluru@polurulabs.example</strong>.</p>
            <p class="muted mb-0">Press <kbd>⌘K</kbd> from anywhere to jump here with focus.</p>
          `,
        })}
      </div>
    </section>
  `;
}

function paintSearchResults(root, query) {
  const hits = searchIndex(searchHits, query);
  const wrap = root.querySelector('#search-results');
  const empty = root.querySelector('#search-empty');
  if (!wrap) return;
  if (hits.length === 0) {
    wrap.innerHTML = '';
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  wrap.innerHTML = hits
    .map(
      (hit) => `
    <div class="search-hit">
      <div>
        <span class="kicker">${hit.type}</span>
        <p class="mb-0"><a href="${hit.href}">${hit.label}</a></p>
        <p class="muted mb-0">${hit.hint}</p>
      </div>
      <eds-badge label="${hit.type}" variant="brand" pill></eds-badge>
    </div>`,
    )
    .join('');
}

export function hydrateSearch(root, query = '') {
  const search = root.querySelector('#helio-search');
  const run = (value) => paintSearchResults(root, value);
  run(query);
  search?.addEventListener('eds-input', (event) => {
    run(event.detail?.value ?? event.target.value ?? '');
  });
  root.querySelector('#clear-search')?.addEventListener('eds-click', () => {
    if (search) search.value = '';
    run('');
  });
  root.querySelectorAll('.search-chip').forEach((chip) => {
    chip.addEventListener('eds-click', () => {
      const value = chip.dataset.q ?? '';
      if (search) search.value = value;
      run(value);
    });
  });
}

export { searchHits };
