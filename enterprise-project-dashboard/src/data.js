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
  sprint: 'Sprint 24 · 18–29 Aug',
  timezone: 'America / Chicago',
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
  { label: 'Active projects', value: '12', hint: '3 launching in September', trend: 'up', trendValue: '+2' },
  { label: 'On schedule', value: '83%', hint: '10 of 12 in green', trend: 'up', trendValue: '+5 pts' },
  { label: 'Open tasks', value: '148', hint: '36 due this sprint', trend: 'down', trendValue: '-18' },
  { label: 'Sprint health', value: '92%', hint: '24 of 26 points done', trend: 'up', trendValue: '+8 pts' },
  { label: 'Team capacity', value: '76%', hint: '41 of 54 days booked', trend: 'flat', trendValue: 'Steady' },
  { label: 'Blocked', value: '7', hint: '2 waiting on legal', trend: 'down', trendValue: '-3' },
  { label: 'Logged hours', value: '312', hint: 'This sprint', trend: 'up', trendValue: '+22h' },
  { label: 'Risk score', value: 'Low', hint: 'One amber dependency', trend: 'down', trendValue: 'Improving' },
];

export const throughput = [42, 48, 44, 51, 55, 49, 58, 61, 57, 63, 68, 71];

export const people = [
  { id: 'p_ananya', name: 'Ananya Poluru', role: 'Delivery lead', squad: 'Platform', capacity: 80, rating: 5 },
  { id: 'p_kavya', name: 'Kavya Poluru', role: 'Product designer', squad: 'Experience', capacity: 70, rating: 5 },
  { id: 'p_arjun', name: 'Arjun Poluru', role: 'Engineering manager', squad: 'Platform', capacity: 85, rating: 4 },
  { id: 'p_meera', name: 'Meera Poluru', role: 'Frontend engineer', squad: 'Experience', capacity: 90, rating: 5 },
  { id: 'p_vikram', name: 'Vikram Poluru', role: 'Backend engineer', squad: 'Platform', capacity: 75, rating: 4 },
  { id: 'p_priya', name: 'Priya Poluru', role: 'QA lead', squad: 'Quality', capacity: 65, rating: 5 },
  { id: 'p_rohan', name: 'Rohan Poluru', role: 'Mobile engineer', squad: 'Field', capacity: 60, rating: 4 },
  { id: 'p_sahana', name: 'Sahana Poluru', role: 'Data analyst', squad: 'Insights', capacity: 55, rating: 4 },
  { id: 'p_nikhil', name: 'Nikhil Poluru', role: 'DevOps', squad: 'Platform', capacity: 70, rating: 5 },
  { id: 'p_elena', name: 'Elena Poluru', role: 'Content lead', squad: 'Experience', capacity: 50, rating: 4 },
];

