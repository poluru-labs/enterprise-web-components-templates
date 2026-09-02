export const productName = 'Halo';
export const productLine = 'Clinic';
export const clinicName = 'San Jose';

export const currentUser = {
  name: 'Aisha Poluru',
  email: 'aisha.poluru@San Jose.example',
  role: 'Practice administrator',
};

export const clinic = {
  name: clinicName,
  npi: '1841723901',
  address: '220 Riverfront Drive, Suite 400, Austin, TX 78701',
  phone: '(512) 555-0148',
  hours: 'Mon–Fri 7:30–18:00 · Sat 8:00–12:00',
  timezone: 'America / Chicago',
};

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'grid' },
  { label: 'Schedule', href: '#/schedule', icon: 'calendar3' },
  { label: 'Patients', href: '#/patients', icon: 'people' },
  { label: 'Providers', href: '#/providers', icon: 'heart-pulse' },
  { label: 'Census', href: '#/census', icon: 'building' },
  { label: 'Orders', href: '#/orders', icon: 'clipboard2-pulse' },
  { label: 'Messages', href: '#/messages', icon: 'chat-dots' },
  { label: 'Insights', href: '#/insights', icon: 'graph-up' },
  { label: 'Search', href: '#/search', icon: 'search' },
  { label: 'Settings', href: '#/settings', icon: 'sliders' },
];

export const roomOccupancy = 82;

export const kpis = [
  { label: 'Appointments today', value: '36', hint: '6 remaining this afternoon', trend: 'up', trendValue: '+4 vs typical' },
  { label: 'Checked in', value: '20', hint: 'Average wait 10 min', trend: 'down', trendValue: '-2 min' },
  { label: 'Open slots', value: '8', hint: '2 same-day available', trend: 'flat', trendValue: 'Stable' },
  { label: 'No-show risk', value: '2', hint: 'Outreach sent at 07:45', trend: 'down', trendValue: '-1' },
  { label: 'Lab results', value: '14', hint: '5 need clinician review', trend: 'up', trendValue: '+3' },
  { label: 'Messages', value: '31', hint: 'Inbox under 90 min', trend: 'down', trendValue: '-12%' },
  { label: 'Room occupancy', value: '82%', hint: '6 of 8 rooms in use', trend: 'up', trendValue: '+6 pts' },
  { label: 'Patient panel', value: '2,912', hint: 'Active in 12 months', trend: 'up', trendValue: '+9.1%' },
];

export const providers = [
  {
    id: 'prv_elena',
    name: 'Dr. Elena Poluru',
    role: 'Family medicine',
    npi: '1487210044',
    panel: 612,
    today: 12,
    rooms: 'Exam 1 · Exam 2',
    status: 'In clinic',
    next: '09:40 · prenatal',
  },
  {
    id: 'prv_marcus',
    name: 'Dr. Marcus Poluru',
    role: 'Internal medicine',
    npi: '1679038815',
    panel: 548,
    today: 10,
    rooms: 'Exam 3',
    status: 'In clinic',
    next: '09:00 · chronic care',
  },
  {
    id: 'prv_priya',
    name: 'Dr. Priya Poluru',
    role: 'Pediatrics',
    npi: '1295742208',
    panel: 490,
    today: 9,
    rooms: 'Exam 4',
    status: 'In clinic',
    next: '09:20 · well child',
  },
  {
    id: 'prv_jordan',
    name: 'Jordan Poluru, NP',
    role: 'Urgent care',
    npi: '1023384414',
    panel: 210,
    today: 7,
    rooms: 'Procedure',
    status: 'On break',
    next: '10:20 · urgent',
  },
  {
    id: 'prv_samir',
    name: 'Dr. Samir Poluru',
    role: 'Cardiology consult',
    npi: '1982641102',
    panel: 86,
    today: 4,
    rooms: 'Telehealth A',
    status: 'Telehealth',
    next: '11:30 · consult',
  },
  {
    id: 'prv_nadia',
    name: 'Dr. Nadia Poluru',
    role: 'Women\'s health',
    npi: '1562840091',
    panel: 378,
    today: 8,
    rooms: 'Exam 5',
    status: 'In clinic',
    next: '10:00 · annual',
  },
];

