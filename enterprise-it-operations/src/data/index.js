export const productName = 'TechStar';
export const productLine = 'IT Operations';
export const workspaceName = 'Northline Systems';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@northline.example',
  role: 'Operations manager',
};

export const workspace = {
  name: workspaceName,
  period: 'Week of 16 Sep 2026',
  timezone: 'America / Chicago',
  freeze: 'CAB lock 16 Sep 16:00',
};

export const tickerItems = [
  { label: 'Identity', value: '99.95%', delta: 'SLO hold', trend: 'flat', href: '#/availability' },
  { label: 'Open P1', value: '1', delta: 'SSO', trend: 'down', href: '#/incidents' },
  { label: 'Changes', value: '3', delta: 'Tonight', trend: 'flat', href: '#/changes' },
  { label: 'Chicago', value: '98%', delta: 'Healthy', trend: 'up', href: '#/health' },
  { label: 'Assets', value: '412', delta: '+6', trend: 'up', href: '#/assets' },
  { label: 'On call', value: 'Sahana', delta: 'Primary', trend: 'flat', href: '#/oncall' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Assets', href: '#/assets', icon: 'folder' },
  { label: 'Incidents', href: '#/incidents', icon: 'alert-triangle' },
  { label: 'Changes', href: '#/changes', icon: 'edit' },
  { label: 'Health', href: '#/health', icon: 'refresh' },
  { label: 'Availability', href: '#/availability', icon: 'check-circle' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Open incidents', value: '11', hint: '1 P1 · 3 P2 · 7 P3', trend: 'down', trendValue: '−2 today' },
  { label: 'Changes tonight', value: '3', hint: 'CAB approved 2 of 3', trend: 'flat', trendValue: '22:00 CT' },
  { label: 'Estate health', value: '96%', hint: '5 sites · 412 CIs', trend: 'up', trendValue: '+1.2 pts' },
  { label: 'Service SLO', value: '99.94%', hint: 'Identity still inside error budget', trend: 'flat', trendValue: 'Hold' },
  { label: 'MTTR', value: '47m', hint: 'Trailing 30 days', trend: 'up', trendValue: '−8m' },
  { label: 'Assets in CMDB', value: '412', hint: '6 registered this week', trend: 'up', trendValue: '+6' },
  { label: 'On-call ack', value: '2.1m', hint: 'Sahana Poluru primary', trend: 'up', trendValue: '−40s' },
  { label: 'Maintenance', value: '1', hint: 'Dallas DB 22:00–00:30', trend: 'flat', trendValue: 'Window' },
];

export const healthTrend = [91.2, 92.0, 93.4, 93.1, 94.6, 95.0, 94.8, 95.6, 95.9, 96.1, 95.8, 96.4];
export const availabilityTrend = [99.9, 99.88, 99.91, 99.94, 99.9, 99.93, 99.95, 99.92, 99.96, 99.94, 99.95, 99.94];

export const people = [
  { name: 'Mira Poluru', role: 'Operations manager', squad: 'Command', rating: 5, score: 96, site: 'Chicago' },
  { name: 'Arjun Poluru', role: 'Incident commander', squad: 'Incidents', rating: 5, score: 94, site: 'Chicago' },
  { name: 'Kavya Poluru', role: 'Change manager', squad: 'CAB', rating: 5, score: 91, site: 'Dallas' },
  { name: 'Nikhil Poluru', role: 'Infrastructure lead', squad: 'Estate', rating: 4, score: 88, site: 'Phoenix' },
  { name: 'Elena Poluru', role: 'Identity owner', squad: 'Services', rating: 5, score: 93, site: 'Chicago' },
  { name: 'Rohan Poluru', role: 'Network lead', squad: 'Estate', rating: 4, score: 86, site: 'Chicago' },
  { name: 'Priya Poluru', role: 'Database lead', squad: 'Estate', rating: 5, score: 90, site: 'Dallas' },
  { name: 'Hana Poluru', role: 'Cloud lead', squad: 'Estate', rating: 4, score: 84, site: 'Ashburn' },
  { name: 'Luca Poluru', role: 'Endpoint lead', squad: 'Workplace', rating: 4, score: 81, site: 'Austin' },
  { name: 'Sahana Poluru', role: 'Primary on-call', squad: 'SRE', rating: 5, score: 92, site: 'Chicago' },
  { name: 'Dev Poluru', role: 'Platform SRE', squad: 'SRE', rating: 5, score: 89, site: 'Chicago' },
  { name: 'Anika Poluru', role: 'Security ops', squad: 'Security', rating: 4, score: 87, site: 'Austin' },
];

export const assets = [
  {
    id: 'ci_sso',
    name: 'id-sso-prod-01',
    type: 'Server',
    class: 'Application',
    site: 'Chicago',
    env: 'Production',
    owner: 'Elena Poluru',
    status: 'Degraded',
    health: 72,
    updated: '16 Sep 2026',
    purpose: 'Corporate SSO and MFA broker',
    ip: '10.12.4.21',
    os: 'RHEL 9.4',
  },
  {
    id: 'ci_payapi',
    name: 'pay-api-eks',
    type: 'Cluster',
    class: 'Platform',
    site: 'Chicago',
    env: 'Production',
    owner: 'Dev Poluru',
    status: 'Healthy',
    health: 96,
    updated: '16 Sep 2026',
    purpose: 'Payments API on EKS',
    ip: '10.18.2.0/24',
    os: 'Bottlerocket',
  },
  {
    id: 'ci_ledger',
    name: 'db-ledger-03',
    type: 'Database',
    class: 'Data',
    site: 'Dallas',
    env: 'Production',
    owner: 'Priya Poluru',
    status: 'Maintenance',
    health: 88,
    updated: '16 Sep 2026',
    purpose: 'Ledger primary, expansion tonight',
    ip: '10.40.8.13',
    os: 'PostgreSQL 16',
  },
  {
    id: 'ci_edge',
    name: 'lb-edge-west',
    type: 'Load balancer',
    class: 'Network',
    site: 'Phoenix',
    env: 'Production',
    owner: 'Rohan Poluru',
    status: 'Healthy',
    health: 94,
    updated: '15 Sep 2026',
    purpose: 'Public edge for west traffic',
    ip: '10.55.1.8',
    os: 'F5 TMOS',
  },
  {
    id: 'ci_backup',
    name: 'sto-backup-east',
    type: 'Storage',
    class: 'Data',
    site: 'Ashburn',
    env: 'DR',
    owner: 'Hana Poluru',
    status: 'Watch',
    health: 81,
    updated: '16 Sep 2026',
    purpose: 'Nightly backup target',
    ip: '10.80.3.40',
    os: 'NetApp ONTAP',
  },
  {
    id: 'ci_citrix',
    name: 'vm-citrix-12',
    type: 'Virtual machine',
    class: 'Workplace',
    site: 'Austin',
    env: 'Corporate',
    owner: 'Luca Poluru',
    status: 'Healthy',
    health: 90,
    updated: '15 Sep 2026',
    purpose: 'VDI broker for campus',
    ip: '10.22.9.12',
    os: 'Windows Server 2022',
  },
  {
    id: 'ci_core',
    name: 'net-core-sw7',
    type: 'Switch',
    class: 'Network',
    site: 'Chicago',
    env: 'Production',
    owner: 'Rohan Poluru',
    status: 'Healthy',
    health: 97,
    updated: '14 Sep 2026',
    purpose: 'DC core fabric',
    ip: '10.12.0.7',
    os: 'NX-OS',
  },
  {
    id: 'ci_hris',
    name: 'app-hris',
    type: 'SaaS',
    class: 'Application',
    site: 'SaaS',
    env: 'Production',
    owner: 'Sahana Poluru',
    status: 'Healthy',
    health: 93,
    updated: '16 Sep 2026',
    purpose: 'HRIS tenant',
    ip: 'saas',
    os: 'Workday',
  },
  {
    id: 'ci_vpn',
    name: 'vpn-gw-chi',
    type: 'Gateway',
    class: 'Network',
    site: 'Chicago',
    env: 'Production',
    owner: 'Anika Poluru',
    status: 'Healthy',
    health: 95,
    updated: '16 Sep 2026',
    purpose: 'Remote access concentrator',
    ip: '10.12.1.4',
    os: 'PAN-OS',
  },
  {
    id: 'ci_mail',
    name: 'mail-exch-02',
    type: 'Server',
    class: 'Application',
    site: 'Dallas',
    env: 'Production',
    owner: 'Luca Poluru',
    status: 'Healthy',
    health: 98,
    updated: '15 Sep 2026',
    purpose: 'Hybrid mail connector',
    ip: '10.40.2.22',
    os: 'Exchange SE',
  },
];

export const assetColumns = [
  { key: 'name', label: 'CI', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'site', label: 'Site', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'health', label: 'Health' },
  { key: 'updated', label: 'Updated' },
];

export const catalogTree = [
  {
    id: 'prod',
    label: 'Production',
    children: [
      { id: 'chicago', label: 'Chicago' },
      { id: 'dallas', label: 'Dallas' },
      { id: 'phoenix', label: 'Phoenix' },
    ],
  },
  {
    id: 'dr',
    label: 'DR',
    children: [{ id: 'ashburn', label: 'Ashburn' }],
  },
  {
    id: 'corp',
    label: 'Corporate',
    children: [
      { id: 'austin', label: 'Austin' },
      { id: 'saas', label: 'SaaS' },
    ],
  },
];

export const incidents = [
  {
    id: 'INC-10482',
    title: 'SSO broker timeouts on id-sso-prod-01',
    owner: 'Arjun Poluru',
    service: 'Identity',
    ci: 'id-sso-prod-01',
    severity: 'P1',
    status: 'Investigating',
    since: '16 Sep 08:12',
    sla: '38m left',
    note: 'MFA round-trip above 4s. Elena Poluru on the call.',
  },
  {
    id: 'INC-10479',
    title: 'Payments API p95 above 800ms',
    owner: 'Dev Poluru',
    service: 'Payments',
    ci: 'pay-api-eks',
    severity: 'P2',
    status: 'Mitigated',
    since: '15 Sep 21:40',
    sla: 'Hold',
    note: 'Rolled a replica set. Watching error budget.',
  },
  {
    id: 'INC-10471',
    title: 'Citrix session drops on campus',
    owner: 'Luca Poluru',
    service: 'Workplace',
    ci: 'vm-citrix-12',
    severity: 'P3',
    status: 'Open',
    since: '15 Sep 14:05',
    sla: '6h left',
    note: 'Broker CPU spiked after the image refresh.',
  },
  {
    id: 'INC-10468',
    title: 'Backup job missed RPO on east vault',
    owner: 'Hana Poluru',
    service: 'Backup',
    ci: 'sto-backup-east',
    severity: 'P2',
    status: 'Open',
    since: '16 Sep 02:10',
    sla: '2h left',
    note: 'ONTAP volume full at 94%. Expansion in CHG-2201.',
  },
  {
    id: 'INC-10462',
    title: 'VPN portal certificate warning',
    owner: 'Anika Poluru',
    service: 'Remote access',
    ci: 'vpn-gw-chi',
    severity: 'P3',
    status: 'Resolved',
    since: '14 Sep 11:20',
    sla: 'Met',
    note: 'Reissued the portal cert. Closed after 41 minutes.',
  },
  {
    id: 'INC-10458',
    title: 'Dallas core link flap',
    owner: 'Rohan Poluru',
    service: 'Network',
    ci: 'net-core-sw7',
    severity: 'P2',
    status: 'Mitigated',
    since: '13 Sep 19:04',
    sla: 'Hold',
    note: 'Provider ticket still open. Traffic on the secondary.',
  },
  {
    id: 'INC-10451',
    title: 'HRIS SSO mapping failed for new hires',
    owner: 'Sahana Poluru',
    service: 'HRIS',
    ci: 'app-hris',
    severity: 'P3',
    status: 'Open',
    since: '15 Sep 09:30',
    sla: '1d left',
    note: 'Group claim missing department. Vendor case 88321.',
  },
  {
    id: 'INC-10444',
    title: 'Mail connector retry backlog',
    owner: 'Luca Poluru',
    service: 'Email',
    ci: 'mail-exch-02',
    severity: 'P4',
    status: 'Resolved',
    since: '12 Sep 16:12',
    sla: 'Met',
    note: 'Queue drained after the hybrid connector restart.',
  },
];

export const incidentColumns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'title', label: 'Incident', sortable: true },
  { key: 'severity', label: 'Sev' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'since', label: 'Opened' },
  { key: 'sla', label: 'SLA' },
];

