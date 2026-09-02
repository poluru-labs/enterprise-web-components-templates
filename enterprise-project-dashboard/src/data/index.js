export const productName = 'Vespera';
export const productLine = 'Projects';
export const workspaceName = 'Fieldline Studio';

export const currentUser = {
  name: 'Ananya Poluru',
  email: 'ananya.poluru@fieldline.example',
  role: 'Delivery lead',
};

export const workspace = {
  name: workspaceName,
  region: 'Americas · EMEA',
  sprint: 'Sprint 34 · 25 Aug – 5 Sep',
  timezone: 'America / Chicago',
};

export const activeSprint = {
  name: 'Sprint 34',
  range: '25 Aug – 5 Sep 2026',
  daysLeft: 4,
  daysTotal: 10,
  focus: 'Checkout tokenize',
  planned: 28,
  done: 22,
  burndownTicks: [1, 0.94, 0.88, 0.82, 0.76, 0.7, 0.64, 0.58, 0.52, 0.46],
};

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Projects', href: '#/projects', icon: 'folder' },
  { label: 'Board', href: '#/board', icon: 'star' },
  { label: 'Timeline', href: '#/timeline', icon: 'eye' },
  { label: 'Tasks', href: '#/tasks', icon: 'check' },
  { label: 'Sprints', href: '#/sprints', icon: 'refresh' },
  { label: 'Team', href: '#/team', icon: 'user' },
  { label: 'Risks', href: '#/risks', icon: 'alert-triangle' },
  { label: 'Time', href: '#/time', icon: 'clock' },
  { label: 'Reports', href: '#/reports', icon: 'file' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Active projects', value: '14', hint: '4 launching in September', trend: 'up', trendValue: '+2' },
  { label: 'On schedule', value: '86%', hint: '12 of 14 in green', trend: 'up', trendValue: '+4 pts' },
  { label: 'Open tasks', value: '156', hint: '38 due this sprint', trend: 'down', trendValue: '-12' },
  { label: 'Sprint health', value: '79%', hint: '22 of 28 points done', trend: 'up', trendValue: '+6 pts' },
  { label: 'Team capacity', value: '78%', hint: '43 of 55 days booked', trend: 'flat', trendValue: 'Steady' },
  { label: 'Blocked', value: '5', hint: '1 waiting on legal', trend: 'down', trendValue: '-2' },
  { label: 'Logged hours', value: '328', hint: 'This sprint', trend: 'up', trendValue: '+18h' },
  { label: 'Risk score', value: 'Medium', hint: 'Two amber dependencies', trend: 'flat', trendValue: 'Watch' },
];

export const throughput = [44, 48, 46, 52, 55, 51, 58, 62, 59, 64, 68, 71, 74, 78];

export const people = [
  { id: 'p_ananya', name: 'Ananya Poluru', role: 'Delivery lead', squad: 'Platform', capacity: 82, rating: 5 },
  { id: 'p_kavya', name: 'Kavya Poluru', role: 'Product designer', squad: 'Experience', capacity: 72, rating: 5 },
  { id: 'p_arjun', name: 'Arjun Poluru', role: 'Engineering manager', squad: 'Platform', capacity: 88, rating: 4 },
  { id: 'p_meera', name: 'Meera Poluru', role: 'Frontend engineer', squad: 'Experience', capacity: 91, rating: 5 },
  { id: 'p_vikram', name: 'Vikram Poluru', role: 'Backend engineer', squad: 'Platform', capacity: 76, rating: 4 },
  { id: 'p_priya', name: 'Priya Poluru', role: 'QA lead', squad: 'Quality', capacity: 68, rating: 5 },
  { id: 'p_rohan', name: 'Rohan Poluru', role: 'Mobile engineer', squad: 'Field', capacity: 62, rating: 4 },
  { id: 'p_sahana', name: 'Sahana Poluru', role: 'Data analyst', squad: 'Insights', capacity: 58, rating: 4 },
  { id: 'p_nikhil', name: 'Nikhil Poluru', role: 'DevOps', squad: 'Platform', capacity: 74, rating: 5 },
  { id: 'p_elena', name: 'Elena Poluru', role: 'Content lead', squad: 'Experience', capacity: 52, rating: 4 },
];

