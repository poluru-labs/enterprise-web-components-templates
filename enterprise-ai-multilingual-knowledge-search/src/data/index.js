export const productName = 'Lexicon';
export const productLine = 'Multilingual search';
export const workspaceName = 'Horizon Global';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@horizon.example',
  role: 'Global search program lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Wave 9 · index build 2026.11',
  timezone: 'America / Chicago',
  close: 'Glossary freeze 12 Dec 2026',
};

export const tickerItems = [
  { label: 'Search precision', value: '92%', delta: '+2 pts', trend: 'up', href: '#/trends' },
  { label: 'Open gaps', value: '16', delta: '−3', trend: 'up', href: '#/alerts' },
  { label: 'Locales', value: '24', delta: '+2', trend: 'up', href: '#/scorecards' },
  { label: 'Translation coverage', value: '94%', delta: '+1 pt', trend: 'up', href: '#/benchmarks' },
  { label: 'Glossary match', value: '89%', delta: 'Hold', trend: 'flat', href: '#/benchmarks' },
  { label: 'Query p95', value: '290ms', delta: '−15ms', trend: 'up', href: '#/trends' },
];

export const navItems = [
  { label: 'Dashboard', href: '#/overview', icon: 'home' },
  { label: 'Locales', href: '#/scorecards', icon: 'folder' },
  { label: 'Gaps', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Standards', href: '#/benchmarks', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Search precision@5', value: '92%', hint: 'Correct article in top five', trend: 'up', trendValue: '+2 pts' },
  { label: 'Open gaps', value: '16', hint: '6 blocking locale launch', trend: 'up', trendValue: '−3' },
  { label: 'Indexed locales', value: '24', hint: 'Active knowledge locales', trend: 'up', trendValue: '+2' },
  { label: 'Translation coverage', value: '94%', hint: 'Source parity vs en-US master', trend: 'up', trendValue: '+1 pt' },
  { label: 'Glossary adherence', value: '89%', hint: 'Approved term usage in hits', trend: 'flat', trendValue: 'Hold' },
  { label: 'Stale segments', value: '3.1%', hint: 'Beyond 90-day refresh SLO', trend: 'up', trendValue: '−0.4 pts' },
  { label: 'Queries / day', value: '48k', hint: 'All locales combined', trend: 'up', trendValue: '+8%' },
  { label: 'Search latency p95', value: '290ms', hint: 'End-to-end ranked results', trend: 'up', trendValue: '−15ms' },
];

export const revenueTrend = [86, 87, 88, 89, 90, 90, 91, 91, 91, 92, 92, 92];

export const scorecards = [
  {
    id: 'loc_en_support',
    name: 'en-US · Support',
    owner: 'Priya Poluru',
    status: 'On track',
    health: 96,
    kpis: 4200,
    updated: '26 Oct 2026',
    focus: 'Master corpus · tier-1',
  },
  {
    id: 'loc_de_product',
    name: 'de-DE · Product',
    owner: 'Anika Poluru',
    status: 'On track',
    health: 93,
    kpis: 2100,
    updated: '26 Oct 2026',
    focus: 'API docs · compound terms',
  },
  {
    id: 'loc_ja_policy',
    name: 'ja-JP · Policy',
    owner: 'Dev Poluru',
    status: 'Watch',
    health: 81,
    kpis: 890,
    updated: '25 Oct 2026',
    focus: 'Legal · keigo variants',
  },
  {
    id: 'loc_es_sales',
    name: 'es-MX · Sales',
    owner: 'Kavya Poluru',
    status: 'At risk',
    health: 72,
    kpis: 640,
    updated: '25 Oct 2026',
    focus: 'Playbooks · regional offers',
  },
  {
    id: 'loc_fr_hr',
    name: 'fr-FR · HR',
    owner: 'Elena Poluru',
    status: 'On track',
    health: 91,
    kpis: 520,
    updated: '24 Oct 2026',
    focus: 'Benefits · EU wording',
  },
  {
    id: 'loc_pt_engineering',
    name: 'pt-BR · Engineering',
    owner: 'Luca Poluru',
    status: 'On track',
    health: 95,
    kpis: 1100,
    updated: '24 Oct 2026',
    focus: 'Runbooks · safety copy',
  },
  {
    id: 'loc_ko_finance',
    name: 'ko-KR · Finance',
    owner: 'Arjun Poluru',
    status: 'Watch',
    health: 84,
    kpis: 380,
    updated: '23 Oct 2026',
    focus: 'Numeric formats · tables',
  },
  {
    id: 'loc_ar_help',
    name: 'ar-SA · Help center',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 90,
    kpis: 760,
    updated: '22 Oct 2026',
    focus: 'RTL layout · diacritics',
  },
];

export const scorecardColumns = [
  { key: 'name', label: 'Locale pack', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Search score' },
  { key: 'kpis', label: 'Articles' },
  { key: 'updated', label: 'Updated' },
];

export const goals = [
  { id: 'g1', name: 'es-MX sales glossary sync', owner: 'Kavya Poluru', scorecard: 'es-MX · Sales', progress: 48, target: '10 Nov', status: 'At risk' },
  { id: 'g2', name: 'ja-JP policy term audit', owner: 'Dev Poluru', scorecard: 'ja-JP · Policy', progress: 62, target: '14 Nov', status: 'Watch' },
  { id: 'g3', name: 'ko-KR table token fix', owner: 'Arjun Poluru', scorecard: 'ko-KR · Finance', progress: 58, target: '11 Nov', status: 'Watch' },
  { id: 'g4', name: 'Wave 9 query suite expansion', owner: 'Mira Poluru', scorecard: 'Horizon Global', progress: 79, target: '1 Nov', status: 'On track' },
  { id: 'g5', name: 'de-DE synonym map refresh', owner: 'Anika Poluru', scorecard: 'de-DE · Product', progress: 88, target: '5 Nov', status: 'On track' },
  { id: 'g6', name: 'ar-SA RTL snippet QA', owner: 'Sahana Poluru', scorecard: 'ar-SA · Help center', progress: 91, target: '18 Nov', status: 'On track' },
];

export const goalColumns = [
  { key: 'name', label: 'Localization goal', sortable: true },
  { key: 'owner', label: 'Owner' },
  { key: 'scorecard', label: 'Locale pack' },
  { key: 'progress', label: 'Progress' },
  { key: 'target', label: 'Target' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Global search program lead', squad: 'Governance', rating: 5, score: 94 },
  { name: 'Priya Poluru', role: 'en-US content owner', squad: 'Support', rating: 5, score: 96 },
  { name: 'Anika Poluru', role: 'DACH localization', squad: 'Product', rating: 5, score: 93 },
  { name: 'Dev Poluru', role: 'APAC policy writer', squad: 'Legal', rating: 4, score: 81 },
  { name: 'Kavya Poluru', role: 'LATAM enablement', squad: 'Revenue', rating: 4, score: 72 },
  { name: 'Elena Poluru', role: 'EU people content', squad: 'HR', rating: 5, score: 91 },
  { name: 'Luca Poluru', role: 'Engineering docs', squad: 'Platform', rating: 5, score: 95 },
  { name: 'Arjun Poluru', role: 'Finance localization', squad: 'Finance', rating: 4, score: 84 },
  { name: 'Sahana Poluru', role: 'RTL & accessibility', squad: 'Platform', rating: 5, score: 90 },
  { name: 'Rohan Poluru', role: 'Search platform', squad: 'Platform', rating: 5, score: 92 },
  { name: 'Nikhil Poluru', role: 'Glossary curator', squad: 'Governance', rating: 5, score: 89 },
  { name: 'Hana Poluru', role: 'Reporting', squad: 'Governance', rating: 4, score: 88 },
];

export const alerts = [
  { id: 'a1', title: 'es-MX sales precision below gate', owner: 'Kavya Poluru', scorecard: 'es-MX · Sales', severity: 'Red', since: '26 Oct', note: '0.68 vs 0.80 minimum on wave 9 labeled queries.' },
  { id: 'a2', title: 'ja-JP keigo mismatch in policy hits', owner: 'Dev Poluru', scorecard: 'ja-JP · Policy', severity: 'Amber', since: '25 Oct', note: 'Formal/informal variants mixed in top results.' },
  { id: 'a3', title: 'ko-KR currency token not indexed', owner: 'Arjun Poluru', scorecard: 'ko-KR · Finance', severity: 'Amber', since: '25 Oct', note: 'Won queries fail on table-heavy articles.' },
  { id: 'a4', title: 'de-DE synonym map verified', owner: 'Anika Poluru', scorecard: 'de-DE · Product', severity: 'Green', since: '24 Oct', note: 'Nikhil Poluru signed glossary diff.' },
  { id: 'a5', title: 'pt-BR runbook refresh complete', owner: 'Luca Poluru', scorecard: 'pt-BR · Engineering', severity: 'Green', since: '23 Oct', note: 'All segments within 90-day SLO.' },
  { id: 'a6', title: 'ar-SA RTL snippet regression fixed', owner: 'Sahana Poluru', scorecard: 'ar-SA · Help center', severity: 'Green', since: '22 Oct', note: 'Bidirectional text in result cards corrected.' },
];

export const reviews = [
  { label: 'Gap triage', description: 'Mira Poluru · wave 9', timestamp: '27 Oct', icon: 'clock', status: 'Today' },
  { label: 'es-MX launch review', description: 'Kavya Poluru · blocking', timestamp: '28 Oct', icon: 'alert-triangle', status: 'Next' },
  { label: 'Glossary council', description: 'Nikhil Poluru · terms', timestamp: '30 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Query suite calibration', description: 'Rohan Poluru · precision', timestamp: '1 Nov', icon: 'eye', status: 'Scheduled' },
  { label: 'RTL QA office hours', description: 'Sahana Poluru · ar-SA', timestamp: '4 Nov', icon: 'user', status: 'Scheduled' },
  { label: 'Wave 9 report freeze', description: 'Hana Poluru · exports', timestamp: '12 Dec', icon: 'download', status: 'Scheduled' },
];

export const benchmarks = [
  { metric: 'Precision@5', us: '92%', peer: '88%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Translation coverage', us: '94%', peer: '90%', gap: '+4 pts', status: 'Ahead' },
  { metric: 'Glossary adherence', us: '89%', peer: '87%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Cross-locale parity', us: '91%', peer: '89%', gap: '+2 pts', status: 'Ahead' },
  { metric: 'Stale segment rate', us: '3.1%', peer: '4.0%', gap: '−0.9 pts', status: 'Ahead' },
  { metric: 'Search latency p95', us: '290ms', peer: '320ms', gap: '−30ms', status: 'Ahead' },
  { metric: 'Zero-result rate', us: '2.4%', peer: '2.2%', gap: '+0.2 pts', status: 'Watch' },
  { metric: 'Human review pass', us: '90%', peer: '88%', gap: '+2 pts', status: 'Ahead' },
];

export const benchmarkColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'us', label: 'Horizon Global' },
  { key: 'peer', label: 'Peer median' },
  { key: 'gap', label: 'Gap' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Wave 9 search summary', owner: 'Mira Poluru', updated: '26 Oct 2026', format: 'PDF' },
  { name: 'Gap register export', owner: 'Hana Poluru', updated: '26 Oct 2026', format: 'CSV' },
  { name: 'Labeled query results', owner: 'Rohan Poluru', updated: '25 Oct 2026', format: 'XLSX' },
  { name: 'Glossary diff pack', owner: 'Nikhil Poluru', updated: '24 Oct 2026', format: 'ZIP' },
  { name: 'Locale index manifest', owner: 'Priya Poluru', updated: '23 Oct 2026', format: 'JSON' },
  { name: 'Locale scorecards', owner: 'Anika Poluru', updated: '22 Oct 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'es-MX precision gate', description: 'Kavya Poluru · Red', icon: 'alert-triangle' },
  { label: 'de-DE glossary signed', description: 'Anika Poluru · Done', icon: 'check' },
  { label: 'ja-JP keigo review', description: 'Dev Poluru · Review', icon: 'clock' },
  { label: 'Glossary freeze 12 Dec', description: 'Nikhil Poluru · Wave 9', icon: 'folder' },
];

export const commandItems = [
  { label: 'Dashboard', description: 'Search pulse', href: '#/overview', icon: 'home' },
  { label: 'es-MX · Sales', description: 'Kavya Poluru', href: '#/scorecard/loc_es_sales', icon: 'folder' },
  { label: 'Open gaps', description: 'Gap queue', href: '#/alerts', icon: 'alert-triangle' },
  { label: 'Localization goals', description: 'Wave 9', href: '#/goals', icon: 'check' },
  { label: 'Standards', description: 'Peer benchmarks', href: '#/benchmarks', icon: 'star' },
  { label: 'Team', description: 'Owners and reviewers', href: '#/teams', icon: 'user' },
  { label: 'Reports', description: 'Exports', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Locale', description: 'Pack and owner' },
  { label: 'Index', description: 'Glossary and queries' },
  { label: 'Confirm', description: 'Reviewer PIN' },
];

export const scorecardTree = [
  {
    id: 'americas',
    label: 'Americas',
    children: [
      { id: 'en', label: 'en-US · Support', href: '#/scorecard/loc_en_support' },
      { id: 'es', label: 'es-MX · Sales', href: '#/scorecard/loc_es_sales' },
      { id: 'pt', label: 'pt-BR · Engineering', href: '#/scorecard/loc_pt_engineering' },
    ],
  },
  {
    id: 'emea',
    label: 'EMEA',
    children: [
      { id: 'de', label: 'de-DE · Product', href: '#/scorecard/loc_de_product' },
      { id: 'fr', label: 'fr-FR · HR', href: '#/scorecard/loc_fr_hr' },
      { id: 'ar', label: 'ar-SA · Help center', href: '#/scorecard/loc_ar_help' },
    ],
  },
  {
    id: 'apac',
    label: 'APAC',
    children: [
      { id: 'ja', label: 'ja-JP · Policy', href: '#/scorecard/loc_ja_policy' },
      { id: 'ko', label: 'ko-KR · Finance', href: '#/scorecard/loc_ko_finance' },
    ],
  },
];

export const metricRows = [
  { metric: 'Precision@5', actual: '92%', target: '90%', variance: '+2 pts', status: 'On track' },
  { metric: 'Translation coverage', actual: '94%', target: '92%', variance: '+2 pts', status: 'On track' },
  { metric: 'Glossary adherence', actual: '89%', target: '92%', variance: '−3 pts', status: 'Watch' },
  { metric: 'Blocking gaps', actual: '6', target: '0', variance: '+6', status: 'At risk' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/locales/loc_de_product/search-quality
Authorization: Bearer lex_live_****

{
  "id": "loc_de_product",
  "name": "de-DE · Product",
  "precision_at_5": 0.93,
  "owner": "Anika Poluru"
}`;

export function buildSearchCatalog() {
  const scorecardHits = scorecards.map((item) => ({
    label: item.name,
    description: `${item.focus} · ${item.owner}`,
    owner: item.owner,
    type: 'Locale',
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
