import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('signal-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('signal-header')).toBeDefined();
  });

  it('renders a live scoreboard with KPI cells', () => {
    const header = document.createElement('signal-header');
    header.setAttribute('product', 'Signal');
    header.setAttribute('workspace', 'Clearline Holdings');
    document.body.appendChild(header);
    header.tickerItems = [
      { label: 'Revenue', value: '$18.4M', delta: '+7.6%', trend: 'up', href: '#/trends' },
      { label: 'NRR', value: '118%', delta: '+4 pts', trend: 'up', href: '#/scorecards' },
    ];

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('Signal');
    expect(shadow).toContain('Clearline Holdings');
    expect(shadow).toContain('Revenue');
    expect(shadow).toContain('$18.4M');
    expect(shadow).toContain('+7.6%');
    expect(shadow).toContain('NRR');
    expect(header.shadowRoot?.querySelector('.scoreboard')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.live-led')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.kpi-cell').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('routes a KPI cell to its scorecard href', () => {
    const header = document.createElement('signal-header');
    document.body.appendChild(header);
    header.tickerItems = [{ label: 'Revenue', value: '$18.4M', delta: '+7.6%', trend: 'up', href: '#/trends' }];

    header.shadowRoot.querySelector('.kpi-cell').click();
    expect(window.location.hash).toBe('#/trends');
  });
});
