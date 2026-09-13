export const productName = 'Keystone';
export const productLine = 'Construction';
export const workspaceName = 'Poluru Builds';

export const currentUser = {
  name: 'Subbu Poluru',
  email: 'subbu.poluru@polurubuilds.example',
  role: 'Project director',
};

export const workspace = {
  name: workspaceName,
  period: 'Jobs · 12 Sep 2026',
  timezone: 'America / Chicago',
  yards: 'Austin · Dallas · Houston',
};

export const people = [
  { name: 'Subbu Poluru', role: 'Project director', squad: 'Jobs desk' },
  { name: 'Subra Poluru', role: 'Superintendent', squad: 'Field' },
  { name: 'Kavya Poluru', role: 'Project manager', squad: 'Jobs desk' },
  { name: 'Maya Poluru', role: 'Estimator', squad: 'Precon' },
  { name: 'Arjun Poluru', role: 'Controller', squad: 'Finance' },
  { name: 'Leela Poluru', role: 'Scheduler', squad: 'Planning' },
  { name: 'Nikhil Poluru', role: 'Safety lead', squad: 'EHS' },
  { name: 'Rohan Poluru', role: 'Site engineer', squad: 'Field' },
  { name: 'Priya Poluru', role: 'Contracts', squad: 'Buyout' },
  { name: 'Ishaan Poluru', role: 'RFI coordinator', squad: 'Jobs desk' },
  { name: 'Asha Poluru', role: 'QA/QC', squad: 'Field' },
  { name: 'Dev Poluru', role: 'MEP manager', squad: 'Field' },
];

export let sites = [
  { id: 'ks-harbor', code: 'KS-104', name: 'Harborwell Clinic', city: 'Austin', phase: 'fit_out', status: 'on_track', pm: 'Kavya Poluru', super: 'Subra Poluru', budget: 18200000, spent: 12400000, complete: 68, finish: '2026-12-18' },
  { id: 'ks-alder', code: 'KS-218', name: 'Alder Hall addition', city: 'Dallas', phase: 'structure', status: 'watch', pm: 'Kavya Poluru', super: 'Rohan Poluru', budget: 24600000, spent: 9800000, complete: 41, finish: '2027-04-02' },
  { id: 'ks-quill', code: 'KS-331', name: 'Quill Campus studio', city: 'Austin', phase: 'mobilize', status: 'on_track', pm: 'Maya Poluru', super: 'Subra Poluru', budget: 9400000, spent: 1200000, complete: 12, finish: '2027-06-15' },
  { id: 'ks-cedar', code: 'KS-412', name: 'Cedar Yard warehouse', city: 'Houston', phase: 'structure', status: 'at_risk', pm: 'Dev Poluru', super: 'Rohan Poluru', budget: 15800000, spent: 9100000, complete: 54, finish: '2026-11-20' },
  { id: 'ks-lotline', code: 'KS-509', name: 'Lotline offices', city: 'Austin', phase: 'punch', status: 'on_track', pm: 'Kavya Poluru', super: 'Asha Poluru', budget: 7200000, spent: 6900000, complete: 94, finish: '2026-09-30' },
  { id: 'ks-stride', code: 'KS-627', name: 'Stride gym', city: 'Dallas', phase: 'fit_out', status: 'on_track', pm: 'Maya Poluru', super: 'Subra Poluru', budget: 6100000, spent: 3800000, complete: 62, finish: '2026-10-28' },
  { id: 'ks-flare', code: 'KS-740', name: 'Flare hotel wing', city: 'Galveston', phase: 'structure', status: 'watch', pm: 'Dev Poluru', super: 'Rohan Poluru', budget: 31200000, spent: 14100000, complete: 38, finish: '2027-08-06' },
  { id: 'ks-nimbus', code: 'KS-851', name: 'Nimbus DC', city: 'Round Rock', phase: 'mobilize', status: 'on_track', pm: 'Kavya Poluru', super: 'Subra Poluru', budget: 41000000, spent: 4200000, complete: 9, finish: '2027-11-12' },
];

