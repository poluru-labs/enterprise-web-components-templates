import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('orbit-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('orbit-header')).toBeDefined();
  });

  it('renders the dispatch board header with stages and fuel chip', () => {
    const header = document.createElement('orbit-header');
    header.setAttribute('product', 'Orbit');
    header.setAttribute('workspace', 'Poluru Yards');
    header.setAttribute('fuel-label', '68% avg tank');
    header.dispatchStages = [
      { id: 'yard', label: 'Yard', count: 18, href: '#/vehicles' },
      { id: 'shop', label: 'Shop', count: 8, href: '#/maintenance', hot: true },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Orbit');
    expect(root?.textContent).toContain('Poluru Yards');
    expect(root?.textContent).toContain('Yard');
    expect(root?.textContent).toContain('Shop');
    expect(root?.textContent).toContain('68% avg tank');
    expect(root?.querySelector('.dispatch-strip')).toBeTruthy();
    expect(root?.querySelector('.fuel-chip')).toBeTruthy();
    expect(root?.querySelector('.header-ticker')).toBeFalsy();
    expect(root?.querySelector('.pipeline-strip')).toBeFalsy();
  });
});
