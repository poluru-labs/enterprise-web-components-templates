import { describe, expect, it } from 'vitest';
import { activeHref, parseRoute, searchHref, ticketHref, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes with optional ids', () => {
    expect(parseRoute('#/overview')).toEqual({ name: 'overview', id: undefined });
    expect(parseRoute('#/tickets/HD-4821')).toEqual({ name: 'tickets', id: 'HD-4821' });
    expect(parseRoute('#/search/vpn')).toEqual({ name: 'search', id: 'vpn' });
    expect(parseRoute('')).toEqual({ name: 'overview', id: undefined });
  });

  it('resolves active sidebar hrefs', () => {
    expect(activeHref({ name: 'overview' })).toBe('#/overview');
    expect(activeHref({ name: 'tickets', id: 'HD-4821' })).toBe('#/tickets');
    expect(activeHref({ name: 'teams' })).toBe('#/teams');
  });

  it('builds search and ticket hrefs', () => {
    expect(searchHref('')).toBe('#/search');
    expect(searchHref('  login  ')).toBe('#/search/login');
    expect(ticketHref('HD-4821')).toBe('#/tickets/HD-4821');
  });

  it('registers all product views', () => {
    expect(Object.keys(titles)).toEqual(
      expect.arrayContaining(['overview', 'tickets', 'teams', 'sla', 'knowledge', 'search', 'settings']),
    );
  });
});
