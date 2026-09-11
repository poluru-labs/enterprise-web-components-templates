import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { alerts } from '../data/index.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderAlerts() {
  return `
    ${pageHeader({
      eyebrow: 'Detection',
      title: 'Alerts',
      lead: 'Kavya Poluru holds the live queue. Priya Poluru owns EDR. Anika Poluru reads the finance phish.',
      actions: '<eds-button id="alerts-ack" variant="primary" icon="check">Acknowledge selected</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="al-search" placeholder="Filter alerts" clearable></eds-search>
      <eds-select id="al-status" label="Status"></eds-select>
      <eds-select id="al-severity" label="Severity"></eds-select>
    `)}
    <div id="al-grid"></div>
    <eds-empty-state id="al-empty" hidden heading="No matches" description="Try a source, owner, or asset." icon="search"></eds-empty-state>
  `;
}

function alertCards(list) {
  return `
    <section class="card-grid" aria-label="Alerts">
      ${list
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.source}</h2>
            ${statusChip(item.severity)}
          </div>
          <div class="item-meta">
            <strong>${item.title}</strong>
            <span class="muted">${item.owner} · ${item.asset}</span>
            <span class="muted">${formatDateTime(item.seen)}</span>
          </div>
          <div slot="footer" class="inline-actions">
            ${statusChip(item.status)}
            <eds-button class="ack-btn" variant="primary" data-id="${item.id}">Acknowledge</eds-button>
          </div>
        </content-card>`,
        )
        .join('')}
    </section>
  `;
}

export function hydrateAlerts(root) {
  const grid = root.querySelector('#al-grid');
  const empty = root.querySelector('#al-empty');
  const search = root.querySelector('#al-search');
  const status = root.querySelector('#al-status');
  const severity = root.querySelector('#al-severity');

  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Triaged', value: 'triaged' },
      { label: 'Watch', value: 'watch' },
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
    let hits = searchRecords(alerts, search?.value ?? '', ['title', 'source', 'owner', 'asset', 'severity']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (severity?.value) hits = hits.filter((item) => item.severity === severity.value);
    if (grid) grid.innerHTML = hits.length ? alertCards(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
    root.querySelectorAll('.ack-btn').forEach((btn) => {
      btn.addEventListener('eds-click', (event) => {
        event.stopPropagation();
        const item = alerts.find((entry) => entry.id === btn.getAttribute('data-id'));
        showToast({ message: `${item?.title || 'Alert'} acknowledged (demo)`, variant: 'success' });
      });
    });
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  severity?.addEventListener('eds-change', paint);
  root.querySelector('#alerts-ack')?.addEventListener('eds-click', () => {
    showToast({ message: 'Open alerts acknowledged (demo)', variant: 'success' });
  });
}
