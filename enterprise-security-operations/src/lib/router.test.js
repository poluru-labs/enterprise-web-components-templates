import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/incident/inc-4412')).toEqual({ name: 'incident', id: 'inc-4412' });
    expect(parseRoute('#/search/vault')).toEqual({ name: 'search', id: 'vault' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'incident', id: 'inc-4412' })).toBe('#/incidents');
    expect(activeHref({ name: 'vulnerabilities' })).toBe('#/vulnerabilities');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  vault  ')).toBe('#/search/vault');
    expect(searchHref('open incident')).toBe('#/search/open%20incident');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining([
        'overview',
        'alerts',
        'incidents',
        'incident',
        'vulnerabilities',
        'investigations',
        'response',
        'search',
        'settings',
      ]),
    );
  });
});
