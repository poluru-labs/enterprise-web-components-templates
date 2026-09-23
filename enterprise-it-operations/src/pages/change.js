import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { changeSteps, changes } from '../data/index.js';
import { pageHeader, sheet, statusChip } from '../components/widgets.js';

const STEP_INDEX = {
  Draft: 0,
  Approved: 1,
  Scheduled: 1,
  'In window': 2,
  Watch: 1,
  Closed: 3,
};

export function renderChange(route) {
  const item = changes.find((row) => row.id === route.id) || changes[0];
  return `
    ${pageHeader({
      eyebrow: `${item.type} · ${item.ci}`,
      title: item.id,
      lead: item.title,
      actions: `
        <eds-button variant="secondary" icon="calendar" id="open-window">Adjust window</eds-button>
        <eds-button variant="primary" icon="check" id="approve-change">Approve</eds-button>
      `,
    })}
    <eds-alert variant="${item.risk === 'High' ? 'warning' : 'info'}" title="${item.status}" message="Implementer ${item.owner}. CAB ${item.cab}. Window ${item.window}."></eds-alert>
    <div class="mt-4">
      ${sheet({
        title: 'CAB path',
        body: '<eds-stepper id="chg-stepper"></eds-stepper>',
      })}
    </div>
    <div class="split">
      ${sheet({
        title: 'Record',
        body: `<eds-description-list id="chg-meta" columns="2" compact></eds-description-list>
          <div class="tag-row mt-4">${statusChip(item.status)}${statusChip(item.risk)}<eds-tag label="${item.type}" variant="neutral"></eds-tag></div>`,
      })}
      ${sheet({
        title: 'Checks',
        body: `<div class="stack">
          <eds-checkbox label="Backout plan attached" checked></eds-checkbox>
          <eds-checkbox label="Service owner notified" checked></eds-checkbox>
          <eds-checkbox label="Monitoring watch set"></eds-checkbox>
          <eds-accordion>
            <eds-accordion-item heading="Implementation notes" open>
              <p>Start at the window. Verify replica lag under 2 seconds before cutting writes. Page Priya Poluru if lag holds above 5 seconds for 3 minutes.</p>
            </eds-accordion-item>
          </eds-accordion>
        </div>`,
      })}
    </div>
  `;
}

export function hydrateChange(root, route) {
  const item = changes.find((row) => row.id === route.id) || changes[0];
  const stepper = root.querySelector('#chg-stepper');
  if (stepper) {
    stepper.steps = changeSteps;
    stepper.current = STEP_INDEX[item.status] ?? 0;
  }
  const meta = root.querySelector('#chg-meta');
  if (meta) {
    meta.items = [
      { term: 'Owner', description: item.owner },
      { term: 'CI', description: item.ci },
      { term: 'Window', description: item.window },
      { term: 'CAB', description: item.cab },
      { term: 'Type', description: item.type },
      { term: 'Risk', description: item.risk },
    ];
  }
  root.querySelector('#open-window')?.addEventListener('eds-click', () => document.querySelector('#change-modal')?.show());
  root.querySelector('#approve-change')?.addEventListener('eds-click', () => {
    showToast({ message: `${item.id} approved for the window`, variant: 'success' });
  });
}
