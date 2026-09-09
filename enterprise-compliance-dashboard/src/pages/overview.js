import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  currentUser,
  frameworks,
  openFindings,
  openTasks,
  overviewStats,
  policies,
  readinessTrend,
  workspace,
} from '../data/index.js';
import { hydrateStats, pageHeader, policyGrid, sheet, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const due = openTasks().slice(0, 4);
  const findings = openFindings().slice(0, 4);
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Control room',
      lead: `Good evening, ${currentUser.name.split(' ')[0]}. SOC 2 fieldwork starts 18 Sep. GDPR still sits at 74% — Anika Poluru owns the gap.`,
      actions: `
        <eds-button id="qa-policy" variant="primary" icon="plus">New policy</eds-button>
        <eds-button id="qa-tasks" variant="secondary" icon="check">Open tasks</eds-button>
      `,
    })}
    <eds-alert id="audit-alert" variant="warning" dismissible title="Fieldwork in ten days" message="Priya Poluru needs the Q3 access review and Art. 30 records in the locker before Alder Advisory arrives."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'SOC 2 readiness',
          action: '<eds-badge label="88% mapped" variant="brand" pill></eds-badge>',
          body: `${sparkline(readinessTrend, 'SOC 2 readiness over twelve months')}
            <p class="muted mb-0 mt-2">Twelve months of mapped evidence. Subbu Poluru reviews the last four points on Fridays with Priya Poluru.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Next audit',
          action: '<eds-status label="On deck" variant="warning" pulse></eds-status>',
          body: `
            <div style="display:grid;justify-items:center;text-align:center;gap:0.85rem">
              <eds-circular-progress id="ready-ring" value="88" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-progress-bar value="88" max="100" label="SOC 2 Type II · 18 Sep" show-value></eds-progress-bar>
              <p class="muted mb-0">Alder Advisory. Priya Poluru holds the packet.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Policies in motion</h2>
        <eds-link href="#/policies" variant="subtle">Register</eds-link>
      </div>
      ${policyGrid(policies.filter((item) => ['in_review', 'watch', 'draft', 'published'].includes(item.status)).slice(0, 6))}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Framework coverage',
          action: '<eds-link href="#/controls" variant="subtle">Controls</eds-link>',
          body: frameworks
            .map(
              (item) => `
            <div class="coverage-row">
              <header>
                <span>${item.label}</span>
                <span>${item.value}</span>
              </header>
              <eds-progress-bar value="${item.ready}" max="100" label="${item.label} readiness" show-value></eds-progress-bar>
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Due this week',
          action: '<eds-link href="#/tasks" variant="subtle">Tasks</eds-link>',
          body: due
            .map(
              (item) => `
            <div class="task-row">
              <div>
                <strong>${item.title}</strong>
                <p class="muted mb-0">${item.owner} · ${item.framework} · ${item.due}</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Open findings',
          action: '<eds-link href="#/findings" variant="subtle">All</eds-link>',
          body: findings
            .map(
              (item) => `
            <div class="finding-row">
              <div>
                <strong>${item.title}</strong>
                <p class="muted mb-0">${item.owner} · ${item.audit}</p>
              </div>
              ${statusChip(item.severity)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent activity',
          action: '<eds-link href="#/evidence" variant="subtle">Locker</eds-link>',
          body: '<eds-timeline id="overview-timeline"></eds-timeline>',
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, overviewStats(), 'stat');
  const timeline = root.querySelector('#overview-timeline');
  if (timeline) {
    timeline.items = [
      { label: 'HIPAA unique-ID pack filed', description: 'Leela Poluru · 164.312(a)', timestamp: '8 Sep', icon: 'folder' },
      { label: 'Retention policy sent to legal', description: 'Anika Poluru · POL-03', timestamp: '4 Sep', icon: 'file' },
      { label: 'Q3 access review exported', description: 'Maya Poluru · CC6.1', timestamp: '3 Sep', icon: 'check' },
      { label: 'Privileged access exceptions flagged', description: 'Dev Poluru · A.8.2', timestamp: '2 Sep', icon: 'alert-triangle' },
    ];
  }
  root.querySelector('#qa-policy')?.addEventListener('eds-click', () => document.querySelector('#policy-modal')?.show());
  root.querySelector('#qa-tasks')?.addEventListener('eds-click', () => {
    window.location.hash = '#/tasks';
  });
  root.querySelector('#audit-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Fieldwork reminder dismissed', variant: 'info' });
  });
}
