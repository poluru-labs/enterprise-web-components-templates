import { describe, expect, it } from 'vitest';
import {
  formatAge,
  formatCompact,
  formatDate,
  formatDuration,
  formatNumber,
  formatPercent,
  initials,
  slugify,
} from './format.js';

describe('format helpers', () => {
  it('formats durations and ages', () => {
    expect(formatDuration(0.5)).toBe('30s');
    expect(formatDuration(42)).toBe('42m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatAge(12)).toBe('12m');
  });

  it('formats numbers and percents', () => {
    expect(formatNumber(248)).toBe('248');
    expect(formatPercent(91.2)).toBe('91.2%');
    expect(formatCompact(1200)).toBe('1.2K');
  });

  it('formats dates', () => {
    expect(formatDate('2026-08-29')).toMatch(/Aug/);
  });

  it('slugifies and builds initials', () => {
    expect(slugify('Login loop on billing')).toBe('login-loop-on-billing');
    expect(initials('Elena Poluru')).toBe('EP');
  });
});
