export const productName = 'Atlas';
export const productLine = 'Procurement';
export const workspaceName = 'Poluru Works';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@poluruworks.example',
  role: 'Head of procurement',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 · September',
  timezone: 'America / Chicago',
  budget: 4800000,
  spent: 1240000,
};

export const people = [
  { name: 'Subbu Poluru', role: 'Head of procurement', squad: 'Buy desk' },
  { name: 'Maya Poluru', role: 'Category lead · IT', squad: 'Buy desk' },
  { name: 'Kavya Poluru', role: 'Buyer', squad: 'Buy desk' },
  { name: 'Arjun Poluru', role: 'CFO', squad: 'Finance' },
  { name: 'Anika Poluru', role: 'General counsel', squad: 'Legal' },
  { name: 'Nikhil Poluru', role: 'Facilities lead', squad: 'Workplace' },
  { name: 'Rohan Poluru', role: 'COO', squad: 'Operations' },
  { name: 'Priya Poluru', role: 'Controller', squad: 'Finance' },
  { name: 'Ishaan Poluru', role: 'Supplier manager', squad: 'Buy desk' },
  { name: 'Leela Poluru', role: 'Product ops', squad: 'Product' },
  { name: 'Dev Poluru', role: 'Engineering manager', squad: 'Engineering' },
];

export const categoryOptions = [
  { label: 'IT', value: 'IT' },
  { label: 'Facilities', value: 'Facilities' },
  { label: 'Professional services', value: 'Professional services' },
  { label: 'Cloud', value: 'Cloud' },
  { label: 'Office', value: 'Office' },
];

export let requests = [
  { id: 'pr-1042', number: 'PR-1042', title: 'Laptop fleet refresh', requester: 'Leela Poluru', category: 'IT', amount: 48200, status: 'pending', supplier: 'Northline Hardware', needed: '2026-09-22', approver: 'Arjun Poluru', stage: 'approve' },
  { id: 'pr-1041', number: 'PR-1041', title: 'Helio Cloud seats', requester: 'Dev Poluru', category: 'Cloud', amount: 126000, status: 'approved', supplier: 'Helio Cloud', needed: '2026-09-18', approver: 'Arjun Poluru', stage: 'order' },
  { id: 'pr-1038', number: 'PR-1038', title: 'Studio task chairs', requester: 'Nikhil Poluru', category: 'Facilities', amount: 18400, status: 'draft', supplier: 'Cedar & Bolt', needed: '2026-10-03', approver: 'Subbu Poluru', stage: 'request' },
  { id: 'pr-1036', number: 'PR-1036', title: 'Warehouse label stock', requester: 'Rohan Poluru', category: 'Office', amount: 6200, status: 'ordered', supplier: 'Folio Print', needed: '2026-09-12', approver: 'Maya Poluru', stage: 'order' },
  { id: 'pr-1033', number: 'PR-1033', title: 'Design tool licenses', requester: 'Kavya Poluru', category: 'IT', amount: 9840, status: 'received', supplier: 'Quill Software', needed: '2026-09-01', approver: 'Maya Poluru', stage: 'receive' },
  { id: 'pr-1029', number: 'PR-1029', title: 'SOC 2 evidence support', requester: 'Anika Poluru', category: 'Professional services', amount: 42000, status: 'pending', supplier: 'Alder Advisory', needed: '2026-09-30', approver: 'Anika Poluru', stage: 'approve' },
  { id: 'pr-1024', number: 'PR-1024', title: 'Austin millwork', requester: 'Nikhil Poluru', category: 'Facilities', amount: 88500, status: 'rejected', supplier: 'Cedar & Bolt', needed: '2026-09-08', approver: 'Arjun Poluru', stage: 'request' },
  { id: 'pr-1021', number: 'PR-1021', title: 'API gateway add-on', requester: 'Dev Poluru', category: 'Cloud', amount: 61000, status: 'approved', supplier: 'Helio Cloud', needed: '2026-09-16', approver: 'Subbu Poluru', stage: 'order' },
];

