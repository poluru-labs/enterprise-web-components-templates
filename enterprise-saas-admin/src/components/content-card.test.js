import { describe, expect, it, beforeEach } from 'vitest';
import './content-card.js';

describe('helio-content-card', () => {
  beforeEach(() => {
    document.body.innerHTML = '<helio-content-card><h2>Workspace</h2></helio-content-card>';
  });

  it('registers the custom element', () => {
    expect(customElements.get('helio-content-card')).toBeDefined();
  });

  it('applies the sheet class for equal-height layout', () => {
    const card = document.querySelector('helio-content-card');
    expect(card.classList.contains('sheet')).toBe(true);
  });
});
