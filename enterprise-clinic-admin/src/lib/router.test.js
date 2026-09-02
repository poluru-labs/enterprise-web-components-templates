import { describe, expect, it, vi } from 'vitest';
import { activeHref, crumbText, parseRoute, routeTitle, titles } from './router.js';

describe('router helpers', () => {
  it('parses hash routes', () => {
    vi.stubGlobal('window', { location: { hash: '#/schedule' } });
    expect(parseRoute()).toEqual({ name: 'schedule', id: undefined });

    window.location.hash = '#/patient/pt_maya';
    expect(parseRoute()).toEqual({ name: 'patient', id: 'pt_maya' });

    window.location.hash = '';
    expect(parseRoute()).toEqual({ name: 'overview', id: undefined });
    vi.unstubAllGlobals();
  });

  it('builds breadcrumbs and active hrefs', () => {
    expect(crumbText({ name: 'overview' })).toContain('San Jose');
    expect(crumbText({ name: 'visit', id: 'apt_1041' })).toContain('Visit');
    expect(activeHref({ name: 'patient', id: 'pt_maya' })).toBe('#/patients');
    expect(activeHref({ name: 'search' })).toBe('#/search');
  });

  it('exposes page titles', () => {
    expect(titles.search).toBe('Search');
    expect(routeTitle({ name: 'schedule' })).toContain('Schedule');
  });
});
