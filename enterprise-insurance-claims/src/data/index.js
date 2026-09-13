export const productName = 'Beacon';
export const productLine = 'Insurance';
export const workspaceName = 'Poluru Cover';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@polurucover.example',
  role: 'Claims director',
};

export const workspace = {
  name: workspaceName,
  period: 'Book · 12 Sep 2026',
  timezone: 'America / Chicago',
  markets: 'Austin · Dallas · Houston',
};

export const people = [
  { name: 'Subbu Poluru', role: 'Claims director', squad: 'Desk' },
  { name: 'Subra Poluru', role: 'Senior adjuster', squad: 'Field' },
  { name: 'Kavya Poluru', role: 'Desk adjuster', squad: 'Desk' },
  { name: 'Maya Poluru', role: 'Coverage counsel', squad: 'Legal' },
  { name: 'Arjun Poluru', role: 'Reserves controller', squad: 'Finance' },
  { name: 'Leela Poluru', role: 'Intake lead', squad: 'Desk' },
  { name: 'Nikhil Poluru', role: 'SIU investigator', squad: 'SIU' },
  { name: 'Rohan Poluru', role: 'Field adjuster', squad: 'Field' },
  { name: 'Priya Poluru', role: 'Settlements', squad: 'Desk' },
  { name: 'Ishaan Poluru', role: 'Catastrophe', squad: 'Field' },
  { name: 'Asha Poluru', role: 'Appraiser', squad: 'Field' },
  { name: 'Dev Poluru', role: 'Liability specialist', squad: 'Desk' },
];

export let claims = [
  { id: 'bc-harbor', code: 'BC-104', title: 'Harborwell water loss', city: 'Austin', line: 'home', stage: 'assigned', status: 'open', adjuster: 'Subra Poluru', insured: 'Anika Poluru', policy: 'POL-104', reserve: 184000, loss: '2026-09-08' },
  { id: 'bc-alder', code: 'BC-218', title: 'Alder Hall hail', city: 'Dallas', line: 'home', stage: 'assigned', status: 'open', adjuster: 'Rohan Poluru', insured: 'Mira Poluru', policy: 'POL-218', reserve: 420000, loss: '2026-09-06' },
  { id: 'bc-quill', code: 'BC-331', title: 'Quill fire at studio', city: 'Austin', line: 'commercial', stage: 'investigate', status: 'siu', adjuster: 'Nikhil Poluru', insured: 'Quill Studio LLC', policy: 'POL-331', reserve: 1240000, loss: '2026-09-04' },
  { id: 'bc-cedar', code: 'BC-412', title: 'Cedar Yard cargo', city: 'Houston', line: 'cargo', stage: 'intake', status: 'open', adjuster: 'Leela Poluru', insured: 'Folio Mechanical', policy: 'POL-412', reserve: 640000, loss: '2026-09-11' },
  { id: 'bc-lotline', code: 'BC-509', title: 'Lotline slip-and-fall', city: 'Austin', line: 'liability', stage: 'assigned', status: 'open', adjuster: 'Dev Poluru', insured: 'Lotline Partners', policy: 'POL-509', reserve: 840000, loss: '2026-09-02' },
  { id: 'bc-stride', code: 'BC-627', title: 'Stride windshield', city: 'Dallas', line: 'auto', stage: 'settle', status: 'ready', adjuster: 'Priya Poluru', insured: 'Kavya Poluru', policy: 'POL-627', reserve: 42000, loss: '2026-09-10' },
  { id: 'bc-flare', code: 'BC-740', title: 'Flare waterfront flood', city: 'Galveston', line: 'flood', stage: 'investigate', status: 'watch', adjuster: 'Subra Poluru', insured: 'Leela Poluru', policy: 'POL-740', reserve: 380000, loss: '2026-09-01' },
  { id: 'bc-nimbus', code: 'BC-851', title: 'Nimbus ransomware', city: 'Round Rock', line: 'cyber', stage: 'intake', status: 'open', adjuster: 'Ishaan Poluru', insured: 'Nimbus Low Voltage', policy: 'POL-851', reserve: 1054000, loss: '2026-09-12' },
];