export const budgets = [
  { id: 'bd-harbor', site: 'Harborwell Clinic', code: 'KS-104', original: 17600000, approved: 18200000, spent: 12400000, remaining: 5800000, owner: 'Arjun Poluru', status: 'on_track' },
  { id: 'bd-alder', site: 'Alder Hall addition', code: 'KS-218', original: 22800000, approved: 24600000, spent: 9800000, remaining: 14800000, owner: 'Arjun Poluru', status: 'watch' },
  { id: 'bd-quill', site: 'Quill Campus studio', code: 'KS-331', original: 9100000, approved: 9400000, spent: 1200000, remaining: 8200000, owner: 'Maya Poluru', status: 'on_track' },
  { id: 'bd-cedar', site: 'Cedar Yard warehouse', code: 'KS-412', original: 14200000, approved: 15800000, spent: 9100000, remaining: 6700000, owner: 'Arjun Poluru', status: 'at_risk' },
  { id: 'bd-lotline', site: 'Lotline offices', code: 'KS-509', original: 6800000, approved: 7200000, spent: 6900000, remaining: 300000, owner: 'Priya Poluru', status: 'watch' },
  { id: 'bd-stride', site: 'Stride gym', code: 'KS-627', original: 5900000, approved: 6100000, spent: 3800000, remaining: 2300000, owner: 'Maya Poluru', status: 'on_track' },
  { id: 'bd-flare', site: 'Flare hotel wing', code: 'KS-740', original: 28800000, approved: 31200000, spent: 14100000, remaining: 17100000, owner: 'Arjun Poluru', status: 'watch' },
  { id: 'bd-nimbus', site: 'Nimbus DC', code: 'KS-851', original: 39000000, approved: 41000000, spent: 4200000, remaining: 36800000, owner: 'Priya Poluru', status: 'on_track' },
];

export const spendTrend = [8.2, 9.1, 10.4, 12.0, 14.6, 18.1, 22.4, 27.8, 33.1, 38.4, 44.2, 51.6];

export const schedule = [
  { id: 'sc-1', site: 'Harborwell Clinic', activity: 'Nurse-station millwork', start: '2026-09-15', finish: '2026-10-03', owner: 'Subra Poluru', status: 'on_track' },
  { id: 'sc-2', site: 'Alder Hall addition', activity: 'Level 3 deck pour', start: '2026-09-18', finish: '2026-09-22', owner: 'Rohan Poluru', status: 'watch' },
  { id: 'sc-3', site: 'Cedar Yard warehouse', activity: 'Tilt-wall panels', start: '2026-09-12', finish: '2026-09-26', owner: 'Rohan Poluru', status: 'at_risk' },
  { id: 'sc-4', site: 'Lotline offices', activity: 'Punch walk with owner', start: '2026-09-22', finish: '2026-09-24', owner: 'Asha Poluru', status: 'on_track' },
  { id: 'sc-5', site: 'Stride gym', activity: 'Rubber flooring', start: '2026-09-20', finish: '2026-10-02', owner: 'Subra Poluru', status: 'on_track' },
  { id: 'sc-6', site: 'Flare hotel wing', activity: 'Podium steel', start: '2026-09-14', finish: '2026-10-09', owner: 'Dev Poluru', status: 'watch' },
  { id: 'sc-7', site: 'Quill Campus studio', activity: 'Site fence and trailer', start: '2026-09-16', finish: '2026-09-19', owner: 'Leela Poluru', status: 'on_track' },
  { id: 'sc-8', site: 'Nimbus DC', activity: 'Mass excavation', start: '2026-09-28', finish: '2026-10-30', owner: 'Leela Poluru', status: 'scheduled' },
];

export const rfis = [
  { id: 'rfi-441', number: 'RFI-441', site: 'Cedar Yard warehouse', title: 'Door hardware at dock 4', author: 'Rohan Poluru', to: 'Asha Poluru', due: '2026-09-14', status: 'open' },
  { id: 'rfi-438', number: 'RFI-438', site: 'Alder Hall addition', title: 'Rebar at grid C/4', author: 'Rohan Poluru', to: 'Dev Poluru', due: '2026-09-16', status: 'open' },
  { id: 'rfi-436', number: 'RFI-436', site: 'Harborwell Clinic', title: 'Nurse call raceway', author: 'Subra Poluru', to: 'Ishaan Poluru', due: '2026-09-18', status: 'answered' },
  { id: 'rfi-429', number: 'RFI-429', site: 'Flare hotel wing', title: 'Podium pour sequence', author: 'Dev Poluru', to: 'Leela Poluru', due: '2026-09-12', status: 'overdue' },
  { id: 'rfi-421', number: 'RFI-421', site: 'Stride gym', title: 'HVAC diffuser layout', author: 'Subra Poluru', to: 'Dev Poluru', due: '2026-09-20', status: 'open' },
  { id: 'rfi-418', number: 'RFI-418', site: 'Lotline offices', title: 'Lobby stone sample', author: 'Asha Poluru', to: 'Kavya Poluru', due: '2026-09-10', status: 'closed' },
  { id: 'rfi-410', number: 'RFI-410', site: 'Quill Campus studio', title: 'Utility pole relocation', author: 'Maya Poluru', to: 'Priya Poluru', due: '2026-09-22', status: 'open' },
  { id: 'rfi-404', number: 'RFI-404', site: 'Nimbus DC', title: 'Soil report addendum', author: 'Leela Poluru', to: 'Ishaan Poluru', due: '2026-09-25', status: 'draft' },
];

