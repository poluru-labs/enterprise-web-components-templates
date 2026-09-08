import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/request/pr-1042')).toEqual({ name: 'request', id: 'pr-1042' });
    expect(parseRoute('#/search/northline')).toEqual({ name: 'search', id: 'northline' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'request', id: 'pr-1042' })).toBe('#/requests');
    expect(activeHref({ name: 'approvals' })).toBe('#/approvals');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  northline  ')).toBe('#/search/northline');
    expect(searchHref('laptop fleet')).toBe('#/search/laptop%20fleet');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'requests', 'approvals', 'suppliers', 'contracts', 'spend', 'search', 'settings']),
    );
  });
});
