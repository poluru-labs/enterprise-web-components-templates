export const productName = 'Circuit';
export const productLine = 'Platform';
export const workspaceName = 'Lattice Forge';

export const currentUser = {
  name: 'Nikhil Poluru',
  email: 'nikhil.poluru@latticeforge.example',
  role: 'Head of platform',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 Q3 · week 12',
  timezone: 'America / Chicago',
  close: 'Freeze starts 2 Oct 2026',
};

export const tickerItems = [
  { label: 'Services', value: '11', delta: '1 watch', trend: 'flat', href: '#/services' },
  { label: 'Deploys', value: '6', delta: 'Today', trend: 'up', href: '#/deployments' },
  { label: 'Error budget', value: '84%', delta: 'Billing 62%', trend: 'down', href: '#/health' },
  { label: 'P95', value: '118ms', delta: 'SLO 200ms', trend: 'flat', href: '#/health' },
  { label: 'Owners', value: '10', delta: '2 on-call', trend: 'flat', href: '#/owners' },
  { label: 'Envs', value: '5', delta: 'Prod hold', trend: 'flat', href: '#/environments' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Services', href: '#/services', icon: 'folder' },
  { label: 'Deployments', href: '#/deployments', icon: 'plus' },
  { label: 'Environments', href: '#/environments', icon: 'star' },
  { label: 'Health', href: '#/health', icon: 'check' },
  { label: 'Owners', href: '#/owners', icon: 'user' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Live services', value: '11', hint: 'Auth gateway is the spine', trend: 'flat', trendValue: 'Week 12' },
  { label: 'Deploys today', value: '6', hint: 'Edge mesh 2.1.0 at 09:12', trend: 'up', trendValue: '+2' },
  { label: 'Error budget', value: '84%', hint: 'Billing is the drag', trend: 'down', trendValue: '−6 pts' },
  { label: 'P95 latency', value: '118ms', hint: 'SLO 200ms', trend: 'up', trendValue: '−12ms' },
  { label: 'Failed deploys', value: '1', hint: 'Travel book 0.4.8 rolled back', trend: 'down', trendValue: 'Stage' },
  { label: 'On-call', value: '2', hint: 'Dev and Elena Poluru', trend: 'flat', trendValue: 'Now' },
  { label: 'Env drift', value: '3', hint: 'Sandbox keys stale', trend: 'flat', trendValue: 'Hold' },
  { label: 'Coverage', value: '10', hint: 'Every live service has an owner', trend: 'up', trendValue: '100%' },
];

export const latencyTrend = [164, 158, 152, 148, 141, 136, 132, 128, 124, 122, 120, 118];

export const services = [
  {
    id: 'svc_auth',
    code: 'CIR-100',
    name: 'Auth gateway',
    stack: 'Go',
    env: 'Production',
    envId: 'env_prod',
    version: '1.8.4',
    status: 'Healthy',
    slo: 99.95,
    p95: 42,
    owner: 'Nikhil Poluru',
    squad: 'Identity',
  },
  {
    id: 'svc_mesh',
    code: 'CIR-104',
    name: 'Edge mesh',
    stack: 'Rust',
    env: 'Production',
    envId: 'env_prod',
    version: '2.1.0',
    status: 'Healthy',
    slo: 99.9,
    p95: 18,
    owner: 'Dev Poluru',
    squad: 'Edge',
  },
  {
    id: 'svc_billing',
    code: 'CIR-112',
    name: 'Billing ledger',
    stack: 'Java',
    env: 'Production',
    envId: 'env_prod',
    version: '0.9.12',
    status: 'Watch',
    slo: 99.5,
    p95: 186,
    owner: 'Arjun Poluru',
    squad: 'Money',
  },
  {
    id: 'svc_events',
    code: 'CIR-118',
    name: 'Event bus',
    stack: 'Go',
    env: 'Production',
    envId: 'env_prod',
    version: '3.4.1',
    status: 'Healthy',
    slo: 99.9,
    p95: 28,
    owner: 'Hana Poluru',
    squad: 'Data',
  },
  {
    id: 'svc_checkin',
    code: 'CIR-121',
    name: 'Check-in desk',
    stack: 'Node',
    env: 'Production',
    envId: 'env_prod',
    version: '1.2.6',
    status: 'Healthy',
    slo: 99.5,
    p95: 94,
    owner: 'Elena Poluru',
    squad: 'Apps',
  },
  {
    id: 'svc_travel',
    code: 'CIR-130',
    name: 'Travel book',
    stack: 'Node',
    env: 'Staging',
    envId: 'env_stage',
    version: '0.4.8',
    status: 'Failed',
    slo: 99.0,
    p95: 240,
    owner: 'Priya Poluru',
    squad: 'Apps',
  },
  {
    id: 'svc_civic',
    code: 'CIR-136',
    name: 'Civic 311',
    stack: 'Go',
    env: 'Production',
    envId: 'env_prod',
    version: '1.0.3',
    status: 'Healthy',
    slo: 99.5,
    p95: 76,
    owner: 'Luca Poluru',
    squad: 'Apps',
  },
  {
    id: 'svc_pulse',
    code: 'CIR-142',
    name: 'Pulse health',
    stack: 'Python',
    env: 'Staging',
    envId: 'env_stage',
    version: '0.7.1',
    status: 'Rolling',
    slo: 99.0,
    p95: 110,
    owner: 'Kavya Poluru',
    squad: 'Data',
  },
  {
    id: 'svc_notify',
    code: 'CIR-148',
    name: 'Notify bus',
    stack: 'Go',
    env: 'Production',
    envId: 'env_prod',
    version: '1.4.0',
    status: 'Healthy',
    slo: 99.5,
    p95: 36,
    owner: 'Elena Poluru',
    squad: 'Apps',
  },
  {
    id: 'svc_search',
    code: 'CIR-151',
    name: 'Search index',
    stack: 'Go',
    env: 'Production',
    envId: 'env_prod',
    version: '2.0.1',
    status: 'Healthy',
    slo: 99.9,
    p95: 54,
    owner: 'Hana Poluru',
    squad: 'Data',
  },
  {
    id: 'svc_files',
    code: 'CIR-156',
    name: 'File vault',
    stack: 'Rust',
    env: 'Staging',
    envId: 'env_stage',
    version: '0.3.2',
    status: 'Watch',
    slo: 99.0,
    p95: 160,
    owner: 'Dev Poluru',
    squad: 'Edge',
  },
];

export const serviceColumns = [
  { key: 'code', label: 'Service', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'env', label: 'Env' },
  { key: 'status', label: 'Status' },
  { key: 'version', label: 'Version' },
  { key: 'p95', label: 'P95' },
  { key: 'owner', label: 'Owner' },
];

export const deployments = [
  { id: 'dep_1', serviceId: 'svc_mesh', service: 'Edge mesh', version: '2.1.0', env: 'Production', status: 'Live', by: 'Dev Poluru', started: '09:12', duration: '4m' },
  { id: 'dep_2', serviceId: 'svc_auth', service: 'Auth gateway', version: '1.8.4', env: 'Production', status: 'Live', by: 'Nikhil Poluru', started: '08:04', duration: '6m' },
  { id: 'dep_3', serviceId: 'svc_pulse', service: 'Pulse health', version: '0.7.1', env: 'Staging', status: 'Rolling', by: 'Kavya Poluru', started: '10:22', duration: '11m' },
  { id: 'dep_4', serviceId: 'svc_travel', service: 'Travel book', version: '0.4.8', env: 'Staging', status: 'Failed', by: 'Priya Poluru', started: '07:41', duration: '3m' },
  { id: 'dep_5', serviceId: 'svc_events', service: 'Event bus', version: '3.4.1', env: 'Production', status: 'Live', by: 'Hana Poluru', started: '06:18', duration: '5m' },
  { id: 'dep_6', serviceId: 'svc_billing', service: 'Billing ledger', version: '0.9.12', env: 'Production', status: 'Watch', by: 'Arjun Poluru', started: '05:55', duration: '9m' },
  { id: 'dep_7', serviceId: 'svc_checkin', service: 'Check-in desk', version: '1.2.6', env: 'Production', status: 'Live', by: 'Elena Poluru', started: 'Yesterday', duration: '7m' },
  { id: 'dep_8', serviceId: 'svc_civic', service: 'Civic 311', version: '1.0.3', env: 'Production', status: 'Live', by: 'Luca Poluru', started: 'Yesterday', duration: '5m' },
  { id: 'dep_9', serviceId: 'svc_auth', service: 'Auth gateway', version: '1.8.3', env: 'Staging', status: 'Complete', by: 'Nikhil Poluru', started: '15 Sep', duration: '6m' },
  { id: 'dep_10', serviceId: 'svc_mesh', service: 'Edge mesh', version: '2.0.9', env: 'Sandbox', status: 'Complete', by: 'Dev Poluru', started: '14 Sep', duration: '4m' },
];

export const deploymentColumns = [
  { key: 'service', label: 'Service', sortable: true },
  { key: 'version', label: 'Version' },
  { key: 'env', label: 'Env' },
  { key: 'status', label: 'Status' },
  { key: 'by', label: 'By' },
  { key: 'started', label: 'Started' },
  { key: 'duration', label: 'Duration' },
];

export const environments = [
  { id: 'env_prod', name: 'Production', region: 'us-east', services: 8, status: 'Live', freeze: '2 Oct', cluster: 'forge-a', owner: 'Nikhil Poluru' },
  { id: 'env_stage', name: 'Staging', region: 'us-east', services: 8, status: 'Live', freeze: '—', cluster: 'forge-b', owner: 'Dev Poluru' },
  { id: 'env_sand', name: 'Sandbox', region: 'us-east', services: 6, status: 'Watch', freeze: '—', cluster: 'forge-c', owner: 'Hana Poluru' },
  { id: 'env_edge', name: 'Edge', region: 'anycast', services: 2, status: 'Live', freeze: '2 Oct', cluster: 'mesh-1', owner: 'Dev Poluru' },
  { id: 'env_dev', name: 'Dev', region: 'us-central', services: 8, status: 'Open', freeze: '—', cluster: 'forge-d', owner: 'Elena Poluru' },
];

export const environmentColumns = [
  { key: 'name', label: 'Environment', sortable: true },
  { key: 'region', label: 'Region' },
  { key: 'services', label: 'Services' },
  { key: 'status', label: 'Status' },
  { key: 'cluster', label: 'Cluster' },
  { key: 'owner', label: 'Owner' },
];

export const endpoints = [
  { id: 'ep_1', serviceId: 'svc_auth', service: 'Auth gateway', route: 'POST /v1/session', p95: 42, errors: 0.02, slo: 99.95, status: 'Healthy', owner: 'Nikhil Poluru' },
  { id: 'ep_2', serviceId: 'svc_auth', service: 'Auth gateway', route: 'GET /v1/whoami', p95: 18, errors: 0.01, slo: 99.95, status: 'Healthy', owner: 'Nikhil Poluru' },
  { id: 'ep_3', serviceId: 'svc_billing', service: 'Billing ledger', route: 'POST /v1/invoice', p95: 186, errors: 1.8, slo: 99.5, status: 'Watch', owner: 'Arjun Poluru' },
  { id: 'ep_4', serviceId: 'svc_billing', service: 'Billing ledger', route: 'GET /v1/ledger', p95: 124, errors: 0.6, slo: 99.5, status: 'Watch', owner: 'Arjun Poluru' },
  { id: 'ep_5', serviceId: 'svc_mesh', service: 'Edge mesh', route: 'GET /healthz', p95: 8, errors: 0.0, slo: 99.9, status: 'Healthy', owner: 'Dev Poluru' },
  { id: 'ep_6', serviceId: 'svc_events', service: 'Event bus', route: 'POST /v1/emit', p95: 28, errors: 0.04, slo: 99.9, status: 'Healthy', owner: 'Hana Poluru' },
  { id: 'ep_7', serviceId: 'svc_travel', service: 'Travel book', route: 'GET /v1/trips', p95: 240, errors: 4.2, slo: 99.0, status: 'Failed', owner: 'Priya Poluru' },
  { id: 'ep_8', serviceId: 'svc_checkin', service: 'Check-in desk', route: 'POST /v1/scan', p95: 94, errors: 0.3, slo: 99.5, status: 'Healthy', owner: 'Elena Poluru' },
  { id: 'ep_9', serviceId: 'svc_civic', service: 'Civic 311', route: 'POST /v1/request', p95: 76, errors: 0.2, slo: 99.5, status: 'Healthy', owner: 'Luca Poluru' },
  { id: 'ep_10', serviceId: 'svc_pulse', service: 'Pulse health', route: 'GET /v1/score', p95: 110, errors: 0.8, slo: 99.0, status: 'Rolling', owner: 'Kavya Poluru' },
];

export const endpointColumns = [
  { key: 'service', label: 'Service', sortable: true },
  { key: 'route', label: 'Route' },
  { key: 'p95', label: 'P95' },
  { key: 'errors', label: 'Errors' },
  { key: 'slo', label: 'SLO' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Nikhil Poluru', role: 'Head of platform', squad: 'Identity', rating: 5, score: 94, book: 2 },
  { name: 'Dev Poluru', role: 'Edge lead', squad: 'Edge', rating: 5, score: 92, book: 2 },
  { name: 'Arjun Poluru', role: 'Billing owner', squad: 'Money', rating: 4, score: 78, book: 1 },
  { name: 'Hana Poluru', role: 'Data plane', squad: 'Data', rating: 5, score: 90, book: 2 },
  { name: 'Elena Poluru', role: 'Apps on-call', squad: 'Apps', rating: 5, score: 88, book: 2 },
  { name: 'Priya Poluru', role: 'Travel book', squad: 'Apps', rating: 4, score: 71, book: 1 },
  { name: 'Kavya Poluru', role: 'Pulse owner', squad: 'Data', rating: 4, score: 82, book: 1 },
  { name: 'Luca Poluru', role: 'Civic 311', squad: 'Apps', rating: 4, score: 86, book: 1 },
  { name: 'Rohan Poluru', role: 'Release train', squad: 'Platform', rating: 4, score: 84, book: 6 },
  { name: 'Sahana Poluru', role: 'SRE', squad: 'Platform', rating: 5, score: 91, book: 11 },
];

export const cadence = [
  { label: 'Edge mesh 2.1.0 live', description: 'Dev Poluru · Production', timestamp: '16 Sep', icon: 'check', status: 'Today' },
  { label: 'Billing error budget', description: 'Arjun Poluru · 62%', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Today' },
  { label: 'Pulse 0.7.1 rolling', description: 'Kavya Poluru · Staging', timestamp: '16 Sep', icon: 'clock', status: 'Next' },
  { label: 'Travel book rollback', description: 'Priya Poluru · 0.4.8', timestamp: '16 Sep', icon: 'folder', status: 'Today' },
  { label: 'Prod freeze', description: 'Rohan Poluru · 2 Oct', timestamp: '2 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Sandbox key rotate', description: 'Hana Poluru · 3 services', timestamp: '18 Sep', icon: 'user', status: 'Scheduled' },
];

export const activity = [
  { label: 'Mesh 2.1.0 promoted', description: 'Dev Poluru · 09:12', timestamp: '16 Sep', icon: 'check', status: 'Done' },
  { label: 'Invoice p95 186ms', description: 'Arjun Poluru · billing', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Watch' },
  { label: 'Travel book failed', description: 'Priya Poluru · staging', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Watch' },
  { label: 'Auth 1.8.4 live', description: 'Nikhil Poluru · 08:04', timestamp: '16 Sep', icon: 'check', status: 'Done' },
  { label: 'Sandbox keys stale', description: 'Hana Poluru · 3 services', timestamp: '15 Sep', icon: 'folder', status: 'Watch' },
  { label: 'Civic 311 1.0.3', description: 'Luca Poluru · yesterday', timestamp: '15 Sep', icon: 'check', status: 'Done' },
];

export const reports = [
  { name: 'Deploy pack', owner: 'Rohan Poluru', updated: '16 Sep 2026', format: 'CSV' },
  { name: 'SLO board', owner: 'Sahana Poluru', updated: '16 Sep 2026', format: 'XLSX' },
  { name: 'Owner map', owner: 'Nikhil Poluru', updated: '15 Sep 2026', format: 'PDF' },
  { name: 'Env drift', owner: 'Hana Poluru', updated: '16 Sep 2026', format: 'XLSX' },
  { name: 'Error budget', owner: 'Arjun Poluru', updated: '16 Sep 2026', format: 'CSV' },
  { name: 'Post-incident appendix', owner: 'Dev Poluru', updated: '12 Sep 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Billing error budget at 62%', description: 'Arjun Poluru · POST /v1/invoice', icon: 'alert-triangle' },
  { label: 'Travel book 0.4.8 failed', description: 'Priya Poluru · staging', icon: 'clock' },
  { label: 'Edge mesh 2.1.0 is live', description: 'Dev Poluru · production', icon: 'check' },
  { label: 'Sandbox keys are stale', description: 'Hana Poluru · 3 services', icon: 'folder' },
];

export const commandItems = [
  { label: 'Overview', description: 'Platform pulse', href: '#/overview', icon: 'home' },
  { label: 'Auth gateway', description: 'Healthy · 1.8.4', href: '#/service/svc_auth', icon: 'folder' },
  { label: 'Deployments', description: '6 today', href: '#/deployments', icon: 'plus' },
  { label: 'Health', description: 'P95 118ms', href: '#/health', icon: 'check' },
  { label: 'Owners', description: '10 covered', href: '#/owners', icon: 'user' },
  { label: 'Environments', description: '5 clusters', href: '#/environments', icon: 'star' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Service', description: 'Name and stack' },
  { label: 'Env', description: 'Target and SLO' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const envTree = [
  {
    id: 'live',
    label: 'Live',
    children: [
      { id: 'prod', label: 'Production', href: '#/environments' },
      { id: 'edge', label: 'Edge', href: '#/environments' },
      { id: 'stage', label: 'Staging', href: '#/environments' },
    ],
  },
  {
    id: 'hold',
    label: 'Hold',
    children: [
      { id: 'sand', label: 'Sandbox', href: '#/environments' },
      { id: 'dev', label: 'Dev', href: '#/environments' },
    ],
  },
];

export const policies = [
  { id: 'po_slo', name: 'Error budget page', trigger: 'Budget under 70%', owner: 'Sahana Poluru', items: 1, status: 'Active', steps: 3 },
  { id: 'po_freeze', name: 'Prod freeze', trigger: '2 Oct through close', owner: 'Rohan Poluru', items: 8, status: 'Active', steps: 2 },
  { id: 'po_rollback', name: 'Auto rollback', trigger: 'Error rate over 2%', owner: 'Dev Poluru', items: 1, status: 'Active', steps: 3 },
  { id: 'po_owner', name: 'Owner required', trigger: 'New service without page', owner: 'Nikhil Poluru', items: 0, status: 'Active', steps: 2 },
  { id: 'po_key', name: 'Key rotate', trigger: 'Sandbox secrets over 30 days', owner: 'Hana Poluru', items: 3, status: 'Watch', steps: 2 },
  { id: 'po_canary', name: 'Canary hold', trigger: 'P95 over SLO for 10 minutes', owner: 'Elena Poluru', items: 0, status: 'Draft', steps: 3 },
];

export const apiSnippet = `GET /v1/services/svc_auth
Authorization: Bearer circuit_live_****

{
  "id": "svc_auth",
  "code": "CIR-100",
  "name": "Auth gateway",
  "status": "Healthy",
  "owner": "Nikhil Poluru"
}`;

export function buildSearchCatalog() {
  const serviceHits = services.map((item) => ({
    label: item.name,
    description: `${item.code} · ${item.status}`,
    owner: item.owner,
    type: 'Service',
    href: `#/service/${item.id}`,
  }));
  const deployHits = deployments.map((item) => ({
    label: `${item.service} ${item.version}`,
    description: `${item.env} · ${item.status}`,
    owner: item.by,
    type: 'Deploy',
    href: '#/deployments',
  }));
  const envHits = environments.map((item) => ({
    label: item.name,
    description: `${item.region} · ${item.status}`,
    owner: item.owner,
    type: 'Environment',
    href: '#/environments',
  }));
  const epHits = endpoints.map((item) => ({
    label: item.route,
    description: `${item.service} · ${item.status}`,
    owner: item.owner,
    type: 'Endpoint',
    href: '#/health',
  }));
  const ownerHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Owner',
    href: '#/owners',
  }));
  const reportHits = reports.map((item) => ({
    label: item.name,
    description: `${item.format} · ${item.updated}`,
    owner: item.owner,
    type: 'Report',
    href: '#/reports',
  }));
  return [
    ...serviceHits,
    ...deployHits,
    ...envHits,
    ...epHits,
    ...ownerHits,
    ...reportHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
