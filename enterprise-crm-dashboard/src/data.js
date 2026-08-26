export const productName = 'Lyra';
export const productLine = 'CRM';
export const workspaceName = 'Poluru Labs';

export const currentUser = {
  name: 'Aisha Poluru',
  email: 'aisha.poluru@polurulabs.example',
  role: 'Enterprise sales lead',
  quota: '$1.20M',
  attained: '78%',
};

export const company = {
  name: 'Poluru Labs, Inc.',
  region: 'Americas · EMEA',
  fiscal: 'FY26 Q3',
  currency: 'USD',
};

export const navGroups = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', href: '#/overview', icon: 'bi-grid-1x2' },
      { label: 'Pipeline', href: '#/pipeline', icon: 'bi-kanban', badge: '8' },
      { label: 'Forecast', href: '#/forecast', icon: 'bi-graph-up-arrow', badge: '78%' },
    ],
  },
  {
    label: 'Records',
    items: [
      { label: 'Deals', href: '#/deals', icon: 'bi-briefcase', badge: '72' },
      { label: 'Leads', href: '#/leads', icon: 'bi-person-plus', badge: '12' },
      { label: 'Contacts', href: '#/contacts', icon: 'bi-people' },
      { label: 'Accounts', href: '#/accounts', icon: 'bi-buildings' },
    ],
  },
  {
    label: 'Work',
    items: [
      { label: 'Activities', href: '#/activities', icon: 'bi-calendar-check', badge: '6' },
      { label: 'Reports', href: '#/reports', icon: 'bi-bar-chart-line' },
      { label: 'Settings', href: '#/settings', icon: 'bi-sliders' },
    ],
  },
];

export const navItems = navGroups.flatMap((group) => group.items);

export const kpis = [
  { label: 'Pipeline', value: '$4.86M', hint: 'Weighted $2.41M', trend: 'up', trendValue: '+18.6%' },
  { label: 'Open deals', value: '72', hint: '14 closing this week', trend: 'up', trendValue: '+6' },
  { label: 'New leads', value: '384', hint: 'MQL conversion 24%', trend: 'up', trendValue: '+18.6%' },
  { label: 'Win rate', value: '31%', hint: 'Trailing 90 days', trend: 'up', trendValue: '+2.4 pts' },
  { label: 'Quota attained', value: '78%', hint: '$936k of $1.20M', trend: 'up', trendValue: '+9.4%' },
  { label: 'Avg cycle', value: '41d', hint: 'Enterprise median', trend: 'down', trendValue: '-4d' },
  { label: 'Follow-ups', value: '28', hint: '6 due today', trend: 'flat', trendValue: 'On track' },
  { label: 'At risk', value: '9', hint: 'No activity 14 days', trend: 'down', trendValue: '-3' },
];

export const pipelineMonths = [2.8, 3.0, 3.1, 3.4, 3.6, 3.9, 4.1, 4.2, 4.4, 4.5, 4.7, 4.86];

export const stages = ['Qualify', 'Discovery', 'Proposal', 'Negotiation', 'Closed won'];

export const funnel = [
  { stage: 'Qualify', count: 18, width: 100, value: '$640k' },
  { stage: 'Discovery', count: 14, width: 82, value: '$510k' },
  { stage: 'Proposal', count: 11, width: 64, value: '$860k' },
  { stage: 'Negotiation', count: 7, width: 44, value: '$428k' },
  { stage: 'Closed won', count: 4, width: 28, value: '$312k' },
];

export const teamBoard = [
  { name: 'Aisha Poluru', closed: '$312k', pipeline: '$1.12M', quota: 78, trend: '+12%' },
  { name: 'Maya Poluru', closed: '$186k', pipeline: '$840k', quota: 71, trend: '+8%' },
  { name: 'Arjun Poluru', closed: '$164k', pipeline: '$620k', quota: 64, trend: '+3%' },
  { name: 'Jordan Poluru', closed: '$148k', pipeline: '$910k', quota: 61, trend: '+9%' },
  { name: 'Sahana Poluru', closed: '$126k', pipeline: '$540k', quota: 54, trend: '-2%' },
];