export const adjusters = [
  { id: 'adj-subra', name: 'Subra Poluru', role: 'Senior adjuster', city: 'Austin', open: 6, closed: 41, score: 94, status: 'field' },
  { id: 'adj-rohan', name: 'Rohan Poluru', role: 'Field adjuster', city: 'Dallas', open: 4, closed: 28, score: 88, status: 'field' },
  { id: 'adj-kavya', name: 'Kavya Poluru', role: 'Desk adjuster', city: 'Austin', open: 8, closed: 62, score: 91, status: 'desk' },
  { id: 'adj-nikhil', name: 'Nikhil Poluru', role: 'SIU investigator', city: 'Houston', open: 3, closed: 19, score: 96, status: 'siu' },
  { id: 'adj-asha', name: 'Asha Poluru', role: 'Appraiser', city: 'Austin', open: 2, closed: 34, score: 90, status: 'field' },
  { id: 'adj-dev', name: 'Dev Poluru', role: 'Liability specialist', city: 'Austin', open: 5, closed: 22, score: 87, status: 'desk' },
  { id: 'adj-ishaan', name: 'Ishaan Poluru', role: 'Catastrophe', city: 'Galveston', open: 4, closed: 17, score: 85, status: 'field' },
  { id: 'adj-priya', name: 'Priya Poluru', role: 'Settlements', city: 'Dallas', open: 7, closed: 54, score: 93, status: 'desk' },
];

export const policies = [
  { id: 'pol-104', number: 'POL-104', insured: 'Anika Poluru', line: 'HO-3', city: 'Austin', premium: 1840, status: 'verified', owner: 'Maya Poluru' },
  { id: 'pol-218', number: 'POL-218', insured: 'Mira Poluru', line: 'HO-3', city: 'Dallas', premium: 1620, status: 'pending', owner: 'Maya Poluru' },
  { id: 'pol-331', number: 'POL-331', insured: 'Quill Studio LLC', line: 'BOP', city: 'Austin', premium: 12400, status: 'verified', owner: 'Maya Poluru' },
  { id: 'pol-412', number: 'POL-412', insured: 'Folio Mechanical', line: 'Cargo', city: 'Houston', premium: 8600, status: 'lapsed', owner: 'Arjun Poluru' },
  { id: 'pol-509', number: 'POL-509', insured: 'Lotline Partners', line: 'CGL', city: 'Austin', premium: 24800, status: 'verified', owner: 'Maya Poluru' },
  { id: 'pol-627', number: 'POL-627', insured: 'Kavya Poluru', line: 'PAP', city: 'Dallas', premium: 980, status: 'verified', owner: 'Priya Poluru' },
  { id: 'pol-740', number: 'POL-740', insured: 'Leela Poluru', line: 'Flood', city: 'Galveston', premium: 2140, status: 'pending', owner: 'Maya Poluru' },
  { id: 'pol-851', number: 'POL-851', insured: 'Nimbus Low Voltage', line: 'Cyber', city: 'Round Rock', premium: 18600, status: 'verified', owner: 'Arjun Poluru' },
];

