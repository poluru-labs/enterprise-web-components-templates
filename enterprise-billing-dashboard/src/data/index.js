export const productName = 'Verdant';
export const productLine = 'Billing';

export const currentUser = {
  name: 'Priya Poluru',
  email: 'priya.poluru@northshore.example',
  role: 'Revenue operations lead',
};

export const company = {
  name: 'Northshore Cloud, Inc.',
  address: '410 Market Street, Suite 12, Austin, TX 78701',
  taxId: 'EIN 84-2291840',
  currency: 'USD',
  terms: 'Net 15',
};

export const ledgerMetrics = [
  { label: 'MRR', value: '$186.4K', hint: 'Recognized Sep 2026' },
  { label: 'Open AR', value: '$41.6K', hint: '14 open invoices' },
  { label: 'Dunning', value: '3', hint: 'Reminders in flight' },
];

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'house' },
  { label: 'Search', href: '#/search', icon: 'search' },
  { label: 'Invoices', href: '#/invoices', icon: 'file-earmark-text' },
  { label: 'Payments', href: '#/payments', icon: 'check-circle' },
  { label: 'Subscriptions', href: '#/subscriptions', icon: 'arrow-repeat' },
  { label: 'Customers', href: '#/customers', icon: 'people' },
  { label: 'Analytics', href: '#/analytics', icon: 'graph-up' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'gear' },
];

export const kpis = [
  { label: 'Total revenue', value: '$2.48M', hint: 'Trailing 12 months', trend: 'up', trendValue: '+12.4%' },
  { label: 'Monthly recurring', value: '$186.4K', hint: 'Recognized this period', trend: 'up', trendValue: '+6.1%' },
  { label: 'Annual recurring', value: '$2.24M', hint: 'Contracted ARR', trend: 'up', trendValue: '+9.8%' },
  { label: 'Outstanding', value: '$41.6K', hint: '14 open invoices', trend: 'down', trendValue: '-$6.2K' },
  { label: 'Collected', value: '$174.9K', hint: 'This month', trend: 'up', trendValue: '+8.3%' },
  { label: 'Failed payments', value: '$4.18K', hint: '7 retries in flight', trend: 'down', trendValue: '-11%' },
  { label: 'Active subscriptions', value: '318', hint: '20 on trial', trend: 'up', trendValue: '+14' },
  { label: 'Churn rate', value: '1.8%', hint: 'Logo churn, 30 days', trend: 'down', trendValue: '-0.3 pts' },
];