export const rooms = [
  { id: 'exam-1', name: 'Exam 1', provider: 'Dr. Elena Poluru', patient: 'Maya Poluru', status: 'In visit', occupancy: 88, eta: '12 min remaining' },
  { id: 'exam-2', name: 'Exam 2', provider: 'Dr. Elena Poluru', patient: 'Ready for next', status: 'Turnover', occupancy: 22, eta: 'Cleaning · 3 min' },
  { id: 'exam-3', name: 'Exam 3', provider: 'Dr. Marcus Poluru', patient: 'James Chen', status: 'In visit', occupancy: 76, eta: '18 min remaining' },
  { id: 'exam-4', name: 'Exam 4', provider: 'Dr. Priya Poluru', patient: 'Noah Poluru', status: 'Waiting', occupancy: 44, eta: 'MA in room' },
  { id: 'exam-5', name: 'Exam 5', provider: 'Dr. Nadia Poluru', patient: 'Anika Patel', status: 'In visit', occupancy: 68, eta: '20 min remaining' },
  { id: 'proc', name: 'Procedure', provider: 'Jordan Poluru, NP', patient: 'Open', status: 'Available', occupancy: 0, eta: 'Next at 10:20' },
  { id: 'tele-a', name: 'Telehealth A', provider: 'Dr. Samir Poluru', patient: 'Connecting', status: 'Virtual', occupancy: 52, eta: '11:30 start' },
  { id: 'tele-b', name: 'Telehealth B', provider: 'Float', patient: 'Open', status: 'Available', occupancy: 0, eta: 'Two slots open' },
];

export const floorWatch = [
  { title: 'Exam 2 turnover', hint: 'Cleaning · 3 min · next in-person open at 16:20', href: '#/census', tone: 'Turnover' },
  { title: 'Critical A1C', hint: 'Luis Poluru 9.4% · same-day review still open', href: '#/orders', tone: 'Critical' },
  { title: 'No-show risk', hint: 'Leila Poluru has not confirmed the 10:20 urgent slot', href: '#/schedule', tone: 'Watch' },
  { title: 'Refill waiting', hint: 'Maya Poluru · albuterol · chart already open in Exam 1', href: '#/messages', tone: 'Refill' },
];

export const insightPulse = [
  { label: 'Kept rate', value: '77%', hint: 'Completed visits this week' },
  { label: 'No-show', value: '6%', hint: 'Outreach cut this by one today' },
  { label: 'Avg wait', value: '10 min', hint: 'Door to room after 10:00' },
  { label: 'Same-day fill', value: '66%', hint: 'Open slots claimed by noon' },
];

export const messageQueues = [
  { title: 'Refills', value: '1 unread', hint: 'Maya Poluru inhaler before Thursday', href: '#/messages', tone: 'Unread' },
  { title: 'Results', value: '1 unread', hint: 'Luis Poluru A1C 9.4% flagged', href: '#/orders', tone: 'Critical' },
  { title: 'Clinical', value: '1 unread', hint: 'Hana Poluru prenatal travel question', href: '#/messages', tone: 'Unread' },
  { title: 'Referrals', value: '2 open', hint: 'Cardiology Friday 09:20 and mammogram', href: '#/messages', tone: 'Open' },
];

export const orderReviews = [
  { title: 'A1C 9.4%', hint: 'Luis Poluru · ORD-4412 collected this morning', href: '#/orders', tone: 'Critical' },
  { title: 'Spirometry in room', hint: 'Maya Poluru · Exam 1 still in progress', href: '#/orders', tone: 'In progress' },
  { title: 'Lipid + EKG', hint: 'Ravi Poluru · waiting on Dr. Samir Poluru', href: '#/orders', tone: 'Review' },
  { title: 'Mammogram pending', hint: 'Anika Patel · imaging has not scheduled', href: '#/orders', tone: 'Pending' },
];

