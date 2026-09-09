import { describe, expect, it } from 'vitest';
import { badgeVariant, severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps compliance statuses to design-system tones', () => {
    expect(statusTone('published')).toBe('success');
    expect(statusTone('mapped')).toBe('success');
    expect(statusTone('ready')).toBe('success');
    expect(statusTone('in_review')).toBe('warning');
    expect(statusTone('watch')).toBe('warning');
    expect(statusTone('gap')).toBe('danger');
    expect(statusTone('overdue')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_review')).toBe('In Review');
    expect(statusLabel('on hold')).toBe('On Hold');
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
    expect(badgeVariant('published')).toBe('success');
    expect(badgeVariant('scheduled')).toBe('info');
  });
});
