import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/property/hv-harbor')).toEqual({ name: 'property', id: 'hv-harbor' });
    expect(parseRoute('#/search/lease')).toEqual({ name: 'search', id: 'lease' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'property', id: 'hv-harbor' })).toBe('#/properties');
    expect(activeHref({ name: 'leases' })).toBe('#/leases');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  cedar  ')).toBe('#/search/cedar');
    expect(searchHref('alder hall')).toBe('#/search/alder%20hall');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'properties', 'leases', 'occupancy', 'maintenance', 'performance', 'search', 'settings']),
    );
  });
});
