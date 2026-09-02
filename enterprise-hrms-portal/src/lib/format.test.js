import { describe, expect, it } from 'vitest';
import {
  formatAge,
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
    expect(formatPercent(74)).toBe('74.0%');
    expect(formatPercent(8.42, 1)).toBe('8.4%');
  });

  it('formats integers with grouping separators', () => {
    expect(formatNumber(18)).toBe('18');
    expect(formatNumber(1284)).toBe('1,284');
  });

  it('formats durations from minutes into compact units', () => {
    expect(formatDuration(0.5)).toBe('30s');
    expect(formatDuration(12)).toBe('12m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatAge(8)).toBe('8m');
  });

  it('formats compact counts and currency', () => {
    expect(formatCompact(184200)).toMatch(/184/i);
    expect(formatCurrency(184200)).toBe('$184,200');
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-09-01T16:42:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
    expect(formatTime(stamp).length).toBeGreaterThan(3);
  });

  it('filters ISO values against an inclusive date range', () => {
    const stamp = '2026-09-01T18:00:00.000Z';
    expect(inDateRange(stamp, '2026-09-01', '2026-09-05')).toBe(true);
    expect(inDateRange(stamp, '2026-09-08', '2026-09-11')).toBe(false);
  });

  it('builds initials and detects overlapping leave ranges', () => {
    expect(initials('Sravani Poluru')).toBe('SP');
    expect(rangeOverlaps('2026-09-01', '2026-09-05', '2026-09-04', '2026-09-07')).toBe(true);
    expect(rangeOverlaps('2026-09-01', '2026-09-02', '2026-09-08', '2026-09-11')).toBe(false);
  });
});
