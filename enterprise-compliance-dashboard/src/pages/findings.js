import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { findings } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';
import { severityTone, statusLabel } from '../lib/status.js';

export function renderFindings() {
  return `
    ${pageHeader({
      eyebrow: 'Exceptions',
      title: 'Findings',
      lead: 'Priya Poluru tracks close-out. Two high items sit with Maya Poluru and Anika Poluru before 18 Sep.',
    })}
    ${filterBar(`
      <eds-search id="fnd-search" placeholder="Filter findings" clearable></eds-search>
      <eds-select id="fnd-status" label="Status"></eds-select>
    `)}
    <div class="card-grid cols-2" id="fnd-grid"></div>
    <eds-empty-state id="fnd-empty" hidden heading="No matches" description="Try an owner or audit." icon="search"></eds-empty-state>
  `;
}

function findingCard(item) {
  return `
    <content-card>
      <div slot="header" class="section-title">
        <h2>${item.title}</h2>
        <eds-badge label="${statusLabel(item.severity)}" variant="${severityTone(item.severity)}" pill></eds-badge>
      </div>
      <div class="finding-meta">
        <span class="muted">${item.owner} · ${item.audit}</span>
        <strong>Due ${item.due}</strong>
      </div>
      <div slot="footer" class="inline-actions">
        ${statusChip(item.status)}
        <eds-button class="close-fnd" variant="primary" data-id="${item.id}">Close</eds-button>
      </div>
    </content-card>
  `;
}

export function hydrateFindings(root) {
  const grid = root.querySelector('#fnd-grid');
  const empty = root.querySelector('#fnd-empty');
  const search = root.querySelector('#fnd-search');
  const status = root.querySelector('#fnd-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Watch', value: 'watch' },
      { label: 'In progress', value: 'in_progress' },
      { label: 'Closed', value: 'closed' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(findings, search?.value ?? '', ['title', 'owner', 'audit', 'severity']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = hits.map((item) => findingCard(item)).join('');
    if (empty) empty.hidden = hits.length > 0;
    root.querySelectorAll('.close-fnd').forEach((btn) => {
      btn.addEventListener('eds-click', (event) => {
        event.stopPropagation();
        const item = findings.find((entry) => entry.id === btn.getAttribute('data-id'));
        showToast({ message: `${item?.title || 'Finding'} closed (demo)`, variant: 'success' });
      });
    });
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
}
