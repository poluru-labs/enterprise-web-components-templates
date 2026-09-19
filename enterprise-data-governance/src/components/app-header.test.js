import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('verity-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('verity-header')).toBeDefined();
  });

  it('renders brand and inbox count', () => {
    const header = document.createElement('verity-header');
    header.setAttribute('product', 'Verity');
    header.setAttribute('workspace', 'Helix Markets');
    header.setAttribute('inbox-count', '4');
    document.body.appendChild(header);

    const shadow = header.shadowRoot?.textContent ?? '';
    expect(shadow).toContain('Verity');
    expect(shadow).toContain('Helix Markets');
    expect(shadow).toContain('4');
    expect(header.shadowRoot?.querySelector('.brand-mark svg')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.inbox-count')).toBeTruthy();
  });

  it('exposes slots for mega menu, search, and profile', () => {
    const header = document.createElement('verity-header');
    document.body.appendChild(header);
    const slots = [...header.shadowRoot.querySelectorAll('slot')].map((slot) => slot.name);
    expect(slots).toEqual(expect.arrayContaining(['mega', 'search', 'inbox', 'profile', 'nav-toggle']));
  });
});
