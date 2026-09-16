import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/service/svc_auth')).toEqual({ name: 'service', id: 'svc_auth' });
    expect(parseRoute('#/search/auth')).toEqual({ name: 'search', id: 'auth' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'service', id: 'svc_auth' })).toBe('#/services');
    expect(activeHref({ name: 'deployments' })).toBe('#/deployments');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  auth  ')).toBe('#/search/auth');
    expect(searchHref('edge mesh')).toBe('#/search/edge%20mesh');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining([
        'overview',
        'services',
        'service',
        'deployments',
        'environments',
        'health',
        'owners',
        'search',
        'settings',
      ]),
    );
  });
});
