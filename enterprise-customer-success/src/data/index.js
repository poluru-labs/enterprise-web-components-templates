export const productName = 'Pulse';
export const productLine = 'Success';
export const workspaceName = 'Aetherline';

export const currentUser = {
  name: 'Priya Poluru',
  email: 'priya.poluru@aetherline.example',
  role: 'VP customer success',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 Q3 · week 9',
  timezone: 'America / Chicago',
  close: 'Quarter ends 30 Sep 2026',
};

export const tickerItems = [
  { label: 'NRR', value: '118%', delta: '+4 pts', trend: 'up', href: '#/health' },
  { label: 'GRR', value: '96%', delta: '+1 pt', trend: 'up', href: '#/renewals' },
  { label: 'Health', value: '84', delta: 'Hold', trend: 'flat', href: '#/health' },
  { label: 'At risk', value: '1', delta: 'Lattice', trend: 'down', href: '#/health' },
  { label: 'Renewals', value: '$3.7M', delta: '62 days', trend: 'flat', href: '#/renewals' },
  { label: 'Expansion', value: '$1.0M', delta: '+$240k', trend: 'up', href: '#/expansion' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Accounts', href: '#/accounts', icon: 'folder' },
  { label: 'Health', href: '#/health', icon: 'star' },
  { label: 'Renewals', href: '#/renewals', icon: 'clock' },
  { label: 'Onboarding', href: '#/onboarding', icon: 'check' },
  { label: 'Expansion', href: '#/expansion', icon: 'plus' },
  { label: 'Playbooks', href: '#/playbooks', icon: 'file' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Net revenue retain', value: '118%', hint: 'Expansion beating churn', trend: 'up', trendValue: '+4 pts' },
  { label: 'Gross retain', value: '96%', hint: 'Two logos saved this quarter', trend: 'up', trendValue: '+1 pt' },
  { label: 'Portfolio health', value: '84', hint: 'Ten accounts in the book', trend: 'flat', trendValue: 'Hold' },
  { label: 'At-risk ARR', value: '$510k', hint: 'Lattice Energy', trend: 'down', trendValue: '−$80k' },
  { label: 'Renewals 90 days', value: '$3.7M', hint: '7 logos in the window', trend: 'flat', trendValue: 'On plan' },
  { label: 'Onboarding', value: '4', hint: 'Northline blocked on SSO', trend: 'flat', trendValue: 'Week 9' },
  { label: 'Expansion pipeline', value: '$1.0M', hint: 'Seat and module attach', trend: 'up', trendValue: '+$240k' },
  { label: 'NPS', value: '62', hint: 'Promoters 71%', trend: 'up', trendValue: '+5' },
];

export const nrrTrend = [104, 106, 107, 109, 111, 112, 113, 114, 115, 116, 117, 118];

export const accounts = [
  {
    id: 'ac_harbor',
    name: 'Harbor & Co.',
    segment: 'Enterprise',
    csm: 'Kavya Poluru',
    health: 92,
    status: 'Healthy',
    arr: 840000,
    nrr: 124,
    renews: '15 Oct 2026',
    stage: 'Adopt',
    region: 'Americas',
    seats: 420,
    plan: 'Enterprise',
    nps: 72,
    lastQbr: '12 Aug 2026',
    nextQbr: '18 Nov 2026',
    product: 94,
    support: 90,
    adoption: 91,
    relationship: 93,
  },
  {
    id: 'ac_lumen',
    name: 'Lumen Forge',
    segment: 'Enterprise',
    csm: 'Kavya Poluru',
    health: 88,
    status: 'Healthy',
    arr: 620000,
    nrr: 131,
    renews: '2 Nov 2026',
    stage: 'Expand',
    region: 'EMEA',
    seats: 280,
    plan: 'Enterprise',
    nps: 68,
    lastQbr: '4 Aug 2026',
    nextQbr: '4 Nov 2026',
    product: 90,
    support: 86,
    adoption: 84,
    relationship: 92,
  },
  {
    id: 'ac_fold',
    name: 'Fold Paper',
    segment: 'Mid-market',
    csm: 'Arjun Poluru',
    health: 71,
    status: 'Watch',
    arr: 280000,
    nrr: 97,
    renews: '22 Sep 2026',
    stage: 'Renew',
    region: 'Americas',
    seats: 96,
    plan: 'Growth',
    nps: 41,
    lastQbr: '19 Jul 2026',
    nextQbr: '21 Oct 2026',
    product: 74,
    support: 62,
    adoption: 68,
    relationship: 80,
  },
  {
    id: 'ac_lattice',
    name: 'Lattice Energy',
    segment: 'Enterprise',
    csm: 'Hana Poluru',
    health: 58,
    status: 'At risk',
    arr: 510000,
    nrr: 88,
    renews: '30 Sep 2026',
    stage: 'Renew',
    region: 'Americas',
    seats: 210,
    plan: 'Enterprise',
    nps: 28,
    lastQbr: '8 Jun 2026',
    nextQbr: '22 Sep 2026',
    product: 61,
    support: 48,
    adoption: 52,
    relationship: 71,
  },
  {
    id: 'ac_field',
    name: 'Fieldwork Studio',
    segment: 'SMB',
    csm: 'Luca Poluru',
    health: 86,
    status: 'Healthy',
    arr: 190000,
    nrr: 112,
    renews: '12 Jan 2027',
    stage: 'Adopt',
    region: 'Americas',
    seats: 42,
    plan: 'Growth',
    nps: 64,
    lastQbr: '2 Sep 2026',
    nextQbr: '2 Dec 2026',
    product: 88,
    support: 84,
    adoption: 82,
    relationship: 90,
  },
  {
    id: 'ac_alder',
    name: 'Alder Health',
    segment: 'Enterprise',
    csm: 'Hana Poluru',
    health: 81,
    status: 'Onboarding',
    arr: 430000,
    nrr: 100,
    renews: '18 Mar 2027',
    stage: 'Onboard',
    region: 'Americas',
    seats: 160,
    plan: 'Enterprise',
    nps: 0,
    lastQbr: '—',
    nextQbr: '18 Dec 2026',
    product: 78,
    support: 85,
    adoption: 64,
    relationship: 88,
  },
  {
    id: 'ac_pine',
    name: 'Pine & Copper',
    segment: 'SMB',
    csm: 'Luca Poluru',
    health: 64,
    status: 'Watch',
    arr: 150000,
    nrr: 91,
    renews: '8 Oct 2026',
    stage: 'Renew',
    region: 'APAC',
    seats: 28,
    plan: 'Starter',
    nps: 36,
    lastQbr: '11 May 2026',
    nextQbr: '8 Oct 2026',
    product: 70,
    support: 58,
    adoption: 60,
    relationship: 68,
  },
  {
    id: 'ac_river',
    name: 'Rivermark Labs',
    segment: 'Mid-market',
    csm: 'Arjun Poluru',
    health: 90,
    status: 'Healthy',
    arr: 360000,
    nrr: 119,
    renews: '4 Dec 2026',
    stage: 'Expand',
    region: 'EMEA',
    seats: 120,
    plan: 'Growth',
    nps: 70,
    lastQbr: '20 Aug 2026',
    nextQbr: '20 Nov 2026',
    product: 91,
    support: 88,
    adoption: 89,
    relationship: 92,
  },
  {
    id: 'ac_north',
    name: 'Northline Freight',
    segment: 'Enterprise',
    csm: 'Kavya Poluru',
    health: 83,
    status: 'Onboarding',
    arr: 720000,
    nrr: 100,
    renews: '1 Apr 2027',
    stage: 'Onboard',
    region: 'Americas',
    seats: 310,
    plan: 'Enterprise',
    nps: 0,
    lastQbr: '—',
    nextQbr: '15 Jan 2027',
    product: 80,
    support: 86,
    adoption: 58,
    relationship: 90,
  },
  {
    id: 'ac_bright',
    name: 'Brightwell Bank',
    segment: 'Enterprise',
    csm: 'Hana Poluru',
    health: 95,
    status: 'Healthy',
    arr: 980000,
    nrr: 128,
    renews: '19 Nov 2026',
    stage: 'Expand',
    region: 'EMEA',
    seats: 540,
    plan: 'Enterprise',
    nps: 78,
    lastQbr: '1 Sep 2026',
    nextQbr: '1 Dec 2026',
    product: 96,
    support: 94,
    adoption: 93,
    relationship: 97,
  },
];

export const accountColumns = [
  { key: 'name', label: 'Account', sortable: true },
  { key: 'csm', label: 'CSM', sortable: true },
  { key: 'segment', label: 'Segment' },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Health' },
  { key: 'arr', label: 'ARR' },
  { key: 'renews', label: 'Renews' },
];

export const renewals = [
  { id: 'rn_fold', accountId: 'ac_fold', account: 'Fold Paper', arr: 280000, close: '22 Sep 2026', stage: 'Commit', owner: 'Rohan Poluru', risk: 'Watch', probability: 70 },
  { id: 'rn_lattice', accountId: 'ac_lattice', account: 'Lattice Energy', arr: 510000, close: '30 Sep 2026', stage: 'Negotiate', owner: 'Rohan Poluru', risk: 'At risk', probability: 45 },
  { id: 'rn_pine', accountId: 'ac_pine', account: 'Pine & Copper', arr: 150000, close: '8 Oct 2026', stage: 'Propose', owner: 'Rohan Poluru', risk: 'Watch', probability: 55 },
  { id: 'rn_harbor', accountId: 'ac_harbor', account: 'Harbor & Co.', arr: 840000, close: '15 Oct 2026', stage: 'Commit', owner: 'Rohan Poluru', risk: 'Healthy', probability: 92 },
  { id: 'rn_lumen', accountId: 'ac_lumen', account: 'Lumen Forge', arr: 620000, close: '2 Nov 2026', stage: 'Forecast', owner: 'Rohan Poluru', risk: 'Healthy', probability: 88 },
  { id: 'rn_bright', accountId: 'ac_bright', account: 'Brightwell Bank', arr: 980000, close: '19 Nov 2026', stage: 'Forecast', owner: 'Rohan Poluru', risk: 'Healthy', probability: 90 },
  { id: 'rn_river', accountId: 'ac_river', account: 'Rivermark Labs', arr: 360000, close: '4 Dec 2026', stage: 'Qualify', owner: 'Rohan Poluru', risk: 'Healthy', probability: 80 },
];

export const renewalColumns = [
  { key: 'account', label: 'Account', sortable: true },
  { key: 'arr', label: 'ARR' },
  { key: 'close', label: 'Close' },
  { key: 'stage', label: 'Stage' },
  { key: 'owner', label: 'Owner' },
  { key: 'risk', label: 'Risk' },
  { key: 'probability', label: 'Win %' },
];

export const onboarding = [
  {
    id: 'ob_alder',
    accountId: 'ac_alder',
    account: 'Alder Health',
    csm: 'Elena Poluru',
    started: '18 Aug 2026',
    target: '18 Oct 2026',
    progress: 62,
    milestone: 'Training',
    status: 'On track',
    steps: ['Kickoff', 'Integrations', 'Training', 'Go-live', 'First value'],
    current: 2,
  },
  {
    id: 'ob_north',
    accountId: 'ac_north',
    account: 'Northline Freight',
    csm: 'Elena Poluru',
    started: '1 Aug 2026',
    target: '1 Oct 2026',
    progress: 48,
    milestone: 'Integrations',
    status: 'Watch',
    steps: ['Kickoff', 'Integrations', 'Training', 'Go-live', 'First value'],
    current: 1,
  },
  {
    id: 'ob_field',
    accountId: 'ac_field',
    account: 'Fieldwork Studio',
    csm: 'Elena Poluru',
    started: '4 Jul 2026',
    target: '4 Sep 2026',
    progress: 100,
    milestone: 'First value',
    status: 'Complete',
    steps: ['Kickoff', 'Integrations', 'Training', 'Go-live', 'First value'],
    current: 4,
  },
  {
    id: 'ob_river',
    accountId: 'ac_river',
    account: 'Rivermark Labs',
    csm: 'Elena Poluru',
    started: '12 Jun 2026',
    target: '12 Aug 2026',
    progress: 100,
    milestone: 'First value',
    status: 'Complete',
    steps: ['Kickoff', 'Integrations', 'Training', 'Go-live', 'First value'],
    current: 4,
  },
];

export const expansion = [
  { id: 'ex_lumen', accountId: 'ac_lumen', account: 'Lumen Forge', type: 'Module', amount: 180000, owner: 'Nikhil Poluru', stage: 'Propose', close: '20 Oct 2026', note: 'Analytics add-on for EMEA plants.' },
  { id: 'ex_bright', accountId: 'ac_bright', account: 'Brightwell Bank', type: 'Seats', amount: 240000, owner: 'Nikhil Poluru', stage: 'Commit', close: '12 Oct 2026', note: '120 extra seats after the retail merge.' },
  { id: 'ex_harbor', accountId: 'ac_harbor', account: 'Harbor & Co.', type: 'Region', amount: 160000, owner: 'Nikhil Poluru', stage: 'Qualify', close: '8 Nov 2026', note: 'APAC workspace for the Singapore desk.' },
  { id: 'ex_river', accountId: 'ac_river', account: 'Rivermark Labs', type: 'Module', amount: 90000, owner: 'Nikhil Poluru', stage: 'Propose', close: '30 Oct 2026', note: 'SSO plus audit pack.' },
  { id: 'ex_north', accountId: 'ac_north', account: 'Northline Freight', type: 'Seats', amount: 110000, owner: 'Nikhil Poluru', stage: 'Discover', close: '15 Dec 2026', note: 'Yard ops team after go-live.' },
  { id: 'ex_alder', accountId: 'ac_alder', account: 'Alder Health', type: 'Multi-year', amount: 220000, owner: 'Nikhil Poluru', stage: 'Qualify', close: '18 Mar 2027', note: 'Three-year after first value.' },
];

export const expansionColumns = [
  { key: 'account', label: 'Account', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'amount', label: 'Amount' },
  { key: 'owner', label: 'Owner' },
  { key: 'stage', label: 'Stage' },
  { key: 'close', label: 'Close' },
];

export const playbooks = [
  { id: 'pb_risk', name: 'Health recovery', trigger: 'Health below 65', owner: 'Mira Poluru', accounts: 1, status: 'Active', steps: 5 },
  { id: 'pb_renew', name: '90-day renewal', trigger: 'Renews in 90 days', owner: 'Rohan Poluru', accounts: 7, status: 'Active', steps: 6 },
  { id: 'pb_onboard', name: 'First 60 days', trigger: 'New logo closed', owner: 'Elena Poluru', accounts: 2, status: 'Active', steps: 5 },
  { id: 'pb_expand', name: 'Seat attach', trigger: 'Utilization above 85%', owner: 'Nikhil Poluru', accounts: 3, status: 'Draft', steps: 4 },
  { id: 'pb_qbr', name: 'Enterprise QBR', trigger: 'Quarter start', owner: 'Sahana Poluru', accounts: 6, status: 'Active', steps: 4 },
  { id: 'pb_nps', name: 'Detractor save', trigger: 'NPS below 30', owner: 'Priya Poluru', accounts: 1, status: 'Active', steps: 3 },
];

export const people = [
  { name: 'Priya Poluru', role: 'VP customer success', squad: 'Office of CS', rating: 5, score: 94, book: 10 },
  { name: 'Kavya Poluru', role: 'Enterprise CSM', squad: 'Enterprise', rating: 5, score: 88, book: 3 },
  { name: 'Arjun Poluru', role: 'Mid-market CSM', squad: 'Mid-market', rating: 4, score: 80, book: 2 },
  { name: 'Elena Poluru', role: 'Onboarding lead', squad: 'Onboarding', rating: 5, score: 86, book: 4 },
  { name: 'Rohan Poluru', role: 'Renewal manager', squad: 'Renewals', rating: 4, score: 82, book: 7 },
  { name: 'Nikhil Poluru', role: 'Expansion AE', squad: 'Expansion', rating: 4, score: 78, book: 6 },
  { name: 'Hana Poluru', role: 'Technical CSM', squad: 'Enterprise', rating: 5, score: 84, book: 3 },
  { name: 'Luca Poluru', role: 'SMB CSM', squad: 'SMB', rating: 4, score: 75, book: 2 },
  { name: 'Sahana Poluru', role: 'QBR coordinator', squad: 'CS Ops', rating: 4, score: 81, book: 6 },
  { name: 'Mira Poluru', role: 'CS operations', squad: 'CS Ops', rating: 5, score: 90, book: 10 },
  { name: 'Dev Poluru', role: 'Support liaison', squad: 'Support', rating: 4, score: 77, book: 10 },
  { name: 'Anika Poluru', role: 'Customer marketing', squad: 'Voice', rating: 4, score: 79, book: 10 },
];

export const qbrs = [
  { label: 'Fold Paper save plan', description: 'Arjun Poluru · support backlog', timestamp: '18 Sep', icon: 'alert-triangle', status: 'Today' },
  { label: 'Lattice Energy QBR', description: 'Hana Poluru · health 58', timestamp: '22 Sep', icon: 'star', status: 'Next' },
  { label: 'Harbor & Co. exec', description: 'Kavya Poluru · NRR 124%', timestamp: '15 Oct', icon: 'user', status: 'Scheduled' },
  { label: 'Lumen Forge expansion', description: 'Nikhil Poluru · module attach', timestamp: '20 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Alder Health first value', description: 'Elena Poluru · training week', timestamp: '18 Oct', icon: 'clock', status: 'Scheduled' },
  { label: 'Brightwell Bank QBR', description: 'Hana Poluru · seats +120', timestamp: '1 Dec', icon: 'folder', status: 'Scheduled' },
];

export const activity = [
  { label: 'Harbor QBR locked', description: 'Kavya Poluru · 12 Aug', timestamp: '12 Aug', icon: 'check', status: 'Done' },
  { label: 'Lattice support spike', description: 'Dev Poluru · 14 tickets', timestamp: '27 Aug', icon: 'alert-triangle', status: 'Watch' },
  { label: 'Northline SSO blocked', description: 'Elena Poluru · IdP wait', timestamp: '2 Sep', icon: 'clock', status: 'Watch' },
  { label: 'Brightwell seats signed', description: 'Nikhil Poluru · +120', timestamp: '4 Sep', icon: 'check', status: 'Done' },
  { label: 'Fold NPS dip', description: 'Arjun Poluru · 41', timestamp: '8 Sep', icon: 'eye', status: 'Watch' },
  { label: 'Alder training scheduled', description: 'Elena Poluru · 22 Sep', timestamp: '11 Sep', icon: 'calendar', status: 'Done' },
];

export const reports = [
  { name: 'Portfolio health pack', owner: 'Mira Poluru', updated: '14 Sep 2026', format: 'PDF' },
  { name: 'Renewal forecast', owner: 'Rohan Poluru', updated: '15 Sep 2026', format: 'XLSX' },
  { name: 'Onboarding SLA', owner: 'Elena Poluru', updated: '12 Sep 2026', format: 'CSV' },
  { name: 'Expansion pipeline', owner: 'Nikhil Poluru', updated: '13 Sep 2026', format: 'XLSX' },
  { name: 'QBR appendix', owner: 'Sahana Poluru', updated: '11 Sep 2026', format: 'PDF' },
  { name: 'NPS roll-up', owner: 'Anika Poluru', updated: '9 Sep 2026', format: 'CSV' },
];

export const inboxItems = [
  { label: 'Lattice Energy is red', description: 'Hana Poluru · health 58', icon: 'alert-triangle' },
  { label: 'Fold Paper renews in 6 days', description: 'Rohan Poluru · $280k', icon: 'clock' },
  { label: 'Northline SSO still blocked', description: 'Elena Poluru · onboarding', icon: 'file' },
  { label: 'Brightwell seats committed', description: 'Nikhil Poluru · +$240k', icon: 'check' },
];

export const commandItems = [
  { label: 'Overview', description: 'Portfolio pulse', href: '#/overview', icon: 'home' },
  { label: 'Harbor & Co.', description: 'Kavya Poluru', href: '#/account/ac_harbor', icon: 'folder' },
  { label: 'Lattice Energy', description: 'At risk', href: '#/account/ac_lattice', icon: 'alert-triangle' },
  { label: 'Health', description: 'Scores and mix', href: '#/health', icon: 'star' },
  { label: 'Renewals', description: '90-day book', href: '#/renewals', icon: 'clock' },
  { label: 'Onboarding', description: 'Milestones', href: '#/onboarding', icon: 'check' },
  { label: 'Expansion', description: 'Pipeline', href: '#/expansion', icon: 'plus' },
  { label: 'Playbooks', description: 'Runs', href: '#/playbooks', icon: 'file' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Account', description: 'Name and CSM' },
  { label: 'Plan', description: 'Segment and ARR' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const healthTree = [
  {
    id: 'book',
    label: 'Book',
    children: [
      { id: 'enterprise', label: 'Enterprise', href: '#/accounts' },
      { id: 'mid', label: 'Mid-market', href: '#/accounts' },
      { id: 'smb', label: 'SMB', href: '#/accounts' },
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    children: [
      { id: 'onboard', label: 'Onboarding', href: '#/onboarding' },
      { id: 'renew', label: 'Renewals', href: '#/renewals' },
      { id: 'expand', label: 'Expansion', href: '#/expansion' },
    ],
  },
];

export const healthDrivers = [
  { metric: 'Product usage', actual: '82', target: '80', variance: '+2', status: 'On track' },
  { metric: 'Support CSAT', actual: '4.5', target: '4.6', variance: '−0.1', status: 'Watch' },
  { metric: 'Adoption', actual: '74%', target: '78%', variance: '−4 pts', status: 'Watch' },
  { metric: 'Relationship', actual: '86', target: '80', variance: '+6', status: 'On track' },
];

export const driverColumns = [
  { key: 'metric', label: 'Driver', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/accounts/ac_harbor
Authorization: Bearer pulse_live_****

{
  "id": "ac_harbor",
  "name": "Harbor & Co.",
  "health": 92,
  "csm": "Kavya Poluru"
}`;

export function buildSearchCatalog() {
  const accountHits = accounts.map((item) => ({
    label: item.name,
    description: `${item.segment} · ${item.csm}`,
    owner: item.csm,
    type: 'Account',
    href: `#/account/${item.id}`,
  }));
  const renewalHits = renewals.map((item) => ({
    label: `${item.account} renewal`,
    description: `${item.stage} · ${item.close}`,
    owner: item.owner,
    type: 'Renewal',
    href: '#/renewals',
  }));
  const onboardHits = onboarding.map((item) => ({
    label: `${item.account} onboarding`,
    description: `${item.milestone} · ${item.status}`,
    owner: item.csm,
    type: 'Onboarding',
    href: '#/onboarding',
  }));
  const expandHits = expansion.map((item) => ({
    label: `${item.account} ${item.type.toLowerCase()}`,
    description: `${item.stage} · ${item.owner}`,
    owner: item.owner,
    type: 'Expansion',
    href: '#/expansion',
  }));
  const playHits = playbooks.map((item) => ({
    label: item.name,
    description: `${item.trigger} · ${item.owner}`,
    owner: item.owner,
    type: 'Playbook',
    href: '#/playbooks',
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
    href: '#/health',
  }));
  return [
    ...accountHits,
    ...renewalHits,
    ...onboardHits,
    ...expandHits,
    ...playHits,
    ...reportHits,
    ...peopleHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