export const agenda = [
  { id: 'ag_01', time: '16:20', title: 'Harbor legal walkthrough', with: 'Meera Poluru', type: 'Call' },
  { id: 'ag_02', time: '17:00', title: 'Discount approval · Fieldwork', with: 'Finance', type: 'Task' },
  { id: 'ag_03', time: 'Tomorrow 10:00', title: 'Brightline technical demo', with: 'Kavya Poluru', type: 'Meeting' },
  { id: 'ag_04', time: 'Fri 14:30', title: 'Lumen HIPAA intro', with: 'Nikhil Poluru', type: 'Call' },
];

export const atRisk = [
  { account: 'Nimbus Retail', owner: 'Arjun Poluru', reason: 'Champion quiet 14 days', value: '$96k', href: '#/deal/deal_nimbus' },
  { account: 'Oak & Pine', owner: 'Sahana Poluru', reason: 'Stuck in Qualify', value: '$64.5k', href: '#/deal/deal_oak' },
  { account: 'Paperplane', owner: 'Maya Poluru', reason: 'No next meeting set', value: '$12.6k', href: '#/deal/deal_paper' },
];

export const insights = [
  {
    title: 'Harbor needs a working session today',
    body: 'Meera Poluru has not opened the redline pack in 3 days. Book 15 minutes before 17:00 to keep $184k in commit.',
  },
  {
    title: 'Hana Poluru is ready to convert',
    body: 'Fold Paper Co scored 91 from partner. Convert now and Aisha Poluru stays owner on discovery.',
  },
];

export const sourceMix = [
  { label: 'Outbound', value: 34 },
  { label: 'Inbound', value: 28 },
  { label: 'Partner', value: 22 },
  { label: 'Event', value: 16 },
];

export const accounts = [
  {
    id: 'acc_harbor',
    name: 'Harbor & Co.',
    industry: 'Logistics',
    region: 'EMEA',
    owner: 'Aisha Poluru',
    employees: '2,400',
    arr: '$312k',
    health: 'Expanding',
    next: 'QBR · 2 Sep',
  },
  {
    id: 'acc_nimbus',
    name: 'Nimbus Retail',
    industry: 'Retail',
    region: 'Americas',
    owner: 'Arjun Poluru',
    employees: '860',
    arr: '$126k',
    health: 'At risk',
    next: 'Renewal · 1 Sep',
  },
  {
    id: 'acc_bright',
    name: 'Brightline Labs',
    industry: 'SaaS',
    region: 'Americas',
    owner: 'Maya Poluru',
    employees: '210',
    arr: '$48k',
    health: 'Healthy',
    next: 'Demo · 27 Aug',
  },
  {
    id: 'acc_lumen',
    name: 'Lumen Health',
    industry: 'Healthcare',
    region: 'Americas',
    owner: 'Jordan Poluru',
    employees: '1,120',
    arr: '$249k',
    health: 'Expanding',
    next: 'Security review',
  },
  {
    id: 'acc_oak',
    name: 'Oak & Pine',
    industry: 'CPG',
    region: 'Americas',
    owner: 'Sahana Poluru',
    employees: '540',
    arr: '$92k',
    health: 'Healthy',
    next: 'Pilot wrap · 4 Sep',
  },
  {
    id: 'acc_kite',
    name: 'Kite Studio',
    industry: 'Media',
    region: 'APAC',
    owner: 'Rohan Poluru',
    employees: '48',
    arr: '$6k',
    health: 'New',
    next: 'Discovery call',
  },
];

