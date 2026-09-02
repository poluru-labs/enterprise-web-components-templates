import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/project/prj_harbor')).toEqual({ name: 'project', id: 'prj_harbor' });
    expect(parseRoute('#/search/harbor')).toEqual({ name: 'search', id: 'harbor' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'project', id: 'prj_harbor' })).toBe('#/projects');
    expect(activeHref({ name: 'board' })).toBe('#/board');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  harbor  ')).toBe('#/search/harbor');
    expect(searchHref('nimbus inventory')).toBe('#/search/nimbus%20inventory');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'projects', 'board', 'search', 'settings']),
    );
  });
});
