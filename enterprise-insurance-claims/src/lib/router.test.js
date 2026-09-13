import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/claim/bc-harbor')).toEqual({ name: 'claim', id: 'bc-harbor' });
    expect(parseRoute('#/search/siu')).toEqual({ name: 'search', id: 'siu' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'claim', id: 'bc-harbor' })).toBe('#/claims');
    expect(activeHref({ name: 'fraud' })).toBe('#/fraud');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  cedar  ')).toBe('#/search/cedar');
    expect(searchHref('alder hail')).toBe('#/search/alder%20hail');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'claims', 'adjusters', 'policies', 'fraud', 'settlements', 'search', 'settings']),
    );
  });
});
