import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { playbooks } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderResponse() {
  return `
    ${pageHeader({
      eyebrow: 'Playbooks',
      title: 'Response',
      lead: 'Maya Poluru runs account takeover. Ishaan Poluru isolates malware. Elena Poluru still drafts vendor lock.',
      actions: '<eds-button id="pb-run" variant="primary" icon="check">Run playbook</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="pb-search" placeholder="Filter playbooks" clearable></eds-search>
      <eds-select id="pb-status" label="Status"></eds-select>
    `)}
    <div class="card-grid" id="pb-grid"></div>
    <eds-empty-state id="pb-empty" hidden heading="No matches" description="Try a playbook name or owner." icon="search"></eds-empty-state>
  `;
}

function playbookCard(item) {
  return `
    <content-card>
      <div slot="header" class="section-title">
        <h2>${item.name}</h2>
        ${statusChip(item.status)}
      </div>
      <div class="item-meta">
        <strong>${item.steps} steps</strong>
        <span class="muted">${item.owner}</span>
        <span class="muted">${item.last}</span>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button class="run-btn" variant="primary" data-id="${item.id}">Run</eds-button>
      </div>
    </content-card>
  `;
}

export function hydrateResponse(root) {
  const grid = root.querySelector('#pb-grid');
  const empty = root.querySelector('#pb-empty');
  const search = root.querySelector('#pb-search');
  const status = root.querySelector('#pb-status');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Ready', value: 'ready' },
      { label: 'Watch', value: 'watch' },
      { label: 'Draft', value: 'draft' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(playbooks, search?.value ?? '', ['name', 'owner', 'last']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = hits.map((item) => playbookCard(item)).join('');
    if (empty) empty.hidden = hits.length > 0;
    root.querySelectorAll('.run-btn').forEach((btn) => {
      btn.addEventListener('eds-click', (event) => {
        event.stopPropagation();
        const item = playbooks.find((entry) => entry.id === btn.getAttribute('data-id'));
        showToast({ message: `${item?.name || 'Playbook'} started (demo)`, variant: 'success' });
      });
    });
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#pb-run')?.addEventListener('eds-click', () => {
    showToast({ message: 'Account takeover playbook started (demo)', variant: 'success' });
  });
}
