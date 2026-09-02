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
    expect(formatPercent(76.2)).toBe('76.2%');
    expect(formatPercent(96.42, 1)).toBe('96.4%');
    expect(formatPercent(12.345, 2)).toBe('12.35%');
  });

  it('formats integers with grouping separators', () => {
    expect(formatNumber(42)).toBe('42');
    expect(formatNumber(28640)).toBe('28,640');
  });

  it('formats durations from minutes into compact units', () => {
    expect(formatDuration(0.5)).toBe('30s');
    expect(formatDuration(18)).toBe('18m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(120)).toBe('2h');
    expect(formatAge(18)).toBe('18m');
  });

  it('formats compact counts and currency', () => {
    expect(formatCompact(1400000)).toMatch(/1\.4/i);
    expect(formatCurrency(48200)).toBe('$48,200');
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-09-01T16:42:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
    expect(formatTime(stamp).length).toBeGreaterThan(3);
  });

  it('filters ISO values against an inclusive date range', () => {
    const stamp = '2026-09-01T18:00:00.000Z';
    expect(inDateRange(stamp, '2026-09-01', '2026-09-01')).toBe(true);
    expect(inDateRange(stamp, '2026-09-02', '2026-09-03')).toBe(false);
    expect(inDateRange('', '2026-09-01', '2026-09-01')).toBe(false);
  });

  it('builds initials and detects overlapping leave ranges', () => {
    expect(initials('Aditi Poluru')).toBe('AP');
    expect(rangeOverlaps('2026-09-01', '2026-09-05', '2026-09-04', '2026-09-07')).toBe(true);
    expect(rangeOverlaps('2026-09-01', '2026-09-02', '2026-09-08', '2026-09-11')).toBe(false);
  });
});
