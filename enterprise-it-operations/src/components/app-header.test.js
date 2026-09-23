import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('techstar-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('techstar-header')).toBeDefined();
  });

  it('renders brand, ticker, and inbox count', () => {
    const header = document.createElement('techstar-header');
    header.setAttribute('product', 'TechStar');
    header.setAttribute('workspace', 'Northline Systems');
    header.setAttribute('inbox-count', '4');
    document.body.appendChild(header);
    header.tickerItems = [
      { label: 'Identity', value: '99.95%', delta: 'SLO hold', trend: 'flat', href: '#/availability' },
      { label: 'Open P1', value: '1', delta: 'SSO', trend: 'down', href: '#/incidents' },
    ];

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('TechStar');
    expect(shadow).toContain('Northline Systems');
    expect(shadow).toContain('Identity');
    expect(shadow).toContain('99.95%');
    expect(shadow).toContain('4');
    expect(header.shadowRoot?.querySelector('.ticker')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.kpi-cell').length).toBe(2);
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
  });

  it('exposes slots for mega menu, search, and profile', () => {
    const header = document.createElement('techstar-header');
    document.body.appendChild(header);
    const slots = [...header.shadowRoot.querySelectorAll('slot')].map((slot) => slot.name);
    expect(slots).toEqual(expect.arrayContaining(['mega', 'search', 'inbox', 'profile', 'nav-toggle']));
  });

  it('routes a ticker cell to its href', () => {
    const header = document.createElement('techstar-header');
    document.body.appendChild(header);
    header.tickerItems = [{ label: 'Identity', value: '99.95%', delta: 'SLO hold', trend: 'flat', href: '#/availability' }];

    header.shadowRoot.querySelector('.kpi-cell').click();
    expect(window.location.hash).toBe('#/availability');
  });
});
