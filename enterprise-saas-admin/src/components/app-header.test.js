import { describe, expect, it, beforeEach } from 'vitest';
import { renderHeaderMarkup } from './app-header.js';
import { currentUser, seatUsage } from '../data/index.js';
import { formatNumber } from '../lib/format.js';

describe('helio-app-header tenancy bar', () => {
  beforeEach(() => {
    document.body.innerHTML = renderHeaderMarkup({ user: currentUser });
  });

  it('renders the Helio brand mark on dark ink', () => {
    expect(document.querySelector('.helio-brand-mark')?.textContent).toBe('H');
    expect(document.querySelector('.helio-tenancy-bar')).toBeTruthy();
  });

  it('shows the chrome-yellow seat usage meter', () => {
    const value = document.querySelector('.helio-seat-meter__value')?.textContent;
    expect(value).toContain(formatNumber(seatUsage.used));
    expect(value).toContain(formatNumber(seatUsage.total));
    expect(document.querySelector('.helio-seat-meter__fill')).toBeTruthy();
  });

  it('includes org switcher, search, invite org, and profile controls', () => {
    expect(document.querySelector('#org-chip')).toBeTruthy();
    expect(document.querySelector('#global-search')).toBeTruthy();
    expect(document.querySelector('#header-invite')).toBeTruthy();
    expect(document.querySelector('#profile-btn')).toBeTruthy();
    expect(document.querySelector('.helio-header-kbd')?.textContent).toBe('⌘K');
  });
});
