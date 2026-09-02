import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps delivery statuses to design-system tones', () => {
    expect(statusTone('On track')).toBe('success');
    expect(statusTone('Done')).toBe('success');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Blocked')).toBe('danger');
    expect(statusTone('At risk')).toBe('danger');
    expect(statusTone('In progress')).toBe('brand');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_hold')).toBe('On Hold');
    expect(statusLabel('in progress')).toBe('In Progress');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('Red')).toBe('danger');
    expect(severityTone('Amber')).toBe('warning');
    expect(severityTone('Green')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('at_risk')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });

  it('maps badge variants for project statuses', () => {
    expect(badgeVariant('On track')).toBe('success');
    expect(badgeVariant('In progress')).toBe('info');
  });
});
