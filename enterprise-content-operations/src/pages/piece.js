import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { approvals, assets, locales, pieces } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';
import { statusLabel } from '../lib/status.js';

export function renderPiece(route) {
  const item = pieces.find((entry) => entry.id === route.id) || pieces[0];
  return `
    ${pageHeader({
      eyebrow: item.code,
      title: item.title,
      lead: `${statusLabel(item.desk)} · ${item.words} words. ${item.owner} on the file. Ships ${item.ship}.`,
      actions: `
        <eds-button-group>
          <eds-button id="pc-approve" variant="primary" icon="check">Send to Asha</eds-button>
          <eds-button id="pc-schedule" variant="secondary" icon="clock">Schedule</eds-button>
        </eds-button-group>
      `,
    })}
    <div class="row g-3">
      <div class="col-lg-7">
        ${sheet({
          title: 'File',
          action: statusChip(item.status),
          body: `
            <eds-stepper id="pc-steps"></eds-stepper>
            <eds-divider class="my-3"></eds-divider>
            <eds-description-list id="pc-dl" columns="2"></eds-description-list>
            <eds-textarea class="mt-3" id="pc-note" label="Desk note" rows="3" placeholder="Note for Kavya Poluru"></eds-textarea>
            <div class="tag-row">
              <eds-tag label="${statusLabel(item.desk)}" variant="neutral"></eds-tag>
              <eds-tag label="${item.locale}" variant="brand"></eds-tag>
              <eds-tag label="${item.words} words" variant="success"></eds-tag>
            </div>`,
        })}
        ${sheet({
          title: 'Desk notes',
          body: `
            <eds-accordion single>
              <eds-accordion-item heading="Copy" open>
                <p class="muted mb-0">Kavya Poluru holds the line edit. Harborwell numbers still need a source line from Mira Poluru.</p>
              </eds-accordion-item>
              <eds-accordion-item heading="Legal">
                <p class="muted mb-0">Maya Poluru signs fire and ransomware files. Quill stays embargoed until the photo pack clears.</p>
              </eds-accordion-item>
              <eds-accordion-item heading="Locales">
                <p class="muted mb-0">Nikhil Poluru starts ES after English locks. Flare is already in Spanish.</p>
              </eds-accordion-item>
            </eds-accordion>`,
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'On this file',
          body: '<eds-timeline id="pc-timeline"></eds-timeline>',
        })}
      </div>
    </div>
  `;
}

export function hydratePiece(root, route) {
  const item = pieces.find((entry) => entry.id === route.id) || pieces[0];
  const relatedApprovals = approvals.filter((entry) => entry.piece === item.code).slice(0, 2);
  const relatedAssets = assets.filter((entry) => entry.used === item.code).slice(0, 2);
  const relatedLocales = locales.filter((entry) => entry.piece === item.title).slice(0, 2);

  const steps = root.querySelector('#pc-steps');
  if (steps) {
    steps.steps = [
      { label: 'Draft', description: item.author },
      { label: 'Copy', description: 'Kavya Poluru' },
      { label: 'Approve', description: 'Asha Poluru' },
      { label: 'Ship', description: 'Rohan Poluru' },
    ];
    const map = { draft: 0, copy: 1, approve: 2, ship: 3 };
    steps.current = map[item.stage] ?? 0;
  }

  const list = root.querySelector('#pc-dl');
  if (list) {
    list.items = [
      { term: 'Code', description: item.code },
      { term: 'Stage', description: statusLabel(item.stage) },
      { term: 'Owner', description: item.owner },
      { term: 'Author', description: item.author },
      { term: 'Locale', description: item.locale },
      { term: 'Ship date', description: item.ship },
    ];
  }

  const timeline = root.querySelector('#pc-timeline');
  if (timeline) {
    timeline.items = [
      { label: `${statusLabel(item.stage)} · ${item.owner}`, description: statusLabel(item.desk), timestamp: 'Today', icon: 'check' },
      ...relatedApprovals.map((entry) => ({
        label: `${statusLabel(entry.status)} · ${entry.reviewer}`,
        description: entry.desk,
        timestamp: entry.date,
        icon: 'star',
      })),
      ...relatedAssets.map((entry) => ({
        label: entry.name,
        description: entry.owner,
        timestamp: entry.kind,
        icon: 'folder',
      })),
      ...relatedLocales.map((entry) => ({
        label: `${entry.code} ${entry.coverage}%`,
        description: entry.owner,
        timestamp: entry.name,
        icon: 'copy',
      })),
    ];
  }

  root.querySelector('#pc-approve')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.code} stays with ${item.owner}`, variant: 'info' });
    window.location.hash = '#/approvals';
  });
  root.querySelector('#pc-schedule')?.addEventListener('eds-click', () => {
    window.location.hash = '#/schedule';
  });
}
