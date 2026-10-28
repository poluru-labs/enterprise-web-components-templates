export const productName = 'Ledger';
export const productLine = 'Study reproducibility';
export const workspaceName = 'Harbor Research';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@harbor.example',
  role: 'Reproducibility program lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Cohort 7 · protocol v2.4',
  timezone: 'America / Chicago',
  close: 'Replication window closes 21 Nov 2026',
};

export const tickerItems = [
  { label: 'Replication rate', value: '87%', delta: '+3 pts', trend: 'up', href: '#/trends' },
  { label: 'Open gaps', value: '14', delta: '−4', trend: 'up', href: '#/alerts' },
  { label: 'Studies', value: '42', delta: '+2', trend: 'up', href: '#/scorecards' },
  { label: 'Artifact match', value: '96%', delta: '+1 pt', trend: 'up', href: '#/benchmarks' },
  { label: 'Protocol adherence', value: '91%', delta: 'Hold', trend: 'flat', href: '#/benchmarks' },
  { label: 'Review cycle', value: '18d', delta: '−2d', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Studies', href: '#/scorecards', icon: 'folder' },
  { label: 'Gaps', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Replication success', value: '87%', hint: 'Independent reruns matching primary', trend: 'up', trendValue: '+3 pts' },
  { label: 'Open gaps', value: '14', hint: '5 blocking publication sign-off', trend: 'up', trendValue: '−4' },
  { label: 'Registered studies', value: '42', hint: 'Cohort 7 active protocols', trend: 'up', trendValue: '+2' },
  { label: 'Artifact hash match', value: '96%', hint: 'Data & code bundles verified', trend: 'up', trendValue: '+1 pt' },
  { label: 'Protocol adherence', value: '91%', hint: 'Steps logged vs protocol v2.4', trend: 'flat', trendValue: 'Hold' },
  { label: 'Environment parity', value: '94%', hint: 'Container digest matches registry', trend: 'up', trendValue: '+2 pts' },
  { label: 'Peer reviews done', value: '38', hint: 'This cohort quarter', trend: 'up', trendValue: '+6' },
  { label: 'Median review time', value: '18d', hint: 'Registration to sign-off', trend: 'up', trendValue: '−2d' },
];

export const revenueTrend = [78, 79, 80, 81, 82, 83, 84, 84, 85, 86, 86, 87];

export const scorecards = [
  {
    id: 'stud_cardio',
    name: 'Cardio metabolomics',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 94,
    kpis: 12,
    updated: '26 Oct 2026',
    focus: 'Plasma panels · n=480',
  },
  {
    id: 'stud_soil',
    name: 'Soil microbiome trial',
    owner: 'Luca Poluru',
    status: 'Watch',
    health: 79,
    kpis: 8,
    updated: '26 Oct 2026',
    focus: 'Field sites · seasonal',
  },
  {
    id: 'stud_vaccine',
    name: 'Vaccine stability shelf',
    owner: 'Anika Poluru',
    status: 'On track',
    health: 92,
    kpis: 6,
    updated: '25 Oct 2026',
    focus: 'Cold chain · 90-day',
  },
  {
    id: 'stud_cognitive',
    name: 'Cognitive battery RCT',
    owner: 'Dev Poluru',
    status: 'At risk',
    health: 68,
    kpis: 10,
    updated: '25 Oct 2026',
    focus: 'Blinding · missing scripts',
  },
  {
    id: 'stud_materials',
    name: 'Materials stress test',
    owner: 'Nikhil Poluru',
    status: 'On track',
    health: 96,
    kpis: 5,
    updated: '24 Oct 2026',
    focus: 'Load frames · ISO fixtures',
  },
  {
    id: 'stud_nutrition',
    name: 'Nutrition cohort follow-up',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 90,
    kpis: 14,
    updated: '24 Oct 2026',
    focus: 'Diet logs · year 3',
  },
  {
    id: 'stud_water',
    name: 'Water quality sentinel',
    owner: 'Rohan Poluru',
    status: 'Watch',
    health: 82,
    kpis: 9,
    updated: '23 Oct 2026',
    focus: 'Sensor calibration drift',
  },
  {
    id: 'stud_genomics',
    name: 'Genomics QC benchmark',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 93,
    kpis: 7,
    updated: '22 Oct 2026',
    focus: 'Pipeline pins · reference build',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Study', sortable: true },
  { key: 'owner', label: 'PI', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Replication score' },
  { key: 'kpis', label: 'Runs logged' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'Publish cognitive battery scripts', owner: 'Dev Poluru', scorecard: 'Cognitive battery RCT', progress: 41, target: '9 Nov', status: 'At risk' },
  { id: 'g2', name: 'Soil site environment lockfile', owner: 'Luca Poluru', scorecard: 'Soil microbiome trial', progress: 63, target: '14 Nov', status: 'Watch' },
  { id: 'g3', name: 'Water sensor calibration replay', owner: 'Rohan Poluru', scorecard: 'Water quality sentinel', progress: 55, target: '11 Nov', status: 'Watch' },
  { id: 'g4', name: 'Cohort 7 artifact audit', owner: 'Mira Poluru', scorecard: 'Harbor Research', progress: 82, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'Genomics reference pin update', owner: 'Kavya Poluru', scorecard: 'Genomics QC benchmark', progress: 91, target: '4 Nov', status: 'On track' },
  { id: 'g6', name: 'Cardio metabolomics blind rerun', owner: 'Priya Poluru', scorecard: 'Cardio metabolomics', progress: 77, target: '18 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Reproducibility goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Study' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Reproducibility program lead', squad: 'Governance', rating: 5, score: 94 },
  { name: 'Sahana Poluru', role: 'Methods reviewer', squad: 'Governance', rating: 5, score: 92 },
  { name: 'Priya Poluru', role: 'Principal investigator', squad: 'Clinical', rating: 5, score: 94 },
  { name: 'Dev Poluru', role: 'Biostatistics', squad: 'Clinical', rating: 4, score: 68 },
  { name: 'Luca Poluru', role: 'Field science lead', squad: 'Environmental', rating: 4, score: 79 },
  { name: 'Anika Poluru', role: 'Lab director', squad: 'Biologics', rating: 5, score: 92 },
  { name: 'Nikhil Poluru', role: 'Materials engineer', squad: 'Physical', rating: 5, score: 96 },
  { name: 'Kavya Poluru', role: 'Bioinformatics', squad: 'Genomics', rating: 5, score: 93 },
  { name: 'Elena Poluru', role: 'Epidemiology', squad: 'Population', rating: 5, score: 90 },
  { name: 'Rohan Poluru', role: 'Environmental monitoring', squad: 'Environmental', rating: 4, score: 82 },
  { name: 'Arjun Poluru', role: 'Data curator', squad: 'Governance', rating: 5, score: 91 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 89 },
];

export const alerts = [
  { id: 'a1', title: 'Cognitive battery scripts missing', owner: 'Dev Poluru', scorecard: 'Cognitive battery RCT', severity: 'Red', since: '26 Oct', note: 'Analysis notebook not pinned · replication blocked.' },
  { id: 'a2', title: 'Soil microbiome env drift', owner: 'Luca Poluru', scorecard: 'Soil microbiome trial', severity: 'Amber', since: '25 Oct', note: 'R version mismatch vs registered lockfile.' },
  { id: 'a3', title: 'Water sensor calibration gap', owner: 'Rohan Poluru', scorecard: 'Water quality sentinel', severity: 'Amber', since: '25 Oct', note: 'Two field units lack signed calibration replay.' },
  { id: 'a4', title: 'Cardio metabolomics rerun passed', owner: 'Priya Poluru', scorecard: 'Cardio metabolomics', severity: 'Green', since: '24 Oct', note: 'Independent lab matched primary effect sizes.' },
  { id: 'a5', title: 'Materials stress artifacts verified', owner: 'Nikhil Poluru', scorecard: 'Materials stress test', severity: 'Green', since: '23 Oct', note: 'Hash match on raw strain gauge exports.' },
  { id: 'a6', title: 'Genomics pipeline pin updated', owner: 'Kavya Poluru', scorecard: 'Genomics QC benchmark', severity: 'Green', since: '22 Oct', note: 'Reference build GRCh38.p14 recorded.' },
];

export const reviews = [
  { label: 'Gap triage', description: 'Mira Poluru · open items', timestamp: '27 Oct', icon: 'clock', status: 'Today' },
  { label: 'Cognitive study review', description: 'Dev Poluru · blocking', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Next' },
  { label: 'Independent rerun sign-off', description: 'Priya Poluru · cardio', timestamp: '30 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Protocol v2.4 training', description: 'Sahana Poluru · cohort', timestamp: '1 Nov', icon: 'user', status: 'Scheduled' },
  { label: 'Artifact audit', description: 'Arjun Poluru · hashes', timestamp: '5 Nov', icon: 'folder', status: 'Scheduled' },
  { label: 'Cohort 7 report freeze', description: 'Hana Poluru · exports', timestamp: '21 Nov', icon: 'download', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Replication success', us: '87%', peer: '82%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Artifact hash match', us: '96%', peer: '91%', gap: '+5 pts', status: 'Ahead' },
  { metric: 'Protocol adherence', us: '91%', peer: '88%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Environment parity', us: '94%', peer: '93%', gap: '+1 pt', status: 'Ahead' },
  { metric: 'Time to replicate', us: '18d', peer: '22d', gap: '−4d', status: 'Ahead' },
  { metric: 'Preregistration coverage', us: '98%', peer: '95%', gap: '+3 pts', status: 'Ahead' },
  { metric: 'Blinding documentation', us: '89%', peer: '90%', gap: '−1 pt', status: 'Watch' },
  { metric: 'Open gap resolution', us: '76%', peer: '78%', gap: '−2 pts', status: 'Watch' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Harbor Research' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Cohort 7 reproducibility summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Gap register export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Artifact manifest', owner: 'Arjun Poluru', updated: '25 Oct 2026', format: 'JSON' },
  { name: 'Protocol adherence pack', owner: 'Sahana Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Independent rerun certificates', owner: 'Priya Poluru', updated: '23 Oct 2026', format: 'PDF' },
  { name: 'Study scorecards', owner: 'Anika Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Cognitive scripts missing', description: 'Dev Poluru · Red', icon: 'alert-triangle' },
  { label: 'Cardio rerun passed', description: 'Priya Poluru · Done', icon: 'check' },
  { label: 'Soil env drift', description: 'Luca Poluru · Review', icon: 'clock' },
  { label: 'Window closes 21 Nov', description: 'Mira Poluru · Cohort 7', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Replication pulse', href: '#/overview', icon: 'home' },
  { label: 'Cognitive battery RCT', description: 'Dev Poluru', href: '#/scorecard/stud_cognitive', icon: 'folder' },
  { label: 'Open gaps', description: 'Gap queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Reproducibility goals', description: 'Cohort 7', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'PIs and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Study', description: 'Protocol and PI' },
  { label: 'Artifacts', description: 'Data, code, env' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'clinical',
    label: 'Clinical',
    children: [
      { id: 'cardio', label: 'Cardio metabolomics', href: '#/scorecard/stud_cardio' },
      { id: 'cognitive', label: 'Cognitive battery RCT', href: '#/scorecard/stud_cognitive' },
      { id: 'vaccine', label: 'Vaccine stability shelf', href: '#/scorecard/stud_vaccine' },
    ],
  },
  {
    id: 'environmental',
    label: 'Environmental',
    children: [
      { id: 'soil', label: 'Soil microbiome trial', href: '#/scorecard/stud_soil' },
      { id: 'water', label: 'Water quality sentinel', href: '#/scorecard/stud_water' },
    ],
  },
  {
    id: 'lab',
    label: 'Lab & physical',
    children: [
      { id: 'materials', label: 'Materials stress test', href: '#/scorecard/stud_materials' },
      { id: 'genomics', label: 'Genomics QC benchmark', href: '#/scorecard/stud_genomics' },
      { id: 'nutrition', label: 'Nutrition cohort follow-up', href: '#/scorecard/stud_nutrition' },
    ],
  },
];

export const metricRows = [
  { metric: 'Replication success', actual: '87%', target: '85%', variance: '+2 pts', status: 'On track' },
  { metric: 'Artifact match', actual: '96%', target: '95%', variance: '+1 pt', status: 'On track' },
  { metric: 'Protocol steps logged', actual: '91%', target: '95%', variance: '−4 pts', status: 'Watch' },
  { metric: 'Blocking gaps', actual: '5', target: '0', variance: '+5', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/studies/stud_cardio/replication
Authorization: Bearer lgr_live_****

{
  "id": "stud_cardio",
  "name": "Cardio metabolomics",
  "replication_score": 94,
  "pi": "Priya Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Study',
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
    type: 'Gap',
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