export const scheduleWatch = [
  { title: 'Exam 1', hint: 'Maya Poluru · in visit · 12 min remaining', href: '#/census', tone: 'In visit' },
  { title: 'Exam 2', hint: 'Turnover · next in-person open at 16:20', href: '#/census', tone: 'Turnover' },
  { title: 'Lobby', hint: '4 waiting · average door-to-room 10 min', href: '#/census', tone: 'Busy' },
  { title: 'Telehealth A', hint: 'Connecting · Dr. Samir Poluru at 11:30', href: '#/census', tone: 'Virtual' },
];

export const patients = [
  {
    id: 'pt_maya',
    name: 'Maya Poluru',
    mrn: 'RFM-10482',
    dob: '12 Mar 1988',
    age: 38,
    sex: 'F',
    phone: '(512) 555-2190',
    email: 'maya.poluru@example.com',
    pcp: 'Dr. Elena Poluru',
    coverage: 'Blue Cross PPO',
    allergies: 'Penicillin',
    conditions: 'Asthma, migraine',
    lastVisit: '18 Aug 2026',
    status: 'In visit',
  },
  {
    id: 'pt_luis',
    name: 'Luis Poluru',
    mrn: 'RFM-09811',
    dob: '4 Nov 1974',
    age: 51,
    sex: 'M',
    phone: '(512) 555-4412',
    email: 'luis.poluru@example.com',
    pcp: 'Dr. Marcus Poluru',
    coverage: 'Aetna HMO',
    allergies: 'NKDA',
    conditions: 'Hypertension, T2D',
    lastVisit: '22 Aug 2026',
    status: 'Checked in',
  },
  {
    id: 'pt_noah',
    name: 'Noah Poluru',
    mrn: 'RFM-12209',
    dob: '19 Aug 2018',
    age: 8,
    sex: 'M',
    phone: '(512) 555-8801',
    email: 'caregiver.poluru@example.com',
    pcp: 'Dr. Priya Poluru',
    coverage: 'United Healthcare',
    allergies: 'Peanuts',
    conditions: 'Seasonal allergies',
    lastVisit: '29 Aug 2026',
    status: 'Waiting',
  },
  {
    id: 'pt_hana',
    name: 'Hana Poluru',
    mrn: 'RFM-08744',
    dob: '28 Jan 1996',
    age: 30,
    sex: 'F',
    phone: '(512) 555-3308',
    email: 'hana.poluru@example.com',
    pcp: 'Dr. Elena Poluru',
    coverage: 'Cigna Open Access',
    allergies: 'Sulfa',
    conditions: 'Prenatal · 24w',
    lastVisit: '4 Sep 2026',
    status: 'Scheduled',
  },
  {
    id: 'pt_owen',
    name: 'Owen Poluru',
    mrn: 'RFM-11002',
    dob: '9 May 1961',
    age: 65,
    sex: 'M',
    phone: '(512) 555-7721',
    email: 'owen.poluru@example.com',
    pcp: 'Dr. Marcus Poluru',
    coverage: 'Medicare Advantage',
    allergies: 'Codeine',
    conditions: 'AFib, CKD stage 2',
    lastVisit: '30 Aug 2026',
    status: 'Scheduled',
  },
  {
    id: 'pt_leila',
    name: 'Leila Poluru',
    mrn: 'RFM-13118',
    dob: '2 Feb 2003',
    age: 23,
    sex: 'F',
    phone: '(512) 555-0199',
    email: 'leila.poluru@example.com',
    pcp: 'Jordan Poluru, NP',
    coverage: 'Self-pay',
    allergies: 'NKDA',
    conditions: 'Anxiety',
    lastVisit: '18 Aug 2026',
    status: 'No-show risk',
  },
  {
    id: 'pt_ravi',
    name: 'Ravi Poluru',
    mrn: 'RFM-07620',
    dob: '14 Dec 1982',
    age: 43,
    sex: 'M',
    phone: '(512) 555-6640',
    email: 'ravi.poluru@example.com',
    pcp: 'Dr. Samir Poluru',
    coverage: 'Humana PPO',
    allergies: 'Iodine contrast',
    conditions: 'Hyperlipidemia',
    lastVisit: '9 Aug 2026',
    status: 'Telehealth',
  },
  {
    id: 'pt_sofia',
    name: 'Sofia Poluru',
    mrn: 'RFM-09433',
    dob: '21 Sep 1991',
    age: 34,
    sex: 'F',
    phone: '(512) 555-2284',
    email: 'sofia.poluru@example.com',
    pcp: 'Dr. Elena Poluru',
    coverage: 'Blue Cross PPO',
    allergies: 'Latex',
    conditions: 'Hypothyroid',
    lastVisit: '2 Sep 2026',
    status: 'Scheduled',
  },
  {
    id: 'pt_anika',
    name: 'Anika Patel',
    mrn: 'RFM-14201',
    dob: '15 Jul 1990',
    age: 36,
    sex: 'F',
    phone: '(512) 555-3310',
    email: 'anika.patel@example.com',
    pcp: 'Dr. Nadia Poluru',
    coverage: 'Blue Cross PPO',
    allergies: 'NKDA',
    conditions: 'Annual wellness',
    lastVisit: '20 Aug 2026',
    status: 'In visit',
  },
  {
    id: 'pt_james',
    name: 'James Chen',
    mrn: 'RFM-14202',
    dob: '3 Apr 1978',
    age: 48,
    sex: 'M',
    phone: '(512) 555-3311',
    email: 'james.chen@example.com',
    pcp: 'Dr. Marcus Poluru',
    coverage: 'Aetna HMO',
    allergies: 'Shellfish',
    conditions: 'Prediabetes',
    lastVisit: '28 Aug 2026',
    status: 'In visit',
  },
  {
    id: 'pt_kiran',
    name: 'Kiran Poluru',
    mrn: 'RFM-11880',
    dob: '6 Jun 2000',
    age: 26,
    sex: 'M',
    phone: '(512) 555-5520',
    email: 'kiran.poluru@example.com',
    pcp: 'Jordan Poluru, NP',
    coverage: 'United Healthcare',
    allergies: 'NKDA',
    conditions: 'Sports physical',
    lastVisit: '1 Sep 2026',
    status: 'Scheduled',
  },
  {
    id: 'pt_elena_c',
    name: 'Elena Chen-Poluru',
    mrn: 'RFM-11550',
    dob: '11 Oct 1968',
    age: 57,
    sex: 'F',
    phone: '(512) 555-5521',
    email: 'elena.chen-poluru@example.com',
    pcp: 'Dr. Elena Poluru',
    coverage: 'Medicare Advantage',
    allergies: 'Aspirin',
    conditions: 'Osteoarthritis',
    lastVisit: '27 Aug 2026',
    status: 'Scheduled',
  },
];

