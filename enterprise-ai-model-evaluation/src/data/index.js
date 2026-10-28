export const productName = 'Gauge';
export const productLine = 'Model evaluation';
export const workspaceName = 'Meridian Analytics';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@meridian.example',
  role: 'Model quality lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Release 7.3 · eval window 4',
  timezone: 'America / Chicago',
  close: 'Production sign-off 22 Nov 2026',
};

export const tickerItems = [
  { label: 'Pass rate', value: '94%', delta: '+1 pt', trend: 'up', href: '#/trends' },
  { label: 'Open findings', value: '17', delta: '−4', trend: 'up', href: '#/alerts' },
  { label: 'Models', value: '36', delta: '+2', trend: 'up', href: '#/scorecards' },
  { label: 'Drift alerts', value: '3', delta: '−1', trend: 'up', href: '#/alerts' },
  { label: 'Holdout AUC', value: '0.91', delta: '+0.02', trend: 'up', href: '#/benchmarks' },
  { label: 'Latency p95', value: '42ms', delta: '−3ms', trend: 'up', href: '#/benchmarks' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Models', href: '#/scorecards', icon: 'star' },
  { label: 'Findings', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Benchmarks', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Evaluation pass rate', value: '94%', hint: 'Last 30d across production candidates', trend: 'up', trendValue: '+1 pt' },
  { label: 'Open findings', value: '17', hint: '6 blocking promotion', trend: 'up', trendValue: '−4' },
  { label: 'Registered models', value: '36', hint: '12 in active eval window', trend: 'up', trendValue: '+2' },
  { label: 'Mean holdout AUC', value: '0.91', hint: 'Weighted by exposure', trend: 'up', trendValue: '+0.02' },
  { label: 'Calibration error', value: '0.04', hint: 'Target ≤ 0.05', trend: 'flat', trendValue: 'Hold' },
  { label: 'Drift detections', value: '3', hint: 'Feature distribution shifts', trend: 'up', trendValue: '−1' },
  { label: 'Fairness checks pass', value: '89%', hint: 'Segment parity suite', trend: 'up', trendValue: '+3 pts' },
  { label: 'Inference p95', value: '42ms', hint: 'Batch scoring service', trend: 'up', trendValue: '−3ms' },
];

export const revenueTrend = [88, 89, 89, 90, 91, 91, 92, 92, 93, 93, 94, 94];

export const scorecards = [
  {
    id: 'mdl_churn',
    name: 'Churn scorer',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 96,
    kpis: 14,
    updated: '26 Oct 2026',
    focus: 'Retention · gradient boosted',
  },
  {
    id: 'mdl_credit',
    name: 'Credit risk',
    owner: 'Arjun Poluru',
    status: 'Watch',
    health: 84,
    kpis: 18,
    updated: '26 Oct 2026',
    focus: 'PD · regulatory holdout',
  },
  {
    id: 'mdl_forecast',
    name: 'Demand forecast',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 92,
    kpis: 11,
    updated: '25 Oct 2026',
    focus: 'SKU weekly · MAPE',
  },
  {
    id: 'mdl_fraud',
    name: 'Fraud detector',
    owner: 'Anika Poluru',
    status: 'At risk',
    health: 71,
    kpis: 16,
    updated: '25 Oct 2026',
    focus: 'Realtime · precision@k',
  },
  {
    id: 'mdl_upsell',
    name: 'Upsell ranker',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 95,
    kpis: 10,
    updated: '24 Oct 2026',
    focus: 'NDCG · email channel',
  },
  {
    id: 'mdl_support',
    name: 'Ticket triage',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 93,
    kpis: 9,
    updated: '24 Oct 2026',
    focus: 'Macro-F1 · queue routing',
  },
  {
    id: 'mdl_pricing',
    name: 'Price elasticity',
    owner: 'Dev Poluru',
    status: 'Watch',
    health: 79,
    kpis: 12,
    updated: '23 Oct 2026',
    focus: 'Elasticity · region splits',
  },
  {
    id: 'mdl_inventory',
    name: 'Stockout predictor',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 90,
    kpis: 13,
    updated: '22 Oct 2026',
    focus: 'Recall · DC network',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Model', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Eval score' },
  { key: 'kpis', label: 'Metrics' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Close fraud precision gap', owner: 'Anika Poluru', scorecard: 'Fraud detector', progress: 58, target: '12 Nov', status: 'At risk' },
  { id: 'g2', name: 'Credit holdout recalibration', owner: 'Arjun Poluru', scorecard: 'Credit risk', progress: 72, target: '8 Nov', status: 'Watch' },
  { id: 'g3', name: 'Pricing region fairness suite', owner: 'Dev Poluru', scorecard: 'Price elasticity', progress: 64, target: '20 Nov', status: 'Watch' },
  { id: 'g4', name: 'Churn shadow promotion', owner: 'Kavya Poluru', scorecard: 'Churn scorer', progress: 91, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Forecast holiday backtest', owner: 'Nikhil Poluru', scorecard: 'Demand forecast', progress: 86, target: '15 Nov', status: 'On track' },
  { id: 'g6', name: 'Support triage latency budget', owner: 'Sahana Poluru', scorecard: 'Ticket triage', progress: 88, target: '5 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Eval goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Model' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Model quality lead', squad: 'Governance', rating: 5, score: 96 },
  { name: 'Kavya Poluru', role: 'Data scientist', squad: 'Growth', rating: 5, score: 96 },
  { name: 'Arjun Poluru', role: 'Risk analytics', squad: 'Finance', rating: 4, score: 84 },
  { name: 'Anika Poluru', role: 'Fraud analytics', squad: 'Security', rating: 4, score: 71 },
  { name: 'Nikhil Poluru', role: 'Forecasting lead', squad: 'Supply', rating: 5, score: 92 },
  { name: 'Dev Poluru', role: 'Pricing science', squad: 'Revenue', rating: 4, score: 79 },
  { name: 'Priya Poluru', role: 'Marketing science', squad: 'Growth', rating: 5, score: 95 },
  { name: 'Sahana Poluru', role: 'Ops research', squad: 'Support', rating: 5, score: 93 },
  { name: 'Rohan Poluru', role: 'Inventory planning', squad: 'Supply', rating: 4, score: 90 },
  { name: 'Luca Poluru', role: 'MLOps engineer', squad: 'Platform', rating: 5, score: 91 },
  { name: 'Elena Poluru', role: 'Fairness reviewer', squad: 'Governance', rating: 5, score: 89 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 92 },
];

export const alerts = [
  { id: 'a1', title: 'Fraud precision@100 below threshold', owner: 'Anika Poluru', scorecard: 'Fraud detector', severity: 'Red', since: '26 Oct', note: 'Holdout week 42 dropped to 0.71 vs 0.78 gate.' },
  { id: 'a2', title: 'Credit calibration drift detected', owner: 'Arjun Poluru', scorecard: 'Credit risk', severity: 'Amber', since: '25 Oct', note: 'Score distribution shift in Midwest segment.' },
  { id: 'a3', title: 'Pricing fairness check failed', owner: 'Dev Poluru', scorecard: 'Price elasticity', severity: 'Amber', since: '24 Oct', note: 'Parity gap on region B exceeds 3 pts.' },
  { id: 'a4', title: 'Churn shadow match confirmed', owner: 'Kavya Poluru', scorecard: 'Churn scorer', severity: 'Green', since: '24 Oct', note: 'Candidate 7.3.2 matches production within 0.5%.' },
  { id: 'a5', title: 'Forecast MAPE spike on electronics', owner: 'Nikhil Poluru', scorecard: 'Demand forecast', severity: 'Amber', since: '23 Oct', note: 'Promo calendar mismatch in training slice.' },
  { id: 'a6', title: 'Ticket triage latency regression', owner: 'Sahana Poluru', scorecard: 'Ticket triage', severity: 'Green', since: '22 Oct', note: 'Resolved after batch size tuning.' },
];

export const reviews = [
  { label: 'Weekly eval standup', description: 'Mira Poluru · finding triage', timestamp: '21 Oct', icon: 'clock', status: 'Done' },
  { label: 'Fraud gate review', description: 'Anika Poluru · blocking', timestamp: '26 Oct', icon: 'alert-triangle', status: 'Today' },
  { label: 'Credit recalibration plan', description: 'Arjun Poluru · risk committee', timestamp: '28 Oct', icon: 'folder', status: 'Next' },
  { label: 'Fairness office hours', description: 'Elena Poluru · squads', timestamp: '30 Oct', icon: 'user', status: 'Scheduled' },
  { label: 'Release 7.3 sign-off', description: 'Luca Poluru · production', timestamp: '22 Nov', icon: 'check', status: 'Scheduled' },
  { label: 'Holdout refresh', description: 'Hana Poluru · data cut', timestamp: '5 Nov', icon: 'settings', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Holdout AUC', us: '0.91', peer: '0.89', gap: '+0.02', status: 'Ahead' },
  { metric: 'Calibration (ECE)', us: '0.04', peer: '0.05', gap: '−0.01', status: 'Ahead' },
  { metric: 'Precision@100', us: '0.82', peer: '0.84', gap: '−0.02', status: 'Watch' },
  { metric: 'Fairness parity', us: '89%', peer: '86%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Inference p95', us: '42ms', peer: '48ms', gap: '−6ms', status: 'Ahead' },
  { metric: 'Data freshness', us: '96%', peer: '93%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Shadow agreement', us: '98%', peer: '95%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Documentation coverage', us: '92%', peer: '88%', gap: '+4 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Meridian' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Eval summary — window 4', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Finding export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Model card pack', owner: 'Luca Poluru', updated: '25 Oct 2026', format: 'ZIP' },
  { name: 'Fairness attestation', owner: 'Elena Poluru', updated: '24 Oct 2026', format: 'PDF' },
  { name: 'Holdout manifest', owner: 'Arjun Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Latency benchmark log', owner: 'Luca Poluru', updated: '22 Oct 2026', format: 'XLSX' },
];

export const inboxItems = [
  { label: 'Fraud model blocked for promotion', description: 'Anika Poluru · precision gate', icon: 'alert-triangle' },
  { label: 'Churn shadow ready to ship', description: 'Kavya Poluru · 7.3.2', icon: 'check' },
  { label: 'Credit drift under review', description: 'Arjun Poluru · Midwest', icon: 'clock' },
  { label: 'Release 7.3 checklist', description: 'Luca Poluru · 22 Nov', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Eval pulse', href: '#/overview', icon: 'home' },
  { label: 'Fraud detector', description: 'Anika Poluru', href: '#/scorecard/mdl_fraud', icon: 'star' },
  { label: 'Open findings', description: 'Review queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Eval goals', description: 'Window 4', href: '#/goals', icon: 'check' },
  { label: 'Benchmarks', description: 'Metric gates', href: '#/benchmarks', icon: 'folder' },
  { label: 'Team', description: 'Owners and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Model', description: 'Version and owner' },
  { label: 'Metrics', description: 'Gates and holdout' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'growth',
    label: 'Growth',
    children: [
      { id: 'churn', label: 'Churn scorer', href: '#/scorecard/mdl_churn' },
      { id: 'upsell', label: 'Upsell ranker', href: '#/scorecard/mdl_upsell' },
    ],
  },
  {
    id: 'risk',
    label: 'Risk',
    children: [
      { id: 'credit', label: 'Credit risk', href: '#/scorecard/mdl_credit' },
      { id: 'fraud', label: 'Fraud detector', href: '#/scorecard/mdl_fraud' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    children: [
      { id: 'forecast', label: 'Demand forecast', href: '#/scorecard/mdl_forecast' },
      { id: 'inventory', label: 'Stockout predictor', href: '#/scorecard/mdl_inventory' },
      { id: 'support', label: 'Ticket triage', href: '#/scorecard/mdl_support' },
    ],
  },
];

export const metricRows = [
  { metric: 'Holdout AUC', actual: '0.91', target: '0.90', variance: '+0.01', status: 'On track' },
  { metric: 'Calibration ECE', actual: '0.04', target: '0.05', variance: '−0.01', status: 'On track' },
  { metric: 'Shadow agreement', actual: '98%', target: '97%', variance: '+1 pt', status: 'On track' },
  { metric: 'Blocking findings', actual: '3', target: '0', variance: '+3', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/models/mdl_fraud/evaluation
Authorization: Bearer gge_live_****

{
  "id": "mdl_fraud",
  "name": "Fraud detector",
  "eval_score": 71,
  "owner": "Anika Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Model',
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