export const fraudFlags = [
  { id: 'fr-331', claim: 'BC-331', title: 'Duplicate scene photos', property: 'Quill fire at studio', reporter: 'Nikhil Poluru', date: '2026-09-11', status: 'open', severity: 'high' },
  { id: 'fr-412', claim: 'BC-412', title: 'Policy lapsed on loss date', property: 'Cedar Yard cargo', reporter: 'Maya Poluru', date: '2026-09-12', status: 'open', severity: 'high' },
  { id: 'fr-740', claim: 'BC-740', title: 'Late notice after 10 days', property: 'Flare waterfront flood', reporter: 'Subra Poluru', date: '2026-09-10', status: 'watch', severity: 'medium' },
  { id: 'fr-627', claim: 'BC-627', title: 'VIN mismatch on estimate', property: 'Stride windshield', reporter: 'Kavya Poluru', date: '2026-09-11', status: 'closed', severity: 'low' },
  { id: 'fr-218', claim: 'BC-218', title: 'Prior hail claim same roof', property: 'Alder Hall hail', reporter: 'Rohan Poluru', date: '2026-09-09', status: 'watch', severity: 'medium' },
  { id: 'fr-104', claim: 'BC-104', title: 'Contractor on preferred list', property: 'Harborwell water loss', reporter: 'Asha Poluru', date: '2026-09-12', status: 'closed', severity: 'low' },
  { id: 'fr-509', claim: 'BC-509', title: 'Witness statement conflict', property: 'Lotline slip-and-fall', reporter: 'Dev Poluru', date: '2026-09-08', status: 'open', severity: 'medium' },
  { id: 'fr-851', claim: 'BC-851', title: 'Invoice from related vendor', property: 'Nimbus ransomware', reporter: 'Nikhil Poluru', date: '2026-09-12', status: 'open', severity: 'high' },
];

export const settlements = [
  { id: 'st-627', claim: 'BC-627', insured: 'Kavya Poluru', amount: 3800, reserved: 42000, owner: 'Priya Poluru', date: '2026-09-12', status: 'paid' },
  { id: 'st-104', claim: 'BC-104', insured: 'Anika Poluru', amount: 0, reserved: 184000, owner: 'Subra Poluru', date: '2026-09-12', status: 'reserved' },
  { id: 'st-218', claim: 'BC-218', insured: 'Mira Poluru', amount: 0, reserved: 420000, owner: 'Rohan Poluru', date: '2026-09-11', status: 'reserved' },
  { id: 'st-331', claim: 'BC-331', insured: 'Quill Studio LLC', amount: 0, reserved: 1240000, owner: 'Nikhil Poluru', date: '2026-09-10', status: 'hold' },
  { id: 'st-412', claim: 'BC-412', insured: 'Folio Mechanical', amount: 0, reserved: 640000, owner: 'Leela Poluru', date: '2026-09-12', status: 'hold' },
  { id: 'st-509', claim: 'BC-509', insured: 'Lotline Partners', amount: 0, reserved: 840000, owner: 'Dev Poluru', date: '2026-09-09', status: 'reserved' },
  { id: 'st-740', claim: 'BC-740', insured: 'Leela Poluru', amount: 0, reserved: 380000, owner: 'Subra Poluru', date: '2026-09-08', status: 'hold' },
  { id: 'st-851', claim: 'BC-851', insured: 'Nimbus Low Voltage', amount: 0, reserved: 1054000, owner: 'Ishaan Poluru', date: '2026-09-12', status: 'reserved' },
];

export const paidTrend = [1.1, 1.4, 1.6, 1.9, 2.2, 2.6, 2.9, 3.3, 3.6, 3.9, 4.2, 4.8];

