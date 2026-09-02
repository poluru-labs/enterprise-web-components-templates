import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusFor, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps admin statuses to design-system tones', () => {
    expect(statusTone('Active')).toBe('success');
    expect(statusTone('Healthy')).toBe('success');
    expect(statusTone('At risk')).toBe('warning');
    expect(statusTone('Near cap')).toBe('warning');
    expect(statusTone('Past due')).toBe('danger');
    expect(statusTone('Suspended')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('near_cap')).toBe('Near Cap');
    expect(statusLabel('active')).toBe('Active');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('error')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('warn')).toBe('warning');
    expect(severityTone('ok')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });

  it('maps display labels via statusFor', () => {
    expect(statusFor('Healthy')).toBe('success');
    expect(statusFor('Past due')).toBe('danger');
  });
});
