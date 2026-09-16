import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('civic-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('civic-header')).toBeDefined();
  });

  it('renders a live scoreboard with KPI cells', () => {
    const header = document.createElement('civic-header');
    header.setAttribute('product', 'CivicWorks');
    header.setAttribute('workspace', 'Harbor City');
    document.body.appendChild(header);
    header.tickerItems = [
      { label: 'Open 311', value: '142', delta: '12 past SLA', trend: 'down', href: '#/requests' },
      { label: 'Permits', value: '38', delta: 'In review', trend: 'flat', href: '#/permits' },
    ];

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('CivicWorks');
    expect(shadow).toContain('Harbor City');
    expect(shadow).toContain('Open 311');
    expect(shadow).toContain('142');
    expect(shadow).toContain('12 past SLA');
    expect(shadow).toContain('Permits');
    expect(header.shadowRoot?.querySelector('.scoreboard')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.live-led')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.kpi-cell').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('routes a KPI cell to its requests href', () => {
    const header = document.createElement('civic-header');
    document.body.appendChild(header);
    header.tickerItems = [{ label: 'Open 311', value: '142', delta: 'Live', trend: 'flat', href: '#/requests' }];

    header.shadowRoot.querySelector('.kpi-cell').click();
    expect(window.location.hash).toBe('#/requests');
  });
});