export const claimStages = [
  { id: 'intake', label: 'Intake', count: 2, href: '#/claims' },
  { id: 'assigned', label: 'Assigned', count: 3, href: '#/adjusters', hot: true },
  { id: 'investigate', label: 'Investigate', count: 2, href: '#/fraud' },
  { id: 'settle', label: 'Settle', count: 1, href: '#/settlements' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Claims', href: '#/claims', icon: 'folder' },
  { label: 'Adjusters', href: '#/adjusters', icon: 'user' },
  { label: 'Policies', href: '#/policies', icon: 'file' },
  { label: 'Fraud', href: '#/fraud', icon: 'star' },
  { label: 'Settlements', href: '#/settlements', icon: 'check' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'Cedar cargo policy lapsed', description: 'Maya Poluru · POL-412', icon: 'alert-triangle', href: '#/policies' },
  { label: 'Quill fire is in SIU', description: 'Nikhil Poluru · BC-331', icon: 'clock', href: '#/fraud' },
  { label: 'Stride glass ready to pay', description: 'Priya Poluru · $3,800', icon: 'check', href: '#/settlements' },
  { label: 'Harborwell still unassigned photos', description: 'Subra Poluru · BC-104', icon: 'file', href: '#/claim/bc-harbor' },
];

export const commandItems = [
  { label: 'Overview', description: 'Claims pulse', href: '#/overview', icon: 'home' },
  { label: 'Log claim', description: 'Open a first notice', href: '#log-claim', icon: 'plus' },
  { label: 'Claims', description: 'Leela Poluru’s intake', href: '#/claims', icon: 'folder' },
  { label: 'Adjusters', description: 'Subra Poluru’s bench', href: '#/adjusters', icon: 'user' },
  { label: 'Policies', description: 'Maya Poluru’s book', href: '#/policies', icon: 'file' },
  { label: 'Fraud', description: 'Nikhil Poluru’s SIU', href: '#/fraud', icon: 'star' },
  { label: 'Settlements', description: 'Priya Poluru’s payables', href: '#/settlements', icon: 'check' },
  { label: 'Settings', description: 'Cover desk defaults', href: '#/settings', icon: 'settings' },
];

export const lineOptions = [
  { label: 'Home', value: 'home' },
  { label: 'Auto', value: 'auto' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Liability', value: 'liability' },
  { label: 'Cargo', value: 'cargo' },
  { label: 'Flood', value: 'flood' },
  { label: 'Cyber', value: 'cyber' },
];

export function overviewStats() {
  const open = claims.filter((item) => ['open', 'siu', 'watch'].includes(item.status)).length;
  const reserved = claims.reduce((sum, item) => sum + item.reserve, 0);
  const flags = fraudFlags.filter((item) => ['open', 'watch'].includes(item.status)).length;
  return [
    { label: 'Open claims', value: String(open), hint: 'Austin, Dallas, Houston, coast', trend: 'flat', trendValue: 'Book' },
    { label: 'Reserved', value: `$${(reserved / 1_000_000).toFixed(1)}M`, hint: 'Arjun Poluru’s book', trend: 'up', trendValue: '+4%' },
    { label: 'SIU flags', value: String(flags), hint: 'Nikhil Poluru · SIU', trend: 'up', trendValue: '2 high' },
    { label: 'Ready to pay', value: '1', hint: 'Priya Poluru · Stride', trend: 'flat', trendValue: 'Today' },
  ];
}

export function addClaim({ title, city, line, insured }) {
  const number = 100 + claims.length + 1;
  const record = {
    id: `bc-${number}`,
    code: `BC-${number}`,
    title,
    city: city || 'Austin',
    line: line || 'home',
    stage: 'intake',
    status: 'open',
    adjuster: 'Leela Poluru',
    insured: insured || currentUser.name,
    policy: 'POL-NEW',
    reserve: 25000,
    loss: '2026-09-12',
  };
  claims.unshift(record);
  return record;
}

export function buildSearchCatalog() {
  const claimHits = claims.map((item) => ({
    label: `${item.code} ${item.title}`,
    description: `${item.city} · ${item.adjuster}`,
    owner: item.adjuster,
    type: 'Claim',
    href: `#/claim/${item.id}`,
  }));
  const policyHits = policies.map((item) => ({
    label: item.number,
    description: `${item.insured} · ${item.line}`,
    owner: item.owner,
    type: 'Policy',
    href: '#/policies',
  }));
  const flagHits = fraudFlags.map((item) => ({
    label: item.title,
    description: `${item.claim} · ${item.reporter}`,
    owner: item.reporter,
    type: 'Fraud',
    href: '#/fraud',
  }));
  return [
    ...claimHits,
    ...policyHits,
    ...flagHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
