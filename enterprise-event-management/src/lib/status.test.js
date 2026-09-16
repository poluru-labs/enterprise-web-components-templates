import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps event statuses to design-system tones', () => {
    expect(statusTone('On track')).toBe('success');
    expect(statusTone('Complete')).toBe('success');
    expect(statusTone('Attended')).toBe('success');
    expect(statusTone('Checked in')).toBe('success');
    expect(statusTone('Confirmed')).toBe('success');
    expect(statusTone('Live')).toBe('brand');
    expect(statusTone('On stage')).toBe('brand');
    expect(statusTone('In use')).toBe('brand');
    expect(statusTone('Registered')).toBe('brand');
    expect(statusTone('Upcoming')).toBe('brand');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('Pending')).toBe('warning');
    expect(statusTone('Waitlist')).toBe('warning');
    expect(statusTone('Hold')).toBe('warning');
    expect(statusTone('Draft')).toBe('neutral');
    expect(statusTone('Overdue')).toBe('danger');
    expect(statusTone('No show')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_track')).toBe('On Track');
    expect(statusLabel('checked in')).toBe('Checked In');
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
    expect(slaTone('overdue')).toBe('danger');
    expect(slaTone('error')).toBe('danger');
  });

  it('maps badge variants for event chips', () => {
    expect(badgeVariant('On track')).toBe('success');
    expect(badgeVariant('Live')).toBe('brand');
  });
});
