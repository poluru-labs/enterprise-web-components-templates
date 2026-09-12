export const productName = 'Orbit';
export const productLine = 'Fleet';
export const workspaceName = 'Poluru Yards';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@poluruyards.example',
  role: 'Fleet director',
};

export const workspace = {
  name: workspaceName,
  period: 'Yard day · 12 Sep 2026',
  timezone: 'America / Chicago',
  yards: 'Austin · Dallas',
};

export const people = [
  { name: 'Subbu Poluru', role: 'Fleet director', squad: 'Yard desk' },
  { name: 'Subra Poluru', role: 'Shop lead', squad: 'Maintenance' },
  { name: 'Kavya Poluru', role: 'Dispatcher', squad: 'Control' },
  { name: 'Maya Poluru', role: 'Driver', squad: 'Austin' },
  { name: 'Arjun Poluru', role: 'Driver', squad: 'Dallas' },
  { name: 'Leela Poluru', role: 'Driver', squad: 'Austin' },
  { name: 'Nikhil Poluru', role: 'Driver', squad: 'Dallas' },
  { name: 'Rohan Poluru', role: 'Linehaul driver', squad: 'Austin' },
  { name: 'Priya Poluru', role: 'Fuel clerk', squad: 'Yard desk' },
  { name: 'Ishaan Poluru', role: 'Inspector', squad: 'Compliance' },
  { name: 'Asha Poluru', role: 'Driver', squad: 'Austin' },
  { name: 'Dev Poluru', role: 'Night dispatcher', squad: 'Control' },
];

export const drivers = [
  { id: 'drv-kavya', name: 'Kavya Poluru', yard: 'Austin', license: 'CDL-A', status: 'on_route', vehicle: 'ORB-104', hours: 7.4, phone: '512-555-0140' },
  { id: 'drv-maya', name: 'Maya Poluru', yard: 'Austin', license: 'CDL-B', status: 'on_route', vehicle: 'ORB-509', hours: 6.1, phone: '512-555-0141' },
  { id: 'drv-arjun', name: 'Arjun Poluru', yard: 'Dallas', license: 'CDL-A', status: 'assigned', vehicle: 'ORB-218', hours: 4.8, phone: '214-555-0188' },
  { id: 'drv-leela', name: 'Leela Poluru', yard: 'Austin', license: 'CDL-B', status: 'on_route', vehicle: 'ORB-627', hours: 8.0, phone: '512-555-0144' },
  { id: 'drv-nikhil', name: 'Nikhil Poluru', yard: 'Dallas', license: 'CDL-B', status: 'idle', vehicle: 'ORB-851', hours: 2.2, phone: '214-555-0190' },
  { id: 'drv-rohan', name: 'Rohan Poluru', yard: 'Austin', license: 'CDL-A', status: 'assigned', vehicle: 'ORB-740', hours: 5.6, phone: '512-555-0148' },
  { id: 'drv-asha', name: 'Asha Poluru', yard: 'Austin', license: 'Class C', status: 'idle', vehicle: '—', hours: 0, phone: '512-555-0152' },
  { id: 'drv-dev', name: 'Dev Poluru', yard: 'Dallas', license: 'CDL-A', status: 'off_duty', vehicle: '—', hours: 0, phone: '214-555-0194' },
];

