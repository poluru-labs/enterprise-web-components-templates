export const productName = 'Atelier';
export const productLine = 'Design system';
export const workspaceName = 'Polaris Guild';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@polaris.example',
  role: 'Design systems lead',
};

export const workspace = {
  name: workspaceName,
  period: 'EDS 1.2 · sprint 24',
  timezone: 'America / Chicago',
  close: 'Token freeze 18 Nov 2026',
};

export const tickerItems = [
  { label: 'Components', value: '68', delta: '+4', trend: 'up', href: '#/scorecards' },
  { label: 'Token sets', value: '12', delta: '+1', trend: 'up', href: '#/benchmarks' },
  { label: 'Adoption', value: '78%', delta: '+3 pts', trend: 'up', href: '#/trends' },
  { label: 'Open changes', value: '9', delta: '−2', trend: 'up', href: '#/alerts' },
  { label: 'Patterns', value: '24', delta: '+2', trend: 'up', href: '#/goals' },
  { label: 'Doc parity', value: '94%', delta: '+1 pt', trend: 'up', href: '#/reports' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Components', href: '#/scorecards', icon: 'folder' },
  { label: 'Changes', href: '#/alerts', icon: 'edit' },
  { label: 'Tokens', href: '#/benchmarks', icon: 'star' },
  { label: 'Releases', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Published components', value: '68', hint: 'Stable in @poluru-labs/enterprise-design-system-wc', trend: 'up', trendValue: '+4' },
  { label: 'Token primitives', value: '142', hint: 'Color, type, space, motion', trend: 'up', trendValue: '+6' },
  { label: 'Squad adoption', value: '78%', hint: 'Apps on EDS 1.1+', trend: 'up', trendValue: '+3 pts' },
  { label: 'Open change requests', value: '9', hint: '2 awaiting token council', trend: 'up', trendValue: '−2' },
  { label: 'Storybook parity', value: '94%', hint: 'Stories match production API', trend: 'up', trendValue: '+1 pt' },
  { label: 'Pattern library', value: '24', hint: 'Layouts and flows', trend: 'up', trendValue: '+2' },
  { label: 'Breaking changes', value: '0', hint: 'Since 1.1.0', trend: 'flat', trendValue: 'Hold' },
  { label: 'Figma ↔ code sync', value: '91%', hint: 'Variables mapped', trend: 'up', trendValue: '+4 pts' },
];

export const revenueTrend = [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 77, 78];

export const scorecards = [
  {
    id: 'cmp_button',
    name: 'Button',
    owner: 'Dev Poluru',
    status: 'On track',
    health: 100,
    kpis: 8,
    updated: '26 Oct 2026',
    focus: 'Primary actions and groups',
  },
  {
    id: 'cmp_modal',
    name: 'Modal',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 96,
    kpis: 6,
    updated: '25 Oct 2026',
    focus: 'Focus management',
  },
  {
    id: 'cmp_datatable',
    name: 'Data table',
    owner: 'Nikhil Poluru',
    status: 'Watch',
    health: 88,
    kpis: 9,
    updated: '25 Oct 2026',
    focus: 'Sort and selection',
  },
  {
    id: 'cmp_combobox',
    name: 'Combobox',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 94,
    kpis: 7,
    updated: '24 Oct 2026',
    focus: 'Filterable lists',
  },
  {
    id: 'cmp_tabs',
    name: 'Tabs',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 98,
    kpis: 5,
    updated: '24 Oct 2026',
    focus: 'Keyboard navigation',
  },
  {
    id: 'cmp_toast',
    name: 'Toast',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 97,
    kpis: 4,
    updated: '23 Oct 2026',
    focus: 'Feedback stack',
  },
  {
    id: 'cmp_datepicker',
    name: 'Date picker',
    owner: 'Luca Poluru',
    status: 'Watch',
    health: 82,
    kpis: 8,
    updated: '23 Oct 2026',
    focus: 'Locale and ranges',
  },
  {
    id: 'cmp_card',
    name: 'Card',
    owner: 'Hana Poluru',
    status: 'On track',
    health: 99,
    kpis: 5,
    updated: '22 Oct 2026',
    focus: 'Media and slots',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Component', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Doc score' },
  { key: 'kpis', label: 'Variants' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Publish data table v2 guidelines', owner: 'Nikhil Poluru', scorecard: 'Data table', progress: 72, target: '8 Nov', status: 'Watch' },
  { id: 'g2', name: 'Date picker locale matrix', owner: 'Luca Poluru', scorecard: 'Date picker', progress: 58, target: '15 Nov', status: 'Watch' },
  { id: 'g3', name: 'Shell layout pattern', owner: 'Mira Poluru', scorecard: 'Patterns', progress: 84, target: '1 Nov', status: 'On track' },
  { id: 'g4', name: 'Density tokens in Figma', owner: 'Kavya Poluru', scorecard: 'Tokens', progress: 91, target: '5 Nov', status: 'On track' },
  { id: 'g5', name: 'Combobox anatomy docs', owner: 'Sahana Poluru', scorecard: 'Combobox', progress: 88, target: '12 Nov', status: 'On track' },
  { id: 'g6', name: 'Empty state pattern kit', owner: 'Priya Poluru', scorecard: 'Patterns', progress: 66, target: '20 Nov', status: 'Watch' },
];

export const goalColumns = [
  { key: 'name', label: 'Workbench item', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Area' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Design systems lead', squad: 'Core', rating: 5, score: 98 },
  { name: 'Dev Poluru', role: 'Component engineer', squad: 'Core', rating: 5, score: 100 },
  { name: 'Kavya Poluru', role: 'Design architect', squad: 'Foundation', rating: 5, score: 96 },
  { name: 'Nikhil Poluru', role: 'Frontend lead', squad: 'Data', rating: 4, score: 88 },
  { name: 'Sahana Poluru', role: 'Content designer', squad: 'Forms', rating: 5, score: 94 },
  { name: 'Luca Poluru', role: 'Localization', squad: 'Forms', rating: 4, score: 82 },
  { name: 'Priya Poluru', role: 'Visual design', squad: 'Feedback', rating: 5, score: 97 },
  { name: 'Elena Poluru', role: 'Accessibility', squad: 'Navigation', rating: 5, score: 98 },
  { name: 'Arjun Poluru', role: 'Program manager', squad: 'Release', rating: 5, score: 92 },
  { name: 'Rohan Poluru', role: 'Developer advocate', squad: 'Adoption', rating: 4, score: 86 },
  { name: 'Anika Poluru', role: 'Brand steward', squad: 'Foundation', rating: 4, score: 90 },
  { name: 'Hana Poluru', role: 'Documentation', squad: 'Core', rating: 5, score: 99 },
];

export const alerts = [
  { id: 'a1', title: 'Rename tertiary button token', owner: 'Dev Poluru', scorecard: 'Button', severity: 'Amber', since: '26 Oct', note: 'Align with Figma variable btn/tertiary.' },
  { id: 'a2', title: 'Data table row height density', owner: 'Nikhil Poluru', scorecard: 'Data table', severity: 'Amber', since: '25 Oct', note: 'Compact mode spec draft ready.' },
  { id: 'a3', title: 'Modal size token addition', owner: 'Kavya Poluru', scorecard: 'Modal', severity: 'Green', since: '24 Oct', note: 'Approved in token council 24 Oct.' },
  { id: 'a4', title: 'Date picker week start locale', owner: 'Luca Poluru', scorecard: 'Date picker', severity: 'Red', since: '23 Oct', note: 'Blocks EDS 1.2 for EU squads.' },
  { id: 'a5', title: 'Toast queue max visible', owner: 'Priya Poluru', scorecard: 'Toast', severity: 'Amber', since: '22 Oct', note: 'Pattern doc needs illustration.' },
  { id: 'a6', title: 'Card footer slot guidance', owner: 'Hana Poluru', scorecard: 'Card', severity: 'Green', since: '21 Oct', note: 'Merged into Storybook integration page.' },
];

export const reviews = [
  { label: 'Token council', description: 'Anika Poluru · color + type', timestamp: '22 Oct', icon: 'star', status: 'Done' },
  { label: 'Component critique', description: 'Kavya Poluru · Modal sizes', timestamp: '24 Oct', icon: 'eye', status: 'Done' },
  { label: 'Adoption office hours', description: 'Rohan Poluru · 6 squads', timestamp: '28 Oct', icon: 'user', status: 'Today' },
  { label: '1.2 release readiness', description: 'Arjun Poluru · go/no-go', timestamp: '18 Nov', icon: 'check', status: 'Scheduled' },
  { label: 'Pattern workshop', description: 'Mira Poluru · empty states', timestamp: '30 Oct', icon: 'folder', status: 'Next' },
  { label: 'Figma sync audit', description: 'Anika Poluru · variables', timestamp: '5 Nov', icon: 'settings', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Color tokens mapped', us: '100%', peer: '96%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Typography scale', us: '100%', peer: '98%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Spacing grid', us: '100%', peer: '94%', gap: '+6 pts', status: 'Ahead' },
  { metric: 'Motion tokens', us: '88%', peer: '85%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Elevation set', us: '92%', peer: '90%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Dark theme parity', us: '86%', peer: '88%', gap: '−2 pts', status: 'Watch' },
  { metric: 'Icon library sync', us: '95%', peer: '91%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Breakpoint tokens', us: '100%', peer: '97%', gap: '+3 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Token group', sortable: true },
  { key: 'us', label: 'Polaris Guild' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'EDS 1.2 release notes', owner: 'Arjun Poluru', updated: '26 Oct 2026', format: 'MD' },
  { name: 'Component changelog export', owner: 'Dev Poluru', updated: '26 Oct 2026', format: 'JSON' },
  { name: 'Token diff — 1.1 → 1.2', owner: 'Anika Poluru', updated: '25 Oct 2026', format: 'PDF' },
  { name: 'Adoption survey Q3', owner: 'Rohan Poluru', updated: '24 Oct 2026', format: 'PDF' },
  { name: 'Figma library manifest', owner: 'Kavya Poluru', updated: '23 Oct 2026', format: 'ZIP' },
  { name: 'Migration guide — density', owner: 'Hana Poluru', updated: '22 Oct 2026', format: 'MD' },
];

export const inboxItems = [
  { label: 'Date picker locale blocks 1.2', description: 'Luca Poluru · Token council', icon: 'alert-triangle' },
  { label: 'Modal size tokens approved', description: 'Kavya Poluru · Ready to document', icon: 'check' },
  { label: 'Adoption office hours today', description: 'Rohan Poluru · 14:00', icon: 'clock' },
  { label: 'Empty state pattern draft', description: 'Priya Poluru · Needs review', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Workbench pulse', href: '#/overview', icon: 'home' },
  { label: 'Button component', description: 'Dev Poluru', href: '#/scorecard/cmp_button', icon: 'folder' },
  { label: 'Open changes', description: 'Change queue', href: '#/alerts', icon: 'edit' },
  { label: 'Patterns roadmap', description: '1.2 scope', href: '#/goals', icon: 'check' },
  { label: 'Token coverage', description: 'Foundation', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Guild roster', href: '#/teams', icon: 'user' },
  { label: 'Releases', description: 'Notes and exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Proposal', description: 'Component or token' },
  { label: 'Review', description: 'Council + docs' },
  { label: 'Confirm', description: 'Steward PIN' },
];

export const scorecardTree = [
  {
    id: 'actions',
    label: 'Actions',
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
    ],
  },
  {
    id: 'surfaces',
    label: 'Surfaces',
    children: [
      { id: 'modal', label: 'Modal', href: '#/scorecard/cmp_modal' },
      { id: 'datatable', label: 'Data table', href: '#/scorecard/cmp_datatable' },
      { id: 'card', label: 'Card', href: '#/scorecard/cmp_card' },
    ],
  },
];

export const metricRows = [
  { metric: 'Story variants', actual: '48', target: '48', variance: '0', status: 'On track' },
  { metric: 'Doc pages', actual: '12', target: '14', variance: '−2', status: 'Watch' },
  { metric: 'Code examples', actual: '36', target: '32', variance: '+4', status: 'On track' },
  { metric: 'Open changes', actual: '2', target: '0', variance: '+2', status: 'Watch' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/components/cmp_button
Authorization: Bearer atl_live_****

{
  "id": "cmp_button",
  "name": "Button",
  "status": "stable",
  "owner": "Dev Poluru"
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
    type: 'Pattern',
    href: '#/goals',
  }));
  const alertHits = alerts.map((item) => ({
    label: item.title,
    description: `${item.scorecard} · ${item.severity}`,
    owner: item.owner,
    type: 'Change',
    href: '#/alerts',
  }));
  const reportHits = reports.map((item) => ({
    label: item.name,
    description: `${item.format} · ${item.updated}`,
    owner: item.owner,
    type: 'Release',
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
