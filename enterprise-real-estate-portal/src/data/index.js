export const productName = 'Haven';
export const productLine = 'Real estate';
export const workspaceName = 'Poluru Homes';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@poluruhomes.example',
  role: 'Portfolio director',
};

export const workspace = {
  name: workspaceName,
  period: 'Book · 12 Sep 2026',
  timezone: 'America / Chicago',
  markets: 'Austin · Dallas · Houston',
};

export const people = [
  { name: 'Subbu Poluru', role: 'Portfolio director', squad: 'Assets' },
  { name: 'Subra Poluru', role: 'Property manager', squad: 'Field' },
  { name: 'Kavya Poluru', role: 'Leasing manager', squad: 'Leasing' },
  { name: 'Maya Poluru', role: 'Asset manager', squad: 'Assets' },
  { name: 'Arjun Poluru', role: 'Controller', squad: 'Finance' },
  { name: 'Leela Poluru', role: 'Occupancy analyst', squad: 'Leasing' },
  { name: 'Nikhil Poluru', role: 'Facilities lead', squad: 'Ops' },
  { name: 'Rohan Poluru', role: 'Building engineer', squad: 'Ops' },
  { name: 'Priya Poluru', role: 'Lease admin', squad: 'Leasing' },
  { name: 'Ishaan Poluru', role: 'Tenant success', squad: 'Leasing' },
  { name: 'Asha Poluru', role: 'Inspections', squad: 'Ops' },
  { name: 'Dev Poluru', role: 'MEP manager', squad: 'Ops' },
];

export const properties = [
  { id: 'hv-harbor', code: 'HV-104', name: 'Harborwell Residences', city: 'Austin', type: 'multifamily', units: 240, occupied: 228, occupancy: 95, noi: 4200000, rent: 2150, pm: 'Subra Poluru', status: 'leased' },
  { id: 'hv-alder', code: 'HV-218', name: 'Alder Hall lofts', city: 'Dallas', type: 'multifamily', units: 86, occupied: 79, occupancy: 92, noi: 1680000, rent: 1875, pm: 'Kavya Poluru', status: 'leased' },
  { id: 'hv-quill', code: 'HV-331', name: 'Quill Campus flats', city: 'Austin', type: 'multifamily', units: 64, occupied: 61, occupancy: 95, noi: 980000, rent: 1640, pm: 'Subra Poluru', status: 'leased' },
  { id: 'hv-cedar', code: 'HV-412', name: 'Cedar Yard industrial', city: 'Houston', type: 'industrial', units: 12, occupied: 10, occupancy: 83, noi: 2100000, rent: 18400, pm: 'Dev Poluru', status: 'watch' },
  { id: 'hv-lotline', code: 'HV-509', name: 'Lotline tower', city: 'Austin', type: 'office', units: 42, occupied: 38, occupancy: 90, noi: 5400000, rent: 31200, pm: 'Maya Poluru', status: 'leased' },
  { id: 'hv-stride', code: 'HV-627', name: 'Stride court', city: 'Dallas', type: 'retail', units: 22, occupied: 21, occupancy: 95, noi: 1260000, rent: 6400, pm: 'Kavya Poluru', status: 'leased' },
  { id: 'hv-flare', code: 'HV-740', name: 'Flare waterfront', city: 'Galveston', type: 'multifamily', units: 48, occupied: 41, occupancy: 85, noi: 720000, rent: 1720, pm: 'Rohan Poluru', status: 'watch' },
  { id: 'hv-nimbus', code: 'HV-851', name: 'Nimbus park', city: 'Round Rock', type: 'industrial', units: 8, occupied: 8, occupancy: 100, noi: 1880000, rent: 22100, pm: 'Priya Poluru', status: 'leased' },
];

export const leases = [
  { id: 'ls-harbor', property: 'Harborwell Residences', unit: '12B', tenant: 'Anika Poluru', start: '2024-08-01', end: '2026-07-31', rent: 2150, manager: 'Kavya Poluru', status: 'active' },
  { id: 'ls-alder', property: 'Alder Hall lofts', unit: '4C', tenant: 'Mira Poluru', start: '2025-01-15', end: '2026-01-14', rent: 1875, manager: 'Kavya Poluru', status: 'notice' },
  { id: 'ls-cedar', property: 'Cedar Yard industrial', unit: 'Bay 3', tenant: 'Folio Mechanical', start: '2023-03-01', end: '2026-02-28', rent: 18400, manager: 'Priya Poluru', status: 'active' },
  { id: 'ls-lotline', property: 'Lotline tower', unit: 'Floor 9', tenant: 'Quill Studio LLC', start: '2024-06-01', end: '2027-05-31', rent: 31200, manager: 'Maya Poluru', status: 'active' },
  { id: 'ls-stride', property: 'Stride court', unit: 'Shop 6', tenant: 'Northline Goods', start: '2025-04-01', end: '2026-03-31', rent: 6400, manager: 'Kavya Poluru', status: 'active' },
  { id: 'ls-flare', property: 'Flare waterfront', unit: '2A', tenant: 'Leela Poluru', start: '2023-11-01', end: '2025-10-31', rent: 1720, manager: 'Rohan Poluru', status: 'expired' },
  { id: 'ls-quill', property: 'Quill Campus flats', unit: '8D', tenant: 'Ishaan Poluru', start: '2026-10-01', end: '2027-09-30', rent: 1640, manager: 'Subra Poluru', status: 'draft' },
  { id: 'ls-nimbus', property: 'Nimbus park', unit: 'Bay 1', tenant: 'Nimbus Low Voltage', start: '2024-02-01', end: '2027-01-31', rent: 22100, manager: 'Priya Poluru', status: 'active' },
];

