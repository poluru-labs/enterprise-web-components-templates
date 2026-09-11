import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import {
  alertTrend,
  currentUser,
  incidents,
  investigations,
  openAlerts,
  openIncidents,
  openVulns,
  overviewStats,
  playbooks,
  workspace,
} from '../data/index.js';
import { formatDateTime } from '../lib/format.js';
import { hydrateStats, itemGrid, pageHeader, sheet, sparkline, statGrid, statusChip } from '../components/widgets.js';

export function renderOverview() {
  const stats = overviewStats();
  const hotAlerts = openAlerts().slice(0, 4);
  const hotVulns = openVulns().slice(0, 4);
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Security desk',
      lead: `Good evening, ${currentUser.name.split(' ')[0]}. Kavya Poluru holds 18 alerts. Maya Poluru is on INC-4412. Leela Poluru’s kernel CVE has eight hours left.`,
      actions: `
        <eds-button id="qa-incident" variant="primary" icon="plus">Open incident</eds-button>
        <eds-button id="qa-alerts" variant="secondary" icon="bell">Alert queue</eds-button>
      `,
    })}
    <eds-alert id="soc-alert" variant="warning" dismissible title="Critical vault session" message="Impossible travel on vault.polurushield.example. Maya Poluru is commander. Ishaan Poluru opened CASE-12."></eds-alert>
    ${statGrid(stats, 'stat')}
    <section class="row g-3 mt-1">
      <div class="col-lg-8">
        ${sheet({
          title: 'Alert volume',
          action: '<eds-badge label="12 hours" variant="brand" pill></eds-badge>',
          body: `${sparkline(alertTrend, 'Alert volume over twelve hours')}
            <p class="muted mb-0 mt-2">Priya Poluru’s detections peaked at 17:12. Median time to acknowledge is ${workspace.mtta}.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Desk load',
          action: '<eds-status label="Hot" variant="warning" pulse></eds-status>',
          body: `
            <div class="stack">
              <div class="list-row">
                <div>
                  <strong>Alerts</strong>
                  <p class="muted mb-0">Kavya Poluru · Detection</p>
                </div>
                <span>${openAlerts().length} open</span>
              </div>
              <div class="list-row">
                <div>
                  <strong>Incidents</strong>
                  <p class="muted mb-0">Maya Poluru · Response</p>
                </div>
                <span>${openIncidents().length} live</span>
              </div>
              <div class="list-row">
                <div>
                  <strong>Vulnerabilities</strong>
                  <p class="muted mb-0">Leela Poluru · AppSec</p>
                </div>
                <span>${openVulns().length} open</span>
              </div>
              <div class="list-row">
                <div>
                  <strong>Cases</strong>
                  <p class="muted mb-0">Ishaan Poluru · DFIR</p>
                </div>
                <span>${investigations.filter((item) => item.status !== 'closed').length} open</span>
              </div>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Live incidents</h2>
        <eds-link href="#/incidents" variant="subtle">All cases</eds-link>
      </div>
      ${itemGrid(incidents.slice(0, 6), (item) => `#/incident/${item.id}`)}
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-6">
        ${sheet({
          title: 'Open alerts',
          action: '<eds-link href="#/alerts" variant="subtle">Queue</eds-link>',
          body: hotAlerts
            .map(
              (item) => `
            <div class="list-row">
              <div>
                <strong>${item.title}</strong>
                <p class="muted mb-0">${item.source} · ${item.owner} · ${formatDateTime(item.seen)}</p>
              </div>
              ${statusChip(item.severity)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-6">
        ${sheet({
          title: 'Patch queue',
          action: '<eds-link href="#/vulnerabilities" variant="subtle">Vulns</eds-link>',
          body: hotVulns
            .map(
              (item) => `
            <div class="list-row">
              <div>
                <strong>${item.cve}</strong>
                <p class="muted mb-0">${item.asset} · ${item.owner} · SLA ${item.sla}</p>
              </div>
              ${statusChip(item.severity)}
            </div>`,
            )
            .join(''),
        })}
      </div>
    </section>
    <section class="row g-3 mt-1">
      <div class="col-lg-5">
        ${sheet({
          title: 'Playbooks ready',
          action: '<eds-link href="#/response" variant="subtle">Response</eds-link>',
          body: playbooks
            .slice(0, 4)
            .map(
              (item) => `
            <div class="list-row">
              <div>
                <strong>${item.name}</strong>
                <p class="muted mb-0">${item.owner} · ${item.steps} steps</p>
              </div>
              ${statusChip(item.status)}
            </div>`,
            )
            .join(''),
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent activity',
          action: '<eds-link href="#/investigations" variant="subtle">Cases</eds-link>',
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
      { label: 'INC-4412 opened', description: 'Maya Poluru · vault admin travel', timestamp: '17:14', icon: 'alert-triangle' },
      { label: 'CASE-12 started', description: 'Ishaan Poluru · session correlation', timestamp: '17:16', icon: 'search' },
      { label: 'Beacon isolated', description: 'Priya Poluru · lt-maya-12', timestamp: '16:44', icon: 'shield' },
      { label: 'CVE-2026-4411 assigned', description: 'Leela Poluru · 8h SLA', timestamp: '11:20', icon: 'check' },
    ];
  }
  root.querySelector('#qa-incident')?.addEventListener('eds-click', () => document.querySelector('#incident-modal')?.show());
  root.querySelector('#qa-alerts')?.addEventListener('eds-click', () => {
    window.location.hash = '#/alerts';
  });
  root.querySelector('#soc-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Vault reminder dismissed', variant: 'info' });
  });
}