export const customers = [
  {
    id: 'cus_brightline',
    company: 'Brightline Labs',
    contact: 'Kavya Poluru',
    email: 'kavya@brightline.example',
    plan: 'Growth',
    ltv: '$48,200',
    invoices: 14,
    outstanding: '$0',
    status: 'Active',
    address: '88 Folsom St, San Francisco, CA 94105',
    method: 'Visa · 4242',
  },
  {
    id: 'cus_nimbus',
    company: 'Nimbus Retail',
    contact: 'Arjun Poluru',
    email: 'arjun@nimbus.example',
    plan: 'Scale',
    ltv: '$126,400',
    invoices: 22,
    outstanding: '$8,400',
    status: 'Past due',
    address: '200 West Lake, Chicago, IL 60601',
    method: 'ACH · Bank of the Lake',
  },
  {
    id: 'cus_harbor',
    company: 'Harbor & Co.',
    contact: 'Meera Poluru',
    email: 'billing@harborco.example',
    plan: 'Enterprise',
    ltv: '$312,000',
    invoices: 36,
    outstanding: '$0',
    status: 'Active',
    address: '1 Canada Square, London E14 5AB',
    method: 'Mastercard · 8891',
  },
  {
    id: 'cus_kite',
    company: 'Kite Studio',
    contact: 'Rohan Kapoor',
    email: 'rohan@kitestudio.example',
    plan: 'Starter',
    ltv: '$6,480',
    invoices: 8,
    outstanding: '$540',
    status: 'Trial',
    address: '14 Banjara Hills, Hyderabad 500034',
    method: 'Visa · 5512',
  },
  {
    id: 'cus_oak',
    company: 'Oak & Pine',
    contact: 'Sahana Rao',
    email: 'finance@oakpine.example',
    plan: 'Scale',
    ltv: '$91,750',
    invoices: 19,
    outstanding: '$0',
    status: 'Active',
    address: '500 Boren Ave, Seattle, WA 98109',
    method: 'ACH · First National',
  },
  {
    id: 'cus_lumen',
    company: 'Lumen Health',
    contact: 'Nikhil Poluru',
    email: 'ap@lumenhealth.example',
    plan: 'Enterprise',
    ltv: '$248,900',
    invoices: 28,
    outstanding: '$18,200',
    status: 'Past due',
    address: '77 Massachusetts Ave, Cambridge, MA 02139',
    method: 'Wire · pending',
  },
  {
    id: 'cus_paper',
    company: 'Paperplane',
    contact: 'Diya Shah',
    email: 'diya@paperplane.example',
    plan: 'Starter',
    ltv: '$3,120',
    invoices: 4,
    outstanding: '$0',
    status: 'Cancelled',
    address: '9 King St W, Toronto ON M5H 1A1',
    method: 'Visa · 0019',
  },
  {
    id: 'cus_field',
    company: 'Fieldwork Inc',
    contact: 'Tara Joshi',
    email: 'tara@fieldwork.example',
    plan: 'Growth',
    ltv: '$22,680',
    invoices: 11,
    outstanding: '$2,160',
    status: 'Active',
    address: '3300 N Central, Phoenix, AZ 85012',
    method: 'Amex · 3004',
  },
  {
    id: 'cus_cedar',
    company: 'Cedar Analytics',
    contact: 'Sravani Poluru',
    email: 'sravani@cedaranalytics.example',
    plan: 'Scale',
    ltv: '$64,300',
    invoices: 12,
    outstanding: '$0',
    status: 'Active',
    address: '1200 Peachtree St, Atlanta, GA 30309',
    method: 'Visa · 7788',
  },
  {
    id: 'cus_summit',
    company: 'Summit Forge',
    contact: 'Vikram Poluru',
    email: 'vikram@summitforge.example',
    plan: 'Growth',
    ltv: '$18,960',
    invoices: 6,
    outstanding: '$1,280',
    status: 'Active',
    address: '45 Fremont St, San Francisco, CA 94105',
    method: 'ACH · Summit Bank',
  },
];

export const invoices = [
  { id: 'INV-2841', customer: 'Harbor & Co.', customerId: 'cus_harbor', issued: '2026-08-01', due: '2026-08-15', amount: '$18,400', status: 'Paid', method: 'Mastercard · 8891' },
  { id: 'INV-2840', customer: 'Nimbus Retail', customerId: 'cus_nimbus', issued: '2026-08-01', due: '2026-08-15', amount: '$8,400', status: 'Overdue', method: 'ACH' },
  { id: 'INV-2839', customer: 'Lumen Health', customerId: 'cus_lumen', issued: '2026-07-28', due: '2026-08-12', amount: '$18,200', status: 'Overdue', method: 'Wire' },
  { id: 'INV-2838', customer: 'Brightline Labs', customerId: 'cus_brightline', issued: '2026-08-01', due: '2026-08-15', amount: '$2,400', status: 'Paid', method: 'Visa · 4242' },
  { id: 'INV-2837', customer: 'Oak & Pine', customerId: 'cus_oak', issued: '2026-08-01', due: '2026-08-15', amount: '$6,800', status: 'Paid', method: 'ACH' },
  { id: 'INV-2836', customer: 'Fieldwork Inc', customerId: 'cus_field', issued: '2026-08-04', due: '2026-08-19', amount: '$2,160', status: 'Pending', method: 'Amex · 3004' },
  { id: 'INV-2835', customer: 'Kite Studio', customerId: 'cus_kite', issued: '2026-08-06', due: '2026-08-21', amount: '$540', status: 'Pending', method: 'Visa · 5512' },
  { id: 'INV-2834', customer: 'Paperplane', customerId: 'cus_paper', issued: '2026-07-01', due: '2026-07-15', amount: '$390', status: 'Cancelled', method: 'Visa · 0019' },
  { id: 'INV-2833', customer: 'Harbor & Co.', customerId: 'cus_harbor', issued: '2026-07-01', due: '2026-07-15', amount: '$18,400', status: 'Paid', method: 'Mastercard · 8891' },
  { id: 'INV-2832', customer: 'Brightline Labs', customerId: 'cus_brightline', issued: '2026-08-12', due: '2026-08-27', amount: '$2,400', status: 'Draft', method: '—' },
  { id: 'INV-2842', customer: 'Cedar Analytics', customerId: 'cus_cedar', issued: '2026-08-18', due: '2026-09-02', amount: '$5,360', status: 'Paid', method: 'Visa · 7788' },
  { id: 'INV-2843', customer: 'Summit Forge', customerId: 'cus_summit', issued: '2026-08-22', due: '2026-09-06', amount: '$1,280', status: 'Pending', method: 'ACH' },
  { id: 'INV-2844', customer: 'Cedar Analytics', customerId: 'cus_cedar', issued: '2026-09-01', due: '2026-09-16', amount: '$5,360', status: 'Pending', method: 'Visa · 7788' },
  { id: 'INV-2845', customer: 'Nimbus Retail', customerId: 'cus_nimbus', issued: '2026-09-01', due: '2026-09-16', amount: '$8,400', status: 'Pending', method: 'ACH' },
];

