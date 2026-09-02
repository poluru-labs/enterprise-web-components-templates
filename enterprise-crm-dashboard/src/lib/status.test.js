import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps CRM statuses to design-system tones', () => {
    expect(statusTone('Qualified')).toBe('success');
    expect(statusTone('Negotiation')).toBe('brand');
    expect(statusTone('Working')).toBe('warning');
    expect(statusTone('At risk')).toBe('danger');
    expect(statusTone('Blocked')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_leave')).toBe('On Leave');
    expect(statusLabel('closed_won')).toBe('Closed Won');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('error')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('ok')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });
});
