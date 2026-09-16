import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/piece/lm-harbor')).toEqual({ name: 'piece', id: 'lm-harbor' });
    expect(parseRoute('#/search/quill')).toEqual({ name: 'search', id: 'quill' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#overview')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'piece', id: 'lm-harbor' })).toBe('#/calendar');
    expect(activeHref({ name: 'approvals' })).toBe('#/approvals');
  });

  it('builds search hrefs from queries', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  harbor  ')).toBe('#/search/harbor');
    expect(searchHref('alder hall')).toBe('#/search/alder%20hall');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'calendar', 'approvals', 'locales', 'schedule', 'assets', 'search', 'settings']),
    );
  });
});