export const invoiceColumns = [
  { key: 'id', label: 'Invoice', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'issued', label: 'Issued', sortable: true },
  { key: 'due', label: 'Due', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'method', label: 'Method', sortable: true },
];

export const invoiceLines = {
  'INV-2841': [
    { item: 'Enterprise platform · Aug 2026', qty: 1, rate: '$16,000', total: '$16,000' },
    { item: 'Priority support', qty: 1, rate: '$1,500', total: '$1,500' },
    { item: 'SSO add-on', qty: 1, rate: '$900', total: '$900' },
  ],
};

export const invoiceTimeline = [
  { title: 'Invoice issued', description: 'Sent to billing@harborco.example', timestamp: '1 Aug · 09:12', status: 'complete' },
  { title: 'Viewed by customer', description: 'Meera Poluru opened the hosted invoice', timestamp: '1 Aug · 11:40', status: 'complete' },
  { title: 'Payment captured', description: 'Mastercard · 8891 · AUTH 9F32', timestamp: '2 Aug · 08:04', status: 'complete' },
  { title: 'Receipt delivered', description: 'PDF stored in customer vault', timestamp: '2 Aug · 08:05', status: 'current' },
];

export const payments = [
  { id: 'pay_9f32', customer: 'Harbor & Co.', amount: '$18,400', method: 'Card', status: 'Collected', date: '2026-08-02', invoice: 'INV-2841' },
  { id: 'pay_8c11', customer: 'Brightline Labs', amount: '$2,400', method: 'Card', status: 'Collected', date: '2026-08-02', invoice: 'INV-2838' },
  { id: 'pay_7b20', customer: 'Oak & Pine', amount: '$6,800', method: 'ACH', status: 'Collected', date: '2026-08-03', invoice: 'INV-2837' },
  { id: 'pay_6a44', customer: 'Nimbus Retail', amount: '$8,400', method: 'ACH', status: 'Failed', date: '2026-08-15', invoice: 'INV-2840' },
  { id: 'pay_5d90', customer: 'Kite Studio', amount: '$120', method: 'Card', status: 'Refunded', date: '2026-08-08', invoice: 'INV-2820' },
  { id: 'pay_4e18', customer: 'Fieldwork Inc', amount: '$2,160', method: 'Card', status: 'Pending', date: '2026-08-19', invoice: 'INV-2836' },
  { id: 'pay_3c77', customer: 'Lumen Health', amount: '$18,200', method: 'Wire', status: 'Disputed', date: '2026-08-12', invoice: 'INV-2839' },
  { id: 'pay_2b01', customer: 'Harbor & Co.', amount: '$18,400', method: 'Card', status: 'Collected', date: '2026-07-02', invoice: 'INV-2833' },
  { id: 'pay_1a88', customer: 'Cedar Analytics', amount: '$5,360', method: 'Card', status: 'Collected', date: '2026-08-20', invoice: 'INV-2842' },
  { id: 'pay_0f55', customer: 'Summit Forge', amount: '$640', method: 'ACH', status: 'Collected', date: '2026-08-25', invoice: 'INV-2830' },
];

export const paymentColumns = [
  { key: 'id', label: 'Transaction', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'method', label: 'Method', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'invoice', label: 'Invoice', sortable: true },
];

