import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('way-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('way-header')).toBeDefined();
  });

  it('renders a live scoreboard with KPI cells', () => {
    const header = document.createElement('way-header');
    header.setAttribute('product', 'Waypoint');
    header.setAttribute('workspace', 'Meridian Group');
    document.body.appendChild(header);
    header.tickerItems = [
      { label: 'In trip', value: '2', delta: 'Lagos · London', trend: 'flat', href: '#/trips' },
      { label: 'Approvals', value: '4', delta: '2 overdue', trend: 'down', href: '#/approvals' },
    ];

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('Waypoint');
    expect(shadow).toContain('Meridian Group');
    expect(shadow).toContain('In trip');
    expect(shadow).toContain('2');
    expect(shadow).toContain('Lagos · London');
    expect(shadow).toContain('Approvals');
    expect(header.shadowRoot?.querySelector('.scoreboard')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.live-led')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.kpi-cell').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('routes a KPI cell to its trips href', () => {
    const header = document.createElement('way-header');
    document.body.appendChild(header);
    header.tickerItems = [{ label: 'In trip', value: '2', delta: 'Live', trend: 'flat', href: '#/trips' }];

    header.shadowRoot.querySelector('.kpi-cell').click();
    expect(window.location.hash).toBe('#/trips');
  });
});
