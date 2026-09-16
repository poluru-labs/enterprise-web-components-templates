export const productName = 'Waypoint';
export const productLine = 'Travel';
export const workspaceName = 'Meridian Group';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@meridian.example',
  role: 'Head of travel',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 Q3 · week 12',
  timezone: 'America / Chicago',
  close: 'Period ends 30 Sep 2026',
};

export const tickerItems = [
  { label: 'In trip', value: '2', delta: 'Lagos · London', trend: 'flat', href: '#/trips' },
  { label: 'Approvals', value: '4', delta: '2 overdue', trend: 'down', href: '#/approvals' },
  { label: 'Spend', value: '$184k', delta: '−8% vs plan', trend: 'up', href: '#/expenses' },
  { label: 'Risk', value: '1', delta: 'Lagos elevated', trend: 'down', href: '#/risk' },
  { label: 'On time', value: '94%', delta: '+2 pts', trend: 'up', href: '#/itineraries' },
  { label: 'Unused', value: '$12.4k', delta: '5 tickets', trend: 'flat', href: '#/expenses' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Trips', href: '#/trips', icon: 'folder' },
  { label: 'Travelers', href: '#/travelers', icon: 'user' },
  { label: 'Approvals', href: '#/approvals', icon: 'check' },
  { label: 'Itineraries', href: '#/itineraries', icon: 'clock' },
  { label: 'Expenses', href: '#/expenses', icon: 'file' },
  { label: 'Risk', href: '#/risk', icon: 'alert-triangle' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Travelers in trip', value: '2', hint: 'Hana Lagos · Kavya London', trend: 'flat', trendValue: 'Live' },
  { label: 'Booked ahead', value: '6', hint: 'Through 9 Oct', trend: 'up', trendValue: '+1' },
  { label: 'Pending approvals', value: '4', hint: 'Two past SLA', trend: 'down', trendValue: '2 overdue' },
  { label: 'MTD spend', value: '$184k', hint: 'Plan $200k', trend: 'up', trendValue: '−8%' },
  { label: 'Policy exceptions', value: '3', hint: 'Lagos, Berlin hotel, SG night', trend: 'flat', trendValue: 'Open' },
  { label: 'Elevated risk', value: '1', hint: 'Lagos duty of care', trend: 'down', trendValue: 'Hana' },
  { label: 'Check-in rate', value: '96%', hint: 'Last ping 06:40 CDT', trend: 'up', trendValue: '+3 pts' },
  { label: 'Unused tickets', value: '$12.4k', hint: 'Five open coupons', trend: 'flat', trendValue: 'Recover' },
];

export const spendTrend = [142, 148, 151, 156, 161, 168, 171, 176, 179, 181, 183, 184];

export const trips = [
  {
    id: 'tr_lagos',
    code: 'WP-1842',
    traveler: 'Hana Poluru',
    travelerId: 'tv_hana',
    purpose: 'Client workshop',
    city: 'Lagos',
    country: 'Nigeria',
    region: 'Africa',
    origin: 'ORD',
    dest: 'LOS',
    depart: '14 Sep 2026',
    return: '20 Sep 2026',
    status: 'In trip',
    risk: 'Elevated',
    cost: 8420,
    policy: 'Exception',
    manager: 'Mira Poluru',
    checkIn: '06:40 CDT',
    hotel: 'Federal Palace',
    cabin: 'Business',
  },
  {
    id: 'tr_london',
    code: 'WP-1848',
    traveler: 'Kavya Poluru',
    travelerId: 'tv_kavya',
    purpose: 'Q3 partner review',
    city: 'London',
    country: 'United Kingdom',
    region: 'EMEA',
    origin: 'ORD',
    dest: 'LHR',
    depart: '15 Sep 2026',
    return: '18 Sep 2026',
    status: 'In trip',
    risk: 'Cleared',
    cost: 3180,
    policy: 'In policy',
    manager: 'Mira Poluru',
    checkIn: '07:12 CDT',
    hotel: 'The Hoxton Shoreditch',
    cabin: 'Economy plus',
  },
  {
    id: 'tr_austin',
    code: 'WP-1851',
    traveler: 'Dev Poluru',
    travelerId: 'tv_dev',
    purpose: 'Platform standup',
    city: 'Austin',
    country: 'United States',
    region: 'Americas',
    origin: 'ORD',
    dest: 'AUS',
    depart: '18 Sep 2026',
    return: '19 Sep 2026',
    status: 'Booked',
    risk: 'Cleared',
    cost: 890,
    policy: 'In policy',
    manager: 'Mira Poluru',
    checkIn: '—',
    hotel: 'Fairmont Austin',
    cabin: 'Economy',
  },
  {
    id: 'tr_paris',
    code: 'WP-1854',
    traveler: 'Elena Poluru',
    travelerId: 'tv_elena',
    purpose: 'Approvals summit',
    city: 'Paris',
    country: 'France',
    region: 'EMEA',
    origin: 'ORD',
    dest: 'CDG',
    depart: '21 Sep 2026',
    return: '24 Sep 2026',
    status: 'Booked',
    risk: 'Watch',
    cost: 2640,
    policy: 'In policy',
    manager: 'Mira Poluru',
    checkIn: '—',
    hotel: 'Hotel National des Arts',
    cabin: 'Economy plus',
  },
  {
    id: 'tr_singapore',
    code: 'WP-1857',
    traveler: 'Arjun Poluru',
    travelerId: 'tv_arjun',
    purpose: 'APAC desk visit',
    city: 'Singapore',
    country: 'Singapore',
    region: 'APAC',
    origin: 'ORD',
    dest: 'SIN',
    depart: '22 Sep 2026',
    return: '26 Sep 2026',
    status: 'Booked',
    risk: 'Cleared',
    cost: 6910,
    policy: 'Exception',
    manager: 'Mira Poluru',
    checkIn: '—',
    hotel: 'Marina Bay Sands',
    cabin: 'Business',
  },
  {
    id: 'tr_berlin',
    code: 'WP-1860',
    traveler: 'Sahana Poluru',
    travelerId: 'tv_sahana',
    purpose: 'People analytics offsite',
    city: 'Berlin',
    country: 'Germany',
    region: 'EMEA',
    origin: 'ORD',
    dest: 'BER',
    depart: '24 Sep 2026',
    return: '28 Sep 2026',
    status: 'Pending',
    risk: 'Cleared',
    cost: 4120,
    policy: 'Exception',
    manager: 'Elena Poluru',
    checkIn: '—',
    hotel: 'Soho House Berlin',
    cabin: 'Economy plus',
  },
  {
    id: 'tr_tokyo',
    code: 'WP-1866',
    traveler: 'Priya Poluru',
    travelerId: 'tv_priya',
    purpose: 'Customer voice week',
    city: 'Tokyo',
    country: 'Japan',
    region: 'APAC',
    origin: 'ORD',
    dest: 'HND',
    depart: '2 Oct 2026',
    return: '8 Oct 2026',
    status: 'Approved',
    risk: 'Cleared',
    cost: 7450,
    policy: 'In policy',
    manager: 'Mira Poluru',
    checkIn: '—',
    hotel: 'Palace Hotel Tokyo',
    cabin: 'Business',
  },
  {
    id: 'tr_mumbai',
    code: 'WP-1870',
    traveler: 'Rohan Poluru',
    travelerId: 'tv_rohan',
    purpose: 'Vendor audit',
    city: 'Mumbai',
    country: 'India',
    region: 'APAC',
    origin: 'ORD',
    dest: 'BOM',
    depart: '5 Oct 2026',
    return: '9 Oct 2026',
    status: 'Booked',
    risk: 'Watch',
    cost: 5280,
    policy: 'In policy',
    manager: 'Mira Poluru',
    checkIn: '—',
    hotel: 'Taj Mahal Palace',
    cabin: 'Business',
  },
  {
    id: 'tr_chicago',
    code: 'WP-1828',
    traveler: 'Luca Poluru',
    travelerId: 'tv_luca',
    purpose: 'HQ week',
    city: 'Chicago',
    country: 'United States',
    region: 'Americas',
    origin: 'SFO',
    dest: 'ORD',
    depart: '8 Sep 2026',
    return: '10 Sep 2026',
    status: 'Complete',
    risk: 'Cleared',
    cost: 1640,
    policy: 'In policy',
    manager: 'Mira Poluru',
    checkIn: 'Done',
    hotel: 'The Langham',
    cabin: 'Economy',
  },
  {
    id: 'tr_nyc',
    code: 'WP-1821',
    traveler: 'Anika Poluru',
    travelerId: 'tv_anika',
    purpose: 'Booking desk rotation',
    city: 'New York',
    country: 'United States',
    region: 'Americas',
    origin: 'ORD',
    dest: 'LGA',
    depart: '4 Sep 2026',
    return: '6 Sep 2026',
    status: 'Complete',
    risk: 'Cleared',
    cost: 1210,
    policy: 'In policy',
    manager: 'Mira Poluru',
    checkIn: 'Done',
    hotel: 'Ace Hotel',
    cabin: 'Economy',
  },
];

export const tripColumns = [
  { key: 'code', label: 'Trip', sortable: true },
  { key: 'traveler', label: 'Traveler', sortable: true },
  { key: 'city', label: 'City' },
  { key: 'status', label: 'Status' },
  { key: 'risk', label: 'Risk' },
  { key: 'cost', label: 'Cost' },
  { key: 'depart', label: 'Depart' },
];

export const travelers = [
  { id: 'tv_mira', name: 'Mira Poluru', role: 'Head of travel', region: 'Americas', policy: 'Exec', trips: 1, spend: 0, risk: 'Cleared', passport: 'US · 2029', status: 'Home' },
  { id: 'tv_hana', name: 'Hana Poluru', role: 'Technical CSM', region: 'Americas', policy: 'Restricted', trips: 1, spend: 8420, risk: 'Elevated', passport: 'US · 2028', status: 'In trip' },
  { id: 'tv_kavya', name: 'Kavya Poluru', role: 'VP growth', region: 'Americas', policy: 'Standard', trips: 1, spend: 3180, risk: 'Cleared', passport: 'US · 2030', status: 'In trip' },
  { id: 'tv_dev', name: 'Dev Poluru', role: 'VP engineering', region: 'Americas', policy: 'Standard', trips: 1, spend: 890, risk: 'Cleared', passport: 'US · 2027', status: 'Booked' },
  { id: 'tv_elena', name: 'Elena Poluru', role: 'Approvals lead', region: 'EMEA', policy: 'Standard', trips: 1, spend: 2640, risk: 'Watch', passport: 'FR · 2031', status: 'Booked' },
  { id: 'tv_arjun', name: 'Arjun Poluru', role: 'CFO', region: 'APAC', policy: 'Exec', trips: 1, spend: 6910, risk: 'Cleared', passport: 'SG · 2029', status: 'Booked' },
  { id: 'tv_sahana', name: 'Sahana Poluru', role: 'People analytics', region: 'EMEA', policy: 'Standard', trips: 1, spend: 4120, risk: 'Cleared', passport: 'DE · 2028', status: 'Pending' },
  { id: 'tv_priya', name: 'Priya Poluru', role: 'VP customer', region: 'APAC', policy: 'Exec', trips: 1, spend: 7450, risk: 'Cleared', passport: 'JP · 2030', status: 'Approved' },
  { id: 'tv_rohan', name: 'Rohan Poluru', role: 'COO', region: 'APAC', policy: 'Exec', trips: 1, spend: 5280, risk: 'Watch', passport: 'IN · 2027', status: 'Booked' },
  { id: 'tv_luca', name: 'Luca Poluru', role: 'RevOps lead', region: 'Americas', policy: 'Standard', trips: 1, spend: 1640, risk: 'Cleared', passport: 'US · 2026', status: 'Home' },
  { id: 'tv_anika', name: 'Anika Poluru', role: 'CISO', region: 'Americas', policy: 'Standard', trips: 1, spend: 1210, risk: 'Cleared', passport: 'US · 2029', status: 'Home' },
  { id: 'tv_nikhil', name: 'Nikhil Poluru', role: 'Risk officer', region: 'Americas', policy: 'Duty of care', trips: 0, spend: 0, risk: 'Cleared', passport: 'US · 2031', status: 'Home' },
];

export const travelerColumns = [
  { key: 'name', label: 'Traveler', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'region', label: 'Region' },
  { key: 'status', label: 'Status' },
  { key: 'risk', label: 'Risk' },
  { key: 'spend', label: 'Spend' },
];

export const approvals = [
  { id: 'ap_berlin', tripId: 'tr_berlin', subject: 'Sahana Poluru · Berlin hotel', type: 'Trip', owner: 'Elena Poluru', submitted: '12 Sep', sla: 'Overdue', status: 'Pending', amount: 4120, note: 'Soho House is $84 over the Berlin cap.' },
  { id: 'ap_lagos', tripId: 'tr_lagos', subject: 'Hana Poluru · Lagos exception', type: 'Policy', owner: 'Nikhil Poluru', submitted: '8 Sep', sla: 'On time', status: 'Pending', amount: 8420, note: 'Restricted country. Security brief signed.' },
  { id: 'ap_sg', tripId: 'tr_singapore', subject: 'Arjun Poluru · extra night SIN', type: 'Change', owner: 'Elena Poluru', submitted: '14 Sep', sla: 'Overdue', status: 'Pending', amount: 620, note: 'Board dinner added 26 Sep.' },
  { id: 'ap_luca', tripId: 'tr_chicago', subject: 'Luca Poluru · HQ meals', type: 'Expense', owner: 'Rohan Poluru', submitted: '11 Sep', sla: 'On time', status: 'Submitted', amount: 186, note: 'Three receipts under $75.' },
  { id: 'ap_tokyo', tripId: 'tr_tokyo', subject: 'Priya Poluru · Tokyo week', type: 'Trip', owner: 'Mira Poluru', submitted: '6 Sep', sla: 'Met', status: 'Approved', amount: 7450, note: 'Exec cabin in policy for 8+ hours.' },
  { id: 'ap_paris', tripId: 'tr_paris', subject: 'Elena Poluru · CDG rail', type: 'Change', owner: 'Mira Poluru', submitted: '10 Sep', sla: 'Met', status: 'Approved', amount: 128, note: 'Strike reroute booked.' },
];

export const approvalColumns = [
  { key: 'subject', label: 'Request', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'sla', label: 'SLA' },
  { key: 'amount', label: 'Amount' },
];

export const legs = [
  { id: 'lg_los_1', tripId: 'tr_lagos', kind: 'Flight', label: 'UA 990 ORD → LOS', when: '14 Sep · 16:40', status: 'Departed', icon: 'star' },
  { id: 'lg_los_2', tripId: 'tr_lagos', kind: 'Hotel', label: 'Federal Palace · 5 nights', when: '14–19 Sep', status: 'In house', icon: 'folder' },
  { id: 'lg_los_3', tripId: 'tr_lagos', kind: 'Car', label: 'Armored transfer', when: 'Daily 07:30', status: 'Confirmed', icon: 'clock' },
  { id: 'lg_los_4', tripId: 'tr_lagos', kind: 'Flight', label: 'UA 991 LOS → ORD', when: '20 Sep · 22:15', status: 'Booked', icon: 'star' },
  { id: 'lg_lhr_1', tripId: 'tr_london', kind: 'Flight', label: 'BA 296 ORD → LHR', when: '15 Sep · 19:05', status: 'Departed', icon: 'star' },
  { id: 'lg_lhr_2', tripId: 'tr_london', kind: 'Hotel', label: 'The Hoxton Shoreditch', when: '16–17 Sep', status: 'In house', icon: 'folder' },
  { id: 'lg_lhr_3', tripId: 'tr_london', kind: 'Rail', label: 'Heathrow Express', when: '16 Sep · 08:10', status: 'Used', icon: 'clock' },
  { id: 'lg_lhr_4', tripId: 'tr_london', kind: 'Flight', label: 'BA 297 LHR → ORD', when: '18 Sep · 12:00', status: 'Booked', icon: 'star' },
  { id: 'lg_aus_1', tripId: 'tr_austin', kind: 'Flight', label: 'AA 1231 ORD → AUS', when: '18 Sep · 07:15', status: 'Booked', icon: 'star' },
  { id: 'lg_cdg_1', tripId: 'tr_paris', kind: 'Flight', label: 'AF 137 ORD → CDG', when: '21 Sep · 15:50', status: 'Watch', icon: 'alert-triangle' },
  { id: 'lg_sin_1', tripId: 'tr_singapore', kind: 'Flight', label: 'SQ 31 ORD → SIN', when: '22 Sep · 20:40', status: 'Booked', icon: 'star' },
  { id: 'lg_ber_1', tripId: 'tr_berlin', kind: 'Flight', label: 'LH 431 ORD → BER', when: '24 Sep · 16:20', status: 'Pending', icon: 'clock' },
];

export const expenses = [
  { id: 'ex_lagos_air', tripId: 'tr_lagos', traveler: 'Hana Poluru', category: 'Air', amount: 6120, status: 'Posted', submitted: '8 Sep', receipt: 'Yes' },
  { id: 'ex_lagos_htl', tripId: 'tr_lagos', traveler: 'Hana Poluru', category: 'Hotel', amount: 1840, status: 'Posted', submitted: '8 Sep', receipt: 'Yes' },
  { id: 'ex_lhr_air', tripId: 'tr_london', traveler: 'Kavya Poluru', category: 'Air', amount: 2180, status: 'Posted', submitted: '9 Sep', receipt: 'Yes' },
  { id: 'ex_lhr_meal', tripId: 'tr_london', traveler: 'Kavya Poluru', category: 'Meals', amount: 94, status: 'Submitted', submitted: '16 Sep', receipt: 'Yes' },
  { id: 'ex_chi_meal', tripId: 'tr_chicago', traveler: 'Luca Poluru', category: 'Meals', amount: 186, status: 'Submitted', submitted: '11 Sep', receipt: 'Yes' },
  { id: 'ex_nyc_air', tripId: 'tr_nyc', traveler: 'Anika Poluru', category: 'Air', amount: 840, status: 'Reimbursed', submitted: '6 Sep', receipt: 'Yes' },
  { id: 'ex_sin_air', tripId: 'tr_singapore', traveler: 'Arjun Poluru', category: 'Air', amount: 5480, status: 'Posted', submitted: '12 Sep', receipt: 'Yes' },
  { id: 'ex_ber_htl', tripId: 'tr_berlin', traveler: 'Sahana Poluru', category: 'Hotel', amount: 1680, status: 'Held', submitted: '12 Sep', receipt: 'Yes' },
];

export const expenseColumns = [
  { key: 'traveler', label: 'Traveler', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'receipt', label: 'Receipt' },
];

export const unusedTickets = [
  { traveler: 'Mira Poluru', coupon: 'UA 1842 ORD-BOS', value: 2400, expires: '12 Nov 2026' },
  { traveler: 'Luca Poluru', coupon: 'UA 220 SFO-ORD', value: 3100, expires: '4 Oct 2026' },
  { traveler: 'Anika Poluru', coupon: 'AA 412 LGA-ORD', value: 1860, expires: '18 Dec 2026' },
  { traveler: 'Dev Poluru', coupon: 'AA 88 AUS-DFW', value: 640, expires: '2 Jan 2027' },
  { traveler: 'Elena Poluru', coupon: 'AF 336 CDG-LYS', value: 4400, expires: '9 Oct 2026' },
];

export const risks = [
  { id: 'rk_lagos', tripId: 'tr_lagos', place: 'Lagos', level: 'Elevated', owner: 'Nikhil Poluru', since: '8 Sep', note: 'Movement only with the approved transfer. Check-in every 8 hours.' },
  { id: 'rk_paris', tripId: 'tr_paris', place: 'Paris', level: 'Watch', owner: 'Nikhil Poluru', since: '10 Sep', note: 'Rail strike 21–23 Sep. AF 137 is still operating.' },
  { id: 'rk_mumbai', tripId: 'tr_mumbai', place: 'Mumbai', level: 'Watch', owner: 'Nikhil Poluru', since: '14 Sep', note: 'Monsoon delay window on 5 Oct inbound.' },
  { id: 'rk_clear', tripId: 'tr_london', place: 'London', level: 'Cleared', owner: 'Nikhil Poluru', since: '15 Sep', note: 'Kavya checked in from Shoreditch at 07:12 CDT.' },
];

export const riskColumns = [
  { key: 'place', label: 'Location', sortable: true },
  { key: 'level', label: 'Level' },
  { key: 'owner', label: 'Owner' },
  { key: 'since', label: 'Since' },
  { key: 'note', label: 'Note' },
];

export const policies = [
  { id: 'po_cap', name: 'Hotel cap', trigger: 'Rate over city cap', owner: 'Elena Poluru', trips: 1, status: 'Active', steps: 3 },
  { id: 'po_rest', name: 'Restricted country', trigger: 'Destination on the list', owner: 'Nikhil Poluru', trips: 1, status: 'Active', steps: 5 },
  { id: 'po_cabin', name: 'Cabin exception', trigger: 'Flight over 8 hours', owner: 'Mira Poluru', trips: 3, status: 'Active', steps: 2 },
  { id: 'po_duty', name: 'Duty of care', trigger: 'Traveler in elevated risk', owner: 'Nikhil Poluru', trips: 1, status: 'Active', steps: 4 },
  { id: 'po_unused', name: 'Unused ticket', trigger: 'Coupon within 30 days', owner: 'Rohan Poluru', trips: 5, status: 'Active', steps: 3 },
  { id: 'po_meal', name: 'Meal receipt', trigger: 'Meals over $75', owner: 'Rohan Poluru', trips: 1, status: 'Draft', steps: 2 },
];

export const people = [
  { name: 'Mira Poluru', role: 'Head of travel', squad: 'Travel ops', rating: 5, score: 94, book: 10 },
  { name: 'Elena Poluru', role: 'Approvals lead', squad: 'Approvals', rating: 5, score: 88, book: 4 },
  { name: 'Nikhil Poluru', role: 'Risk officer', squad: 'Duty of care', rating: 5, score: 91, book: 4 },
  { name: 'Rohan Poluru', role: 'Expense auditor', squad: 'Spend', rating: 4, score: 82, book: 8 },
  { name: 'Anika Poluru', role: 'Booking desk', squad: 'Desk', rating: 4, score: 86, book: 10 },
  { name: 'Dev Poluru', role: 'Policy admin', squad: 'Policy', rating: 4, score: 80, book: 6 },
  { name: 'Kavya Poluru', role: 'Traveler', squad: 'Growth', rating: 5, score: 90, book: 1 },
  { name: 'Hana Poluru', role: 'Traveler', squad: 'Customer', rating: 4, score: 74, book: 1 },
];

export const cadence = [
  { label: 'Hana Lagos check-in', description: 'Nikhil Poluru · last ping 06:40', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Today' },
  { label: 'Berlin hotel SLA', description: 'Elena Poluru · $84 over cap', timestamp: '16 Sep', icon: 'clock', status: 'Today' },
  { label: 'Kavya LHR return', description: 'BA 297 · 12:00', timestamp: '18 Sep', icon: 'star', status: 'Next' },
  { label: 'Dev Austin standup', description: 'AA 1231 · 07:15', timestamp: '18 Sep', icon: 'check', status: 'Scheduled' },
  { label: 'Paris strike window', description: 'Elena Poluru · AF 137 hold', timestamp: '21 Sep', icon: 'eye', status: 'Scheduled' },
  { label: 'Arjun SIN extra night', description: 'Elena Poluru · overdue', timestamp: '22 Sep', icon: 'folder', status: 'Scheduled' },
];

export const activity = [
  { label: 'Lagos exception filed', description: 'Hana Poluru · 8 Sep', timestamp: '8 Sep', icon: 'file', status: 'Done' },
  { label: 'Tokyo week approved', description: 'Mira Poluru · WP-1866', timestamp: '6 Sep', timestamp2: '6 Sep', icon: 'check', status: 'Done' },
  { label: 'Paris rail reroute', description: 'Elena Poluru · AF 137', timestamp: '10 Sep', icon: 'clock', status: 'Watch' },
  { label: 'Chicago meals submitted', description: 'Luca Poluru · $186', timestamp: '11 Sep', icon: 'file', status: 'Watch' },
  { label: 'Lagos departed ORD', description: 'UA 990 · Hana Poluru', timestamp: '14 Sep', icon: 'check', status: 'Done' },
  { label: 'London in house', description: 'Kavya Poluru · Hoxton', timestamp: '16 Sep', icon: 'folder', status: 'Done' },
];

export const reports = [
  { name: 'MTD spend pack', owner: 'Rohan Poluru', updated: '15 Sep 2026', format: 'XLSX' },
  { name: 'Duty of care log', owner: 'Nikhil Poluru', updated: '16 Sep 2026', format: 'PDF' },
  { name: 'Approval SLA', owner: 'Elena Poluru', updated: '14 Sep 2026', format: 'CSV' },
  { name: 'Unused tickets', owner: 'Anika Poluru', updated: '13 Sep 2026', format: 'XLSX' },
  { name: 'Policy exceptions', owner: 'Dev Poluru', updated: '12 Sep 2026', format: 'PDF' },
  { name: 'Itinerary export', owner: 'Anika Poluru', updated: '16 Sep 2026', format: 'CSV' },
];

export const inboxItems = [
  { label: 'Hana is in Lagos', description: 'Last check-in 06:40 CDT', icon: 'alert-triangle' },
  { label: 'Berlin hotel is overdue', description: 'Elena Poluru · $84 over cap', icon: 'clock' },
  { label: 'SIN extra night overdue', description: 'Arjun Poluru · 26 Sep', icon: 'file' },
  { label: 'Unused ticket expires 4 Oct', description: 'Luca Poluru · $3,100', icon: 'folder' },
];

export const commandItems = [
  { label: 'Overview', description: 'Board pulse', href: '#/overview', icon: 'home' },
  { label: 'Hana Poluru · Lagos', description: 'In trip · elevated', href: '#/trip/tr_lagos', icon: 'alert-triangle' },
  { label: 'Kavya Poluru · London', description: 'In trip', href: '#/trip/tr_london', icon: 'folder' },
  { label: 'Approvals', description: 'Four open', href: '#/approvals', icon: 'check' },
  { label: 'Itineraries', description: 'Live legs', href: '#/itineraries', icon: 'clock' },
  { label: 'Expenses', description: 'MTD $184k', href: '#/expenses', icon: 'file' },
  { label: 'Risk', description: 'Lagos elevated', href: '#/risk', icon: 'alert-triangle' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Trip', description: 'Traveler and dates' },
  { label: 'Policy', description: 'Cabin and city cap' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const destTree = [
  {
    id: 'live',
    label: 'Live',
    children: [
      { id: 'lagos', label: 'Lagos', href: '#/trip/tr_lagos' },
      { id: 'london', label: 'London', href: '#/trip/tr_london' },
    ],
  },
  {
    id: 'ahead',
    label: 'Ahead',
    children: [
      { id: 'austin', label: 'Austin', href: '#/trip/tr_austin' },
      { id: 'paris', label: 'Paris', href: '#/trip/tr_paris' },
      { id: 'singapore', label: 'Singapore', href: '#/trip/tr_singapore' },
      { id: 'berlin', label: 'Berlin', href: '#/trip/tr_berlin' },
    ],
  },
  {
    id: 'later',
    label: 'October',
    children: [
      { id: 'tokyo', label: 'Tokyo', href: '#/trip/tr_tokyo' },
      { id: 'mumbai', label: 'Mumbai', href: '#/trip/tr_mumbai' },
    ],
  },
];

export const spendDrivers = [
  { metric: 'Air', actual: '$128k', target: '$135k', variance: '−$7k', status: 'On track' },
  { metric: 'Hotel', actual: '$41k', target: '$44k', variance: '−$3k', status: 'On track' },
  { metric: 'Ground', actual: '$9k', target: '$8k', variance: '+$1k', status: 'Watch' },
  { metric: 'Meals', actual: '$6k', target: '$13k', variance: '−$7k', status: 'On track' },
];

export const driverColumns = [
  { key: 'metric', label: 'Category', sortable: true },
  { key: 'actual', label: 'Actual' },
  { key: 'target', label: 'Target' },
  { key: 'variance', label: 'Variance' },
  { key: 'status', label: 'Status' },
];

export const apiSnippet = `GET /v1/trips/tr_lagos
Authorization: Bearer way_live_****

{
  "id": "tr_lagos",
  "code": "WP-1842",
  "traveler": "Hana Poluru",
  "city": "Lagos",
  "risk": "Elevated"
}`;

export function buildSearchCatalog() {
  const tripHits = trips.map((item) => ({
    label: `${item.traveler} · ${item.city}`,
    description: `${item.code} · ${item.status}`,
    owner: item.traveler,
    type: 'Trip',
    href: `#/trip/${item.id}`,
  }));
  const travelerHits = travelers.map((item) => ({
    label: item.name,
    description: `${item.role} · ${item.status}`,
    owner: item.name,
    type: 'Traveler',
    href: '#/travelers',
  }));
  const approvalHits = approvals.map((item) => ({
    label: item.subject,
    description: `${item.type} · ${item.status}`,
    owner: item.owner,
    type: 'Approval',
    href: '#/approvals',
  }));
  const expenseHits = expenses.map((item) => ({
    label: `${item.traveler} ${item.category.toLowerCase()}`,
    description: `${item.status} · ${item.submitted}`,
    owner: item.traveler,
    type: 'Expense',
    href: '#/expenses',
  }));
  const riskHits = risks.map((item) => ({
    label: `${item.place} risk`,
    description: `${item.level} · ${item.owner}`,
    owner: item.owner,
    type: 'Risk',
    href: '#/risk',
  }));
  const reportHits = reports.map((item) => ({
    label: item.name,
    description: `${item.format} · ${item.updated}`,
    owner: item.owner,
    type: 'Report',
    href: '#/reports',
  }));
  return [
    ...tripHits,
    ...travelerHits,
    ...approvalHits,
    ...expenseHits,
    ...riskHits,
    ...reportHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
