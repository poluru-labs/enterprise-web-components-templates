import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps inventory statuses to design-system tones', () => {
    expect(statusTone('In stock')).toBe('success');
    expect(statusTone('Preferred')).toBe('success');
    expect(statusTone('On track')).toBe('success');
    expect(statusTone('In transit')).toBe('brand');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Delayed')).toBe('warning');
    expect(statusTone('Low stock')).toBe('danger');
    expect(statusTone('Backordered')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('low_stock')).toBe('Low Stock');
    expect(statusLabel('in_transit')).toBe('In Transit');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('Red')).toBe('danger');
    expect(severityTone('Amber')).toBe('warning');
    expect(severityTone('Green')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });

  it('returns badge variants without brand tone', () => {
    expect(badgeVariant('In stock')).toBe('success');
    expect(badgeVariant('Draft')).toBe('neutral');
  });
});