export let vehicles = [
  { id: 'orb-104', unit: 'ORB-104', make: 'Ford Transit 350', type: 'Van', yard: 'Austin', status: 'on_route', driver: 'Kavya Poluru', miles: 42180, fuel: 62, nextService: '2026-09-18', vin: '1FTBW3XM4LKA104' },
  { id: 'orb-218', unit: 'ORB-218', make: 'Freightliner M2', type: 'Box truck', yard: 'Dallas', status: 'assigned', driver: 'Arjun Poluru', miles: 88420, fuel: 71, nextService: '2026-09-22', vin: '3ALACWDT8HDJA218' },
  { id: 'orb-331', unit: 'ORB-331', make: 'Toyota Highlander', type: 'Pool SUV', yard: 'Austin', status: 'yard', driver: '—', miles: 19640, fuel: 88, nextService: '2026-10-04', vin: '5TDKZRFH5NS331' },
  { id: 'orb-412', unit: 'ORB-412', make: 'Isuzu NPR', type: 'Box truck', yard: 'Dallas', status: 'in_shop', driver: 'Subra Poluru', miles: 61200, fuel: 24, nextService: '2026-09-12', vin: 'JALC4W165G7412' },
  { id: 'orb-509', unit: 'ORB-509', make: 'Ford F-150', type: 'Pickup', yard: 'Austin', status: 'on_route', driver: 'Maya Poluru', miles: 33810, fuel: 54, nextService: '2026-09-28', vin: '1FTEW1EP5NFA509' },
  { id: 'orb-627', unit: 'ORB-627', make: 'Mercedes Sprinter', type: 'Van', yard: 'Austin', status: 'on_route', driver: 'Leela Poluru', miles: 27450, fuel: 47, nextService: '2026-10-01', vin: 'WD3PE8CD5NP627' },
  { id: 'orb-740', unit: 'ORB-740', make: 'Peterbilt 579', type: 'Tractor', yard: 'Austin', status: 'assigned', driver: 'Rohan Poluru', miles: 142900, fuel: 81, nextService: '2026-09-16', vin: '1XPBD49X0ND740' },
  { id: 'orb-851', unit: 'ORB-851', make: 'Chevy Express', type: 'Van', yard: 'Dallas', status: 'inspection_due', driver: 'Nikhil Poluru', miles: 50880, fuel: 39, nextService: '2026-09-13', vin: '1GCWGAFG8N1851' },
];

export const workOrders = [
  { id: 'wo-441', vehicle: 'ORB-412', title: 'Brake drums and shoes', shop: 'Dallas bay 2', owner: 'Subra Poluru', due: '2026-09-12', status: 'in_shop', hours: 6 },
  { id: 'wo-438', vehicle: 'ORB-740', title: 'PM-C 15k service', shop: 'Austin bay 1', owner: 'Subra Poluru', due: '2026-09-16', status: 'scheduled', hours: 4 },
  { id: 'wo-436', vehicle: 'ORB-104', title: 'Cabin A/C recharge', shop: 'Austin bay 3', owner: 'Subra Poluru', due: '2026-09-18', status: 'scheduled', hours: 2 },
  { id: 'wo-429', vehicle: 'ORB-218', title: 'Lift-gate hydraulics', shop: 'Dallas bay 1', owner: 'Subra Poluru', due: '2026-09-22', status: 'parts_hold', hours: 5 },
  { id: 'wo-421', vehicle: 'ORB-509', title: 'Tire rotation', shop: 'Austin bay 4', owner: 'Ishaan Poluru', due: '2026-09-28', status: 'scheduled', hours: 1 },
  { id: 'wo-418', vehicle: 'ORB-331', title: 'Oil and filter', shop: 'Austin bay 2', owner: 'Subra Poluru', due: '2026-10-04', status: 'scheduled', hours: 1 },
  { id: 'wo-410', vehicle: 'ORB-627', title: 'Sliding-door latch', shop: 'Austin bay 3', owner: 'Subra Poluru', due: '2026-09-09', status: 'complete', hours: 2 },
  { id: 'wo-404', vehicle: 'ORB-851', title: 'DOT inspection prep', shop: 'Dallas bay 3', owner: 'Ishaan Poluru', due: '2026-09-13', status: 'due', hours: 3 },
];

