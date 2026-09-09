import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { policies } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderPolicyDetail(route) {
  const item = policies.find((entry) => entry.id === route.id) || policies[0];
  return `
    ${pageHeader({
      eyebrow: item.code,
      title: item.name,
      lead: `${item.owner} holds v${item.version}. Primary framework ${item.framework}. Next review ${item.review}.`,
      actions: `
        <eds-button id="pol-publish" variant="primary" icon="check">Publish</eds-button>
        <eds-button id="pol-review" variant="secondary" icon="eye">Send to review</eds-button>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'Policy',
          action: statusChip(item.status),
          body: `
            <dl class="detail-grid">
              <div><dt>Code</dt><dd>${item.code}</dd></div>
              <div><dt>Owner</dt><dd>${item.owner}</dd></div>
              <div><dt>Framework</dt><dd>${item.framework}</dd></div>
              <div><dt>Version</dt><dd>${item.version}</dd></div>
              <div><dt>Updated</dt><dd>${item.updated}</dd></div>
              <div><dt>Review</dt><dd>${item.review}</dd></div>
            </dl>
            <p class="muted mt-3 mb-0">Subbu Poluru’s desk holds the packet until ${item.owner} publishes or Elena Poluru countersigns.</p>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Approval trail',
          body: '<eds-timeline id="pol-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydratePolicyDetail(root, route) {
  const item = policies.find((entry) => entry.id === route.id) || policies[0];
  const timeline = root.querySelector('#pol-timeline');
  if (timeline) {
    timeline.items = [
      { label: 'Drafted', description: item.owner, timestamp: 'Opened', icon: 'file' },
      { label: 'Legal read', description: 'Elena Poluru · counsel', timestamp: 'Same week', icon: 'user' },
      { label: 'Current state', description: item.status, timestamp: item.updated, icon: 'clock' },
    ];
  }
  root.querySelector('#pol-publish')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} published (demo)`, variant: 'success' });
  });
  root.querySelector('#pol-review')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} sent to Elena Poluru (demo)`, variant: 'info' });
  });
}
