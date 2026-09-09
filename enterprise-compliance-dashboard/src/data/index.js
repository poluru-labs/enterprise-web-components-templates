export const productName = 'Aegis';
export const productLine = 'Compliance';
export const workspaceName = 'Poluru Trust';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@polurutrust.example',
  role: 'Chief compliance officer',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 · September',
  timezone: 'America / Chicago',
  nextAudit: 'SOC 2 Type II · 18 Sep',
};

export const people = [
  { name: 'Subbu Poluru', role: 'Chief compliance officer', squad: 'Office of compliance' },
  { name: 'Anika Poluru', role: 'Head of privacy', squad: 'Privacy' },
  { name: 'Kavya Poluru', role: 'Policy manager', squad: 'Governance' },
  { name: 'Maya Poluru', role: 'Control owner · access', squad: 'Security' },
  { name: 'Dev Poluru', role: 'Security engineering', squad: 'Technology' },
  { name: 'Priya Poluru', role: 'Internal audit', squad: 'Audit' },
  { name: 'Nikhil Poluru', role: 'Enterprise risk', squad: 'Risk' },
  { name: 'Arjun Poluru', role: 'CFO · SOX owner', squad: 'Finance' },
  { name: 'Ishaan Poluru', role: 'Vendor risk', squad: 'Third party' },
  { name: 'Leela Poluru', role: 'Evidence librarian', squad: 'Audit' },
  { name: 'Rohan Poluru', role: 'COO', squad: 'Operations' },
  { name: 'Elena Poluru', role: 'General counsel', squad: 'Legal' },
];

export const frameworkOptions = [
  { label: 'SOC 2', value: 'SOC 2' },
  { label: 'ISO 27001', value: 'ISO 27001' },
  { label: 'GDPR', value: 'GDPR' },
  { label: 'HIPAA', value: 'HIPAA' },
  { label: 'SOX', value: 'SOX' },
];

export const frameworks = [
  { id: 'soc2', label: 'SOC 2', value: '88%', ready: 88, href: '#/audits', hot: true },
  { id: 'iso', label: 'ISO 27001', value: '81%', ready: 81, href: '#/controls' },
  { id: 'gdpr', label: 'GDPR', value: '74%', ready: 74, href: '#/policies' },
  { id: 'hipaa', label: 'HIPAA', value: '92%', ready: 92, href: '#/controls' },
];

export let policies = [
  { id: 'pol-isp', code: 'POL-01', name: 'Information security policy', owner: 'Kavya Poluru', status: 'published', version: '3.2', updated: '2026-08-12', framework: 'SOC 2', review: '2026-11-12' },
  { id: 'pol-access', code: 'POL-02', name: 'Access control policy', owner: 'Maya Poluru', status: 'published', version: '2.4', updated: '2026-07-28', framework: 'ISO 27001', review: '2026-10-28' },
  { id: 'pol-retain', code: 'POL-03', name: 'Data retention policy', owner: 'Anika Poluru', status: 'in_review', version: '1.9', updated: '2026-09-04', framework: 'GDPR', review: '2026-09-18' },
  { id: 'pol-ir', code: 'POL-04', name: 'Incident response policy', owner: 'Dev Poluru', status: 'published', version: '2.1', updated: '2026-06-19', framework: 'SOC 2', review: '2026-12-19' },
  { id: 'pol-vendor', code: 'POL-05', name: 'Vendor risk policy', owner: 'Ishaan Poluru', status: 'watch', version: '1.4', updated: '2026-08-30', framework: 'SOC 2', review: '2026-09-20' },
  { id: 'pol-aup', code: 'POL-06', name: 'Acceptable use policy', owner: 'Kavya Poluru', status: 'published', version: '4.0', updated: '2026-05-02', framework: 'ISO 27001', review: '2027-05-02' },
  { id: 'pol-privacy', code: 'POL-07', name: 'Privacy notice', owner: 'Anika Poluru', status: 'published', version: '2.8', updated: '2026-08-01', framework: 'GDPR', review: '2027-02-01' },
  { id: 'pol-bcp', code: 'POL-08', name: 'Business continuity policy', owner: 'Nikhil Poluru', status: 'draft', version: '0.6', updated: '2026-09-02', framework: 'SOC 2', review: '2026-10-01' },
];