export const paymentKpis = [
  { label: 'Collected', value: '$174.9K', hint: 'August to date', trend: 'up', trendValue: '+8.3%' },
  { label: 'Refunds', value: '$1.24K', hint: '3 credits issued', trend: 'flat', trendValue: 'Stable' },
  { label: 'Failed', value: '$4.18K', hint: 'Retry window 3 days', trend: 'down', trendValue: '-11%' },
  { label: 'Average ticket', value: '$2,860', hint: 'Successful charges', trend: 'up', trendValue: '+$90' },
];

export const subscriptions = [
  { id: 'sub_harbor', customer: 'Harbor & Co.', plan: 'Enterprise', cycle: 'Annual', renews: '2027-01-15', status: 'Active', mrr: '$18,400' },
  { id: 'sub_nimbus', customer: 'Nimbus Retail', plan: 'Scale', cycle: 'Monthly', renews: '2026-09-01', status: 'Past due', mrr: '$8,400' },
  { id: 'sub_bright', customer: 'Brightline Labs', plan: 'Growth', cycle: 'Monthly', renews: '2026-09-01', status: 'Active', mrr: '$2,400' },
  { id: 'sub_oak', customer: 'Oak & Pine', plan: 'Scale', cycle: 'Monthly', renews: '2026-09-04', status: 'Active', mrr: '$6,800' },
  { id: 'sub_lumen', customer: 'Lumen Health', plan: 'Enterprise', cycle: 'Annual', renews: '2026-11-12', status: 'Past due', mrr: '$18,200' },
  { id: 'sub_kite', customer: 'Kite Studio', plan: 'Starter', cycle: 'Monthly', renews: '2026-08-28', status: 'Trial', mrr: '$540' },
  { id: 'sub_field', customer: 'Fieldwork Inc', plan: 'Growth', cycle: 'Monthly', renews: '2026-09-06', status: 'Active', mrr: '$2,160' },
  { id: 'sub_paper', customer: 'Paperplane', plan: 'Starter', cycle: 'Monthly', renews: '—', status: 'Cancelled', mrr: '$0' },
  { id: 'sub_cedar', customer: 'Cedar Analytics', plan: 'Scale', cycle: 'Monthly', renews: '2026-09-18', status: 'Active', mrr: '$5,360' },
  { id: 'sub_summit', customer: 'Summit Forge', plan: 'Growth', cycle: 'Monthly', renews: '2026-09-22', status: 'Active', mrr: '$1,280' },
];

export const subscriptionColumns = [
  { key: 'id', label: 'Subscription', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'plan', label: 'Plan', sortable: true },
  { key: 'cycle', label: 'Cycle', sortable: true },
  { key: 'renews', label: 'Renews', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'mrr', label: 'MRR', sortable: true },
];

export const planCards = [
  { label: 'Starter', value: '68', hint: '$540 median · 8 trials', trend: 'up', trendValue: '+4' },
  { label: 'Growth', value: '132', hint: '$2,280 median', trend: 'up', trendValue: '+9' },
  { label: 'Scale', value: '83', hint: '$7,100 median', trend: 'flat', trendValue: '0' },
  { label: 'Enterprise', value: '39', hint: '$16.8k median', trend: 'up', trendValue: '+2' },
];

