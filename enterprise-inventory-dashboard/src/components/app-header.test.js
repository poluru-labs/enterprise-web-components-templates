import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('nimbus-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('nimbus-header')).toBeDefined();
  });

  it('renders warehouse status with stock-health rings and dock countdown', () => {
    const header = document.createElement('nimbus-header');
    header.setAttribute('product', 'Nimbus');
    header.setAttribute('workspace', 'Poluru Supply Co.');
    header.stockHealth = { inStock: 76.2, low: 14.8, stockout: 9.0 };
    header.inboundDock = { dock: 'Dock 2', minutes: 18 };
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Nimbus');
    expect(root?.textContent).toContain('Poluru Supply Co.');
    expect(root?.textContent).toContain('Warehouse status');
    expect(root?.textContent).toContain('In stock');
    expect(root?.textContent).toContain('Dock 2 · 18 min');
    expect(root?.querySelectorAll('.health-ring')).toHaveLength(3);
    expect(root?.querySelector('.dock-countdown')).toBeTruthy();
    expect(root?.querySelector('.brand-mark')?.textContent).toBe('N');
  });
});
