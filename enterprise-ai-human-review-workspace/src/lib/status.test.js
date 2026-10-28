import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps KPI statuses to design-system tones', () => {
    expect(statusTone('On track')).toBe('success');
    expect(statusTone('Ahead')).toBe('success');
    expect(statusTone('Green')).toBe('success');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Amber')).toBe('warning');
    expect(statusTone('At risk')).toBe('danger');
    expect(statusTone('Behind')).toBe('danger');
    expect(statusTone('Red')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_track')).toBe('On Track');
    expect(statusLabel('at risk')).toBe('At Risk');
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
    expect(slaTone('error')).toBe('danger');
  });

  it('maps badge variants for scorecard chips', () => {
    expect(badgeVariant('On track')).toBe('success');
    expect(badgeVariant('Active')).toBe('brand');
  });
});
