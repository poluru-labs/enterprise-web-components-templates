import { rangeOverlaps, slugify } from '../lib/format.js';

export const productName = 'Alder';
export const productLine = 'People ops';
export const workspaceName = 'Poluru People';

export const WEEK_START = '2026-09-01';
export const WEEK_END = '2026-09-05';

export const currentUser = {
  name: 'Sravani Poluru',
  email: 'sravani.poluru@polurulabs.example',
  role: 'People operations lead',
};

export const nextHoliday = {
  name: 'Labor Day',
  date: '2026-09-07',
  label: 'Next holiday · Labor Day',
};

export const workspace = {
  name: workspaceName,
  period: 'Sep 2026 · week 36',
  timezone: 'America / Austin',
  close: 'Office closed Mon 7 Sep',
};

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'People', href: '#/people', icon: 'user' },
  { label: 'Org', href: '#/org', icon: 'folder' },
  { label: 'Leave', href: '#/leave', icon: 'calendar' },
  { label: 'Hiring', href: '#/hiring', icon: 'briefcase' },
  { label: 'Learning', href: '#/learning', icon: 'book' },
  { label: 'Search', href: '#/search', icon: 'search' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const people = [
  { id: 'p-sravani', name: 'Sravani Poluru', email: 'sravani.poluru@polurulabs.example', title: 'People operations lead', department: 'People', location: 'Austin', manager: '', status: 'active', employmentType: 'Full-time', startDate: '2023-01-16', ptoBalance: 18, learningHours: 24, pronouns: 'she/her' },
  { id: 'p-ananya', name: 'Ananya Poluru', email: 'ananya.poluru@polurulabs.example', title: 'People partner', department: 'People', location: 'Austin', manager: 'Sravani Poluru', status: 'active', employmentType: 'Full-time', startDate: '2024-04-08', ptoBalance: 12, learningHours: 16, pronouns: 'she/her' },
  { id: 'p-vikram', name: 'Vikram Poluru', email: 'vikram.poluru@polurulabs.example', title: 'People ops specialist', department: 'People', location: 'Chicago', manager: 'Sravani Poluru', status: 'on_leave', employmentType: 'Full-time', startDate: '2025-02-03', ptoBalance: 6, learningHours: 8, pronouns: 'he/him' },
  { id: 'p-kavya', name: 'Kavya Poluru', email: 'kavya.poluru@polurulabs.example', title: 'Staff engineer', department: 'Engineering', location: 'Austin', manager: 'Rohan Poluru', status: 'on_leave', employmentType: 'Full-time', startDate: '2022-09-12', ptoBalance: 9, learningHours: 22, pronouns: 'she/her' },
  { id: 'p-rohan', name: 'Rohan Poluru', email: 'rohan.poluru@polurulabs.example', title: 'Engineering manager', department: 'Engineering', location: 'Remote', manager: 'Madhav Poluru', status: 'on_leave', employmentType: 'Full-time', startDate: '2021-06-21', ptoBalance: 4, learningHours: 18, pronouns: 'he/him' },
  { id: 'p-kiran', name: 'Kiran Poluru', email: 'kiran.poluru@polurulabs.example', title: 'Frontend engineer', department: 'Engineering', location: 'Austin', manager: 'Rohan Poluru', status: 'active', employmentType: 'Full-time', startDate: '2025-08-11', ptoBalance: 14, learningHours: 11, pronouns: 'they/them' },
  { id: 'p-arjun', name: 'Arjun Poluru', email: 'arjun.poluru@polurulabs.example', title: 'Backend engineer', department: 'Engineering', location: 'Hyderabad', manager: 'Rohan Poluru', status: 'active', employmentType: 'Full-time', startDate: '2024-11-04', ptoBalance: 11, learningHours: 14, pronouns: 'he/him' },
  { id: 'p-madhav', name: 'Madhav Poluru', email: 'madhav.poluru@polurulabs.example', title: 'Product director', department: 'Product', location: 'Austin', manager: 'Sravani Poluru', status: 'active', employmentType: 'Full-time', startDate: '2020-03-02', ptoBalance: 21, learningHours: 9, pronouns: 'he/him' },
  { id: 'p-tanvi', name: 'Tanvi Poluru', email: 'tanvi.poluru@polurulabs.example', title: 'Product manager', department: 'Product', location: 'Chicago', manager: 'Madhav Poluru', status: 'on_leave', employmentType: 'Full-time', startDate: '2024-07-15', ptoBalance: 3, learningHours: 20, pronouns: 'she/her' },
  { id: 'p-harini', name: 'Harini Poluru', email: 'harini.poluru@polurulabs.example', title: 'Design lead', department: 'Design', location: 'Austin', manager: 'Madhav Poluru', status: 'on_leave', employmentType: 'Full-time', startDate: '2023-05-22', ptoBalance: 7, learningHours: 27, pronouns: 'she/her' },
  { id: 'p-priya', name: 'Priya Poluru', email: 'priya.poluru@polurulabs.example', title: 'Controller', department: 'Finance', location: 'Austin', manager: 'Sravani Poluru', status: 'active', employmentType: 'Full-time', startDate: '2022-01-10', ptoBalance: 16, learningHours: 6, pronouns: 'she/her' },
  { id: 'p-asha', name: 'Asha Poluru', email: 'asha.poluru@polurulabs.example', title: 'FP&A analyst', department: 'Finance', location: 'Remote', manager: 'Priya Poluru', status: 'active', employmentType: 'Full-time', startDate: '2025-10-06', ptoBalance: 10, learningHours: 13, pronouns: 'she/her' },
  { id: 'p-meera', name: 'Meera Poluru', email: 'meera.poluru@polurulabs.example', title: 'Account executive', department: 'Sales', location: 'Chicago', manager: 'Madhav Poluru', status: 'active', employmentType: 'Full-time', startDate: '2023-09-18', ptoBalance: 8, learningHours: 7, pronouns: 'she/her' },
  { id: 'p-nisha', name: 'Nisha Poluru', email: 'nisha.poluru@polurulabs.example', title: 'Brand manager', department: 'Marketing', location: 'Austin', manager: 'Madhav Poluru', status: 'on_leave', employmentType: 'Full-time', startDate: '2024-02-26', ptoBalance: 2, learningHours: 15, pronouns: 'she/her' },
  { id: 'p-divya', name: 'Divya Poluru', email: 'divya.poluru@polurulabs.example', title: 'Customer success manager', department: 'Customer Success', location: 'Remote', manager: 'Meera Poluru', status: 'active', employmentType: 'Full-time', startDate: '2025-03-17', ptoBalance: 13, learningHours: 19, pronouns: 'she/her' },
  { id: 'p-lakshmi', name: 'Lakshmi Poluru', email: 'lakshmi.poluru@polurulabs.example', title: 'General counsel', department: 'Legal', location: 'Austin', manager: 'Sravani Poluru', status: 'active', employmentType: 'Full-time', startDate: '2021-11-08', ptoBalance: 19, learningHours: 5, pronouns: 'she/her' },
  { id: 'p-ishaan', name: 'Ishaan Poluru', email: 'ishaan.poluru@polurulabs.example', title: 'Data scientist', department: 'Data', location: 'Austin', manager: 'Kavya Poluru', status: 'active', employmentType: 'Full-time', startDate: '2024-09-09', ptoBalance: 15, learningHours: 31, pronouns: 'he/him' },
  { id: 'p-neha', name: 'Neha Poluru', email: 'neha.poluru@polurulabs.example', title: 'L&D manager', department: 'Learning', location: 'Austin', manager: 'Sravani Poluru', status: 'active', employmentType: 'Full-time', startDate: '2023-08-14', ptoBalance: 17, learningHours: 42, pronouns: 'she/her' },
];

export const leave = [
  { id: 'lv-01', personId: 'p-kavya', personName: 'Kavya Poluru', type: 'PTO', start: '2026-09-01', end: '2026-09-05', days: 5, status: 'approved', note: 'Family travel · Austin' },
  { id: 'lv-02', personId: 'p-harini', personName: 'Harini Poluru', type: 'PTO', start: '2026-09-02', end: '2026-09-04', days: 3, status: 'approved', note: 'Design offsite recovery' },
  { id: 'lv-03', personId: 'p-rohan', personName: 'Rohan Poluru', type: 'Parental', start: '2026-08-25', end: '2026-09-12', days: 15, status: 'approved', note: 'Parental leave week 2' },
  { id: 'lv-04', personId: 'p-nisha', personName: 'Nisha Poluru', type: 'PTO', start: '2026-09-01', end: '2026-09-03', days: 3, status: 'approved', note: 'Brand shoot wrap' },
  { id: 'lv-05', personId: 'p-vikram', personName: 'Vikram Poluru', type: 'Sick', start: '2026-09-01', end: '2026-09-02', days: 2, status: 'approved', note: 'Short-term illness' },
  { id: 'lv-06', personId: 'p-tanvi', personName: 'Tanvi Poluru', type: 'PTO', start: '2026-08-31', end: '2026-09-04', days: 5, status: 'approved', note: 'Chicago long weekend' },
  { id: 'lv-07', personId: 'p-arjun', personName: 'Arjun Poluru', type: 'PTO', start: '2026-09-08', end: '2026-09-11', days: 4, status: 'pending', note: 'After Labor Day' },
  { id: 'lv-08', personId: 'p-divya', personName: 'Divya Poluru', type: 'PTO', start: '2026-09-14', end: '2026-09-16', days: 3, status: 'pending', note: 'Customer summit buffer' },
  { id: 'lv-09', personId: 'p-kiran', personName: 'Kiran Poluru', type: 'Unpaid', start: '2026-09-21', end: '2026-09-22', days: 2, status: 'pending', note: 'Personal appointment' },
  { id: 'lv-10', personId: 'p-ishaan', personName: 'Ishaan Poluru', type: 'PTO', start: '2026-08-18', end: '2026-08-20', days: 3, status: 'approved', note: 'Taken last month' },
];

export const reqs = [
  { id: 'req-people-partner', title: 'People partner', department: 'People', location: 'Austin', recruiter: 'Ananya Poluru', hiringManager: 'Sravani Poluru', status: 'open', openings: 1, posted: '2026-08-04', pipeline: { applied: 18, screen: 7, interview: 3, offer: 1, hired: 0 } },
  { id: 'req-staff-eng', title: 'Staff engineer', department: 'Engineering', location: 'Austin', recruiter: 'Ananya Poluru', hiringManager: 'Rohan Poluru', status: 'open', openings: 2, posted: '2026-07-14', pipeline: { applied: 41, screen: 12, interview: 5, offer: 0, hired: 0 } },
  { id: 'req-product-designer', title: 'Product designer', department: 'Design', location: 'Remote', recruiter: 'Vikram Poluru', hiringManager: 'Harini Poluru', status: 'open', openings: 1, posted: '2026-08-18', pipeline: { applied: 22, screen: 8, interview: 2, offer: 0, hired: 0 } },
  { id: 'req-ae', title: 'Account executive', department: 'Sales', location: 'Chicago', recruiter: 'Ananya Poluru', hiringManager: 'Meera Poluru', status: 'open', openings: 2, posted: '2026-06-30', pipeline: { applied: 33, screen: 9, interview: 4, offer: 1, hired: 0 } },
  { id: 'req-data-eng', title: 'Data engineer', department: 'Data', location: 'Hyderabad', recruiter: 'Vikram Poluru', hiringManager: 'Ishaan Poluru', status: 'open', openings: 1, posted: '2026-08-11', pipeline: { applied: 27, screen: 6, interview: 2, offer: 0, hired: 0 } },
  { id: 'req-recruiter', title: 'Technical recruiter', department: 'People', location: 'Austin', recruiter: 'Sravani Poluru', hiringManager: 'Sravani Poluru', status: 'open', openings: 1, posted: '2026-08-25', pipeline: { applied: 14, screen: 4, interview: 1, offer: 0, hired: 0 } },
];

export const courses = [
  { id: 'crs-inclusive', title: 'Inclusive interviewing', category: 'Hiring', hours: 3, enrolled: 42, due: '2026-09-30', status: 'enrolled', instructor: 'Sravani Poluru', summary: 'Structured loops, scorecards, and bias interrupts for every open req.' },
  { id: 'crs-manager', title: 'Manager 101', category: 'Leadership', hours: 6, enrolled: 18, due: '2026-10-15', status: 'enrolled', instructor: 'Madhav Poluru', summary: 'One-on-ones, feedback, and leveling conversations for new Alder leads.' },
  { id: 'crs-safety', title: 'Psychological safety', category: 'Culture', hours: 2, enrolled: 64, due: '2026-09-18', status: 'enrolled', instructor: 'Neha Poluru', summary: 'How teams raise risk early without waiting for a pulse survey.' },
  { id: 'crs-benefits', title: 'Benefits 2026', category: 'People ops', hours: 1.5, enrolled: 88, due: '2026-09-12', status: 'published', instructor: 'Ananya Poluru', summary: 'Open enrollment windows, parental leave, and the Labor Day office close.' },
  { id: 'crs-perf', title: 'Performance conversations', category: 'Leadership', hours: 4, enrolled: 21, due: '2026-11-01', status: 'enrolled', instructor: 'Sravani Poluru', summary: 'Calibration language, growth plans, and writing a fair review.' },
  { id: 'crs-ai-people', title: 'AI for people ops', category: 'Skills', hours: 2.5, enrolled: 29, due: '2026-10-08', status: 'published', instructor: 'Ishaan Poluru', summary: 'Drafting job posts and leave notes with Alder internal copilots.' },
];

export const inboxItems = [
  { label: '3 leave requests waiting', description: 'Arjun, Divya, and Kiran need approval', icon: 'alert-triangle', href: '#/leave' },
  { label: 'People partner offer', description: 'Ananya Poluru · Austin req', icon: 'briefcase', href: '#/hiring' },
  { label: '6 on leave this week', description: 'Kavya, Harini, Rohan, and others', icon: 'calendar', href: '#/leave' },
  { label: 'Benefits 2026 due 12 Sep', description: 'Neha Poluru · 88 enrolled', icon: 'book', href: '#/learning' },
];

export const commandItems = [
  { label: 'Overview', description: 'Headcount and pulse', href: '#/overview', icon: 'home', group: 'Go to' },
  { label: 'People', description: 'Employee directory', href: '#/people', icon: 'user', group: 'Go to' },
  { label: 'Leave', description: 'PTO calendar', href: '#/leave', icon: 'calendar', group: 'Go to' },
  { label: 'Hiring', description: 'Open requisitions', href: '#/hiring', icon: 'briefcase', group: 'Go to' },
  { label: 'Learning', description: 'Courses and hours', href: '#/learning', icon: 'book', group: 'Go to' },
  { label: 'Org', description: 'Teams and reporting', href: '#/org', icon: 'folder', group: 'Go to' },
  { label: 'Settings', description: 'Workspace defaults', href: '#/settings', icon: 'settings', group: 'Go to' },
  { label: 'Add employee', description: 'Open the hire modal', href: '#add-employee', icon: 'plus', group: 'Actions' },
  { label: 'Review leave', description: 'Pending PTO this week', href: '#/leave', icon: 'calendar', group: 'Actions' },
];

export const departmentOptions = [
  { label: 'People', value: 'People' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Product', value: 'Product' },
  { label: 'Design', value: 'Design' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Customer Success', value: 'Customer Success' },
  { label: 'Legal', value: 'Legal' },
  { label: 'Data', value: 'Data' },
  { label: 'Learning', value: 'Learning' },
];

export const locationOptions = [
  { label: 'Austin', value: 'Austin' },
  { label: 'Chicago', value: 'Chicago' },
  { label: 'Hyderabad', value: 'Hyderabad' },
  { label: 'Remote', value: 'Remote' },
];

export const employmentOptions = [
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Contract', value: 'Contract' },
];

export function getPerson(id) {
  return people.find((item) => item.id === id) || null;
}

export function leaveForPerson(id) {
  return leave.filter((item) => item.personId === id);
}

export function onLeaveThisWeek() {
  return people.filter((person) =>
    leave.some(
      (item) =>
        item.personId === person.id &&
        item.status !== 'denied' &&
        rangeOverlaps(item.start, item.end, WEEK_START, WEEK_END),
    ),
  );
}

export function pendingLeave() {
  return leave.filter((item) => item.status === 'pending');
}

export function openReqs() {
  return reqs.filter((item) => item.status === 'open');
}

export function openRolesCount() {
  return reqs
    .filter((item) => item.status === 'open' || item.status === 'on_hold')
    .reduce((sum, item) => sum + Number(item.openings || 0), 0);
}

export function orgGroups() {
  const byDept = new Map();
  for (const person of people) {
    const key = person.department || 'Unassigned';
    if (!byDept.has(key)) byDept.set(key, []);
    byDept.get(key).push(person);
  }
  return [...byDept.entries()].map(([name, members]) => {
    const lead =
      members.find((item) => /lead|director|manager|counsel|controller/i.test(item.title)) ||
      members[0];
    return {
      id: slugify(name),
      name,
      lead: lead?.name || '',
      count: members.length,
      members,
    };
  });
}

export function overviewStats() {
  const onLeaveCount = onLeaveThisWeek().length;
  const trainingPct = Math.round(
    (people.reduce((sum, p) => sum + Number(p.learningHours || 0), 0) / (people.length * 20)) * 100,
  );
  const newHires = people.filter((p) => p.startDate >= '2026-08-01').length;
  return [
    { label: 'Headcount', value: String(people.length), hint: '+2 since Aug', trend: 'up', trendValue: '+2' },
    { label: 'Open reqs', value: String(openReqs().length), hint: `${openRolesCount()} roles`, trend: 'flat', trendValue: 'Steady' },
    { label: 'On leave', value: String(onLeaveCount), hint: 'This week', trend: 'flat', trendValue: 'Sep 1–5' },
    { label: 'Engagement', value: '8.4/10', hint: 'Pulse Aug 2026', trend: 'up', trendValue: '+0.3' },
    { label: 'Training', value: `${trainingPct}%`, hint: 'Avg hours vs target', trend: 'up', trendValue: '+6 pts' },
    { label: 'New hires', value: String(newHires), hint: 'Since Aug 2026', trend: 'up', trendValue: 'Kiran + Asha' },
    { label: 'Time-to-hire', value: '34 days', hint: 'Trailing 90 days', trend: 'down', trendValue: '−4 days' },
    { label: 'eNPS', value: '62', hint: 'Employee NPS', trend: 'up', trendValue: '+5' },
  ];
}

export function buildSearchCatalog() {
  const catalog = [];
  for (const person of people) {
    catalog.push({
      label: person.name,
      description: `${person.title} · ${person.department}`,
      owner: person.manager || '—',
      type: 'person',
      href: `#/person/${person.id}`,
    });
  }
  for (const req of reqs) {
    catalog.push({
      label: req.title,
      description: `${req.department} · ${req.location}`,
      owner: req.hiringManager,
      type: 'req',
      href: '#/hiring',
    });
  }
  for (const course of courses) {
    catalog.push({
      label: course.title,
      description: course.category,
      owner: course.instructor,
      type: 'course',
      href: '#/learning',
    });
  }
  for (const item of leave) {
    catalog.push({
      label: `${item.personName} · ${item.type}`,
      description: `${item.start} – ${item.end}`,
      owner: item.personName,
      type: 'leave',
      href: '#/leave',
    });
  }
  return catalog;
}

export function addEmployee(input) {
  const name = input.name?.trim();
  const email = input.email?.trim();
  if (!name || !email) return null;
  const record = {
    id: `p-${slugify(name) || Date.now()}`,
    name,
    email,
    title: input.title?.trim() || 'Teammate',
    department: input.department || 'People',
    location: input.location || 'Austin',
    manager: input.manager || currentUser.name,
    status: 'active',
    employmentType: input.employmentType || 'Full-time',
    startDate: input.startDate || '2026-09-01',
    ptoBalance: 15,
    learningHours: 0,
    pronouns: '',
  };
  people.unshift(record);
  return record;
}
