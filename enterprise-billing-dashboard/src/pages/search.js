import { buildSearchIndex, searchIndex } from '../lib/search.js';
import { customers, invoices, payments, subscriptions } from '../data/index.js';
import { contentCard, emptyState, pageHeader } from '../components/widgets.js';

const searchHits = buildSearchIndex({ invoices, customers, payments, subscriptions });

export function renderSearch(query = '') {
  return `
    ${pageHeader({
      eyebrow: 'Ledger',
      title: 'Search',
      lead: 'Find invoices, customers, payments, and subscriptions across the book.',
    })}
    <section class="sheet">
      <eds-search id="ledger-search" placeholder="Search ID, company, or contact" clearable value="${query}"></eds-search>
      <div id="search-results" class="mt-3"></div>
      ${emptyState({
        id: 'search-empty',
        heading: 'No matches',
        description: 'Try an invoice ID, company name, or contact.',
        action: '<eds-button id="clear-search" slot="actions" variant="primary">Clear search</eds-button>',
      })}
    </section>
    <section class="row g-3 mt-1 stretch-grid">
      ${[
        { title: 'Quick filters', body: `
            <div class="inline-actions">
              <eds-button class="search-chip" data-q="overdue" variant="secondary">Overdue</eds-button>
              <eds-button class="search-chip" data-q="pending" variant="secondary">Pending</eds-button>
              <eds-button class="search-chip" data-q="poluru" variant="secondary">Poluru contacts</eds-button>
              <eds-button class="search-chip" data-q="enterprise" variant="secondary">Enterprise</eds-button>
            </div>
          ` },
        { title: 'Search tips', body: `
            <p class="muted mb-1">Use invoice IDs like <strong>INV-2841</strong> or company names like <strong>Harbor</strong>.</p>
            <p class="muted mb-0">Press <kbd>⌘K</kbd> from anywhere to jump here with focus.</p>
          ` },
        { title: 'Collections queue', body: `
            <p class="ledger-amount mb-1">3</p>
            <p class="muted mb-0">Overdue invoices in dunning. Open Nimbus, Lumen, or Fieldwork from the watch list.</p>
            <div class="inline-actions"><eds-link href="#/invoices" variant="default">Open ledger</eds-link></div>
          ` },
        { title: 'Saved views', body: `
            <p class="muted mb-1">Past due Scale plans, September drafts, and Enterprise annual renewals.</p>
            <p class="muted mb-0">Views follow the signed-in operator, Priya Poluru.</p>
          ` },
      ]
        .map(
          (item) => `
        <div class="col-sm-6 col-xl-3">
          ${contentCard(item)}
        </div>`,
        )
        .join('')}
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
  const search = root.querySelector('#ledger-search');
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