export const incidentTimeline = [
  { title: 'Detected', description: 'Synthetic probe failed 3 times', timestamp: '08:12', status: 'complete' },
  { title: 'Acked', description: 'Sahana Poluru acknowledged in 1m 40s', timestamp: '08:14', status: 'complete' },
  { title: 'Bridge', description: 'Arjun Poluru opened the P1 bridge', timestamp: '08:18', status: 'complete' },
  { title: 'Mitigate', description: 'Fail SSO reads to id-sso-prod-02', timestamp: '08:41', status: 'current' },
  { title: 'Resolve', description: 'Root cause and close', timestamp: '—', status: 'upcoming' },
];

export const changes = [
  {
    id: 'CHG-2201',
    title: 'Expand Dallas ledger cluster',
    owner: 'Priya Poluru',
    ci: 'db-ledger-03',
    type: 'Normal',
    status: 'Approved',
    window: '16 Sep 22:00–00:30',
    risk: 'Medium',
    cab: 'Kavya Poluru',
  },
  {
    id: 'CHG-2198',
    title: 'Rotate west edge certificates',
    owner: 'Rohan Poluru',
    ci: 'lb-edge-west',
    type: 'Standard',
    status: 'Scheduled',
    window: '16 Sep 23:00–23:40',
    risk: 'Low',
    cab: 'Auto',
  },
  {
    id: 'CHG-2194',
    title: 'Patch EKS node group',
    owner: 'Dev Poluru',
    ci: 'pay-api-eks',
    type: 'Normal',
    status: 'In window',
    window: '15 Sep 22:00–01:00',
    risk: 'Medium',
    cab: 'Kavya Poluru',
  },
  {
    id: 'CHG-2188',
    title: 'Raise ONTAP volume on east vault',
    owner: 'Hana Poluru',
    ci: 'sto-backup-east',
    type: 'Normal',
    status: 'Draft',
    window: '17 Sep 02:00–03:00',
    risk: 'Low',
    cab: 'Pending',
  },
  {
    id: 'CHG-2181',
    title: 'Citrix image 2409 rollout',
    owner: 'Luca Poluru',
    ci: 'vm-citrix-12',
    type: 'Normal',
    status: 'Closed',
    window: '12 Sep 20:00–23:00',
    risk: 'Medium',
    cab: 'Kavya Poluru',
  },
  {
    id: 'CHG-2176',
    title: 'VPN portal certificate reissue',
    owner: 'Anika Poluru',
    ci: 'vpn-gw-chi',
    type: 'Standard',
    status: 'Closed',
    window: '14 Sep 11:00–11:30',
    risk: 'Low',
    cab: 'Auto',
  },
  {
    id: 'CHG-2170',
    title: 'Core switch firmware NX-OS 10.4',
    owner: 'Rohan Poluru',
    ci: 'net-core-sw7',
    type: 'Normal',
    status: 'Watch',
    window: '20 Sep 01:00–03:00',
    risk: 'High',
    cab: 'Kavya Poluru',
  },
  {
    id: 'CHG-2164',
    title: 'HRIS claim mapping for department',
    owner: 'Sahana Poluru',
    ci: 'app-hris',
    type: 'Standard',
    status: 'Approved',
    window: '17 Sep 10:00–10:30',
    risk: 'Low',
    cab: 'Elena Poluru',
  },
];