export let workOrders = [
  { id: 'wo-881', property: 'Cedar Yard industrial', unit: 'Bay 4', type: 'Roof', title: 'Standing water at loading dock', reporter: 'Nikhil Poluru', date: '2026-09-11', status: 'open', priority: 'high' },
  { id: 'wo-874', property: 'Harborwell Residences', unit: '12B', type: 'HVAC', title: 'AC short-cycling', reporter: 'Subra Poluru', date: '2026-09-12', status: 'in_progress', priority: 'medium' },
  { id: 'wo-868', property: 'Alder Hall lofts', unit: 'Lobby', type: 'Elevator', title: 'Cab 2 door delay', reporter: 'Rohan Poluru', date: '2026-09-10', status: 'scheduled', priority: 'medium' },
  { id: 'wo-861', property: 'Flare waterfront', unit: '2A', type: 'Plumbing', title: 'Unit 2A leak under sink', reporter: 'Nikhil Poluru', date: '2026-09-08', status: 'open', priority: 'high' },
  { id: 'wo-852', property: 'Lotline tower', unit: 'Floor 9', type: 'Access', title: 'Badge reader at 9 west', reporter: 'Asha Poluru', date: '2026-09-09', status: 'closed', priority: 'low' },
  { id: 'wo-844', property: 'Stride court', unit: 'Shop 6', type: 'HVAC', title: 'Condenser noise after hours', reporter: 'Dev Poluru', date: '2026-09-12', status: 'open', priority: 'medium' },
  { id: 'wo-830', property: 'Quill Campus flats', unit: 'Common', type: 'Make-ready', title: '8D paint and appliances', reporter: 'Subra Poluru', date: '2026-09-11', status: 'scheduled', priority: 'low' },
  { id: 'wo-821', property: 'Nimbus park', unit: 'Bay 1', type: 'Electrical', title: 'Panel labeling for tenant', reporter: 'Dev Poluru', date: '2026-09-07', status: 'closed', priority: 'low' },
];

export const performance = [
  { id: 'pf-harbor', property: 'Harborwell Residences', code: 'HV-104', noi: 4200000, cap: 5.4, collections: 98, occupancy: 95, owner: 'Maya Poluru', status: 'on_track' },
  { id: 'pf-alder', property: 'Alder Hall lofts', code: 'HV-218', noi: 1680000, cap: 5.1, collections: 96, occupancy: 92, owner: 'Maya Poluru', status: 'on_track' },
  { id: 'pf-quill', property: 'Quill Campus flats', code: 'HV-331', noi: 980000, cap: 4.8, collections: 99, occupancy: 95, owner: 'Arjun Poluru', status: 'on_track' },
  { id: 'pf-cedar', property: 'Cedar Yard industrial', code: 'HV-412', noi: 2100000, cap: 6.2, collections: 91, occupancy: 83, owner: 'Arjun Poluru', status: 'watch' },
  { id: 'pf-lotline', property: 'Lotline tower', code: 'HV-509', noi: 5400000, cap: 5.6, collections: 97, occupancy: 90, owner: 'Maya Poluru', status: 'on_track' },
  { id: 'pf-stride', property: 'Stride court', code: 'HV-627', noi: 1260000, cap: 5.9, collections: 98, occupancy: 95, owner: 'Arjun Poluru', status: 'on_track' },
  { id: 'pf-flare', property: 'Flare waterfront', code: 'HV-740', noi: 720000, cap: 4.4, collections: 88, occupancy: 85, owner: 'Maya Poluru', status: 'watch' },
  { id: 'pf-nimbus', property: 'Nimbus park', code: 'HV-851', noi: 1880000, cap: 6.0, collections: 100, occupancy: 100, owner: 'Arjun Poluru', status: 'on_track' },
];

export const noiTrend = [12.4, 13.1, 13.8, 14.6, 15.2, 15.9, 16.4, 16.9, 17.3, 17.6, 17.9, 18.2];

