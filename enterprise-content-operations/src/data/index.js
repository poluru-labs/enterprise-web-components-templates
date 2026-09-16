export const productName = 'Loom';
export const productLine = 'Content';
export const workspaceName = 'Fieldline Press';

export const currentUser = {
  name: 'Meera Poluru',
  email: 'meera.poluru@fieldline.example',
  role: 'Managing editor',
};

export const workspace = {
  name: workspaceName,
  period: 'Week of 15 Sep 2026',
  timezone: 'America / Chicago',
  desks: 'News · Features · Photo · Locales',
};

export const people = [
  { name: 'Meera Poluru', role: 'Managing editor', desk: 'Desk' },
  { name: 'Kavya Poluru', role: 'Copy chief', desk: 'Copy' },
  { name: 'Arjun Poluru', role: 'News editor', desk: 'News' },
  { name: 'Leela Poluru', role: 'Features editor', desk: 'Features' },
  { name: 'Asha Poluru', role: 'Approvals', desk: 'Desk' },
  { name: 'Nikhil Poluru', role: 'Locales lead', desk: 'Locales' },
  { name: 'Priya Poluru', role: 'Photo editor', desk: 'Photo' },
  { name: 'Rohan Poluru', role: 'Production', desk: 'Schedule' },
  { name: 'Dev Poluru', role: 'Scheduler', desk: 'Schedule' },
  { name: 'Ishaan Poluru', role: 'Assets', desk: 'Library' },
  { name: 'Maya Poluru', role: 'Legal', desk: 'Legal' },
  { name: 'Anika Poluru', role: 'Reporter', desk: 'News' },
  { name: 'Mira Poluru', role: 'Reporter', desk: 'Features' },
  { name: 'Subra Poluru', role: 'Design', desk: 'Photo' },
];

export let pieces = [
  { id: 'lm-harbor', code: 'LM-104', title: 'Harborwell water story', desk: 'features', stage: 'copy', status: 'copy', owner: 'Kavya Poluru', author: 'Mira Poluru', ship: '2026-09-17', locale: 'EN', words: 1840 },
  { id: 'lm-alder', code: 'LM-218', title: 'Alder Hall profile', desk: 'features', stage: 'draft', status: 'draft', owner: 'Leela Poluru', author: 'Leela Poluru', ship: '2026-09-19', locale: 'EN', words: 2460 },
  { id: 'lm-quill', code: 'LM-331', title: 'Quill studio fire', desk: 'news', stage: 'approve', status: 'in_review', owner: 'Asha Poluru', author: 'Arjun Poluru', ship: '2026-09-16', locale: 'EN', words: 920 },
  { id: 'lm-cedar', code: 'LM-412', title: 'Cedar Yard cargo', desk: 'news', stage: 'approve', status: 'approved', owner: 'Arjun Poluru', author: 'Anika Poluru', ship: '2026-09-16', locale: 'EN', words: 740 },
  { id: 'lm-lotline', code: 'LM-509', title: 'Lotline partners', desk: 'features', stage: 'ship', status: 'scheduled', owner: 'Dev Poluru', author: 'Mira Poluru', ship: '2026-09-18', locale: 'EN', words: 1620 },
  { id: 'lm-stride', code: 'LM-627', title: 'Stride windshield recall', desk: 'news', stage: 'ship', status: 'published', owner: 'Rohan Poluru', author: 'Arjun Poluru', ship: '2026-09-15', locale: 'EN', words: 610 },
  { id: 'lm-flare', code: 'LM-740', title: 'Flare waterfront', desk: 'features', stage: 'copy', status: 'translation', owner: 'Nikhil Poluru', author: 'Leela Poluru', ship: '2026-09-20', locale: 'ES', words: 1980 },
  { id: 'lm-nimbus', code: 'LM-851', title: 'Nimbus ransomware', desk: 'news', stage: 'draft', status: 'hold', owner: 'Maya Poluru', author: 'Kavya Poluru', ship: '2026-09-21', locale: 'EN', words: 1280 },
];

