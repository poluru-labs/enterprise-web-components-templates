import { describe, expect, it, beforeEach } from 'vitest';
import './content-card.js';

describe('lyra-content-card', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element with open shadow DOM', () => {
    expect(customElements.get('lyra-content-card')).toBeDefined();
    const card = document.createElement('lyra-content-card');
    document.body.appendChild(card);
    expect(card.shadowRoot).toBeTruthy();
    expect(card.shadowRoot.mode).toBe('open');
  });

  it('uses a flex column host so cards stretch in grids', () => {
    const card = document.createElement('lyra-content-card');
    document.body.appendChild(card);
    card.innerHTML = '<span slot="header">Title</span><p>Body copy</p>';

    const styleText = card.shadowRoot.querySelector('style').textContent;
    expect(styleText).toMatch(/:host[\s\S]*display:\s*flex/);
    expect(styleText).toMatch(/flex-direction:\s*column/);
    expect(styleText).toMatch(/height:\s*100%/);
    expect(card.shadowRoot.querySelector('.card')).toBeTruthy();
  });
});
