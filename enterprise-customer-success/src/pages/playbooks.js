import { playbooks, qbrs } from '../data/index.js';
import { cadenceList, pageHeader, sheet, statusChip } from '../components/widgets.js';

export function renderPlaybooks() {
  return `
    ${pageHeader({
      eyebrow: 'Runs',
      title: 'Playbooks',
      lead: 'Health recovery, 90-day renewal, first 60 days, seat attach, enterprise QBR, and detractor save.',
      actions: `<eds-button id="play-run" variant="primary" icon="plus">Start a run</eds-button>`,
    })}
    <div class="card-grid cols-2">
      ${playbooks
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.name}</h2>
            ${statusChip(item.status)}
          </div>
          <p class="muted mb-2">${item.trigger}</p>
          <p class="muted mb-3">${item.owner} · ${item.accounts} account${item.accounts === 1 ? '' : 's'} · ${item.steps} steps</p>
          <eds-progress-bar value="${item.status === 'Draft' ? 20 : 72}" max="100" label="${item.status === 'Draft' ? 'Draft' : 'In use'}" show-value></eds-progress-bar>
          <div slot="footer">
            <eds-button class="run-play" variant="secondary" data-id="${item.id}">Run</eds-button>
          </div>
        </content-card>`,
        )
        .join('')}
    </div>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-7">
        ${sheet({
          title: 'QBR calendar',
          body: cadenceList(qbrs),
        })}
      </div>
      <div class="col-lg-5">
        ${sheet({
          title: 'Import a runbook',
          body: `
            <eds-file-upload label="Upload a CSV or PDF" accept=".csv,.pdf,.xlsx" hint="Used for QBR appendix and save plans."></eds-file-upload>
            <eds-list class="mt-3" id="play-list" divided></eds-list>`,
        })}
      </div>
    </section>
  `;
}

export function hydratePlaybooks(root) {
  const list = root.querySelector('#play-list');
  if (list) {
    list.items = playbooks.map((item) => ({
      label: item.name,
      description: `${item.owner} · ${item.trigger}`,
      icon: 'file',
    }));
  }
  root.querySelector('#play-run')?.addEventListener('eds-click', () => document.querySelector('#play-modal')?.show());
  root.querySelectorAll('.run-play').forEach((button) => {
    button.addEventListener('eds-click', () => document.querySelector('#play-modal')?.show());
  });
}
