import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/trip/tr_lagos')).toEqual({ name: 'trip', id: 'tr_lagos' });
    expect(parseRoute('#/search/lagos')).toEqual({ name: 'search', id: 'lagos' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'trip', id: 'tr_lagos' })).toBe('#/trips');
    expect(activeHref({ name: 'approvals' })).toBe('#/approvals');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  lagos  ')).toBe('#/search/lagos');
    expect(searchHref('duty of care')).toBe('#/search/duty%20of%20care');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'trips', 'travelers', 'approvals', 'itineraries', 'expenses', 'risk', 'search', 'settings']),
    );
  });
});
