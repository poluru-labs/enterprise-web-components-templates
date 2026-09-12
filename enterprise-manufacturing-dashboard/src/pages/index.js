import { currentUser } from '../data/index.js';

const icon = (name) => `<i class="bi bi-${name}" aria-hidden="true"></i>`;

function renderOverview() {
  return `
    <div class="sentinel-page">
      <section class="sentinel-hero">
        <div><span class="kicker">Security posture / Friday 11 September 2026</span><h1>Good morning, ${currentUser.name.split(' ')[0]}.</h1><p>Your environment is steady. Three investigations need attention before the next response review.</p></div>
        <div class="hero-status"><span class="status-pulse"></span>All systems operational</div>
      </section>
      <section class="security-stats" aria-label="Security summary">
        <article class="security-stat stat-critical"><span class="stat-label">Open incidents</span><strong>02</strong><span class="stat-note">1 critical · +1 this week</span></article>
        <article class="security-stat"><span class="stat-label">Active alerts</span><strong>18</strong><span class="stat-note">6 need triage today</span></article>
        <article class="security-stat"><span class="stat-label">Risk exposure</span><strong>8.4<span class="stat-unit">/10</span></strong><span class="stat-note">↓ 12% from last month</span></article>
        <article class="security-stat"><span class="stat-label">Remediation SLA</span><strong>94<span class="stat-unit">%</span></strong><span class="stat-note">Within target · 30 days</span></article>
      </section>
      <section class="command-grid">
        <article class="surface incident-panel"><div class="surface-heading"><div><span class="eyebrow">Priority queue</span><h2>Active incidents</h2></div><a href="#/alerts">View all ${icon('arrow-up-right')}</a></div><div class="incident-list">
          <a class="incident-row" href="#/alerts"><span class="severity-dot critical"></span><span class="incident-copy"><strong>INC-2481 · Suspicious OAuth consent</strong><small>Identity / Production · 18 min ago</small></span><span class="incident-owner">AM</span><span class="row-arrow">${icon('arrow-right')}</span></a>
          <a class="incident-row" href="#/alerts"><span class="severity-dot high"></span><span class="incident-copy"><strong>INC-2478 · Endpoint beacon detected</strong><small>Workstations / Finance · 42 min ago</small></span><span class="incident-owner">RK</span><span class="row-arrow">${icon('arrow-right')}</span></a>
          <a class="incident-row" href="#/alerts"><span class="severity-dot medium"></span><span class="incident-copy"><strong>INC-2472 · Exposed storage policy</strong><small>Cloud / Data platform · 3 hrs ago</small></span><span class="incident-owner">JL</span><span class="row-arrow">${icon('arrow-right')}</span></a>
        </div><div class="panel-foot"><span>Last synced 2 minutes ago</span><span class="live-mark"><span></span>Live feed</span></div></article>
        <article class="surface coverage-panel"><div class="surface-heading"><div><span class="eyebrow">Detection health</span><h2>Control coverage</h2></div><button class="icon-button" type="button" aria-label="More coverage options">${icon('three-dots')}</button></div><div class="coverage-score"><div class="ring"><span>87<small>%</small></span></div><div><strong>Strong coverage</strong><p>12 of 14 control domains are above target.</p></div></div><div class="coverage-bars"><div><span>Identity & access</span><b>96%</b><i><em style="width:96%"></em></i></div><div><span>Endpoint security</span><b>91%</b><i><em style="width:91%"></em></i></div><div><span>Cloud posture</span><b>78%</b><i><em style="width:78%"></em></i></div><div><span>Data protection</span><b>84%</b><i><em style="width:84%"></em></i></div></div></article>
      </section>
      <section class="lower-grid"><article class="surface chart-panel"><div class="surface-heading"><div><span class="eyebrow">Last 7 days</span><h2>Alert volume</h2></div><div class="chart-legend"><span><i class="legend-red"></i>Detections</span><span><i class="legend-gray"></i>Resolved</span></div></div><div class="chart-wrap"><div class="chart-y"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div><div class="chart"><div class="chart-grid-lines"></div><svg viewBox="0 0 650 220" preserveAspectRatio="none" aria-label="Alert volume trend"><path class="area" d="M0,168 L92,135 L184,150 L276,98 L368,112 L460,62 L552,88 L650,42 L650,220 L0,220 Z"></path><polyline points="0,168 92,135 184,150 276,98 368,112 460,62 552,88 650,42"></polyline><g><circle cx="0" cy="168" r="4"></circle><circle cx="92" cy="135" r="4"></circle><circle cx="184" cy="150" r="4"></circle><circle cx="276" cy="98" r="4"></circle><circle cx="368" cy="112" r="4"></circle><circle cx="460" cy="62" r="4"></circle><circle cx="552" cy="88" r="4"></circle><circle cx="650" cy="42" r="4"></circle></g></svg><div class="chart-x"><span>05 Sep</span><span>06 Sep</span><span>07 Sep</span><span>08 Sep</span><span>09 Sep</span><span>10 Sep</span><span>11 Sep</span></div></div></div></article><article class="surface workflow-panel"><div class="surface-heading"><div><span class="eyebrow">Response center</span><h2>Investigation work</h2></div><a href="#/reviews">Open queue ${icon('arrow-up-right')}</a></div><div class="workflow-list"><div class="workflow-row"><span class="workflow-icon red">${icon('search')}</span><div><strong>Investigations in progress</strong><small>4 cases across 3 teams</small></div><b>04</b></div><div class="workflow-row"><span class="workflow-icon amber">${icon('shield-exclamation')}</span><div><strong>Vulnerabilities due this week</strong><small>12 critical or high findings</small></div><b>12</b></div><div class="workflow-row"><span class="workflow-icon blue">${icon('clipboard-check')}</span><div><strong>Playbooks executed</strong><small>28 completed this month</small></div><b>28</b></div></div><button class="primary-action" type="button" id="start-investigation">${icon('plus')} Start investigation</button></article></section>
      <section class="surface activity-panel"><div class="surface-heading"><div><span class="eyebrow">Audit trail</span><h2>Recent activity</h2></div><a href="#/reports">Export log ${icon('download')}</a></div><div class="activity-table"><div class="activity-head"><span>Event</span><span>Actor</span><span>Time</span><span>Status</span></div><div class="activity-item"><span><i class="bi bi-arrow-repeat event-icon"></i><strong>Containment playbook completed</strong></span><span>Alex Morgan</span><span>10:42 AM</span><em class="status-tag success">Resolved</em></div><div class="activity-item"><span><i class="bi bi-key event-icon"></i><strong>Privileged access review approved</strong></span><span>Jordan Lee</span><span>09:58 AM</span><em class="status-tag neutral">Recorded</em></div><div class="activity-item"><span><i class="bi bi-bug event-icon"></i><strong>New critical vulnerability imported</strong></span><span>Scanner / EU-West</span><span>09:31 AM</span><em class="status-tag warning">Needs triage</em></div></div></section>
    </div>`;
}

function hydrateOverview(root) {
  root.querySelector('#start-investigation')?.addEventListener('click', () => document.querySelector('#header-alert')?.click());
}

export function renderView(route) {
  return renderOverview(route);
}

export function hydrateView(root, route) {
  hydrateOverview(root, route);
}
