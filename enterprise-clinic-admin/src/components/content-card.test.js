import { describe, expect, it, beforeEach } from 'vitest';
import './content-card.js';

describe('halo-content-card', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders title and body content', () => {
    const card = document.createElement('halo-content-card');
    card.setAttribute('title', 'Wait time');
    card.setAttribute('subtitle', 'Morning trend');
    card.innerHTML = '<p class="body-copy">Average 10 min</p>';
    document.body.appendChild(card);

    expect(card.classList.contains('halo-content-card')).toBe(true);
    expect(card.textContent).toContain('Wait time');
    expect(card.textContent).toContain('Morning trend');
    expect(card.textContent).toContain('Average 10 min');
  });

  it('supports a header slot and stretch mode', () => {
    const card = document.createElement('halo-content-card');
    card.setAttribute('stretch', '');
    card.innerHTML = `
      <div slot="header" class="custom-head"><h2>Live activity</h2></div>
      <eds-timeline id="activity"></eds-timeline>
    `;
    document.body.appendChild(card);

    expect(card.classList.contains('is-stretch')).toBe(true);
    expect(card.querySelector('.custom-head')).toBeTruthy();
    expect(card.querySelector('#activity')).toBeTruthy();
  });
});
