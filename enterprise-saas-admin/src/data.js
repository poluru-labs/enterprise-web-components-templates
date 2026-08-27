export const productName = 'Helio';
export const productLine = 'Admin';
export const workspaceName = 'Poluru Cloud';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@polurulabs.example',
  role: 'Platform admin',
  region: 'Americas',
};

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Organizations', href: '#/organizations', icon: 'folder' },
  { label: 'Members', href: '#/members', icon: 'user' },
  { label: 'Plans', href: '#/plans', icon: 'star' },
  { label: 'Flags', href: '#/flags', icon: 'filter' },
  { label: 'Usage', href: '#/usage', icon: 'file' },
  { label: 'Incidents', href: '#/incidents', icon: 'alert-triangle' },
  { label: 'Audit', href: '#/audit', icon: 'clock' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Organizations', value: '842', hint: '32 added this month', trend: 'up', trendValue: '+4.0%' },
  { label: 'Active seats', value: '12,480', hint: '82% of contracted', trend: 'up', trendValue: '+6.2%' },
  { label: 'Monthly recurring', value: '$186k', hint: 'Net new $22.4k', trend: 'up', trendValue: '+13.6%' },
  { label: 'Uptime', value: '99.98%', hint: 'Last 30 days', trend: 'flat', trendValue: 'SLA' },
];

export const usageMonths = [112, 118, 124, 131, 138, 146, 152, 159, 168, 174, 181, 186];

export const organizations = [
  {
    id: 'org_harbor',
    name: 'Harbor & Co.',
    plan: 'Enterprise',
    seats: '240 / 300',
    owner: 'Meera Poluru',
    region: 'EMEA',
    status: 'Healthy',
    mrr: '$18.4k',
    created: '12 Jan 2024',
    sso: 'Okta',
    health: 4.5,
  },
  {
    id: 'org_nimbus',
    name: 'Nimbus Retail',
    plan: 'Growth',
    seats: '86 / 100',
    owner: 'Arjun Poluru',
    region: 'Americas',
    status: 'At risk',
    mrr: '$4.2k',
    created: '3 Mar 2025',
    sso: 'Google',
    health: 2.5,
  },
  {
    id: 'org_bright',
    name: 'Brightline Labs',
    plan: 'Starter',
    seats: '18 / 25',
    owner: 'Maya Poluru',
    region: 'Americas',
    status: 'Healthy',
    mrr: '$890',
    created: '19 Jun 2025',
    sso: 'Password',
    health: 4,
  },
  {
    id: 'org_lumen',
    name: 'Lumen Health',
    plan: 'Enterprise',
    seats: '410 / 500',
    owner: 'Nikhil Poluru',
    region: 'Americas',
    status: 'Expanding',
    mrr: '$31.2k',
    created: '8 Nov 2023',
    sso: 'Azure AD',
    health: 5,
  },
  {
    id: 'org_fold',
    name: 'Fold Paper Co',
    plan: 'Growth',
    seats: '52 / 80',
    owner: 'Hana Poluru',
    region: 'APAC',
    status: 'Healthy',
    mrr: '$2.6k',
    created: '22 Feb 2026',
    sso: 'Okta',
    health: 4,
  },
  {
    id: 'org_oak',
    name: 'Oak & Pine',
    plan: 'Starter',
    seats: '9 / 10',
    owner: 'Sahana Poluru',
    region: 'EMEA',
    status: 'Near cap',
    mrr: '$490',
    created: '4 May 2026',
    sso: 'Password',
    health: 3,
  },
];

export const orgColumns = [
  { key: 'name', label: 'Organization', sortable: true },
  { key: 'plan', label: 'Plan', sortable: true },
  { key: 'seats', label: 'Seats' },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status' },
  { key: 'mrr', label: 'MRR', sortable: true },
];

