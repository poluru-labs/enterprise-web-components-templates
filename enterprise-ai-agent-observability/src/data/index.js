export const productName = 'Relay';
export const productLine = 'Run observability';
export const workspaceName = 'Summit Platform';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@summit.example',
  role: 'Platform reliability lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Week 43 · release 2026.10',
  timezone: 'America / Chicago',
  close: 'Change freeze 14 Nov 2026',
};

export const tickerItems = [
  { label: 'Run success', value: '99.2%', delta: '+0.3 pts', trend: 'up', href: '#/trends' },
  { label: 'Open incidents', value: '11', delta: '−2', trend: 'up', href: '#/alerts' },
  { label: 'Services', value: '34', delta: '+1', trend: 'up', href: '#/scorecards' },
  { label: 'Trace coverage', value: '97%', delta: '+1 pt', trend: 'up', href: '#/benchmarks' },
  { label: 'Error budget', value: '68%', delta: '−4 pts', trend: 'down', href: '#/benchmarks' },
  { label: 'p95 latency', value: '420ms', delta: '−18ms', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Services', href: '#/scorecards', icon: 'folder' },
  { label: 'Incidents', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'SLO standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Run success rate', value: '99.2%', hint: 'Rolling 7-day across workflows', trend: 'up', trendValue: '+0.3 pts' },
  { label: 'Open incidents', value: '11', hint: '3 breaching customer SLO', trend: 'up', trendValue: '−2' },
  { label: 'Monitored services', value: '34', hint: 'Production workflow surfaces', trend: 'up', trendValue: '+1' },
  { label: 'Trace completeness', value: '97%', hint: 'Spans linked end-to-end', trend: 'up', trendValue: '+1 pt' },
  { label: 'Error rate', value: '0.41%', hint: 'Failed runs / total runs', trend: 'up', trendValue: '−0.05 pts' },
  { label: 'Queue depth p95', value: '1.2k', hint: 'Backlog before workers pick up', trend: 'flat', trendValue: 'Hold' },
  { label: 'Scheduled runs', value: '2.4M', hint: 'Last 24 hours', trend: 'up', trendValue: '+6%' },
  { label: 'Run latency p95', value: '420ms', hint: 'Orchestrator to completion', trend: 'up', trendValue: '−18ms' },
];

export const revenueTrend = [98.1, 98.3, 98.4, 98.6, 98.7, 98.8, 98.9, 99.0, 99.0, 99.1, 99.1, 99.2];

export const scorecards = [
  {
    id: 'svc_payments',
    name: 'Payment orchestration',
    owner: 'Arjun Poluru',
    status: 'On track',
    health: 98,
    kpis: 1840,
    updated: '26 Oct 2026',
    focus: 'Card capture · refunds',
  },
  {
    id: 'svc_fulfillment',
    name: 'Order fulfillment',
    owner: 'Priya Poluru',
    status: 'Watch',
    health: 86,
    kpis: 920,
    updated: '26 Oct 2026',
    focus: 'Pick-pack · carrier handoff',
  },
  {
    id: 'svc_identity',
    name: 'Identity sync',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 99,
    kpis: 640,
    updated: '25 Oct 2026',
    focus: 'Directory · SSO hooks',
  },
  {
    id: 'svc_notify',
    name: 'Notification dispatch',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 97,
    kpis: 3100,
    updated: '25 Oct 2026',
    focus: 'Email · SMS · push',
  },
  {
    id: 'svc_inventory',
    name: 'Inventory sync',
    owner: 'Luca Poluru',
    status: 'At risk',
    health: 72,
    kpis: 780,
    updated: '24 Oct 2026',
    focus: 'Warehouse deltas · stale locks',
  },
  {
    id: 'svc_billing',
    name: 'Billing ledger',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 96,
    kpis: 520,
    updated: '24 Oct 2026',
    focus: 'Invoices · usage meters',
  },
  {
    id: 'svc_webhooks',
    name: 'Partner webhook hub',
    owner: 'Dev Poluru',
    status: 'Watch',
    health: 84,
    kpis: 1100,
    updated: '23 Oct 2026',
    focus: 'Retries · signature verify',
  },
  {
    id: 'svc_export',
    name: 'Data export pipeline',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 95,
    kpis: 290,
    updated: '22 Oct 2026',
    focus: 'Nightly extracts · SFTP',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Service', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Health score' },
  { key: 'kpis', label: 'Runs / day' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Fulfillment retry budget', owner: 'Priya Poluru', scorecard: 'Order fulfillment', progress: 58, target: '8 Nov', status: 'Watch' },
  { id: 'g2', name: 'Inventory lock timeout fix', owner: 'Luca Poluru', scorecard: 'Inventory sync', progress: 44, target: '12 Nov', status: 'At risk' },
  { id: 'g3', name: 'Webhook DLQ drain', owner: 'Dev Poluru', scorecard: 'Partner webhook hub', progress: 71, target: '5 Nov', status: 'Watch' },
  { id: 'g4', name: 'Trace sampling to 100%', owner: 'Mira Poluru', scorecard: 'Summit Platform', progress: 88, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Payment idempotency audit', owner: 'Arjun Poluru', scorecard: 'Payment orchestration', progress: 92, target: '3 Nov', status: 'On track' },
  { id: 'g6', name: 'Notify template regression suite', owner: 'Sahana Poluru', scorecard: 'Notification dispatch', progress: 76, target: '15 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Reliability goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Service' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Platform reliability lead', squad: 'Governance', rating: 5, score: 97 },
  { name: 'Luca Poluru', role: 'SRE', squad: 'Platform', rating: 5, score: 94 },
  { name: 'Nikhil Poluru', role: 'Identity platform', squad: 'Platform', rating: 5, score: 99 },
  { name: 'Priya Poluru', role: 'Fulfillment ops', squad: 'Commerce', rating: 4, score: 86 },
  { name: 'Arjun Poluru', role: 'Payments engineer', squad: 'Finance', rating: 5, score: 98 },
  { name: 'Dev Poluru', role: 'Integrations', squad: 'Partners', rating: 4, score: 84 },
  { name: 'Kavya Poluru', role: 'Billing ops', squad: 'Finance', rating: 5, score: 96 },
  { name: 'Sahana Poluru', role: 'Messaging platform', squad: 'Commerce', rating: 5, score: 97 },
  { name: 'Rohan Poluru', role: 'Data platform', squad: 'Data', rating: 4, score: 95 },
  { name: 'Elena Poluru', role: 'Incident commander', squad: 'Governance', rating: 5, score: 93 },
  { name: 'Anika Poluru', role: 'Customer SLO owner', squad: 'Success', rating: 5, score: 91 },
  { name: 'Hana Poluru', role: 'Observability reporting', squad: 'Governance', rating: 4, score: 90 },
];

export const alerts = [
  { id: 'a1', title: 'Inventory sync error budget burn', owner: 'Luca Poluru', scorecard: 'Inventory sync', severity: 'Red', since: '26 Oct', note: '42% budget consumed in 48h · lock contention on WH-3.' },
  { id: 'a2', title: 'Fulfillment p95 above SLO', owner: 'Priya Poluru', scorecard: 'Order fulfillment', severity: 'Amber', since: '25 Oct', note: '612ms vs 500ms target on carrier label step.' },
  { id: 'a3', title: 'Webhook retry storm', owner: 'Dev Poluru', scorecard: 'Partner webhook hub', severity: 'Amber', since: '25 Oct', note: 'Partner acme-corp 429 responses tripling DLQ depth.' },
  { id: 'a4', title: 'Payment runbook drill complete', owner: 'Arjun Poluru', scorecard: 'Payment orchestration', severity: 'Green', since: '24 Oct', note: 'Failover validated by Elena Poluru.' },
  { id: 'a5', title: 'Trace gap on export pipeline', owner: 'Rohan Poluru', scorecard: 'Data export pipeline', severity: 'Green', since: '23 Oct', note: 'Missing span on SFTP upload — patch scheduled.' },
  { id: 'a6', title: 'Notify queue lag cleared', owner: 'Sahana Poluru', scorecard: 'Notification dispatch', severity: 'Green', since: '22 Oct', note: 'Worker pool scaled · backlog under 200.' },
];

export const reviews = [
  { label: 'Incident review', description: 'Elena Poluru · inventory burn', timestamp: '27 Oct', icon: 'alert-triangle', status: 'Today' },
  { label: 'SLO checkpoint', description: 'Anika Poluru · customer tiers', timestamp: '28 Oct', icon: 'check', status: 'Next' },
  { label: 'Release readiness', description: 'Mira Poluru · 2026.10', timestamp: '30 Oct', icon: 'folder', status: 'Scheduled' },
  { label: 'Trace completeness audit', description: 'Hana Poluru · sampling', timestamp: '1 Nov', icon: 'eye', status: 'Scheduled' },
  { label: 'Partner webhook postmortem', description: 'Dev Poluru · acme-corp', timestamp: '4 Nov', icon: 'clock', status: 'Scheduled' },
  { label: 'Change freeze', description: 'Luca Poluru · platform', timestamp: '14 Nov', icon: 'settings', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Run success rate', us: '99.2%', peer: '98.8%', gap: '+0.4 pts', status: 'Ahead' },
  { metric: 'Trace completeness', us: '97%', peer: '94%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Mean time to detect', us: '4.2 min', peer: '6.1 min', gap: '−1.9 min', status: 'Ahead' },
  { metric: 'Mean time to restore', us: '38 min', peer: '35 min', gap: '+3 min', status: 'Watch' },
  { metric: 'Error budget remaining', us: '68%', peer: '72%', gap: '−4 pts', status: 'Watch' },
  { metric: 'Run latency p95', us: '420ms', peer: '450ms', gap: '−30ms', status: 'Ahead' },
  { metric: 'DLQ age p99', us: '12 min', peer: '18 min', gap: '−6 min', status: 'Ahead' },
  { metric: 'On-call load', us: '1.4 / wk', peer: '1.6 / wk', gap: '−0.2', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Summit Platform' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Week 43 reliability summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Incident export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'SLO burn dashboard', owner: 'Anika Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Trace completeness pack', owner: 'Luca Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Run manifest', owner: 'Nikhil Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Service health scorecards', owner: 'Elena Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Inventory budget burn', description: 'Luca Poluru · Red', icon: 'alert-triangle' },
  { label: 'Payment drill signed off', description: 'Arjun Poluru · Done', icon: 'check' },
  { label: 'Fulfillment p95 SLO', description: 'Priya Poluru · Review', icon: 'clock' },
  { label: 'Change freeze 14 Nov', description: 'Mira Poluru · Platform', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Run pulse', href: '#/overview', icon: 'home' },
  { label: 'Inventory sync', description: 'Luca Poluru', href: '#/scorecard/svc_inventory', icon: 'folder' },
  { label: 'Open incidents', description: 'Incident queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Reliability goals', description: 'Week 43', href: '#/goals', icon: 'check' },
  { label: 'SLO standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Owners and on-call', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Service', description: 'Workflow and owner' },
  { label: 'SLO', description: 'Targets and alerts' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'commerce',
    label: 'Commerce',
    children: [
      { id: 'payments', label: 'Payment orchestration', href: '#/scorecard/svc_payments' },
      { id: 'fulfillment', label: 'Order fulfillment', href: '#/scorecard/svc_fulfillment' },
      { id: 'notify', label: 'Notification dispatch', href: '#/scorecard/svc_notify' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    children: [
      { id: 'identity', label: 'Identity sync', href: '#/scorecard/svc_identity' },
      { id: 'webhooks', label: 'Partner webhook hub', href: '#/scorecard/svc_webhooks' },
      { id: 'export', label: 'Data export pipeline', href: '#/scorecard/svc_export' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    children: [
      { id: 'inventory', label: 'Inventory sync', href: '#/scorecard/svc_inventory' },
      { id: 'billing', label: 'Billing ledger', href: '#/scorecard/svc_billing' },
    ],
  },
];

export const metricRows = [
  { metric: 'Run success', actual: '99.2%', target: '99.0%', variance: '+0.2 pts', status: 'On track' },
  { metric: 'Trace completeness', actual: '97%', target: '95%', variance: '+2 pts', status: 'On track' },
  { metric: 'Error budget', actual: '32% burned', target: '<25% / week', variance: '+7 pts', status: 'At risk' },
  { metric: 'Open incidents', actual: '3', target: '0 critical', variance: '+3', status: 'Watch' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/services/svc_payments/runs/summary
Authorization: Bearer rly_live_****

{
  "id": "svc_payments",
  "name": "Payment orchestration",
  "success_rate": 0.982,
  "owner": "Arjun Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Service',
    href: `#/scorecard/${item.id}`,
  }));
  const goalHits = goals.map((item) => ({
    label: item.name,
    description: `${item.scorecard} · ${item.status}`,
    owner: item.owner,
    type: 'Goal',
    href: '#/goals',
  }));
  const alertHits = alerts.map((item) => ({
    label: item.title,
    description: `${item.scorecard} · ${item.severity}`,
    owner: item.owner,
    type: 'Incident',
    href: '#/alerts',
  }));
  const reportHits = reports.map((item) => ({
    label: item.name,
    description: `${item.format} · ${item.updated}`,
    owner: item.owner,
    type: 'Report',
    href: '#/reports',
  }));
  const peopleHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Person',
    href: '#/teams',
  }));
  return [
    ...scorecardHits,
    ...goalHits,
    ...alertHits,
    ...reportHits,
    ...peopleHits,
    ...commandItems.map((item) => ({
      ...item,
      type: 'Jump',
    })),
  ];
}
