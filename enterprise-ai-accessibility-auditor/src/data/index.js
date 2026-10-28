export const productName = 'Beacon';
export const productLine = 'Accessibility';
export const workspaceName = 'Harbor Digital';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@harbor.example',
  role: 'Accessibility lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Q4 2026 · sprint 18',
  timezone: 'America / Chicago',
  close: 'VPAT refresh due 12 Nov 2026',
};

export const tickerItems = [
  { label: 'WCAG score', value: '94%', delta: '+2 pts', trend: 'up', href: '#/trends' },
  { label: 'Open issues', value: '38', delta: '−6', trend: 'up', href: '#/alerts' },
  { label: 'Pages scanned', value: '1,842', delta: '+124', trend: 'up', href: '#/scorecards' },
  { label: 'Critical', value: '4', delta: '−2', trend: 'up', href: '#/alerts' },
  { label: 'Keyboard pass', value: '97%', delta: '+1 pt', trend: 'up', href: '#/benchmarks' },
  { label: 'Contrast pass', value: '91%', delta: 'Hold', trend: 'flat', href: '#/benchmarks' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Audits', href: '#/scorecards', icon: 'eye' },
  { label: 'Issues', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Overall WCAG score', value: '94%', hint: 'Weighted across active audits', trend: 'up', trendValue: '+2 pts' },
  { label: 'Open issues', value: '38', hint: '12 assigned this week', trend: 'up', trendValue: '−6' },
  { label: 'Pages scanned', value: '1,842', hint: 'Last full crawl 26 Oct', trend: 'up', trendValue: '+124' },
  { label: 'Keyboard coverage', value: '97%', hint: 'Focus order and traps', trend: 'up', trendValue: '+1 pt' },
  { label: 'Contrast pass rate', value: '91%', hint: 'AA text and UI chrome', trend: 'flat', trendValue: 'Hold' },
  { label: 'Remediation SLA', value: '92%', hint: 'Closed inside 14 days', trend: 'up', trendValue: '+4 pts' },
  { label: 'Manual reviews', value: '18', hint: 'Scheduled this quarter', trend: 'flat', trendValue: 'On plan' },
  { label: 'VPAT readiness', value: '88%', hint: 'Harbor customer portal', trend: 'up', trendValue: '+6 pts' },
];

export const revenueTrend = [86, 87, 88, 88, 89, 90, 90, 91, 91, 92, 93, 94];

export const scorecards = [
  {
    id: 'audit_marketing',
    name: 'Marketing site',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 96,
    kpis: 6,
    updated: '26 Oct 2026',
    focus: 'Landing pages and forms',
  },
  {
    id: 'audit_portal',
    name: 'Customer portal',
    owner: 'Nikhil Poluru',
    status: 'Watch',
    health: 82,
    kpis: 9,
    updated: '25 Oct 2026',
    focus: 'Tables and modals',
  },
  {
    id: 'audit_docs',
    name: 'Design system docs',
    owner: 'Dev Poluru',
    status: 'On track',
    health: 98,
    kpis: 5,
    updated: '24 Oct 2026',
    focus: 'Component examples',
  },
  {
    id: 'audit_mobile',
    name: 'Mobile checkout',
    owner: 'Rohan Poluru',
    status: 'At risk',
    health: 68,
    kpis: 8,
    updated: '26 Oct 2026',
    focus: 'Touch targets and errors',
  },
  {
    id: 'audit_support',
    name: 'Support center',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 93,
    kpis: 7,
    updated: '23 Oct 2026',
    focus: 'Search and articles',
  },
  {
    id: 'audit_admin',
    name: 'Admin console',
    owner: 'Anika Poluru',
    status: 'Watch',
    health: 79,
    kpis: 10,
    updated: '22 Oct 2026',
    focus: 'Dense data grids',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Audit', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Score' },
  { key: 'kpis', label: 'Checks' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Close portal contrast gaps', owner: 'Kavya Poluru', scorecard: 'Customer portal', progress: 72, target: '8 Nov', status: 'Watch' },
  { id: 'g2', name: 'Keyboard trap fixes in checkout', owner: 'Rohan Poluru', scorecard: 'Mobile checkout', progress: 54, target: '15 Nov', status: 'At risk' },
  { id: 'g3', name: 'Publish VPAT for portal', owner: 'Mira Poluru', scorecard: 'Customer portal', progress: 88, target: '12 Nov', status: 'On track' },
  { id: 'g4', name: 'Alt text on hero media', owner: 'Luca Poluru', scorecard: 'Marketing site', progress: 95, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Live region announcements', owner: 'Dev Poluru', scorecard: 'Admin console', progress: 61, target: '20 Nov', status: 'Watch' },
  { id: 'g6', name: 'Form error summaries', owner: 'Sahana Poluru', scorecard: 'Support center', progress: 84, target: '5 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Remediation goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Audit' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Accessibility lead', squad: 'Design ops', rating: 5, score: 96 },
  { name: 'Kavya Poluru', role: 'Product design', squad: 'Marketing', rating: 5, score: 94 },
  { name: 'Nikhil Poluru', role: 'Engineering manager', squad: 'Portal', rating: 4, score: 82 },
  { name: 'Dev Poluru', role: 'Design systems', squad: 'Platform', rating: 5, score: 98 },
  { name: 'Rohan Poluru', role: 'Mobile lead', squad: 'Commerce', rating: 4, score: 68 },
  { name: 'Priya Poluru', role: 'Content design', squad: 'Support', rating: 5, score: 93 },
  { name: 'Anika Poluru', role: 'Security & compliance', squad: 'Admin', rating: 4, score: 79 },
  { name: 'Luca Poluru', role: 'Web producer', squad: 'Marketing', rating: 4, score: 91 },
  { name: 'Sahana Poluru', role: 'QA specialist', squad: 'Quality', rating: 5, score: 90 },
  { name: 'Arjun Poluru', role: 'Program manager', squad: 'Office of CIO', rating: 5, score: 88 },
  { name: 'Elena Poluru', role: 'Research lead', squad: 'Design ops', rating: 4, score: 86 },
  { name: 'Hana Poluru', role: 'Documentation', squad: 'Platform', rating: 4, score: 92 },
];

export const alerts = [
  { id: 'a1', title: 'Focus lost in checkout step 3', owner: 'Rohan Poluru', scorecard: 'Mobile checkout', severity: 'Red', since: '25 Oct', note: 'Trap when promo drawer opens on iOS.' },
  { id: 'a2', title: 'Table headers missing on usage view', owner: 'Nikhil Poluru', scorecard: 'Customer portal', severity: 'Amber', since: '24 Oct', note: 'Screen reader reads cells as plain text.' },
  { id: 'a3', title: 'Contrast 3.8:1 on secondary buttons', owner: 'Kavya Poluru', scorecard: 'Marketing site', severity: 'Amber', since: '23 Oct', note: 'Hero CTA still passes; footer links fail AA.' },
  { id: 'a4', title: 'Skip link bypasses main landmark', owner: 'Dev Poluru', scorecard: 'Design system docs', severity: 'Green', since: '22 Oct', note: 'Fixed in docs theme 2.4.' },
  { id: 'a5', title: 'Live region not announced on save', owner: 'Anika Poluru', scorecard: 'Admin console', severity: 'Amber', since: '26 Oct', note: 'Toast visually appears; SR silent.' },
  { id: 'a6', title: 'Video captions missing on onboarding', owner: 'Priya Poluru', scorecard: 'Support center', severity: 'Red', since: '21 Oct', note: 'Three articles embed hosted media.' },
];

export const reviews = [
  { label: 'Weekly issue triage', description: 'Mira Poluru · open queue review', timestamp: '21 Oct', icon: 'clock', status: 'Done' },
  { label: 'Portal keyboard walkthrough', description: 'Sahana Poluru · 14 flows', timestamp: '22 Oct', icon: 'eye', status: 'Done' },
  { label: 'Design token contrast audit', description: 'Dev Poluru · AA palette', timestamp: '24 Oct', icon: 'check', status: 'Done' },
  { label: 'VPAT draft review', description: 'Arjun Poluru · legal sign-off', timestamp: '28 Oct', icon: 'folder', status: 'Today' },
  { label: 'Mobile checkout retest', description: 'Rohan Poluru · iOS + Android', timestamp: '30 Oct', icon: 'user', status: 'Next' },
  { label: 'Quarterly standards sync', description: 'Elena Poluru · WCAG 2.2', timestamp: '3 Nov', icon: 'file', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Keyboard operability', us: '97%', peer: '93%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Color contrast (AA)', us: '91%', peer: '88%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Form labels & errors', us: '89%', peer: '90%', gap: '−1 pt', status: 'Watch' },
  { metric: 'Media alternatives', us: '86%', peer: '92%', gap: '−6 pts', status: 'Behind' },
  { metric: 'Focus visibility', us: '95%', peer: '91%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Semantic structure', us: '94%', peer: '89%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Touch target size', us: '88%', peer: '85%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Document language', us: '100%', peer: '98%', gap: '+2 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Criterion', sortable: true },
  { key: 'us', label: 'Harbor Digital' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Q4 VPAT — customer portal', owner: 'Mira Poluru', updated: '25 Oct 2026', format: 'PDF' },
  { name: 'Automated scan export', owner: 'Sahana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Manual test evidence pack', owner: 'Luca Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Contrast regression log', owner: 'Dev Poluru', updated: '23 Oct 2026', format: 'XLSX' },
  { name: 'Keyboard audit — mobile', owner: 'Rohan Poluru', updated: '22 Oct 2026', format: 'PDF' },
  { name: 'Standards gap analysis', owner: 'Arjun Poluru', updated: '20 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Checkout focus trap is critical', description: 'Rohan Poluru · Mobile checkout', icon: 'alert-triangle' },
  { label: 'VPAT draft ready for review', description: 'Arjun Poluru · Due 12 Nov', icon: 'folder' },
  { label: 'Docs skip link verified', description: 'Dev Poluru · Design system', icon: 'check' },
  { label: 'Caption gaps on support videos', description: 'Priya Poluru · 3 articles', icon: 'eye' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Compliance pulse', href: '#/overview', icon: 'home' },
  { label: 'Customer portal audit', description: 'Nikhil Poluru', href: '#/scorecard/audit_portal', icon: 'eye' },
  { label: 'Open issues', description: 'Remediation queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Remediation goals', description: 'Quarter plan', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'WCAG benchmarks', href: '#/benchmarks', icon: 'folder' },
  { label: 'Team', description: 'Owners and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports and VPAT', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Scope', description: 'URLs and owner' },
  { label: 'Checks', description: 'WCAG level' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'public',
    label: 'Public surfaces',
    children: [
      { id: 'marketing', label: 'Marketing site', href: '#/scorecard/audit_marketing' },
      { id: 'support', label: 'Support center', href: '#/scorecard/audit_support' },
    ],
  },
  {
    id: 'product',
    label: 'Product',
    children: [
      { id: 'portal', label: 'Customer portal', href: '#/scorecard/audit_portal' },
      { id: 'mobile', label: 'Mobile checkout', href: '#/scorecard/audit_mobile' },
      { id: 'admin', label: 'Admin console', href: '#/scorecard/audit_admin' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    children: [{ id: 'docs', label: 'Design system docs', href: '#/scorecard/audit_docs' }],
  },
];

export const metricRows = [
  { metric: 'Automated pass rate', actual: '91%', target: '90%', variance: '+1 pt', status: 'On track' },
  { metric: 'Manual pass rate', actual: '88%', target: '92%', variance: '−4 pts', status: 'Watch' },
  { metric: 'Critical issues', actual: '4', target: '0', variance: '+4', status: 'At risk' },
  { metric: 'Median fix time', actual: '6.2d', target: '7d', variance: '−0.8d', status: 'On track' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/audits/audit_portal
Authorization: Bearer bcn_live_****

{
  "id": "audit_portal",
  "name": "Customer portal",
  "score": 82,
  "owner": "Nikhil Poluru",
  "wcag_level": "AA"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Audit',
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
