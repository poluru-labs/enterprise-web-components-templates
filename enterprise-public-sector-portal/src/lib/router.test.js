import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/request/rq_pothole')).toEqual({ name: 'request', id: 'rq_pothole' });
    expect(parseRoute('#/search/pothole')).toEqual({ name: 'search', id: 'pothole' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'request', id: 'rq_pothole' })).toBe('#/requests');
    expect(activeHref({ name: 'permits' })).toBe('#/permits');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  pothole  ')).toBe('#/search/pothole');
    expect(searchHref('ward 3')).toBe('#/search/ward%203');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'requests', 'permits', 'cases', 'departments', 'budgets', 'service', 'search', 'settings']),
    );
  });
});
