import { describe, expect, it } from 'vitest';
import {
  formatAge,
  formatClockTime,
  formatCompact,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatDuration,
  formatNumber,
  formatPercent,
  formatTime,
  inDateRange,
  initials,
  lastName,
  rangeOverlaps,
} from './format.js';

describe('format helpers', () => {
  it('returns an em dash for empty or invalid values', () => {
    expect(formatDateTime()).toBe('—');
    expect(formatDate(null)).toBe('—');
    expect(formatTime('not-a-date')).toBe('—');
    expect(formatDuration(undefined)).toBe('—');
    expect(formatPercent(NaN)).toBe('—');
    expect(formatNumber(null)).toBe('—');
    expect(formatCompact('x')).toBe('—');
    expect(formatCurrency(undefined)).toBe('—');
  });

  it('formats percentages with a configurable precision', () => {
    expect(formatPercent(82)).toBe('82.0%');
    expect(formatPercent(96.42, 1)).toBe('96.4%');
  });

  it('formats integers with grouping separators', () => {
    expect(formatNumber(2846)).toBe('2,846');
  });

  it('formats durations from minutes into compact units', () => {
    expect(formatDuration(11)).toBe('11m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatAge(8)).toBe('8m');
  });

  it('formats compact counts and currency', () => {
    expect(formatCompact(2846)).toMatch(/2/i);
    expect(formatCurrency(184200)).toBe('$184,200');
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-09-01T16:42:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
  });

  it('filters ISO values against an inclusive date range', () => {
    const stamp = '2026-09-01T18:00:00.000Z';
    expect(inDateRange(stamp, '2026-09-01', '2026-09-01')).toBe(true);
    expect(inDateRange(stamp, '2026-09-02', '2026-09-03')).toBe(false);
  });

  it('builds initials, last names, and clock times', () => {
    expect(initials('Aisha Poluru')).toBe('AP');
    expect(lastName('Anika Patel')).toBe('Patel');
    expect(formatClockTime('08:30')).toMatch(/8:30/);
    expect(rangeOverlaps('2026-09-01', '2026-09-05', '2026-09-04', '2026-09-07')).toBe(true);
  });
});