export const controls = [
  { id: 'ctl-cc61', code: 'CC6.1', name: 'Logical access', framework: 'SOC 2', owner: 'Maya Poluru', status: 'mapped', coverage: 94, evidence: 12 },
  { id: 'ctl-a82', code: 'A.8.2', name: 'Privileged access rights', framework: 'ISO 27001', owner: 'Maya Poluru', status: 'gap', coverage: 61, evidence: 4 },
  { id: 'ctl-art32', code: 'Art. 32', name: 'Security of processing', framework: 'GDPR', owner: 'Anika Poluru', status: 'watch', coverage: 72, evidence: 7 },
  { id: 'ctl-hipaa', code: '164.312(a)', name: 'Unique user identification', framework: 'HIPAA', owner: 'Dev Poluru', status: 'mapped', coverage: 96, evidence: 9 },
  { id: 'ctl-cc71', code: 'CC7.1', name: 'Detection of anomalies', framework: 'SOC 2', owner: 'Dev Poluru', status: 'mapped', coverage: 88, evidence: 11 },
  { id: 'ctl-sox', code: 'ITGC-CH', name: 'Change management', framework: 'SOX', owner: 'Arjun Poluru', status: 'watch', coverage: 79, evidence: 6 },
  { id: 'ctl-a51', code: 'A.5.1', name: 'Policies for information security', framework: 'ISO 27001', owner: 'Kavya Poluru', status: 'mapped', coverage: 91, evidence: 8 },
  { id: 'ctl-art30', code: 'Art. 30', name: 'Records of processing', framework: 'GDPR', owner: 'Elena Poluru', status: 'gap', coverage: 54, evidence: 3 },
];

export const audits = [
  { id: 'aud-soc2', name: 'SOC 2 Type II', auditor: 'Alder Advisory', owner: 'Priya Poluru', status: 'ready', window: '18–29 Sep 2026', due: '2026-09-18', framework: 'SOC 2' },
  { id: 'aud-iso', name: 'ISO 27001 surveillance', auditor: 'Northline Cert', owner: 'Dev Poluru', status: 'watch', window: '12–16 Oct 2026', due: '2026-10-12', framework: 'ISO 27001' },
  { id: 'aud-hipaa', name: 'HIPAA walkthrough', auditor: 'Internal', owner: 'Anika Poluru', status: 'scheduled', window: '4 Nov 2026', due: '2026-11-04', framework: 'HIPAA' },
  { id: 'aud-dpia', name: 'GDPR DPIA review', auditor: 'Elena Poluru', owner: 'Anika Poluru', status: 'in_progress', window: '20 Sep 2026', due: '2026-09-20', framework: 'GDPR' },
  { id: 'aud-sox', name: 'SOX Q3 ITGC', auditor: 'Folio Audit', owner: 'Arjun Poluru', status: 'scheduled', window: '6–10 Oct 2026', due: '2026-10-06', framework: 'SOX' },
  { id: 'aud-vendor', name: 'Vendor sample test', auditor: 'Internal', owner: 'Ishaan Poluru', status: 'watch', window: '15 Sep 2026', due: '2026-09-15', framework: 'SOC 2' },
];

export let tasks = [
  { id: 'tsk-1', title: 'Close access review for Lit 11 production', owner: 'Maya Poluru', due: '2026-09-12', status: 'open', framework: 'SOC 2', control: 'CC6.1' },
  { id: 'tsk-2', title: 'Attach Art. 30 processing records', owner: 'Elena Poluru', due: '2026-09-16', status: 'overdue', framework: 'GDPR', control: 'Art. 30' },
  { id: 'tsk-3', title: 'Re-test privileged access exceptions', owner: 'Dev Poluru', due: '2026-09-14', status: 'open', framework: 'ISO 27001', control: 'A.8.2' },
  { id: 'tsk-4', title: 'Upload Q3 change tickets to the locker', owner: 'Leela Poluru', due: '2026-09-11', status: 'in_progress', framework: 'SOX', control: 'ITGC-CH' },
  { id: 'tsk-5', title: 'Vendor questionnaire for Helio Cloud', owner: 'Ishaan Poluru', due: '2026-09-18', status: 'open', framework: 'SOC 2', control: 'CC9.2' },
  { id: 'tsk-6', title: 'Publish retention policy v1.9', owner: 'Anika Poluru', due: '2026-09-18', status: 'in_review', framework: 'GDPR', control: 'Art. 32' },
  { id: 'tsk-7', title: 'Tabletop the incident runbook', owner: 'Dev Poluru', due: '2026-09-22', status: 'open', framework: 'SOC 2', control: 'CC7.4' },
  { id: 'tsk-8', title: 'Confirm HIPAA unique-ID evidence', owner: 'Leela Poluru', due: '2026-09-10', status: 'done', framework: 'HIPAA', control: '164.312(a)' },
];

