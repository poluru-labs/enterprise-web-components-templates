export const productName = 'Halo';
export const productLine = 'Clinic';
export const clinicName = 'Riverside Family Medicine';

export const currentUser = {
  name: 'Aisha Poluru',
  email: 'aisha.poluru@riverside.example',
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
  { label: 'Overview', href: '#/overview' },
  { label: 'Schedule', href: '#/schedule' },
  { label: 'Patients', href: '#/patients' },
  { label: 'Providers', href: '#/providers' },
  { label: 'Census', href: '#/census' },
  { label: 'Orders', href: '#/orders' },
  { label: 'Messages', href: '#/messages' },
  { label: 'Insights', href: '#/insights' },
  { label: 'Settings', href: '#/settings' },
];

export const kpis = [
  { label: 'Appointments today', value: '34', hint: '8 remaining this afternoon', trend: 'up', trendValue: '+6 vs typical' },
  { label: 'Checked in', value: '18', hint: 'Average wait 11 min', trend: 'down', trendValue: '-3 min' },
  { label: 'Open slots', value: '9', hint: '2 same-day available', trend: 'flat', trendValue: 'Stable' },
  { label: 'No-show risk', value: '3', hint: 'Outreach sent at 07:10', trend: 'down', trendValue: '-2' },
  { label: 'Lab results', value: '12', hint: '4 need clinician review', trend: 'up', trendValue: '+4' },
  { label: 'Messages', value: '27', hint: 'Inbox under 2 hours', trend: 'down', trendValue: '-18%' },
  { label: 'Room occupancy', value: '82%', hint: '6 of 8 rooms in use', trend: 'up', trendValue: '+8 pts' },
  { label: 'Patient panel', value: '2,846', hint: 'Active in 12 months', trend: 'up', trendValue: '+8.5%' },
];

export const providers = [
  {
    id: 'prv_elena',
    name: 'Dr. Elena Poluru',
    role: 'Family medicine',
    npi: '1487210044',
    panel: 612,
    today: 11,
    rooms: 'Exam 1 · Exam 2',
    status: 'In clinic',
    next: '14:20 · follow-up',
  },
  {
    id: 'prv_marcus',
    name: 'Dr. Marcus Poluru',
    role: 'Internal medicine',
    npi: '1679038815',
    panel: 548,
    today: 9,
    rooms: 'Exam 3',
    status: 'In clinic',
    next: '14:00 · new patient',
  },
  {
    id: 'prv_priya',
    name: 'Dr. Priya Poluru',
    role: 'Pediatrics',
    npi: '1295742208',
    panel: 490,
    today: 8,
    rooms: 'Exam 4',
    status: 'In clinic',
    next: '14:10 · well child',
  },
  {
    id: 'prv_jordan',
    name: 'Jordan Poluru, NP',
    role: 'Urgent care',
    npi: '1023384414',
    panel: 210,
    today: 6,
    rooms: 'Procedure',
    status: 'On break',
    next: '14:40 · laceration',
  },
  {
    id: 'prv_samir',
    name: 'Dr. Samir Poluru',
    role: 'Cardiology consult',
    npi: '1982641102',
    panel: 86,
    today: 3,
    rooms: 'Telehealth A',
    status: 'Telehealth',
    next: '15:00 · echo review',
  },
];

