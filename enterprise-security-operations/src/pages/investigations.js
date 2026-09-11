import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { investigations } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderInvestigations() {
  return `
    ${pageHeader({
      eyebrow: 'DFIR',
      title: 'Investigations',
      lead: 'Ishaan Poluru holds CASE-12. Nikhil Poluru builds the laptop timeline. Anika Poluru clusters the mailbox.',
    })}
    ${filterBar(`
      <eds-search id="case-search" placeholder="Filter cases" clearable></eds-search>
      <eds-select id="case-status" label="Status"></eds-select>
    `)}
    <div class="card-grid cols-2" id="case-grid"></div>
    <eds-empty-state id="case-empty" hidden heading="No matches" description="Try a case code or owner." icon="search"></eds-empty-state>
  `;
}

function caseCard(item) {
  return `
    <content-card>
      <div slot="header" class="section-title">
        <h2>${item.code}</h2>
        ${statusChip(item.severity)}
      </div>
      <div class="item-meta">
        <strong>${item.title}</strong>
        <span class="muted">${item.owner} · linked ${item.linked}</span>
        <span class="muted">Updated ${item.updated}</span>
      </div>
      <div slot="footer" class="inline-actions">
        ${statusChip(item.status)}
        <eds-button class="review-btn" variant="primary" data-id="${item.id}">Ask Subbu</eds-button>
      </div>
    </content-card>
  `;
}

export function hydrateInvestigations(root) {
  const grid = root.querySelector('#case-grid');
  const empty = root.querySelector('#case-empty');
  const search = root.querySelector('#case-search');
  const status = root.querySelector('#case-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'In progress', value: 'in_progress' },
      { label: 'Watch', value: 'watch' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(investigations, search?.value ?? '', ['code', 'title', 'owner', 'linked']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = hits.map((item) => caseCard(item)).join('');
    if (empty) empty.hidden = hits.length > 0;
    root.querySelectorAll('.review-btn').forEach((btn) => {
      btn.addEventListener('eds-click', (event) => {
        event.stopPropagation();
        const item = investigations.find((entry) => entry.id === btn.getAttribute('data-id'));
        showToast({ message: `${item?.code || 'Case'} sent to Subbu Poluru (demo)`, variant: 'info' });
      });
    });
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