export const members = [
  { name: 'Mira Poluru', email: 'mira.poluru@polurulabs.example', role: 'Owner', org: 'Poluru Cloud', status: 'Active', last: 'Now' },
  { name: 'Arjun Poluru', email: 'arjun.poluru@nimbus.example', role: 'Admin', org: 'Nimbus Retail', status: 'Active', last: '12m' },
  { name: 'Hana Poluru', email: 'hana.poluru@fold.example', role: 'Billing', org: 'Fold Paper Co', status: 'Active', last: '2h' },
  { name: 'Kavya Poluru', email: 'kavya.poluru@brightline.example', role: 'Member', org: 'Brightline Labs', status: 'Invited', last: '—' },
  { name: 'Nikhil Poluru', email: 'nikhil.poluru@lumen.example', role: 'Admin', org: 'Lumen Health', status: 'Active', last: '8m' },
  { name: 'Elena Poluru', email: 'elena.poluru@harbor.example', role: 'Member', org: 'Harbor & Co.', status: 'Active', last: '1d' },
  { name: 'Jordan Poluru', email: 'jordan.poluru@harbor.example', role: 'Support', org: 'Harbor & Co.', status: 'Suspended', last: '6d' },
  { name: 'Luca Poluru', email: 'luca.poluru@harbor.example', role: 'Admin', org: 'Harbor & Co.', status: 'Active', last: '5h' },
  { name: 'Noor Poluru', email: 'noor.poluru@harbor.example', role: 'Member', org: 'Harbor & Co.', status: 'Active', last: '9h' },
  { name: 'Sahana Poluru', email: 'sahana.poluru@oak.example', role: 'Owner', org: 'Oak & Pine', status: 'Active', last: '3h' },
  { name: 'Rohan Poluru', email: 'rohan.poluru@polurulabs.example', role: 'Support', org: 'Poluru Cloud', status: 'Active', last: '22m' },
  { name: 'Priya Poluru', email: 'priya.poluru@lumen.example', role: 'Member', org: 'Lumen Health', status: 'Active', last: '4h' },
];

export const memberColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'org', label: 'Organization' },
  { key: 'status', label: 'Status' },
  { key: 'last', label: 'Last seen' },
];

export const plans = [
  { name: 'Starter', price: '$49', seats: '25 seats', features: 'Email support · 2 flags · 10k API', orgs: 318 },
  { name: 'Growth', price: '$249', seats: '100 seats', features: 'SSO · 20 flags · 250k API', orgs: 286 },
  { name: 'Enterprise', price: 'Custom', seats: 'Unlimited', features: 'SCIM · SLA · dedicated CSM', orgs: 238 },
];

export const subscriptions = [
  { org: 'Harbor & Co.', plan: 'Enterprise', renews: '12 Jan 2027', mrr: '$18.4k', status: 'Active' },
  { org: 'Lumen Health', plan: 'Enterprise', renews: '8 Nov 2026', mrr: '$31.2k', status: 'Active' },
  { org: 'Nimbus Retail', plan: 'Growth', renews: '3 Mar 2027', mrr: '$4.2k', status: 'Past due' },
  { org: 'Fold Paper Co', plan: 'Growth', renews: '22 Feb 2027', mrr: '$2.6k', status: 'Active' },
  { org: 'Brightline Labs', plan: 'Starter', renews: '19 Jun 2027', mrr: '$890', status: 'Trial' },
  { org: 'Oak & Pine', plan: 'Starter', renews: '4 May 2027', mrr: '$490', status: 'Active' },
];

export const subscriptionColumns = [
  { key: 'org', label: 'Organization', sortable: true },
  { key: 'plan', label: 'Plan' },
  { key: 'renews', label: 'Renews' },
  { key: 'mrr', label: 'MRR', sortable: true },
  { key: 'status', label: 'Status' },
];

export const flags = [
  { key: 'billing.usage_alerts', name: 'Usage alerts', owner: 'Mira Poluru', rollout: 100, status: 'GA', env: 'Production' },
  { key: 'auth.passkeys', name: 'Passkeys', owner: 'Rohan Poluru', rollout: 42, status: 'Partial', env: 'Production' },
  { key: 'admin.impersonate', name: 'Org impersonation', owner: 'Mira Poluru', rollout: 100, status: 'Internal', env: 'Staff' },
  { key: 'flags.percentage', name: 'Percentage rollouts', owner: 'Priya Poluru', rollout: 80, status: 'GA', env: 'Production' },
  { key: 'ai.digest', name: 'Weekly digest', owner: 'Kavya Poluru', rollout: 12, status: 'Beta', env: 'Staging' },
  { key: 'sso.scim_v2', name: 'SCIM v2', owner: 'Nikhil Poluru', rollout: 0, status: 'Off', env: 'Production' },
];

