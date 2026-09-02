import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps billing statuses to design-system tones', () => {
    expect(statusTone('Paid')).toBe('success');
    expect(statusTone('Collected')).toBe('success');
    expect(statusTone('Pending')).toBe('warning');
    expect(statusTone('Past due')).toBe('warning');
    expect(statusTone('Overdue')).toBe('danger');
    expect(statusTone('Failed')).toBe('danger');
    expect(statusTone('Disputed')).toBe('danger');
    expect(statusTone('Draft')).toBe('neutral');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('past_due')).toBe('Past Due');
    expect(statusLabel('active')).toBe('Active');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });

  it('returns badge variants from status tone', () => {
    expect(badgeVariant('Paid')).toBe('success');
    expect(badgeVariant('Draft')).toBe('neutral');
  });
});
