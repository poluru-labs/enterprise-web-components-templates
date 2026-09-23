import { describe, expect, it, beforeEach } from 'vitest';
import './app-shell.js';

describe('techstar-shell mega menu', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.location.hash = '';
  });

  it('opens and closes the sticky mega menu from Operations', () => {
    const shell = document.createElement('techstar-shell');
    document.body.appendChild(shell);
    const toggle = shell.querySelector('#mega-ops');
    const menu = shell.querySelector('#mega-menu');
    expect(menu.hidden).toBe(true);
    toggle.click();
    expect(menu.hidden).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    toggle.click();
    expect(menu.hidden).toBe(true);
  });
});
