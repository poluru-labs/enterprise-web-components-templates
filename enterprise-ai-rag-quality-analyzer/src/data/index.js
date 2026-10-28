export const productName = 'Anchor';
export const productLine = 'Retrieval quality';
export const workspaceName = 'Atlas Knowledge';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@atlas.example',
  role: 'Retrieval quality lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Cycle 12 · query suite v3',
  timezone: 'America / Chicago',
  close: 'Production index freeze 19 Nov 2026',
};

export const tickerItems = [
  { label: 'Quality score', value: '93%', delta: '+2 pts', trend: 'up', href: '#/trends' },
  { label: 'Open issues', value: '19', delta: '−3', trend: 'up', href: '#/alerts' },
  { label: 'Collections', value: '28', delta: '+2', trend: 'up', href: '#/scorecards' },
  { label: 'Citation match', value: '91%', delta: '+1 pt', trend: 'up', href: '#/benchmarks' },
  { label: 'Recall@5', value: '88%', delta: '+2 pts', trend: 'up', href: '#/benchmarks' },
  { label: 'Latency p95', value: '380ms', delta: '−20ms', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Collections', href: '#/scorecards', icon: 'folder' },
  { label: 'Issues', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Overall quality score', value: '93%', hint: 'Weighted query suite v3', trend: 'up', trendValue: '+2 pts' },
  { label: 'Open issues', value: '19', hint: '4 blocking index promotion', trend: 'up', trendValue: '−3' },
  { label: 'Indexed collections', value: '28', hint: 'Policy, support, product docs', trend: 'up', trendValue: '+2' },
  { label: 'Recall@5', value: '88%', hint: 'Gold passage in top five', trend: 'up', trendValue: '+2 pts' },
  { label: 'Citation accuracy', value: '91%', hint: 'Answer spans match sources', trend: 'up', trendValue: '+1 pt' },
  { label: 'Chunk coverage', value: '96%', hint: 'Corpus segments indexed', trend: 'flat', trendValue: 'Hold' },
  { label: 'Query suite size', value: '842', hint: 'Labeled questions', trend: 'up', trendValue: '+48' },
  { label: 'Response p95', value: '380ms', hint: 'End-to-end retrieval path', trend: 'up', trendValue: '−20ms' },
];

export const revenueTrend = [86, 87, 88, 89, 90, 90, 91, 91, 92, 92, 93, 93];

export const scorecards = [
  {
    id: 'col_support',
    name: 'Support articles',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 95,
    kpis: 120,
    updated: '26 Oct 2026',
    focus: '842 articles · tier-1',
  },
  {
    id: 'col_policy',
    name: 'Policy handbook',
    owner: 'Anika Poluru',
    status: 'On track',
    health: 94,
    kpis: 86,
    updated: '26 Oct 2026',
    focus: 'Legal · compliance',
  },
  {
    id: 'col_product',
    name: 'Product docs',
    owner: 'Dev Poluru',
    status: 'Watch',
    health: 81,
    kpis: 210,
    updated: '25 Oct 2026',
    focus: 'API reference split',
  },
  {
    id: 'col_hr',
    name: 'HR knowledge',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 92,
    kpis: 64,
    updated: '25 Oct 2026',
    focus: 'Benefits · payroll FAQ',
  },
  {
    id: 'col_sales',
    name: 'Sales playbooks',
    owner: 'Kavya Poluru',
    status: 'At risk',
    health: 69,
    kpis: 48,
    updated: '24 Oct 2026',
    focus: 'Stale chunks · Q3 decks',
  },
  {
    id: 'col_engineering',
    name: 'Engineering runbooks',
    owner: 'Luca Poluru',
    status: 'On track',
    health: 97,
    kpis: 72,
    updated: '24 Oct 2026',
    focus: 'Incident response',
  },
  {
    id: 'col_finance',
    name: 'Finance procedures',
    owner: 'Arjun Poluru',
    status: 'Watch',
    health: 78,
    kpis: 55,
    updated: '23 Oct 2026',
    focus: 'Table-heavy PDFs',
  },
  {
    id: 'col_training',
    name: 'Training library',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 90,
    kpis: 38,
    updated: '22 Oct 2026',
    focus: 'Video transcripts',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Collection', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Quality score' },
  { key: 'kpis', label: 'Queries' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Refresh sales playbook chunks', owner: 'Kavya Poluru', scorecard: 'Sales playbooks', progress: 52, target: '10 Nov', status: 'At risk' },
  { id: 'g2', name: 'Product API chunk boundaries', owner: 'Dev Poluru', scorecard: 'Product docs', progress: 68, target: '15 Nov', status: 'Watch' },
  { id: 'g3', name: 'Finance table extraction fix', owner: 'Arjun Poluru', scorecard: 'Finance procedures', progress: 61, target: '18 Nov', status: 'Watch' },
  { id: 'g4', name: 'Support citation audit', owner: 'Sahana Poluru', scorecard: 'Support articles', progress: 89, target: '5 Nov', status: 'On track' },
  { id: 'g5', name: 'Query suite v3.1 expansion', owner: 'Mira Poluru', scorecard: 'Atlas Knowledge', progress: 74, target: '22 Nov', status: 'On track' },
  { id: 'g6', name: 'Runbook recall regression', owner: 'Luca Poluru', scorecard: 'Engineering runbooks', progress: 96, target: '1 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Quality goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Collection' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Retrieval quality lead', squad: 'Governance', rating: 5, score: 93 },
  { name: 'Priya Poluru', role: 'Support content', squad: 'Support', rating: 5, score: 95 },
  { name: 'Dev Poluru', role: 'Technical writer', squad: 'Product', rating: 4, score: 81 },
  { name: 'Kavya Poluru', role: 'Sales enablement', squad: 'Revenue', rating: 4, score: 69 },
  { name: 'Sahana Poluru', role: 'Quality analyst', squad: 'Governance', rating: 5, score: 91 },
  { name: 'Luca Poluru', role: 'SRE documentation', squad: 'Platform', rating: 5, score: 97 },
  { name: 'Arjun Poluru', role: 'Finance ops', squad: 'Finance', rating: 4, score: 78 },
  { name: 'Elena Poluru', role: 'HR content', squad: 'People', rating: 5, score: 92 },
  { name: 'Anika Poluru', role: 'Policy owner', squad: 'Legal', rating: 5, score: 94 },
  { name: 'Rohan Poluru', role: 'Learning design', squad: 'People', rating: 4, score: 90 },
  { name: 'Nikhil Poluru', role: 'Search platform', squad: 'Platform', rating: 5, score: 88 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 89 },
];

export const alerts = [
  { id: 'a1', title: 'Sales playbook recall@5 below gate', owner: 'Kavya Poluru', scorecard: 'Sales playbooks', severity: 'Red', since: '26 Oct', note: '0.62 vs 0.75 minimum on cycle 12 suite.' },
  { id: 'a2', title: 'Product doc chunk overlap', owner: 'Dev Poluru', scorecard: 'Product docs', severity: 'Amber', since: '25 Oct', note: 'Duplicate API endpoints in adjacent segments.' },
  { id: 'a3', title: 'Finance citation mismatch', owner: 'Arjun Poluru', scorecard: 'Finance procedures', severity: 'Amber', since: '24 Oct', note: '12 queries cite wrong appendix page.' },
  { id: 'a4', title: 'Support gold set refreshed', owner: 'Priya Poluru', scorecard: 'Support articles', severity: 'Green', since: '24 Oct', note: '842 labels verified by Sahana Poluru.' },
  { id: 'a5', title: 'Runbook latency spike', owner: 'Luca Poluru', scorecard: 'Engineering runbooks', severity: 'Green', since: '23 Oct', note: 'Resolved after index compaction.' },
  { id: 'a6', title: 'HR FAQ stale effective dates', owner: 'Elena Poluru', scorecard: 'HR knowledge', severity: 'Amber', since: '22 Oct', note: 'Open enrollment copy not reindexed.' },
];

export const reviews = [
  { label: 'Query suite triage', description: 'Mira Poluru · open issues', timestamp: '21 Oct', icon: 'clock', status: 'Done' },
  { label: 'Sales collection review', description: 'Kavya Poluru · blocking', timestamp: '26 Oct', icon: 'alert-triangle', status: 'Today' },
  { label: 'Citation spot audit', description: 'Sahana Poluru · 50 samples', timestamp: '28 Oct', icon: 'eye', status: 'Next' },
  { label: 'Index promotion gate', description: 'Nikhil Poluru · platform', timestamp: '19 Nov', icon: 'check', status: 'Scheduled' },
  { label: 'Content owner office hours', description: 'Priya Poluru · support', timestamp: '30 Oct', icon: 'user', status: 'Scheduled' },
  { label: 'Cycle 12 report freeze', description: 'Hana Poluru · exports', timestamp: '22 Nov', icon: 'folder', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Recall@5', us: '88%', peer: '85%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Precision@1', us: '76%', peer: '74%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Citation accuracy', us: '91%', peer: '88%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Answer groundedness', us: '89%', peer: '90%', gap: '−1 pt', status: 'Watch' },
  { metric: 'Chunk freshness', us: '94%', peer: '91%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Index completeness', us: '96%', peer: '93%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Query latency p95', us: '380ms', peer: '420ms', gap: '−40ms', status: 'Ahead' },
  { metric: 'Human review pass', us: '92%', peer: '89%', gap: '+3 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Atlas Knowledge' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Cycle 12 quality summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Issue export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Query suite v3 results', owner: 'Sahana Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Citation audit pack', owner: 'Priya Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Index manifest', owner: 'Nikhil Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Collection scorecards', owner: 'Dev Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Sales recall gate failing', description: 'Kavya Poluru · Red', icon: 'alert-triangle' },
  { label: 'Support labels verified', description: 'Sahana Poluru · Complete', icon: 'check' },
  { label: 'Product chunk overlap', description: 'Dev Poluru · Review', icon: 'clock' },
  { label: 'Index freeze 19 Nov', description: 'Nikhil Poluru · Platform', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Quality pulse', href: '#/overview', icon: 'home' },
  { label: 'Sales playbooks', description: 'Kavya Poluru', href: '#/scorecard/col_sales', icon: 'folder' },
  { label: 'Open issues', description: 'Issue queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Quality goals', description: 'Cycle 12', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Metric gates', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Owners and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Collection', description: 'Corpus and owner' },
  { label: 'Suite', description: 'Queries and gates' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'customer',
    label: 'Customer',
    children: [
      { id: 'support', label: 'Support articles', href: '#/scorecard/col_support' },
      { id: 'product', label: 'Product docs', href: '#/scorecard/col_product' },
    ],
  },
  {
    id: 'internal',
    label: 'Internal',
    children: [
      { id: 'policy', label: 'Policy handbook', href: '#/scorecard/col_policy' },
      { id: 'hr', label: 'HR knowledge', href: '#/scorecard/col_hr' },
      { id: 'finance', label: 'Finance procedures', href: '#/scorecard/col_finance' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    children: [
      { id: 'sales', label: 'Sales playbooks', href: '#/scorecard/col_sales' },
      { id: 'runbooks', label: 'Engineering runbooks', href: '#/scorecard/col_engineering' },
      { id: 'training', label: 'Training library', href: '#/scorecard/col_training' },
    ],
  },
];

export const metricRows = [
  { metric: 'Recall@5', actual: '88%', target: '85%', variance: '+3 pts', status: 'On track' },
  { metric: 'Citation accuracy', actual: '91%', target: '90%', variance: '+1 pt', status: 'On track' },
  { metric: 'Groundedness', actual: '89%', target: '92%', variance: '−3 pts', status: 'Watch' },
  { metric: 'Blocking issues', actual: '4', target: '0', variance: '+4', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/collections/col_support/quality
Authorization: Bearer anc_live_****

{
  "id": "col_support",
  "name": "Support articles",
  "quality_score": 95,
  "owner": "Priya Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Collection',
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
    type: 'Issue',
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