export const approvals = [
  { id: 'ap-1', requestId: 'pr-1042', title: 'PR-1042 Laptop fleet refresh', amount: 48200, owner: 'Arjun Poluru', waiting: '4 days', status: 'pending', note: 'Over the $25k IT threshold.' },
  { id: 'ap-2', requestId: 'pr-1029', title: 'PR-1029 SOC 2 evidence support', amount: 42000, owner: 'Anika Poluru', waiting: '2 days', status: 'pending', note: 'Legal must countersign the SOW.' },
  { id: 'ap-3', requestId: 'pr-1041', title: 'PR-1041 Helio Cloud seats', amount: 126000, owner: 'Arjun Poluru', waiting: 'Done', status: 'approved', note: 'Seats locked for FY26.' },
  { id: 'ap-4', requestId: 'pr-1024', title: 'PR-1024 Austin millwork', amount: 88500, owner: 'Arjun Poluru', waiting: 'Done', status: 'rejected', note: 'Use the existing vendor bid first.' },
  { id: 'ap-5', requestId: 'pr-1021', title: 'PR-1021 API gateway add-on', amount: 61000, owner: 'Subbu Poluru', waiting: 'Done', status: 'approved', note: 'Covered in the Helio MSA.' },
  { id: 'ap-6', requestId: 'pr-1033', title: 'PR-1033 Design tool licenses', amount: 9840, owner: 'Maya Poluru', waiting: 'Done', status: 'approved', note: 'Under Maya Poluru’s IT limit.' },
];

export const suppliers = [
  { id: 'sup-northline', name: 'Northline Hardware', category: 'IT hardware', score: 92, lead: '5 days', priceIndex: 98, owner: 'Ishaan Poluru', status: 'preferred', quote: 48200, notes: 'Austin warehouse. Honest packing lists.' },
  { id: 'sup-cedar', name: 'Cedar & Bolt', category: 'Facilities', score: 81, lead: '12 days', priceIndex: 104, owner: 'Nikhil Poluru', status: 'active', quote: 19120, notes: 'Chairs and millwork. Watch freight.' },
  { id: 'sup-helio', name: 'Helio Cloud', category: 'Cloud', score: 88, lead: '2 days', priceIndex: 101, owner: 'Maya Poluru', status: 'preferred', quote: 126000, notes: 'MSA through 2027. Seat true-up in March.' },
  { id: 'sup-folio', name: 'Folio Print', category: 'Office', score: 76, lead: '7 days', priceIndex: 90, owner: 'Kavya Poluru', status: 'active', quote: 6200, notes: 'Labels and letterhead. Recycled stock.' },
  { id: 'sup-quill', name: 'Quill Software', category: 'SaaS', score: 85, lead: '1 day', priceIndex: 96, owner: 'Maya Poluru', status: 'preferred', quote: 9840, notes: 'Design suite. Annual, not monthly.' },
  { id: 'sup-alder', name: 'Alder Advisory', category: 'Services', score: 79, lead: '14 days', priceIndex: 110, owner: 'Anika Poluru', status: 'watch', quote: 42000, notes: 'SOC 2 evidence. Anika Poluru holds the SOW.' },
];

export const contracts = [
  { id: 'ct-helio', name: 'Helio Cloud MSA', supplier: 'Helio Cloud', owner: 'Maya Poluru', value: 420000, status: 'active', renews: '2027-03-01', term: '24 months' },
  { id: 'ct-northline', name: 'Northline hardware schedule', supplier: 'Northline Hardware', owner: 'Ishaan Poluru', value: 180000, status: 'active', renews: '2026-12-15', term: '12 months' },
  { id: 'ct-quill', name: 'Quill design suite', supplier: 'Quill Software', owner: 'Kavya Poluru', value: 38400, status: 'active', renews: '2026-11-02', term: '12 months' },
  { id: 'ct-alder', name: 'Alder Advisory SOW', supplier: 'Alder Advisory', owner: 'Anika Poluru', value: 42000, status: 'in_review', renews: '2026-09-30', term: '6 months' },
  { id: 'ct-cedar', name: 'Cedar facilities blanket', supplier: 'Cedar & Bolt', owner: 'Nikhil Poluru', value: 96000, status: 'expiring', renews: '2026-09-20', term: '12 months' },
  { id: 'ct-folio', name: 'Folio print retainer', supplier: 'Folio Print', owner: 'Kavya Poluru', value: 18000, status: 'active', renews: '2027-01-12', term: '12 months' },
];

export const spendByCategory = [
  { category: 'Cloud', amount: 412000, share: 33 },
  { category: 'IT hardware', amount: 286000, share: 23 },
  { category: 'Facilities', amount: 214000, share: 17 },
  { category: 'Professional services', amount: 168000, share: 14 },
  { category: 'SaaS', amount: 98000, share: 8 },
  { category: 'Office', amount: 62000, share: 5 },
];

export const spendTrend = [72, 78, 81, 88, 94, 101, 108, 112, 116, 119, 122, 124];

