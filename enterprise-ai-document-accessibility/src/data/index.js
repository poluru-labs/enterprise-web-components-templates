export const productName = 'Clarity';
export const productLine = 'Documents';
export const workspaceName = 'Summit Publishing';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@summit.example',
  role: 'Document accessibility lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Q4 2026 · audit wave 3',
  timezone: 'America / Chicago',
  close: 'Board pack remediation due 20 Nov 2026',
};

export const tickerItems = [
  { label: 'Doc score', value: '91%', delta: '+2 pts', trend: 'up', href: '#/trends' },
  { label: 'Open issues', value: '31', delta: '−5', trend: 'up', href: '#/alerts' },
  { label: 'PDFs tagged', value: '84', delta: '+6', trend: 'up', href: '#/scorecards' },
  { label: 'Reading order', value: '88%', delta: '+3 pts', trend: 'up', href: '#/benchmarks' },
  { label: 'Critical', value: '3', delta: '−1', trend: 'up', href: '#/alerts' },
  { label: 'VPAT docs', value: '12', delta: 'On plan', trend: 'flat', href: '#/reports' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Documents', href: '#/scorecards', icon: 'file' },
  { label: 'Issues', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Portfolio score', value: '91%', hint: 'Weighted PDF/UA + WCAG checks', trend: 'up', trendValue: '+2 pts' },
  { label: 'Open issues', value: '31', hint: '8 due this week', trend: 'up', trendValue: '−5' },
  { label: 'Documents in scope', value: '84', hint: 'PDF and Office exports', trend: 'up', trendValue: '+6' },
  { label: 'Tagged PDF rate', value: '94%', hint: 'Structure tree present', trend: 'up', trendValue: '+1 pt' },
  { label: 'Alt text coverage', value: '86%', hint: 'Figures and charts', trend: 'up', trendValue: '+4 pts' },
  { label: 'Reading order pass', value: '88%', hint: 'Logical content order', trend: 'up', trendValue: '+3 pts' },
  { label: 'Remediated this month', value: '22', hint: 'Re-uploaded to CMS', trend: 'up', trendValue: '+7' },
  { label: 'Manual reviews', value: '14', hint: 'Screen reader walkthroughs', trend: 'flat', trendValue: 'On plan' },
];

export const revenueTrend = [84, 85, 86, 86, 87, 88, 88, 89, 90, 90, 91, 91];

export const scorecards = [
  {
    id: 'doc_handbook',
    name: 'Employee handbook',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 96,
    kpis: 24,
    updated: '26 Oct 2026',
    focus: 'Tagged PDF · 142 pages',
  },
  {
    id: 'doc_board',
    name: 'Board pack Q3',
    owner: 'Arjun Poluru',
    status: 'Watch',
    health: 78,
    kpis: 18,
    updated: '25 Oct 2026',
    focus: 'Charts and appendices',
  },
  {
    id: 'doc_policy',
    name: 'Security policy pack',
    owner: 'Anika Poluru',
    status: 'On track',
    health: 93,
    kpis: 12,
    updated: '25 Oct 2026',
    focus: 'Multi-column layout',
  },
  {
    id: 'doc_benefits',
    name: 'Benefits guide',
    owner: 'Elena Poluru',
    status: 'At risk',
    health: 67,
    kpis: 20,
    updated: '24 Oct 2026',
    focus: 'Tables and forms',
  },
  {
    id: 'doc_annual',
    name: 'Annual report',
    owner: 'Kavya Poluru',
    status: 'Watch',
    health: 82,
    kpis: 32,
    updated: '24 Oct 2026',
    focus: 'Infographics',
  },
  {
    id: 'doc_onboard',
    name: 'Onboarding kit',
    owner: 'Luca Poluru',
    status: 'On track',
    health: 95,
    kpis: 15,
    updated: '23 Oct 2026',
    focus: 'Linked PDF set',
  },
  {
    id: 'doc_legal',
    name: 'Vendor MSAs',
    owner: 'Hana Poluru',
    status: 'Watch',
    health: 79,
    kpis: 28,
    updated: '23 Oct 2026',
    focus: 'Scanned legacy PDFs',
  },
  {
    id: 'doc_training',
    name: 'Safety training deck',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 92,
    kpis: 16,
    updated: '22 Oct 2026',
    focus: 'Exported from PowerPoint',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Document', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Score' },
  { key: 'kpis', label: 'Checks' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Fix board pack chart alt text', owner: 'Kavya Poluru', scorecard: 'Board pack Q3', progress: 62, target: '8 Nov', status: 'Watch' },
  { id: 'g2', name: 'Benefits table headers', owner: 'Elena Poluru', scorecard: 'Benefits guide', progress: 48, target: '15 Nov', status: 'At risk' },
  { id: 'g3', name: 'Retag vendor MSAs batch 2', owner: 'Hana Poluru', scorecard: 'Vendor MSAs', progress: 71, target: '12 Nov', status: 'Watch' },
  { id: 'g4', name: 'Handbook language metadata', owner: 'Priya Poluru', scorecard: 'Employee handbook', progress: 98, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Annual report reading order', owner: 'Kavya Poluru', scorecard: 'Annual report', progress: 74, target: '20 Nov', status: 'Watch' },
  { id: 'g6', name: 'Onboarding link annotations', owner: 'Luca Poluru', scorecard: 'Onboarding kit', progress: 88, target: '5 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Remediation goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Document' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Document accessibility lead', squad: 'Publishing', rating: 5, score: 94 },
  { name: 'Priya Poluru', role: 'Content operations', squad: 'HR docs', rating: 5, score: 96 },
  { name: 'Kavya Poluru', role: 'Corporate communications', squad: 'Investor', rating: 4, score: 82 },
  { name: 'Arjun Poluru', role: 'Board secretary', squad: 'Governance', rating: 4, score: 78 },
  { name: 'Elena Poluru', role: 'Benefits communications', squad: 'HR docs', rating: 4, score: 67 },
  { name: 'Anika Poluru', role: 'Policy owner', squad: 'Security', rating: 5, score: 93 },
  { name: 'Luca Poluru', role: 'Onboarding producer', squad: 'People', rating: 5, score: 95 },
  { name: 'Hana Poluru', role: 'Legal operations', squad: 'Legal', rating: 4, score: 79 },
  { name: 'Sahana Poluru', role: 'QA specialist', squad: 'Publishing', rating: 5, score: 91 },
  { name: 'Dev Poluru', role: 'PDF tooling', squad: 'Platform', rating: 5, score: 88 },
  { name: 'Rohan Poluru', role: 'Training lead', squad: 'Safety', rating: 4, score: 92 },
  { name: 'Nikhil Poluru', role: 'CMS engineer', squad: 'Platform', rating: 4, score: 86 },
];

export const alerts = [
  { id: 'a1', title: 'Board chart missing alt text', owner: 'Kavya Poluru', scorecard: 'Board pack Q3', severity: 'Red', since: '26 Oct', note: 'Three revenue charts are flagged as Figure without description.' },
  { id: 'a2', title: 'Benefits table not tagged as Table', owner: 'Elena Poluru', scorecard: 'Benefits guide', severity: 'Red', since: '25 Oct', note: 'Screen reader reads cells out of order.' },
  { id: 'a3', title: 'MSA scan lacks OCR layer', owner: 'Hana Poluru', scorecard: 'Vendor MSAs', severity: 'Amber', since: '24 Oct', note: 'Batch 2 uploads from legacy archive.' },
  { id: 'a4', title: 'Handbook bookmark tree updated', owner: 'Priya Poluru', scorecard: 'Employee handbook', severity: 'Green', since: '24 Oct', note: 'Verified with NVDA and VoiceOver.' },
  { id: 'a5', title: 'Annual report reading order gap', owner: 'Kavya Poluru', scorecard: 'Annual report', severity: 'Amber', since: '23 Oct', note: 'Sidebar callouts inserted mid-paragraph.' },
  { id: 'a6', title: 'Training deck slide titles empty', owner: 'Rohan Poluru', scorecard: 'Safety training deck', severity: 'Amber', since: '22 Oct', note: 'Export preset missing title placeholders.' },
];

export const reviews = [
  { label: 'Weekly issue triage', description: 'Mira Poluru · open queue', timestamp: '21 Oct', icon: 'clock', status: 'Done' },
  { label: 'Board pack read-through', description: 'Sahana Poluru · NVDA', timestamp: '25 Oct', icon: 'eye', status: 'Done' },
  { label: 'Benefits table remediation', description: 'Elena Poluru · due 15 Nov', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Today' },
  { label: 'PDF/UA spot check', description: 'Dev Poluru · 6 samples', timestamp: '30 Oct', icon: 'check', status: 'Next' },
  { label: 'VPAT bundle review', description: 'Arjun Poluru · governance', timestamp: '20 Nov', icon: 'folder', status: 'Scheduled' },
  { label: 'CMS upload training', description: 'Nikhil Poluru · authors', timestamp: '5 Nov', icon: 'user', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Tagged PDF structure', us: '94%', peer: '89%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Document language set', us: '98%', peer: '95%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Figure alt text', us: '86%', peer: '84%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Table headers (TH)', us: '81%', peer: '86%', gap: '−5 pts', status: 'Behind' },
  { metric: 'Reading order', us: '88%', peer: '85%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Bookmark outline', us: '92%', peer: '88%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Color contrast (text)', us: '90%', peer: '87%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Form field labels', us: '84%', peer: '82%', gap: '+2 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Criterion', sortable: true },
  { key: 'us', label: 'Summit Publishing' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Q4 document accessibility summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Issue export — open queue', owner: 'Sahana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Board pack remediation log', owner: 'Arjun Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'PDF/UA validation results', owner: 'Dev Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Author checklist pack', owner: 'Priya Poluru', updated: '23 Oct 2026', format: 'PDF' },
  { name: 'VPAT — public documents', owner: 'Anika Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Board charts need alt text', description: 'Kavya Poluru · Critical', icon: 'alert-triangle' },
  { label: 'Benefits tables failing TH check', description: 'Elena Poluru · Due 15 Nov', icon: 'clock' },
  { label: 'Handbook tags verified', description: 'Priya Poluru · Complete', icon: 'check' },
  { label: 'VPAT bundle due 20 Nov', description: 'Arjun Poluru · Governance', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Document pulse', href: '#/overview', icon: 'home' },
  { label: 'Board pack Q3', description: 'Arjun Poluru', href: '#/scorecard/doc_board', icon: 'file' },
  { label: 'Open issues', description: 'Remediation queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Remediation goals', description: 'Quarter plan', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'PDF/UA benchmarks', href: '#/benchmarks', icon: 'folder' },
  { label: 'Team', description: 'Owners and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports and VPAT', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Document', description: 'File and owner' },
  { label: 'Checks', description: 'PDF/UA profile' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'hr',
    label: 'People',
    children: [
      { id: 'handbook', label: 'Employee handbook', href: '#/scorecard/doc_handbook' },
      { id: 'benefits', label: 'Benefits guide', href: '#/scorecard/doc_benefits' },
      { id: 'onboard', label: 'Onboarding kit', href: '#/scorecard/doc_onboard' },
    ],
  },
  {
    id: 'gov',
    label: 'Governance',
    children: [
      { id: 'board', label: 'Board pack Q3', href: '#/scorecard/doc_board' },
      { id: 'annual', label: 'Annual report', href: '#/scorecard/doc_annual' },
      { id: 'policy', label: 'Security policy pack', href: '#/scorecard/doc_policy' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    children: [
      { id: 'legal', label: 'Vendor MSAs', href: '#/scorecard/doc_legal' },
      { id: 'training', label: 'Safety training deck', href: '#/scorecard/doc_training' },
    ],
  },
];

export const metricRows = [
  { metric: 'Automated checks', actual: '412', target: '400', variance: '+12', status: 'On track' },
  { metric: 'Manual findings', actual: '18', target: '10', variance: '+8', status: 'Watch' },
  { metric: 'PDF/UA pass', actual: '91%', target: '95%', variance: '−4 pts', status: 'Watch' },
  { metric: 'Median fix time', actual: '4.2d', target: '5d', variance: '−0.8d', status: 'On track' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/documents/doc_board
Authorization: Bearer clr_live_****

{
  "id": "doc_board",
  "name": "Board pack Q3",
  "score": 78,
  "owner": "Arjun Poluru",
  "format": "PDF/UA-1"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Document',
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
