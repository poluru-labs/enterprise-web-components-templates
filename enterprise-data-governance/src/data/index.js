export const productName = 'Verity';
export const productLine = 'Data governance';
export const workspaceName = 'Helix Markets';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@helix.example',
  role: 'Chief data officer',
};

export const workspace = {
  name: workspaceName,
    period: '16 Sep 2026',
  timezone: 'America / Chicago',
  close: 'Stewardship review 22 Sep 2026',
};

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Catalog', href: '#/catalog', icon: 'folder' },
  { label: 'Owners', href: '#/owners', icon: 'user' },
  { label: 'Lineage', href: '#/lineage', icon: 'link' },
  { label: 'Quality', href: '#/quality', icon: 'check-circle' },
  { label: 'Classify', href: '#/classifications', icon: 'star' },
  { label: 'Access', href: '#/access', icon: 'lock' },
  { label: 'Glossary', href: '#/glossary', icon: 'file' },
];

export const kpis = [
  { label: 'Catalogued assets', value: '1,284', hint: '42 added this month', trend: 'up', trendValue: '+3.4%' },
  { label: 'Certified gold', value: '84%', hint: 'Target 80%', trend: 'up', trendValue: '+6 pts' },
  { label: 'Named owners', value: '97%', hint: 'Steward coverage', trend: 'up', trendValue: '+2 pts' },
  { label: 'Rules passing', value: '91.4%', hint: '142 of 155 checks', trend: 'flat', trendValue: 'Hold' },
  { label: 'Open access', value: '18', hint: 'SLA 2 business days', trend: 'down', trendValue: '−4' },
  { label: 'Classified columns', value: '6,410', hint: 'PII coverage 88%', trend: 'up', trendValue: '+210' },
  { label: 'Freshness SLA', value: '96%', hint: 'Gold layer on time', trend: 'up', trendValue: '+1.2 pts' },
  { label: 'Open issues', value: '7', hint: '2 critical', trend: 'down', trendValue: '−3' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Chief data officer', squad: 'Office of the CDO', rating: 5, score: 96, assets: 12 },
  { name: 'Arjun Poluru', role: 'Finance domain owner', squad: 'Finance', rating: 5, score: 94, assets: 18 },
  { name: 'Kavya Poluru', role: 'Catalog steward', squad: 'Data office', rating: 5, score: 91, assets: 24 },
  { name: 'Nikhil Poluru', role: 'Lineage lead', squad: 'Platform', rating: 4, score: 82, assets: 9 },
  { name: 'Elena Poluru', role: 'Quality steward', squad: 'People', rating: 5, score: 88, assets: 7 },
  { name: 'Rohan Poluru', role: 'Access manager', squad: 'Operations', rating: 4, score: 76, assets: 11 },
  { name: 'Priya Poluru', role: 'Customer domain owner', squad: 'Customer', rating: 5, score: 93, assets: 16 },
  { name: 'Hana Poluru', role: 'Ledger steward', squad: 'Finance', rating: 4, score: 85, assets: 8 },
  { name: 'Luca Poluru', role: 'Risk domain owner', squad: 'Risk', rating: 4, score: 81, assets: 10 },
  { name: 'Sahana Poluru', role: 'Payments steward', squad: 'Payments', rating: 4, score: 79, assets: 6 },
  { name: 'Dev Poluru', role: 'Platform owner', squad: 'Technology', rating: 5, score: 90, assets: 14 },
  { name: 'Anika Poluru', role: 'Privacy officer', squad: 'Security', rating: 5, score: 87, assets: 5 },
];

export const assets = [
  {
    id: 'ast_accounts',
    name: 'core.customer.accounts',
    type: 'Table',
    domain: 'Customer',
    owner: 'Priya Poluru',
    steward: 'Kavya Poluru',
    status: 'Certified',
    system: 'Warehouse · gold',
    rows: '12.4M',
    freshness: '14m',
    sla: 'On time',
    quality: 96,
    classified: 18,
    updated: '16 Sep 2026',
    purpose: 'Canonical customer account register for servicing and finance.',
  },
  {
    id: 'ast_journal',
    name: 'finance.ledger.journal',
    type: 'Table',
    domain: 'Finance',
    owner: 'Arjun Poluru',
    steward: 'Hana Poluru',
    status: 'Certified',
    system: 'Warehouse · gold',
    rows: '88.1M',
    freshness: '22m',
    sla: 'On time',
    quality: 94,
    classified: 9,
    updated: '16 Sep 2026',
    purpose: 'Posted journal lines used for close and regulatory packs.',
  },
  {
    id: 'ast_transfers',
    name: 'payments.core.transfers',
    type: 'Stream',
    domain: 'Payments',
    owner: 'Sahana Poluru',
    steward: 'Rohan Poluru',
    status: 'Failing',
    system: 'Kafka · payments',
    rows: '4.8M / day',
    freshness: '6m',
    sla: 'Watch',
    quality: 71,
    classified: 11,
    updated: '16 Sep 2026',
    purpose: 'In-flight transfer events before settlement confirmation.',
  },
  {
    id: 'ast_exposure',
    name: 'risk.credit.exposure',
    type: 'Table',
    domain: 'Risk',
    owner: 'Luca Poluru',
    steward: 'Anika Poluru',
    status: 'Watch',
    system: 'Warehouse · silver',
    rows: '2.1M',
    freshness: '3h',
    sla: 'Watch',
    quality: 78,
    classified: 7,
    updated: '15 Sep 2026',
    purpose: 'Counterparty exposure used by credit and treasury desks.',
  },
  {
    id: 'ast_headcount',
    name: 'hr.people.headcount',
    type: 'Table',
    domain: 'People',
    owner: 'Elena Poluru',
    steward: 'Mira Poluru',
    status: 'Classified',
    system: 'Warehouse · gold',
    rows: '18.6k',
    freshness: '1d',
    sla: 'On time',
    quality: 92,
    classified: 14,
    updated: '15 Sep 2026',
    purpose: 'Active headcount snapshot for finance planning.',
  },
  {
    id: 'ast_instruments',
    name: 'market.ref.instruments',
    type: 'Table',
    domain: 'Markets',
    owner: 'Kavya Poluru',
    steward: 'Dev Poluru',
    status: 'Certified',
    system: 'Warehouse · gold',
    rows: '640k',
    freshness: '8m',
    sla: 'On time',
    quality: 98,
    classified: 4,
    updated: '16 Sep 2026',
    purpose: 'Reference instruments shared by trading and risk.',
  },
  {
    id: 'ast_tickets',
    name: 'customer.support.tickets',
    type: 'Table',
    domain: 'Customer',
    owner: 'Priya Poluru',
    steward: 'Kavya Poluru',
    status: 'Draft',
    system: 'Warehouse · bronze',
    rows: '9.2M',
    freshness: '45m',
    sla: 'On time',
    quality: 64,
    classified: 6,
    updated: '14 Sep 2026',
    purpose: 'Raw support tickets pending certification.',
  },
  {
    id: 'ast_alerts',
    name: 'risk.aml.alerts',
    type: 'Table',
    domain: 'Risk',
    owner: 'Anika Poluru',
    steward: 'Luca Poluru',
    status: 'Restricted',
    system: 'Warehouse · gold',
    rows: '412k',
    freshness: '18m',
    sla: 'On time',
    quality: 89,
    classified: 16,
    updated: '16 Sep 2026',
    purpose: 'AML alert register with restricted column access.',
  },
  {
    id: 'ast_nrr',
    name: 'warehouse.gold.nrr',
    type: 'View',
    domain: 'Finance',
    owner: 'Arjun Poluru',
    steward: 'Hana Poluru',
    status: 'Certified',
    system: 'Warehouse · gold',
    rows: '48k',
    freshness: '2h',
    sla: 'On time',
    quality: 97,
    classified: 3,
    updated: '16 Sep 2026',
    purpose: 'Net revenue retain scorecard feed for the board pack.',
  },
  {
    id: 'ast_sla',
    name: 'ops.fulfillment.sla',
    type: 'View',
    domain: 'Operations',
    owner: 'Rohan Poluru',
    steward: 'Dev Poluru',
    status: 'Watch',
    system: 'Warehouse · silver',
    rows: '1.1M',
    freshness: '55m',
    sla: 'Watch',
    quality: 74,
    classified: 2,
    updated: '15 Sep 2026',
    purpose: 'Same-day fulfillment SLA used by operations reviews.',
  },
];

export const assetColumns = [
  { key: 'name', label: 'Asset', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'domain', label: 'Domain', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'quality', label: 'Quality' },
  { key: 'updated', label: 'Updated' },
];

export const columnsByAsset = {
  ast_accounts: [
    { name: 'account_id', type: 'string', classif: 'Internal', rule: 'Not null', status: 'Passed' },
    { name: 'legal_name', type: 'string', classif: 'Confidential', rule: 'Completeness 99%', status: 'Passed' },
    { name: 'tax_id', type: 'string', classif: 'Restricted', rule: 'Format check', status: 'Passed' },
    { name: 'email', type: 'string', classif: 'PII', rule: 'Email pattern', status: 'Watch' },
    { name: 'opened_at', type: 'timestamp', classif: 'Internal', rule: 'Freshness 1h', status: 'Passed' },
    { name: 'status', type: 'string', classif: 'Internal', rule: 'Allowed values', status: 'Passed' },
  ],
};

export const qualityRules = [
  { id: 'qr1', name: 'Account completeness', asset: 'core.customer.accounts', owner: 'Priya Poluru', score: 99, status: 'Passed', severity: 'High', next: '17 Sep' },
  { id: 'qr2', name: 'Journal balance', asset: 'finance.ledger.journal', owner: 'Hana Poluru', score: 100, status: 'Passed', severity: 'Critical', next: '17 Sep' },
  { id: 'qr3', name: 'Transfer uniqueness', asset: 'payments.core.transfers', owner: 'Sahana Poluru', score: 82, status: 'Watch', severity: 'High', next: '16 Sep' },
  { id: 'qr4', name: 'Settlement lag < 15m', asset: 'payments.core.transfers', owner: 'Rohan Poluru', score: 61, status: 'Failing', severity: 'Critical', next: '16 Sep' },
  { id: 'qr5', name: 'Exposure freshness', asset: 'risk.credit.exposure', owner: 'Luca Poluru', score: 74, status: 'Watch', severity: 'Medium', next: '16 Sep' },
  { id: 'qr6', name: 'Headcount not null', asset: 'hr.people.headcount', owner: 'Elena Poluru', score: 98, status: 'Passed', severity: 'Medium', next: '18 Sep' },
  { id: 'qr7', name: 'Instrument CUSIP format', asset: 'market.ref.instruments', owner: 'Kavya Poluru', score: 99, status: 'Passed', severity: 'High', next: '17 Sep' },
  { id: 'qr8', name: 'AML owner assigned', asset: 'risk.aml.alerts', owner: 'Anika Poluru', score: 91, status: 'Passed', severity: 'Critical', next: '17 Sep' },
];

export const qualityColumns = [
  { key: 'name', label: 'Rule', sortable: true },
  { key: 'asset', label: 'Asset' },
  { key: 'owner', label: 'Owner' },
  { key: 'score', label: 'Score' },
  { key: 'status', label: 'Status' },
  { key: 'severity', label: 'Severity' },
  { key: 'next', label: 'Next run' },
];

export const classifications = [
  { id: 'cl_pii', name: 'PII', level: 'High', columns: 842, owner: 'Anika Poluru', policy: 'Mask in lower environments', status: 'Published' },
  { id: 'cl_restricted', name: 'Restricted', level: 'Critical', columns: 126, owner: 'Anika Poluru', policy: 'Named access only', status: 'Published' },
  { id: 'cl_confidential', name: 'Confidential', level: 'High', columns: 1_940, owner: 'Mira Poluru', policy: 'Stewards approve shares', status: 'Published' },
  { id: 'cl_internal', name: 'Internal', level: 'Medium', columns: 3_210, owner: 'Kavya Poluru', policy: 'Workforce default', status: 'Published' },
  { id: 'cl_public', name: 'Public', level: 'Low', columns: 292, owner: 'Kavya Poluru', policy: 'May leave the firm', status: 'Published' },
];

export const classificationColumns = [
  { key: 'name', label: 'Label', sortable: true },
  { key: 'level', label: 'Sensitivity' },
  { key: 'columns', label: 'Columns' },
  { key: 'owner', label: 'Owner' },
  { key: 'policy', label: 'Policy' },
  { key: 'status', label: 'Status' },
];

export const accessRequests = [
  { id: 'ar1', asset: 'risk.aml.alerts', requester: 'Tara Poluru', owner: 'Anika Poluru', purpose: 'Quarterly SAR review', access: 'Read', status: 'Pending', sla: '18h left', opened: '15 Sep' },
  { id: 'ar2', asset: 'finance.ledger.journal', requester: 'Vihaan Poluru', owner: 'Arjun Poluru', purpose: 'Close support for Q3', access: 'Read', status: 'Approved', sla: 'Met', opened: '14 Sep' },
  { id: 'ar3', asset: 'payments.core.transfers', requester: 'Ishita Poluru', owner: 'Sahana Poluru', purpose: 'Ops exception report', access: 'Read', status: 'In review', sla: '6h left', opened: '16 Sep' },
  { id: 'ar4', asset: 'hr.people.headcount', requester: 'Dev Poluru', owner: 'Elena Poluru', purpose: 'Platform capacity plan', access: 'Read', status: 'Denied', sla: 'Closed', opened: '12 Sep' },
  { id: 'ar5', asset: 'core.customer.accounts', requester: 'Luca Poluru', owner: 'Priya Poluru', purpose: 'Credit model refresh', access: 'Read', status: 'Queued', sla: '1d left', opened: '16 Sep' },
  { id: 'ar6', asset: 'warehouse.gold.nrr', requester: 'Hana Poluru', owner: 'Arjun Poluru', purpose: 'Board pack extract', access: 'Export', status: 'Approved', sla: 'Met', opened: '13 Sep' },
];

export const accessColumns = [
  { key: 'asset', label: 'Asset', sortable: true },
  { key: 'requester', label: 'Requester' },
  { key: 'owner', label: 'Owner' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'access', label: 'Access' },
  { key: 'status', label: 'Status' },
  { key: 'sla', label: 'SLA' },
];

export const glossary = [
  { term: 'Certified gold', definition: 'An asset with a named owner, passing quality rules, and a published classification.', owner: 'Mira Poluru', domain: 'Governance' },
  { term: 'Legal name', definition: 'Registered customer name as held on the account opening record.', owner: 'Priya Poluru', domain: 'Customer' },
  { term: 'Posted journal', definition: 'A ledger line that has cleared the close controls for the period.', owner: 'Arjun Poluru', domain: 'Finance' },
  { term: 'Settlement lag', definition: 'Minutes between a transfer event and confirmed settlement.', owner: 'Sahana Poluru', domain: 'Payments' },
  { term: 'Credit exposure', definition: 'Outstanding amount against a counterparty after netting.', owner: 'Luca Poluru', domain: 'Risk' },
  { term: 'NRR', definition: 'Net revenue retain for the trailing twelve months.', owner: 'Hana Poluru', domain: 'Finance' },
];

export const glossaryColumns = [
  { key: 'term', label: 'Term', sortable: true },
  { key: 'definition', label: 'Definition' },
  { key: 'owner', label: 'Owner' },
  { key: 'domain', label: 'Domain' },
];

export const policies = [
  { id: 'pol1', name: 'Named owner required', owner: 'Mira Poluru', scope: 'All gold assets', status: 'Published', updated: '1 Sep 2026' },
  { id: 'pol2', name: 'PII masking in lower envs', owner: 'Anika Poluru', scope: 'PII columns', status: 'Published', updated: '8 Sep 2026' },
  { id: 'pol3', name: 'Access SLA 2 business days', owner: 'Rohan Poluru', scope: 'Read requests', status: 'Published', updated: '4 Sep 2026' },
  { id: 'pol4', name: 'Lineage on certified assets', owner: 'Nikhil Poluru', scope: 'Certified gold', status: 'Watch', updated: '12 Sep 2026' },
];

export const issues = [
  { id: 'is1', title: 'Settlement lag rule failing', owner: 'Sahana Poluru', asset: 'payments.core.transfers', severity: 'Critical', since: '15 Sep', note: 'Late confirms from two correspondent banks.' },
  { id: 'is2', title: 'Exposure freshness at 3h', owner: 'Luca Poluru', asset: 'risk.credit.exposure', severity: 'Medium', since: '14 Sep', note: 'Silver job waiting on a locked partition.' },
  { id: 'is3', title: 'Support tickets still draft', owner: 'Kavya Poluru', asset: 'customer.support.tickets', severity: 'Low', since: '10 Sep', note: 'Waiting on column classifications.' },
  { id: 'is4', title: 'Fulfillment SLA view stale', owner: 'Rohan Poluru', asset: 'ops.fulfillment.sla', severity: 'Medium', since: '15 Sep', note: 'Same-day cut-off missed in two hubs.' },
  { id: 'is5', title: 'AML access queue at 18h', owner: 'Anika Poluru', asset: 'risk.aml.alerts', severity: 'High', since: '16 Sep', note: 'Pending reviewer coverage this week.' },
];

export const lineageEdges = [
  { from: 'crm.raw.accounts', to: 'core.customer.accounts', kind: 'Transform', owner: 'Priya Poluru' },
  { from: 'core.customer.accounts', to: 'warehouse.gold.nrr', kind: 'Aggregate', owner: 'Arjun Poluru' },
  { from: 'ledger.raw.journal', to: 'finance.ledger.journal', kind: 'Transform', owner: 'Hana Poluru' },
  { from: 'payments.core.transfers', to: 'risk.credit.exposure', kind: 'Join', owner: 'Luca Poluru' },
  { from: 'core.customer.accounts', to: 'risk.aml.alerts', kind: 'Lookup', owner: 'Anika Poluru' },
  { from: 'ops.raw.sla', to: 'ops.fulfillment.sla', kind: 'Transform', owner: 'Rohan Poluru' },
];

export const lineageColumns = [
  { key: 'from', label: 'Upstream' },
  { key: 'to', label: 'Downstream' },
  { key: 'kind', label: 'Link' },
  { key: 'owner', label: 'Owner' },
];

export const reviews = [
  { label: 'Catalog freeze', description: 'Kavya Poluru · production snapshot', timestamp: '16 Sep', icon: 'folder', status: 'Today' },
  { label: 'Quality standup', description: 'Elena Poluru · 7 open issues', timestamp: '16 Sep', icon: 'check', status: 'Today' },
  { label: 'Access board', description: 'Rohan Poluru · 18 open requests', timestamp: '17 Sep', icon: 'lock', status: 'Next' },
  { label: 'Stewardship review', description: 'Mira Poluru · certified gold 84%', timestamp: '22 Sep', icon: 'star', status: 'Scheduled' },
  { label: 'Lineage attestation', description: 'Nikhil Poluru · certified assets', timestamp: '24 Sep', icon: 'link', status: 'Scheduled' },
  { label: 'Privacy walkthrough', description: 'Anika Poluru · restricted columns', timestamp: '29 Sep', icon: 'eye', status: 'Scheduled' },
];

export const inboxItems = [
  { label: 'Settlement lag is failing', description: 'Sahana Poluru · Payments', icon: 'alert-triangle' },
  { label: 'AML read request pending', description: 'Tara Poluru · 18h left', icon: 'lock' },
  { label: 'Catalog freeze is today', description: 'Kavya Poluru · 16:00', icon: 'clock' },
  { label: 'NRR view recertified', description: 'Arjun Poluru · Finance', icon: 'check' },
];

export const commandItems = [
  { label: 'Overview', description: 'Catalog pulse', href: '#/overview', icon: 'home' },
  { label: 'Customer accounts', description: 'Priya Poluru', href: '#/asset/ast_accounts', icon: 'folder' },
  { label: 'Quality rules', description: 'Checks and scores', href: '#/quality', icon: 'check-circle' },
  { label: 'Access requests', description: 'Pending grants', href: '#/access', icon: 'lock' },
  { label: 'Owners', description: 'Stewards', href: '#/owners', icon: 'user' },
  { label: 'AML alerts', description: 'Anika Poluru', href: '#/asset/ast_alerts', icon: 'folder' },
  { label: 'Glossary', description: 'Business terms', href: '#/glossary', icon: 'file' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Asset', description: 'What to open' },
  { label: 'Need', description: 'Purpose and window' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const catalogTree = [
  {
    id: 'customer',
    label: 'Customer',
    children: [
      { id: 'accounts', label: 'core.customer.accounts' },
      { id: 'tickets', label: 'customer.support.tickets' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    children: [
      { id: 'journal', label: 'finance.ledger.journal' },
      { id: 'nrr', label: 'warehouse.gold.nrr' },
    ],
  },
  {
    id: 'risk',
    label: 'Risk',
    children: [
      { id: 'exposure', label: 'risk.credit.exposure' },
      { id: 'alerts', label: 'risk.aml.alerts' },
    ],
  },
  {
    id: 'run',
    label: 'Run the firm',
    children: [
      { id: 'transfers', label: 'payments.core.transfers' },
      { id: 'sla', label: 'ops.fulfillment.sla' },
      { id: 'headcount', label: 'hr.people.headcount' },
    ],
  },
];

export const metricRows = [
  { metric: 'Certified gold', actual: '84%', target: '80%', variance: '+4 pts', status: 'On track' },
  { metric: 'Named owners', actual: '97%', target: '95%', variance: '+2 pts', status: 'On track' },
  { metric: 'Rules passing', actual: '91.4%', target: '93%', variance: '−1.6 pts', status: 'Watch' },
  { metric: 'Access SLA', actual: '96%', target: '95%', variance: '+1 pt', status: 'On track' },
];

export const metricColumns = [
  { key: 'metric', label: 'Metric', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/catalog/ast_accounts
Authorization: Bearer vty_live_****

{
  "id": "ast_accounts",
  "name": "core.customer.accounts",
  "owner": "Priya Poluru",
  "status": "Certified"
}`;

export const qualityTrend = [82, 84, 85, 86, 88, 87, 89, 90, 90, 91, 91.2, 91.4];

export function buildSearchCatalog() {
  const assetHits = assets.map((item) => ({
    label: item.name,
    description: `${item.purpose} · ${item.owner}`,
    owner: item.owner,
    type: 'Asset',
    href: `#/asset/${item.id}`,
  }));
  const ruleHits = qualityRules.map((item) => ({
    label: item.name,
    description: `${item.asset} · ${item.status}`,
    owner: item.owner,
    type: 'Rule',
    href: '#/quality',
  }));
  const requestHits = accessRequests.map((item) => ({
    label: item.asset,
    description: `${item.requester} · ${item.status}`,
    owner: item.owner,
    type: 'Access',
    href: '#/access',
  }));
  const termHits = glossary.map((item) => ({
    label: item.term,
    description: item.definition,
    owner: item.owner,
    type: 'Term',
    href: '#/glossary',
  }));
  const peopleHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Person',
    href: '#/owners',
  }));
  return [
    ...assetHits,
    ...ruleHits,
    ...requestHits,
    ...termHits,
    ...peopleHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
