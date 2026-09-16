export const productName = 'Gather';
export const productLine = 'Events';
export const workspaceName = 'Alder Hall';

export const currentUser = {
  name: 'Mira Poluru',
  email: 'mira.poluru@alderhall.example',
  role: 'Head of events',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 Q3 · week 12',
  timezone: 'America / Chicago',
  close: 'Summit ends 18 Sep 2026',
};

export const tickerItems = [
  { label: 'Live', value: '1', delta: 'Northline Summit', trend: 'flat', href: '#/events' },
  { label: 'Registered', value: '1,284', delta: '+86 this week', trend: 'up', href: '#/registrations' },
  { label: 'Check-in', value: '76%', delta: '976 of 1,284', trend: 'up', href: '#/attendance' },
  { label: 'Speakers', value: '42', delta: '3 pending', trend: 'flat', href: '#/speakers' },
  { label: 'Sponsors', value: '$186k', delta: '12 logos', trend: 'up', href: '#/sponsors' },
  { label: 'Rooms', value: '8/11', delta: '3 hold', trend: 'flat', href: '#/venues' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Events', href: '#/events', icon: 'folder' },
  { label: 'Registrations', href: '#/registrations', icon: 'user' },
  { label: 'Venues', href: '#/venues', icon: 'folder' },
  { label: 'Speakers', href: '#/speakers', icon: 'star' },
  { label: 'Schedule', href: '#/schedule', icon: 'clock' },
  { label: 'Sponsors', href: '#/sponsors', icon: 'plus' },
  { label: 'Attendance', href: '#/attendance', icon: 'check' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Live events', value: '1', hint: 'Northline Summit · Hall A', trend: 'flat', trendValue: 'Day 1' },
  { label: 'Registered', value: '1,284', hint: '86 added this week', trend: 'up', trendValue: '+7%' },
  { label: 'Checked in', value: '76%', hint: '976 badges printed', trend: 'up', trendValue: '+12 pts' },
  { label: 'No-shows', value: '4%', hint: 'Target under 6%', trend: 'up', trendValue: '−1 pt' },
  { label: 'Speakers locked', value: '42', hint: '3 still pending travel', trend: 'flat', trendValue: 'Hold' },
  { label: 'Sponsor book', value: '$186k', hint: 'Harbor and Brightwell lead', trend: 'up', trendValue: '+$24k' },
  { label: 'Rooms in use', value: '8/11', hint: 'River Room on hold', trend: 'flat', trendValue: 'Week 12' },
  { label: 'Sessions today', value: '14', hint: 'Keynote at 09:00', trend: 'flat', trendValue: 'Hall A' },
];

export const attendTrend = [42, 48, 51, 55, 58, 61, 64, 67, 70, 72, 74, 76];

export const events = [
  {
    id: 'ev_north',
    code: 'GAT-1842',
    name: 'Northline Summit',
    type: 'Conference',
    venue: 'Hall A',
    venueId: 'vn_halla',
    start: '16 Sep 2026',
    end: '18 Sep 2026',
    status: 'Live',
    registered: 640,
    capacity: 700,
    checkIn: 512,
    owner: 'Mira Poluru',
    track: 'Flagship',
  },
  {
    id: 'ev_harbor',
    code: 'GAT-1851',
    name: 'Harbor Product Day',
    type: 'Workshop',
    venue: 'River Room',
    venueId: 'vn_river',
    start: '24 Sep 2026',
    end: '24 Sep 2026',
    status: 'Upcoming',
    registered: 180,
    capacity: 200,
    checkIn: 0,
    owner: 'Kavya Poluru',
    track: 'Product',
  },
  {
    id: 'ev_lattice',
    code: 'GAT-1860',
    name: 'Lattice Ops Forum',
    type: 'Forum',
    venue: 'Hall B',
    venueId: 'vn_hallb',
    start: '2 Oct 2026',
    end: '3 Oct 2026',
    status: 'Upcoming',
    registered: 210,
    capacity: 280,
    checkIn: 0,
    owner: 'Hana Poluru',
    track: 'Ops',
  },
  {
    id: 'ev_fold',
    code: 'GAT-1828',
    name: 'Fold Paper breakfast',
    type: 'Breakfast',
    venue: 'Gallery',
    venueId: 'vn_gallery',
    start: '8 Sep 2026',
    end: '8 Sep 2026',
    status: 'Complete',
    registered: 64,
    capacity: 80,
    checkIn: 58,
    owner: 'Elena Poluru',
    track: 'Community',
  },
  {
    id: 'ev_bright',
    code: 'GAT-1866',
    name: 'Brightwell board dinner',
    type: 'Dinner',
    venue: 'Oak Lounge',
    venueId: 'vn_oak',
    start: '9 Oct 2026',
    end: '9 Oct 2026',
    status: 'Pending',
    registered: 28,
    capacity: 40,
    checkIn: 0,
    owner: 'Arjun Poluru',
    track: 'Exec',
  },
  {
    id: 'ev_parks',
    code: 'GAT-1821',
    name: 'Parks volunteer night',
    type: 'Community',
    venue: 'Courtyard',
    venueId: 'vn_court',
    start: '4 Sep 2026',
    end: '4 Sep 2026',
    status: 'Complete',
    registered: 96,
    capacity: 120,
    checkIn: 91,
    owner: 'Luca Poluru',
    track: 'Community',
  },
  {
    id: 'ev_alder',
    code: 'GAT-1870',
    name: 'Alder Health briefing',
    type: 'Briefing',
    venue: 'Studio 2',
    venueId: 'vn_studio',
    start: '29 Sep 2026',
    end: '29 Sep 2026',
    status: 'Upcoming',
    registered: 48,
    capacity: 60,
    checkIn: 0,
    owner: 'Sahana Poluru',
    track: 'Health',
  },
  {
    id: 'ev_pine',
    code: 'GAT-1874',
    name: 'Pine & Copper salon',
    type: 'Salon',
    venue: 'Oak Lounge',
    venueId: 'vn_oak',
    start: '15 Oct 2026',
    end: '15 Oct 2026',
    status: 'Draft',
    registered: 18,
    capacity: 36,
    checkIn: 0,
    owner: 'Priya Poluru',
    track: 'Community',
  },
];

export const eventColumns = [
  { key: 'code', label: 'Event', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'venue', label: 'Venue' },
  { key: 'status', label: 'Status' },
  { key: 'registered', label: 'Registered' },
  { key: 'start', label: 'Start' },
  { key: 'owner', label: 'Owner' },
];

export const registrations = [
  { id: 'rg_1', name: 'Kavya Poluru', eventId: 'ev_north', event: 'Northline Summit', ticket: 'Full', status: 'Checked in', seat: 'A-12', org: 'Growth' },
  { id: 'rg_2', name: 'Hana Poluru', eventId: 'ev_north', event: 'Northline Summit', ticket: 'Full', status: 'Checked in', seat: 'A-14', org: 'Customer' },
  { id: 'rg_3', name: 'Arjun Poluru', eventId: 'ev_north', event: 'Northline Summit', ticket: 'Exec', status: 'Checked in', seat: 'A-02', org: 'Finance' },
  { id: 'rg_4', name: 'Elena Poluru', eventId: 'ev_north', event: 'Northline Summit', ticket: 'Staff', status: 'Checked in', seat: 'Desk', org: 'Ops' },
  { id: 'rg_5', name: 'Rohan Poluru', eventId: 'ev_north', event: 'Northline Summit', ticket: 'Full', status: 'Registered', seat: 'B-08', org: 'Ops' },
  { id: 'rg_6', name: 'Nikhil Poluru', eventId: 'ev_harbor', event: 'Harbor Product Day', ticket: 'Workshop', status: 'Registered', seat: 'R-04', org: 'Product' },
  { id: 'rg_7', name: 'Sahana Poluru', eventId: 'ev_alder', event: 'Alder Health briefing', ticket: 'Briefing', status: 'Waitlist', seat: '—', org: 'People' },
  { id: 'rg_8', name: 'Luca Poluru', eventId: 'ev_parks', event: 'Parks volunteer night', ticket: 'Comp', status: 'Attended', seat: 'C-01', org: 'Parks' },
  { id: 'rg_9', name: 'Anika Poluru', eventId: 'ev_bright', event: 'Brightwell board dinner', ticket: 'Dinner', status: 'Registered', seat: 'T-1', org: 'Security' },
  { id: 'rg_10', name: 'Dev Poluru', eventId: 'ev_lattice', event: 'Lattice Ops Forum', ticket: 'Full', status: 'Registered', seat: 'B-22', org: 'Engineering' },
  { id: 'rg_11', name: 'Priya Poluru', eventId: 'ev_harbor', event: 'Harbor Product Day', ticket: 'Workshop', status: 'Registered', seat: 'R-11', org: 'Customer' },
  { id: 'rg_12', name: 'Mira Poluru', eventId: 'ev_north', event: 'Northline Summit', ticket: 'Staff', status: 'Checked in', seat: 'Desk', org: 'Events' },
];

export const registrationColumns = [
  { key: 'name', label: 'Guest', sortable: true },
  { key: 'event', label: 'Event' },
  { key: 'ticket', label: 'Ticket' },
  { key: 'status', label: 'Status' },
  { key: 'seat', label: 'Seat' },
  { key: 'org', label: 'Org' },
];

export const venues = [
  { id: 'vn_halla', name: 'Hall A', floor: '1', seats: 700, status: 'In use', today: 'Northline Summit', av: 'IMAG + 4 mics', hold: 'Live' },
  { id: 'vn_hallb', name: 'Hall B', floor: '1', seats: 280, status: 'Hold', today: 'Lattice Ops (Oct)', av: '2 screens', hold: '2 Oct' },
  { id: 'vn_river', name: 'River Room', floor: '2', seats: 200, status: 'Booked', today: 'Harbor Product Day', av: 'Workshop kits', hold: '24 Sep' },
  { id: 'vn_gallery', name: 'Gallery', floor: '2', seats: 80, status: 'Open', today: '—', av: 'Track lighting', hold: '—' },
  { id: 'vn_oak', name: 'Oak Lounge', floor: '3', seats: 40, status: 'Booked', today: 'Board dinner hold', av: 'Soft light', hold: '9 Oct' },
  { id: 'vn_studio', name: 'Studio 2', floor: '3', seats: 60, status: 'Booked', today: 'Alder briefing', av: 'Record kit', hold: '29 Sep' },
  { id: 'vn_court', name: 'Courtyard', floor: 'G', seats: 120, status: 'Open', today: '—', av: 'Outdoor PA', hold: '—' },
  { id: 'vn_green', name: 'Green Room', floor: '1', seats: 16, status: 'In use', today: 'Speaker hold', av: 'Mics + tea', hold: 'Live' },
  { id: 'vn_press', name: 'Press nook', floor: '1', seats: 12, status: 'In use', today: 'Summit press', av: 'Backdrop', hold: 'Live' },
  { id: 'vn_break', name: 'Breakout 4', floor: '2', seats: 32, status: 'Open', today: '—', av: 'TV cart', hold: '—' },
  { id: 'vn_board', name: 'Board room', floor: '3', seats: 18, status: 'Hold', today: 'Mira Poluru', av: 'Poly studio', hold: 'Today 16:00' },
];

export const venueColumns = [
  { key: 'name', label: 'Room', sortable: true },
  { key: 'floor', label: 'Floor' },
  { key: 'seats', label: 'Seats' },
  { key: 'status', label: 'Status' },
  { key: 'today', label: 'Today' },
  { key: 'av', label: 'AV' },
];

export const speakers = [
  { id: 'sp_mira', name: 'Mira Poluru', talk: 'Welcome and house rules', eventId: 'ev_north', event: 'Northline Summit', slot: '09:00', room: 'Hall A', status: 'On stage', rating: 5 },
  { id: 'sp_kavya', name: 'Kavya Poluru', talk: 'Pipeline after the merge', eventId: 'ev_north', event: 'Northline Summit', slot: '10:15', room: 'Hall A', status: 'Confirmed', rating: 5 },
  { id: 'sp_hana', name: 'Hana Poluru', talk: 'Support load in week 9', eventId: 'ev_north', event: 'Northline Summit', slot: '11:30', room: 'Hall B', status: 'Confirmed', rating: 4 },
  { id: 'sp_arjun', name: 'Arjun Poluru', talk: 'Q3 close read-through', eventId: 'ev_north', event: 'Northline Summit', slot: '14:00', room: 'Hall A', status: 'Confirmed', rating: 5 },
  { id: 'sp_nikhil', name: 'Nikhil Poluru', talk: '1.8 adoption clinic', eventId: 'ev_harbor', event: 'Harbor Product Day', slot: '09:30', room: 'River Room', status: 'Pending', rating: 4 },
  { id: 'sp_elena', name: 'Elena Poluru', talk: 'Onboarding first 60', eventId: 'ev_harbor', event: 'Harbor Product Day', slot: '13:00', room: 'River Room', status: 'Confirmed', rating: 5 },
  { id: 'sp_rohan', name: 'Rohan Poluru', talk: 'Fulfillment SLA', eventId: 'ev_lattice', event: 'Lattice Ops Forum', slot: '10:00', room: 'Hall B', status: 'Confirmed', rating: 4 },
  { id: 'sp_sahana', name: 'Sahana Poluru', talk: 'People analytics hour', eventId: 'ev_alder', event: 'Alder Health briefing', slot: '15:00', room: 'Studio 2', status: 'Pending', rating: 4 },
  { id: 'sp_priya', name: 'Priya Poluru', talk: 'Customer voice', eventId: 'ev_north', event: 'Northline Summit', slot: '16:00', room: 'Hall A', status: 'Confirmed', rating: 5 },
  { id: 'sp_dev', name: 'Dev Poluru', talk: 'Platform reliability', eventId: 'ev_lattice', event: 'Lattice Ops Forum', slot: '11:15', room: 'Hall B', status: 'Pending', rating: 4 },
];

export const speakerColumns = [
  { key: 'name', label: 'Speaker', sortable: true },
  { key: 'talk', label: 'Session' },
  { key: 'event', label: 'Event' },
  { key: 'slot', label: 'Slot' },
  { key: 'room', label: 'Room' },
  { key: 'status', label: 'Status' },
];

export const sessions = [
  { id: 'ss_1', eventId: 'ev_north', title: 'Doors and badge print', start: '08:00', end: '08:45', room: 'Foyer', speaker: 'Elena Poluru', status: 'Done' },
  { id: 'ss_2', eventId: 'ev_north', title: 'Welcome and house rules', start: '09:00', end: '09:30', room: 'Hall A', speaker: 'Mira Poluru', status: 'Live' },
  { id: 'ss_3', eventId: 'ev_north', title: 'Pipeline after the merge', start: '10:15', end: '11:00', room: 'Hall A', speaker: 'Kavya Poluru', status: 'Next' },
  { id: 'ss_4', eventId: 'ev_north', title: 'Support load in week 9', start: '11:30', end: '12:15', room: 'Hall B', speaker: 'Hana Poluru', status: 'Scheduled' },
  { id: 'ss_5', eventId: 'ev_north', title: 'Lunch in the courtyard', start: '12:15', end: '13:15', room: 'Courtyard', speaker: 'Luca Poluru', status: 'Scheduled' },
  { id: 'ss_6', eventId: 'ev_north', title: 'Q3 close read-through', start: '14:00', end: '14:45', room: 'Hall A', speaker: 'Arjun Poluru', status: 'Scheduled' },
  { id: 'ss_7', eventId: 'ev_north', title: 'Customer voice', start: '16:00', end: '16:45', room: 'Hall A', speaker: 'Priya Poluru', status: 'Scheduled' },
  { id: 'ss_8', eventId: 'ev_harbor', title: '1.8 adoption clinic', start: '09:30', end: '11:00', room: 'River Room', speaker: 'Nikhil Poluru', status: 'Scheduled' },
];

export const sponsors = [
  { id: 'spn_harbor', name: 'Harbor & Co.', tier: 'Title', amount: 48000, owner: 'Kavya Poluru', status: 'Live', booth: 'Foyer A', event: 'Northline Summit' },
  { id: 'spn_bright', name: 'Brightwell Bank', tier: 'Title', amount: 42000, owner: 'Arjun Poluru', status: 'Live', booth: 'Foyer B', event: 'Northline Summit' },
  { id: 'spn_lumen', name: 'Lumen Forge', tier: 'Gold', amount: 24000, owner: 'Nikhil Poluru', status: 'Confirmed', booth: 'Hall B 2', event: 'Northline Summit' },
  { id: 'spn_alder', name: 'Alder Health', tier: 'Gold', amount: 18000, owner: 'Sahana Poluru', status: 'Confirmed', booth: 'Studio hold', event: 'Alder Health briefing' },
  { id: 'spn_north', name: 'Northline Freight', tier: 'Silver', amount: 12000, owner: 'Hana Poluru', status: 'Pending', booth: '—', event: 'Lattice Ops Forum' },
  { id: 'spn_fold', name: 'Fold Paper', tier: 'Community', amount: 6000, owner: 'Elena Poluru', status: 'Complete', booth: 'Gallery', event: 'Fold Paper breakfast' },
  { id: 'spn_river', name: 'Rivermark Labs', tier: 'Silver', amount: 14000, owner: 'Priya Poluru', status: 'Confirmed', booth: 'River Room', event: 'Harbor Product Day' },
  { id: 'spn_field', name: 'Fieldwork Studio', tier: 'Community', amount: 4000, owner: 'Luca Poluru', status: 'Draft', booth: '—', event: 'Pine & Copper salon' },
  { id: 'spn_pine', name: 'Pine & Copper', tier: 'Community', amount: 8000, owner: 'Priya Poluru', status: 'Pending', booth: 'Oak Lounge', event: 'Pine & Copper salon' },
  { id: 'spn_lattice', name: 'Lattice Energy', tier: 'Gold', amount: 10000, owner: 'Rohan Poluru', status: 'Watch', booth: 'Hall B 1', event: 'Lattice Ops Forum' },
];

export const sponsorColumns = [
  { key: 'name', label: 'Sponsor', sortable: true },
  { key: 'tier', label: 'Tier' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'booth', label: 'Booth' },
  { key: 'owner', label: 'Owner' },
];

export const attendance = [
  { id: 'at_1', event: 'Northline Summit', gate: 'Foyer A', scanned: 312, capacity: 350, rate: 89, owner: 'Elena Poluru', status: 'On track' },
  { id: 'at_2', event: 'Northline Summit', gate: 'Foyer B', scanned: 200, capacity: 350, rate: 57, owner: 'Elena Poluru', status: 'Watch' },
  { id: 'at_3', event: 'Fold Paper breakfast', gate: 'Gallery', scanned: 58, capacity: 64, rate: 91, owner: 'Elena Poluru', status: 'Complete' },
  { id: 'at_4', event: 'Parks volunteer night', gate: 'Courtyard', scanned: 91, capacity: 96, rate: 95, owner: 'Luca Poluru', status: 'Complete' },
];

export const attendanceColumns = [
  { key: 'event', label: 'Event', sortable: true },
  { key: 'gate', label: 'Gate' },
  { key: 'scanned', label: 'Scanned' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'rate', label: 'Rate' },
  { key: 'status', label: 'Status' },
];

export const people = [
  { name: 'Mira Poluru', role: 'Head of events', squad: 'Gather', rating: 5, score: 94, book: 8 },
  { name: 'Elena Poluru', role: 'Registration lead', squad: 'Desk', rating: 5, score: 91, book: 1284 },
  { name: 'Kavya Poluru', role: 'Program lead', squad: 'Program', rating: 5, score: 88, book: 3 },
  { name: 'Hana Poluru', role: 'Ops producer', squad: 'Ops', rating: 4, score: 84, book: 2 },
  { name: 'Luca Poluru', role: 'Venue manager', squad: 'Venues', rating: 4, score: 86, book: 11 },
  { name: 'Nikhil Poluru', role: 'AV lead', squad: 'AV', rating: 5, score: 90, book: 8 },
  { name: 'Arjun Poluru', role: 'Sponsor desk', squad: 'Revenue', rating: 4, score: 82, book: 12 },
  { name: 'Sahana Poluru', role: 'Speaker wrangler', squad: 'Program', rating: 4, score: 81, book: 42 },
  { name: 'Anika Poluru', role: 'Badge print', squad: 'Desk', rating: 4, score: 89, book: 976 },
  { name: 'Priya Poluru', role: 'Community', squad: 'Program', rating: 4, score: 85, book: 2 },
];

export const cadence = [
  { label: 'Hall A keynote', description: 'Mira Poluru · Welcome', timestamp: '16 Sep', icon: 'star', status: 'Today' },
  { label: 'Foyer B check-in lag', description: 'Elena Poluru · 57%', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Today' },
  { label: 'Kavya pipeline talk', description: 'Hall A · 10:15', timestamp: '16 Sep', icon: 'clock', status: 'Next' },
  { label: 'Harbor Product Day load-in', description: 'Nikhil Poluru · River Room', timestamp: '23 Sep', icon: 'folder', status: 'Scheduled' },
  { label: 'Brightwell dinner hold', description: 'Arjun Poluru · Oak Lounge', timestamp: '9 Oct', icon: 'check', status: 'Scheduled' },
  { label: 'Speaker travel pending', description: 'Sahana Poluru · 3 names', timestamp: '18 Sep', icon: 'user', status: 'Scheduled' },
];

export const activity = [
  { label: 'Doors opened Hall A', description: 'Elena Poluru · 08:02', timestamp: '16 Sep', icon: 'check', status: 'Done' },
  { label: 'Badge jam Foyer B', description: 'Anika Poluru · printer 2', timestamp: '16 Sep', icon: 'alert-triangle', status: 'Watch' },
  { label: 'Harbor booth live', description: 'Kavya Poluru · Foyer A', timestamp: '16 Sep', icon: 'star', status: 'Done' },
  { label: 'Fold breakfast closed', description: 'Elena Poluru · 91% show', timestamp: '8 Sep', icon: 'check', status: 'Done' },
  { label: 'Lattice hold Hall B', description: 'Hana Poluru · 2 Oct', timestamp: '12 Sep', icon: 'folder', status: 'Watch' },
  { label: 'Speaker green room set', description: 'Sahana Poluru · 16 seats', timestamp: '15 Sep', icon: 'user', status: 'Done' },
];

export const reports = [
  { name: 'Check-in pack', owner: 'Elena Poluru', updated: '16 Sep 2026', format: 'CSV' },
  { name: 'Sponsor book', owner: 'Arjun Poluru', updated: '15 Sep 2026', format: 'XLSX' },
  { name: 'Speaker grid', owner: 'Sahana Poluru', updated: '14 Sep 2026', format: 'PDF' },
  { name: 'Room utilization', owner: 'Luca Poluru', updated: '16 Sep 2026', format: 'XLSX' },
  { name: 'Registration dump', owner: 'Anika Poluru', updated: '16 Sep 2026', format: 'CSV' },
  { name: 'Post-show appendix', owner: 'Mira Poluru', updated: '11 Sep 2026', format: 'PDF' },
];

export const inboxItems = [
  { label: 'Foyer B is at 57%', description: 'Elena Poluru · printer 2 jammed', icon: 'alert-triangle' },
  { label: 'Three speakers pending travel', description: 'Sahana Poluru · Nikhil, Dev, Sahana', icon: 'clock' },
  { label: 'Harbor booth is live', description: 'Kavya Poluru · Foyer A', icon: 'check' },
  { label: 'Oak Lounge dinner still pending', description: 'Arjun Poluru · Brightwell', icon: 'folder' },
];

export const commandItems = [
  { label: 'Overview', description: 'House pulse', href: '#/overview', icon: 'home' },
  { label: 'Northline Summit', description: 'Live · Hall A', href: '#/event/ev_north', icon: 'folder' },
  { label: 'Registrations', description: '1,284 guests', href: '#/registrations', icon: 'user' },
  { label: 'Schedule', description: '14 sessions today', href: '#/schedule', icon: 'clock' },
  { label: 'Speakers', description: '42 locked', href: '#/speakers', icon: 'star' },
  { label: 'Sponsors', description: '$186k', href: '#/sponsors', icon: 'plus' },
  { label: 'Attendance', description: '76% in', href: '#/attendance', icon: 'check' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export const createSteps = [
  { label: 'Event', description: 'Name and dates' },
  { label: 'Room', description: 'Venue and capacity' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const venueTree = [
  {
    id: 'live',
    label: 'Live',
    children: [
      { id: 'halla', label: 'Hall A', href: '#/venues' },
      { id: 'green', label: 'Green Room', href: '#/venues' },
      { id: 'press', label: 'Press nook', href: '#/venues' },
    ],
  },
  {
    id: 'ahead',
    label: 'Ahead',
    children: [
      { id: 'river', label: 'River Room', href: '#/venues' },
      { id: 'studio', label: 'Studio 2', href: '#/venues' },
      { id: 'oak', label: 'Oak Lounge', href: '#/venues' },
    ],
  },
  {
    id: 'open',
    label: 'Open',
    children: [
      { id: 'gallery', label: 'Gallery', href: '#/venues' },
      { id: 'court', label: 'Courtyard', href: '#/venues' },
      { id: 'break', label: 'Breakout 4', href: '#/venues' },
    ],
  },
];

export const policies = [
  { id: 'po_badge', name: 'Badge print SLA', trigger: 'Queue over 8 minutes', owner: 'Elena Poluru', items: 1, status: 'Active', steps: 3 },
  { id: 'po_speaker', name: 'Speaker travel', trigger: 'Travel not confirmed 7 days out', owner: 'Sahana Poluru', items: 3, status: 'Active', steps: 4 },
  { id: 'po_room', name: 'Room turn', trigger: '15 minutes between sessions', owner: 'Luca Poluru', items: 8, status: 'Active', steps: 2 },
  { id: 'po_sponsor', name: 'Booth live', trigger: 'Doors minus 60 minutes', owner: 'Arjun Poluru', items: 2, status: 'Active', steps: 3 },
  { id: 'po_cap', name: 'Capacity hold', trigger: 'Registered over 95%', owner: 'Mira Poluru', items: 1, status: 'Active', steps: 2 },
  { id: 'po_noshow', name: 'No-show follow-up', trigger: 'Absent after 11:00', owner: 'Anika Poluru', items: 0, status: 'Draft', steps: 2 },
];

export const apiSnippet = `GET /v1/events/ev_north
Authorization: Bearer gather_live_****

{
  "id": "ev_north",
  "code": "GAT-1842",
  "name": "Northline Summit",
  "status": "Live",
  "owner": "Mira Poluru"
}`;

export function buildSearchCatalog() {
  const eventHits = events.map((item) => ({
    label: item.name,
    description: `${item.code} · ${item.status}`,
    owner: item.owner,
    type: 'Event',
    href: `#/event/${item.id}`,
  }));
  const regHits = registrations.map((item) => ({
    label: item.name,
    description: `${item.event} · ${item.status}`,
    owner: item.name,
    type: 'Registration',
    href: '#/registrations',
  }));
  const venueHits = venues.map((item) => ({
    label: item.name,
    description: `${item.seats} seats · ${item.status}`,
    owner: 'Luca Poluru',
    type: 'Venue',
    href: '#/venues',
  }));
  const speakerHits = speakers.map((item) => ({
    label: item.name,
    description: `${item.talk} · ${item.slot}`,
    owner: item.name,
    type: 'Speaker',
    href: '#/speakers',
  }));
  const sponsorHits = sponsors.map((item) => ({
    label: item.name,
    description: `${item.tier} · ${item.status}`,
    owner: item.owner,
    type: 'Sponsor',
    href: '#/sponsors',
  }));
  const reportHits = reports.map((item) => ({
    label: item.name,
    description: `${item.format} · ${item.updated}`,
    owner: item.owner,
    type: 'Report',
    href: '#/reports',
  }));
  return [
    ...eventHits,
    ...regHits,
    ...venueHits,
    ...speakerHits,
    ...sponsorHits,
    ...reportHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
