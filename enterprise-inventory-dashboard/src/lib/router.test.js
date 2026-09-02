import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/product/sku_002')).toEqual({ name: 'product', id: 'sku_002' });
    expect(parseRoute('#/search/trail')).toEqual({ name: 'search', id: 'trail' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'product', id: 'sku_002' })).toBe('#/inventory');
    expect(activeHref({ name: 'orders' })).toBe('#/orders');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  trail runner  ')).toBe('#/search/trail%20runner');
    expect(searchHref('NB-1042')).toBe('#/search/NB-1042');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'inventory', 'orders', 'search', 'settings']),
    );
  });
});