export const pipelineStages = [
  { id: 'request', label: 'Request', count: 2, href: '#/requests' },
  { id: 'approve', label: 'Approve', count: 2, href: '#/approvals', hot: true },
  { id: 'order', label: 'Order', count: 3, href: '#/requests' },
  { id: 'receive', label: 'Receive', count: 1, href: '#/requests' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Requests', href: '#/requests', icon: 'file' },
  { label: 'Approvals', href: '#/approvals', icon: 'check' },
  { label: 'Suppliers', href: '#/suppliers', icon: 'folder' },
  { label: 'Contracts', href: '#/contracts', icon: 'star' },
  { label: 'Spend', href: '#/spend', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'PR-1042 waiting on Arjun Poluru', description: '$48,200 · 4 days', icon: 'clock', href: '#/request/pr-1042' },
  { label: 'Cedar facilities blanket expires 20 Sep', description: 'Nikhil Poluru · renew or rebid', icon: 'alert-triangle', href: '#/contracts' },
  { label: 'Helio Cloud seats approved', description: 'Dev Poluru · order next', icon: 'check', href: '#/request/pr-1041' },
  { label: 'Alder SOW still in legal', description: 'Anika Poluru · PR-1029', icon: 'folder', href: '#/approvals' },
];

export const commandItems = [
  { label: 'Overview', description: 'Buy-desk pulse', href: '#/overview', icon: 'home' },
  { label: 'New request', description: 'Open a PR', href: '#add-request', icon: 'plus' },
  { label: 'Approvals', description: 'Waiting on finance or legal', href: '#/approvals', icon: 'check' },
  { label: 'Suppliers', description: 'Compare quotes', href: '#/suppliers', icon: 'folder' },
  { label: 'Contracts', description: 'MSAs and SOWs', href: '#/contracts', icon: 'star' },
  { label: 'Spend', description: 'YTD vs budget', href: '#/spend', icon: 'download' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const requestColumns = [
  { key: 'number', label: 'PR', sortable: true },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'requester', label: 'Requester' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'needed', label: 'Needed' },
];

export function pendingApprovals() {
  return approvals.filter((item) => item.status === 'pending');
}

export function overviewStats() {
  const open = requests.filter((item) => !['received', 'rejected'].includes(item.status)).length;
  const pending = pendingApprovals().length;
  return [
    { label: 'YTD spend', value: '$1.24M', hint: 'of $4.80M FY26 budget', trend: 'up', trendValue: '26%' },
    { label: 'Open requests', value: String(open), hint: `${pending} awaiting a signature`, trend: 'flat', trendValue: 'Hold' },
    { label: 'Pending approvals', value: String(pending), hint: 'Oldest is PR-1042', trend: 'down', trendValue: '−1' },
    { label: 'Awarded savings', value: '$186k', hint: 'vs first quote this year', trend: 'up', trendValue: '+12%' },
  ];
}

export function addRequest({ title, requester, category, amount, needed, supplier }) {
  const n = 1043 + requests.filter((item) => item.id.startsWith('pr-')).length;
  const id = `pr-${n}`;
  const record = {
    id,
    number: `PR-${n}`,
    title: title || 'Untitled request',
    requester: requester || currentUser.name,
    category: category || 'IT',
    amount: Number(amount) || 0,
    status: 'draft',
    supplier: supplier || 'TBD',
    needed: needed || '2026-10-01',
    approver: 'Subbu Poluru',
    stage: 'request',
  };
  requests = [record, ...requests];
  return record;
}

export function buildSearchCatalog() {
  const requestHits = requests.map((item) => ({
    label: `${item.number} ${item.title}`,
    description: `${item.requester} · ${item.status}`,
    owner: item.requester,
    type: 'Request',
    href: `#/request/${item.id}`,
  }));
  const supplierHits = suppliers.map((item) => ({
    label: item.name,
    description: `${item.category} · score ${item.score}`,
    owner: item.owner,
    type: 'Supplier',
    href: '#/suppliers',
  }));
  const contractHits = contracts.map((item) => ({
    label: item.name,
    description: `${item.supplier} · ${item.status}`,
    owner: item.owner,
    type: 'Contract',
    href: '#/contracts',
  }));
  const peopleHits = people.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.squad}`,
    owner: item.name,
    type: 'Person',
    href: '#/approvals',
  }));
  return [
    ...requestHits,
    ...supplierHits,
    ...contractHits,
    ...peopleHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