export const subcontractors = [
  { id: 'sub-cedar', name: 'Cedar & Bolt', trade: 'Structural steel', site: 'Flare hotel wing', contact: 'Priya Poluru', score: 91, status: 'active' },
  { id: 'sub-northline', name: 'Northline Electric', trade: 'Electrical', site: 'Harborwell Clinic', contact: 'Dev Poluru', score: 88, status: 'active' },
  { id: 'sub-folio', name: 'Folio Mechanical', trade: 'HVAC', site: 'Stride gym', contact: 'Dev Poluru', score: 84, status: 'active' },
  { id: 'sub-alder', name: 'Alder Concrete', trade: 'Foundations', site: 'Alder Hall addition', contact: 'Rohan Poluru', score: 79, status: 'watch' },
  { id: 'sub-quill', name: 'Quill Interiors', trade: 'Millwork', site: 'Lotline offices', contact: 'Asha Poluru', score: 93, status: 'punch' },
  { id: 'sub-tide', name: 'Tide Waterproofing', trade: 'Envelope', site: 'Cedar Yard warehouse', contact: 'Subra Poluru', score: 72, status: 'watch' },
  { id: 'sub-nimbus', name: 'Nimbus Low Voltage', trade: 'IT / AV', site: 'Nimbus DC', contact: 'Kavya Poluru', score: 86, status: 'mobilizing' },
  { id: 'sub-harbor', name: 'Harborwell Glass', trade: 'Curtain wall', site: 'Harborwell Clinic', contact: 'Subra Poluru', score: 90, status: 'active' },
];

export const safetyReports = [
  { id: 'sf-881', site: 'Cedar Yard warehouse', type: 'Near miss', reporter: 'Nikhil Poluru', date: '2026-09-11', status: 'open', notes: 'Tilt-panel tag line slipped. Crew stood down.' },
  { id: 'sf-874', site: 'Alder Hall addition', type: 'Inspection', reporter: 'Nikhil Poluru', date: '2026-09-10', status: 'watch', notes: 'Guardrail gap on level 2. Rohan Poluru to close today.' },
  { id: 'sf-868', site: 'Harborwell Clinic', type: 'Toolbox', reporter: 'Subra Poluru', date: '2026-09-12', status: 'closed', notes: 'Hot-work permits reviewed. No findings.' },
  { id: 'sf-861', site: 'Flare hotel wing', type: 'Incident', reporter: 'Nikhil Poluru', date: '2026-09-08', status: 'open', notes: 'Sprain on podium steel. First aid only.' },
  { id: 'sf-852', site: 'Stride gym', type: 'Inspection', reporter: 'Asha Poluru', date: '2026-09-09', status: 'closed', notes: 'Housekeeping pass. Dumpster pulled.' },
  { id: 'sf-844', site: 'Lotline offices', type: 'Toolbox', reporter: 'Asha Poluru', date: '2026-09-12', status: 'closed', notes: 'Punch-walk PPE. Owner on site Thursday.' },
  { id: 'sf-830', site: 'Quill Campus studio', type: 'Inspection', reporter: 'Nikhil Poluru', date: '2026-09-11', status: 'closed', notes: 'Fence and trailer set. Temp power pending.' },
  { id: 'sf-821', site: 'Nimbus DC', type: 'Plan', reporter: 'Nikhil Poluru', date: '2026-09-07', status: 'scheduled', notes: 'Excavation plan due before mass dig.' },
];

