import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/site/ks-harbor')).toEqual({ name: 'site', id: 'ks-harbor' });
    expect(parseRoute('#/search/rfi')).toEqual({ name: 'search', id: 'rfi' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'site', id: 'ks-harbor' })).toBe('#/sites');
    expect(activeHref({ name: 'rfis' })).toBe('#/rfis');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  cedar  ')).toBe('#/search/cedar');
    expect(searchHref('alder hall')).toBe('#/search/alder%20hall');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'sites', 'budgets', 'schedule', 'rfis', 'subcontractors', 'safety', 'search', 'settings']),
    );
  });
});
