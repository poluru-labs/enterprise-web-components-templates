import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/event/ev_north')).toEqual({ name: 'event', id: 'ev_north' });
    expect(parseRoute('#/search/summit')).toEqual({ name: 'search', id: 'summit' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'event', id: 'ev_north' })).toBe('#/events');
    expect(activeHref({ name: 'registrations' })).toBe('#/registrations');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  summit  ')).toBe('#/search/summit');
    expect(searchHref('hall a')).toBe('#/search/hall%20a');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining([
        'overview',
        'events',
        'event',
        'registrations',
        'venues',
        'speakers',
        'schedule',
        'sponsors',
        'attendance',
        'search',
        'settings',
      ]),
    );
  });
});