export const projects = [
  {
    id: 'prj_harbor',
    name: 'Harbor Checkout',
    client: 'Harbor & Co.',
    owner: 'Ananya Poluru',
    status: 'On track',
    health: 94,
    due: '12 Sep 2026',
    budget: '$184k',
    spent: '$128k',
    squad: 'Platform',
    type: 'Build',
  },
  {
    id: 'prj_lumen',
    name: 'Lumen Patient Portal',
    client: 'Lumen Health',
    owner: 'Arjun Poluru',
    status: 'On track',
    health: 89,
    due: '30 Sep 2026',
    budget: '$246k',
    spent: '$168k',
    squad: 'Experience',
    type: 'Build',
  },
  {
    id: 'prj_nimbus',
    name: 'Nimbus Inventory',
    client: 'Nimbus Retail',
    owner: 'Vikram Poluru',
    status: 'At risk',
    health: 62,
    due: '18 Sep 2026',
    budget: '$96k',
    spent: '$74k',
    squad: 'Platform',
    type: 'Integration',
  },
  {
    id: 'prj_brightline',
    name: 'Brightline Design System',
    client: 'Brightline Labs',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 96,
    due: '8 Oct 2026',
    budget: '$72k',
    spent: '$32k',
    squad: 'Experience',
    type: 'Design',
  },
  {
    id: 'prj_oak',
    name: 'Oak Storefront',
    client: 'Oak & Pine',
    owner: 'Meera Poluru',
    status: 'Watch',
    health: 73,
    due: '22 Oct 2026',
    budget: '$58k',
    spent: '$22k',
    squad: 'Field',
    type: 'Build',
  },
  {
    id: 'prj_mobile',
    name: 'Fieldline Mobile',
    client: 'Fieldline Studio',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 83,
    due: '14 Nov 2026',
    budget: '$128k',
    spent: '$48k',
    squad: 'Field',
    type: 'Build',
  },
  {
    id: 'prj_cedar',
    name: 'Cedar Analytics Hub',
    client: 'Cedar Partners',
    owner: 'Sahana Poluru',
    status: 'On track',
    health: 87,
    due: '25 Sep 2026',
    budget: '$112k',
    spent: '$54k',
    squad: 'Insights',
    type: 'Integration',
  },
  {
    id: 'prj_river',
    name: 'River Compliance Suite',
    client: 'River Mutual',
    owner: 'Priya Poluru',
    status: 'Watch',
    health: 71,
    due: '6 Oct 2026',
    budget: '$88k',
    spent: '$36k',
    squad: 'Quality',
    type: 'Build',
  },
];

export const projectColumns = [
  { key: 'name', label: 'Project', sortable: true },
  { key: 'client', label: 'Client' },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Health' },
  { key: 'due', label: 'Due', sortable: true },
  { key: 'budget', label: 'Budget' },
];

