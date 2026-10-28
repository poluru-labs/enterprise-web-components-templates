export const productName = 'Beacon';
export const productLine = 'Open source impact';
export const workspaceName = 'Harbor Commons Program';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@harbor.example',
  role: 'Open source program lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Quarter 4 · catalog v2',
  timezone: 'America / Chicago',
  close: 'Board readout 12 Dec 2026',
};

export const tickerItems = [
  { label: 'Impact score', value: '88%', delta: '+2 pts', trend: 'up', href: '#/trends' },
  { label: 'Exceptions', value: '14', delta: '−3', trend: 'up', href: '#/alerts' },
  { label: 'Projects', value: '26', delta: '+2', trend: 'up', href: '#/scorecards' },
  { label: 'Contributions', value: '1.2k', delta: '+18%', trend: 'up', href: '#/benchmarks' },
  { label: 'Maintainer hrs', value: '840', delta: '+6%', trend: 'up', href: '#/benchmarks' },
  { label: 'License clean', value: '96%', delta: '+1 pt', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Projects', href: '#/scorecards', icon: 'folder' },
  { label: 'Exceptions', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Program impact score', value: '88%', hint: 'Catalog v2 weighted', trend: 'up', trendValue: '+2 pts' },
  { label: 'Open exceptions', value: '14', hint: '4 blocking board readout', trend: 'up', trendValue: '−3' },
  { label: 'Tracked projects', value: '26', hint: 'First-party and key upstream', trend: 'up', trendValue: '+2' },
  { label: 'Quarterly contributions', value: '1,240', hint: 'Commits and merged PRs', trend: 'up', trendValue: '+18%' },
  { label: 'Maintainer hours', value: '840', hint: 'Engineering time logged', trend: 'up', trendValue: '+6%' },
  { label: 'License compliance', value: '96%', hint: 'Allowlist and SPDX match', trend: 'up', trendValue: '+1 pt' },
  { label: 'Downstream adopters', value: '312', hint: 'Internal repos on catalog', trend: 'up', trendValue: '+24' },
  { label: 'Mean exception age', value: '4.2d', hint: 'Open to resolved', trend: 'up', trendValue: '−1.1d' },
];

export const revenueTrend = [80, 81, 82, 83, 84, 85, 85, 86, 86, 87, 87, 88];

export const scorecards = [
  {
    id: 'proj_platform_sdk',
    name: 'Platform SDK',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 94,
    kpis: 186,
    updated: '26 Oct 2026',
    focus: 'Apache-2.0 · 48 downstream',
  },
  {
    id: 'proj_ui_kit',
    name: 'Enterprise UI kit',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 91,
    kpis: 142,
    updated: '26 Oct 2026',
    focus: 'MIT · design system consumers',
  },
  {
    id: 'proj_data_connector',
    name: 'Data connector library',
    owner: 'Dev Poluru',
    status: 'At risk',
    health: 68,
    kpis: 98,
    updated: '25 Oct 2026',
    focus: 'Upstream lag · 12 weeks',
  },
  {
    id: 'proj_observability',
    name: 'Observability exporters',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 89,
    kpis: 76,
    updated: '25 Oct 2026',
    focus: 'OpenTelemetry · dual license review',
  },
  {
    id: 'proj_cli_tools',
    name: 'Developer CLI',
    owner: 'Luca Poluru',
    status: 'Watch',
    health: 82,
    kpis: 210,
    updated: '24 Oct 2026',
    focus: 'GPL carve-out · plugin ecosystem',
  },
  {
    id: 'proj_security_lib',
    name: 'Crypto utilities',
    owner: 'Arjun Poluru',
    status: 'On track',
    health: 95,
    kpis: 54,
    updated: '24 Oct 2026',
    focus: 'BSD-3 · export classification',
  },
  {
    id: 'proj_mobile_bridge',
    name: 'Mobile bridge',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 90,
    kpis: 88,
    updated: '23 Oct 2026',
    focus: 'Kotlin multiplatform · 6 teams',
  },
  {
    id: 'proj_docs_engine',
    name: 'Docs site engine',
    owner: 'Sahana Poluru',
    status: 'Watch',
    health: 84,
    kpis: 62,
    updated: '22 Oct 2026',
    focus: 'MPL-2.0 · file-level headers',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Project', sortable: true },
  { key: 'owner', label: 'Maintainer', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Impact score' },
  { key: 'kpis', label: 'Contributions' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Data connector upstream sync', owner: 'Dev Poluru', scorecard: 'Data connector library', progress: 41, target: '10 Nov', status: 'At risk' },
  { id: 'g2', name: 'CLI plugin license audit', owner: 'Luca Poluru', scorecard: 'Developer CLI', progress: 55, target: '14 Nov', status: 'Watch' },
  { id: 'g3', name: 'Docs engine header pass', owner: 'Sahana Poluru', scorecard: 'Docs site engine', progress: 61, target: '18 Nov', status: 'Watch' },
  { id: 'g4', name: 'Catalog v2 rollout', owner: 'Mira Poluru', scorecard: 'Harbor Commons Program', progress: 86, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'SDK adoption campaign', owner: 'Nikhil Poluru', scorecard: 'Platform SDK', progress: 78, target: '30 Nov', status: 'On track' },
  { id: 'g6', name: 'Maintainer office hours', owner: 'Elena Poluru', scorecard: 'Harbor Commons Program', progress: 92, target: 'Weekly', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Program goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Project' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Open source program lead', squad: 'Governance', rating: 5, score: 94 },
  { name: 'Nikhil Poluru', role: 'Platform maintainer', squad: 'Platform', rating: 5, score: 94 },
  { name: 'Dev Poluru', role: 'Data integrations', squad: 'Platform', rating: 4, score: 68 },
  { name: 'Priya Poluru', role: 'Design systems', squad: 'Product', rating: 5, score: 91 },
  { name: 'Rohan Poluru', role: 'Observability', squad: 'Platform', rating: 5, score: 89 },
  { name: 'Luca Poluru', role: 'Developer experience', squad: 'Platform', rating: 4, score: 82 },
  { name: 'Arjun Poluru', role: 'Security libraries', squad: 'Security', rating: 5, score: 95 },
  { name: 'Kavya Poluru', role: 'Mobile platform', squad: 'Product', rating: 5, score: 90 },
  { name: 'Sahana Poluru', role: 'Technical writing', squad: 'Product', rating: 4, score: 84 },
  { name: 'Elena Poluru', role: 'Community programs', squad: 'Governance', rating: 5, score: 92 },
  { name: 'Anika Poluru', role: 'Legal review', squad: 'Governance', rating: 5, score: 89 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 88 },
];

export const alerts = [
  { id: 'a1', title: 'Data connector upstream stale', owner: 'Dev Poluru', scorecard: 'Data connector library', severity: 'Red', since: '26 Oct', note: 'No upstream release in 12 weeks · security patch pending.' },
  { id: 'a2', title: 'CLI plugin license mismatch', owner: 'Luca Poluru', scorecard: 'Developer CLI', severity: 'Amber', since: '25 Oct', note: 'Third-party plugin bundle includes Category B license.' },
  { id: 'a3', title: 'Docs engine missing file headers', owner: 'Sahana Poluru', scorecard: 'Docs site engine', severity: 'Amber', since: '25 Oct', note: '14 files without SPDX identifier in last import.' },
  { id: 'a4', title: 'Platform SDK catalog pass', owner: 'Nikhil Poluru', scorecard: 'Platform SDK', severity: 'Green', since: '24 Oct', note: 'Catalog v2 scan · full allowlist compliance.' },
  { id: 'a5', title: 'Crypto utilities export cleared', owner: 'Arjun Poluru', scorecard: 'Crypto utilities', severity: 'Green', since: '23 Oct', note: 'Legal attestation renewed for quarter.' },
  { id: 'a6', title: 'UI kit adoption milestone', owner: 'Priya Poluru', scorecard: 'Enterprise UI kit', severity: 'Green', since: '22 Oct', note: '40th internal consumer onboarded.' },
];

export const reviews = [
  { label: 'Exception triage', description: 'Mira Poluru · quarter 4', timestamp: '27 Oct', icon: 'clock', status: 'Today' },
  { label: 'Connector recovery plan', description: 'Dev Poluru · blocking', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Next' },
  { label: 'Catalog v2 sign-off', description: 'Anika Poluru · legal', timestamp: '30 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Board readout prep', description: 'Hana Poluru · exports', timestamp: '1 Nov', icon: 'folder', status: 'Scheduled' },
  { label: 'Maintainer office hours', description: 'Elena Poluru · community', timestamp: '4 Nov', icon: 'user', status: 'Scheduled' },
  { label: 'Quarter 4 report freeze', description: 'Mira Poluru · Harbor Commons', timestamp: '12 Dec', icon: 'download', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Impact score', us: '88%', peer: '84%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Contributions per engineer', us: '12.4', peer: '10.1', gap: '+2.3', status: 'Ahead' },
  { metric: 'License compliance', us: '96%', peer: '93%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Maintainer hours logged', us: '840', peer: '720', gap: '+17%', status: 'Ahead' },
  { metric: 'Mean exception age', us: '4.2d', peer: '5.1d', gap: '−0.9d', status: 'Ahead' },
  { metric: 'Projects at risk', us: '2', peer: '2', gap: '0', status: 'Watch' },
  { metric: 'Downstream adoption', us: '312', peer: '280', gap: '+32', status: 'Ahead' },
  { metric: 'Catalog scan cadence', us: '98%', peer: '94%', gap: '+4 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Harbor Commons Program' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Quarter 4 impact summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Exception export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Catalog v2 scan results', owner: 'Anika Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Contribution evidence pack', owner: 'Elena Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Project manifest', owner: 'Nikhil Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Impact scorecards', owner: 'Rohan Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Connector upstream stale', description: 'Dev Poluru · Red', icon: 'alert-triangle' },
  { label: 'Platform SDK passed catalog', description: 'Nikhil Poluru · Done', icon: 'check' },
  { label: 'CLI license review', description: 'Luca Poluru · Review', icon: 'clock' },
  { label: 'Board readout 12 Dec', description: 'Mira Poluru · Q4', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Program pulse', href: '#/overview', icon: 'home' },
  { label: 'Data connector library', description: 'Dev Poluru', href: '#/scorecard/proj_data_connector', icon: 'folder' },
  { label: 'Open exceptions', description: 'Exception queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Program goals', description: 'Quarter 4', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Maintainers and stewards', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Project', description: 'Repo and maintainer' },
  { label: 'Catalog', description: 'License and policy' },
  { label: 'Confirm', description: 'Program PIN' },
];

export const scorecardTree = [
  {
    id: 'firstparty',
    label: 'First-party',
    children: [
      { id: 'sdk', label: 'Platform SDK', href: '#/scorecard/proj_platform_sdk' },
      { id: 'ui', label: 'Enterprise UI kit', href: '#/scorecard/proj_ui_kit' },
      { id: 'cli', label: 'Developer CLI', href: '#/scorecard/proj_cli_tools' },
    ],
  },
  {
    id: 'libraries',
    label: 'Libraries',
    children: [
      { id: 'data', label: 'Data connector library', href: '#/scorecard/proj_data_connector' },
      { id: 'crypto', label: 'Crypto utilities', href: '#/scorecard/proj_security_lib' },
      { id: 'mobile', label: 'Mobile bridge', href: '#/scorecard/proj_mobile_bridge' },
    ],
  },
  {
    id: 'infra',
    label: 'Infra',
    children: [
      { id: 'otel', label: 'Observability exporters', href: '#/scorecard/proj_observability' },
      { id: 'docs', label: 'Docs site engine', href: '#/scorecard/proj_docs_engine' },
    ],
  },
];

export const metricRows = [
  { metric: 'Impact score', actual: '88%', target: '85%', variance: '+3 pts', status: 'On track' },
  { metric: 'Contributions', actual: '186', target: '160', variance: '+26', status: 'On track' },
  { metric: 'License clean', actual: '100%', target: '100%', variance: '0', status: 'On track' },
  { metric: 'Blocking exceptions', actual: '4', target: '0', variance: '+4', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/projects/proj_platform_sdk/impact-summary
Authorization: Bearer bcn_live_****

{
  "id": "proj_platform_sdk",
  "name": "Platform SDK",
  "impact_score": 94,
  "maintainer": "Nikhil Poluru",
  "downstream": 48
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Project',
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
    type: 'Exception',
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