export const evidence = [
  { id: 'ev-1', name: 'Q3 access review export', control: 'CC6.1', owner: 'Maya Poluru', status: 'current', collected: '2026-09-03', type: 'CSV' },
  { id: 'ev-2', name: 'Okta MFA screenshot pack', control: 'CC6.1', owner: 'Leela Poluru', status: 'current', collected: '2026-08-28', type: 'PDF' },
  { id: 'ev-3', name: 'Change ticket sample CH-4412', control: 'ITGC-CH', owner: 'Arjun Poluru', status: 'watch', collected: '2026-08-19', type: 'PDF' },
  { id: 'ev-4', name: 'DPIA for member portal', control: 'Art. 32', owner: 'Anika Poluru', status: 'in_review', collected: '2026-09-01', type: 'DOCX' },
  { id: 'ev-5', name: 'Privileged access exceptions', control: 'A.8.2', owner: 'Dev Poluru', status: 'gap', collected: '2026-07-22', type: 'XLSX' },
  { id: 'ev-6', name: 'HIPAA unique ID config', control: '164.312(a)', owner: 'Leela Poluru', status: 'current', collected: '2026-09-08', type: 'PNG' },
];

export const findings = [
  { id: 'fnd-1', title: 'Privileged access reviews skipped in July', owner: 'Maya Poluru', severity: 'high', status: 'open', audit: 'ISO 27001 surveillance', due: '2026-09-14' },
  { id: 'fnd-2', title: 'RoPA missing two processors', owner: 'Elena Poluru', severity: 'medium', status: 'open', audit: 'GDPR DPIA review', due: '2026-09-16' },
  { id: 'fnd-3', title: 'Vendor Helio Cloud questionnaire stale', owner: 'Ishaan Poluru', severity: 'medium', status: 'watch', audit: 'Vendor sample test', due: '2026-09-18' },
  { id: 'fnd-4', title: 'Change tickets lack rollback notes', owner: 'Arjun Poluru', severity: 'low', status: 'in_progress', audit: 'SOX Q3 ITGC', due: '2026-10-01' },
  { id: 'fnd-5', title: 'MFA coverage 99.2% on contractor accounts', owner: 'Dev Poluru', severity: 'low', status: 'closed', audit: 'SOC 2 Type II', due: '2026-08-20' },
  { id: 'fnd-6', title: 'Retention schedule not linked to POL-03', owner: 'Anika Poluru', severity: 'high', status: 'open', audit: 'GDPR DPIA review', due: '2026-09-18' },
];

export const readinessTrend = [62, 65, 68, 71, 74, 76, 78, 80, 82, 84, 86, 88];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Policies', href: '#/policies', icon: 'file' },
  { label: 'Controls', href: '#/controls', icon: 'check' },
  { label: 'Audits', href: '#/audits', icon: 'eye' },
  { label: 'Tasks', href: '#/tasks', icon: 'star' },
  { label: 'Evidence', href: '#/evidence', icon: 'folder' },
  { label: 'Findings', href: '#/findings', icon: 'bell' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'SOC 2 fieldwork starts 18 Sep', description: 'Priya Poluru · Alder Advisory', icon: 'clock', href: '#/audits' },
  { label: 'Art. 30 records still a gap', description: 'Elena Poluru · GDPR', icon: 'alert-triangle', href: '#/findings' },
  { label: 'Access review due Friday', description: 'Maya Poluru · CC6.1', icon: 'check', href: '#/tasks' },
  { label: 'Retention policy in legal', description: 'Anika Poluru · POL-03', icon: 'folder', href: '#/policy/pol-retain' },
];

