import { describe, expect, it } from 'vitest';
import { badgeVariant, priorityTone, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps helpdesk statuses to design-system tones', () => {
    expect(statusTone('Open')).toBe('info');
    expect(statusTone('In progress')).toBe('info');
    expect(statusTone('Waiting')).toBe('warning');
    expect(statusTone('Resolved')).toBe('success');
    expect(statusTone('Critical')).toBe('danger');
    expect(statusTone('Breached')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_progress')).toBe('In Progress');
    expect(statusLabel('at_risk')).toBe('At Risk');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('high')).toBe('danger');
    expect(severityTone('medium')).toBe('warning');
    expect(severityTone('low')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('breach')).toBe('danger');
    expect(slaTone('breached')).toBe('danger');
  });

  it('maps priority and badge variants', () => {
    expect(priorityTone('Critical')).toBe('danger');
    expect(badgeVariant('Open')).toBe('info');
    expect(badgeVariant('Breached')).toBe('danger');
  });
});