export const appointments = [
  { id: 'apt_1041', time: '08:00', end: '08:30', patient: 'Maya Poluru', patientId: 'pt_maya', provider: 'Dr. Elena Poluru', room: 'Exam 1', type: 'Follow-up', mode: 'In person', status: 'In visit', date: '2026-09-01' },
  { id: 'apt_1042', time: '08:30', end: '09:00', patient: 'Anika Patel', patientId: 'pt_anika', provider: 'Dr. Nadia Poluru', room: 'Exam 5', type: 'Annual', mode: 'In person', status: 'In visit', date: '2026-09-01' },
  { id: 'apt_1043', time: '09:00', end: '09:30', patient: 'James Chen', patientId: 'pt_james', provider: 'Dr. Marcus Poluru', room: 'Exam 3', type: 'Chronic care', mode: 'In person', status: 'In visit', date: '2026-09-01' },
  { id: 'apt_1044', time: '09:20', end: '09:50', patient: 'Noah Poluru', patientId: 'pt_noah', provider: 'Dr. Priya Poluru', room: 'Exam 4', type: 'Well child', mode: 'In person', status: 'Waiting', date: '2026-09-01' },
  { id: 'apt_1045', time: '09:40', end: '10:10', patient: 'Hana Poluru', patientId: 'pt_hana', provider: 'Dr. Elena Poluru', room: 'Exam 2', type: 'Prenatal', mode: 'In person', status: 'Checked in', date: '2026-09-01' },
  { id: 'apt_1046', time: '10:00', end: '10:30', patient: 'Owen Poluru', patientId: 'pt_owen', provider: 'Dr. Marcus Poluru', room: 'Exam 3', type: 'New patient', mode: 'In person', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1047', time: '10:20', end: '10:40', patient: 'Leila Poluru', patientId: 'pt_leila', provider: 'Jordan Poluru, NP', room: 'Procedure', type: 'Urgent', mode: 'In person', status: 'No-show risk', date: '2026-09-01' },
  { id: 'apt_1048', time: '11:00', end: '11:20', patient: 'Sofia Poluru', patientId: 'pt_sofia', provider: 'Dr. Elena Poluru', room: 'Exam 1', type: 'Lab review', mode: 'In person', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1049', time: '11:30', end: '12:00', patient: 'Ravi Poluru', patientId: 'pt_ravi', provider: 'Dr. Samir Poluru', room: 'Telehealth A', type: 'Consult', mode: 'Telehealth', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1050', time: '13:00', end: '13:30', patient: 'Maya Poluru', patientId: 'pt_maya', provider: 'Dr. Elena Poluru', room: 'Exam 2', type: 'Spirometry', mode: 'In person', status: 'Completed', date: '2026-09-01' },
  { id: 'apt_1051', time: '14:00', end: '14:30', patient: 'Luis Poluru', patientId: 'pt_luis', provider: 'Dr. Marcus Poluru', room: 'Exam 3', type: 'A1C review', mode: 'In person', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1052', time: '14:20', end: '14:50', patient: 'Sofia Poluru', patientId: 'pt_sofia', provider: 'Dr. Elena Poluru', room: 'Exam 1', type: 'Follow-up', mode: 'In person', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1053', time: '15:00', end: '15:30', patient: 'Ravi Poluru', patientId: 'pt_ravi', provider: 'Dr. Samir Poluru', room: 'Telehealth A', type: 'Echo review', mode: 'Telehealth', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1054', time: '15:10', end: '15:40', patient: 'Noah Poluru', patientId: 'pt_noah', provider: 'Dr. Priya Poluru', room: 'Exam 4', type: 'Vaccine', mode: 'In person', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1055', time: '15:40', end: '16:00', patient: 'Leila Poluru', patientId: 'pt_leila', provider: 'Jordan Poluru, NP', room: 'Procedure', type: 'Laceration', mode: 'Walk-in', status: 'Scheduled', date: '2026-09-01' },
  { id: 'apt_1056', time: '08:15', end: '08:45', patient: 'Kiran Poluru', patientId: 'pt_kiran', provider: 'Jordan Poluru, NP', room: 'Procedure', type: 'Sports physical', mode: 'In person', status: 'Completed', date: '2026-08-28' },
  { id: 'apt_1057', time: '10:30', end: '11:00', patient: 'Elena Chen-Poluru', patientId: 'pt_elena_c', provider: 'Dr. Elena Poluru', room: 'Exam 2', type: 'Joint pain', mode: 'In person', status: 'Completed', date: '2026-08-27' },
  { id: 'apt_1058', time: '16:20', end: '16:50', patient: 'Anika Patel', patientId: 'pt_anika', provider: 'Dr. Nadia Poluru', room: 'Exam 5', type: 'Follow-up', mode: 'In person', status: 'Scheduled', date: '2026-09-01' },
];

export const appointmentColumns = [
  { key: 'time', label: 'Time', sortable: true },
  { key: 'patient', label: 'Patient', sortable: true },
  { key: 'provider', label: 'Provider', sortable: true },
  { key: 'room', label: 'Room', sortable: true },
  { key: 'type', label: 'Visit type', sortable: true },
  { key: 'mode', label: 'Mode', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const patientColumns = [
  { key: 'name', label: 'Patient', sortable: true },
  { key: 'mrn', label: 'MRN', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'pcp', label: 'PCP', sortable: true },
  { key: 'coverage', label: 'Coverage', sortable: true },
  { key: 'lastVisit', label: 'Last visit', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const providerColumns = [
  { key: 'name', label: 'Provider', sortable: true },
  { key: 'role', label: 'Specialty', sortable: true },
  { key: 'panel', label: 'Panel', sortable: true },
  { key: 'today', label: 'Today', sortable: true },
  { key: 'rooms', label: 'Rooms', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'next', label: 'Next', sortable: true },
];

export const orders = [
  { id: 'ORD-4412', patient: 'Luis Poluru', test: 'A1C + CMP', ordered: '1 Sep 07:40', status: 'Collected', owner: 'Lab' },
  { id: 'ORD-4413', patient: 'Maya Poluru', test: 'Spirometry', ordered: '1 Sep 08:12', status: 'In progress', owner: 'Respiratory' },
  { id: 'ORD-4410', patient: 'Owen Poluru', test: 'BMP + TSH', ordered: '31 Aug 16:05', status: 'Resulted', owner: 'Dr. Marcus Poluru' },
  { id: 'ORD-4408', patient: 'Hana Poluru', test: 'OB panel', ordered: '31 Aug 09:22', status: 'Resulted', owner: 'Dr. Elena Poluru' },
  { id: 'ORD-4406', patient: 'Ravi Poluru', test: 'Lipid + EKG', ordered: '30 Aug 11:18', status: 'Review', owner: 'Dr. Samir Poluru' },
  { id: 'ORD-4401', patient: 'Sofia Poluru', test: 'TSH', ordered: '29 Aug 14:01', status: 'Resulted', owner: 'Dr. Elena Poluru' },
  { id: 'ORD-4398', patient: 'Noah Poluru', test: 'Rapid strep', ordered: '1 Sep 09:04', status: 'Pending', owner: 'Lab' },
  { id: 'ORD-4394', patient: 'Leila Poluru', test: 'Urine hCG', ordered: '1 Sep 10:11', status: 'Pending', owner: 'Lab' },
  { id: 'ORD-4390', patient: 'James Chen', test: 'HbA1c', ordered: '28 Aug 08:30', status: 'Resulted', owner: 'Dr. Marcus Poluru' },
  { id: 'ORD-4388', patient: 'Anika Patel', test: 'Mammogram order', ordered: '27 Aug 15:20', status: 'Pending', owner: 'Dr. Nadia Poluru' },
];

export const orderColumns = [
  { key: 'id', label: 'Order', sortable: true },
  { key: 'patient', label: 'Patient', sortable: true },
  { key: 'test', label: 'Test', sortable: true },
  { key: 'ordered', label: 'Ordered', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
];

export const messages = [
  { id: 'msg_1', from: 'Maya Poluru', subject: 'Inhaler refill', preview: 'Albuterol is empty. Can we refill before Thursday?', time: '12 min', unread: true, queue: 'Refills' },
  { id: 'msg_2', from: 'Lab · Quest', subject: 'Critical A1C', preview: 'Luis Poluru A1C 9.4%. Flagged for same-day review.', time: '28 min', unread: true, queue: 'Results' },
  { id: 'msg_3', from: 'Hana Poluru', subject: 'Prenatal questions', preview: 'Is travel in the second trimester okay for a 4-hour flight?', time: '1 hr', unread: true, queue: 'Clinical' },
  { id: 'msg_4', from: 'Referral desk', subject: 'Cardiology slot', preview: 'Dr. Samir Poluru has a cancellation Friday 09:20.', time: '2 hr', unread: false, queue: 'Referrals' },
  { id: 'msg_5', from: 'Owen Poluru', subject: 'Pharmacy hold', preview: 'CVS needs a prior auth on apixaban.', time: '3 hr', unread: false, queue: 'Auth' },
  { id: 'msg_6', from: 'Leila Poluru', subject: 'Running late', preview: 'Parking garage is full. ETA 12 minutes.', time: 'Yesterday', unread: false, queue: 'Front desk' },
  { id: 'msg_7', from: 'Anika Patel', subject: 'Mammogram scheduling', preview: 'Can imaging call me back about the order from last week?', time: 'Yesterday', unread: false, queue: 'Referrals' },
  { id: 'msg_8', from: 'James Chen', subject: 'Lab results', preview: 'HbA1c came back at 6.1. Should I adjust diet before follow-up?', time: '2 days', unread: false, queue: 'Clinical' },
];

export const visitNotes = {
  apt_1041: {
    reason: 'Asthma follow-up after summer flare',
    vitals: [
      { term: 'BP', description: '118 / 74' },
      { term: 'HR', description: '72' },
      { term: 'Temp', description: '36.6 °C' },
      { term: 'SpO2', description: '98%' },
      { term: 'Weight', description: '64.2 kg' },
    ],
    timeline: [
      { title: 'Arrived', description: 'Self check-in kiosk', timestamp: '07:48', status: 'complete' },
      { title: 'Roomed', description: 'MA Lena Poluru · Exam 1', timestamp: '07:56', status: 'complete' },
      { title: 'Provider in room', description: 'Dr. Elena Poluru', timestamp: '08:04', status: 'current' },
      { title: 'Checkout', description: 'Pending after-visit summary', timestamp: '—', status: 'upcoming' },
    ],
  },
};

export const meds = {
  pt_maya: ['Fluticasone 110 mcg BID', 'Albuterol PRN', 'Sumatriptan 50 mg'],
  pt_luis: ['Metformin 1000 mg BID', 'Lisinopril 20 mg', 'Atorvastatin 40 mg'],
  pt_noah: ['Cetirizine 5 mg daily', 'Epinephrine auto-injector'],
  pt_hana: ['Prenatal vitamin', 'Docusate 100 mg'],
  pt_owen: ['Apixaban 5 mg BID', 'Metoprolol 25 mg', 'Losartan 50 mg'],
  pt_leila: ['Sertraline 50 mg daily'],
  pt_ravi: ['Rosuvastatin 20 mg', 'Aspirin 81 mg'],
  pt_sofia: ['Levothyroxine 75 mcg'],
  pt_anika: ['Multivitamin daily'],
  pt_james: ['Metformin 500 mg daily'],
  pt_kiran: ['None active'],
  pt_elena_c: ['Acetaminophen PRN', 'Vitamin D3 2000 IU'],
};

export const waitMinutes = [16, 15, 14, 13, 12, 11, 11, 10, 10, 11, 10, 9];
export const volumeWeeks = [148, 151, 155, 160, 166, 171, 168, 174, 180, 176, 182, 188];

export const activity = [
  { title: 'Maya Poluru roomed', description: 'Exam 1 · asthma follow-up', timestamp: '2 min ago', status: 'current' },
  { title: 'Critical lab flagged', description: 'Luis Poluru A1C 9.4%', timestamp: '28 min ago', status: 'complete' },
  { title: 'No-show outreach sent', description: 'Leila Poluru · 10:20 urgent', timestamp: '1 hr ago', status: 'complete' },
  { title: 'Telehealth link issued', description: 'Ravi Poluru · 11:30 consult', timestamp: 'This morning', status: 'upcoming' },
];

export const commandItems = [
  { label: 'Book appointment', description: 'Find a slot and schedule', href: '#/schedule', icon: 'plus' },
  { label: 'Check in patient', description: 'Open today\'s board', href: '#/schedule', icon: 'check' },
  { label: 'Find a chart', description: 'Search the directory', href: '#/patients', icon: 'user' },
  { label: 'Global search', description: 'Patients, visits, orders', href: '#/search', icon: 'search' },
  { label: 'Review labs', description: 'Orders needing attention', href: '#/orders', icon: 'star' },
  { label: 'Open inbox', description: 'Refills, results, referrals', href: '#/messages', icon: 'mail' },
  { label: 'Clinic insights', description: 'Wait time, no-show, census', href: '#/insights', icon: 'star' },
];

export const boardHours = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
export const boardRooms = ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Exam 5', 'Telehealth A'];

export function nextAppointments(count = 3) {
  return appointments
    .filter((item) => item.date === '2026-09-01' && item.status !== 'Completed' && item.time >= '08:30')
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, count);
}

export function todayAppointments() {
  return appointments.filter((item) => item.date === '2026-09-01');
}
