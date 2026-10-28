export const productName = 'Bench';
export const productLine = 'Component lab';
export const workspaceName = 'Nexus UI';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@nexus.example',
  role: 'Design systems QA',
};

export const workspace = {
  name: workspaceName,
  period: 'Release 4.2 · build 9184',
  timezone: 'America / Chicago',
  close: 'Cutover window closes 14 Nov 2026',
};

export const tickerItems = [
  { label: 'Pass rate', value: '96.8%', delta: '+0.4 pts', trend: 'up', href: '#/trends' },
  { label: 'Open failures', value: '24', delta: '−8', trend: 'up', href: '#/alerts' },
  { label: 'Components', value: '142', delta: '+6', trend: 'up', href: '#/scorecards' },
  { label: 'Flake rate', value: '1.2%', delta: '−0.3', trend: 'up', href: '#/benchmarks' },
  { label: 'Visual diffs', value: '11', delta: '3 new', trend: 'flat', href: '#/alerts' },
  { label: 'Coverage', value: '89%', delta: '+2 pts', trend: 'up', href: '#/benchmarks' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Components', href: '#/scorecards', icon: 'folder' },
  { label: 'Failures', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Coverage', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Suite pass rate', value: '96.8%', hint: 'Last 24h across all packages', trend: 'up', trendValue: '+0.4 pts' },
  { label: 'Open failures', value: '24', hint: 'Blocking release 4.2', trend: 'up', trendValue: '−8' },
  { label: 'Components tracked', value: '142', hint: 'Web components + React wrappers', trend: 'up', trendValue: '+6' },
  { label: 'Interaction tests', value: '1,284', hint: 'Playwright + Vitest', trend: 'up', trendValue: '+42' },
  { label: 'Visual snapshots', value: '318', hint: 'Chromatic baselines', trend: 'flat', trendValue: 'Hold' },
  { label: 'Mean fix time', value: '5.1h', hint: 'Median for P1 failures', trend: 'up', trendValue: '−1.2h' },
  { label: 'Flake rate', value: '1.2%', hint: 'Quarantined: 4 specs', trend: 'up', trendValue: '−0.3 pts' },
  { label: 'Storybook coverage', value: '89%', hint: 'Stories with interaction tests', trend: 'up', trendValue: '+2 pts' },
];

export const revenueTrend = [92.1, 92.4, 93.0, 93.2, 93.8, 94.1, 94.5, 95.0, 95.4, 96.0, 96.4, 96.8];

export const scorecards = [
  {
    id: 'cmp_button',
    name: 'Button',
    owner: 'Dev Poluru',
    status: 'On track',
    health: 99,
    kpis: 18,
    updated: '26 Oct 2026',
    focus: 'Variants, loading, icons',
  },
  {
    id: 'cmp_modal',
    name: 'Modal',
    owner: 'Kavya Poluru',
    status: 'Watch',
    health: 84,
    kpis: 22,
    updated: '26 Oct 2026',
    focus: 'Focus trap and escape',
  },
  {
    id: 'cmp_datatable',
    name: 'Data table',
    owner: 'Nikhil Poluru',
    status: 'At risk',
    health: 71,
    kpis: 31,
    updated: '25 Oct 2026',
    focus: 'Sort, select, pagination',
  },
  {
    id: 'cmp_combobox',
    name: 'Combobox',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 94,
    kpis: 16,
    updated: '25 Oct 2026',
    focus: 'Filtering and keyboard',
  },
  {
    id: 'cmp_datepicker',
    name: 'Date picker',
    owner: 'Luca Poluru',
    status: 'Watch',
    health: 78,
    kpis: 19,
    updated: '24 Oct 2026',
    focus: 'Range and locale',
  },
  {
    id: 'cmp_toast',
    name: 'Toast',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 97,
    kpis: 12,
    updated: '24 Oct 2026',
    focus: 'Stacking and timers',
  },
  {
    id: 'cmp_tabs',
    name: 'Tabs',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 95,
    kpis: 14,
    updated: '23 Oct 2026',
    focus: 'Arrow keys and roving',
  },
  {
    id: 'cmp_upload',
    name: 'File upload',
    owner: 'Rohan Poluru',
    status: 'At risk',
    health: 66,
    kpis: 17,
    updated: '23 Oct 2026',
    focus: 'Drag-drop and errors',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Component', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Pass rate' },
  { key: 'kpis', label: 'Tests' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Modal focus trap at 100%', owner: 'Kavya Poluru', scorecard: 'Modal', progress: 76, target: '8 Nov', status: 'Watch' },
  { id: 'g2', name: 'Data table selection keyboard', owner: 'Nikhil Poluru', scorecard: 'Data table', progress: 58, target: '12 Nov', status: 'At risk' },
  { id: 'g3', name: 'Upload error states snapshot', owner: 'Rohan Poluru', scorecard: 'File upload', progress: 44, target: '15 Nov', status: 'At risk' },
  { id: 'g4', name: 'Button loading story coverage', owner: 'Dev Poluru', scorecard: 'Button', progress: 92, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Date picker locale matrix', owner: 'Luca Poluru', scorecard: 'Date picker', progress: 67, target: '20 Nov', status: 'Watch' },
  { id: 'g6', name: 'Toast queue interaction spec', owner: 'Priya Poluru', scorecard: 'Toast', progress: 88, target: '5 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Test goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Component' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Design systems QA', squad: 'Platform', rating: 5, score: 96 },
  { name: 'Dev Poluru', role: 'Component engineer', squad: 'Core', rating: 5, score: 99 },
  { name: 'Kavya Poluru', role: 'Interaction designer', squad: 'Overlays', rating: 4, score: 84 },
  { name: 'Nikhil Poluru', role: 'Frontend lead', squad: 'Data', rating: 4, score: 71 },
  { name: 'Sahana Poluru', role: 'Test engineer', squad: 'Forms', rating: 5, score: 94 },
  { name: 'Luca Poluru', role: 'Localization QA', squad: 'Forms', rating: 4, score: 78 },
  { name: 'Priya Poluru', role: 'Visual QA', squad: 'Feedback', rating: 5, score: 97 },
  { name: 'Elena Poluru', role: 'Accessibility QA', squad: 'Navigation', rating: 5, score: 95 },
  { name: 'Rohan Poluru', role: 'Release manager', squad: 'Uploads', rating: 4, score: 66 },
  { name: 'Arjun Poluru', role: 'CI owner', squad: 'Platform', rating: 5, score: 91 },
  { name: 'Anika Poluru', role: 'Security QA', squad: 'Platform', rating: 4, score: 88 },
  { name: 'Hana Poluru', role: 'Documentation', squad: 'Core', rating: 4, score: 93 },
];

export const alerts = [
  { id: 'a1', title: 'Modal backdrop click closes without focus restore', owner: 'Kavya Poluru', scorecard: 'Modal', severity: 'Red', since: '26 Oct', note: 'Regression in eds-modal 1.1.0-rc.' },
  { id: 'a2', title: 'Data table sort icon missing aria-pressed', owner: 'Nikhil Poluru', scorecard: 'Data table', severity: 'Amber', since: '25 Oct', note: 'Fails interaction spec dt-sort-02.' },
  { id: 'a3', title: 'Upload dropzone visual diff on dark theme', owner: 'Rohan Poluru', scorecard: 'File upload', severity: 'Amber', since: '25 Oct', note: 'Chromatic build 9182.' },
  { id: 'a4', title: 'Combobox listbox height miscalculation', owner: 'Sahana Poluru', scorecard: 'Combobox', severity: 'Green', since: '24 Oct', note: 'Fixed in branch fix/combobox-max-height.' },
  { id: 'a5', title: 'Date picker week numbers overlap label', owner: 'Luca Poluru', scorecard: 'Date picker', severity: 'Amber', since: '24 Oct', note: 'Locale de-DE only.' },
  { id: 'a6', title: 'Button tertiary hover token drift', owner: 'Dev Poluru', scorecard: 'Button', severity: 'Green', since: '23 Oct', note: 'Snapshot refreshed after token bump.' },
];

export const reviews = [
  { label: 'Nightly suite review', description: 'Arjun Poluru · CI dashboard', timestamp: '25 Oct', icon: 'clock', status: 'Done' },
  { label: 'Modal failure triage', description: 'Kavya Poluru · 3 open specs', timestamp: '26 Oct', icon: 'alert-triangle', status: 'Today' },
  { label: 'Visual baseline approval', description: 'Priya Poluru · release 4.2', timestamp: '27 Oct', icon: 'eye', status: 'Next' },
  { label: 'Flake quarantine sync', description: 'Sahana Poluru · 4 specs', timestamp: '28 Oct', icon: 'settings', status: 'Scheduled' },
  { label: 'Component ownership handoff', description: 'Mira Poluru · Data table', timestamp: '29 Oct', icon: 'user', status: 'Scheduled' },
  { label: 'Release 4.2 sign-off', description: 'Rohan Poluru · go/no-go', timestamp: '14 Nov', icon: 'check', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Unit test coverage', us: '92%', peer: '88%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Interaction coverage', us: '89%', peer: '84%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Visual snapshot pass', us: '94%', peer: '91%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Accessibility checks', us: '87%', peer: '90%', gap: '−3 pts', status: 'Watch' },
  { metric: 'Cross-browser matrix', us: '96%', peer: '93%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Flake rate', us: '1.2%', peer: '2.1%', gap: '−0.9 pts', status: 'Ahead' },
  { metric: 'Storybook docs parity', us: '91%', peer: '86%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Bundle size budget', us: '98%', peer: '95%', gap: '+3 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Signal', sortable: true },
  { key: 'us', label: 'Nexus UI' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Release 4.2 test summary', owner: 'Rohan Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Component failure export', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Visual diff archive', owner: 'Priya Poluru', updated: '25 Oct 2026', format: 'ZIP' },
  { name: 'Flake quarantine log', owner: 'Sahana Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Coverage by package', owner: 'Arjun Poluru', updated: '24 Oct 2026', format: 'PDF' },
  { name: 'Interaction spec index', owner: 'Dev Poluru', updated: '23 Oct 2026', format: 'JSON' },
];

export const inboxItems = [
  { label: 'Modal focus restore is failing', description: 'Kavya Poluru · Blocking 4.2', icon: 'alert-triangle' },
  { label: 'Approve visual baselines', description: 'Priya Poluru · 11 diffs', icon: 'eye' },
  { label: 'Combobox fix ready to merge', description: 'Sahana Poluru · PR #418', icon: 'check' },
  { label: 'Upload dark theme diff', description: 'Rohan Poluru · File upload', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Lab pulse', href: '#/overview', icon: 'home' },
  { label: 'Modal component', description: 'Kavya Poluru', href: '#/scorecard/cmp_modal', icon: 'folder' },
  { label: 'Open failures', description: 'Failure queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Test goals', description: 'Release 4.2', href: '#/goals', icon: 'check' },
  { label: 'Coverage', description: 'Quality signals', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Owners and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Component', description: 'Package and owner' },
  { label: 'Suite', description: 'Specs to run' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'core',
    label: 'Core',
    children: [
      { id: 'button', label: 'Button', href: '#/scorecard/cmp_button' },
      { id: 'toast', label: 'Toast', href: '#/scorecard/cmp_toast' },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    children: [
      { id: 'combobox', label: 'Combobox', href: '#/scorecard/cmp_combobox' },
      { id: 'datepicker', label: 'Date picker', href: '#/scorecard/cmp_datepicker' },
      { id: 'upload', label: 'File upload', href: '#/scorecard/cmp_upload' },
    ],
  },
  {
    id: 'surfaces',
    label: 'Surfaces',
    children: [
      { id: 'modal', label: 'Modal', href: '#/scorecard/cmp_modal' },
      { id: 'datatable', label: 'Data table', href: '#/scorecard/cmp_datatable' },
      { id: 'tabs', label: 'Tabs', href: '#/scorecard/cmp_tabs' },
    ],
  },
];

export const metricRows = [
  { metric: 'Unit specs', actual: '412', target: '400', variance: '+12', status: 'On track' },
  { metric: 'Interaction specs', actual: '186', target: '190', variance: '−4', status: 'Watch' },
  { metric: 'Visual snapshots', actual: '318', target: '320', variance: '−2', status: 'Watch' },
  { metric: 'P1 failures', actual: '3', target: '0', variance: '+3', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/components/cmp_modal/tests
Authorization: Bearer bch_live_****

{
  "id": "cmp_modal",
  "name": "Modal",
  "pass_rate": 84,
  "owner": "Kavya Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Component',
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
    type: 'Failure',
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