export const usageMeters = [
  { label: 'API calls', value: 74, hint: '7.4M of 10M' },
  { label: 'Seats', value: 82, hint: '12,480 of 15,200' },
  { label: 'Storage', value: 46, hint: '4.6 TB of 10 TB' },
  { label: 'Realtime connections', value: 31, hint: '3.1k of 10k' },
];

export const incidents = [
  { title: 'Elevated auth latency', description: 'Token exchange p95 at 820ms in EMEA.', timestamp: 'Today 14:12', status: 'current' },
  { title: 'Billing webhook retries', description: 'Stripe events delayed 6 minutes. Recovered.', timestamp: '26 Aug 09:40', status: 'complete' },
  { title: 'Flag service deploy', description: 'Percentage rollouts shipped without customer impact.', timestamp: '22 Aug 18:05', status: 'complete' },
  { title: 'Scheduled maintenance', description: 'Database failover window · 02:00–02:40 UTC.', timestamp: '30 Aug 02:00', status: 'upcoming' },
];

export const auditLog = [
  { when: '16:18', actor: 'Mira Poluru', action: 'Enabled flag', target: 'auth.passkeys', ip: '10.4.12.8' },
  { when: '15:02', actor: 'Rohan Poluru', action: 'Invited member', target: 'Kavya Poluru', ip: '10.4.12.21' },
  { when: '13:44', actor: 'Mira Poluru', action: 'Impersonated org', target: 'Harbor & Co.', ip: '10.4.12.8' },
  { when: '11:20', actor: 'Priya Poluru', action: 'Rotated API key', target: 'live_sk_helio', ip: '10.8.2.14' },
  { when: 'Yesterday', actor: 'Nikhil Poluru', action: 'SSO enforced', target: 'Lumen Health', ip: '10.2.9.4' },
  { when: 'Yesterday', actor: 'Mira Poluru', action: 'Changed plan', target: 'Nimbus Retail → Growth', ip: '10.4.12.8' },
];

export const auditColumns = [
  { key: 'when', label: 'When' },
  { key: 'actor', label: 'Actor', sortable: true },
  { key: 'action', label: 'Action' },
  { key: 'target', label: 'Target' },
  { key: 'ip', label: 'IP' },
];

export const inboxItems = [
  { label: 'Nimbus Retail is past due', description: 'Arjun Poluru · $4.2k · 8 days', icon: 'warning' },
  { label: 'Kavya Poluru accepted invite', description: 'Brightline Labs · Member', icon: 'user' },
  { label: 'Auth latency above SLO', description: 'EMEA p95 820ms', icon: 'alert-triangle' },
  { label: 'Harbor requested more seats', description: 'Meera Poluru · +40', icon: 'star' },
];

export const commandItems = [
  { label: 'Overview', description: 'Dashboard pulse', href: '#/overview', icon: 'home' },
  { label: 'Harbor & Co.', description: 'Organization', href: '#/org/org_harbor', icon: 'folder' },
  { label: 'Invite member', description: 'Add a seat', href: '#/members', icon: 'user' },
  { label: 'Feature flags', description: 'Rollouts', href: '#/flags', icon: 'filter' },
  { label: 'Incidents', description: 'Uptime', href: '#/incidents', icon: 'alert-triangle' },
  { label: 'Settings', description: 'SSO and keys', href: '#/settings', icon: 'settings' },
];

export const workspaceTree = [
  {
    id: 'prod',
    label: 'Production',
    children: [
      { id: 'prod-web', label: 'helio-web' },
      { id: 'prod-api', label: 'helio-api' },
      { id: 'prod-flags', label: 'helio-flags' },
    ],
  },
  {
    id: 'staging',
    label: 'Staging',
    children: [
      { id: 'stg-web', label: 'helio-web-stg' },
      { id: 'stg-api', label: 'helio-api-stg' },
    ],
  },
];

export const inviteSteps = [
  { label: 'Organization', description: 'Who they belong to' },
  { label: 'Access', description: 'Role and seats' },
  { label: 'Confirm', description: 'Admin PIN' },
];

export const apiKeySnippet = `curl https://api.helio.example/v1/orgs \\
  -H "Authorization: Bearer live_sk_helio_84c2"`;
