import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('haven-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('haven-header')).toBeDefined();
  });

  it('renders the asset-mix header with mix cells and occupancy chip', () => {
    const header = document.createElement('haven-header');
    header.setAttribute('product', 'Haven');
    header.setAttribute('workspace', 'Poluru Homes');
    header.setAttribute('lease-label', '93% leased');
    header.assetMix = [
      { id: 'multifamily', label: 'Multifamily', count: 4, href: '#/properties', hot: true },
      { id: 'office', label: 'Office', count: 1, href: '#/properties' },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Haven');
    expect(root?.textContent).toContain('Poluru Homes');
    expect(root?.textContent).toContain('Multifamily');
    expect(root?.textContent).toContain('Office');
    expect(root?.textContent).toContain('93% leased');
    expect(root?.querySelector('.mix-strip')).toBeTruthy();
    expect(root?.querySelector('.lease-chip')).toBeTruthy();
    expect(root?.querySelector('.build-strip')).toBeFalsy();
    expect(root?.querySelector('.dispatch-strip')).toBeFalsy();
    expect(root?.querySelector('.pipeline-strip')).toBeFalsy();
  });
});
