export const productName = 'Sentinel';
export const productLine = 'Security';
export const workspaceName = 'Poluru Shield';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@polurushield.example',
  role: 'Chief information security officer',
};

export const workspace = {
  name: workspaceName,
  period: 'SOC · 10 Sep 2026',
  timezone: 'America / Chicago',
  mtta: '14m',
};

export const people = [
  { name: 'Subbu Poluru', role: 'CISO', squad: 'Office of security' },
  { name: 'Kavya Poluru', role: 'SOC lead', squad: 'Detection' },
  { name: 'Maya Poluru', role: 'Incident commander', squad: 'Response' },
  { name: 'Anika Poluru', role: 'Threat intel', squad: 'Intel' },
  { name: 'Leela Poluru', role: 'Vulnerability owner', squad: 'AppSec' },
  { name: 'Ishaan Poluru', role: 'DFIR analyst', squad: 'Investigations' },
  { name: 'Priya Poluru', role: 'Detection engineer', squad: 'Detection' },
  { name: 'Dev Poluru', role: 'Security platform', squad: 'Engineering' },
  { name: 'Rohan Poluru', role: 'Deputy CISO', squad: 'Office of security' },
  { name: 'Arjun Poluru', role: 'Application security', squad: 'AppSec' },
  { name: 'Elena Poluru', role: 'Privacy counsel', squad: 'Legal' },
  { name: 'Nikhil Poluru', role: 'Threat hunter', squad: 'Intel' },
];

export const queues = [
  { id: 'alerts', label: 'Alerts', value: '18', href: '#/alerts', hot: true },
  { id: 'incidents', label: 'Incidents', value: '6', href: '#/incidents' },
  { id: 'vulns', label: 'Vulns', value: '11', href: '#/vulnerabilities' },
  { id: 'cases', label: 'Cases', value: '4', href: '#/investigations' },
];