export const assetMix = [
  { id: 'multifamily', label: 'Multifamily', count: 4, href: '#/properties', hot: true },
  { id: 'office', label: 'Office', count: 1, href: '#/properties' },
  { id: 'retail', label: 'Retail', count: 1, href: '#/leases' },
  { id: 'industrial', label: 'Industrial', count: 2, href: '#/occupancy' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Properties', href: '#/properties', icon: 'folder' },
  { label: 'Leases', href: '#/leases', icon: 'file' },
  { label: 'Occupancy', href: '#/occupancy', icon: 'star' },
  { label: 'Maintenance', href: '#/maintenance', icon: 'check' },
  { label: 'Performance', href: '#/performance', icon: 'clock' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'Mira Poluru gave notice at Alder 4C', description: 'Kavya Poluru · lease', icon: 'clock', href: '#/leases' },
  { label: 'Cedar dock still standing water', description: 'Nikhil Poluru · WO-881', icon: 'alert-triangle', href: '#/maintenance' },
  { label: 'Flare 2A leak is open', description: 'Subra Poluru · Galveston', icon: 'file', href: '#/maintenance' },
  { label: 'Quill 8D make-ready this week', description: 'Subra Poluru · draft lease', icon: 'star', href: '#/property/hv-quill' },
];

export const commandItems = [
  { label: 'Overview', description: 'Portfolio pulse', href: '#/overview', icon: 'home' },
  { label: 'Log request', description: 'Open a work order', href: '#log-request', icon: 'plus' },
  { label: 'Properties', description: 'Assets on the book', href: '#/properties', icon: 'folder' },
  { label: 'Leases', description: 'Kavya Poluru’s desk', href: '#/leases', icon: 'file' },
  { label: 'Occupancy', description: 'Leela Poluru’s board', href: '#/occupancy', icon: 'star' },
  { label: 'Maintenance', description: 'Nikhil Poluru’s queue', href: '#/maintenance', icon: 'check' },
  { label: 'Performance', description: 'Maya Poluru’s NOI', href: '#/performance', icon: 'clock' },
  { label: 'Settings', description: 'Homes desk defaults', href: '#/settings', icon: 'settings' },
];

export const tradeOptions = [
  { label: 'HVAC', value: 'HVAC' },
  { label: 'Plumbing', value: 'Plumbing' },
  { label: 'Electrical', value: 'Electrical' },
  { label: 'Roof', value: 'Roof' },
  { label: 'Make-ready', value: 'Make-ready' },
  { label: 'Access', value: 'Access' },
];

export function overviewStats() {
  const units = properties.reduce((sum, item) => sum + item.units, 0);
  const occupied = properties.reduce((sum, item) => sum + item.occupied, 0);
  const openWork = workOrders.filter((item) => ['open', 'in_progress', 'overdue'].includes(item.status)).length;
  const noi = performance.reduce((sum, item) => sum + item.noi, 0);
  return [
    { label: 'Assets', value: String(properties.length), hint: 'Austin, Dallas, Houston, coast', trend: 'flat', trendValue: 'Book' },
    { label: 'Leased', value: `${Math.round((occupied / units) * 100)}%`, hint: `${occupied} of ${units} units`, trend: 'up', trendValue: '+1%' },
    { label: 'NOI TTM', value: `$${(noi / 1_000_000).toFixed(1)}M`, hint: 'Maya Poluru’s book', trend: 'up', trendValue: '+6%' },
    { label: 'Open work', value: String(openWork), hint: 'Nikhil Poluru · ops', trend: 'flat', trendValue: 'Today' },
  ];
}

export function addWorkOrder({ title, property, reporter, type }) {
  const number = 800 + workOrders.length + 1;
  const record = {
    id: `wo-${number}`,
    property,
    unit: '—',
    type: type || 'HVAC',
    title,
    reporter,
    date: '2026-09-12',
    status: 'open',
    priority: 'medium',
  };
  workOrders.unshift(record);
  return record;
}

export function buildSearchCatalog() {
  const propertyHits = properties.map((item) => ({
    label: item.name,
    description: `${item.code} · ${item.city} · ${item.pm}`,
    owner: item.pm,
    type: 'Property',
    href: `#/property/${item.id}`,
  }));
  const leaseHits = leases.map((item) => ({
    label: `${item.tenant} · ${item.unit}`,
    description: `${item.property} · ${item.status}`,
    owner: item.manager,
    type: 'Lease',
    href: '#/leases',
  }));
  const workHits = workOrders.map((item) => ({
    label: item.title,
    description: `${item.property} · ${item.reporter}`,
    owner: item.reporter,
    type: 'Work order',
    href: '#/maintenance',
  }));
  return [
    ...propertyHits,
    ...leaseHits,
    ...workHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
