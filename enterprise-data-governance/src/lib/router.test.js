import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/asset/ast_accounts')).toEqual({ name: 'asset', id: 'ast_accounts' });
    expect(parseRoute('#/search/accounts')).toEqual({ name: 'search', id: 'accounts' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'asset', id: 'ast_accounts' })).toBe('#/catalog');
    expect(activeHref({ name: 'quality' })).toBe('#/quality');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  accounts  ')).toBe('#/search/accounts');
    expect(searchHref('net revenue')).toBe('#/search/net%20revenue');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'catalog', 'owners', 'lineage', 'quality', 'access', 'search', 'settings']),
    );
  });
});
