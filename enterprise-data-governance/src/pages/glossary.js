import { glossary, glossaryColumns } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderGlossary() {
  return `
    ${pageHeader({
      eyebrow: 'Glossary',
      title: 'Business terms',
      lead: 'Shared language for gold assets. Owned by the same people who own the tables.',
      actions: `<eds-button variant="primary" icon="plus" id="add-term">Add term</eds-button>`,
    })}
    ${sheet({
      title: 'Terms',
      body: `<eds-search id="term-search" placeholder="Find a term" clearable></eds-search>
        <eds-data-table id="term-table" sortable></eds-data-table>`,
    })}
    <div class="card-grid">
      ${glossary
        .slice(0, 4)
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.term}</h2>
            <eds-tag label="${item.domain}" variant="brand"></eds-tag>
          </div>
          <p class="muted mb-3">${item.definition}</p>
          <p class="asset-meta">${item.owner}</p>
        </content-card>`,
        )
        .join('')}
    </div>
  `;
}

export function hydrateGlossary(root) {
  const table = root.querySelector('#term-table');
  const search = root.querySelector('#term-search');
  const paint = (query = '') => {
    const rows = glossary.filter((item) => `${item.term} ${item.definition} ${item.owner}`.toLowerCase().includes(query));
    if (table) {
      table.columns = glossaryColumns;
      table.rows = rows;
    }
  };
  paint();
  search?.addEventListener('eds-input', (event) => paint((event.detail?.value || '').toLowerCase()));
  root.querySelector('#add-term')?.addEventListener('eds-click', () => document.querySelector('#term-modal')?.show());
}
