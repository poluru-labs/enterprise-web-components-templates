import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('relay-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('relay-header')).toBeDefined();
  });

  it('renders a dispatch rail with SLA clock, severity, and queue lanes', () => {
    const header = document.createElement('relay-header');
    header.setAttribute('product', 'Relay');
    header.setAttribute('workspace', 'Poluru Support');
    document.body.appendChild(header);
    header.queueRibbon = {
      slaLabel: 'First response',
      slaCountdown: '12m',
      queueLength: 38,
      agentsOnline: 14,
      agentsScheduled: 18,
      breached: 6,
      shift: 'Shift B',
      coverage: 'Coverage until 8:00 PM',
      severity: { critical: 3, high: 7, medium: 12 },
      lanes: [
        { id: 'q_identity', label: 'Identity', open: 42 },
        { id: 'q_platform', label: 'Platform', open: 58 },
      ],
    };

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('Relay');
    expect(shadow).toContain('Poluru Support');
    expect(shadow).toContain('First response');
    expect(shadow).toContain('12m');
    expect(shadow).toContain('3');
    expect(shadow).toContain('crit');
    expect(shadow).toContain('Identity');
    expect(shadow).toContain('Platform');
    expect(shadow).toContain('14/18 on floor');
    expect(header.shadowRoot?.querySelector('.dispatch-rail')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.sla-clock')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.queue-lane').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('routes SLA clock and queue lanes from the dispatch rail', () => {
    const header = document.createElement('relay-header');
    document.body.appendChild(header);
    header.queueRibbon = {
      slaCountdown: '12m',
      slaLabel: 'First response',
      queueLength: 38,
      agentsOnline: 14,
      agentsScheduled: 18,
      breached: 6,
      severity: { critical: 3, high: 7, medium: 12 },
      lanes: [{ id: 'q_identity', label: 'Identity', open: 42 }],
    };

    header.shadowRoot.querySelector('.sla-clock').click();
    expect(window.location.hash).toBe('#/sla');

    header.shadowRoot.querySelector('.queue-lane').click();
    expect(window.location.hash).toBe('#/tickets');

    header.shadowRoot.querySelector('.floor-chip').click();
    expect(window.location.hash).toBe('#/teams');
  });
});