export const weekSlots = [
  { id: 'slot-mon', day: 'Mon 14', date: '2026-09-14', slot: '06:00', piece: 'Stride windshield recall', owner: 'Rohan Poluru', status: 'published' },
  { id: 'slot-tue-a', day: 'Tue 15', date: '2026-09-15', slot: '06:00', piece: 'Stride follow-up brief', owner: 'Arjun Poluru', status: 'published' },
  { id: 'slot-tue-b', day: 'Tue 15', date: '2026-09-15', slot: '12:00', piece: 'Desk notes', owner: 'Meera Poluru', status: 'published' },
  { id: 'slot-wed-a', day: 'Wed 16', date: '2026-09-16', slot: '06:00', piece: 'Quill studio fire', owner: 'Asha Poluru', status: 'in_review' },
  { id: 'slot-wed-b', day: 'Wed 16', date: '2026-09-16', slot: '16:00', piece: 'Cedar Yard cargo', owner: 'Arjun Poluru', status: 'approved' },
  { id: 'slot-thu', day: 'Thu 17', date: '2026-09-17', slot: '06:00', piece: 'Harborwell water story', owner: 'Kavya Poluru', status: 'copy' },
  { id: 'slot-fri', day: 'Fri 18', date: '2026-09-18', slot: '06:00', piece: 'Lotline partners', owner: 'Dev Poluru', status: 'scheduled' },
  { id: 'slot-sat', day: 'Sat 19', date: '2026-09-19', slot: '09:00', piece: 'Alder Hall profile', owner: 'Leela Poluru', status: 'draft' },
];

export const approvals = [
  { id: 'ap-331', piece: 'LM-331', title: 'Quill studio fire', requester: 'Arjun Poluru', reviewer: 'Asha Poluru', date: '2026-09-15', status: 'in_review', desk: 'News' },
  { id: 'ap-412', piece: 'LM-412', title: 'Cedar Yard cargo', requester: 'Anika Poluru', reviewer: 'Asha Poluru', date: '2026-09-15', status: 'approved', desk: 'News' },
  { id: 'ap-104', piece: 'LM-104', title: 'Harborwell water story', requester: 'Kavya Poluru', reviewer: 'Meera Poluru', date: '2026-09-16', status: 'copy', desk: 'Features' },
  { id: 'ap-509', piece: 'LM-509', title: 'Lotline partners', requester: 'Mira Poluru', reviewer: 'Maya Poluru', date: '2026-09-14', status: 'scheduled', desk: 'Legal' },
  { id: 'ap-851', piece: 'LM-851', title: 'Nimbus ransomware', requester: 'Kavya Poluru', reviewer: 'Maya Poluru', date: '2026-09-15', status: 'hold', desk: 'Legal' },
  { id: 'ap-740', piece: 'LM-740', title: 'Flare waterfront', requester: 'Leela Poluru', reviewer: 'Nikhil Poluru', date: '2026-09-16', status: 'translation', desk: 'Locales' },
  { id: 'ap-218', piece: 'LM-218', title: 'Alder Hall profile', requester: 'Leela Poluru', reviewer: 'Meera Poluru', date: '2026-09-17', status: 'draft', desk: 'Features' },
  { id: 'ap-627', piece: 'LM-627', title: 'Stride windshield recall', requester: 'Arjun Poluru', reviewer: 'Asha Poluru', date: '2026-09-14', status: 'published', desk: 'News' },
];

export const locales = [
  { id: 'loc-en', code: 'EN', name: 'English', piece: 'Harborwell water story', owner: 'Kavya Poluru', coverage: 100, status: 'ready' },
  { id: 'loc-es', code: 'ES', name: 'Spanish', piece: 'Flare waterfront', owner: 'Nikhil Poluru', coverage: 62, status: 'translation' },
  { id: 'loc-fr', code: 'FR', name: 'French', piece: 'Lotline partners', owner: 'Nikhil Poluru', coverage: 40, status: 'draft' },
  { id: 'loc-de', code: 'DE', name: 'German', piece: 'Cedar Yard cargo', owner: 'Anika Poluru', coverage: 88, status: 'copy' },
  { id: 'loc-pt', code: 'PT', name: 'Portuguese', piece: 'Quill studio fire', owner: 'Mira Poluru', coverage: 24, status: 'hold' },
  { id: 'loc-ja', code: 'JA', name: 'Japanese', piece: 'Stride windshield recall', owner: 'Subra Poluru', coverage: 100, status: 'published' },
  { id: 'loc-it', code: 'IT', name: 'Italian', piece: 'Alder Hall profile', owner: 'Leela Poluru', coverage: 12, status: 'draft' },
  { id: 'loc-nl', code: 'NL', name: 'Dutch', piece: 'Nimbus ransomware', owner: 'Maya Poluru', coverage: 0, status: 'hold' },
];

