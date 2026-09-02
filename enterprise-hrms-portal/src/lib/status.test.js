import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps HR statuses to design-system tones', () => {
    expect(statusTone('active')).toBe('success');
    expect(statusTone('approved')).toBe('success');
    expect(statusTone('open')).toBe('info');
    expect(statusTone('pending')).toBe('warning');
    expect(statusTone('on_leave')).toBe('warning');
    expect(statusTone('denied')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_leave')).toBe('On Leave');
    expect(statusLabel('on hold')).toBe('On Hold');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('ok')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('breach')).toBe('danger');
  });

  it('maps badge variants for status chips', () => {
    expect(badgeVariant('active')).toBe('success');
    expect(badgeVariant('open')).toBe('info');
  });
});