export const contacts = [
  {
    id: 'con_meera',
    name: 'Meera Poluru',
    title: 'VP Operations',
    account: 'Harbor & Co.',
    accountId: 'acc_harbor',
    email: 'meera.poluru@harborco.example',
    phone: '+44 20 7946 0182',
    influence: 'Champion',
    last: 'Yesterday',
  },
  {
    id: 'con_arjun',
    name: 'Arjun Poluru',
    title: 'Head of Retail Systems',
    account: 'Nimbus Retail',
    accountId: 'acc_nimbus',
    email: 'arjun.poluru@nimbus.example',
    phone: '+1 312 555 0144',
    influence: 'Decision maker',
    last: '3 days ago',
  },
  {
    id: 'con_kavya',
    name: 'Kavya Poluru',
    title: 'Director of Product',
    account: 'Brightline Labs',
    accountId: 'acc_bright',
    email: 'kavya.poluru@brightline.example',
    phone: '+1 415 555 0190',
    influence: 'Champion',
    last: 'Today',
  },
  {
    id: 'con_nikhil',
    name: 'Nikhil Poluru',
    title: 'CIO',
    account: 'Lumen Health',
    accountId: 'acc_lumen',
    email: 'nikhil.poluru@lumenhealth.example',
    phone: '+1 617 555 0118',
    influence: 'Economic buyer',
    last: '5 days ago',
  },
  {
    id: 'con_sahana',
    name: 'Sahana Poluru',
    title: 'Procurement lead',
    account: 'Oak & Pine',
    accountId: 'acc_oak',
    email: 'sahana.poluru@oakpine.example',
    phone: '+1 206 555 0177',
    influence: 'Influencer',
    last: '1 week ago',
  },
  {
    id: 'con_rohan',
    name: 'Rohan Poluru',
    title: 'Founder',
    account: 'Kite Studio',
    accountId: 'acc_kite',
    email: 'rohan.poluru@kitestudio.example',
    phone: '+91 40 5555 0120',
    influence: 'Decision maker',
    last: '2 hours ago',
  },
];

export const deals = [
  {
    id: 'deal_harbor',
    name: 'Harbor platform expansion',
    account: 'Harbor & Co.',
    accountId: 'acc_harbor',
    value: '$184,000',
    amount: 184000,
    stage: 'Negotiation',
    probability: 70,
    owner: 'Aisha Poluru',
    close: '2026-09-12',
    source: 'Expansion',
    next: 'Legal redlines',
  },
  {
    id: 'deal_nimbus',
    name: 'Nimbus omnichannel suite',
    account: 'Nimbus Retail',
    accountId: 'acc_nimbus',
    value: '$96,000',
    amount: 96000,
    stage: 'Proposal',
    probability: 45,
    owner: 'Arjun Poluru',
    close: '2026-09-28',
    source: 'Inbound',
    next: 'Security questionnaire',
  },
  {
    id: 'deal_bright',
    name: 'Brightline Growth plan',
    account: 'Brightline Labs',
    accountId: 'acc_bright',
    value: '$28,800',
    amount: 28800,
    stage: 'Discovery',
    probability: 30,
    owner: 'Maya Poluru',
    close: '2026-10-08',
    source: 'Webinar',
    next: 'Technical demo',
  },
  {
    id: 'deal_lumen',
    name: 'Lumen EHR integration',
    account: 'Lumen Health',
    accountId: 'acc_lumen',
    value: '$240,000',
    amount: 240000,
    stage: 'Proposal',
    probability: 55,
    owner: 'Jordan Poluru',
    close: '2026-10-21',
    source: 'Partner',
    next: 'HIPAA review',
  },
  {
    id: 'deal_oak',
    name: 'Oak & Pine field sales',
    account: 'Oak & Pine',
    accountId: 'acc_oak',
    value: '$64,500',
    amount: 64500,
    stage: 'Qualify',
    probability: 20,
    owner: 'Sahana Poluru',
    close: '2026-11-04',
    source: 'Outbound',
    next: 'Needs analysis',
  },
  {
    id: 'deal_kite',
    name: 'Kite Studio starter',
    account: 'Kite Studio',
    accountId: 'acc_kite',
    value: '$8,400',
    amount: 8400,
    stage: 'Closed won',
    probability: 100,
    owner: 'Rohan Poluru',
    close: '2026-08-18',
    source: 'Self-serve',
    next: 'Kickoff booked',
  },
  {
    id: 'deal_field',
    name: 'Fieldwork analytics pack',
    account: 'Fieldwork Inc',
    accountId: 'acc_field',
    value: '$42,000',
    amount: 42000,
    stage: 'Negotiation',
    probability: 65,
    owner: 'Aisha Poluru',
    close: '2026-09-04',
    source: 'Referral',
    next: 'Discount approval',
  },
  {
    id: 'deal_paper',
    name: 'Paperplane collaboration',
    account: 'Paperplane',
    accountId: 'acc_paper',
    value: '$12,600',
    amount: 12600,
    stage: 'Discovery',
    probability: 25,
    owner: 'Maya Poluru',
    close: '2026-10-30',
    source: 'Event',
    next: 'Stakeholder map',
  },
];

