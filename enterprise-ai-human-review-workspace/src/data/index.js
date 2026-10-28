export const productName = 'Panel';
export const productLine = 'Review workspace';
export const workspaceName = 'Summit Review Board';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@summit.example',
  role: 'Review operations lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Cycle 14 · rubric v3.1',
  timezone: 'America / Chicago',
  close: 'Calibration freeze 19 Nov 2026',
};

export const tickerItems = [
  { label: 'Agreement rate', value: '94%', delta: '+1 pt', trend: 'up', href: '#/trends' },
  { label: 'Open escalations', value: '18', delta: '−4', trend: 'up', href: '#/alerts' },
  { label: 'Queues', value: '12', delta: 'Hold', trend: 'flat', href: '#/scorecards' },
  { label: 'SLA on-time', value: '96%', delta: '+2 pts', trend: 'up', href: '#/benchmarks' },
  { label: 'Items / reviewer', value: '42', delta: '−3', trend: 'up', href: '#/trends' },
  { label: 'Median turnaround', value: '6.2h', delta: '−40m', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Queues', href: '#/scorecards', icon: 'folder' },
  { label: 'Escalations', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Inter-rater agreement', value: '94%', hint: 'Gold-set calibration cycle 14', trend: 'up', trendValue: '+1 pt' },
  { label: 'Open escalations', value: '18', hint: '6 past SLA window', trend: 'up', trendValue: '−4' },
  { label: 'Active queues', value: '12', hint: 'Specialist review programs', trend: 'flat', trendValue: 'Hold' },
  { label: 'SLA adherence', value: '96%', hint: 'Decisions within target window', trend: 'up', trendValue: '+2 pts' },
  { label: 'Items in queue', value: '3,840', hint: 'Awaiting first review', trend: 'down', trendValue: '−12%' },
  { label: 'Rework rate', value: '4.1%', hint: 'Sent back for second pass', trend: 'up', trendValue: '−0.6 pts' },
  { label: 'Reviews completed / day', value: '1,920', hint: 'Rolling 7-day average', trend: 'up', trendValue: '+5%' },
  { label: 'Median turnaround', value: '6.2h', hint: 'Submit to signed decision', trend: 'up', trendValue: '−40m' },
];

export const revenueTrend = [90, 91, 91, 92, 92, 93, 93, 93, 94, 94, 94, 94];

export const scorecards = [
  {
    id: 'que_claims',
    name: 'Claims adjudication',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 95,
    kpis: 1240,
    updated: '26 Oct 2026',
    focus: 'Health · tier-2 appeals',
  },
  {
    id: 'que_content',
    name: 'Publisher submissions',
    owner: 'Sahana Poluru',
    status: 'Watch',
    health: 84,
    kpis: 890,
    updated: '26 Oct 2026',
    focus: 'Community · policy fit',
  },
  {
    id: 'que_vendor',
    name: 'Vendor onboarding',
    owner: 'Arjun Poluru',
    status: 'On track',
    health: 92,
    kpis: 320,
    updated: '25 Oct 2026',
    focus: 'Procurement · attestations',
  },
  {
    id: 'que_access',
    name: 'Access requests',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 97,
    kpis: 560,
    updated: '25 Oct 2026',
    focus: 'Identity · least privilege',
  },
  {
    id: 'que_refund',
    name: 'Refund disputes',
    owner: 'Kavya Poluru',
    status: 'At risk',
    health: 73,
    kpis: 410,
    updated: '24 Oct 2026',
    focus: 'Commerce · chargebacks',
  },
  {
    id: 'que_safety',
    name: 'Safety reports',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 96,
    kpis: 180,
    updated: '24 Oct 2026',
    focus: 'Workplace · urgent lane',
  },
  {
    id: 'que_legal',
    name: 'Legal holds',
    owner: 'Anika Poluru',
    status: 'Watch',
    health: 88,
    kpis: 95,
    updated: '23 Oct 2026',
    focus: 'Counsel · document review',
  },
  {
    id: 'que_training',
    name: 'Certification exams',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 91,
    kpis: 640,
    updated: '22 Oct 2026',
    focus: 'Learning · proctor rubric',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Queue', sortable: true },
  { key: 'owner', label: 'Lead', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Quality score' },
  { key: 'kpis', label: 'Pending items' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Refund queue SLA recovery', owner: 'Kavya Poluru', scorecard: 'Refund disputes', progress: 52, target: '8 Nov', status: 'At risk' },
  { id: 'g2', name: 'Publisher rubric calibration', owner: 'Sahana Poluru', scorecard: 'Publisher submissions', progress: 67, target: '12 Nov', status: 'Watch' },
  { id: 'g3', name: 'Legal hold reviewer training', owner: 'Anika Poluru', scorecard: 'Legal holds', progress: 74, target: '15 Nov', status: 'Watch' },
  { id: 'g4', name: 'Cycle 14 gold-set refresh', owner: 'Mira Poluru', scorecard: 'Summit Review Board', progress: 83, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Claims double-blind sample', owner: 'Priya Poluru', scorecard: 'Claims adjudication', progress: 90, target: '5 Nov', status: 'On track' },
  { id: 'g6', name: 'Access request auto-routing', owner: 'Nikhil Poluru', scorecard: 'Access requests', progress: 78, target: '18 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Operations goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Queue' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Review operations lead', squad: 'Governance', rating: 5, score: 95 },
  { name: 'Priya Poluru', role: 'Claims reviewer lead', squad: 'Health', rating: 5, score: 95 },
  { name: 'Sahana Poluru', role: 'Publisher review lead', squad: 'Community', rating: 4, score: 84 },
  { name: 'Kavya Poluru', role: 'Commerce disputes', squad: 'Revenue', rating: 4, score: 73 },
  { name: 'Arjun Poluru', role: 'Vendor diligence', squad: 'Procurement', rating: 5, score: 92 },
  { name: 'Nikhil Poluru', role: 'Access governance', squad: 'Platform', rating: 5, score: 97 },
  { name: 'Elena Poluru', role: 'Safety program', squad: 'People', rating: 5, score: 96 },
  { name: 'Anika Poluru', role: 'Legal review', squad: 'Counsel', rating: 5, score: 88 },
  { name: 'Dev Poluru', role: 'Rubric designer', squad: 'Governance', rating: 5, score: 91 },
  { name: 'Luca Poluru', role: 'Queue tooling', squad: 'Platform', rating: 5, score: 93 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 90 },
  { name: 'Rohan Poluru', role: 'Learning certification', squad: 'People', rating: 4, score: 91 },
];

export const alerts = [
  { id: 'a1', title: 'Refund queue past SLA', owner: 'Kavya Poluru', scorecard: 'Refund disputes', severity: 'Red', since: '26 Oct', note: '142 items over 24h target · staffing gap on evening shift.' },
  { id: 'a2', title: 'Publisher agreement dip', owner: 'Sahana Poluru', scorecard: 'Publisher submissions', severity: 'Amber', since: '25 Oct', note: '88% vs 92% calibration floor on cycle 14 sample.' },
  { id: 'a3', title: 'Legal hold backlog', owner: 'Anika Poluru', scorecard: 'Legal holds', severity: 'Amber', since: '25 Oct', note: 'Counsel review window extended on matter 4412.' },
  { id: 'a4', title: 'Claims calibration passed', owner: 'Priya Poluru', scorecard: 'Claims adjudication', severity: 'Green', since: '24 Oct', note: 'Gold-set signed by Dev Poluru.' },
  { id: 'a5', title: 'Access queue cleared', owner: 'Nikhil Poluru', scorecard: 'Access requests', severity: 'Green', since: '23 Oct', note: 'Zero items past SLA for 72 hours.' },
  { id: 'a6', title: 'Safety urgent lane stable', owner: 'Elena Poluru', scorecard: 'Safety reports', severity: 'Green', since: '22 Oct', note: 'Median response under 45 minutes.' },
];

export const reviews = [
  { label: 'Escalation standup', description: 'Mira Poluru · SLA breaches', timestamp: '27 Oct', icon: 'clock', status: 'Today' },
  { label: 'Refund staffing review', description: 'Kavya Poluru · red queue', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Next' },
  { label: 'Rubric council', description: 'Dev Poluru · v3.1', timestamp: '30 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Double-blind readout', description: 'Priya Poluru · claims', timestamp: '1 Nov', icon: 'eye', status: 'Scheduled' },
  { label: 'Reviewer coaching', description: 'Sahana Poluru · publisher', timestamp: '4 Nov', icon: 'user', status: 'Scheduled' },
  { label: 'Cycle 14 report freeze', description: 'Hana Poluru · exports', timestamp: '19 Nov', icon: 'download', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Inter-rater agreement', us: '94%', peer: '90%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'SLA adherence', us: '96%', peer: '93%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Median turnaround', us: '6.2h', peer: '7.1h', gap: '−54m', status: 'Ahead' },
  { metric: 'Rework rate', us: '4.1%', peer: '4.5%', gap: '−0.4 pts', status: 'Ahead' },
  { metric: 'Escalation rate', us: '2.8%', peer: '2.5%', gap: '+0.3 pts', status: 'Watch' },
  { metric: 'Reviewer utilization', us: '78%', peer: '75%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Calibration pass', us: '91%', peer: '89%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Appeal overturn', us: '6%', peer: '7%', gap: '−1 pt', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Summit Review Board' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Cycle 14 operations summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Escalation export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Calibration results', owner: 'Dev Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Rubric v3.1 pack', owner: 'Sahana Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Queue manifest', owner: 'Luca Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Reviewer scorecards', owner: 'Priya Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Refund SLA breach', description: 'Kavya Poluru · Red', icon: 'alert-triangle' },
  { label: 'Claims calibration done', description: 'Priya Poluru · Complete', icon: 'check' },
  { label: 'Publisher agreement', description: 'Sahana Poluru · Review', icon: 'clock' },
  { label: 'Calibration freeze 19 Nov', description: 'Dev Poluru · Cycle 14', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Review pulse', href: '#/overview', icon: 'home' },
  { label: 'Refund disputes', description: 'Kavya Poluru', href: '#/scorecard/que_refund', icon: 'folder' },
  { label: 'Open escalations', description: 'Escalation queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Operations goals', description: 'Cycle 14', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Reviewers and leads', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Queue', description: 'Program and lead' },
  { label: 'Rubric', description: 'SLA and calibration' },
  { label: 'Confirm', description: 'Supervisor PIN' },
];

export const scorecardTree = [
  {
    id: 'customer',
    label: 'Customer',
    children: [
      { id: 'claims', label: 'Claims adjudication', href: '#/scorecard/que_claims' },
      { id: 'refund', label: 'Refund disputes', href: '#/scorecard/que_refund' },
      { id: 'content', label: 'Publisher submissions', href: '#/scorecard/que_content' },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    children: [
      { id: 'vendor', label: 'Vendor onboarding', href: '#/scorecard/que_vendor' },
      { id: 'access', label: 'Access requests', href: '#/scorecard/que_access' },
      { id: 'legal', label: 'Legal holds', href: '#/scorecard/que_legal' },
    ],
  },
  {
    id: 'people',
    label: 'People',
    children: [
      { id: 'safety', label: 'Safety reports', href: '#/scorecard/que_safety' },
      { id: 'training', label: 'Certification exams', href: '#/scorecard/que_training' },
    ],
  },
];

export const metricRows = [
  { metric: 'Agreement', actual: '94%', target: '92%', variance: '+2 pts', status: 'On track' },
  { metric: 'SLA on-time', actual: '96%', target: '95%', variance: '+1 pt', status: 'On track' },
  { metric: 'Rework', actual: '4.1%', target: '3.5%', variance: '+0.6 pts', status: 'Watch' },
  { metric: 'Past SLA', actual: '6', target: '0', variance: '+6', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/queues/que_claims/metrics
Authorization: Bearer pnl_live_****

{
  "id": "que_claims",
  "name": "Claims adjudication",
  "agreement_rate": 0.94,
  "lead": "Priya Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Queue',
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
    type: 'Escalation',
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
