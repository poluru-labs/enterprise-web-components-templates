import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/scorecard/sc_finance')).toEqual({ name: 'scorecard', id: 'sc_finance' });
    expect(parseRoute('#/search/revenue')).toEqual({ name: 'search', id: 'revenue' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'scorecard', id: 'sc_finance' })).toBe('#/scorecards');
    expect(activeHref({ name: 'goals' })).toBe('#/goals');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  revenue  ')).toBe('#/search/revenue');
    expect(searchHref('net revenue')).toBe('#/search/net%20revenue');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'scorecards', 'goals', 'search', 'settings']),
    );
  });
});