export const leads = [
  { id: 'lead_01', name: 'Leila Poluru', company: 'Northwind Bio', email: 'leila.poluru@northwind.example', status: 'New', score: 88, source: 'Webinar', owner: 'Maya Poluru', created: '2026-08-24' },
  { id: 'lead_02', name: 'Diego Poluru', company: 'Cinder Transit', email: 'diego.poluru@cinder.example', status: 'Working', score: 74, source: 'Outbound', owner: 'Arjun Poluru', created: '2026-08-21' },
  { id: 'lead_03', name: 'Hana Poluru', company: 'Fold Paper Co', email: 'hana.poluru@foldpaper.example', status: 'Qualified', score: 91, source: 'Partner', owner: 'Aisha Poluru', created: '2026-08-19' },
  { id: 'lead_04', name: 'Omar Poluru', company: 'Saffron Bank', email: 'omar.poluru@saffron.example', status: 'Working', score: 63, source: 'Inbound', owner: 'Jordan Poluru', created: '2026-08-18' },
  { id: 'lead_05', name: 'Elena Poluru', company: 'Lattice Energy', email: 'elena.poluru@lattice.example', status: 'New', score: 79, source: 'Event', owner: 'Sahana Poluru', created: '2026-08-25' },
  { id: 'lead_06', name: 'Theo Poluru', company: 'Harborline', email: 'theo.poluru@harborline.example', status: 'Unqualified', score: 22, source: 'Content', owner: 'Maya Poluru', created: '2026-08-12' },
];

export const activities = [
  { id: 'act_01', type: 'Call', title: 'Harbor legal walkthrough', with: 'Meera Poluru', when: 'Today · 16:20', status: 'Due today', owner: 'Aisha Poluru' },
  { id: 'act_02', type: 'Meeting', title: 'Brightline technical demo', with: 'Kavya Poluru', when: 'Tomorrow · 10:00', status: 'Scheduled', owner: 'Maya Poluru' },
  { id: 'act_03', type: 'Email', title: 'Nimbus security pack', with: 'Arjun Poluru', when: 'Today · 09:15', status: 'Sent', owner: 'Arjun Poluru' },
  { id: 'act_04', type: 'Task', title: 'Discount approval · Fieldwork', with: 'Finance', when: 'Thu · 12:00', status: 'Blocked', owner: 'Aisha Poluru' },
  { id: 'act_05', type: 'Call', title: 'Lumen HIPAA intro', with: 'Nikhil Poluru', when: 'Fri · 14:30', status: 'Scheduled', owner: 'Jordan Poluru' },
  { id: 'act_06', type: 'Meeting', title: 'Kite Studio kickoff', with: 'Rohan Poluru', when: 'Mon · 09:00', status: 'Scheduled', owner: 'Rohan Poluru' },
];