export const changeColumns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'title', label: 'Change', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'window', label: 'Window' },
  { key: 'risk', label: 'Risk' },
];

export const changeSteps = [
  { label: 'Request', description: 'Scope and CI' },
  { label: 'CAB', description: 'Risk and window' },
  { label: 'Implement', description: 'Change window' },
  { label: 'Close', description: 'Verify and PIR' },
];

export const createSteps = [
  { label: 'Service', description: 'What is affected' },
  { label: 'Impact', description: 'Severity and CI' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const sites = [
  { id: 'chi', name: 'Chicago DC', owner: 'Nikhil Poluru', health: 98, cpu: 61, mem: 70, disk: 54, net: 22, status: 'Healthy' },
  { id: 'dal', name: 'Dallas DC', owner: 'Priya Poluru', health: 94, cpu: 74, mem: 81, disk: 88, net: 31, status: 'Watch' },
  { id: 'phx', name: 'Phoenix edge', owner: 'Rohan Poluru', health: 91, cpu: 48, mem: 55, disk: 41, net: 64, status: 'Watch' },
  { id: 'ash', name: 'Ashburn DR', owner: 'Hana Poluru', health: 99, cpu: 22, mem: 28, disk: 67, net: 12, status: 'Healthy' },
  { id: 'aus', name: 'Austin campus', owner: 'Luca Poluru', health: 96, cpu: 39, mem: 44, disk: 36, net: 18, status: 'Healthy' },
];

export const services = [
  { id: 'svc_id', name: 'Identity / SSO', owner: 'Elena Poluru', slo: 99.95, actual: 99.95, budget: 72, status: 'In service', ci: 'id-sso-prod-01' },
  { id: 'svc_pay', name: 'Payments API', owner: 'Dev Poluru', slo: 99.9, actual: 99.92, budget: 81, status: 'In service', ci: 'pay-api-eks' },
  { id: 'svc_mail', name: 'Corporate email', owner: 'Luca Poluru', slo: 99.9, actual: 99.99, budget: 94, status: 'In service', ci: 'mail-exch-02' },
  { id: 'svc_vpn', name: 'Remote access', owner: 'Anika Poluru', slo: 99.8, actual: 99.97, budget: 88, status: 'In service', ci: 'vpn-gw-chi' },
  { id: 'svc_hris', name: 'HRIS', owner: 'Sahana Poluru', slo: 99.5, actual: 99.9, budget: 90, status: 'In service', ci: 'app-hris' },
  { id: 'svc_vdi', name: 'Campus VDI', owner: 'Luca Poluru', slo: 99.5, actual: 99.4, budget: 41, status: 'Watch', ci: 'vm-citrix-12' },
];

export const maintenance = [
  { id: 'mw1', title: 'Dallas ledger expansion', owner: 'Priya Poluru', window: '16 Sep 22:00–00:30', site: 'Dallas', status: 'Tonight', impact: 'Payments writes queued 8 minutes' },
  { id: 'mw2', title: 'West edge cert rotate', owner: 'Rohan Poluru', window: '16 Sep 23:00–23:40', site: 'Phoenix', status: 'Tonight', impact: 'Brief TLS renegotiation' },
  { id: 'mw3', title: 'HRIS claim mapping', owner: 'Sahana Poluru', window: '17 Sep 10:00–10:30', site: 'SaaS', status: 'Next', impact: 'New-hire SSO only' },
  { id: 'mw4', title: 'Core firmware 10.4', owner: 'Rohan Poluru', window: '20 Sep 01:00–03:00', site: 'Chicago', status: 'Scheduled', impact: 'Single core switch reload' },
];

export const reviews = [
  { label: 'P1 bridge', description: 'Arjun Poluru · SSO timeouts', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Today' },
  { label: 'CAB lock', description: 'Kavya Poluru · 16:00 freeze', timestamp: '16 Sep', icon: 'lock', status: 'Today' },
  { label: 'Dallas expansion', description: 'Priya Poluru · CHG-2201', timestamp: '16 Sep', icon: 'clock', status: 'Next' },
  { label: 'Weekly ops review', description: 'Mira Poluru · estate 96%', timestamp: '15 Sep', icon: 'check', status: 'Done' },
  { label: 'Backup RPO check', description: 'Hana Poluru · east vault', timestamp: '14 Sep', icon: 'folder', status: 'Done' },
];

export const inboxItems = [
  { label: 'P1 SSO still open', description: 'Arjun Poluru · 38m SLA left', icon: 'alert-triangle' },
  { label: 'CAB lock at 16:00', description: 'Kavya Poluru · 3 changes tonight', icon: 'clock' },
  { label: 'Backup volume 94% full', description: 'Hana Poluru · Ashburn', icon: 'warning' },
  { label: 'Sahana Poluru on call', description: 'Ack 2.1m · secondary Dev Poluru', icon: 'bell' },
];

export const commandItems = [
  { label: 'Overview', description: 'Operations pulse', href: '#/overview', icon: 'home' },
  { label: 'Incidents', description: 'Open queue', href: '#/incidents', icon: 'alert-triangle' },
  { label: 'P1 SSO', description: 'INC-10482', href: '#/incident/INC-10482', icon: 'alert-triangle' },
  { label: 'Assets', description: 'CMDB', href: '#/assets', icon: 'folder' },
  { label: 'Changes', description: 'CAB board', href: '#/changes', icon: 'edit' },
  { label: 'Health', description: 'Five sites', href: '#/health', icon: 'refresh' },
  { label: 'Availability', description: 'Service SLOs', href: '#/availability', icon: 'check-circle' },
  { label: 'On-call', description: 'Sahana Poluru', href: '#/oncall', icon: 'user' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const oncall = [
  { seat: 'Primary', name: 'Sahana Poluru', until: '17 Sep 09:00', phone: 'Bridge A' },
  { seat: 'Secondary', name: 'Dev Poluru', until: '17 Sep 09:00', phone: 'Bridge A' },
  { seat: 'Manager', name: 'Mira Poluru', until: 'Week', phone: 'Bridge B' },
  { seat: 'Security', name: 'Anika Poluru', until: 'Week', phone: 'SecOps' },
];

export const metricRows = [
  { metric: 'Incident SLA met', actual: '94%', target: '95%', variance: '−1 pt', status: 'Watch' },
  { metric: 'Change success', actual: '98%', target: '97%', variance: '+1 pt', status: 'On track' },
  { metric: 'Backup RPO', actual: '18h', target: '24h', variance: '−6h', status: 'On track' },
  { metric: 'Asset coverage', actual: '99%', target: '98%', variance: '+1 pt', status: 'On track' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/cmdb/ci_sso
Authorization: Bearer ts_live_****

{
  "id": "ci_sso",
  "name": "id-sso-prod-01",
  "health": 72,
  "owner": "Elena Poluru"
}`;

export function buildSearchCatalog() {
  const assetHits = assets.map((item) => ({
    label: item.name,
    description: `${item.purpose} · ${item.owner}`,
    owner: item.owner,
    type: 'Asset',
    href: `#/asset/${item.id}`,
  }));
  const incidentHits = incidents.map((item) => ({
    label: item.id,
    description: `${item.title} · ${item.severity}`,
    owner: item.owner,
    type: 'Incident',
    href: `#/incident/${item.id}`,
  }));
  const changeHits = changes.map((item) => ({
    label: item.id,
    description: `${item.title} · ${item.status}`,
    owner: item.owner,
    type: 'Change',
    href: `#/change/${item.id}`,
  }));
  const serviceHits = services.map((item) => ({
    label: item.name,
    description: `${item.actual}% vs ${item.slo}% SLO`,
    owner: item.owner,
    type: 'Service',
    href: '#/availability',
  }));
  const peopleHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Person',
    href: '#/oncall',
  }));
  return [
    ...assetHits,
    ...incidentHits,
    ...changeHits,
    ...serviceHits,
    ...peopleHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
