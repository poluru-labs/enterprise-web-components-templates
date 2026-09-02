import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('alder-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('alder-header')).toBeDefined();
  });

  it('renders the people directory header with leave cluster and holiday chip', () => {
    const header = document.createElement('alder-header');
    header.setAttribute('product', 'Alder');
    header.setAttribute('workspace', 'Poluru People');
    header.setAttribute('leave-count', '6');
    header.setAttribute('holiday-label', 'Next holiday · Labor Day');
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Alder');
    expect(root?.textContent).toContain('Poluru People');
    expect(root?.textContent).toContain('6 on leave this week');
    expect(root?.textContent).toContain('Next holiday · Labor Day');
    expect(root?.querySelector('.leave-cluster')).toBeTruthy();
    expect(root?.querySelector('.holiday-chip')).toBeTruthy();
    expect(root?.querySelector('.header-shell')).toBeTruthy();
    expect(root?.querySelector('.header-ticker')).toBeFalsy();
    expect(root?.querySelector('.header-led')).toBeFalsy();
  });
});
