import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps SOC statuses to design-system tones', () => {
    expect(statusTone('active')).toBe('danger');
    expect(statusTone('open')).toBe('warning');
    expect(statusTone('contained')).toBe('success');
    expect(statusTone('patched')).toBe('success');
    expect(statusTone('ready')).toBe('success');
    expect(statusTone('investigating')).toBe('info');
    expect(statusTone('watch')).toBe('warning');
    expect(statusTone('critical')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_progress')).toBe('In Progress');
    expect(statusLabel('at risk')).toBe('At Risk');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('high')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('ok')).toBe('success');
    expect(severityTone('resolved')).toBe('success');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('gap')).toBe('danger');
    expect(slaTone('overdue')).toBe('danger');
  });

  it('maps badge variants for status chips', () => {
    expect(badgeVariant('contained')).toBe('success');
    expect(badgeVariant('investigating')).toBe('info');
    expect(badgeVariant('active')).toBe('danger');
  });
});
