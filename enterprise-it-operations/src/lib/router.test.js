import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/asset/ci_sso')).toEqual({ name: 'asset', id: 'ci_sso' });
    expect(parseRoute('#/incident/INC-10482')).toEqual({ name: 'incident', id: 'INC-10482' });
    expect(parseRoute('#/search/sso')).toEqual({ name: 'search', id: 'sso' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'asset', id: 'ci_sso' })).toBe('#/assets');
    expect(activeHref({ name: 'incident', id: 'INC-10482' })).toBe('#/incidents');
    expect(activeHref({ name: 'change', id: 'CHG-2201' })).toBe('#/changes');
    expect(activeHref({ name: 'health' })).toBe('#/health');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  sso  ')).toBe('#/search/sso');
    expect(searchHref('open p1')).toBe('#/search/open%20p1');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'assets', 'incidents', 'changes', 'health', 'availability', 'search', 'settings']),
    );
  });
});
