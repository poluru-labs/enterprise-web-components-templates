export const productName = 'Probe';
export const productLine = 'Dataset quality';
export const workspaceName = 'Cedar Data Trust';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@cedar.example',
  role: 'Data quality program lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Batch 18 · ruleset v4.2',
  timezone: 'America / Chicago',
  close: 'Certification freeze 8 Dec 2026',
};

export const tickerItems = [
  { label: 'Quality score', value: '91%', delta: '+2 pts', trend: 'up', href: '#/trends' },
  { label: 'Open findings', value: '22', delta: '−5', trend: 'up', href: '#/alerts' },
  { label: 'Datasets', value: '36', delta: '+1', trend: 'up', href: '#/scorecards' },
  { label: 'Completeness', value: '97%', delta: '+0.5 pt', trend: 'up', href: '#/benchmarks' },
  { label: 'Schema drift', value: '4', delta: '−2', trend: 'up', href: '#/alerts' },
  { label: 'Scan runtime', value: '14m', delta: '−3m', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Datasets', href: '#/scorecards', icon: 'folder' },
  { label: 'Findings', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Overall quality score', value: '91%', hint: 'Weighted ruleset v4.2', trend: 'up', trendValue: '+2 pts' },
  { label: 'Open findings', value: '22', hint: '7 blocking certification', trend: 'up', trendValue: '−5' },
  { label: 'Certified datasets', value: '36', hint: 'Production and staging', trend: 'up', trendValue: '+1' },
  { label: 'Completeness', value: '97%', hint: 'Non-null required fields', trend: 'up', trendValue: '+0.5 pt' },
  { label: 'Duplicate rate', value: '0.8%', hint: 'Primary-key collisions', trend: 'up', trendValue: '−0.2 pts' },
  { label: 'Freshness SLA', value: '94%', hint: 'Updated within window', trend: 'flat', trendValue: 'Hold' },
  { label: 'Rows scanned / day', value: '2.1B', hint: 'Last 24 hours', trend: 'up', trendValue: '+11%' },
  { label: 'Mean scan time', value: '14m', hint: 'Full ruleset per dataset', trend: 'up', trendValue: '−3m' },
];

export const revenueTrend = [85, 86, 87, 87, 88, 89, 89, 90, 90, 90, 91, 91];

export const scorecards = [
  {
    id: 'ds_customers',
    name: 'Customer dimension',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 95,
    kpis: 8400000,
    updated: '26 Oct 2026',
    focus: 'CRM · nightly load',
  },
  {
    id: 'ds_orders',
    name: 'Order facts',
    owner: 'Arjun Poluru',
    status: 'Watch',
    health: 82,
    kpis: 124000000,
    updated: '26 Oct 2026',
    focus: 'Commerce · streaming',
  },
  {
    id: 'ds_inventory',
    name: 'Inventory snapshots',
    owner: 'Luca Poluru',
    status: 'On track',
    health: 93,
    kpis: 18000000,
    updated: '25 Oct 2026',
    focus: 'Warehouse · hourly',
  },
  {
    id: 'ds_payments',
    name: 'Payment ledger',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 97,
    kpis: 42000000,
    updated: '25 Oct 2026',
    focus: 'Finance · immutable',
  },
  {
    id: 'ds_product',
    name: 'Product catalog',
    owner: 'Dev Poluru',
    status: 'At risk',
    health: 71,
    kpis: 2100000,
    updated: '24 Oct 2026',
    focus: 'PIM · schema drift',
  },
  {
    id: 'ds_support',
    name: 'Support tickets',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 90,
    kpis: 9600000,
    updated: '24 Oct 2026',
    focus: 'Zendesk · daily',
  },
  {
    id: 'ds_hr',
    name: 'Workforce roster',
    owner: 'Elena Poluru',
    status: 'Watch',
    health: 86,
    kpis: 480000,
    updated: '23 Oct 2026',
    focus: 'HRIS · PII controls',
  },
  {
    id: 'ds_telemetry',
    name: 'Device telemetry',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 92,
    kpis: 890000000,
    updated: '22 Oct 2026',
    focus: 'IoT · partitioned',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Dataset', sortable: true },
  { key: 'owner', label: 'Steward', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Quality score' },
  { key: 'kpis', label: 'Rows' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Product catalog schema lock', owner: 'Dev Poluru', scorecard: 'Product catalog', progress: 46, target: '9 Nov', status: 'At risk' },
  { id: 'g2', name: 'Order facts duplicate purge', owner: 'Arjun Poluru', scorecard: 'Order facts', progress: 64, target: '12 Nov', status: 'Watch' },
  { id: 'g3', name: 'HRIS masking audit', owner: 'Elena Poluru', scorecard: 'Workforce roster', progress: 72, target: '15 Nov', status: 'Watch' },
  { id: 'g4', name: 'Batch 18 ruleset rollout', owner: 'Mira Poluru', scorecard: 'Cedar Data Trust', progress: 81, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Telemetry partition checks', owner: 'Nikhil Poluru', scorecard: 'Device telemetry', progress: 88, target: '5 Nov', status: 'On track' },
  { id: 'g6', name: 'Customer dimension referential fix', owner: 'Priya Poluru', scorecard: 'Customer dimension', progress: 94, target: '3 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Quality goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Dataset' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Data quality program lead', squad: 'Governance', rating: 5, score: 94 },
  { name: 'Priya Poluru', role: 'Customer data steward', squad: 'CRM', rating: 5, score: 95 },
  { name: 'Arjun Poluru', role: 'Commerce analytics', squad: 'Finance', rating: 4, score: 82 },
  { name: 'Dev Poluru', role: 'Product data engineer', squad: 'Product', rating: 4, score: 71 },
  { name: 'Luca Poluru', role: 'Supply chain data', squad: 'Operations', rating: 5, score: 93 },
  { name: 'Kavya Poluru', role: 'Payments steward', squad: 'Finance', rating: 5, score: 97 },
  { name: 'Sahana Poluru', role: 'Support analytics', squad: 'Support', rating: 5, score: 90 },
  { name: 'Elena Poluru', role: 'People analytics', squad: 'HR', rating: 4, score: 86 },
  { name: 'Nikhil Poluru', role: 'Platform telemetry', squad: 'Platform', rating: 5, score: 92 },
  { name: 'Rohan Poluru', role: 'Scan platform', squad: 'Platform', rating: 5, score: 91 },
  { name: 'Anika Poluru', role: 'Compliance reviewer', squad: 'Governance', rating: 5, score: 89 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 88 },
];

export const alerts = [
  { id: 'a1', title: 'Product catalog schema drift', owner: 'Dev Poluru', scorecard: 'Product catalog', severity: 'Red', since: '26 Oct', note: '12 columns changed vs v4.2 contract without approval.' },
  { id: 'a2', title: 'Order facts duplicate keys', owner: 'Arjun Poluru', scorecard: 'Order facts', severity: 'Amber', since: '25 Oct', note: '0.9% duplicate order_id in last 24h partition.' },
  { id: 'a3', title: 'Workforce roster PII scan flag', owner: 'Elena Poluru', scorecard: 'Workforce roster', severity: 'Amber', since: '25 Oct', note: 'Unmasked email in staging export path.' },
  { id: 'a4', title: 'Payment ledger certification renewed', owner: 'Kavya Poluru', scorecard: 'Payment ledger', severity: 'Green', since: '24 Oct', note: 'Anika Poluru signed batch 18 attestation.' },
  { id: 'a5', title: 'Customer dimension referential pass', owner: 'Priya Poluru', scorecard: 'Customer dimension', severity: 'Green', since: '23 Oct', note: 'All foreign keys resolved in CRM load.' },
  { id: 'a6', title: 'Telemetry freshness restored', owner: 'Nikhil Poluru', scorecard: 'Device telemetry', severity: 'Green', since: '22 Oct', note: 'Lag back under 15-minute SLO.' },
];

export const reviews = [
  { label: 'Finding triage', description: 'Mira Poluru · batch 18', timestamp: '27 Oct', icon: 'clock', status: 'Today' },
  { label: 'Product catalog review', description: 'Dev Poluru · blocking', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Next' },
  { label: 'Certification council', description: 'Anika Poluru · compliance', timestamp: '30 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Ruleset v4.2 training', description: 'Rohan Poluru · stewards', timestamp: '1 Nov', icon: 'user', status: 'Scheduled' },
  { label: 'Schema contract workshop', description: 'Dev Poluru · PIM', timestamp: '4 Nov', icon: 'folder', status: 'Scheduled' },
  { label: 'Batch 18 report freeze', description: 'Hana Poluru · exports', timestamp: '8 Dec', icon: 'download', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Quality score', us: '91%', peer: '87%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Completeness', us: '97%', peer: '94%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Duplicate rate', us: '0.8%', peer: '1.1%', gap: '−0.3 pts', status: 'Ahead' },
  { metric: 'Freshness SLA', us: '94%', peer: '92%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Schema contract pass', us: '89%', peer: '90%', gap: '−1 pt', status: 'Watch' },
  { metric: 'Mean time to remediate', us: '3.2d', peer: '3.8d', gap: '−0.6d', status: 'Ahead' },
  { metric: 'PII control pass', us: '96%', peer: '93%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Certification coverage', us: '92%', peer: '88%', gap: '+4 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Cedar Data Trust' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Batch 18 quality summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Finding export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Ruleset v4.2 results', owner: 'Rohan Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Schema diff pack', owner: 'Dev Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Dataset manifest', owner: 'Priya Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Certification scorecards', owner: 'Anika Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Product schema drift', description: 'Dev Poluru · Red', icon: 'alert-triangle' },
  { label: 'Payments certified', description: 'Kavya Poluru · Done', icon: 'check' },
  { label: 'Order duplicates', description: 'Arjun Poluru · Review', icon: 'clock' },
  { label: 'Freeze 8 Dec', description: 'Mira Poluru · Batch 18', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Quality pulse', href: '#/overview', icon: 'home' },
  { label: 'Product catalog', description: 'Dev Poluru', href: '#/scorecard/ds_product', icon: 'folder' },
  { label: 'Open findings', description: 'Finding queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Quality goals', description: 'Batch 18', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Stewards and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Dataset', description: 'Source and steward' },
  { label: 'Rules', description: 'Checks and thresholds' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'commerce',
    label: 'Commerce',
    children: [
      { id: 'orders', label: 'Order facts', href: '#/scorecard/ds_orders' },
      { id: 'product', label: 'Product catalog', href: '#/scorecard/ds_product' },
      { id: 'customers', label: 'Customer dimension', href: '#/scorecard/ds_customers' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    children: [
      { id: 'payments', label: 'Payment ledger', href: '#/scorecard/ds_payments' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    children: [
      { id: 'inventory', label: 'Inventory snapshots', href: '#/scorecard/ds_inventory' },
      { id: 'telemetry', label: 'Device telemetry', href: '#/scorecard/ds_telemetry' },
      { id: 'support', label: 'Support tickets', href: '#/scorecard/ds_support' },
      { id: 'hr', label: 'Workforce roster', href: '#/scorecard/ds_hr' },
    ],
  },
];

export const metricRows = [
  { metric: 'Completeness', actual: '97%', target: '95%', variance: '+2 pts', status: 'On track' },
  { metric: 'Uniqueness', actual: '99.2%', target: '99%', variance: '+0.2 pts', status: 'On track' },
  { metric: 'Schema contract', actual: '88%', target: '95%', variance: '−7 pts', status: 'At risk' },
  { metric: 'Blocking findings', actual: '7', target: '0', variance: '+7', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/datasets/ds_payments/quality
Authorization: Bearer prb_live_****

{
  "id": "ds_payments",
  "name": "Payment ledger",
  "quality_score": 97,
  "steward": "Kavya Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Dataset',
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
    type: 'Finding',
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