export const rooms = [
  { id: 'exam-1', name: 'Exam 1', provider: 'Dr. Elena Poluru', patient: 'Maya Poluru', status: 'In visit', occupancy: 92, eta: '14 min remaining' },
  { id: 'exam-2', name: 'Exam 2', provider: 'Dr. Elena Poluru', patient: 'Ready for next', status: 'Turnover', occupancy: 18, eta: 'Cleaning · 4 min' },
  { id: 'exam-3', name: 'Exam 3', provider: 'Dr. Marcus Poluru', patient: 'Luis Poluru', status: 'In visit', occupancy: 74, eta: '22 min remaining' },
  { id: 'exam-4', name: 'Exam 4', provider: 'Dr. Priya Poluru', patient: 'Noah Poluru', status: 'Waiting', occupancy: 40, eta: 'MA in room' },
  { id: 'proc', name: 'Procedure', provider: 'Jordan Poluru, NP', patient: 'Open', status: 'Available', occupancy: 0, eta: 'Next at 14:40' },
  { id: 'tele-a', name: 'Telehealth A', provider: 'Dr. Samir Poluru', patient: 'Connecting', status: 'Virtual', occupancy: 55, eta: '15:00 start' },
  { id: 'tele-b', name: 'Telehealth B', provider: 'Float', patient: 'Open', status: 'Available', occupancy: 0, eta: 'Two slots open' },
  { id: 'intake', name: 'Intake', provider: 'Front desk', patient: '3 in lobby', status: 'Busy', occupancy: 68, eta: 'Avg wait 11 min' },
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
    lastVisit: '11 Jun 2026',
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
    lastVisit: '22 Jul 2026',
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
    lastVisit: '19 Aug 2026',
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
    conditions: 'Prenatal · 22w',
    lastVisit: '4 Aug 2026',
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
    lastVisit: '30 Jul 2026',
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
    lastVisit: '18 May 2026',
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
    lastVisit: '9 Apr 2026',
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
    lastVisit: '2 Aug 2026',
    status: 'Scheduled',
  },
];

export const appointments = [
  { id: 'apt_1041', time: '08:00', end: '08:30', patient: 'Maya Poluru', patientId: 'pt_maya', provider: 'Dr. Elena Poluru', room: 'Exam 1', type: 'Follow-up', mode: 'In person', status: 'In visit' },
  { id: 'apt_1042', time: '08:30', end: '09:00', patient: 'Luis Poluru', patientId: 'pt_luis', provider: 'Dr. Marcus Poluru', room: 'Exam 3', type: 'Chronic care', mode: 'In person', status: 'In visit' },
  { id: 'apt_1043', time: '09:00', end: '09:30', patient: 'Noah Poluru', patientId: 'pt_noah', provider: 'Dr. Priya Poluru', room: 'Exam 4', type: 'Well child', mode: 'In person', status: 'Waiting' },
  { id: 'apt_1044', time: '09:40', end: '10:10', patient: 'Hana Poluru', patientId: 'pt_hana', provider: 'Dr. Elena Poluru', room: 'Exam 2', type: 'Prenatal', mode: 'In person', status: 'Checked in' },
  { id: 'apt_1045', time: '10:00', end: '10:30', patient: 'Owen Poluru', patientId: 'pt_owen', provider: 'Dr. Marcus Poluru', room: 'Exam 3', type: 'New patient', mode: 'In person', status: 'Scheduled' },
  { id: 'apt_1046', time: '10:20', end: '10:40', patient: 'Leila Poluru', patientId: 'pt_leila', provider: 'Jordan Poluru, NP', room: 'Procedure', type: 'Urgent', mode: 'In person', status: 'No-show risk' },
  { id: 'apt_1047', time: '11:00', end: '11:20', patient: 'Sofia Poluru', patientId: 'pt_sofia', provider: 'Dr. Elena Poluru', room: 'Exam 1', type: 'Lab review', mode: 'In person', status: 'Scheduled' },
  { id: 'apt_1048', time: '11:30', end: '12:00', patient: 'Ravi Poluru', patientId: 'pt_ravi', provider: 'Dr. Samir Poluru', room: 'Telehealth A', type: 'Consult', mode: 'Telehealth', status: 'Scheduled' },
  { id: 'apt_1049', time: '13:00', end: '13:30', patient: 'Maya Poluru', patientId: 'pt_maya', provider: 'Dr. Elena Poluru', room: 'Exam 2', type: 'Spirometry', mode: 'In person', status: 'Completed' },
  { id: 'apt_1050', time: '14:00', end: '14:30', patient: 'Luis Poluru', patientId: 'pt_luis', provider: 'Dr. Marcus Poluru', room: 'Exam 3', type: 'A1C review', mode: 'In person', status: 'Scheduled' },
  { id: 'apt_1051', time: '14:20', end: '14:50', patient: 'Sofia Poluru', patientId: 'pt_sofia', provider: 'Dr. Elena Poluru', room: 'Exam 1', type: 'Follow-up', mode: 'In person', status: 'Scheduled' },
  { id: 'apt_1052', time: '15:00', end: '15:30', patient: 'Ravi Poluru', patientId: 'pt_ravi', provider: 'Dr. Samir Poluru', room: 'Telehealth A', type: 'Echo review', mode: 'Telehealth', status: 'Scheduled' },
  { id: 'apt_1053', time: '15:10', end: '15:40', patient: 'Noah Poluru', patientId: 'pt_noah', provider: 'Dr. Priya Poluru', room: 'Exam 4', type: 'Vaccine', mode: 'In person', status: 'Scheduled' },
  { id: 'apt_1054', time: '15:40', end: '16:00', patient: 'Leila Poluru', patientId: 'pt_leila', provider: 'Jordan Poluru, NP', room: 'Procedure', type: 'Laceration', mode: 'Walk-in', status: 'Scheduled' },
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
  { id: 'ORD-4412', patient: 'Luis Poluru', test: 'A1C + CMP', ordered: '25 Aug 07:40', status: 'Collected', owner: 'Lab' },
  { id: 'ORD-4413', patient: 'Maya Poluru', test: 'Spirometry', ordered: '25 Aug 08:12', status: 'In progress', owner: 'Respiratory' },
  { id: 'ORD-4410', patient: 'Owen Poluru', test: 'BMP + TSH', ordered: '24 Aug 16:05', status: 'Resulted', owner: 'Dr. Marcus Poluru' },
  { id: 'ORD-4408', patient: 'Hana Poluru', test: 'OB panel', ordered: '24 Aug 09:22', status: 'Resulted', owner: 'Dr. Elena Poluru' },
  { id: 'ORD-4406', patient: 'Ravi Poluru', test: 'Lipid + EKG', ordered: '23 Aug 11:18', status: 'Review', owner: 'Dr. Samir Poluru' },
  { id: 'ORD-4401', patient: 'Sofia Poluru', test: 'TSH', ordered: '22 Aug 14:01', status: 'Resulted', owner: 'Dr. Elena Poluru' },
  { id: 'ORD-4398', patient: 'Noah Poluru', test: 'Rapid strep', ordered: '25 Aug 09:04', status: 'Pending', owner: 'Lab' },
  { id: 'ORD-4394', patient: 'Leila Poluru', test: 'Urine hCG', ordered: '25 Aug 10:11', status: 'Pending', owner: 'Lab' },
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
];

