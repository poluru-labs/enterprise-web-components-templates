import { describe, expect, it, beforeEach } from 'vitest';
import { activeHref, crumbItems, pageTitle, parseRoute } from './router.js';

describe('router helpers', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('defaults to overview when hash is empty', () => {
    expect(parseRoute().name).toBe('overview');
  });

  it('parses detail routes and search queries', () => {
    window.location.hash = '#/org/org_harbor';
    expect(parseRoute()).toEqual({ name: 'org', id: 'org_harbor', query: '' });

    window.location.hash = '#/search?q=harbor';
    expect(parseRoute()).toEqual({ name: 'search', id: undefined, query: 'harbor' });
  });

  it('builds active hrefs for nested routes', () => {
    expect(activeHref({ name: 'org', id: 'org_harbor' })).toBe('#/organizations');
    expect(activeHref({ name: 'members' })).toBe('#/members');
  });

  it('builds breadcrumb and title copy', () => {
    const crumbs = crumbItems({ name: 'org', id: 'org_harbor' });
    expect(crumbs.some((item) => item.label === 'Harbor & Co.')).toBe(true);
    expect(pageTitle({ name: 'overview' }, 'Helio')).toBe('Overview · Helio Admin');
  });
});
