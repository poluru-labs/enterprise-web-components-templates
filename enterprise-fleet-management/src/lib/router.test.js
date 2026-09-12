import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/vehicle/orb-104')).toEqual({ name: 'vehicle', id: 'orb-104' });
    expect(parseRoute('#/search/sprinter')).toEqual({ name: 'search', id: 'sprinter' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'vehicle', id: 'orb-104' })).toBe('#/vehicles');
    expect(activeHref({ name: 'maintenance' })).toBe('#/maintenance');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  sprinter  ')).toBe('#/search/sprinter');
    expect(searchHref('orb 104')).toBe('#/search/orb%20104');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'vehicles', 'maintenance', 'drivers', 'fuel', 'inspections', 'search', 'settings']),
    );
  });
});
