import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/policy/pol-isp')).toEqual({ name: 'policy', id: 'pol-isp' });
    expect(parseRoute('#/search/gdpr')).toEqual({ name: 'search', id: 'gdpr' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'policy', id: 'pol-isp' })).toBe('#/policies');
    expect(activeHref({ name: 'findings' })).toBe('#/findings');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  gdpr  ')).toBe('#/search/gdpr');
    expect(searchHref('access review')).toBe('#/search/access%20review');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining([
        'overview',
        'policies',
        'policy',
        'controls',
        'audits',
        'tasks',
        'evidence',
        'findings',
        'search',
        'settings',
      ]),
    );
  });
});
