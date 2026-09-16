import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('pulse-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('pulse-header')).toBeDefined();
  });

  it('renders a live scoreboard with KPI cells', () => {
    const header = document.createElement('pulse-header');
    header.setAttribute('product', 'Pulse');
    header.setAttribute('workspace', 'Aetherline');
    document.body.appendChild(header);
    header.tickerItems = [
      { label: 'NRR', value: '118%', delta: '+4 pts', trend: 'up', href: '#/health' },
      { label: 'GRR', value: '96%', delta: '+1 pt', trend: 'up', href: '#/renewals' },
    ];

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('Pulse');
    expect(shadow).toContain('Aetherline');
    expect(shadow).toContain('NRR');
    expect(shadow).toContain('118%');
    expect(shadow).toContain('+4 pts');
    expect(shadow).toContain('GRR');
    expect(header.shadowRoot?.querySelector('.scoreboard')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.live-led')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.kpi-cell').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('routes a KPI cell to its health href', () => {
    const header = document.createElement('pulse-header');
    document.body.appendChild(header);
    header.tickerItems = [{ label: 'NRR', value: '118%', delta: '+4 pts', trend: 'up', href: '#/health' }];

    header.shadowRoot.querySelector('.kpi-cell').click();
    expect(window.location.hash).toBe('#/health');
  });
});