export const tasks = [
  { id: 'tsk_1', title: 'Tokenize checkout fields', project: 'Harbor Checkout', owner: 'Vikram Poluru', status: 'In progress', points: 5, due: '3 Sep', column: 'doing' },
  { id: 'tsk_2', title: 'Accessibility pass on cart', project: 'Harbor Checkout', owner: 'Kavya Poluru', status: 'Review', points: 3, due: '2 Sep', column: 'review' },
  { id: 'tsk_3', title: 'Lab results API contract', project: 'Lumen Patient Portal', owner: 'Arjun Poluru', status: 'In progress', points: 8, due: '4 Sep', column: 'doing' },
  { id: 'tsk_4', title: 'Patient consent copy', project: 'Lumen Patient Portal', owner: 'Elena Poluru', status: 'To do', points: 2, due: '5 Sep', column: 'todo' },
  { id: 'tsk_5', title: 'SKU sync retry queue', project: 'Nimbus Inventory', owner: 'Nikhil Poluru', status: 'Blocked', points: 5, due: '1 Sep', column: 'todo' },
  { id: 'tsk_6', title: 'Cycle count mobile flow', project: 'Nimbus Inventory', owner: 'Rohan Poluru', status: 'To do', points: 5, due: '6 Sep', column: 'todo' },
  { id: 'tsk_7', title: 'Button tokens v2', project: 'Brightline Design System', owner: 'Meera Poluru', status: 'Done', points: 3, due: '28 Aug', column: 'done' },
  { id: 'tsk_8', title: 'Icon set audit', project: 'Brightline Design System', owner: 'Kavya Poluru', status: 'Review', points: 2, due: '3 Sep', column: 'review' },
  { id: 'tsk_9', title: 'Storefront PDP templates', project: 'Oak Storefront', owner: 'Meera Poluru', status: 'In progress', points: 5, due: '4 Sep', column: 'doing' },
  { id: 'tsk_10', title: 'Offline sync for visits', project: 'Fieldline Mobile', owner: 'Rohan Poluru', status: 'To do', points: 8, due: '10 Sep', column: 'todo' },
  { id: 'tsk_11', title: 'Load test checkout', project: 'Harbor Checkout', owner: 'Priya Poluru', status: 'To do', points: 3, due: '7 Sep', column: 'todo' },
  { id: 'tsk_12', title: 'Release notes 1.8', project: 'Fieldline Mobile', owner: 'Elena Poluru', status: 'Done', points: 1, due: '26 Aug', column: 'done' },
  { id: 'tsk_13', title: 'ETL pipeline for Cedar', project: 'Cedar Analytics Hub', owner: 'Sahana Poluru', status: 'In progress', points: 5, due: '5 Sep', column: 'doing' },
  { id: 'tsk_14', title: 'Audit log retention policy', project: 'River Compliance Suite', owner: 'Priya Poluru', status: 'Review', points: 3, due: '4 Sep', column: 'review' },
];

export const taskColumns = [
  { key: 'title', label: 'Task', sortable: true },
  { key: 'project', label: 'Project' },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'points', label: 'Pts' },
  { key: 'due', label: 'Due' },
];