export const visitNotes = {
  apt_1041: {
    reason: 'Asthma follow-up after spring flare',
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
};

export const waitMinutes = [18, 16, 14, 15, 13, 12, 11, 11, 10, 12, 11, 9];
export const volumeWeeks = [142, 151, 148, 160, 166, 171, 168, 174, 180, 176, 182, 188];

export const activity = [
  { title: 'Maya Poluru roomed', description: 'Exam 1 · asthma follow-up', timestamp: '2 min ago', status: 'current' },
  { title: 'Critical lab flagged', description: 'Luis Poluru A1C 9.4%', timestamp: '28 min ago', status: 'complete' },
  { title: 'No-show outreach sent', description: 'Leila Poluru · 10:20 urgent', timestamp: '1 hr ago', status: 'complete' },
  { title: 'Telehealth link issued', description: 'Ravi Poluru · 15:00 echo review', timestamp: 'This morning', status: 'upcoming' },
];

export const commandItems = [
  { label: 'Book appointment', description: 'Find a slot and schedule', href: '#/schedule', icon: 'plus' },
  { label: 'Check in patient', description: 'Open today’s board', href: '#/schedule', icon: 'check' },
  { label: 'Find a chart', description: 'Search the directory', href: '#/patients', icon: 'user' },
  { label: 'Review labs', description: 'Orders needing attention', href: '#/orders', icon: 'star' },
  { label: 'Open inbox', description: 'Refills, results, referrals', href: '#/messages', icon: 'mail' },
  { label: 'Clinic insights', description: 'Wait time, no-show, census', href: '#/insights', icon: 'star' },
];

export const boardHours = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
export const boardRooms = ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Telehealth A'];