export const severityOptions = [
  { label: 'Critical', value: 'critical' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

export let alerts = [
  { id: 'al-1', title: 'Impossible travel on vault admin', source: 'Okta', severity: 'critical', status: 'open', owner: 'Kavya Poluru', seen: '2026-09-10T17:12:00', asset: 'vault.polurushield.example' },
  { id: 'al-2', title: 'Beaconing to known C2', source: 'EDR', severity: 'high', status: 'open', owner: 'Priya Poluru', seen: '2026-09-10T16:40:00', asset: 'lt-maya-12' },
  { id: 'al-3', title: 'Privilege grant outside change window', source: 'SIEM', severity: 'high', status: 'triaged', owner: 'Dev Poluru', seen: '2026-09-10T15:08:00', asset: 'iam-prod' },
  { id: 'al-4', title: 'Phish click · finance shared mailbox', source: 'Email', severity: 'medium', status: 'open', owner: 'Anika Poluru', seen: '2026-09-10T14:22:00', asset: 'arjun@polurushield.example' },
  { id: 'al-5', title: 'Anomalous S3 GetObject burst', source: 'Cloud', severity: 'medium', status: 'watch', owner: 'Nikhil Poluru', seen: '2026-09-10T13:05:00', asset: 'shield-evidence' },
  { id: 'al-6', title: 'Stale API key used from TOR exit', source: 'WAF', severity: 'high', status: 'open', owner: 'Leela Poluru', seen: '2026-09-10T11:48:00', asset: 'payments-api' },
];

export let incidents = [
  { id: 'inc-4412', code: 'INC-4412', title: 'Vault admin session from two continents', severity: 'critical', status: 'active', owner: 'Maya Poluru', opened: '2026-09-10T17:14:00', queue: 'Identity', playbook: 'Account takeover' },
  { id: 'inc-4408', code: 'INC-4408', title: 'Endpoint beacon on Maya’s laptop', severity: 'high', status: 'contained', owner: 'Ishaan Poluru', opened: '2026-09-10T16:44:00', queue: 'Endpoint', playbook: 'Malware isolate' },
  { id: 'inc-4399', code: 'INC-4399', title: 'Phish campaign against finance', severity: 'medium', status: 'investigating', owner: 'Anika Poluru', opened: '2026-09-09T09:20:00', queue: 'Email', playbook: 'Phish wipe' },
  { id: 'inc-4381', code: 'INC-4381', title: 'Exposed key on payments-api', severity: 'high', status: 'active', owner: 'Arjun Poluru', opened: '2026-09-08T21:10:00', queue: 'AppSec', playbook: 'Secret rotate' },
  { id: 'inc-4360', code: 'INC-4360', title: 'Vendor Helio Cloud token reuse', severity: 'medium', status: 'watch', owner: 'Rohan Poluru', opened: '2026-09-07T12:00:00', queue: 'Third party', playbook: 'Vendor lock' },
  { id: 'inc-4344', code: 'INC-4344', title: 'Ransomware canary tripped in staging', severity: 'low', status: 'closed', owner: 'Dev Poluru', opened: '2026-09-04T08:30:00', queue: 'Endpoint', playbook: 'Ransomware halt' },
];

export const vulnerabilities = [
  { id: 'vul-1', cve: 'CVE-2026-4411', title: 'Unpatched kernel on lt-maya-12', severity: 'critical', status: 'open', owner: 'Leela Poluru', asset: 'lt-maya-12', sla: '8h' },
  { id: 'vul-2', cve: 'CVE-2026-3188', title: 'Outdated OpenSSL on payments-api', severity: 'high', status: 'in_progress', owner: 'Arjun Poluru', asset: 'payments-api', sla: '24h' },
  { id: 'vul-3', cve: 'CVE-2026-2201', title: 'Public S3 listing on shield-evidence', severity: 'high', status: 'open', owner: 'Dev Poluru', asset: 'shield-evidence', sla: '24h' },
  { id: 'vul-4', cve: 'CVE-2025-9902', title: 'WordPress plugin on careers', severity: 'medium', status: 'watch', owner: 'Leela Poluru', asset: 'careers.polurushield.example', sla: '7d' },
  { id: 'vul-5', cve: 'CVE-2026-1104', title: 'Jenkins plugin RCE residual', severity: 'medium', status: 'patched', owner: 'Dev Poluru', asset: 'ci-east', sla: 'Met' },
  { id: 'vul-6', cve: 'CVE-2026-0771', title: 'NPM transitive in member portal', severity: 'low', status: 'open', owner: 'Arjun Poluru', asset: 'member-portal', sla: '30d' },
];

export const investigations = [
  { id: 'case-12', code: 'CASE-12', title: 'Vault session correlation', owner: 'Ishaan Poluru', status: 'open', severity: 'critical', linked: 'INC-4412', updated: '2026-09-10' },
  { id: 'case-09', code: 'CASE-09', title: 'Laptop beacon timeline', owner: 'Nikhil Poluru', status: 'open', severity: 'high', linked: 'INC-4408', updated: '2026-09-10' },
  { id: 'case-07', code: 'CASE-07', title: 'Finance mailbox cluster', owner: 'Anika Poluru', status: 'in_progress', severity: 'medium', linked: 'INC-4399', updated: '2026-09-09' },
  { id: 'case-04', code: 'CASE-04', title: 'Helio token reuse', owner: 'Rohan Poluru', status: 'watch', severity: 'medium', linked: 'INC-4360', updated: '2026-09-08' },
];

export const playbooks = [
  { id: 'pb-ato', name: 'Account takeover', owner: 'Maya Poluru', steps: 6, last: 'Used on INC-4412', status: 'ready' },
  { id: 'pb-mal', name: 'Malware isolate', owner: 'Ishaan Poluru', steps: 5, last: 'Used on INC-4408', status: 'ready' },
  { id: 'pb-phish', name: 'Phish wipe', owner: 'Anika Poluru', steps: 4, last: 'Used on INC-4399', status: 'ready' },
  { id: 'pb-secret', name: 'Secret rotate', owner: 'Arjun Poluru', steps: 5, last: 'Used on INC-4381', status: 'watch' },
  { id: 'pb-vendor', name: 'Vendor lock', owner: 'Rohan Poluru', steps: 3, last: 'Draft with Elena Poluru', status: 'draft' },
  { id: 'pb-ransom', name: 'Ransomware halt', owner: 'Dev Poluru', steps: 7, last: 'Closed INC-4344', status: 'ready' },
];

export const alertTrend = [22, 19, 24, 18, 21, 16, 20, 17, 19, 15, 18, 18];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Alerts', href: '#/alerts', icon: 'bell' },
  { label: 'Incidents', href: '#/incidents', icon: 'alert-triangle' },
  { label: 'Vulnerabilities', href: '#/vulnerabilities', icon: 'shield' },
  { label: 'Investigations', href: '#/investigations', icon: 'search' },
  { label: 'Response', href: '#/response', icon: 'check' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'Critical: vault admin travel', description: 'Kavya Poluru · Okta', icon: 'alert-triangle', href: '#/incident/inc-4412' },
  { label: 'Beacon on lt-maya-12', description: 'Priya Poluru · EDR', icon: 'bell', href: '#/alerts' },
  { label: 'CVE-2026-4411 still open', description: 'Leela Poluru · 8h SLA', icon: 'shield', href: '#/vulnerabilities' },
  { label: 'CASE-12 needs Subbu review', description: 'Ishaan Poluru · DFIR', icon: 'search', href: '#/investigations' },
];

export const commandItems = [
  { label: 'Overview', description: 'SOC pulse', href: '#/overview', icon: 'home' },
  { label: 'Open incident', description: 'Start a case', href: '#add-incident', icon: 'plus' },
  { label: 'Alerts', description: 'Live queue', href: '#/alerts', icon: 'bell' },
  { label: 'Incidents', description: 'Active work', href: '#/incidents', icon: 'alert-triangle' },
  { label: 'Vulnerabilities', description: 'Patch queue', href: '#/vulnerabilities', icon: 'shield' },
  { label: 'Investigations', description: 'Cases', href: '#/investigations', icon: 'search' },
  { label: 'Response', description: 'Playbooks', href: '#/response', icon: 'check' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export function openAlerts() {
  return alerts.filter((item) => !['closed', 'resolved'].includes(item.status));
}

export function openIncidents() {
  return incidents.filter((item) => !['closed', 'resolved'].includes(item.status));
}

export function openVulns() {
  return vulnerabilities.filter((item) => !['patched', 'closed'].includes(item.status));
}

export function overviewStats() {
  return [
    { label: 'Open alerts', value: String(openAlerts().length), hint: 'Kavya Poluru holds the queue', trend: 'down', trendValue: '−3' },
    { label: 'Active incidents', value: String(openIncidents().length), hint: 'Maya Poluru is commander', trend: 'up', trendValue: '+1' },
    { label: 'Open vulns', value: String(openVulns().length), hint: 'Leela Poluru · 8h on kernel', trend: 'flat', trendValue: 'Hold' },
    { label: 'MTTA', value: workspace.mtta, hint: 'Median to acknowledge', trend: 'down', trendValue: '−2m' },
  ];
}

export function addIncident({ title, owner, severity }) {
  const n = 4413 + incidents.length;
  const id = `inc-${n}`;
  const record = {
    id,
    code: `INC-${n}`,
    title: title || 'Untitled incident',
    severity: severity || 'high',
    status: 'active',
    owner: owner || currentUser.name,
    opened: new Date().toISOString(),
    queue: 'SOC',
    playbook: 'Account takeover',
  };
  incidents = [record, ...incidents];
  return record;
}

export function buildSearchCatalog() {
  const alertHits = alerts.map((item) => ({
    label: item.title,
    description: `${item.source} · ${item.severity}`,
    owner: item.owner,
    type: 'Alert',
    href: '#/alerts',
  }));
  const incidentHits = incidents.map((item) => ({
    label: `${item.code} ${item.title}`,
    description: `${item.owner} · ${item.status}`,
    owner: item.owner,
    type: 'Incident',
    href: `#/incident/${item.id}`,
  }));
  const vulnHits = vulnerabilities.map((item) => ({
    label: `${item.cve} ${item.title}`,
    description: `${item.asset} · ${item.severity}`,
    owner: item.owner,
    type: 'Vulnerability',
    href: '#/vulnerabilities',
  }));
  const caseHits = investigations.map((item) => ({
    label: `${item.code} ${item.title}`,
    description: `${item.owner} · ${item.linked}`,
    owner: item.owner,
    type: 'Investigation',
    href: '#/investigations',
  }));
  const playHits = playbooks.map((item) => ({
    label: item.name,
    description: `${item.owner} · ${item.steps} steps`,
    owner: item.owner,
    type: 'Playbook',
    href: '#/response',
  }));
  const peopleHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Person',
    href: '#/incidents',
  }));
  return [
    ...alertHits,
    ...incidentHits,
    ...vulnHits,
    ...caseHits,
    ...playHits,
    ...peopleHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
