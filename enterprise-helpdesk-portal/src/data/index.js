export const productName = 'Relay';
export const productLine = 'Helpdesk';
export const workspaceName = 'Poluru Support';

export const currentUser = {
  name: 'Elena Poluru',
  email: 'elena.poluru@poluru.example',
  role: 'Shift lead',
};

export const workspace = {
  name: workspaceName,
  period: 'Aug–Sep 2026 · shift B',
  timezone: 'America / Chicago',
  coverage: 'Coverage until 8:00 PM',
};

export const queueRibbon = {
  slaLabel: 'First response',
  slaCountdown: '12m',
  queueLength: 38,
  agentsOnline: 14,
  agentsScheduled: 18,
  breached: 6,
  shift: 'Shift B',
  coverage: 'Coverage until 8:00 PM',
  severity: {
    critical: 3,
    high: 7,
    medium: 12,
  },
  lanes: [
    { id: 'q_identity', label: 'Identity', open: 42 },
    { id: 'q_platform', label: 'Platform', open: 58 },
    { id: 'q_billing', label: 'Billing', open: 31 },
    { id: 'q_device', label: 'Device', open: 27 },
    { id: 'q_infra', label: 'Infra', open: 48 },
    { id: 'q_eu', label: 'EMEA', open: 22 },
  ],
};

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Tickets', href: '#/tickets', icon: 'ticket' },
  { label: 'Teams', href: '#/teams', icon: 'user' },
  { label: 'SLA policies', href: '#/sla', icon: 'clock' },
  { label: 'Knowledge', href: '#/knowledge', icon: 'file' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const overviewMetrics = [
  { label: 'Open tickets', value: '248', hint: '38 created today', trend: 'up', trendValue: '+12' },
  { label: 'First response', value: '42m', hint: 'Target 60m', trend: 'up', trendValue: '−18m' },
  { label: 'CSAT', value: '94.2%', hint: 'Best score this month', trend: 'up', trendValue: '+1.4 pts' },
  { label: 'Backlog', value: '186', hint: 'Awaiting assignment', trend: 'flat', trendValue: 'Stable' },
  { label: 'SLA health', value: '91%', hint: '18 critical under watch', trend: 'up', trendValue: '+2 pts' },
  { label: 'Agents online', value: '14', hint: 'Of 18 scheduled', trend: 'up', trendValue: '+2' },
  { label: 'Breached', value: '6', hint: 'Needs escalation', trend: 'down', trendValue: '−2' },
  { label: 'Waiting', value: '52', hint: 'Customer reply pending', trend: 'flat', trendValue: 'Hold' },
];

export const queues = [
  { id: 'q_identity', name: 'Identity & access', lead: 'Maya Poluru', open: 42, breached: 1, sla: 94, status: 'Healthy' },
  { id: 'q_platform', name: 'Platform support', lead: 'Arjun Poluru', open: 58, breached: 2, sla: 89, status: 'Watch' },
  { id: 'q_billing', name: 'Billing & workflow', lead: 'Nila Poluru', open: 31, breached: 0, sla: 96, status: 'Healthy' },
  { id: 'q_device', name: 'Device onboarding', lead: 'Riya Poluru', open: 27, breached: 1, sla: 92, status: 'Healthy' },
  { id: 'q_infra', name: 'Infrastructure', lead: 'Dev Poluru', open: 48, breached: 2, sla: 87, status: 'At risk' },
  { id: 'q_eu', name: 'EMEA overnight', lead: 'Priya Poluru', open: 22, breached: 0, sla: 95, status: 'Healthy' },
];

export const agents = [
  { name: 'Maya Poluru', role: 'Identity analyst', squad: 'Identity & access', active: 14, status: 'Online', csat: 4.9 },
  { name: 'Arjun Poluru', role: 'Platform engineer', squad: 'Platform support', active: 9, status: 'Online', csat: 4.7 },
  { name: 'Nila Poluru', role: 'Billing specialist', squad: 'Billing & workflow', active: 7, status: 'Online', csat: 4.8 },
  { name: 'Riya Poluru', role: 'Device analyst', squad: 'Device onboarding', active: 6, status: 'Away', csat: 4.6 },
  { name: 'Dev Poluru', role: 'Infra lead', squad: 'Infrastructure', active: 11, status: 'Online', csat: 4.5 },
  { name: 'Priya Poluru', role: 'EMEA lead', squad: 'EMEA overnight', active: 5, status: 'Online', csat: 4.8 },
  { name: 'Tara Poluru', role: 'Escalation manager', squad: 'Platform support', active: 3, status: 'Offline', csat: 4.9 },
];

export const tickets = [
  {
    id: 'HD-4821',
    summary: 'Login loop on billing portal',
    requester: 'Maya Poluru',
    assignee: 'Nila Poluru',
    queue: 'Billing & workflow',
    priority: 'Critical',
    status: 'Open',
    sla: 'Breached',
    ageMinutes: 12,
    created: '2026-09-01T14:18:00',
    updated: '2026-09-01T14:30:00',
    category: 'Access',
    description: 'Users redirected to login after MFA on billing.poluru.example. Affects 14 accounts in shift B.',
  },
  {
    id: 'HD-4817',
    summary: 'VPN profile refresh failing',
    requester: 'Arun Poluru',
    assignee: 'Maya Poluru',
    queue: 'Identity & access',
    priority: 'High',
    status: 'In progress',
    sla: 'At risk',
    ageMinutes: 28,
    created: '2026-09-01T13:52:00',
    updated: '2026-09-01T14:20:00',
    category: 'Access',
    description: 'Corporate VPN profile will not refresh after certificate rotation on gateway 04.',
  },
  {
    id: 'HD-4812',
    summary: 'Asset sync mismatch in CMDB',
    requester: 'Kavya Poluru',
    assignee: 'Dev Poluru',
    queue: 'Infrastructure',
    priority: 'Medium',
    status: 'Open',
    sla: 'OK',
    ageMinutes: 64,
    created: '2026-09-01T12:16:00',
    updated: '2026-09-01T13:40:00',
    category: 'Infrastructure',
    description: '42 laptops missing from CMDB after overnight import from Intune.',
  },
  {
    id: 'HD-4806',
    summary: 'Approval email not delivered',
    requester: 'Riya Poluru',
    assignee: 'Nila Poluru',
    queue: 'Billing & workflow',
    priority: 'Low',
    status: 'Waiting',
    sla: 'OK',
    ageMinutes: 118,
    created: '2026-09-01T11:10:00',
    updated: '2026-09-01T12:05:00',
    category: 'Workflow',
    description: 'Purchase approval for SaaS renewal did not reach manager inbox.',
  },
  {
    id: 'HD-4801',
    summary: 'SSO timeout on staging tenant',
    requester: 'Nikhil Poluru',
    assignee: 'Maya Poluru',
    queue: 'Identity & access',
    priority: 'High',
    status: 'In progress',
    sla: 'At risk',
    ageMinutes: 145,
    created: '2026-09-01T10:05:00',
    updated: '2026-09-01T13:15:00',
    category: 'Access',
    description: 'Azure AD SSO session expires after 4 minutes on staging.poluru.example.',
  },
  {
    id: 'HD-4798',
    summary: 'Printer queue stuck on floor 3',
    requester: 'Hana Poluru',
    assignee: 'Riya Poluru',
    queue: 'Device onboarding',
    priority: 'Medium',
    status: 'Open',
    sla: 'OK',
    ageMinutes: 210,
    created: '2026-09-01T08:30:00',
    updated: '2026-09-01T11:45:00',
    category: 'Hardware',
    description: 'HP fleet printer shows offline for 18 users after firmware push.',
  },
  {
    id: 'HD-4792',
    summary: 'Invoice PDF generation error',
    requester: 'Luca Poluru',
    assignee: 'Nila Poluru',
    queue: 'Billing & workflow',
    priority: 'High',
    status: 'Open',
    sla: 'Breached',
    ageMinutes: 320,
    created: '2026-08-31T16:40:00',
    updated: '2026-09-01T09:20:00',
    category: 'Billing',
    description: 'PDF export fails with 500 for enterprise accounts over $50k ARR.',
  },
  {
    id: 'HD-4788',
    summary: 'Database failover alert noise',
    requester: 'Dev Poluru',
    assignee: 'Dev Poluru',
    queue: 'Infrastructure',
    priority: 'Critical',
    status: 'In progress',
    sla: 'At risk',
    ageMinutes: 380,
    created: '2026-08-31T15:00:00',
    updated: '2026-09-01T14:00:00',
    category: 'Infrastructure',
    description: 'PagerDuty firing on planned failover test. Need runbook update.',
  },
  {
    id: 'HD-4783',
    summary: 'New hire laptop provisioning delay',
    requester: 'Elena Poluru',
    assignee: 'Riya Poluru',
    queue: 'Device onboarding',
    priority: 'Medium',
    status: 'Waiting',
    sla: 'OK',
    ageMinutes: 520,
    created: '2026-08-31T12:00:00',
    updated: '2026-08-31T17:30:00',
    category: 'Hardware',
    description: 'Three September hires waiting on encrypted drive imaging.',
  },
  {
    id: 'HD-4779',
    summary: 'Knowledge article link broken',
    requester: 'Sahana Poluru',
    assignee: 'Priya Poluru',
    queue: 'EMEA overnight',
    priority: 'Low',
    status: 'Resolved',
    sla: 'OK',
    ageMinutes: 600,
    created: '2026-08-31T10:20:00',
    updated: '2026-08-31T14:10:00',
    category: 'Knowledge',
    description: 'VPN setup article returns 404 after portal migration.',
  },
  {
    id: 'HD-4774',
    summary: 'API rate limit on ticket webhook',
    requester: 'Anika Poluru',
    assignee: 'Arjun Poluru',
    queue: 'Platform support',
    priority: 'High',
    status: 'Open',
    sla: 'At risk',
    ageMinutes: 720,
    created: '2026-08-30T18:00:00',
    updated: '2026-09-01T08:00:00',
    category: 'Platform',
    description: 'Integration partner hitting 429 on /v1/tickets webhook endpoint.',
  },
  {
    id: 'HD-4768',
    summary: 'Shared mailbox permissions drift',
    requester: 'Priya Poluru',
    assignee: 'Maya Poluru',
    queue: 'Identity & access',
    priority: 'Medium',
    status: 'In progress',
    sla: 'OK',
    ageMinutes: 900,
    created: '2026-08-30T14:00:00',
    updated: '2026-08-31T16:00:00',
    category: 'Access',
    description: 'support-eu@ mailbox has 6 unexpected full-access delegates.',
  },
  {
    id: 'HD-4761',
    summary: 'CSAT survey not sending',
    requester: 'Tara Poluru',
    assignee: 'Nila Poluru',
    queue: 'Billing & workflow',
    priority: 'Low',
    status: 'Open',
    sla: 'OK',
    ageMinutes: 1080,
    created: '2026-08-29T16:30:00',
    updated: '2026-08-30T10:00:00',
    category: 'Workflow',
    description: 'Post-resolution CSAT emails stopped after template update on 28 Aug.',
  },
];

export const ticketColumns = [
  { key: 'id', label: 'Ticket', sortable: true },
  { key: 'summary', label: 'Summary', sortable: true },
  { key: 'requester', label: 'Requester' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'priority', label: 'Priority', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'sla', label: 'SLA' },
  { key: 'age', label: 'Age' },
];

export const slaPolicies = [
  { name: 'Critical incident', priority: 'Critical', firstResponse: '15m', resolution: '4h', breachRate: '2.1%', status: 'Healthy' },
  { name: 'High priority', priority: 'High', firstResponse: '30m', resolution: '8h', breachRate: '4.8%', status: 'Watch' },
  { name: 'Standard request', priority: 'Medium', firstResponse: '4h', resolution: '2d', breachRate: '1.2%', status: 'Healthy' },
  { name: 'Low priority', priority: 'Low', firstResponse: '8h', resolution: '5d', breachRate: '0.4%', status: 'Healthy' },
  { name: 'VIP customer', priority: 'High', firstResponse: '15m', resolution: '4h', breachRate: '3.6%', status: 'Watch' },
  { name: 'EMEA overnight', priority: 'Medium', firstResponse: '2h', resolution: '1d', breachRate: '1.8%', status: 'Healthy' },
];

export const slaColumns = [
  { key: 'name', label: 'Policy', sortable: true },
  { key: 'priority', label: 'Priority' },
  { key: 'firstResponse', label: 'First response' },
  { key: 'resolution', label: 'Resolution' },
  { key: 'breachRate', label: 'Breach rate' },
  { key: 'status', label: 'Status' },
];

export const knowledgeArticles = [
  { id: 'kb_vpn', title: 'VPN setup for remote analysts', category: 'Access', views: 842, updated: '28 Aug 2026', author: 'Maya Poluru', status: 'Published' },
  { id: 'kb_billing', title: 'Billing portal MFA troubleshooting', category: 'Billing', views: 614, updated: '29 Aug 2026', author: 'Nila Poluru', status: 'Published' },
  { id: 'kb_cmdb', title: 'CMDB asset sync runbook', category: 'Infrastructure', views: 391, updated: '27 Aug 2026', author: 'Dev Poluru', status: 'Published' },
  { id: 'kb_printer', title: 'Fleet printer firmware rollback', category: 'Hardware', views: 256, updated: '25 Aug 2026', author: 'Riya Poluru', status: 'Published' },
  { id: 'kb_webhook', title: 'Ticket webhook rate limits', category: 'Platform', views: 178, updated: '30 Aug 2026', author: 'Arjun Poluru', status: 'Draft' },
  { id: 'kb_csat', title: 'CSAT survey configuration', category: 'Workflow', views: 142, updated: '26 Aug 2026', author: 'Tara Poluru', status: 'Published' },
  { id: 'kb_sso', title: 'SSO session timeout tuning', category: 'Access', views: 503, updated: '31 Aug 2026', author: 'Maya Poluru', status: 'Published' },
];

export const knowledgeColumns = [
  { key: 'title', label: 'Article', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'views', label: 'Views' },
  { key: 'updated', label: 'Updated' },
  { key: 'status', label: 'Status' },
];

export const reports = [
  { name: 'Shift summary — 1 Sep', owner: 'Elena Poluru', updated: '1 Sep 2026', format: 'PDF' },
  { name: 'SLA breach register', owner: 'Tara Poluru', updated: '31 Aug 2026', format: 'CSV' },
  { name: 'Agent workload export', owner: 'Maya Poluru', updated: '30 Aug 2026', format: 'XLSX' },
  { name: 'CSAT trend pack', owner: 'Nila Poluru', updated: '29 Aug 2026', format: 'PDF' },
  { name: 'Queue health dashboard', owner: 'Arjun Poluru', updated: '28 Aug 2026', format: 'PDF' },
  { name: 'Knowledge deflection report', owner: 'Priya Poluru', updated: '27 Aug 2026', format: 'CSV' },
];

export const inboxItems = [
  { label: 'HD-4821 breached first response', description: 'Nila Poluru · Billing', icon: 'alert-triangle' },
  { label: 'Infrastructure queue at risk', description: 'Dev Poluru · 2 breaches', icon: 'clock' },
  { label: 'VPN article updated', description: 'Maya Poluru · Knowledge', icon: 'file' },
  { label: 'Shift handoff due 8 PM', description: 'Elena Poluru · Coverage', icon: 'bell' },
];

export const commandItems = [
  { label: 'Overview', description: 'Support pulse', href: '#/overview', icon: 'home' },
  { label: 'Tickets', description: 'All open requests', href: '#/tickets', icon: 'ticket' },
  { label: 'HD-4821', description: 'Login loop on billing', href: '#/tickets/HD-4821', icon: 'ticket' },
  { label: 'Teams', description: 'Agent roster', href: '#/teams', icon: 'user' },
  { label: 'SLA policies', description: 'Response targets', href: '#/sla', icon: 'clock' },
  { label: 'Knowledge', description: 'Articles and runbooks', href: '#/knowledge', icon: 'file' },
  { label: 'Reports', description: 'Exports and summaries', href: '#/reports', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Requester', description: 'Who needs help' },
  { label: 'Details', description: 'Category and priority' },
  { label: 'Confirm', description: 'Route to queue' },
];

export function buildSearchCatalog() {
  const ticketHits = tickets.map((item) => ({
    label: `${item.id} · ${item.summary}`,
    description: `${item.queue} · ${item.priority}`,
    owner: item.assignee,
    type: 'Ticket',
    href: `#/tickets/${item.id}`,
  }));
  const agentHits = agents.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Agent',
    href: '#/teams',
  }));
  const articleHits = knowledgeArticles.map((item) => ({
    label: item.title,
    description: `${item.category} · ${item.author}`,
    owner: item.author,
    type: 'Article',
    href: '#/knowledge',
  }));
  const queueHits = queues.map((item) => ({
    label: item.name,
    description: `${item.lead} · ${item.open} open`,
    owner: item.lead,
    type: 'Queue',
    href: '#/overview',
  }));
  return [
    ...ticketHits,
    ...agentHits,
    ...articleHits,
    ...queueHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}

export function ticketThreads(ticketId) {
  const ticket = tickets.find((item) => item.id === ticketId);
  if (!ticket) return [];
  return [
    { author: ticket.requester, role: 'Requester', body: ticket.description, time: ticket.created },
    { author: ticket.assignee, role: 'Assignee', body: `Acknowledged. Investigating ${ticket.category.toLowerCase()} issue now.`, time: ticket.updated },
    { author: 'Elena Poluru', role: 'Shift lead', body: 'Keep me posted if SLA moves to breach.', time: '2026-09-01T14:25:00' },
  ];
}
