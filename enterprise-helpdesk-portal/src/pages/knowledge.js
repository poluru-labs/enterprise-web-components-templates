import { knowledgeArticles, knowledgeColumns } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader } from '../components/widgets.js';

export function renderKnowledge() {
  return `
    ${pageHeader({
      eyebrow: 'Self-service',
      title: 'Knowledge',
      lead: 'Runbooks and articles for analysts. Deflection rate is 34% this month.',
      actions: '<eds-button id="kb-create" variant="primary" icon="plus">New article</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="kb-search" placeholder="Search articles, categories, authors" clearable></eds-search>
      <eds-select id="kb-category" label="Category"></eds-select>
    `)}
    <eds-card padded>
      <eds-data-table id="kb-table" compact striped></eds-data-table>
    </eds-card>
  `;
}

export function hydrateKnowledge(root) {
  const table = root.querySelector('#kb-table');
  const search = root.querySelector('#kb-search');
  const category = root.querySelector('#kb-category');

  if (category) {
    category.options = [
      { label: 'All categories', value: '' },
      { label: 'Access', value: 'Access' },
      { label: 'Billing', value: 'Billing' },
      { label: 'Infrastructure', value: 'Infrastructure' },
      { label: 'Hardware', value: 'Hardware' },
      { label: 'Platform', value: 'Platform' },
      { label: 'Workflow', value: 'Workflow' },
    ];
  }

  const paint = () => {
    let rows = [...knowledgeArticles];
    rows = searchRecords(rows, search?.value ?? '', ['title', 'category', 'author']);
    if (category?.value) rows = rows.filter((item) => item.category === category.value);
    if (table) {
      table.columns = knowledgeColumns;
      table.rows = rows;
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  category?.addEventListener('eds-change', paint);
  root.querySelector('#kb-create')?.addEventListener('eds-click', () => {
    document.querySelector('#ticket-modal')?.show();
  });
}
