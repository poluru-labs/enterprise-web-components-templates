import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps clinic statuses to design-system tones', () => {
    expect(statusTone('In visit')).toBe('brand');
    expect(statusTone('Checked in')).toBe('info');
    expect(statusTone('Waiting')).toBe('warning');
    expect(statusTone('Scheduled')).toBe('neutral');
    expect(statusTone('Completed')).toBe('success');
    expect(statusTone('No-show risk')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('no_show_risk')).toBe('No Show Risk');
    expect(statusLabel('In visit')).toBe('In Visit');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('resolved')).toBe('success');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });
});
