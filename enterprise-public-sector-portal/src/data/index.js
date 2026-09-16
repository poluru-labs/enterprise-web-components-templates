export const productName = 'CivicWorks';
export const productLine = 'Admin';
export const workspaceName = 'Harbor City';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@harborcity.gov',
  role: 'City administrator',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 Q3 · week 12',
  timezone: 'America / Chicago',
  close: 'Fiscal year ends 30 Jun 2027',
};

export const tickerItems = [
  { label: 'Open 311', value: '142', delta: '12 past SLA', trend: 'down', href: '#/requests' },
  { label: 'Permits', value: '38', delta: 'In review', trend: 'flat', href: '#/permits' },
  { label: 'Cases', value: '19', delta: '3 hearings', trend: 'flat', href: '#/cases' },
  { label: 'SLA', value: '91%', delta: '+2 pts', trend: 'up', href: '#/service' },
  { label: 'Budget', value: '74%', delta: 'YTD used', trend: 'flat', href: '#/budgets' },
  { label: 'Inspect', value: '12', delta: 'Today', trend: 'up', href: '#/permits' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Requests', href: '#/requests', icon: 'bell' },
  { label: 'Permits', href: '#/permits', icon: 'file' },
  { label: 'Cases', href: '#/cases', icon: 'folder' },
  { label: 'Departments', href: '#/departments', icon: 'user' },
  { label: 'Budgets', href: '#/budgets', icon: 'star' },
  { label: 'Service', href: '#/service', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Open 311', value: '142', hint: '12 past the 5-day SLA', trend: 'down', trendValue: '12 late' },
  { label: 'Median close', value: '4.2d', hint: 'Target 5 days', trend: 'up', trendValue: '−0.4d' },
  { label: 'Permits in review', value: '38', hint: 'Harbor garage is day 11', trend: 'flat', trendValue: 'Hold' },
  { label: 'Active cases', value: '19', hint: '3 hearings this week', trend: 'flat', trendValue: 'Week 12' },
  { label: 'SLA met', value: '91%', hint: 'Public works is the dip', trend: 'up', trendValue: '+2 pts' },
  { label: 'Budget used', value: '74%', hint: '$305M of $412M', trend: 'flat', trendValue: 'On plan' },
  { label: 'Inspections today', value: '12', hint: 'Nikhil Poluru desk', trend: 'up', trendValue: '+3' },
  { label: 'Hearings', value: '5', hint: 'Housing board Thursday', trend: 'flat', trendValue: 'This week' },
];

export const slaTrend = [86, 87, 88, 88, 89, 89, 90, 90, 90, 91, 91, 91];

export const requests = [
  {
    id: 'rq_pothole',
    code: '311-1842',
    title: 'Pothole on Oak Street',
    ward: 'Ward 2',
    department: 'Public works',
    owner: 'Hana Poluru',
    status: 'Open',
    sla: 'Watch',
    opened: '12 Sep 2026',
    due: '17 Sep 2026',
    channel: 'App',
    priority: 'High',
    age: 4,
  },
  {
    id: 'rq_light',
    code: '311-1848',
    title: 'Streetlight out Maple Ave',
    ward: 'Ward 4',
    department: 'Public works',
    owner: 'Hana Poluru',
    status: 'In progress',
    sla: 'On track',
    opened: '10 Sep 2026',
    due: '18 Sep 2026',
    channel: 'Phone',
    priority: 'Medium',
    age: 6,
  },
  {
    id: 'rq_trash',
    code: '311-1851',
    title: 'Missed pickup Ward 3',
    ward: 'Ward 3',
    department: 'Sanitation',
    owner: 'Luca Poluru',
    status: 'Open',
    sla: 'Overdue',
    opened: '9 Sep 2026',
    due: '14 Sep 2026',
    channel: 'Web',
    priority: 'High',
    age: 7,
  },
  {
    id: 'rq_tree',
    code: '311-1828',
    title: 'Fallen limb River Park',
    ward: 'Ward 1',
    department: 'Parks',
    owner: 'Luca Poluru',
    status: 'Complete',
    sla: 'Met',
    opened: '4 Sep 2026',
    due: '9 Sep 2026',
    channel: 'App',
    priority: 'Medium',
    age: 5,
  },
  {
    id: 'rq_graffiti',
    code: '311-1854',
    title: 'Bus shelter 12 graffiti',
    ward: 'Ward 5',
    department: 'Code',
    owner: 'Rohan Poluru',
    status: 'In progress',
    sla: 'On track',
    opened: '11 Sep 2026',
    due: '18 Sep 2026',
    channel: 'Walk-in',
    priority: 'Low',
    age: 5,
  },
  {
    id: 'rq_sidewalk',
    code: '311-1857',
    title: 'Cracked sidewalk 4th St',
    ward: 'Ward 2',
    department: 'Engineering',
    owner: 'Dev Poluru',
    status: 'Pending',
    sla: 'Watch',
    opened: '8 Sep 2026',
    due: '22 Sep 2026',
    channel: 'Web',
    priority: 'Medium',
    age: 8,
  },
  {
    id: 'rq_noise',
    code: '311-1860',
    title: 'After-hours construction',
    ward: 'Ward 6',
    department: 'Code',
    owner: 'Rohan Poluru',
    status: 'Open',
    sla: 'On track',
    opened: '15 Sep 2026',
    due: '20 Sep 2026',
    channel: 'Phone',
    priority: 'High',
    age: 1,
  },
  {
    id: 'rq_water',
    code: '311-1862',
    title: 'Hydrant leak Cedar',
    ward: 'Ward 1',
    department: 'Utilities',
    owner: 'Hana Poluru',
    status: 'In progress',
    sla: 'On track',
    opened: '13 Sep 2026',
    due: '16 Sep 2026',
    channel: 'App',
    priority: 'High',
    age: 3,
  },
  {
    id: 'rq_sign',
    code: '311-1821',
    title: 'Stop sign down 9th',
    ward: 'Ward 4',
    department: 'Traffic',
    owner: 'Elena Poluru',
    status: 'Complete',
    sla: 'Met',
    opened: '2 Sep 2026',
    due: '3 Sep 2026',
    channel: 'Phone',
    priority: 'High',
    age: 1,
  },
  {
    id: 'rq_dump',
    code: '311-1866',
    title: 'Illegal dump alley 9',
    ward: 'Ward 3',
    department: 'Sanitation',
    owner: 'Luca Poluru',
    status: 'Open',
    sla: 'Watch',
    opened: '14 Sep 2026',
    due: '19 Sep 2026',
    channel: 'App',
    priority: 'Medium',
    age: 2,
  },
];

export const requestColumns = [
  { key: 'code', label: 'Request', sortable: true },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
  { key: 'sla', label: 'SLA' },
  { key: 'due', label: 'Due' },
  { key: 'owner', label: 'Owner' },
];

export const permits = [
  { id: 'pm_garage', code: 'BLD-442', type: 'Building', site: 'Harbor garage, 18 Dock St', applicant: 'Kavya Poluru', status: 'In review', sla: 'Watch', filed: '5 Sep 2026', hearing: '22 Sep 2026', fee: 18400, inspector: 'Nikhil Poluru' },
  { id: 'pm_cafe', code: 'ENC-118', type: 'Encroachment', site: 'Sidewalk cafe, 4 Market', applicant: 'Anika Poluru', status: 'Approved', sla: 'Met', filed: '22 Aug 2026', hearing: '—', fee: 620, inspector: 'Nikhil Poluru' },
  { id: 'pm_event', code: 'EVT-77', type: 'Special event', site: 'Riverfest, River Park', applicant: 'Luca Poluru', status: 'Pending', sla: 'On track', filed: '10 Sep 2026', hearing: '24 Sep 2026', fee: 2400, inspector: 'Elena Poluru' },
  { id: 'pm_film', code: 'FLM-12', type: 'Film', site: 'Ward 6 waterfront', applicant: 'Priya Poluru', status: 'In review', sla: 'On track', filed: '12 Sep 2026', hearing: '18 Sep 2026', fee: 1800, inspector: 'Nikhil Poluru' },
  { id: 'pm_demo', code: 'BLD-438', type: 'Demolition', site: 'Old mill, 9 Canal', applicant: 'Arjun Poluru', status: 'Denied', sla: 'Met', filed: '18 Aug 2026', hearing: '8 Sep 2026', fee: 0, inspector: 'Nikhil Poluru' },
  { id: 'pm_row', code: 'ROW-90', type: 'Right of way', site: 'Fiber trench, Oak St', applicant: 'Dev Poluru', status: 'Approved', sla: 'Met', filed: '1 Sep 2026', hearing: '—', fee: 4100, inspector: 'Hana Poluru' },
  { id: 'pm_sign', code: 'SGN-55', type: 'Sign', site: 'Harbor Inn, 2 Pier', applicant: 'Sahana Poluru', status: 'In review', sla: 'On track', filed: '14 Sep 2026', hearing: '28 Sep 2026', fee: 340, inspector: 'Rohan Poluru' },
  { id: 'pm_pool', code: 'BLD-451', type: 'Building', site: 'Community pool, Parks', applicant: 'Luca Poluru', status: 'Issued', sla: 'Met', filed: '12 Jul 2026', hearing: '—', fee: 28600, inspector: 'Nikhil Poluru' },
];

export const permitColumns = [
  { key: 'code', label: 'Permit', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'site', label: 'Site' },
  { key: 'status', label: 'Status' },
  { key: 'sla', label: 'SLA' },
  { key: 'fee', label: 'Fee' },
  { key: 'inspector', label: 'Inspector' },
];

export const cases = [
  { id: 'cs_housing', code: 'CE-204', title: 'Housing vacancy 14 Elm', type: 'Housing', owner: 'Sahana Poluru', status: 'Open', sla: 'Watch', filed: '28 Aug 2026', hearing: '18 Sep 2026', ward: 'Ward 3' },
  { id: 'cs_yard', code: 'CE-211', title: 'Overgrown lot 8 Birch', type: 'Code', owner: 'Rohan Poluru', status: 'In progress', sla: 'On track', filed: '4 Sep 2026', hearing: '—', ward: 'Ward 5' },
  { id: 'cs_license', code: 'LIC-88', title: 'Cafe license renewal', type: 'Licensing', owner: 'Anika Poluru', status: 'Pending', sla: 'On track', filed: '9 Sep 2026', hearing: '24 Sep 2026', ward: 'Ward 1' },
  { id: 'cs_noise', code: 'CE-218', title: 'Repeat noise 6 Dock', type: 'Code', owner: 'Rohan Poluru', status: 'Hearing', sla: 'Watch', filed: '1 Sep 2026', hearing: '16 Sep 2026', ward: 'Ward 6' },
  { id: 'cs_short', code: 'CE-190', title: 'Short-term rental 22 Pine', type: 'Housing', owner: 'Sahana Poluru', status: 'Closed', sla: 'Met', filed: '12 Jul 2026', hearing: '4 Aug 2026', ward: 'Ward 2' },
  { id: 'cs_dump', code: 'CE-220', title: 'Illegal dump alley 9', type: 'Sanitation', owner: 'Luca Poluru', status: 'Open', sla: 'Overdue', filed: '8 Sep 2026', hearing: '22 Sep 2026', ward: 'Ward 3' },
];

export const caseColumns = [
  { key: 'code', label: 'Case', sortable: true },
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'sla', label: 'SLA' },
  { key: 'hearing', label: 'Hearing' },
  { key: 'owner', label: 'Owner' },
];

export const departments = [
  { id: 'dp_works', name: 'Public works', lead: 'Hana Poluru', staff: 86, open: 64, sla: 84, budget: 92000000, used: 71, focus: 'Streets and lights' },
  { id: 'dp_311', name: '311 desk', lead: 'Elena Poluru', staff: 24, open: 142, sla: 91, budget: 4800000, used: 68, focus: 'Intake and routing' },
  { id: 'dp_permits', name: 'Permits', lead: 'Kavya Poluru', staff: 18, open: 38, sla: 88, budget: 6200000, used: 72, focus: 'Review clock' },
  { id: 'dp_code', name: 'Code', lead: 'Rohan Poluru', staff: 22, open: 19, sla: 79, budget: 5100000, used: 70, focus: 'Hearings' },
  { id: 'dp_parks', name: 'Parks', lead: 'Luca Poluru', staff: 41, open: 11, sla: 96, budget: 18400000, used: 77, focus: 'Riverfest' },
  { id: 'dp_housing', name: 'Housing', lead: 'Sahana Poluru', staff: 16, open: 7, sla: 82, budget: 24600000, used: 69, focus: 'Vacancy board' },
  { id: 'dp_finance', name: 'Finance', lead: 'Arjun Poluru', staff: 19, open: 0, sla: 100, budget: 3900000, used: 61, focus: 'Q3 close' },
  { id: 'dp_clerk', name: 'Clerk', lead: 'Anika Poluru', staff: 11, open: 4, sla: 94, budget: 2100000, used: 66, focus: 'Licenses' },
];

export const departmentColumns = [
  { key: 'name', label: 'Department', sortable: true },
  { key: 'lead', label: 'Lead' },
  { key: 'open', label: 'Open' },
  { key: 'sla', label: 'SLA' },
  { key: 'used', label: 'Budget %' },
  { key: 'staff', label: 'Staff' },
];

export const budgets = [
  { id: 'bd_works', fund: 'Streets fund', department: 'Public works', appropriated: 92000000, spent: 65320000, remaining: 26680000, used: 71, status: 'On track' },
  { id: 'bd_water', fund: 'Water utility', department: 'Utilities', appropriated: 54000000, spent: 42120000, remaining: 11880000, used: 78, status: 'Watch' },
  { id: 'bd_parks', fund: 'Parks levy', department: 'Parks', appropriated: 18400000, spent: 14168000, remaining: 4232000, used: 77, status: 'On track' },
  { id: 'bd_housing', fund: 'Housing trust', department: 'Housing', appropriated: 24600000, spent: 16974000, remaining: 7626000, used: 69, status: 'On track' },
  { id: 'bd_general', fund: 'General fund', department: 'Finance', appropriated: 186000000, spent: 137640000, remaining: 48360000, used: 74, status: 'On track' },
  { id: 'bd_grants', fund: 'State grants', department: 'Clerk', appropriated: 12800000, spent: 7040000, remaining: 5760000, used: 55, status: 'On track' },
];

export const budgetColumns = [
  { key: 'fund', label: 'Fund', sortable: true },
  { key: 'department', label: 'Department' },
  { key: 'appropriated', label: 'Appropriated' },
  { key: 'spent', label: 'Spent' },
  { key: 'remaining', label: 'Remaining' },
  { key: 'status', label: 'Status' },
];

export const serviceDrivers = [
  { metric: '311 first response', actual: '6.4h', target: '8h', variance: '−1.6h', status: 'On track' },
  { metric: '311 close in 5 days', actual: '91%', target: '90%', variance: '+1 pt', status: 'On track' },
  { metric: 'Permit review clock', actual: '11d', target: '10d', variance: '+1d', status: 'Watch' },
  { metric: 'Inspection same week', actual: '84%', target: '85%', variance: '−1 pt', status: 'Watch' },
];

export const driverColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'City administrator', squad: 'Office of the CA', rating: 5, score: 94, book: 8 },
  { name: 'Elena Poluru', role: '311 lead', squad: '311 desk', rating: 5, score: 91, book: 142 },
  { name: 'Hana Poluru', role: 'Public works director', squad: 'Public works', rating: 4, score: 84, book: 64 },
  { name: 'Kavya Poluru', role: 'Permits director', squad: 'Permits', rating: 5, score: 88, book: 38 },
  { name: 'Rohan Poluru', role: 'Code manager', squad: 'Code', rating: 4, score: 79, book: 19 },
  { name: 'Nikhil Poluru', role: 'Chief inspector', squad: 'Inspections', rating: 5, score: 90, book: 12 },
  { name: 'Arjun Poluru', role: 'Budget officer', squad: 'Finance', rating: 5, score: 92, book: 6 },
  { name: 'Sahana Poluru', role: 'Housing lead', squad: 'Housing', rating: 4, score: 82, book: 7 },
  { name: 'Luca Poluru', role: 'Parks superintendent', squad: 'Parks', rating: 4, score: 86, book: 11 },
  { name: 'Anika Poluru', role: 'City clerk', squad: 'Clerk', rating: 4, score: 89, book: 4 },
  { name: 'Dev Poluru', role: 'City engineer', squad: 'Engineering', rating: 4, score: 81, book: 8 },
  { name: 'Priya Poluru', role: 'Grants officer', squad: 'Finance', rating: 4, score: 85, book: 3 },
];