export const schedule = [
  { id: 'sch-627', piece: 'LM-627', title: 'Stride windshield recall', slot: '2026-09-15 06:00', channel: 'Home', owner: 'Rohan Poluru', status: 'published' },
  { id: 'sch-331', piece: 'LM-331', title: 'Quill studio fire', slot: '2026-09-16 06:00', channel: 'Home', owner: 'Dev Poluru', status: 'in_review' },
  { id: 'sch-412', piece: 'LM-412', title: 'Cedar Yard cargo', slot: '2026-09-16 16:00', channel: 'News', owner: 'Rohan Poluru', status: 'approved' },
  { id: 'sch-104', piece: 'LM-104', title: 'Harborwell water story', slot: '2026-09-17 06:00', channel: 'Features', owner: 'Dev Poluru', status: 'copy' },
  { id: 'sch-509', piece: 'LM-509', title: 'Lotline partners', slot: '2026-09-18 06:00', channel: 'Home', owner: 'Rohan Poluru', status: 'scheduled' },
  { id: 'sch-218', piece: 'LM-218', title: 'Alder Hall profile', slot: '2026-09-19 09:00', channel: 'Weekend', owner: 'Dev Poluru', status: 'draft' },
  { id: 'sch-740', piece: 'LM-740', title: 'Flare waterfront', slot: '2026-09-20 08:00', channel: 'Features', owner: 'Nikhil Poluru', status: 'translation' },
  { id: 'sch-851', piece: 'LM-851', title: 'Nimbus ransomware', slot: '2026-09-21 06:00', channel: 'News', owner: 'Maya Poluru', status: 'hold' },
];

export const assets = [
  { id: 'as-harbor', name: 'Harborwell flood still', kind: 'photo', owner: 'Priya Poluru', used: 'LM-104', status: 'ready', size: '4.2 MB' },
  { id: 'as-alder', name: 'Alder Hall portrait', kind: 'photo', owner: 'Subra Poluru', used: 'LM-218', status: 'draft', size: '3.1 MB' },
  { id: 'as-quill', name: 'Quill studio exterior', kind: 'photo', owner: 'Priya Poluru', used: 'LM-331', status: 'in_review', size: '5.8 MB' },
  { id: 'as-cedar', name: 'Cedar Yard map', kind: 'illustration', owner: 'Subra Poluru', used: 'LM-412', status: 'approved', size: '1.4 MB' },
  { id: 'as-lotline', name: 'Lotline skyline', kind: 'photo', owner: 'Priya Poluru', used: 'LM-509', status: 'scheduled', size: '6.0 MB' },
  { id: 'as-stride', name: 'Stride glass close-up', kind: 'photo', owner: 'Ishaan Poluru', used: 'LM-627', status: 'published', size: '2.7 MB' },
  { id: 'as-flare', name: 'Flare waterfront reel', kind: 'video', owner: 'Ishaan Poluru', used: 'LM-740', status: 'translation', size: '84 MB' },
  { id: 'as-nimbus', name: 'Nimbus lock screen', kind: 'illustration', owner: 'Subra Poluru', used: 'LM-851', status: 'hold', size: '980 KB' },
];

export const shipTrend = [12, 14, 13, 16, 18, 17, 19, 21, 20, 22, 24, 26];