export const activityFeed = [
  { title: 'Harbor expansion moved to Negotiation', description: 'Aisha Poluru · $184k · legal in review', timestamp: '12 minutes ago', status: 'current' },
  { title: 'Kite Studio closed won', description: 'Rohan Poluru · starter · $8.4k · kickoff Monday', timestamp: '2 hours ago', status: 'complete' },
  { title: 'New MQL: Lattice Energy', description: 'Elena Poluru · score 79 · event sourced', timestamp: 'Yesterday', status: 'complete' },
  { title: 'Nimbus at risk', description: 'Arjun Poluru · no champion activity in 14 days', timestamp: 'Yesterday', status: 'upcoming' },
];

export const forecast = [
  { label: 'Commit', value: '$936k', hint: 'Closed + late stage', trend: 'up', trendValue: '78% of quota' },
  { label: 'Best case', value: '$1.18M', hint: 'Includes 55%+ deals', trend: 'up', trendValue: '98% coverage' },
  { label: 'Pipeline', value: '$1.64M', hint: 'Open, this quarter', trend: 'up', trendValue: '1.4× quota' },
  { label: 'Gap to quota', value: '$264k', hint: 'Need 2 late-stage wins', trend: 'down', trendValue: '-$48k vs last week' },
];

export const reports = [
  { name: 'Pipeline coverage', description: 'Open pipeline vs remaining quota by owner', owner: 'Aisha Poluru', updated: 'Today 07:40' },
  { name: 'Win / loss', description: 'Closed deals by competitor, stage, and source', owner: 'Arjun Poluru', updated: 'Today 06:15' },
  { name: 'Lead conversion', description: 'MQL → SQL → opportunity funnel, 90 days', owner: 'Maya Poluru', updated: 'Yesterday' },
  { name: 'Activity cadence', description: 'Calls, emails, and meetings per open deal', owner: 'Jordan Poluru', updated: 'Monday' },
];

export const dealColumns = [
  { key: 'name', label: 'Deal', sortable: true },
  { key: 'account', label: 'Account', sortable: true },
  { key: 'value', label: 'Amount', sortable: true },
  { key: 'stage', label: 'Stage', sortable: true },
  { key: 'probability', label: 'Prob.', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'close', label: 'Close', sortable: true },
];

export const leadColumns = [
  { key: 'name', label: 'Lead', sortable: true },
  { key: 'company', label: 'Company', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'score', label: 'Score', sortable: true },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'created', label: 'Created', sortable: true },
];

export const contactColumns = [
  { key: 'name', label: 'Contact', sortable: true },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'account', label: 'Account', sortable: true },
  { key: 'influence', label: 'Role', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'last', label: 'Last touch', sortable: true },
];

export const accountColumns = [
  { key: 'name', label: 'Account', sortable: true },
  { key: 'industry', label: 'Industry', sortable: true },
  { key: 'region', label: 'Region', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'arr', label: 'ARR', sortable: true },
  { key: 'health', label: 'Health', sortable: true },
  { key: 'next', label: 'Next step', sortable: true },
];

export const activityColumns = [
  { key: 'type', label: 'Type', sortable: true },
  { key: 'title', label: 'Activity', sortable: true },
  { key: 'with', label: 'With', sortable: true },
  { key: 'when', label: 'When', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
];

export const commandItems = [
  { label: 'New deal', description: 'Create an opportunity', href: '#/deals', icon: 'plus' },
  { label: 'Log activity', description: 'Call, email, or meeting', href: '#/activities', icon: 'calendar' },
  { label: 'Add lead', description: 'Capture a new MQL', href: '#/leads', icon: 'user' },
  { label: 'Open pipeline', description: 'Kanban by stage', href: '#/pipeline', icon: 'folder' },
  { label: 'Forecast', description: 'Quota vs commit', href: '#/forecast', icon: 'check-circle' },
];

export const inboxItems = [
  { label: 'Harbor legal needs a signature', description: 'Meera Poluru · due today · $184k', icon: 'alert-triangle' },
  { label: 'Nimbus champion went quiet', description: 'Arjun Poluru · 14 days · $96k', icon: 'clock' },
  { label: 'Elena Poluru scored 79', description: 'Lattice Energy · event MQL', icon: 'star' },
];

export const pinnedDeal = deals[0];
