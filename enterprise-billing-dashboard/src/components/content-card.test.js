import { describe, expect, it, beforeEach } from 'vitest';
import './content-card.js';

describe('vd-content-card', () => {
  beforeEach(() => {
    document.body.innerHTML = '<vd-content-card><h2>Ledger</h2></vd-content-card>';
  });

  it('registers the custom element', () => {
    expect(customElements.get('vd-content-card')).toBeDefined();
  });

  it('applies the sheet class for equal-height layout', () => {
    const card = document.querySelector('vd-content-card');
    expect(card.classList.contains('sheet')).toBe(true);
  });
});