export const weekStages = [
  { id: 'draft', label: 'Draft', count: 2, href: '#/calendar' },
  { id: 'copy', label: 'Copy', count: 2, href: '#/calendar', hot: true },
  { id: 'approve', label: 'Approve', count: 2, href: '#/approvals' },
  { id: 'ship', label: 'Ship', count: 2, href: '#/schedule' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Calendar', href: '#/calendar', icon: 'calendar' },
  { label: 'Approvals', href: '#/approvals', icon: 'check' },
  { label: 'Locales', href: '#/locales', icon: 'copy' },
  { label: 'Schedule', href: '#/schedule', icon: 'clock' },
  { label: 'Assets', href: '#/assets', icon: 'folder' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const inboxItems = [
  { label: 'Quill still needs Asha Poluru', description: 'News · LM-331', icon: 'alert-triangle', href: '#/approvals' },
  { label: 'Flare ES pack is 62%', description: 'Nikhil Poluru · Locales', icon: 'clock', href: '#/locales' },
  { label: 'Stride shipped at 06:00', description: 'Rohan Poluru · Home', icon: 'check', href: '#/schedule' },
  { label: 'Harborwell art is ready', description: 'Priya Poluru · LM-104', icon: 'file', href: '#/piece/lm-harbor' },
];

export const commandItems = [
  { label: 'Overview', description: 'Desk pulse', href: '#/overview', icon: 'home' },
  { label: 'New piece', description: 'Open a draft', href: '#new-piece', icon: 'plus' },
  { label: 'Calendar', description: 'Leela Poluru’s week', href: '#/calendar', icon: 'calendar' },
  { label: 'Approvals', description: 'Asha Poluru’s queue', href: '#/approvals', icon: 'check' },
  { label: 'Locales', description: 'Nikhil Poluru’s packs', href: '#/locales', icon: 'copy' },
  { label: 'Schedule', description: 'Dev Poluru’s slots', href: '#/schedule', icon: 'clock' },
  { label: 'Assets', description: 'Ishaan Poluru’s library', href: '#/assets', icon: 'folder' },
  { label: 'Settings', description: 'Fieldline defaults', href: '#/settings', icon: 'settings' },
];

export const deskOptions = [
  { label: 'News', value: 'news' },
  { label: 'Features', value: 'features' },
  { label: 'Photo', value: 'photo' },
  { label: 'Locales', value: 'locales' },
];

export function overviewStats() {
  const open = pieces.filter((item) => !['published'].includes(item.status)).length;
  const due = pieces.filter((item) => item.ship <= '2026-09-18' && item.status !== 'published').length;
  const waiting = approvals.filter((item) => item.status === 'in_review').length;
  const flying = locales.filter((item) => ['translation', 'copy', 'draft'].includes(item.status)).length;
  return [
    { label: 'On the desk', value: String(open), hint: 'Not yet live', trend: 'flat', trendValue: 'Week' },
    { label: 'Due this week', value: String(due), hint: 'Thu Harborwell, Fri Lotline', trend: 'up', trendValue: '4' },
    { label: 'Awaiting Asha', value: String(waiting), hint: 'Quill studio fire', trend: 'up', trendValue: 'Hot' },
    { label: 'Locales in flight', value: String(flying), hint: 'Nikhil Poluru’s packs', trend: 'flat', trendValue: 'ES 62%' },
  ];
}

export function addPiece({ title, author, desk, owner }) {
  const number = 100 + pieces.length + 1;
  const record = {
    id: `lm-${number}`,
    code: `LM-${number}`,
    title,
    desk: desk || 'news',
    stage: 'draft',
    status: 'draft',
    owner: owner || 'Meera Poluru',
    author: author || currentUser.name,
    ship: '2026-09-22',
    locale: 'EN',
    words: 0,
  };
  pieces.unshift(record);
  return record;
}

export function buildSearchCatalog() {
  const pieceHits = pieces.map((item) => ({
    label: `${item.code} ${item.title}`,
    description: `${item.desk} · ${item.owner}`,
    owner: item.owner,
    type: 'Piece',
    href: `#/piece/${item.id}`,
  }));
  const localeHits = locales.map((item) => ({
    label: `${item.code} ${item.name}`,
    description: `${item.piece} · ${item.owner}`,
    owner: item.owner,
    type: 'Locale',
    href: '#/locales',
  }));
  const assetHits = assets.map((item) => ({
    label: item.name,
    description: `${item.kind} · ${item.owner}`,
    owner: item.owner,
    type: 'Asset',
    href: '#/assets',
  }));
  return [
    ...pieceHits,
    ...localeHits,
    ...assetHits,
    ...commandItems.map((item) => ({ ...item, type: 'Jump' })),
  ];
}
