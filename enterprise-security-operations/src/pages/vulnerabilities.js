import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { vulnerabilities } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, itemGrid, pageHeader, statusChip } from '../components/widgets.js';

export function renderVulnerabilities() {
  return `
    ${pageHeader({
      eyebrow: 'AppSec',
      title: 'Vulnerabilities',
      lead: 'Leela Poluru owns the kernel. Arjun Poluru holds OpenSSL. Dev Poluru watches the evidence bucket.',
      actions: '<eds-button id="vul-export" variant="secondary" icon="file">Export queue</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="vul-search" placeholder="Filter CVEs" clearable></eds-search>
      <eds-select id="vul-status" label="Status"></eds-select>
      <eds-select id="vul-severity" label="Severity"></eds-select>
    `)}
    <div id="vul-grid"></div>
    <eds-empty-state id="vul-empty" hidden heading="No matches" description="Try a CVE, asset, or owner." icon="search"></eds-empty-state>
  `;
}

function vulnCards(list) {
  return `
    <section class="card-grid" aria-label="Vulnerabilities">
      ${list
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.cve}</h2>
            ${statusChip(item.severity)}
          </div>
          <div class="item-meta">
            <strong>${item.title}</strong>
            <span class="muted">${item.owner} · ${item.asset}</span>
            <span class="muted">SLA ${item.sla}</span>
          </div>
          <div slot="footer" class="inline-actions">
            ${statusChip(item.status)}
            <eds-button class="patch-btn" variant="primary" data-id="${item.id}">Mark patched</eds-button>
          </div>
        </content-card>`,
        )
        .join('')}
    </section>
  `;
}

export function hydrateVulnerabilities(root) {
  const grid = root.querySelector('#vul-grid');
  const empty = root.querySelector('#vul-empty');
  const search = root.querySelector('#vul-search');
  const status = root.querySelector('#vul-status');
  const severity = root.querySelector('#vul-severity');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'In progress', value: 'in_progress' },
      { label: 'Watch', value: 'watch' },
      { label: 'Patched', value: 'patched' },
    ];
  }
  if (severity) {
    severity.options = [
      { label: 'All severities', value: '' },
      { label: 'Critical', value: 'critical' },
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ];
  }

  const paint = () => {
    let hits = searchRecords(vulnerabilities, search?.value ?? '', ['cve', 'title', 'owner', 'asset']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (severity?.value) hits = hits.filter((item) => item.severity === severity.value);
    if (grid) grid.innerHTML = hits.length ? vulnCards(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
    root.querySelectorAll('.patch-btn').forEach((btn) => {
      btn.addEventListener('eds-click', (event) => {
        event.stopPropagation();
        const item = vulnerabilities.find((entry) => entry.id === btn.getAttribute('data-id'));
        showToast({ message: `${item?.cve || 'CVE'} marked patched (demo)`, variant: 'success' });
      });
    });
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  severity?.addEventListener('eds-change', paint);
  root.querySelector('#vul-export')?.addEventListener('eds-click', () => {
    showToast({ message: 'Patch queue exported (demo)', variant: 'info' });
  });
}
