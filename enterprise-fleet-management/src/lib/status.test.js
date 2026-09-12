import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps fleet statuses to design-system tones', () => {
    expect(statusTone('on_route')).toBe('success');
    expect(statusTone('passed')).toBe('success');
    expect(statusTone('assigned')).toBe('info');
    expect(statusTone('in_shop')).toBe('warning');
    expect(statusTone('inspection_due')).toBe('warning');
    expect(statusTone('failed')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_shop')).toBe('In Shop');
    expect(statusLabel('on route')).toBe('On Route');
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
    expect(badgeVariant('on_route')).toBe('success');
    expect(badgeVariant('assigned')).toBe('info');
  });
});