export const customerColumns = [
  { key: 'company', label: 'Company', sortable: true },
  { key: 'contact', label: 'Contact', sortable: true },
  { key: 'plan', label: 'Plan', sortable: true },
  { key: 'ltv', label: 'LTV', sortable: true },
  { key: 'invoices', label: 'Invoices', sortable: true },
  { key: 'outstanding', label: 'Outstanding', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const activity = [
  { title: 'INV-2841 collected', description: 'Harbor & Co. · Mastercard 8891', timestamp: '2 minutes ago', status: 'complete' },
  { title: 'ACH return on INV-2840', description: 'Nimbus Retail · R01 insufficient funds', timestamp: '1 hour ago', status: 'current' },
  { title: 'Trial started', description: 'Kite Studio · Starter, 14 days remaining', timestamp: 'Yesterday', status: 'complete' },
  { title: 'Dunning email queued', description: 'Lumen Health · reminder 2 of 3', timestamp: 'Yesterday', status: 'upcoming' },
  { title: 'INV-2842 collected', description: 'Cedar Analytics · Visa 7788', timestamp: '20 Aug', status: 'complete' },
];

export const collectionsWatch = [
  { title: 'Nimbus Retail', amount: '$8,400', hint: 'INV-2840 · ACH return R01', href: '#/invoice/INV-2840', tone: 'Overdue' },
  { title: 'Lumen Health', amount: '$18,200', hint: 'INV-2839 · originating bank review', href: '#/invoice/INV-2839', tone: 'Disputed' },
  { title: 'Kite Studio', amount: '$540', hint: 'Starter trial ends 28 Aug', href: '#/customer/cus_kite', tone: 'Trial' },
  { title: 'Fieldwork Inc', amount: '$2,160', hint: 'INV-2836 due 19 Aug', href: '#/invoice/INV-2836', tone: 'Pending' },
];

export const analyticsPulse = [
  { label: 'Net new MRR', value: '+$9.5K', hint: 'New + expansion − churn this month' },
  { label: 'Net revenue retain', value: '118%', hint: 'Trailing twelve months' },
  { label: 'Expansion', value: '+$12.6K', hint: 'Seat and plan upgrades' },
  { label: 'Refunds', value: '$1.24K', hint: 'Three credits issued in August' },
];

export const paymentExceptions = [
  { title: 'Dispute open', message: 'Lumen Health INV-2839 · $18,200 wire is in review with the originating bank.', variant: 'danger' },
  { title: 'ACH return', message: 'Nimbus Retail INV-2840 failed with R01. Next retry 26 Aug.', variant: 'warning' },
  { title: 'Retry window', message: 'Seven failed charges totaling $4.18K retry automatically over the next 72 hours.', variant: 'warning' },
  { title: 'Refund issued', message: 'Kite Studio $120 goodwill credit posted against INV-2820.', variant: 'neutral' },
];

export const upcomingRenewals = [
  { customer: 'Nimbus Retail', plan: 'Scale', renews: '1 Sep 2026', mrr: '$8,400' },
  { customer: 'Brightline Labs', plan: 'Growth', renews: '1 Sep 2026', mrr: '$2,400' },
  { customer: 'Oak & Pine', plan: 'Scale', renews: '4 Sep 2026', mrr: '$6,800' },
  { customer: 'Fieldwork Inc', plan: 'Growth', renews: '6 Sep 2026', mrr: '$2,160' },
];

export const reports = [
  { name: 'Invoice aging', description: 'Open AR by 0–30 / 31–60 / 61–90 / 90+', owner: 'Priya Poluru', updated: 'Today 07:10' },
  { name: 'Payment reconciliation', description: 'Gateway captures vs general ledger', owner: 'Arjun Poluru', updated: 'Today 06:40' },
  { name: 'Subscription retention', description: 'Cohort logos and NRR by plan', owner: 'Meera Poluru', updated: 'Yesterday' },
  { name: 'Tax summary', description: 'Sales tax and VAT collected by region', owner: 'Sahana Rao', updated: 'Monday' },
  { name: 'Dunning effectiveness', description: 'Reminder sequences and recovery rate', owner: 'Priya Poluru', updated: 'Friday' },
  { name: 'Revenue recognition', description: 'Deferred vs recognized by contract', owner: 'Sravani Poluru', updated: 'Thursday' },
  { name: 'Collections forecast', description: 'Expected cash from open invoices by week', owner: 'Vikram Poluru', updated: 'Wednesday' },
  { name: 'Plan mix', description: 'MRR concentration across Starter through Enterprise', owner: 'Nikhil Poluru', updated: 'Tuesday' },
];

export const revenueMonths = [142, 148, 151, 158, 162, 169, 174, 179, 181, 184, 186, 188];

export const commandItems = [
  { label: 'Search ledger', description: 'Invoices, customers, payments', href: '#/search', icon: 'search' },
  { label: 'Create invoice', description: 'Draft a new receivable', href: '#/invoices', icon: 'plus' },
  { label: 'Record payment', description: 'Apply cash to an invoice', href: '#/payments', icon: 'check' },
  { label: 'Add customer', description: 'Open the directory', href: '#/customers', icon: 'user' },
  { label: 'Export report', description: 'Aging, recon, tax', href: '#/reports', icon: 'download' },
];

export const inboxItems = [
  { label: 'INV-2840 overdue', description: 'Nimbus Retail · $8,400', icon: 'alert-triangle' },
  { label: 'INV-2839 disputed', description: 'Lumen Health · wire', icon: 'warning' },
  { label: 'Trial ending', description: 'Kite Studio in 6 days', icon: 'clock' },
  { label: 'INV-2845 pending', description: 'Nimbus Retail · Sep cycle', icon: 'file' },
];
