export const productName = 'Signal';
export const productLine = 'KPIs';
export const workspaceName = 'Clearline Holdings';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@clearline.example',
  role: 'Head of performance',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 Q3 · week 9',
  timezone: 'America / Chicago',
  close: 'Books close 4 Sep 2026',
};

export const tickerItems = [
  { label: 'Revenue', value: '$18.4M', delta: '+7.6%', trend: 'up', href: '#/trends' },
  { label: 'NRR', value: '118%', delta: '+4 pts', trend: 'up', href: '#/scorecards' },
  { label: 'Margin', value: '71.2%', delta: '+1.2 pts', trend: 'up', href: '#/scorecards' },
  { label: 'NPS', value: '62', delta: '+5', trend: 'up', href: '#/benchmarks' },
  { label: 'Pipeline', value: '3.4x', delta: 'On plan', trend: 'flat', href: '#/goals' },
  { label: 'Uptime', value: '99.97%', delta: 'SLO hold', trend: 'flat', href: '#/alerts' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Scorecards', href: '#/scorecards', icon: 'star' },
  { label: 'Goals', href: '#/goals', icon: 'check' },
  { label: 'Trends', href: '#/trends', icon: 'file' },
  { label: 'Teams', href: '#/teams', icon: 'user' },
  { label: 'Alerts', href: '#/alerts', icon: 'bell' },
  { label: 'Reviews', href: '#/reviews', icon: 'eye' },
  { label: 'Benchmarks', href: '#/benchmarks', icon: 'folder' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Revenue', value: '$18.4M', hint: 'Q3 to date vs $17.1M plan', trend: 'up', trendValue: '+7.6%' },
  { label: 'Net revenue retain', value: '118%', hint: 'Expansion beating churn', trend: 'up', trendValue: '+4 pts' },
  { label: 'Gross margin', value: '71.2%', hint: 'Target 70%', trend: 'up', trendValue: '+1.2 pts' },
  { label: 'NPS', value: '62', hint: 'Promoters 71%', trend: 'up', trendValue: '+5' },
  { label: 'Pipeline coverage', value: '3.4x', hint: 'Next-quarter quota', trend: 'flat', trendValue: 'On plan' },
  { label: 'Active accounts', value: '1,284', hint: '42 added this month', trend: 'up', trendValue: '+3.4%' },
  { label: 'Support CSAT', value: '4.7', hint: 'Trailing 30 days', trend: 'up', trendValue: '+0.2' },
  { label: 'Uptime', value: '99.97%', hint: 'SLO 99.9%', trend: 'flat', trendValue: 'Hold' },
];

export const revenueTrend = [12.8, 13.1, 13.4, 14.0, 14.6, 15.1, 15.8, 16.4, 16.9, 17.4, 17.9, 18.4];

export const scorecards = [
  {
    id: 'sc_finance',
    name: 'Finance',
    owner: 'Arjun Poluru',
    status: 'On track',
    health: 92,
    kpis: 8,
    updated: '29 Aug 2026',
    focus: 'Margin and cash',
  },
  {
    id: 'sc_growth',
    name: 'Growth',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 88,
    kpis: 10,
    updated: '28 Aug 2026',
    focus: 'Pipeline and NRR',
  },
  {
    id: 'sc_product',
    name: 'Product',
    owner: 'Nikhil Poluru',
    status: 'Watch',
    health: 74,
    kpis: 7,
    updated: '28 Aug 2026',
    focus: 'Adoption of 1.8',
  },
  {
    id: 'sc_people',
    name: 'People',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 86,
    kpis: 6,
    updated: '27 Aug 2026',
    focus: 'Attrition under 8%',
  },
  {
    id: 'sc_ops',
    name: 'Operations',
    owner: 'Rohan Poluru',
    status: 'At risk',
    health: 61,
    kpis: 9,
    updated: '29 Aug 2026',
    focus: 'Fulfillment SLA',
  },
  {
    id: 'sc_customer',
    name: 'Customer',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 90,
    kpis: 8,
    updated: '29 Aug 2026',
    focus: 'NPS and CSAT',
  },
  {
    id: 'sc_technology',
    name: 'Technology',
    owner: 'Dev Poluru',
    status: 'On track',
    health: 84,
    kpis: 7,
    updated: '30 Aug 2026',
    focus: 'Platform reliability',
  },
  {
    id: 'sc_security',
    name: 'Security',
    owner: 'Anika Poluru',
    status: 'Watch',
    health: 78,
    kpis: 5,
    updated: '30 Aug 2026',
    focus: 'SOC 2 readiness',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Scorecard', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Health' },
  { key: 'kpis', label: 'KPIs' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Close Q3 at $19.2M', owner: 'Arjun Poluru', scorecard: 'Finance', progress: 86, target: '19 Sep', status: 'On track' },
  { id: 'g2', name: 'Hold NRR above 115%', owner: 'Kavya Poluru', scorecard: 'Growth', progress: 94, target: '30 Sep', status: 'On track' },
  { id: 'g3', name: 'Ship adoption to 40%', owner: 'Nikhil Poluru', scorecard: 'Product', progress: 58, target: '12 Oct', status: 'Watch' },
  { id: 'g4', name: 'Attrition under 8%', owner: 'Elena Poluru', scorecard: 'People', progress: 80, target: '31 Dec', status: 'On track' },
  { id: 'g5', name: 'Fulfillment SLA 98%', owner: 'Rohan Poluru', scorecard: 'Operations', progress: 64, target: '15 Sep', status: 'At risk' },
  { id: 'g6', name: 'NPS 65 by year end', owner: 'Priya Poluru', scorecard: 'Customer', progress: 78, target: '31 Dec', status: 'On track' },
  { id: 'g7', name: 'Platform uptime 99.95%', owner: 'Dev Poluru', scorecard: 'Technology', progress: 91, target: '30 Sep', status: 'On track' },
  { id: 'g8', name: 'Close SOC 2 Type II', owner: 'Anika Poluru', scorecard: 'Security', progress: 72, target: '15 Nov', status: 'Watch' },
];

export const goalColumns = [
  { key: 'name', label: 'Goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Scorecard' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Head of performance', squad: 'Office of the CEO', rating: 5, score: 94 },
  { name: 'Arjun Poluru', role: 'CFO', squad: 'Finance', rating: 5, score: 92 },
  { name: 'Kavya Poluru', role: 'VP growth', squad: 'Growth', rating: 5, score: 88 },
  { name: 'Nikhil Poluru', role: 'VP product', squad: 'Product', rating: 4, score: 74 },
  { name: 'Elena Poluru', role: 'Chief people officer', squad: 'People', rating: 5, score: 86 },
  { name: 'Rohan Poluru', role: 'COO', squad: 'Operations', rating: 4, score: 61 },
  { name: 'Priya Poluru', role: 'VP customer', squad: 'Customer', rating: 5, score: 90 },
  { name: 'Hana Poluru', role: 'Controller', squad: 'Finance', rating: 4, score: 84 },
  { name: 'Luca Poluru', role: 'RevOps lead', squad: 'Growth', rating: 4, score: 81 },
  { name: 'Sahana Poluru', role: 'People analytics', squad: 'People', rating: 4, score: 79 },
  { name: 'Dev Poluru', role: 'VP engineering', squad: 'Technology', rating: 5, score: 84 },
  { name: 'Anika Poluru', role: 'CISO', squad: 'Security', rating: 4, score: 78 },
];

export const alerts = [
  { id: 'a1', title: 'Fulfillment SLA below 96%', owner: 'Rohan Poluru', scorecard: 'Operations', severity: 'Red', since: '27 Aug', note: 'Two regional hubs missed same-day cut-off.' },
  { id: 'a2', title: '1.8 adoption stalled at 23%', owner: 'Nikhil Poluru', scorecard: 'Product', severity: 'Amber', since: '24 Aug', note: 'Onboarding tour is shipping in 1.8.1.' },
  { id: 'a3', title: 'Cash conversion 41 days', owner: 'Hana Poluru', scorecard: 'Finance', severity: 'Amber', since: '22 Aug', note: 'Still inside the 45-day band.' },
  { id: 'a4', title: 'NPS promoters dipped in EMEA', owner: 'Priya Poluru', scorecard: 'Customer', severity: 'Green', since: '20 Aug', note: 'Recovered after the billing copy fix.' },
  { id: 'a5', title: 'SOC 2 evidence gap on access reviews', owner: 'Anika Poluru', scorecard: 'Security', severity: 'Amber', since: '30 Aug', note: 'Quarterly attestation due 6 Sep.' },
  { id: 'a6', title: 'Platform error budget at 72%', owner: 'Dev Poluru', scorecard: 'Technology', severity: 'Green', since: '29 Aug', note: 'Within the 80% burn threshold for September.' },
];

export const reviews = [
  { label: 'Weekly ops review', description: 'Rohan Poluru · Mondays 09:00', timestamp: '25 Aug', icon: 'clock', status: 'Done' },
  { label: 'Growth forecast lock', description: 'Kavya Poluru · pipeline 3.4x', timestamp: '26 Aug', icon: 'star', status: 'Done' },
  { label: 'Product 1.8 readout', description: 'Nikhil Poluru · adoption 23%', timestamp: '27 Aug', icon: 'file', status: 'Done' },
  { label: 'Board pack freeze', description: 'Mira Poluru · Thursday 16:00', timestamp: '28 Aug', icon: 'check', status: 'Done' },
  { label: 'Customer voice hour', description: 'Priya Poluru · NPS 62', timestamp: '29 Aug', icon: 'user', status: 'Done' },
  { label: 'Q3 close read-through', description: 'Mira Poluru · books close 4 Sep', timestamp: '1 Sep', icon: 'folder', status: 'Today' },
];

export const benchmarks = [
  { metric: 'NRR', us: '118%', peer: '112%', gap: '+6 pts', status: 'Ahead' },
  { metric: 'Gross margin', us: '71.2%', peer: '68.0%', gap: '+3.2 pts', status: 'Ahead' },
  { metric: 'NPS', us: '62', peer: '58', gap: '+4', status: 'Ahead' },
  { metric: 'Fulfillment SLA', us: '95.4%', peer: '98.1%', gap: '−2.7 pts', status: 'Behind' },
  { metric: 'Support CSAT', us: '4.7', peer: '4.5', gap: '+0.2', status: 'Ahead' },
  { metric: 'Voluntary attrition', us: '7.4%', peer: '9.1%', gap: '−1.7 pts', status: 'Ahead' },
  { metric: 'Platform uptime', us: '99.97%', peer: '99.92%', gap: '+0.05 pts', status: 'Ahead' },
  { metric: 'Security incidents', us: '0', peer: '1.2', gap: '−1.2', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Clearline' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Q3 board pack', owner: 'Mira Poluru', updated: '28 Aug 2026', format: 'PDF' },
  { name: 'Scorecard export', owner: 'Sahana Poluru', updated: '29 Aug 2026', format: 'CSV' },
  { name: 'Goal progress', owner: 'Arjun Poluru', updated: '27 Aug 2026', format: 'XLSX' },
  { name: 'Peer benchmarks', owner: 'Luca Poluru', updated: '26 Aug 2026', format: 'PDF' },
  { name: 'Technology reliability pack', owner: 'Dev Poluru', updated: '30 Aug 2026', format: 'PDF' },
  { name: 'Security control attestation', owner: 'Anika Poluru', updated: '30 Aug 2026', format: 'XLSX' },
];

export const inboxItems = [
  { label: 'Fulfillment SLA is red', description: 'Rohan Poluru · Operations', icon: 'alert-triangle' },
  { label: 'Board pack due Thursday', description: 'Mira Poluru · 16:00', icon: 'clock' },
  { label: 'NPS recovered in EMEA', description: 'Priya Poluru · Customer', icon: 'check' },
  { label: 'SOC 2 evidence due 6 Sep', description: 'Anika Poluru · Security', icon: 'folder' },
];

export const commandItems = [
  { label: 'Overview', description: 'Company pulse', href: '#/overview', icon: 'home' },
  { label: 'Finance scorecard', description: 'Arjun Poluru', href: '#/scorecard/sc_finance', icon: 'star' },
  { label: 'Goals', description: 'Company OKRs', href: '#/goals', icon: 'check' },
  { label: 'Alerts', description: 'Thresholds', href: '#/alerts', icon: 'bell' },
  { label: 'Teams', description: 'Owners', href: '#/teams', icon: 'user' },
  { label: 'Technology scorecard', description: 'Dev Poluru', href: '#/scorecard/sc_technology', icon: 'star' },
  { label: 'Security scorecard', description: 'Anika Poluru', href: '#/scorecard/sc_security', icon: 'star' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Metric', description: 'Name and owner' },
  { label: 'Target', description: 'Thresholds' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const scorecardTree = [
  {
    id: 'company',
    label: 'Clearline',
    children: [
      { id: 'finance', label: 'Finance', href: '#/scorecard/sc_finance' },
      { id: 'growth', label: 'Growth', href: '#/scorecard/sc_growth' },
      { id: 'product', label: 'Product', href: '#/scorecard/sc_product' },
    ],
  },
  {
    id: 'run',
    label: 'Run the firm',
    children: [
      { id: 'people', label: 'People', href: '#/scorecard/sc_people' },
      { id: 'ops', label: 'Operations', href: '#/scorecard/sc_ops' },
      { id: 'customer', label: 'Customer', href: '#/scorecard/sc_customer' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    children: [
      { id: 'technology', label: 'Technology', href: '#/scorecard/sc_technology' },
      { id: 'security', label: 'Security', href: '#/scorecard/sc_security' },
    ],
  },
];

export const metricRows = [
  { metric: 'Revenue', actual: '$18.4M', target: '$17.1M', variance: '+7.6%', status: 'On track' },
  { metric: 'Gross margin', actual: '71.2%', target: '70.0%', variance: '+1.2 pts', status: 'On track' },
  { metric: 'Cash conversion', actual: '41d', target: '45d', variance: '−4d', status: 'Watch' },
  { metric: 'OpEx ratio', actual: '38%', target: '40%', variance: '−2 pts', status: 'On track' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/scorecards/sc_finance
Authorization: Bearer sig_live_****

{
  "id": "sc_finance",
  "name": "Finance",
  "health": 92,
  "owner": "Arjun Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Scorecard',
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
    type: 'Alert',
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
  return [...scorecardHits, ...goalHits, ...alertHits, ...reportHits, ...peopleHits, ...commandItems.map((item) => ({
    ...item,
    type: 'Jump',
  }))];
}