export const fuelLogs = [
  { id: 'fuel-1', vehicle: 'ORB-104', driver: 'Kavya Poluru', gallons: 18.4, cost: 68, mpg: 14.2, yard: 'Austin', when: '12 Sep 06:40' },
  { id: 'fuel-2', vehicle: 'ORB-509', driver: 'Maya Poluru', gallons: 16.1, cost: 59, mpg: 18.6, yard: 'Austin', when: '12 Sep 07:05' },
  { id: 'fuel-3', vehicle: 'ORB-627', driver: 'Leela Poluru', gallons: 21.0, cost: 77, mpg: 16.1, yard: 'Austin', when: '12 Sep 07:22' },
  { id: 'fuel-4', vehicle: 'ORB-740', driver: 'Rohan Poluru', gallons: 62.8, cost: 241, mpg: 6.8, yard: 'Austin', when: '11 Sep 18:10' },
  { id: 'fuel-5', vehicle: 'ORB-218', driver: 'Arjun Poluru', gallons: 34.2, cost: 128, mpg: 9.4, yard: 'Dallas', when: '11 Sep 19:02' },
  { id: 'fuel-6', vehicle: 'ORB-851', driver: 'Nikhil Poluru', gallons: 19.6, cost: 71, mpg: 13.0, yard: 'Dallas', when: '11 Sep 20:14' },
  { id: 'fuel-7', vehicle: 'ORB-412', driver: 'Subra Poluru', gallons: 8.2, cost: 30, mpg: 8.1, yard: 'Dallas', when: '10 Sep 14:40' },
  { id: 'fuel-8', vehicle: 'ORB-331', driver: 'Asha Poluru', gallons: 12.4, cost: 45, mpg: 22.4, yard: 'Austin', when: '10 Sep 09:18' },
];

export const fuelTrend = [412, 428, 441, 398, 454, 470, 438, 461, 449, 482, 468, 451];

export const inspections = [
  { id: 'ins-881', vehicle: 'ORB-851', inspector: 'Ishaan Poluru', type: 'DOT annual', due: '2026-09-13', status: 'due', result: 'Open', notes: 'Lights and brakes before the stamp.' },
  { id: 'ins-874', vehicle: 'ORB-412', inspector: 'Subra Poluru', type: 'Post-repair', due: '2026-09-12', status: 'in_shop', result: 'Hold', notes: 'Brake drums still on the bench.' },
  { id: 'ins-868', vehicle: 'ORB-104', inspector: 'Ishaan Poluru', type: 'Pre-trip', due: '2026-09-12', status: 'passed', result: 'Pass', notes: 'Kavya Poluru signed the book.' },
  { id: 'ins-861', vehicle: 'ORB-509', inspector: 'Ishaan Poluru', type: 'Pre-trip', due: '2026-09-12', status: 'passed', result: 'Pass', notes: 'Maya Poluru, 06:50 Austin.' },
  { id: 'ins-852', vehicle: 'ORB-627', inspector: 'Kavya Poluru', type: 'Pre-trip', due: '2026-09-12', status: 'passed', result: 'Pass', notes: 'Sliding door noted, still legal.' },
  { id: 'ins-844', vehicle: 'ORB-740', inspector: 'Ishaan Poluru', type: 'Level 1', due: '2026-09-16', status: 'scheduled', result: 'Open', notes: 'Scale house at 09:00.' },
  { id: 'ins-830', vehicle: 'ORB-218', inspector: 'Subra Poluru', type: 'Pre-trip', due: '2026-09-11', status: 'passed', result: 'Pass', notes: 'Arjun Poluru, Dallas gate.' },
  { id: 'ins-821', vehicle: 'ORB-331', inspector: 'Asha Poluru', type: 'Walkaround', due: '2026-09-10', status: 'passed', result: 'Pass', notes: 'Pool car, no defects.' },
];

export const dispatchStages = [
  { id: 'yard', label: 'Yard', count: 18, href: '#/vehicles' },
  { id: 'assigned', label: 'Assigned', count: 12, href: '#/drivers' },
  { id: 'on_route', label: 'On route', count: 96, href: '#/vehicles' },
  { id: 'shop', label: 'Shop', count: 8, href: '#/maintenance', hot: true },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Vehicles', href: '#/vehicles', icon: 'folder' },
  { label: 'Maintenance', href: '#/maintenance', icon: 'check' },
  { label: 'Drivers', href: '#/drivers', icon: 'user' },
  { label: 'Fuel', href: '#/fuel', icon: 'star' },
  { label: 'Inspections', href: '#/inspections', icon: 'file' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'ORB-412 still in Dallas shop', description: 'Subra Poluru · brake drums', icon: 'alert-triangle', href: '#/vehicle/orb-412' },
  { label: 'ORB-851 DOT due tomorrow', description: 'Ishaan Poluru · annual', icon: 'clock', href: '#/inspections' },
  { label: 'Fuel exception on ORB-740', description: 'Priya Poluru · 62.8 gal', icon: 'star', href: '#/fuel' },
  { label: 'Asha Poluru is unassigned', description: 'Austin pool · Class C', icon: 'user', href: '#/drivers' },
];