export const projects = [
  {
    id: 'prj_harbor',
    name: 'Harbor Checkout',
    client: 'Harbor & Co.',
    owner: 'Ananya Poluru',
    status: 'On track',
    health: 92,
    due: '12 Sep 2026',
    budget: '$184k',
    spent: '$121k',
    squad: 'Platform',
    type: 'Build',
  },
  {
    id: 'prj_lumen',
    name: 'Lumen Patient Portal',
    client: 'Lumen Health',
    owner: 'Arjun Poluru',
    status: 'On track',
    health: 88,
    due: '30 Sep 2026',
    budget: '$246k',
    spent: '$162k',
    squad: 'Experience',
    type: 'Build',
  },
  {
    id: 'prj_nimbus',
    name: 'Nimbus Inventory',
    client: 'Nimbus Retail',
    owner: 'Vikram Poluru',
    status: 'At risk',
    health: 64,
    due: '18 Sep 2026',
    budget: '$96k',
    spent: '$71k',
    squad: 'Platform',
    type: 'Integration',
  },
  {
    id: 'prj_brightline',
    name: 'Brightline Design System',
    client: 'Brightline Labs',
    owner: 'Kavya Poluru',
    status: 'On track',
    health: 95,
    due: '8 Oct 2026',
    budget: '$72k',
    spent: '$28k',
    squad: 'Experience',
    type: 'Design',
  },
  {
    id: 'prj_oak',
    name: 'Oak Storefront',
    client: 'Oak & Pine',
    owner: 'Meera Poluru',
    status: 'Watch',
    health: 74,
    due: '22 Oct 2026',
    budget: '$58k',
    spent: '$19k',
    squad: 'Field',
    type: 'Build',
  },
  {
    id: 'prj_mobile',
    name: 'Fieldline Mobile',
    client: 'Fieldline Studio',
    owner: 'Rohan Poluru',
    status: 'On track',
    health: 81,
    due: '14 Nov 2026',
    budget: '$128k',
    spent: '$44k',
    squad: 'Field',
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
  { id: 'tsk_1', title: 'Tokenize checkout fields', project: 'Harbor Checkout', owner: 'Vikram Poluru', status: 'In progress', points: 5, due: '29 Aug', column: 'doing' },
  { id: 'tsk_2', title: 'Accessibility pass on cart', project: 'Harbor Checkout', owner: 'Kavya Poluru', status: 'Review', points: 3, due: '28 Aug', column: 'review' },
  { id: 'tsk_3', title: 'Lab results API contract', project: 'Lumen Patient Portal', owner: 'Arjun Poluru', status: 'In progress', points: 8, due: '2 Sep', column: 'doing' },
  { id: 'tsk_4', title: 'Patient consent copy', project: 'Lumen Patient Portal', owner: 'Elena Poluru', status: 'To do', points: 2, due: '3 Sep', column: 'todo' },
  { id: 'tsk_5', title: 'SKU sync retry queue', project: 'Nimbus Inventory', owner: 'Nikhil Poluru', status: 'Blocked', points: 5, due: '27 Aug', column: 'todo' },
  { id: 'tsk_6', title: 'Cycle count mobile flow', project: 'Nimbus Inventory', owner: 'Rohan Poluru', status: 'To do', points: 5, due: '4 Sep', column: 'todo' },
  { id: 'tsk_7', title: 'Button tokens v2', project: 'Brightline Design System', owner: 'Meera Poluru', status: 'Done', points: 3, due: '25 Aug', column: 'done' },
  { id: 'tsk_8', title: 'Icon set audit', project: 'Brightline Design System', owner: 'Kavya Poluru', status: 'Review', points: 2, due: '29 Aug', column: 'review' },
  { id: 'tsk_9', title: 'Storefront PDP templates', project: 'Oak Storefront', owner: 'Meera Poluru', status: 'In progress', points: 5, due: '1 Sep', column: 'doing' },
  { id: 'tsk_10', title: 'Offline sync for visits', project: 'Fieldline Mobile', owner: 'Rohan Poluru', status: 'To do', points: 8, due: '8 Sep', column: 'todo' },
  { id: 'tsk_11', title: 'Load test checkout', project: 'Harbor Checkout', owner: 'Priya Poluru', status: 'To do', points: 3, due: '5 Sep', column: 'todo' },
  { id: 'tsk_12', title: 'Release notes 1.8', project: 'Fieldline Mobile', owner: 'Elena Poluru', status: 'Done', points: 1, due: '22 Aug', column: 'done' },
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
  { name: 'Sprint 22', range: '21 Jul – 1 Aug', planned: 34, done: 34, status: 'Closed', focus: 'Harbor auth' },
  { name: 'Sprint 23', range: '4 Aug – 15 Aug', planned: 31, done: 29, status: 'Closed', focus: 'Lumen labs' },
  { name: 'Sprint 24', range: '18 Aug – 29 Aug', planned: 26, done: 24, status: 'Active', focus: 'Checkout tokenize' },
  { name: 'Sprint 25', range: '1 Sep – 12 Sep', planned: 28, done: 0, status: 'Planning', focus: 'Inventory retries' },
];

export const risks = [
  { id: 'r1', title: 'Legal copy for consent', owner: 'Elena Poluru', project: 'Lumen Patient Portal', severity: 'Amber', due: '2 Sep', note: 'Counsel review is two days late. Copy is drafted.' },
  { id: 'r2', title: 'Vendor SKU feed downtime', owner: 'Nikhil Poluru', project: 'Nimbus Inventory', severity: 'Red', due: '27 Aug', note: 'Nightly sync missed twice. Retry queue is the mitigation.' },
  { id: 'r3', title: 'Designer bandwidth', owner: 'Kavya Poluru', project: 'Brightline Design System', severity: 'Green', due: '8 Sep', note: 'Covered if Oak PDP slips a week.' },
  { id: 'r4', title: 'App Store review window', owner: 'Rohan Poluru', project: 'Fieldline Mobile', severity: 'Amber', due: '20 Sep', note: 'Need screenshots and privacy nutrition labels.' },
];

export const timesheets = [
  { person: 'Ananya Poluru', project: 'Harbor Checkout', mon: 6, tue: 7, wed: 6, thu: 5, fri: 4 },
  { person: 'Meera Poluru', project: 'Oak Storefront', mon: 8, tue: 8, wed: 7, thu: 8, fri: 6 },
  { person: 'Vikram Poluru', project: 'Harbor Checkout', mon: 8, tue: 7, wed: 8, thu: 8, fri: 7 },
  { person: 'Rohan Poluru', project: 'Fieldline Mobile', mon: 6, tue: 6, wed: 5, thu: 4, fri: 3 },
  { person: 'Priya Poluru', project: 'Harbor Checkout', mon: 5, tue: 6, wed: 6, thu: 5, fri: 4 },
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
  { label: 'Sprint 24 started', description: 'Ananya Poluru · 18 Aug', timestamp: '18 Aug', icon: 'star' },
  { label: 'Harbor checkout in review', description: 'Kavya Poluru · accessibility pass', timestamp: '26 Aug', icon: 'check' },
  { label: 'Nimbus feed flagged', description: 'Nikhil Poluru · retry queue', timestamp: '27 Aug', icon: 'alert-triangle' },
  { label: 'Button tokens shipped', description: 'Meera Poluru · Brightline', timestamp: '25 Aug', icon: 'check' },
  { label: 'Patient consent drafted', description: 'Elena Poluru · waiting legal', timestamp: '24 Aug', icon: 'file' },
];

export const inboxItems = [
  { label: 'Nimbus feed missed nightly sync', description: 'Nikhil Poluru · SEV amber', icon: 'alert-triangle' },
  { label: 'Review requested on cart a11y', description: 'Kavya Poluru · Harbor', icon: 'eye' },
  { label: 'Sprint 25 planning is open', description: 'Ananya Poluru · 1 Sep', icon: 'clock' },
];

export const commandItems = [
  { label: 'Overview', description: 'Delivery pulse', href: '#/overview', icon: 'home' },
  { label: 'Harbor Checkout', description: 'Project', href: '#/project/prj_harbor', icon: 'folder' },
  { label: 'Board', description: 'Sprint 24', href: '#/board', icon: 'star' },
  { label: 'Tasks', description: 'Open work', href: '#/tasks', icon: 'check' },
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
  { name: 'Sprint burndown', owner: 'Ananya Poluru', updated: '28 Aug 2026', format: 'CSV' },
  { name: 'Capacity by squad', owner: 'Sahana Poluru', updated: '27 Aug 2026', format: 'PDF' },
  { name: 'Risk register', owner: 'Priya Poluru', updated: '26 Aug 2026', format: 'CSV' },
  { name: 'Time by project', owner: 'Arjun Poluru', updated: '28 Aug 2026', format: 'XLSX' },
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
    children: [{ id: 'mobile', label: 'Fieldline Mobile', href: '#/project/prj_mobile' }],
  },
];

export const gantt = [
  { name: 'Harbor Checkout', start: 8, width: 42, tone: 'brand' },
  { name: 'Lumen Patient Portal', start: 18, width: 48, tone: 'ink' },
  { name: 'Nimbus Inventory', start: 22, width: 28, tone: 'warn' },
  { name: 'Brightline Design System', start: 30, width: 40, tone: 'brand' },
  { name: 'Oak Storefront', start: 40, width: 36, tone: 'ink' },
  { name: 'Fieldline Mobile', start: 46, width: 44, tone: 'brand' },
];

export const apiSnippet = `GET /v1/projects/prj_harbor
Authorization: Bearer ves_live_****

{
  "id": "prj_harbor",
  "name": "Harbor Checkout",
  "health": 92,
  "owner": "Ananya Poluru"
}`;
