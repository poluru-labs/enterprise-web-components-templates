import { describe, expect, it } from 'vitest';
import { activeHref, crumbText, parseRoute, routeTitles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/deal/deal_harbor')).toEqual({ name: 'deal', id: 'deal_harbor' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
  });

  it('builds breadcrumb labels', () => {
    expect(crumbText({ name: 'overview' })).toMatch(/Overview/);
    expect(crumbText({ name: 'deal', id: 'deal_harbor' })).toContain('deal_harbor');
    expect(crumbText({ name: 'search' })).toMatch(/Search/);
  });

  it('resolves active nav href for detail routes', () => {
    expect(activeHref({ name: 'deal', id: 'x' })).toBe('#/deals');
    expect(activeHref({ name: 'contact', id: 'x' })).toBe('#/contacts');
    expect(activeHref({ name: 'pipeline' })).toBe('#/pipeline');
  });

  it('defines titles for all primary routes', () => {
    expect(routeTitles.search).toBe('Search');
    expect(routeTitles.pipeline).toBe('Pipeline');
  });
});