export const boardColumns = [
  { id: 'todo', label: 'To do' },
  { id: 'doing', label: 'In progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

export const sprints = [
  { name: 'Sprint 32', range: '28 Jul – 8 Aug 2026', planned: 34, done: 34, status: 'Closed', focus: 'Harbor auth' },
  { name: 'Sprint 33', range: '11 Aug – 22 Aug 2026', planned: 31, done: 29, status: 'Closed', focus: 'Lumen labs' },
  { name: 'Sprint 34', range: '25 Aug – 5 Sep 2026', planned: 28, done: 22, status: 'Active', focus: 'Checkout tokenize' },
  { name: 'Sprint 35', range: '8 Sep – 19 Sep 2026', planned: 30, done: 0, status: 'Planning', focus: 'Inventory retries' },
];

export const risks = [
  { id: 'r1', title: 'Legal copy for consent', owner: 'Elena Poluru', project: 'Lumen Patient Portal', severity: 'Amber', due: '4 Sep', note: 'Counsel review is two days late. Copy is drafted.' },
  { id: 'r2', title: 'Vendor SKU feed downtime', owner: 'Nikhil Poluru', project: 'Nimbus Inventory', severity: 'Red', due: '1 Sep', note: 'Nightly sync missed twice. Retry queue is the mitigation.' },
  { id: 'r3', title: 'Designer bandwidth', owner: 'Kavya Poluru', project: 'Brightline Design System', severity: 'Green', due: '10 Sep', note: 'Covered if Oak PDP slips a week.' },
  { id: 'r4', title: 'App Store review window', owner: 'Rohan Poluru', project: 'Fieldline Mobile', severity: 'Amber', due: '22 Sep', note: 'Need screenshots and privacy nutrition labels.' },
  { id: 'r5', title: 'Cedar data residency clause', owner: 'Sahana Poluru', project: 'Cedar Analytics Hub', severity: 'Amber', due: '8 Sep', note: 'Client legal wants EU-only storage. Architecture review scheduled.' },
  { id: 'r6', title: 'River audit export format', owner: 'Priya Poluru', project: 'River Compliance Suite', severity: 'Green', due: '12 Sep', note: 'SOC 2 template confirmed with client compliance lead.' },
];

export const timesheets = [
  { person: 'Ananya Poluru', project: 'Harbor Checkout', mon: 6, tue: 7, wed: 6, thu: 5, fri: 4 },
  { person: 'Meera Poluru', project: 'Oak Storefront', mon: 8, tue: 8, wed: 7, thu: 8, fri: 6 },
  { person: 'Vikram Poluru', project: 'Harbor Checkout', mon: 8, tue: 7, wed: 8, thu: 8, fri: 7 },
  { person: 'Rohan Poluru', project: 'Fieldline Mobile', mon: 6, tue: 6, wed: 5, thu: 4, fri: 3 },
  { person: 'Priya Poluru', project: 'River Compliance Suite', mon: 5, tue: 6, wed: 6, thu: 5, fri: 4 },
  { person: 'Sahana Poluru', project: 'Cedar Analytics Hub', mon: 7, tue: 7, wed: 6, thu: 6, fri: 5 },
];

export const timeColumns = [
  { key: 'person', label: 'Person', sortable: true },
  { key: 'project', label: 'Project' },
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
];

export const activity = [
  { label: 'Nimbus feed flagged', description: 'Nikhil Poluru · retry queue', timestamp: '1 Sep', icon: 'alert-triangle', status: 'Flagged' },
  { label: 'Harbor checkout in review', description: 'Kavya Poluru · accessibility pass', timestamp: '31 Aug', icon: 'check', status: 'Review' },
  { label: 'Patient consent drafted', description: 'Elena Poluru · waiting legal', timestamp: '29 Aug', icon: 'file', status: 'Legal' },
  { label: 'Button tokens shipped', description: 'Meera Poluru · Brightline', timestamp: '28 Aug', icon: 'check', status: 'Shipped' },
  { label: 'Cedar ETL kickoff', description: 'Sahana Poluru · Sprint 34', timestamp: '26 Aug', icon: 'star', status: 'Started' },
  { label: 'Sprint 34 started', description: 'Ananya Poluru · planned 28 pts', timestamp: '25 Aug', icon: 'star', status: 'Done' },
];

export const capacity = {
  booked: 78,
  daysBooked: 43,
  daysTotal: 55,
};

export const inboxItems = [
  { label: 'Nimbus feed missed nightly sync', description: 'Nikhil Poluru · SEV amber', icon: 'alert-triangle' },
  { label: 'Review requested on cart a11y', description: 'Kavya Poluru · Harbor', icon: 'eye' },
  { label: 'Sprint 35 planning is open', description: 'Ananya Poluru · 8 Sep', icon: 'clock' },
  { label: 'Cedar data residency review', description: 'Sahana Poluru · legal hold', icon: 'file' },
];

export const commandItems = [
  { label: 'Overview', description: 'Delivery pulse', href: '#/overview', icon: 'home' },
  { label: 'Harbor Checkout', description: 'Project', href: '#/project/prj_harbor', icon: 'folder' },
  { label: 'Board', description: 'Sprint 34', href: '#/board', icon: 'star' },
  { label: 'Tasks', description: 'Open work', href: '#/tasks', icon: 'check' },
  { label: 'Search', description: 'Find anything', href: '#/search', icon: 'search' },
  { label: 'Team', description: 'Capacity', href: '#/team', icon: 'user' },
  { label: 'Risks', description: 'Amber and red', href: '#/risks', icon: 'alert-triangle' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Basics', description: 'Name and project' },
  { label: 'Plan', description: 'Owner and points' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const reports = [
  { name: 'Sprint burndown', owner: 'Ananya Poluru', updated: '1 Sep 2026', format: 'CSV' },
  { name: 'Capacity by squad', owner: 'Sahana Poluru', updated: '31 Aug 2026', format: 'PDF' },
  { name: 'Risk register', owner: 'Priya Poluru', updated: '30 Aug 2026', format: 'CSV' },
  { name: 'Time by project', owner: 'Arjun Poluru', updated: '1 Sep 2026', format: 'XLSX' },
];

export const workspaceTree = [
  {
    id: 'delivery',
    label: 'Delivery',
    children: [
      { id: 'harbor', label: 'Harbor Checkout', href: '#/project/prj_harbor' },
      { id: 'lumen', label: 'Lumen Patient Portal', href: '#/project/prj_lumen' },
      { id: 'nimbus', label: 'Nimbus Inventory', href: '#/project/prj_nimbus' },
    ],
  },
  {
    id: 'craft',
    label: 'Craft',
    children: [
      { id: 'brightline', label: 'Brightline Design System', href: '#/project/prj_brightline' },
      { id: 'oak', label: 'Oak Storefront', href: '#/project/prj_oak' },
    ],
  },
  {
    id: 'field',
    label: 'Field',
    children: [
      { id: 'mobile', label: 'Fieldline Mobile', href: '#/project/prj_mobile' },
      { id: 'cedar', label: 'Cedar Analytics Hub', href: '#/project/prj_cedar' },
      { id: 'river', label: 'River Compliance Suite', href: '#/project/prj_river' },
    ],
  },
];

export const gantt = [
  { name: 'Harbor Checkout', start: 8, width: 42, tone: 'brand' },
  { name: 'Lumen Patient Portal', start: 18, width: 48, tone: 'ink' },
  { name: 'Nimbus Inventory', start: 22, width: 28, tone: 'warn' },
  { name: 'Cedar Analytics Hub', start: 26, width: 32, tone: 'brand' },
  { name: 'Brightline Design System', start: 30, width: 40, tone: 'brand' },
  { name: 'Oak Storefront', start: 40, width: 36, tone: 'ink' },
  { name: 'River Compliance Suite', start: 38, width: 34, tone: 'warn' },
  { name: 'Fieldline Mobile', start: 46, width: 44, tone: 'brand' },
];

export const apiSnippet = `GET /v1/projects/prj_harbor
Authorization: Bearer ves_live_****

{
  "id": "prj_harbor",
  "name": "Harbor Checkout",
  "health": 94,
  "owner": "Ananya Poluru"
}`;

export function buildSearchCatalog() {
  const projectHits = projects.map((item) => ({
    label: item.name,
    description: `${item.client} · ${item.status}`,
    owner: item.owner,
    type: 'Project',
    href: `#/project/${item.id}`,
  }));
  const taskHits = tasks.map((item) => ({
    label: item.title,
    description: `${item.project} · ${item.status}`,
    owner: item.owner,
    type: 'Task',
    href: '#/tasks',
  }));
  const riskHits = risks.map((item) => ({
    label: item.title,
    description: `${item.project} · ${item.severity}`,
    owner: item.owner,
    type: 'Risk',
    href: '#/risks',
  }));
  const peopleHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Person',
    href: '#/team',
  }));
  const reportHits = reports.map((item) => ({
    label: item.name,
    description: `Updated ${item.updated}`,
    owner: item.owner,
    type: 'Report',
    href: '#/reports',
  }));
  return [...projectHits, ...taskHits, ...riskHits, ...peopleHits, ...reportHits];
}
