import { describe, expect, it, beforeEach } from 'vitest';
import { activeHref, crumbText, pageTitle, parseRoute } from './router.js';

describe('router helpers', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('defaults to overview when hash is empty', () => {
    expect(parseRoute().name).toBe('overview');
  });

  it('parses detail routes and search queries', () => {
    window.location.hash = '#/invoice/INV-2841';
    expect(parseRoute()).toEqual({ name: 'invoice', id: 'INV-2841', query: '' });

    window.location.hash = '#/search?q=harbor';
    expect(parseRoute()).toEqual({ name: 'search', id: undefined, query: 'harbor' });
  });

  it('builds active hrefs for nested routes', () => {
    expect(activeHref({ name: 'invoice', id: 'INV-2841' })).toBe('#/invoices');
    expect(activeHref({ name: 'customer', id: 'cus_harbor' })).toBe('#/customers');
    expect(activeHref({ name: 'payments' })).toBe('#/payments');
  });

  it('builds breadcrumb and title copy', () => {
    expect(crumbText({ name: 'invoice', id: 'INV-2841' })).toContain('INV-2841');
    expect(pageTitle({ name: 'overview' }, 'Verdant')).toBe('Overview · Verdant Billing');
  });
});
