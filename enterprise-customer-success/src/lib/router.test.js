import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/account/ac_harbor')).toEqual({ name: 'account', id: 'ac_harbor' });
    expect(parseRoute('#/search/harbor')).toEqual({ name: 'search', id: 'harbor' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'account', id: 'ac_harbor' })).toBe('#/accounts');
    expect(activeHref({ name: 'renewals' })).toBe('#/renewals');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  harbor  ')).toBe('#/search/harbor');
    expect(searchHref('net retain')).toBe('#/search/net%20retain');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'accounts', 'health', 'renewals', 'onboarding', 'expansion', 'search', 'settings']),
    );
  });
});
