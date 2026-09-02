import { renderOverview, hydrateOverview } from './overview.js';
import { renderSearch, hydrateSearch } from './search.js';
import { renderInvoices, hydrateInvoices } from './invoices.js';
import { renderInvoiceDetail, hydrateInvoiceDetail } from './invoice-detail.js';
import { renderPayments, hydratePayments } from './payments.js';
import { renderSubscriptions, hydrateSubscriptions } from './subscriptions.js';
import { renderCustomers, hydrateCustomers } from './customers.js';
import { renderCustomerDetail, hydrateCustomerDetail } from './customer-detail.js';
import { renderAnalytics, hydrateAnalytics } from './analytics.js';
import { renderReports, hydrateReports } from './reports.js';
import { renderSettings, hydrateSettings } from './settings.js';

export function renderView(route) {
  if (route.name === 'invoice') return renderInvoiceDetail(route.id);
  if (route.name === 'customer') return renderCustomerDetail(route.id);
  const pages = {
    overview: renderOverview,
    search: () => renderSearch(route.query ?? ''),
    invoices: renderInvoices,
    payments: renderPayments,
    subscriptions: renderSubscriptions,
    customers: renderCustomers,
    analytics: renderAnalytics,
    reports: renderReports,
    settings: renderSettings,
  };
  return (pages[route.name] ?? renderOverview)();
}

export function hydrateView(root, route) {
  if (route.name === 'overview' || !route.name) hydrateOverview(root);
  if (route.name === 'search') hydrateSearch(root, route.query ?? '');
  if (route.name === 'invoices') hydrateInvoices(root);
  if (route.name === 'invoice') hydrateInvoiceDetail(root, route);
  if (route.name === 'payments') hydratePayments(root);
  if (route.name === 'subscriptions') hydrateSubscriptions(root);
  if (route.name === 'customers') hydrateCustomers(root);
  if (route.name === 'customer') hydrateCustomerDetail(root, route);
  if (route.name === 'analytics') hydrateAnalytics(root);
  if (route.name === 'reports') hydrateReports(root);
  if (route.name === 'settings') hydrateSettings(root);
}