export const commandItems = [
  { label: 'Overview', description: 'Yard pulse', href: '#/overview', icon: 'home' },
  { label: 'Assign vehicle', description: 'Put a driver on a unit', href: '#assign-vehicle', icon: 'plus' },
  { label: 'Vehicles', description: 'Units and yards', href: '#/vehicles', icon: 'folder' },
  { label: 'Maintenance', description: 'Subra Poluru’s board', href: '#/maintenance', icon: 'check' },
  { label: 'Drivers', description: 'Assignments and hours', href: '#/drivers', icon: 'user' },
  { label: 'Fuel', description: 'Gallons and MPG', href: '#/fuel', icon: 'star' },
  { label: 'Inspections', description: 'DOT and pre-trip', href: '#/inspections', icon: 'file' },
  { label: 'Settings', description: 'Yard defaults', href: '#/settings', icon: 'settings' },
];

export const typeOptions = [
  { label: 'Van', value: 'Van' },
  { label: 'Box truck', value: 'Box truck' },
  { label: 'Pickup', value: 'Pickup' },
  { label: 'Tractor', value: 'Tractor' },
  { label: 'Pool SUV', value: 'Pool SUV' },
];

export function overviewStats() {
  const inShop = vehicles.filter((item) => item.status === 'in_shop').length;
  const onRoute = vehicles.filter((item) => item.status === 'on_route').length;
  const dueInspect = inspections.filter((item) => item.status === 'due' || item.status === 'in_shop').length;
  return [
    { label: 'Units on the book', value: String(vehicles.length), hint: 'Austin and Dallas yards', trend: 'flat', trendValue: 'Demo set' },
    { label: 'On route', value: String(onRoute), hint: 'Live assignments this morning', trend: 'up', trendValue: '+3' },
    { label: 'In shop', value: String(inShop), hint: 'Subra Poluru’s bays', trend: 'down', trendValue: '1 hold' },
    { label: 'Inspections due', value: String(dueInspect), hint: 'Ishaan Poluru’s queue', trend: 'flat', trendValue: 'Today' },
  ];
}

export function addAssignment({ vehicle, driver, yard }) {
  const unit = vehicles.find((item) => item.unit === vehicle || item.id === vehicle);
  if (unit) {
    unit.driver = driver;
    unit.status = 'assigned';
    if (yard) unit.yard = yard;
  }
  return unit || vehicles[0];
}

export function buildSearchCatalog() {
  const vehicleHits = vehicles.map((item) => ({
    label: item.unit,
    description: `${item.make} · ${item.driver} · ${item.yard}`,
    owner: item.driver,
    type: 'Vehicle',
    href: `#/vehicle/${item.id}`,
  }));
  const workHits = workOrders.map((item) => ({
    label: item.title,
    description: `${item.vehicle} · ${item.status}`,
    owner: item.owner,
    type: 'Work order',
    href: '#/maintenance',
  }));
  const driverHits = drivers.map((item) => ({
    label: item.name,
    description: `${item.license} · ${item.yard}`,
    owner: item.name,
    type: 'Driver',
    href: '#/drivers',
  }));
  const inspectHits = inspections.map((item) => ({
    label: `${item.type} · ${item.vehicle}`,
    description: `${item.inspector} · ${item.status}`,
    owner: item.inspector,
    type: 'Inspection',
    href: '#/inspections',
  }));
  return [
    ...vehicleHits,
    ...workHits,
    ...driverHits,
    ...inspectHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
