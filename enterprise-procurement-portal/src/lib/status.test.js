import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps procurement statuses to design-system tones', () => {
    expect(statusTone('approved')).toBe('success');
    expect(statusTone('preferred')).toBe('success');
    expect(statusTone('ordered')).toBe('info');
    expect(statusTone('pending')).toBe('warning');
    expect(statusTone('in_review')).toBe('warning');
    expect(statusTone('rejected')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_review')).toBe('In Review');
    expect(statusLabel('on hold')).toBe('On Hold');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('ok')).toBe('success');
    expect(severityTone('resolved')).toBe('success');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('breach')).toBe('danger');
  });

  it('maps badge variants for status chips', () => {
    expect(badgeVariant('approved')).toBe('success');
    expect(badgeVariant('ordered')).toBe('info');
  });
});
