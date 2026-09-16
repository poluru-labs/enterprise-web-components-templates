import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('gather-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('gather-header')).toBeDefined();
  });

  it('renders a live scoreboard with KPI cells', () => {
    const header = document.createElement('gather-header');
    header.setAttribute('product', 'Gather');
    header.setAttribute('workspace', 'Alder Hall');
    document.body.appendChild(header);
    header.tickerItems = [
      { label: 'Live', value: '1', delta: 'Northline Summit', trend: 'flat', href: '#/events' },
      { label: 'Registered', value: '1,284', delta: '+86 this week', trend: 'up', href: '#/registrations' },
    ];

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('Gather');
    expect(shadow).toContain('Alder Hall');
    expect(shadow).toContain('Live');
    expect(shadow).toContain('1');
    expect(shadow).toContain('Northline Summit');
    expect(shadow).toContain('Registered');
    expect(header.shadowRoot?.querySelector('.scoreboard')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.live-led')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.kpi-cell').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('routes a KPI cell to its events href', () => {
    const header = document.createElement('gather-header');
    document.body.appendChild(header);
    header.tickerItems = [{ label: 'Live', value: '1', delta: 'Day 1', trend: 'flat', href: '#/events' }];

    header.shadowRoot.querySelector('.kpi-cell').click();
    expect(window.location.hash).toBe('#/events');
  });
});
