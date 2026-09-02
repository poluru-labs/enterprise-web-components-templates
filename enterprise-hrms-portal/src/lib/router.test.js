import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/person/p-kavya')).toEqual({ name: 'person', id: 'p-kavya' });
    expect(parseRoute('#/search/kavya')).toEqual({ name: 'search', id: 'kavya' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'person', id: 'p-kavya' })).toBe('#/people');
    expect(activeHref({ name: 'leave' })).toBe('#/leave');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  kavya  ')).toBe('#/search/kavya');
    expect(searchHref('people partner')).toBe('#/search/people%20partner');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'people', 'leave', 'hiring', 'learning', 'search', 'settings']),
    );
  });
});
