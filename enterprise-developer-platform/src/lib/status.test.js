import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps platform statuses to design-system tones', () => {
    expect(statusTone('On track')).toBe('success');
    expect(statusTone('Complete')).toBe('success');
    expect(statusTone('Healthy')).toBe('success');
    expect(statusTone('Live')).toBe('brand');
    expect(statusTone('Rolling')).toBe('brand');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Pending')).toBe('warning');
    expect(statusTone('Hold')).toBe('warning');
    expect(statusTone('Draft')).toBe('neutral');
    expect(statusTone('Failed')).toBe('danger');
    expect(statusTone('Degraded')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_track')).toBe('On Track');
    expect(statusLabel('error budget')).toBe('Error Budget');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('Red')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('Amber')).toBe('warning');
    expect(severityTone('Green')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('at risk')).toBe('danger');
    expect(slaTone('failed')).toBe('danger');
    expect(slaTone('error')).toBe('danger');
  });

  it('maps badge variants for service chips', () => {
    expect(badgeVariant('On track')).toBe('success');
    expect(badgeVariant('Live')).toBe('brand');
  });
});
