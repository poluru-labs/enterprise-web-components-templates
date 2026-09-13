import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps claims statuses to design-system tones', () => {
    expect(statusTone('verified')).toBe('success');
    expect(statusTone('paid')).toBe('success');
    expect(statusTone('open')).toBe('warning');
    expect(statusTone('watch')).toBe('warning');
    expect(statusTone('siu')).toBe('danger');
    expect(statusTone('lapsed')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_progress')).toBe('In Progress');
    expect(statusLabel('on track')).toBe('On Track');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('ok')).toBe('success');
    expect(severityTone('passed')).toBe('success');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('breach')).toBe('danger');
  });

  it('maps badge variants for status chips', () => {
    expect(badgeVariant('verified')).toBe('success');
    expect(badgeVariant('assigned')).toBe('info');
  });
});
