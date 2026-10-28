export const productName = 'Seal';
export const productLine = 'Input security testing';
export const workspaceName = 'Harbor Secure QA';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@harbor.example',
  role: 'Application security lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Sprint 22 · corpus v5',
  timezone: 'America / Chicago',
  close: 'Release gate 21 Nov 2026',
};

export const tickerItems = [
  { label: 'Pass rate', value: '89%', delta: '+2 pts', trend: 'up', href: '#/trends' },
  { label: 'Open findings', value: '17', delta: '−3', trend: 'up', href: '#/alerts' },
  { label: 'Surfaces', value: '22', delta: '+1', trend: 'up', href: '#/scorecards' },
  { label: 'Probes run', value: '4.8k', delta: '+12%', trend: 'up', href: '#/benchmarks' },
  { label: 'Block rate', value: '97%', delta: '+1 pt', trend: 'up', href: '#/benchmarks' },
  { label: 'Mean fix time', value: '2.1d', delta: '−6h', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Surfaces', href: '#/scorecards', icon: 'folder' },
  { label: 'Findings', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Probe pass rate', value: '89%', hint: 'Corpus v5 weighted', trend: 'up', trendValue: '+2 pts' },
  { label: 'Open findings', value: '17', hint: '5 blocking release gate', trend: 'up', trendValue: '−3' },
  { label: 'Tested surfaces', value: '22', hint: 'APIs, forms, webhooks', trend: 'up', trendValue: '+1' },
  { label: 'Inbound block rate', value: '97%', hint: 'Malicious payloads rejected', trend: 'up', trendValue: '+1 pt' },
  { label: 'False allow rate', value: '0.6%', hint: 'Probes that should fail but passed', trend: 'up', trendValue: '−0.2 pts' },
  { label: 'Corpus coverage', value: '93%', hint: 'Controls mapped to OWASP-style cases', trend: 'up', trendValue: '+2 pts' },
  { label: 'Probes this sprint', value: '4,820', hint: 'Scheduled and ad hoc', trend: 'up', trendValue: '+12%' },
  { label: 'Mean time to fix', value: '2.1d', hint: 'Finding to merged patch', trend: 'up', trendValue: '−6h' },
];

export const revenueTrend = [82, 83, 84, 85, 86, 86, 87, 87, 88, 88, 89, 89];

export const scorecards = [
  {
    id: 'surf_checkout',
    name: 'Checkout API',
    owner: 'Arjun Poluru',
    status: 'Watch',
    health: 84,
    kpis: 640,
    updated: '26 Oct 2026',
    focus: 'POST /orders · JSON body',
  },
  {
    id: 'surf_auth',
    name: 'Authentication service',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 96,
    kpis: 520,
    updated: '26 Oct 2026',
    focus: 'Token exchange · headers',
  },
  {
    id: 'surf_webhook',
    name: 'Partner webhooks',
    owner: 'Dev Poluru',
    status: 'At risk',
    health: 71,
    kpis: 380,
    updated: '25 Oct 2026',
    focus: 'Signature verify · replay',
  },
  {
    id: 'surf_search',
    name: 'Catalog search',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 92,
    kpis: 410,
    updated: '25 Oct 2026',
    focus: 'Query params · encoding',
  },
  {
    id: 'surf_upload',
    name: 'Document upload',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 94,
    kpis: 290,
    updated: '24 Oct 2026',
    focus: 'Multipart · MIME allowlist',
  },
  {
    id: 'surf_admin',
    name: 'Admin console forms',
    owner: 'Luca Poluru',
    status: 'Watch',
    health: 83,
    kpis: 220,
    updated: '24 Oct 2026',
    focus: 'HTML fields · CSRF token',
  },
  {
    id: 'surf_mobile',
    name: 'Mobile sync API',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 91,
    kpis: 350,
    updated: '23 Oct 2026',
    focus: 'GraphQL · depth limits',
  },
  {
    id: 'surf_support',
    name: 'Support intake form',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 90,
    kpis: 180,
    updated: '22 Oct 2026',
    focus: 'Free text · sanitization',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Surface', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Pass score' },
  { key: 'kpis', label: 'Probes' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Webhook replay hardening', owner: 'Dev Poluru', scorecard: 'Partner webhooks', progress: 48, target: '9 Nov', status: 'At risk' },
  { id: 'g2', name: 'Checkout encoding suite', owner: 'Arjun Poluru', scorecard: 'Checkout API', progress: 66, target: '12 Nov', status: 'Watch' },
  { id: 'g3', name: 'Admin form allowlist audit', owner: 'Luca Poluru', scorecard: 'Admin console forms', progress: 59, target: '14 Nov', status: 'Watch' },
  { id: 'g4', name: 'Corpus v5 rollout', owner: 'Mira Poluru', scorecard: 'Harbor Secure QA', progress: 85, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Auth header fuzz expansion', owner: 'Nikhil Poluru', scorecard: 'Authentication service', progress: 91, target: '5 Nov', status: 'On track' },
  { id: 'g6', name: 'Upload MIME regression pack', owner: 'Sahana Poluru', scorecard: 'Document upload', progress: 88, target: '18 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Security goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Surface' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Application security lead', squad: 'Governance', rating: 5, score: 94 },
  { name: 'Nikhil Poluru', role: 'Identity security', squad: 'Platform', rating: 5, score: 96 },
  { name: 'Dev Poluru', role: 'Integrations security', squad: 'Partners', rating: 4, score: 71 },
  { name: 'Arjun Poluru', role: 'Commerce APIs', squad: 'Revenue', rating: 4, score: 84 },
  { name: 'Luca Poluru', role: 'Internal apps', squad: 'Platform', rating: 4, score: 83 },
  { name: 'Priya Poluru', role: 'Search platform', squad: 'Product', rating: 5, score: 92 },
  { name: 'Sahana Poluru', role: 'Content security', squad: 'Product', rating: 5, score: 94 },
  { name: 'Kavya Poluru', role: 'Mobile backend', squad: 'Product', rating: 5, score: 91 },
  { name: 'Elena Poluru', role: 'Support systems', squad: 'Support', rating: 5, score: 90 },
  { name: 'Rohan Poluru', role: 'Probe automation', squad: 'Platform', rating: 5, score: 93 },
  { name: 'Anika Poluru', role: 'Compliance review', squad: 'Governance', rating: 5, score: 89 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 88 },
];

export const alerts = [
  { id: 'a1', title: 'Webhook accepts replayed payload', owner: 'Dev Poluru', scorecard: 'Partner webhooks', severity: 'Red', since: '26 Oct', note: 'Nonce check bypass on partner-acme endpoint in staging.' },
  { id: 'a2', title: 'Checkout unicode normalization gap', owner: 'Arjun Poluru', scorecard: 'Checkout API', severity: 'Amber', since: '25 Oct', note: 'Homoglyph in billing name field not normalized before validate.' },
  { id: 'a3', title: 'Admin form missing field allowlist', owner: 'Luca Poluru', scorecard: 'Admin console forms', severity: 'Amber', since: '25 Oct', note: 'Extra POST keys persisted on role edit screen.' },
  { id: 'a4', title: 'Auth service corpus pass', owner: 'Nikhil Poluru', scorecard: 'Authentication service', severity: 'Green', since: '24 Oct', note: 'Corpus v5 full run · zero false allows.' },
  { id: 'a5', title: 'Upload MIME probe suite green', owner: 'Sahana Poluru', scorecard: 'Document upload', severity: 'Green', since: '23 Oct', note: 'Polyglot files blocked per policy.' },
  { id: 'a6', title: 'Search encoding probes stable', owner: 'Priya Poluru', scorecard: 'Catalog search', severity: 'Green', since: '22 Oct', note: 'No regression on sprint 21 fixes.' },
];

export const reviews = [
  { label: 'Finding triage', description: 'Mira Poluru · sprint 22', timestamp: '27 Oct', icon: 'clock', status: 'Today' },
  { label: 'Webhook fix review', description: 'Dev Poluru · blocking', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Next' },
  { label: 'Corpus v5 sign-off', description: 'Rohan Poluru · automation', timestamp: '30 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Release gate readout', description: 'Anika Poluru · compliance', timestamp: '1 Nov', icon: 'folder', status: 'Scheduled' },
  { label: 'Red team office hours', description: 'Mira Poluru · probes', timestamp: '4 Nov', icon: 'user', status: 'Scheduled' },
  { label: 'Sprint 22 report freeze', description: 'Hana Poluru · exports', timestamp: '21 Nov', icon: 'download', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Probe pass rate', us: '89%', peer: '85%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Inbound block rate', us: '97%', peer: '95%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'False allow rate', us: '0.6%', peer: '0.9%', gap: '−0.3 pts', status: 'Ahead' },
  { metric: 'Corpus coverage', us: '93%', peer: '88%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Mean time to fix', us: '2.1d', peer: '2.6d', gap: '−0.5d', status: 'Ahead' },
  { metric: 'Surfaces at risk', us: '2', peer: '2', gap: '0', status: 'Watch' },
  { metric: 'Scheduled probe cadence', us: '96%', peer: '92%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Regression recheck pass', us: '91%', peer: '89%', gap: '+2 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Harbor Secure QA' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Sprint 22 security summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Finding export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Corpus v5 results', owner: 'Rohan Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Probe evidence pack', owner: 'Dev Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Surface manifest', owner: 'Nikhil Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Pass scorecards', owner: 'Anika Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Webhook replay finding', description: 'Dev Poluru · Red', icon: 'alert-triangle' },
  { label: 'Auth corpus passed', description: 'Nikhil Poluru · Done', icon: 'check' },
  { label: 'Checkout unicode', description: 'Arjun Poluru · Review', icon: 'clock' },
  { label: 'Release gate 21 Nov', description: 'Mira Poluru · Sprint 22', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Security pulse', href: '#/overview', icon: 'home' },
  { label: 'Partner webhooks', description: 'Dev Poluru', href: '#/scorecard/surf_webhook', icon: 'folder' },
  { label: 'Open findings', description: 'Finding queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Security goals', description: 'Sprint 22', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Owners and testers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Surface', description: 'Endpoint and owner' },
  { label: 'Corpus', description: 'Probes and gates' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'external',
    label: 'External',
    children: [
      { id: 'checkout', label: 'Checkout API', href: '#/scorecard/surf_checkout' },
      { id: 'webhook', label: 'Partner webhooks', href: '#/scorecard/surf_webhook' },
      { id: 'mobile', label: 'Mobile sync API', href: '#/scorecard/surf_mobile' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    children: [
      { id: 'auth', label: 'Authentication service', href: '#/scorecard/surf_auth' },
      { id: 'search', label: 'Catalog search', href: '#/scorecard/surf_search' },
      { id: 'upload', label: 'Document upload', href: '#/scorecard/surf_upload' },
    ],
  },
  {
    id: 'internal',
    label: 'Internal',
    children: [
      { id: 'admin', label: 'Admin console forms', href: '#/scorecard/surf_admin' },
      { id: 'support', label: 'Support intake form', href: '#/scorecard/surf_support' },
    ],
  },
];

export const metricRows = [
  { metric: 'Probe pass', actual: '89%', target: '88%', variance: '+1 pt', status: 'On track' },
  { metric: 'Block rate', actual: '97%', target: '96%', variance: '+1 pt', status: 'On track' },
  { metric: 'False allows', actual: '0.6%', target: '0.5%', variance: '+0.1 pts', status: 'Watch' },
  { metric: 'Blocking findings', actual: '5', target: '0', variance: '+5', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/surfaces/surf_auth/probe-summary
Authorization: Bearer sel_live_****

{
  "id": "surf_auth",
  "name": "Authentication service",
  "pass_score": 96,
  "owner": "Nikhil Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Surface',
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