export const cadence = [
  { label: 'Housing vacancy hearing', description: 'Sahana Poluru · 14 Elm', timestamp: '18 Sep', icon: 'folder', status: 'Next' },
  { label: 'Missed pickup SLA', description: 'Luca Poluru · Ward 3', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Today' },
  { label: 'Harbor garage review', description: 'Kavya Poluru · day 11', timestamp: '16 Sep', icon: 'clock', status: 'Today' },
  { label: 'Repeat noise board', description: 'Rohan Poluru · 6 Dock', timestamp: '16 Sep', icon: 'eye', status: 'Today' },
  { label: 'Riverfest permit', description: 'Luca Poluru · River Park', timestamp: '24 Sep', icon: 'check', status: 'Scheduled' },
  { label: 'Q3 budget readout', description: 'Arjun Poluru · 74% used', timestamp: '22 Sep', icon: 'star', status: 'Scheduled' },
];

export const activity = [
  { label: 'Stop sign replaced', description: 'Elena Poluru · 9th St', timestamp: '3 Sep', icon: 'check', status: 'Done' },
  { label: 'River Park limb cleared', description: 'Luca Poluru · Parks', timestamp: '9 Sep', icon: 'check', status: 'Done' },
  { label: 'Harbor garage day 11', description: 'Kavya Poluru · BLD-442', timestamp: '16 Sep', icon: 'clock', status: 'Watch' },
  { label: 'Ward 3 missed pickup', description: 'Luca Poluru · 311-1851', timestamp: '14 Sep', icon: 'alert-triangle', status: 'Watch' },
  { label: 'Hydrant leak Cedar', description: 'Hana Poluru · crew out', timestamp: '13 Sep', icon: 'file', status: 'Done' },
  { label: 'Noise case to board', description: 'Rohan Poluru · CE-218', timestamp: '16 Sep', icon: 'folder', status: 'Watch' },
];

export const reports = [
  { name: '311 SLA pack', owner: 'Elena Poluru', updated: '15 Sep 2026', format: 'PDF' },
  { name: 'Permit clock', owner: 'Kavya Poluru', updated: '16 Sep 2026', format: 'XLSX' },
  { name: 'Case docket', owner: 'Rohan Poluru', updated: '14 Sep 2026', format: 'CSV' },
  { name: 'Budget YTD', owner: 'Arjun Poluru', updated: '12 Sep 2026', format: 'XLSX' },
  { name: 'Inspection log', owner: 'Nikhil Poluru', updated: '16 Sep 2026', format: 'CSV' },
  { name: 'Council appendix', owner: 'Mira Poluru', updated: '11 Sep 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Ward 3 pickup is past SLA', description: 'Luca Poluru · 311-1851', icon: 'alert-triangle' },
  { label: 'Harbor garage day 11', description: 'Kavya Poluru · BLD-442', icon: 'clock' },
  { label: 'Noise hearing today', description: 'Rohan Poluru · 6 Dock', icon: 'folder' },
  { label: '12 inspections on the board', description: 'Nikhil Poluru · today', icon: 'check' },
];

export const commandItems = [
  { label: 'Overview', description: 'City pulse', href: '#/overview', icon: 'home' },
  { label: 'Oak Street pothole', description: '311-1842 · Ward 2', href: '#/request/rq_pothole', icon: 'bell' },
  { label: 'Harbor garage', description: 'BLD-442 · in review', href: '#/permits', icon: 'file' },
  { label: 'Housing vacancy', description: 'CE-204 · 14 Elm', href: '#/cases', icon: 'folder' },
  { label: 'Budgets', description: '74% YTD', href: '#/budgets', icon: 'star' },
  { label: 'Service', description: 'SLA 91%', href: '#/service', icon: 'check' },
  { label: 'Departments', description: 'Leads', href: '#/departments', icon: 'user' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Request', description: 'Ward and channel' },
  { label: 'Route', description: 'Department and SLA' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const orgTree = [
  {
    id: 'field',
    label: 'Field',
    children: [
      { id: 'works', label: 'Public works', href: '#/departments' },
      { id: 'parks', label: 'Parks', href: '#/departments' },
      { id: 'sanitation', label: 'Sanitation', href: '#/requests' },
    ],
  },
  {
    id: 'desk',
    label: 'Desk',
    children: [
      { id: 'three11', label: '311', href: '#/requests' },
      { id: 'permits', label: 'Permits', href: '#/permits' },
      { id: 'code', label: 'Code', href: '#/cases' },
    ],
  },
  {
    id: 'house',
    label: 'House',
    children: [
      { id: 'finance', label: 'Finance', href: '#/budgets' },
      { id: 'clerk', label: 'Clerk', href: '#/departments' },
      { id: 'housing', label: 'Housing', href: '#/cases' },
    ],
  },
];

export const policies = [
  { id: 'po_sla', name: '5-day 311 close', trigger: 'Open past 5 days', owner: 'Elena Poluru', items: 12, status: 'Active', steps: 4 },
  { id: 'po_permit', name: '10-day permit clock', trigger: 'Review over 10 days', owner: 'Kavya Poluru', items: 1, status: 'Active', steps: 3 },
  { id: 'po_hearing', name: 'Hearing notice', trigger: 'Case set for board', owner: 'Rohan Poluru', items: 3, status: 'Active', steps: 3 },
  { id: 'po_inspect', name: 'Same-week inspect', trigger: 'Permit issued', owner: 'Nikhil Poluru', items: 12, status: 'Active', steps: 2 },
  { id: 'po_budget', name: '80% fund watch', trigger: 'Spend over 80%', owner: 'Arjun Poluru', items: 0, status: 'Draft', steps: 2 },
  { id: 'po_dump', name: 'Illegal dump 48h', trigger: 'Sanitation open 2 days', owner: 'Luca Poluru', items: 1, status: 'Active', steps: 3 },
];

export const apiSnippet = `GET /v1/requests/rq_pothole
Authorization: Bearer civic_live_****

{
  "id": "rq_pothole",
  "code": "311-1842",
  "title": "Pothole on Oak Street",
  "owner": "Hana Poluru",
  "sla": "Watch"
}`;

export function buildSearchCatalog() {
  const requestHits = requests.map((item) => ({
    label: item.title,
    description: `${item.code} · ${item.status}`,
    owner: item.owner,
    type: 'Request',
    href: `#/request/${item.id}`,
  }));
  const permitHits = permits.map((item) => ({
    label: `${item.type} · ${item.code}`,
    description: `${item.site} · ${item.status}`,
    owner: item.applicant,
    type: 'Permit',
    href: '#/permits',
  }));
  const caseHits = cases.map((item) => ({
    label: item.title,
    description: `${item.code} · ${item.status}`,
    owner: item.owner,
    type: 'Case',
    href: '#/cases',
  }));
  const deptHits = departments.map((item) => ({
    label: item.name,
    description: `${item.lead} · SLA ${item.sla}%`,
    owner: item.lead,
    type: 'Department',
    href: '#/departments',
  }));
  const budgetHits = budgets.map((item) => ({
    label: item.fund,
    description: `${item.department} · ${item.used}% used`,
    owner: 'Arjun Poluru',
    type: 'Budget',
    href: '#/budgets',
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
    href: '#/departments',
  }));
  return [
    ...requestHits,
    ...permitHits,
    ...caseHits,
    ...deptHits,
    ...budgetHits,
    ...reportHits,
    ...peopleHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