export const buildStages = [
  { id: 'mobilize', label: 'Mobilize', count: 2, href: '#/sites' },
  { id: 'structure', label: 'Structure', count: 3, href: '#/schedule', hot: true },
  { id: 'fit_out', label: 'Fit-out', count: 2, href: '#/sites' },
  { id: 'punch', label: 'Punch', count: 1, href: '#/sites' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Job sites', href: '#/sites', icon: 'folder' },
  { label: 'Budgets', href: '#/budgets', icon: 'star' },
  { label: 'Schedule', href: '#/schedule', icon: 'clock' },
  { label: 'RFIs', href: '#/rfis', icon: 'file' },
  { label: 'Subcontractors', href: '#/subcontractors', icon: 'user' },
  { label: 'Safety', href: '#/safety', icon: 'check' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'RFI-429 overdue on Flare wing', description: 'Dev Poluru · podium pour', icon: 'alert-triangle', href: '#/rfis' },
  { label: 'Cedar tilt-wall still at risk', description: 'Subra Poluru · KS-412', icon: 'clock', href: '#/site/ks-cedar' },
  { label: 'Near miss logged at Cedar Yard', description: 'Nikhil Poluru · safety', icon: 'check', href: '#/safety' },
  { label: 'Lotline punch walk Thursday', description: 'Asha Poluru · owner on site', icon: 'star', href: '#/schedule' },
];

export const commandItems = [
  { label: 'Overview', description: 'Jobs pulse', href: '#/overview', icon: 'home' },
  { label: 'Log RFI', description: 'Open a question', href: '#log-rfi', icon: 'plus' },
  { label: 'Job sites', description: 'Active work', href: '#/sites', icon: 'folder' },
  { label: 'Budgets', description: 'Arjun Poluru’s book', href: '#/budgets', icon: 'star' },
  { label: 'Schedule', description: 'Leela Poluru’s calendar', href: '#/schedule', icon: 'clock' },
  { label: 'RFIs', description: 'Ishaan Poluru’s queue', href: '#/rfis', icon: 'file' },
  { label: 'Subcontractors', description: 'Trades and scores', href: '#/subcontractors', icon: 'user' },
  { label: 'Safety', description: 'Nikhil Poluru’s reports', href: '#/safety', icon: 'check' },
  { label: 'Settings', description: 'Jobs desk defaults', href: '#/settings', icon: 'settings' },
];

export const tradeOptions = [
  { label: 'Structural steel', value: 'Structural steel' },
  { label: 'Electrical', value: 'Electrical' },
  { label: 'HVAC', value: 'HVAC' },
  { label: 'Foundations', value: 'Foundations' },
  { label: 'Millwork', value: 'Millwork' },
  { label: 'Envelope', value: 'Envelope' },
];

export function overviewStats() {
  const openRfis = rfis.filter((item) => ['open', 'overdue'].includes(item.status)).length;
  const openSafety = safetyReports.filter((item) => ['open', 'watch'].includes(item.status)).length;
  const spent = budgets.reduce((sum, item) => sum + item.spent, 0);
  return [
    { label: 'Active sites', value: String(sites.length), hint: 'Austin, Dallas, Houston, coast', trend: 'flat', trendValue: 'Book' },
    { label: 'Spent YTD', value: `$${(spent / 1_000_000).toFixed(1)}M`, hint: 'Against $153.7M approved', trend: 'up', trendValue: '+8%' },
    { label: 'Open RFIs', value: String(openRfis), hint: 'Ishaan Poluru’s queue', trend: 'down', trendValue: '1 late' },
    { label: 'Safety open', value: String(openSafety), hint: 'Nikhil Poluru · EHS', trend: 'flat', trendValue: 'Today' },
  ];
}

export function addRfi({ title, site, author, due }) {
  const number = `RFI-${400 + rfis.length + 1}`;
  const record = {
    id: `rfi-${number.toLowerCase()}`,
    number,
    site,
    title,
    author,
    to: 'Ishaan Poluru',
    due: due || '2026-09-20',
    status: 'open',
  };
  rfis.unshift(record);
  return record;
}

export function buildSearchCatalog() {
  const siteHits = sites.map((item) => ({
    label: item.name,
    description: `${item.code} · ${item.city} · ${item.pm}`,
    owner: item.pm,
    type: 'Site',
    href: `#/site/${item.id}`,
  }));
  const rfiHits = rfis.map((item) => ({
    label: `${item.number} ${item.title}`,
    description: `${item.site} · ${item.status}`,
    owner: item.author,
    type: 'RFI',
    href: '#/rfis',
  }));
  const subHits = subcontractors.map((item) => ({
    label: item.name,
    description: `${item.trade} · ${item.site}`,
    owner: item.contact,
    type: 'Subcontractor',
    href: '#/subcontractors',
  }));
  const safetyHits = safetyReports.map((item) => ({
    label: `${item.type} · ${item.site}`,
    description: `${item.reporter} · ${item.status}`,
    owner: item.reporter,
    type: 'Safety',
    href: '#/safety',
  }));
  return [
    ...siteHits,
    ...rfiHits,
    ...subHits,
    ...safetyHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