export const commandItems = [
  { label: 'Overview', description: 'Readiness pulse', href: '#/overview', icon: 'home' },
  { label: 'New policy', description: 'Open a draft', href: '#add-policy', icon: 'plus' },
  { label: 'Policies', description: 'Living register', href: '#/policies', icon: 'file' },
  { label: 'Controls', description: 'Framework mapping', href: '#/controls', icon: 'check' },
  { label: 'Audits', description: 'Fieldwork calendar', href: '#/audits', icon: 'eye' },
  { label: 'Tasks', description: 'Open work', href: '#/tasks', icon: 'star' },
  { label: 'Evidence', description: 'Locker', href: '#/evidence', icon: 'folder' },
  { label: 'Findings', description: 'Exceptions', href: '#/findings', icon: 'bell' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export function openTasks() {
  return tasks.filter((item) => !['done', 'closed'].includes(item.status));
}

export function openFindings() {
  return findings.filter((item) => item.status !== 'closed');
}

export function overviewStats() {
  const published = policies.filter((item) => item.status === 'published').length;
  const gaps = controls.filter((item) => item.status === 'gap').length;
  const open = openTasks().length;
  return [
    { label: 'SOC 2 readiness', value: '88%', hint: 'Fieldwork 18 Sep · Priya Poluru', trend: 'up', trendValue: '+4 pts' },
    { label: 'Published policies', value: String(published), hint: `${policies.length} on the register`, trend: 'flat', trendValue: 'Hold' },
    { label: 'Control gaps', value: String(gaps), hint: 'ISO A.8.2 and GDPR Art. 30', trend: 'down', trendValue: '−1' },
    { label: 'Open tasks', value: String(open), hint: `${openFindings().length} findings still open`, trend: 'down', trendValue: '−2' },
  ];
}

export function addPolicy({ name, owner, framework }) {
  const n = policies.length + 1;
  const code = `POL-${String(n).padStart(2, '0')}`;
  const id = `pol-${String(n).padStart(2, '0')}`;
  const record = {
    id,
    code,
    name: name || 'Untitled policy',
    owner: owner || currentUser.name,
    status: 'draft',
    version: '0.1',
    updated: '2026-09-08',
    framework: framework || 'SOC 2',
    review: '2026-12-08',
  };
  policies = [record, ...policies];
  return record;
}

export function addTask({ title, owner, framework }) {
  const n = tasks.length + 1;
  const record = {
    id: `tsk-${n}`,
    title: title || 'Untitled task',
    owner: owner || currentUser.name,
    due: '2026-09-30',
    status: 'open',
    framework: framework || 'SOC 2',
    control: '—',
  };
  tasks = [record, ...tasks];
  return record;
}

export function buildSearchCatalog() {
  const policyHits = policies.map((item) => ({
    label: `${item.code} ${item.name}`,
    description: `${item.owner} · ${item.status}`,
    owner: item.owner,
    type: 'Policy',
    href: `#/policy/${item.id}`,
  }));
  const controlHits = controls.map((item) => ({
    label: `${item.code} ${item.name}`,
    description: `${item.framework} · ${item.status}`,
    owner: item.owner,
    type: 'Control',
    href: '#/controls',
  }));
  const auditHits = audits.map((item) => ({
    label: item.name,
    description: `${item.auditor} · ${item.status}`,
    owner: item.owner,
    type: 'Audit',
    href: '#/audits',
  }));
  const taskHits = tasks.map((item) => ({
    label: item.title,
    description: `${item.owner} · ${item.status}`,
    owner: item.owner,
    type: 'Task',
    href: '#/tasks',
  }));
  const findingHits = findings.map((item) => ({
    label: item.title,
    description: `${item.severity} · ${item.status}`,
    owner: item.owner,
    type: 'Finding',
    href: '#/findings',
  }));
  const peopleHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Person',
    href: '#/tasks',
  }));
  return [
    ...policyHits,
    ...controlHits,
    ...auditHits,
    ...taskHits,
    ...findingHits,
    ...peopleHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
