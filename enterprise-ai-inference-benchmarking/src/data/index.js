export const productName = 'Gauge';
export const productLine = 'Runtime benchmarks';
export const workspaceName = 'Summit Platform Lab';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@summit.example',
  role: 'Performance engineering lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Cycle 14 · harness v3',
  timezone: 'America / Chicago',
  close: 'Capacity review 28 Nov 2026',
};

export const tickerItems = [
  { label: 'SLO pass', value: '92%', delta: '+1 pt', trend: 'up', href: '#/trends' },
  { label: 'Regressions', value: '11', delta: '−2', trend: 'up', href: '#/alerts' },
  { label: 'Workloads', value: '18', delta: '+1', trend: 'up', href: '#/scorecards' },
  { label: 'p99 latency', value: '84ms', delta: '−6ms', trend: 'up', href: '#/benchmarks' },
  { label: 'Throughput', value: '12.4k rps', delta: '+8%', trend: 'up', href: '#/benchmarks' },
  { label: 'Runs this cycle', value: '2.1k', delta: '+14%', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Workloads', href: '#/scorecards', icon: 'folder' },
  { label: 'Regressions', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'SLO pass rate', value: '92%', hint: 'Harness v3 weighted', trend: 'up', trendValue: '+1 pt' },
  { label: 'Open regressions', value: '11', hint: '3 blocking capacity review', trend: 'up', trendValue: '−2' },
  { label: 'Benchmarked workloads', value: '18', hint: 'Sync and batch pipelines', trend: 'up', trendValue: '+1' },
  { label: 'Median p99 latency', value: '84ms', hint: 'Peak traffic profile', trend: 'up', trendValue: '−6ms' },
  { label: 'Peak throughput', value: '12.4k rps', hint: 'Sustained 15 min window', trend: 'up', trendValue: '+8%' },
  { label: 'Compute headroom', value: '23%', hint: 'Before autoscale ceiling', trend: 'up', trendValue: '+2 pts' },
  { label: 'Harness coverage', value: '91%', hint: 'Scenarios mapped to SLO tiers', trend: 'up', trendValue: '+3 pts' },
  { label: 'Runs this cycle', value: '2,140', hint: 'Scheduled and on-demand', trend: 'up', trendValue: '+14%' },
];

export const revenueTrend = [86, 87, 87, 88, 88, 89, 89, 90, 90, 91, 91, 92];

export const scorecards = [
  {
    id: 'wl_scoring',
    name: 'Real-time scoring service',
    owner: 'Arjun Poluru',
    status: 'Watch',
    health: 86,
    kpis: 420,
    updated: '26 Oct 2026',
    focus: 'gRPC · 50ms SLO tier',
  },
  {
    id: 'wl_batch',
    name: 'Batch pricing engine',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 94,
    kpis: 280,
    updated: '26 Oct 2026',
    focus: 'Spark · nightly partitions',
  },
  {
    id: 'wl_search',
    name: 'Search ranking API',
    owner: 'Priya Poluru',
    status: 'At risk',
    health: 72,
    kpis: 510,
    updated: '25 Oct 2026',
    focus: 'REST · p99 120ms cap',
  },
  {
    id: 'wl_auth',
    name: 'Token validation edge',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 97,
    kpis: 640,
    updated: '25 Oct 2026',
    focus: 'Edge POP · sub-10ms',
  },
  {
    id: 'wl_etl',
    name: 'Transform pipeline',
    owner: 'Dev Poluru',
    status: 'On track',
    health: 93,
    kpis: 190,
    updated: '24 Oct 2026',
    focus: 'Queue workers · backlog SLO',
  },
  {
    id: 'wl_mobile',
    name: 'Mobile sync gateway',
    owner: 'Luca Poluru',
    status: 'Watch',
    health: 84,
    kpis: 360,
    updated: '24 Oct 2026',
    focus: 'WebSocket · fan-out',
  },
  {
    id: 'wl_webhook',
    name: 'Partner dispatch',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 91,
    kpis: 240,
    updated: '23 Oct 2026',
    focus: 'HTTP retry · idempotency',
  },
  {
    id: 'wl_admin',
    name: 'Internal report builder',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 90,
    kpis: 150,
    updated: '22 Oct 2026',
    focus: 'SQL · long queries',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Workload', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'SLO score' },
  { key: 'kpis', label: 'Runs' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Search p99 recovery plan', owner: 'Priya Poluru', scorecard: 'Search ranking API', progress: 44, target: '8 Nov', status: 'At risk' },
  { id: 'g2', name: 'Scoring tier-1 autoscale', owner: 'Arjun Poluru', scorecard: 'Real-time scoring service', progress: 62, target: '12 Nov', status: 'Watch' },
  { id: 'g3', name: 'Mobile fan-out tuning', owner: 'Luca Poluru', scorecard: 'Mobile sync gateway', progress: 58, target: '15 Nov', status: 'Watch' },
  { id: 'g4', name: 'Harness v3 rollout', owner: 'Mira Poluru', scorecard: 'Summit Platform Lab', progress: 88, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Edge token cache hit rate', owner: 'Nikhil Poluru', scorecard: 'Token validation edge', progress: 92, target: '6 Nov', status: 'On track' },
  { id: 'g6', name: 'Batch SLA buffer', owner: 'Kavya Poluru', scorecard: 'Batch pricing engine', progress: 85, target: '20 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Performance goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Workload' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Performance engineering lead', squad: 'Governance', rating: 5, score: 94 },
  { name: 'Rohan Poluru', role: 'Harness automation', squad: 'Platform', rating: 5, score: 96 },
  { name: 'Priya Poluru', role: 'Search platform', squad: 'Product', rating: 4, score: 72 },
  { name: 'Arjun Poluru', role: 'Scoring services', squad: 'Revenue', rating: 4, score: 86 },
  { name: 'Nikhil Poluru', role: 'Edge platform', squad: 'Platform', rating: 5, score: 97 },
  { name: 'Kavya Poluru', role: 'Batch compute', squad: 'Product', rating: 5, score: 94 },
  { name: 'Dev Poluru', role: 'Data pipelines', squad: 'Platform', rating: 5, score: 93 },
  { name: 'Luca Poluru', role: 'Mobile backend', squad: 'Product', rating: 4, score: 84 },
  { name: 'Elena Poluru', role: 'Integrations', squad: 'Partners', rating: 5, score: 91 },
  { name: 'Sahana Poluru', role: 'Internal analytics', squad: 'Product', rating: 5, score: 90 },
  { name: 'Anika Poluru', role: 'Capacity review', squad: 'Governance', rating: 5, score: 89 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 88 },
];

export const alerts = [
  { id: 'a1', title: 'Search p99 above SLO cap', owner: 'Priya Poluru', scorecard: 'Search ranking API', severity: 'Red', since: '26 Oct', note: '142ms p99 on peak profile · regression since harness build 412.' },
  { id: 'a2', title: 'Scoring queue depth spike', owner: 'Arjun Poluru', scorecard: 'Real-time scoring service', severity: 'Amber', since: '25 Oct', note: 'Autoscale lag 90s under synthetic burst scenario.' },
  { id: 'a3', title: 'Mobile fan-out latency drift', owner: 'Luca Poluru', scorecard: 'Mobile sync gateway', severity: 'Amber', since: '25 Oct', note: 'p95 up 12ms vs cycle 13 baseline.' },
  { id: 'a4', title: 'Edge validation harness green', owner: 'Nikhil Poluru', scorecard: 'Token validation edge', severity: 'Green', since: '24 Oct', note: 'Full harness v3 pass · all POPs within tier.' },
  { id: 'a5', title: 'Batch pricing stable', owner: 'Kavya Poluru', scorecard: 'Batch pricing engine', severity: 'Green', since: '23 Oct', note: 'Nightly partition within SLA window.' },
  { id: 'a6', title: 'Partner dispatch throughput hold', owner: 'Elena Poluru', scorecard: 'Partner dispatch', severity: 'Green', since: '22 Oct', note: 'No regression on cycle 13 fixes.' },
];

export const reviews = [
  { label: 'Regression triage', description: 'Mira Poluru · cycle 14', timestamp: '27 Oct', icon: 'clock', status: 'Today' },
  { label: 'Search recovery review', description: 'Priya Poluru · blocking', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Next' },
  { label: 'Harness v3 sign-off', description: 'Rohan Poluru · automation', timestamp: '30 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Capacity readout', description: 'Anika Poluru · finance', timestamp: '1 Nov', icon: 'folder', status: 'Scheduled' },
  { label: 'Perf office hours', description: 'Mira Poluru · workloads', timestamp: '4 Nov', icon: 'user', status: 'Scheduled' },
  { label: 'Cycle 14 report freeze', description: 'Hana Poluru · exports', timestamp: '28 Nov', icon: 'download', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'SLO pass rate', us: '92%', peer: '88%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Median p99 latency', us: '84ms', peer: '91ms', gap: '−7ms', status: 'Ahead' },
  { metric: 'Sustained throughput', us: '12.4k rps', peer: '10.8k rps', gap: '+15%', status: 'Ahead' },
  { metric: 'Harness coverage', us: '91%', peer: '86%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Regression fix time', us: '1.8d', peer: '2.3d', gap: '−0.5d', status: 'Ahead' },
  { metric: 'Workloads at risk', us: '2', peer: '2', gap: '0', status: 'Watch' },
  { metric: 'Scheduled run cadence', us: '97%', peer: '93%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Baseline recheck pass', us: '90%', peer: '87%', gap: '+3 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Summit Platform Lab' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Cycle 14 performance summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Regression export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Harness v3 results', owner: 'Rohan Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Run evidence pack', owner: 'Priya Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Workload manifest', owner: 'Nikhil Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'SLO scorecards', owner: 'Anika Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Search p99 regression', description: 'Priya Poluru · Red', icon: 'alert-triangle' },
  { label: 'Edge harness passed', description: 'Nikhil Poluru · Done', icon: 'check' },
  { label: 'Scoring autoscale', description: 'Arjun Poluru · Review', icon: 'clock' },
  { label: 'Capacity review 28 Nov', description: 'Mira Poluru · Cycle 14', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Performance pulse', href: '#/overview', icon: 'home' },
  { label: 'Search ranking API', description: 'Priya Poluru', href: '#/scorecard/wl_search', icon: 'folder' },
  { label: 'Open regressions', description: 'Regression queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Performance goals', description: 'Cycle 14', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Owners and engineers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Workload', description: 'Service and owner' },
  { label: 'Harness', description: 'Scenarios and SLOs' },
  { label: 'Confirm', description: 'Engineer PIN' },
];

export const scorecardTree = [
  {
    id: 'sync',
    label: 'Sync',
    children: [
      { id: 'scoring', label: 'Real-time scoring service', href: '#/scorecard/wl_scoring' },
      { id: 'search', label: 'Search ranking API', href: '#/scorecard/wl_search' },
      { id: 'mobile', label: 'Mobile sync gateway', href: '#/scorecard/wl_mobile' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    children: [
      { id: 'auth', label: 'Token validation edge', href: '#/scorecard/wl_auth' },
      { id: 'etl', label: 'Transform pipeline', href: '#/scorecard/wl_etl' },
      { id: 'webhook', label: 'Partner dispatch', href: '#/scorecard/wl_webhook' },
    ],
  },
  {
    id: 'batch',
    label: 'Batch',
    children: [
      { id: 'batch', label: 'Batch pricing engine', href: '#/scorecard/wl_batch' },
      { id: 'admin', label: 'Internal report builder', href: '#/scorecard/wl_admin' },
    ],
  },
];

export const metricRows = [
  { metric: 'SLO pass', actual: '92%', target: '90%', variance: '+2 pts', status: 'On track' },
  { metric: 'p99 latency', actual: '84ms', target: '90ms', variance: '−6ms', status: 'On track' },
  { metric: 'Throughput', actual: '12.4k rps', target: '11k rps', variance: '+1.4k', status: 'On track' },
  { metric: 'Blocking regressions', actual: '3', target: '0', variance: '+3', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/workloads/wl_auth/run-summary
Authorization: Bearer gau_live_****

{
  "id": "wl_auth",
  "name": "Token validation edge",
  "slo_score": 97,
  "owner": "Nikhil Poluru",
  "p99_ms": 8.2
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Workload',
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
    type: 'Regression',
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
