import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('circuit-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('circuit-header')).toBeDefined();
  });

  it('renders a live scoreboard with KPI cells', () => {
    const header = document.createElement('circuit-header');
    header.setAttribute('product', 'Circuit');
    header.setAttribute('workspace', 'Lattice Forge');
    document.body.appendChild(header);
    header.tickerItems = [
      { label: 'Services', value: '11', delta: '1 watch', trend: 'flat', href: '#/services' },
      { label: 'Deploys', value: '6', delta: 'Today', trend: 'up', href: '#/deployments' },
    ];

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('Circuit');
    expect(shadow).toContain('Lattice Forge');
    expect(shadow).toContain('Services');
    expect(shadow).toContain('11');
    expect(shadow).toContain('1 watch');
    expect(shadow).toContain('Deploys');
    expect(header.shadowRoot?.querySelector('.scoreboard')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.live-led')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.kpi-cell').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('routes a KPI cell to its services href', () => {
    const header = document.createElement('circuit-header');
    document.body.appendChild(header);
    header.tickerItems = [{ label: 'Services', value: '11', delta: 'Live', trend: 'flat', href: '#/services' }];

    header.shadowRoot.querySelector('.kpi-cell').click();
    expect(window.location.hash).toBe('#/services');
  });
});
